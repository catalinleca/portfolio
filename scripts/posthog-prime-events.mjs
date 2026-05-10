#!/usr/bin/env node
/**
 * Fires one synthetic capture for every event + property combination the
 * portfolio uses, so PostHog's event/property registry recognises them.
 *
 * After this runs, the PostHog UI dropdowns will autocomplete event names,
 * link_names, section_ids, decision_ids, etc. — making manual insight
 * editing possible.
 *
 * Run:
 *   node --env-file=.env.local scripts/posthog-prime-events.mjs
 *
 * Uses POSTHOG_PROJECT_TOKEN (the public phc_* key — same one the browser uses).
 */

const INGEST_HOST =
  process.env.POSTHOG_INGEST_HOST ?? "https://eu.i.posthog.com";
const PROJECT_TOKEN = process.env.POSTHOG_PROJECT_TOKEN;

if (!PROJECT_TOKEN) {
  console.error("Missing POSTHOG_PROJECT_TOKEN env var.");
  process.exit(1);
}

const DISTINCT_ID = "portfolio-bootstrap-synthetic";

// Realistic vocab so dropdowns autocomplete the real values we filter by.

const SOURCE_CHANNELS = ["direct", "campaign", "organic_search", "referral"];

const PAGES = ["/", "/case-study/hedgehunt", "/privacy"];

const NAV_LINKS = [
  "nav_logo",
  "nav_work",
  "nav_about",
  "nav_resume",
  "nav_lets_talk",
];
const HERO_LINKS = [
  "hero_view_work",
  "hero_resume",
  "hero_github",
  "hero_linkedin",
  "hero_copy_email",
];
const FEATURED_WORK_LINKS = ["case_study_read", "case_study_visit_app"];
const CONTACT_LINKS = [
  "contact_copy_email",
  "contact_linkedin",
  "contact_github",
];
const MDX_LINKS = ["mdx_link"];

const SCROLL_THRESHOLDS = [25, 50, 75, 90];

const CASE_STUDY_SECTIONS = [
  "overview",
  "architecture",
  "decisions",
  "highlights",
  "reflections",
  "links",
];

const DECISION_IDS = [
  "hunt-versioning",
  "why-mongodb",
  "player-exporter",
  "challenge-type-system",
  "ai-integration",
  "ai-hunt-editing",
];

const baseContext = (sourceChannel) => ({
  source_channel: sourceChannel,
  referrer_domain: sourceChannel === "direct" ? "" : "linkedin.com",
  traffic_type: "external",
  utm_source: sourceChannel === "campaign" ? "linkedin" : undefined,
  utm_medium: sourceChannel === "campaign" ? "social" : undefined,
  utm_campaign:
    sourceChannel === "campaign" ? "portfolio_launch" : undefined,
});

const stripUndefined = (object) => {
  const result = {};
  for (const [key, value] of Object.entries(object)) {
    if (value !== undefined) result[key] = value;
  }
  return result;
};

const buildEvents = () => {
  const events = [];

  for (const page of PAGES) {
    for (const sourceChannel of SOURCE_CHANNELS) {
      events.push({
        event: "portfolio_page_view",
        properties: stripUndefined({
          ...baseContext(sourceChannel),
          page_path: page,
          page_url: page,
        }),
      });
    }
  }

  for (const page of [PAGES[0], PAGES[1]]) {
    for (const threshold of SCROLL_THRESHOLDS) {
      events.push({
        event: "portfolio_scroll_depth",
        properties: stripUndefined({
          ...baseContext("direct"),
          page_path: page,
          scroll_threshold: threshold,
        }),
      });
    }
  }

  const clickGroups = [
    { section: "nav", names: NAV_LINKS, page: "/" },
    { section: "hero", names: HERO_LINKS, page: "/" },
    { section: "featured_work", names: FEATURED_WORK_LINKS, page: "/" },
    { section: "contact", names: CONTACT_LINKS, page: "/" },
    {
      section: "case_study_body",
      names: MDX_LINKS,
      page: "/case-study/hedgehunt",
    },
  ];

  for (const group of clickGroups) {
    for (const linkName of group.names) {
      events.push({
        event: "portfolio_click",
        properties: stripUndefined({
          ...baseContext("direct"),
          link_name: linkName,
          section_name: group.section,
          click_text: linkName.replace(/_/g, " "),
          target_href: "#sample",
          page_path: group.page,
        }),
      });
    }
  }

  for (const sectionId of CASE_STUDY_SECTIONS) {
    events.push({
      event: "case_study_section_viewed",
      properties: stripUndefined({
        ...baseContext("direct"),
        section_id: sectionId,
      }),
    });
    events.push({
      event: "case_study_section_nav_clicked",
      properties: stripUndefined({
        ...baseContext("direct"),
        section_id: sectionId,
      }),
    });
  }

  for (const decisionId of DECISION_IDS) {
    events.push({
      event: "case_study_decision_expanded",
      properties: stripUndefined({
        ...baseContext("direct"),
        decision_id: decisionId,
      }),
    });
  }

  return events;
};

const sendBatch = async (events) => {
  const payload = {
    api_key: PROJECT_TOKEN,
    batch: events.map((event) => ({
      ...event,
      distinct_id: DISTINCT_ID,
      properties: {
        ...event.properties,
        $process_person_profile: false,
      },
    })),
  };

  const response = await fetch(`${INGEST_HOST}/batch/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Capture failed (${response.status}): ${text}`);
  }
  return text;
};

const main = async () => {
  const events = buildEvents();
  console.log(
    `Priming PostHog with ${events.length} synthetic events (distinct_id="${DISTINCT_ID}")...`,
  );

  // /batch/ accepts up to 20MB but we keep batches small to be friendly.
  const chunkSize = 50;
  for (let i = 0; i < events.length; i += chunkSize) {
    const chunk = events.slice(i, i + chunkSize);
    await sendBatch(chunk);
    console.log(`  ✓ sent ${Math.min(i + chunkSize, events.length)}/${events.length}`);
  }

  console.log(
    "\nDone. Events typically appear in PostHog's registry within ~30s.",
  );
  console.log(
    `Filter them out later in dashboards by excluding distinct_id="${DISTINCT_ID}".`,
  );
};

main().catch((error) => {
  console.error("\nPriming failed:", error.message);
  process.exit(1);
});
