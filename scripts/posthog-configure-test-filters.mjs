#!/usr/bin/env node
/**
 * Sets project-level test account filters so every insight with
 * filterTestAccounts=true (which is all of ours) automatically excludes:
 *   - the synthetic priming events (distinct_id = portfolio-bootstrap-synthetic)
 *   - your own browser visits (traffic_type = internal, set via ?internal=1)
 *
 * Run:
 *   node --env-file=.env.local scripts/posthog-configure-test-filters.mjs
 */

const POSTHOG_HOST = process.env.POSTHOG_HOST ?? "https://eu.posthog.com";
const POSTHOG_PERSONAL_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;

if (!POSTHOG_PERSONAL_API_KEY || !POSTHOG_PROJECT_ID) {
  console.error("Missing POSTHOG_PERSONAL_API_KEY or POSTHOG_PROJECT_ID.");
  process.exit(1);
}

const projectUrl = `${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/`;

const phFetch = async (url, init = {}) => {
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
    throw new Error(`${init.method ?? "GET"} ${url} failed (${response.status}): ${text}`);
  }
  return text.length > 0 ? JSON.parse(text) : null;
};

const newFilters = [
  {
    key: "distinct_id != 'portfolio-bootstrap-synthetic'",
    type: "hogql",
  },
  {
    key: "traffic_type",
    value: ["internal"],
    operator: "is_not",
    type: "event",
  },
];

const main = async () => {
  const project = await phFetch(projectUrl);
  console.log("Current test_account_filters:");
  console.log(JSON.stringify(project.test_account_filters ?? [], null, 2));

  const updated = await phFetch(projectUrl, {
    method: "PATCH",
    body: JSON.stringify({
      test_account_filters: newFilters,
      test_account_filters_default_checked: true,
    }),
  });

  console.log("\nUpdated test_account_filters:");
  console.log(JSON.stringify(updated.test_account_filters ?? [], null, 2));
  console.log(
    "\nAll dashboards with filterTestAccounts=true (yours) now exclude these. Refresh in PostHog.",
  );
};

main().catch((error) => {
  console.error("\nFailed:", error.message);
  process.exit(1);
});
