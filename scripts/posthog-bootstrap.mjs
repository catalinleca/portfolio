#!/usr/bin/env node
/**
 * Provisions PostHog dashboards + insights for the portfolio analytics events.
 *
 * Run:
 *   POSTHOG_PERSONAL_API_KEY=phx_... \
 *   POSTHOG_PROJECT_ID=12345 \
 *   node scripts/posthog-bootstrap.mjs
 *
 * Optional:
 *   POSTHOG_HOST=https://eu.posthog.com   (default — change to https://us.posthog.com if US region)
 *
 * The personal API key needs scopes: dashboard:write, insight:write.
 * Get one at https://eu.posthog.com/settings/user-api-keys
 *
 * Idempotent: dashboards/insights with the same name are skipped on rerun.
 */

const POSTHOG_HOST =
  process.env.POSTHOG_HOST ?? "https://eu.posthog.com";
const POSTHOG_PERSONAL_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;

if (!POSTHOG_PERSONAL_API_KEY) {
  console.error("Missing POSTHOG_PERSONAL_API_KEY env var.");
  process.exit(1);
}
if (!POSTHOG_PROJECT_ID) {
  console.error("Missing POSTHOG_PROJECT_ID env var.");
  process.exit(1);
}

// --- HTTP helpers ----------------------------------------------------------

const apiBase = `${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}`;

const phFetch = async (path, init = {}) => {
  const response = await fetch(`${apiBase}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${POSTHOG_PERSONAL_API_KEY}`,
      ...(init.headers ?? {}),
    },
  });

  const text = await response.text();
  const body = text.length > 0 ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(
      `PostHog ${init.method ?? "GET"} ${path} failed (${response.status}): ${text}`,
    );
  }

  return body;
};

const listDashboards = async () => {
  const results = [];
  let url = "/dashboards/?limit=100";

  while (url != null) {
    const page = await phFetch(url);
    results.push(...(page.results ?? []));
    url =
      page.next != null
        ? page.next.replace(`${apiBase}`, "").replace(POSTHOG_HOST, "")
        : null;
  }

  return results;
};

const findInsightsForDashboard = async (dashboardId) => {
  const page = await phFetch(`/insights/?dashboards=${dashboardId}&limit=100`);
  return page.results ?? [];
};

// --- Insight query builders ------------------------------------------------

const eventsNode = ({ event, name, math = "total", properties = [] }) => ({
  kind: "EventsNode",
  event,
  name: name ?? event,
  math,
  properties,
});

const trendsInsight = ({
  series,
  display = "ActionsLineGraph",
  breakdown,
  dateFrom = "-30d",
  interval = "day",
  filterTestAccounts = true,
  properties = [],
}) => ({
  kind: "InsightVizNode",
  source: {
    kind: "TrendsQuery",
    dateRange: { date_from: dateFrom },
    interval,
    series,
    properties,
    filterTestAccounts,
    trendsFilter: { display },
    ...(breakdown != null
      ? {
          breakdownFilter: {
            breakdown_type: breakdown.type ?? "event",
            breakdown: breakdown.property,
          },
        }
      : {}),
  },
});

const funnelInsight = ({
  steps,
  dateFrom = "-30d",
  windowMinutes = 60 * 24 * 30,
  filterTestAccounts = true,
}) => ({
  kind: "InsightVizNode",
  source: {
    kind: "FunnelsQuery",
    dateRange: { date_from: dateFrom },
    series: steps,
    filterTestAccounts,
    funnelsFilter: {
      funnelVizType: "steps",
      funnelOrderType: "ordered",
      funnelWindowInterval: windowMinutes,
      funnelWindowIntervalUnit: "minute",
    },
  },
});

// --- Dashboard + insight definitions --------------------------------------

const PROPERTY = (key, value, operator = "exact") => ({
  key,
  value: Array.isArray(value) ? value : [value],
  operator,
  type: "event",
});

