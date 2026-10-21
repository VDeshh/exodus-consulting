/**
 * SOURCE OF TRUTH.
 * Every number, client, status and quote on the site reads from this file.
 * Everything here was verified against exdsconsulting.com on 2026-09-16
 * (see docs/01-site-audit.md). Nothing may be added without a source.
 */

export type Status = "live" | "shipped" | "in-build";

export const STATUS_LABEL: Record<Status, string> = {
  live: "Live",
  shipped: "Shipped",
  "in-build": "In build",
};

export interface Outcome {
  metric: string;
  detail: string;
  kind: "projection" | "count" | "qualitative";
  source: string;
  date: string;
  approved: boolean;
}

export interface Engagement {
  slug: string;
  client: string;
  short: string;
  sector: string;
  place: string;
  status: Status;
  problem: string;
  built: string;
  intelligence?: string;
  human: string;
  outcomes: Outcome[];
  next?: string;
  fixes: ProblemTag[];
  flagship?: boolean;
  href: string;
}

export type ProblemTag =
  | "manual-work"
  | "customer-experience"
  | "reporting"
  | "revenue-leakage"
  | "operations"
  | "ai-enablement"
  | "custom-platform"
  | "internal-tooling";

export const PROBLEM_TAGS: Record<ProblemTag, string> = {
  "manual-work": "Manual work",
  "customer-experience": "Customer experience",
  reporting: "Reporting",
  "revenue-leakage": "Revenue leakage",
  operations: "Operations",
  "ai-enablement": "AI enablement",
  "custom-platform": "Custom platform",
  "internal-tooling": "Internal tooling",
};

export const fennecVenues = ["Harbour Event Centre", "TradeX", "The Pit UBC", "The Show Ottawa", "Twins Nightclub"];
export const fennecEventCompanies = "20+";
export const fennecPos = ["Square", "Toast", "Lightspeed"];

