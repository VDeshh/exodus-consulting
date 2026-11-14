/**
 * Open roles. Copy is taken from "Exodus_Sales_Executive_Recruitment_Package.pdf"
 * (Exodus Consulting, 13 Nov 2026), which marks its terms as candidate-facing.
 * The one change: the package says to apply through LinkedIn, and this page
 * now takes applications directly.
 */
export interface Role {
  slug: string;
  title: string;
  line: string;
  location: string;
  type: string;
  posted: string;
  glance: { k: string; v: string; d: string }[];
  summary: string;
  own: string[];
  success: string[];
  thrive: string[];
  pay: string[];
  support: string[];
  interview: [string, string][];
}

export const roles: Role[] = [
  {
    slug: "sales-executive",
    title: "Sales Executive",
    line: "Full-cycle B2B sales / AI & Digital Transformation",
    location: "Canada",
    type: "Contract",
    posted: "2026-11-13",
    glance: [
      { k: "Retainer", v: "$5,000", d: "CAD monthly, conditional on one qualifying client that month" },
      { k: "Quota", v: "4", d: "Qualifying new clients a month, assessed as 12 over a rolling 3 months" },
      { k: "Bonuses", v: "Variable", d: "Based on results, closed revenue, performance above target and deal quality" },
    ],
    summary:
      "Own the commercial journey from prospecting to signed contract. Build your own pipeline, qualify business needs, lead discovery, coordinate solution demonstrations and proposals, and close new business with direct support from the founders.",
    own: [
      "Generate outbound opportunities through calls, email, LinkedIn, networking and referrals.",
      "Engage owners, CEOs and business decision-makers; lead consultative discovery.",
      "Sell AI workflows, software development, digital transformation and related services.",
      "Manage the CRM, proposals, follow-ups, forecasting and negotiations.",
      "Close and hand over new client accounts in collaboration with the founders.",
    ],
    success: [
      "Monthly target: 4 qualifying new clients; assessed as 12 clients over a rolling 3-month period.",
      "Minimum requirement for the $5,000 monthly retainer: 1 qualifying client closed in that month.",
      "Strong pipeline health, documented activity, client fit and quality of signed deals.",
    ],
    thrive: [
      "Proven B2B selling ability; comfortable prospecting and closing independently.",
      "Confident with senior decision-makers, discovery, objection handling and negotiations.",
      "Commercially curious about AI, automation, SaaS and custom technology services.",
    ],
    pay: [
      "CAD $5,000 monthly retainer, conditional on closing at least 1 qualifying new client in the corresponding month.",
      "Target: 4 new clients per month on average, measured as 12 across each rolling 3-month period.",
      "Additional performance bonuses vary based on results, closed revenue, achievement above target and deal quality.",
      "Contractor invoicing arrangement intended; no payroll payment where lawful and consistent with actual working conditions.",
    ],
    support: [
      "Technical scoping, solution architecture and demonstrations.",
      "Strategic proposals, pricing support and complex deal negotiations.",
      "Delivery handover and collaboration on major opportunities.",
    ],
    interview: [
      ["Apply on this page", "Send your resume and a brief summary of your B2B closing experience. It goes straight to the founders."],
      ["Interview", "Your prospecting approach, how you own a pipeline, past deal performance and consultative selling."],
      ["Terms", "Selected candidates discuss the written qualifying-client definition, the bonus plan, payment timing and engagement terms."],
    ],
  },
];

export const roleBySlug = (slug: string) => roles.find((r) => r.slug === slug);