const dashboards = [
  {
    name: "Portfolio · Acquisition",
    description:
      "Where visitors come from. Source channel split, UTM campaigns, top referrers.",
    insights: [
      {
        name: "Visitors by source channel",
        description: "Direct vs organic_search vs referral vs campaign.",
        query: trendsInsight({
          series: [eventsNode({ event: "portfolio_page_view", math: "dau" })],
          display: "ActionsPie",
          breakdown: { property: "source_channel" },
        }),
      },
      {
        name: "Visitors by UTM source",
        description: "Which platform tagged links came from (linkedin, github, resume, email).",
        query: trendsInsight({
          series: [eventsNode({ event: "portfolio_page_view", math: "dau" })],
          display: "ActionsTable",
          breakdown: { property: "utm_source" },
        }),
      },
      {
        name: "Visitors by UTM campaign",
        description: "Which tagged campaign brought traffic.",
        query: trendsInsight({
          series: [eventsNode({ event: "portfolio_page_view", math: "dau" })],
          display: "ActionsTable",
          breakdown: { property: "utm_campaign" },
        }),
      },
      {
        name: "Top referrer domains",
        description: "Inbound referrers (excludes UTM-tagged links).",
        query: trendsInsight({
          series: [eventsNode({ event: "portfolio_page_view", math: "dau" })],
          display: "ActionsTable",
          breakdown: { property: "referrer_domain" },
        }),
      },
      {
        name: "Daily unique visitors",
        description: "DAU over the last 30 days.",
        query: trendsInsight({
          series: [eventsNode({ event: "portfolio_page_view", math: "dau" })],
          display: "ActionsLineGraph",
        }),
      },
    ],
  },

  {
    name: "Portfolio · Recruiter Funnel",
    description:
      "Arrived → engaged → studied → reached out. The one funnel that matters.",
    insights: [
      {
        name: "Recruiter funnel: home → case study → contact",
        description:
          "Home view → scrolled past hero → case study read → case study scrolled 75% → contact CTA clicked.",
        query: funnelInsight({
          steps: [
            eventsNode({
              event: "portfolio_page_view",
              name: "Home page view",
              properties: [PROPERTY("page_path", "/")],
            }),
            eventsNode({
              event: "portfolio_scroll_depth",
              name: "Home scrolled ≥50%",
              properties: [
                PROPERTY("page_path", "/"),
                PROPERTY("scroll_threshold", 50, "gte"),
              ],
            }),
            eventsNode({
              event: "portfolio_click",
              name: "Case study card clicked",
              properties: [PROPERTY("link_name", "case_study_read")],
            }),
            eventsNode({
              event: "portfolio_page_view",
              name: "Case study page view",
              properties: [PROPERTY("page_path", "/case-study/hedgehunt")],
            }),
            eventsNode({
              event: "portfolio_scroll_depth",
              name: "Case study scrolled ≥75%",
              properties: [
                PROPERTY("page_path", "/case-study/hedgehunt"),
                PROPERTY("scroll_threshold", 75, "gte"),
              ],
            }),
            eventsNode({
              event: "portfolio_click",
              name: "Contact CTA clicked",
              properties: [
                PROPERTY(
                  "link_name",
                  [
                    "contact_copy_email",
                    "hero_copy_email",
                    "contact_linkedin",
                    "contact_github",
                    "nav_lets_talk",
                  ],
                ),
              ],
            }),
          ],
        }),
      },
      {
        name: "Hero CTA conversion",
        description: "Hero impression → any hero CTA click.",
        query: funnelInsight({
          windowMinutes: 60,
          steps: [
            eventsNode({
              event: "portfolio_page_view",
              name: "Home page view",
              properties: [PROPERTY("page_path", "/")],
            }),
            eventsNode({
              event: "portfolio_click",
              name: "Any hero CTA",
              properties: [
                PROPERTY(
                  "link_name",
                  [
                    "hero_view_work",
                    "hero_resume",
                    "hero_github",
                    "hero_linkedin",
                    "hero_copy_email",
                  ],
                ),
              ],
            }),
          ],
        }),
      },
    ],
  },

  {
    name: "Portfolio · Engagement",
    description:
      "What visitors read once they're on a page — scroll depth, section views, decision card opens.",
    insights: [
      {
        name: "Home scroll depth funnel",
        description: "How far visitors scroll on the homepage.",
        query: funnelInsight({
          windowMinutes: 60,
          steps: [
            eventsNode({
              event: "portfolio_page_view",
              name: "Home view",
              properties: [PROPERTY("page_path", "/")],
            }),
            eventsNode({
              event: "portfolio_scroll_depth",
              name: "Scrolled 25%",
              properties: [
                PROPERTY("page_path", "/"),
                PROPERTY("scroll_threshold", 25, "exact"),
              ],
            }),
            eventsNode({
              event: "portfolio_scroll_depth",
              name: "Scrolled 50%",
              properties: [
                PROPERTY("page_path", "/"),
                PROPERTY("scroll_threshold", 50, "exact"),
              ],
            }),
            eventsNode({
              event: "portfolio_scroll_depth",
              name: "Scrolled 75%",
              properties: [
                PROPERTY("page_path", "/"),
                PROPERTY("scroll_threshold", 75, "exact"),
              ],
            }),
            eventsNode({
              event: "portfolio_scroll_depth",
              name: "Scrolled 90%",
              properties: [
                PROPERTY("page_path", "/"),
                PROPERTY("scroll_threshold", 90, "exact"),
              ],
            }),
          ],
        }),
      },
      {
        name: "Case study scroll depth funnel",
        description: "How far visitors scroll on the HedgeHunt case study.",
        query: funnelInsight({
          windowMinutes: 60,
          steps: [
            eventsNode({
              event: "portfolio_page_view",
              name: "Case study view",
              properties: [
                PROPERTY("page_path", "/case-study/hedgehunt"),
              ],
            }),
            eventsNode({
              event: "portfolio_scroll_depth",
              name: "Scrolled 25%",
              properties: [
                PROPERTY("page_path", "/case-study/hedgehunt"),
                PROPERTY("scroll_threshold", 25, "exact"),
              ],
            }),
            eventsNode({
              event: "portfolio_scroll_depth",
              name: "Scrolled 50%",
              properties: [
                PROPERTY("page_path", "/case-study/hedgehunt"),
                PROPERTY("scroll_threshold", 50, "exact"),
              ],
            }),
            eventsNode({
              event: "portfolio_scroll_depth",
              name: "Scrolled 75%",
              properties: [
                PROPERTY("page_path", "/case-study/hedgehunt"),
                PROPERTY("scroll_threshold", 75, "exact"),
              ],
            }),
            eventsNode({
              event: "portfolio_scroll_depth",
              name: "Scrolled 90%",
              properties: [
                PROPERTY("page_path", "/case-study/hedgehunt"),
                PROPERTY("scroll_threshold", 90, "exact"),
              ],
            }),
          ],
        }),
      },
      {
        name: "Case study sections viewed",
        description:
          "Which sections actually entered the viewport (one per section per session).",
        query: trendsInsight({
          series: [
            eventsNode({
              event: "case_study_section_viewed",
              math: "dau",
            }),
          ],
          display: "ActionsBar",
          breakdown: { property: "section_id" },
        }),
      },
      {
        name: "Case study sections clicked in nav",
        description: "Which section nav links visitors actually click.",
        query: trendsInsight({
          series: [
            eventsNode({
              event: "case_study_section_nav_clicked",
              math: "total",
            }),
          ],
          display: "ActionsBar",
          breakdown: { property: "section_id" },
        }),
      },
      {
        name: "Decision cards expanded",
        description:
          "Which architecture-decision cards visitors expand — strongest signal of technical interest.",
        query: trendsInsight({
          series: [
            eventsNode({
              event: "case_study_decision_expanded",
              math: "total",
            }),
          ],
          display: "ActionsBar",
          breakdown: { property: "decision_id" },
        }),
      },
    ],
  },

  {
    name: "Portfolio · Outbound Intent",
    description:
      "What visitors do after engaging — external clicks, resume downloads, contact attempts.",
    insights: [
      {
        name: "Resume downloads",
        description: "Clicks on the resume PDF link (nav + hero).",
        query: trendsInsight({
          series: [
            eventsNode({
              event: "portfolio_click",
              math: "total",
              properties: [
                PROPERTY("link_name", ["nav_resume", "hero_resume"]),
              ],
            }),
          ],
          display: "ActionsLineGraph",
        }),
      },
      {
        name: "GitHub clicks",
        description: "Clicks to GitHub from anywhere on the portfolio.",
        query: trendsInsight({
          series: [
            eventsNode({
              event: "portfolio_click",
              math: "total",
              properties: [PROPERTY("link_name", "hero_github")],
            }),
          ],
          display: "ActionsLineGraph",
        }),
      },
      {
        name: "HedgeHunt live-link clicks",
        description: "Clicks that opened HedgeHunt — case-study card + MDX body link.",
        query: trendsInsight({
          series: [
            eventsNode({
              event: "portfolio_click",
              math: "total",
              properties: [
                PROPERTY("link_name", ["case_study_visit_app", "mdx_link"]),
              ],
            }),
          ],
          display: "ActionsLineGraph",
        }),
      },
      {
        name: "HedgeHunt clickers by source channel",
        description:
          "Where visitors who clicked through to HedgeHunt came from (direct/organic/referral/campaign).",
        query: trendsInsight({
          series: [
            eventsNode({
              event: "portfolio_click",
              math: "dau",
              properties: [
                PROPERTY("link_name", ["case_study_visit_app", "mdx_link"]),
              ],
            }),
          ],
          display: "ActionsPie",
          breakdown: { property: "source_channel" },
        }),
      },
      {
        name: "HedgeHunt clickers by UTM source",
        description:
          "Which marketing channel (LinkedIn, GitHub, resume, etc.) drove HedgeHunt clicks.",
        query: trendsInsight({
          series: [
            eventsNode({
              event: "portfolio_click",
              math: "dau",
              properties: [
                PROPERTY("link_name", ["case_study_visit_app", "mdx_link"]),
              ],
            }),
          ],
          display: "ActionsTable",
          breakdown: { property: "utm_source" },
        }),
      },
      {
        name: "Resume downloaders by source channel",
        description: "Where visitors who clicked the resume link came from.",
        query: trendsInsight({
          series: [
            eventsNode({
              event: "portfolio_click",
              math: "dau",
              properties: [
                PROPERTY("link_name", ["nav_resume", "hero_resume"]),
              ],
            }),
          ],
          display: "ActionsPie",
          breakdown: { property: "source_channel" },
        }),
      },
      {
        name: "Resume downloaders by UTM source",
        description:
          "Which marketing channel drove resume clicks — distinguishes recruiters from organic discovery.",
        query: trendsInsight({
          series: [
            eventsNode({
              event: "portfolio_click",
              math: "dau",
              properties: [
                PROPERTY("link_name", ["nav_resume", "hero_resume"]),
              ],
            }),
          ],
          display: "ActionsTable",
          breakdown: { property: "utm_source" },
        }),
      },
      {
        name: "Contact channel split",
        description:
          "Which contact path visitors actually take — email, LinkedIn, GitHub, etc.",
        query: trendsInsight({
          series: [
            eventsNode({
              event: "portfolio_click",
              math: "total",
              properties: [
                PROPERTY(
                  "section_name",
                  ["contact", "hero"],
                ),
                PROPERTY(
                  "link_name",
                  [
                    "contact_copy_email",
                    "hero_copy_email",
                    "contact_linkedin",
                    "contact_github",
                  ],
                ),
              ],
            }),
          ],
          display: "ActionsPie",
          breakdown: { property: "link_name" },
        }),
      },
    ],
  },
];