export const engagements: Engagement[] = [
  {
    slug: "fennec",
    client: "Fennec",
    short: "A venue operating system, live tonight.",
    sector: "Premium nightlife and events",
    place: "Canada",
    status: "live",
    flagship: true,
    href: "/work/fennec/",
    problem:
      "A venue running separate tools is running separate versions of the same night. The floor plan is a drawing. Tickets sell somewhere else. The guestlist is a spreadsheet or a text thread. The bar runs on a POS that has never heard of the table. Marketing is a separate address book.",
    built:
      "One operating system: floor plans, live ops, ticketing, guest CRM, bottle service, inventory, campaigns and analytics, off one set of records that every surface reads at the same time. Two-way POS sync with Square, Toast and Lightspeed.",
    intelligence:
      "Ferry AI, a coordinated agent network across operations, guests, campaigns, inventory and service, plus a Revenue Copilot that reads voids, pricing, promoters and inventory.",
    human: "The host confirms final table placement on the same map the guest booked from. A guest request is a request, not a booking.",
    outcomes: [
      { metric: "5 named venues", detail: fennecVenues.join(", "), kind: "count", source: "Exodus Website Content brief, 2026-10-12", date: "2026-10-12", approved: true },
      { metric: "20+ event companies", detail: "publishing events on the network", kind: "count", source: "exdsconsulting.com/work-fennec", date: "2026-09-16", approved: true },
    ],
    next: "Every venue on the network inherits an audience that is already there for the venue down the street.",
    fixes: ["custom-platform", "operations", "ai-enablement", "revenue-leakage"],
  },
  {
    slug: "uniserve",
    client: "Uniserve Communications",
    short: "AI enablement for a Canadian ISP, in three months.",
    sector: "Internet and telecom",
    place: "Canada",
    status: "in-build",
    flagship: true,
    href: "/work/uniserve/",
    problem:
      "A high volume of repeat questions arrives through residential support channels. The same problem is described again by the next customer, and a technician spends part of the day answering something that has been answered before.",
    built:
      "A customer-facing AI chatbot and a voice agent for residential support. One system with two front doors, so a customer gets the same answer whichever one they use. All data and models hosted in Canada, decided before the first line of code.",
    intelligence: "Classification and routing, repeat questions answered from Uniserve's own material, and an approval gate: no reply reaches a customer without a person releasing it.",
    human: "A technician reads a short version instead of a thread, and a person still releases anything that goes back to a customer.",
    outcomes: [
      {
        metric: "~1 hour per technician per day",
        detail: "given back once customers can get the answer themselves. About $10,000 per technician per year at about $40 an hour. A projection agreed as a target, not a booked result.",
        kind: "projection",
        source: "exdsconsulting.com/work-uniserve",
        date: "2026-09-16",
        approved: true,
      },
    ],
    fixes: ["ai-enablement", "customer-experience", "manual-work"],
  },
  {
    slug: "palapa-tours",
    client: "Palapa Tours Ottawa",
    short: "Custom tip-out software, shipped.",
    sector: "Floating tiki-bar cruises",
    place: "Ottawa",
    status: "shipped",
    href: "/work/palapa-tours/",
    problem:
      "Gratuity splits shifted cruise to cruise and were hard to reconcile fairly. The rules existed in someone's head, the totals were worked out after a long shift, and the result was disputes among staff over what each person was owed.",
    built:
      "Custom tip-out software. The cruise closes, the gratuity pool is totalled, the split rules the operator set are applied, and every staff member's payout is written down and kept. The client owns the code.",
    human: "The operator sets the split rules once. The software applies them the same way every sailing.",
    outcomes: [
      { metric: "Same number, whoever looks", detail: "Payouts are consistent, the logic is transparent, and a question about a past sailing has an answer. No hours or dollar figure is claimed.", kind: "qualitative", source: "exdsconsulting.com/work-palapa-tours", date: "2026-09-16", approved: true },
    ],
    fixes: ["manual-work", "internal-tooling", "operations"],
  },
  {
    slug: "political-campaign",
    client: "A municipal political campaign",
    short: "Records reconciled, with a confidence score on every match.",
    sector: "Political campaigns",
    place: "Vancouver",
    status: "live",
    href: "/work/current/#political-campaign",
    problem:
      "An organisation that has grown in stages holds its information in whatever tool each part of the operation adopted, so the same person can exist three times in three formats, with a different spelling and a stale address on each.",
    built:
      "Every source read into a common shape, records matched across them, duplicates and near-duplicates resolved, and a confidence score attached to each match so a weak join stays visible. Targeted marketing campaigns are planned against that reconciled set.",
    human: "Weak matches stay visible for a person to judge instead of being quietly trusted.",
    outcomes: [
      { metric: "No electoral or polling outcome claimed", detail: "The campaign is not named. Exodus takes no political position.", kind: "qualitative", source: "Exodus Website Content brief, 2026-10-12", date: "2026-10-12", approved: true },
    ],
    fixes: ["reporting", "manual-work", "operations"],
  },
  {
    slug: "b-side-group",
    client: "B-Side Group",
    short: "Inventory software across three restaurant venues, in build.",
    sector: "Hospitality group",
    place: "Canada",
    status: "in-build",
    href: "/work/current/#b-side-group",
    problem:
      "Each room counts its own stock its own way, the same product carries three names across three sites, and the gap between what was bought and what was sold only surfaces at the end of the month.",
    built:
      "Customised inventory management software: stock counts per site, one catalogue shared across the venues, purchased against sold as variance, and reorder points that fire off real consumption.",
    human: "Reorder points suggest. A person orders.",
    outcomes: [
      { metric: "None to report yet", detail: "No count is running in the software yet, no variance figure exists, and there is no launch metric.", kind: "qualitative", source: "exdsconsulting.com/work-scoped", date: "2026-09-16", approved: true },
    ],
    fixes: ["internal-tooling", "operations", "reporting"],
  },
];

export const proof = {
  engagements: engagements.length,
  live: engagements.filter((e) => e.status === "live").length,
  shipped: engagements.filter((e) => e.status === "shipped").length,
  inBuild: engagements.filter((e) => e.status === "in-build").length,
  venues: fennecVenues.length,
  eventCompanies: fennecEventCompanies,
  founders: 2,
  accountManagers: "Optional",
};

