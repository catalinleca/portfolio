#!/usr/bin/env node
/**
 * One-off: fixes 2 bugs in already-created insights.
 *   1. "Top referrer domains" — exclude UTM-tagged campaign traffic
 *   2. "GitHub clicks" — also count contact_github (not just hero_github)
 *
 * Idempotent: safe to rerun.
 *
 * Run:
 *   node --env-file=.env.local scripts/posthog-patch-buggy-insights.mjs
 */

const POSTHOG_HOST = process.env.POSTHOG_HOST ?? "https://eu.posthog.com";
const POSTHOG_PERSONAL_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;

if (!POSTHOG_PERSONAL_API_KEY || !POSTHOG_PROJECT_ID) {
  console.error("Missing POSTHOG_PERSONAL_API_KEY or POSTHOG_PROJECT_ID.");
  process.exit(1);
}

const apiBase = `${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}`;

const phFetch = async (path, init = {}) => {
  const url = path.startsWith("http") ? path : `${apiBase}${path}`;
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${POSTHOG_PERSONAL_API_KEY}`,
      ...(init.headers ?? {}),
    },
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`${init.method ?? "GET"} ${path} failed (${response.status}): ${text}`);
  }
  return text.length > 0 ? JSON.parse(text) : null;
};

const findInsightByName = async (dashboardName, insightName) => {
  const dashboards = await phFetch("/dashboards/?limit=100");
  const dashboard = (dashboards.results ?? []).find((d) => d.name === dashboardName);
  if (!dashboard) throw new Error(`Dashboard not found: ${dashboardName}`);

  const full = await phFetch(`/dashboards/${dashboard.id}/`);
  const insight = (full.tiles ?? [])
    .map((tile) => tile.insight)
    .find((insight) => insight != null && insight.name === insightName);
  if (!insight) throw new Error(`Insight not found: ${insightName}`);
  return insight;
};

const filterEquals = (a, b) => {
  if (a.type !== b.type) return false;
  if (a.key !== b.key) return false;
  if (a.operator !== b.operator) return false;
  return JSON.stringify(a.value ?? null) === JSON.stringify(b.value ?? null);
};

const upsertFilter = (existing, filter) => {
  const list = [...(existing ?? [])];
  if (!list.some((existingFilter) => filterEquals(existingFilter, filter))) {
    list.push(filter);
  }
  return list;
};

const fixTopReferrerDomains = async () => {
  const insight = await findInsightByName(
    "Portfolio · Acquisition",
    "Top referrer domains",
  );
  const source = insight.query.source;
  const updatedProperties = upsertFilter(source.properties, {
    type: "event",
    key: "source_channel",
    value: ["campaign"],
    operator: "is_not",
  });
  const updatedQuery = {
    ...insight.query,
    source: { ...source, properties: updatedProperties },
  };
  await phFetch(`/insights/${insight.id}/`, {
    method: "PATCH",
    body: JSON.stringify({
      query: updatedQuery,
      description: "Inbound referrers (excludes UTM-tagged campaign traffic).",
    }),
  });
  console.log(`✓ Patched "Top referrer domains" (id=${insight.id})`);
};

const fixGithubClicks = async () => {
  const insight = await findInsightByName(
    "Portfolio · Outbound Intent",
    "GitHub clicks",
  );
  const source = insight.query.source;
  const updatedSeries = source.series.map((node) => {
    if (node.event !== "portfolio_click") return node;
    const updatedProps = (node.properties ?? []).map((property) => {
      if (property.key !== "link_name") return property;
      return { ...property, value: ["hero_github", "contact_github"] };
    });
    return { ...node, properties: updatedProps };
  });
  const updatedQuery = {
    ...insight.query,
    source: { ...source, series: updatedSeries },
  };
  await phFetch(`/insights/${insight.id}/`, {
    method: "PATCH",
    body: JSON.stringify({ query: updatedQuery }),
  });
  console.log(`✓ Patched "GitHub clicks" (id=${insight.id})`);
};

const main = async () => {
  await fixTopReferrerDomains();
  await fixGithubClicks();
  console.log("\nDone. Refresh PostHog dashboards.");
};

main().catch((error) => {
  console.error("\nFailed:", error.message);
  process.exit(1);
});
