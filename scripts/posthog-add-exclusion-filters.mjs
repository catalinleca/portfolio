#!/usr/bin/env node
/**
 * Adds two exclusion filters to every insight in our 4 portfolio dashboards:
 *   - distinct_id != 'portfolio-bootstrap-synthetic'  (drops priming events)
 *   - traffic_type != 'internal'                       (drops your own visits)
 *
 * Patches insights in place. Idempotent: if the filters are already present
 * on an insight, they're not duplicated.
 *
 * Run:
 *   node --env-file=.env.local scripts/posthog-add-exclusion-filters.mjs
 */

const POSTHOG_HOST = process.env.POSTHOG_HOST ?? "https://eu.posthog.com";
const POSTHOG_PERSONAL_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;

if (!POSTHOG_PERSONAL_API_KEY || !POSTHOG_PROJECT_ID) {
  console.error("Missing POSTHOG_PERSONAL_API_KEY or POSTHOG_PROJECT_ID.");
  process.exit(1);
}

const apiBase = `${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}`;

const PORTFOLIO_DASHBOARD_NAMES = [
  "Portfolio · Acquisition",
  "Portfolio · Recruiter Funnel",
  "Portfolio · Engagement",
  "Portfolio · Outbound Intent",
];

const EXCLUSION_FILTERS = [
  {
    type: "hogql",
    key: "distinct_id != 'portfolio-bootstrap-synthetic'",
  },
  {
    type: "event",
    key: "traffic_type",
    value: ["internal"],
    operator: "is_not",
  },
];

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

const listAll = async (firstPath) => {
  const results = [];
  let next = `${apiBase}${firstPath}`;
  while (next != null) {
    const page = await phFetch(next);
    results.push(...(page.results ?? []));
    next = page.next;
  }
  return results;
};

const filterEquals = (a, b) => {
  if (a.type !== b.type) return false;
  if (a.key !== b.key) return false;
  if (a.operator !== b.operator) return false;
  return JSON.stringify(a.value ?? null) === JSON.stringify(b.value ?? null);
};

const mergeFilters = (existing) => {
  const result = [...(existing ?? [])];
  for (const filter of EXCLUSION_FILTERS) {
    if (!result.some((existingFilter) => filterEquals(existingFilter, filter))) {
      result.push(filter);
    }
  }
  return result;
};

const main = async () => {
  const dashboards = await listAll("/dashboards/?limit=100");
  const portfolioDashboards = dashboards.filter((dashboard) =>
    PORTFOLIO_DASHBOARD_NAMES.includes(dashboard.name),
  );

  if (portfolioDashboards.length === 0) {
    console.log("No portfolio dashboards found.");
    return;
  }

  for (const dashboardSummary of portfolioDashboards) {
    console.log(`\n• ${dashboardSummary.name} (id=${dashboardSummary.id})`);
    const dashboard = await phFetch(`/dashboards/${dashboardSummary.id}/`);
    const insights = (dashboard.tiles ?? [])
      .map((tile) => tile.insight)
      .filter((insight) => insight != null);

    for (const insight of insights) {
      const source = insight.query?.source;
      if (source == null) {
        console.log(`  - "${insight.name}" — no query.source, skipping`);
        continue;
      }

      const updatedProperties = mergeFilters(source.properties);
      const updatedQuery = {
        ...insight.query,
        source: { ...source, properties: updatedProperties },
      };

      await phFetch(`/insights/${insight.id}/`, {
        method: "PATCH",
        body: JSON.stringify({ query: updatedQuery }),
      });
      console.log(`  ✓ "${insight.name}"`);
    }
  }

  console.log("\nDone. Refresh dashboards in PostHog.");
};

main().catch((error) => {
  console.error("\nFailed:", error.message);
  process.exit(1);
});