/** Third-party statistics, each with its printed source. */
export const stats = [
  { value: "88%", text: "of companies report using AI. About 6% attribute more than 5% of profit to it.", source: "McKinsey, State of AI, 2025" },
  { value: "95%", text: "of enterprise AI pilots show no measurable P&L return.", source: "MIT NANDA, The GenAI Divide, 2025" },
  { value: "80%+", text: "of AI projects fail, about double the failure rate of other IT projects.", source: "RAND, 2024" },
  { value: "93%", text: "of AI budgets go to technology. About 7% goes to the people expected to use it.", source: "Deloitte, 2025" },
  { value: "7×", text: "more likely to qualify a web lead when contacted inside an hour rather than an hour later.", source: "Harvard Business Review, The Short Life of Online Sales Leads, 2011" },
];

export interface Capability {
  n: string;
  name: string;
  status: Status[];
  what: string;
  runningFor: string;
  stage: "see" | "build" | "advance";
}

/** Six capabilities, live status per the services page. */
export const capabilities: Capability[] = [
  { n: "01", name: "Customer-facing assistants", status: ["in-build"], stage: "build", what: "A chatbot and a voice agent that answer your customers directly, from your own material rather than the open internet, and hand over to a person the moment the question stops being routine.", runningFor: "Uniserve Communications" },
  { n: "02", name: "Ticket triage and support automation", status: ["in-build"], stage: "build", what: "Classification and routing, repeat questions handled without a person touching them, and an approval gate: no reply reaches a customer without a human clicking.", runningFor: "Uniserve Communications" },
  { n: "03", name: "Knowledge and retrieval", status: ["in-build"], stage: "build", what: "Question and answer over your own documents, with the citation attached, so every answer can be checked in one click.", runningFor: "Uniserve Communications" },
  { n: "04", name: "Custom software and operating systems", status: ["live", "shipped", "in-build"], stage: "build", what: "When no product on the market fits the way you actually work, we build the system. Not a dashboard bolted onto a spreadsheet: the thing the business runs on.", runningFor: "Fennec, Palapa Tours, B-Side Group" },
  { n: "05", name: "POS, payments and integrations", status: ["live"], stage: "build", what: "Two-way sync with the point of sale you already use. One place to edit, everywhere else follows.", runningFor: "Fennec (Square, Toast, Lightspeed)" },
  { n: "06", name: "Operational intelligence", status: ["live"], stage: "advance", what: "Agents and copilots that read the whole operation and surface what is leaking, once the data is clean and the process is real.", runningFor: "Fennec (Ferry AI, Revenue Copilot)" },
];

/** The commercial terms, verbatim in spirit from /guarantee. */
export const guarantee = [
  { n: "01", title: "A signed baseline before any build", text: "We measure the process as it runs today and write the numbers down. You sign off on the exact figures we are measured against." },
  { n: "02", title: "The clock starts at deployment", text: "Not at signature, not at kickoff. The measurement window opens the day the system is in your team's hands doing real work." },
  { n: "03", title: "If it misses the bar, we keep working at no additional cost", text: "Same scope, same team, no new invoice, until the agreed bar clears." },
  { n: "04", title: "Cancel at any time", text: "No minimum term and no exit fee. You keep what has been built and delivered to that point." },
  { n: "05", title: "A free operations audit up front", text: "Before money changes hands we map where time and money leak and show the arithmetic. You keep that map whether or not you hire us." },
  { n: "06", title: "You own the code", text: "The repository, the data and the deployment are yours. No licence to renegotiate, no hostage fee to leave." },
];

export const process = [
  { n: "01", name: "Talk", time: "30 minutes, free", text: "You describe the workflow that hurts most. We put your own hours and hourly rate against it while you watch. You leave with the leak map either way." },
  { n: "02", name: "Map", time: "Before any build", text: "The one or two builds worth doing, with the numbers beside them. Constraints go in here: hosting, data residency, the till that stays where it is." },
  { n: "03", name: "Sign", time: "One page, both names", text: "The process, the current numbers, the bar, the timeframe and how we will measure it. Nothing is built before this page exists." },
  { n: "04", name: "Build", time: "Scoped tight on purpose", text: "The two or three things that move the signed number, not a platform. Uniserve's programme runs three months." },
  { n: "05", name: "Measure", time: "Clock starts at deployment", text: "Same method, same process, arithmetic printed. If the bar has not cleared, we keep working at no additional cost until it does." },
];