// --- Provisioning ----------------------------------------------------------

const provision = async () => {
  const existingDashboards = await listDashboards();
  const existingByName = new Map(
    existingDashboards.map((d) => [d.name, d]),
  );

  for (const dashboard of dashboards) {
    let dashboardRecord = existingByName.get(dashboard.name);
    let createdDashboard = false;

    if (dashboardRecord != null) {
      console.log(`• Dashboard "${dashboard.name}" exists (id=${dashboardRecord.id}), reusing.`);
    } else {
      dashboardRecord = await phFetch("/dashboards/", {
        method: "POST",
        body: JSON.stringify({
          name: dashboard.name,
          description: dashboard.description,
        }),
      });
      createdDashboard = true;
      console.log(`✓ Created dashboard "${dashboard.name}" (id=${dashboardRecord.id})`);
    }

    const existingInsights = createdDashboard
      ? []
      : await findInsightsForDashboard(dashboardRecord.id);
    const existingInsightNames = new Set(
      existingInsights.map((insight) => insight.name),
    );

    for (const insight of dashboard.insights) {
      if (existingInsightNames.has(insight.name)) {
        console.log(`  • Insight "${insight.name}" exists, skipping.`);
        continue;
      }

      const created = await phFetch("/insights/", {
        method: "POST",
        body: JSON.stringify({
          name: insight.name,
          description: insight.description,
          query: insight.query,
          dashboards: [dashboardRecord.id],
        }),
      });
      console.log(`  ✓ Created insight "${insight.name}" (id=${created.id})`);
    }
  }

  console.log("\nDone. Open PostHog → Dashboards to see them.");
};

provision().catch((error) => {
  console.error("\nProvision failed:", error.message);
  process.exit(1);
});