export const founders = [
  {
    name: "Shiv Lohia",
    role: "Co-Founder",
    bio: "Shiv studied how people behave and how companies make money, then spent his career on the place those two meet. BA Psychology and a Master of Management from UBC. At Apply Digital he designed user experiences for large clients, including the Harvard Business School site. He co-founded Fennec. On an Exodus engagement he sits with the owner, watches the process as it actually happens, and writes the numbers down before a line of code exists.",
    facts: ["BA Psychology, UBC", "Master of Management, UBC", "Co-founder, Fennec", "Apply Digital: Harvard Business School site"],
    email: "shiv@exdsconsulting.com",
    photo: "/founders/shiv-lohia.webp",
  },
  {
    name: "Vishal Desh",
    role: "Co-Founder",
    bio: "Vishal is the technical architect behind Exodus’ AI consulting engagements. With a background in Computer Science, a Master of Management from UBC, and hands-on experience across several AI tools and implementations, he bridges the gap between business strategy and technical execution. From leading client relationships and ongoing consultations to identifying opportunities, shaping AI solutions, and driving sales, he oversees the full engagement lifecycle. At Fennec, which he co-founded with Shiv, he architected the core platform and Ferry AI agent network. At Exodus, he brings that same builder’s mindset to every engagement—translating business challenges into practical AI systems, leading technical implementation, and ensuring solutions deliver measurable value long after deployment.",
    facts: ["Computer Science, UBC", "Master of Management, UBC", "Architect, Fennec core and Ferry AI", "Full engagement lifecycle"],
    email: "vish@exdsconsulting.com",
    photo: "/founders/vishal-desh.webp",
  },
];

export const rules = [
  ["Two founders on every engagement", "The people who scope the work are the people who ship it."],
  ["Direct access", "You email us and you get us. One address, no ticket queue."],
  ["Optional account manager", "Our builds run on their own. For bigger projects, monthly support with an account manager is available as part of a retainer."],
  ["No juniors on your budget", "If it gets built, one of the two of us built it."],
  ["No deck-only strategy", "A slide is not a system. Every engagement ends in software that runs, and you own the code."],
  ["We learn the business first", "We sit with the team that does the work and map where time and money leak. The build starts after that."],
];

/**
 * Sectors. `built` is where an Exodus engagement actually sits, including the
 * three added when the tool pages landed: dental clinics (recall, reminders and
 * the receptionist, all in build), car dealerships (Dealership OS, built to
 * order) and MSPs (the Client Health Dashboard, live at Uniserve). `total` is
 * derived so the headline count can never drift from the lists under it.
 */
export const industries = {
  built: ["Nightlife and hospitality", "Restaurants and bars", "Event venues and ticketing", "Telecom and internet providers", "Political campaigns", "Tour and experience operators", "Dental clinics", "Car dealerships", "MSPs and IT service providers"],
  applies: ["Law firms", "Accounting and bookkeeping firms", "Recruiting and staffing", "Professional services and agencies", "Insurance and financial brokers", "Real estate and property management", "Construction and trades", "Home services and trades", "Logistics and transportation", "Manufacturing and distribution", "Retail and ecommerce", "Fitness and wellness", "Education and training providers", "Nonprofits and associations"],
  get total() { return this.built.length + this.applies.length; },
};

/** Ferry AI roster as shown in the live product screenshot. */
export const ferryAgents = [
  { name: "Ferry", role: "General assistant", does: "Reads every signal across the venue, answers in plain English, routes work to the right specialist." },
  { name: "Events", role: "Ops and live night", does: "Runs the live floor: tables, guestlist, door flow. Re-balances tables when the night shifts." },
  { name: "Marketing", role: "Promos and campaigns", does: "Drafts campaigns and SMS blasts in the venue's voice from the live guest list." },
  { name: "Inventory", role: "Stock and bar", does: "Tracks bottles, mixers and 86'd items in real time. Re-orders before you run out." },
  { name: "Staff", role: "Promoters and shifts", does: "Watches promoter performance, shifts and payouts." },
];
