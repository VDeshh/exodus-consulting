/**
 * TOOL PAGES.
 * Copy is taken verbatim from "READ ME FIRST - Website Content.docx"
 * (Exodus Website - Final, Shiv Lohia, 12 Oct 2026). One page per tool under
 * /what-we-do/. Fennec is listed but links to its existing case study.
 *
 * NAMING RULES from that brief, enforced here:
 *  - Never name political parties. Write "political campaigns".
 *  - Never name dental or dealership clients.
 *  - Nameable: Uniserve, Fennec, Harbour Event Centre, TradeX, The Pit UBC,
 *    The Show Ottawa, Twins Nightclub, Palapa Tours, B-Side Group.
 *
 * Pages without a video say "Demo coming soon." Nothing from the brief's
 * "3 Internal only" folder appears anywhere on this site.
 */

export type ToolTone = "live" | "in-build" | "pilot" | "offered" | "made-to-order";

export const TOOL_TONE_CLASS: Record<ToolTone, string> = {
  live: "chip-live",
  "in-build": "chip-in-build",
  pilot: "chip-in-build",
  offered: "chip-shipped",
  "made-to-order": "chip-shipped",
};

export interface ToolMedia {
  /** Landscape 16:9 product film, or a 4:5 vertical short. */
  src: string;
  poster?: string;
  aspect: "16/9" | "4/5";
  label: string;
  seconds: number;
}

export interface Tool {
  n: string;
  slug: string;
  name: string;
  /** One line under the title. */
  tagline: string;
  who: string;
  does: string[];
  how: string[];
  worksWith: string;
  /** Short status chip text, and its tone. */
  status: string;
  tone: ToolTone;
  /** Full status sentence from the brief, when it says more than the chip. */
  statusNote?: string;
  demoNote: string;
  screenshots: { src: string; caption: string }[];
  videos: ToolMedia[];
  /** Set when the tool lives somewhere else on the site. */
  href?: string;
}

export const tools: Tool[] = [
  {
    n: "01",
    slug: "call-automation",
    name: "AI Call Automation",
    tagline: "A multi-line dialer that sends every live answer to a free caller.",
    who: "Political campaigns and dealership sales teams that call long lists.",
    does: [
      "Dials your list on several lines at once.",
      "Sends every live answer straight to a free caller, with the contact's details on screen.",
      "Retries no-answers automatically and skips do-not-call numbers.",
      "Shows live stats for dials, answers and transfers.",
      "Reaches many more people in one shift than hours of manual dialing.",
    ],
    how: [
      "You load your contact list.",
      "Several lines dial at once. Each live answer goes to the next free caller.",
      "Your callers talk with the contact's details on screen while the stats update live.",
    ],
    worksWith: "Your contact lists and your do-not-call list.",
    status: "Live",
    tone: "live",
    demoNote: "Short demo video available now. Full demo coming soon.",
    screenshots: [{ src: "/tools/01-ai-call-automation.webp", caption: "The dialer running several lines at once, with live stats for dials, answers and transfers." }],
    videos: [{ src: "/tools/01-call-automation.mp4", poster: "/tools/01-call-automation-poster.webp", aspect: "16/9", label: "AI Call Automation, demo", seconds: 79 }],
  },
  {
    n: "02",
    slug: "voice-agent",
    name: "AI Voice Agent for Outbound Calling",
    tagline: "An AI caller for campaigns and outreach, in five languages.",
    who: "Political campaigns and any outreach team: fundraising, surveys or appointment reminders.",
    does: [
      "Calls your lists in English, Mandarin, Cantonese, Korean or Farsi. The person picks the language.",
      "Records structured answers: support score 1 to 5, vote plan, top issue, volunteer and sign interest, and text consent.",
      "Hands off to a person when asked. Those calls show up as callback requests.",
      "Calls web form callback requests automatically.",
      "Sends follow-up texts and emails once you approve them.",
    ],
    how: [
      "You set the list, calling hours, opt-outs, frequency limits and budget. All of them are enforced.",
      "The agent calls and saves a full transcript with an AI summary of each call.",
      "You review insights, export them to CSV and approve follow-ups. An emergency stop button is always there.",
    ],
    worksWith: "Web forms, text, email and CSV export.",
    status: "Live",
    tone: "live",
    statusNote: "Live for a political campaign.",
    demoNote: "Demo coming soon.",
    screenshots: [],
    videos: [],
  },
  {
    n: "03",
    slug: "ai-receptionist",
    name: "AI Receptionist",
    tagline: "An AI that answers every call to your business, including after hours.",
    who: "Dental clinics, dealerships and service businesses.",
    does: [
      "Answers every call, including after hours.",
      "Answers questions from your business's own knowledge base.",
      "Books appointments straight into your scheduling system.",
      "Hands off to your staff when needed.",
      "Bills usage by the minute.",
    ],
    how: [
      "It is set up with your business's knowledge base.",
      "It answers calls, including after hours, and books appointments straight into your scheduling system.",
      "It passes the call to your staff when a person is needed.",
    ],
    worksWith: "Your phone line, your knowledge base and your scheduling system.",
    status: "In build",
    tone: "in-build",
    demoNote: "Demo coming soon.",
    screenshots: [{ src: "/tools/03-ai-receptionist.webp", caption: "The receptionist answering a call and booking straight into the scheduling system." }],
    videos: [],
  },
  {
    n: "04",
    slug: "patient-recall",
    name: "Patient Recall Calls",
    tagline: "AI calls to patients whose treatment plans were never booked.",
    who: "Dental clinics on Dentrix or Open Dental.",
    does: [
      "Calls patients whose treatment plans were never booked.",
      "Offers the soonest openings first.",
      "Books straight into Dentrix or Open Dental.",
      "Marks each AI booking with its own status and a call note, so the front desk can check it.",
      "Offers only end-of-day slots to patients who often miss appointments.",
    ],
    how: [
      "It finds patients with unbooked treatment plans in Dentrix or Open Dental.",
      "The AI calls each patient and offers open slots, soonest first.",
      "It books the appointment and leaves a call note for the front desk to check.",
    ],
    worksWith: "Dentrix and Open Dental.",
    status: "In build",
    tone: "in-build",
    demoNote: "Demo coming soon.",
    screenshots: [{ src: "/tools/04-patient-recall-calls.webp", caption: "Unbooked treatment plans, the slots offered, and the call note left for the front desk." }],
    videos: [],
  },
  {
    n: "05",
    slug: "call-reminders",
    name: "Automatic Call Reminders",
    tagline: "One list each morning that tells your receptionist who to call and when.",
    who: "Dental front desks on Open Dental that run recalls from an Excel list.",
    does: [
      "Builds one list every morning of who to call and when, following your clinic's rules.",
      "Colour-codes the list and gives each patient a short brief: last visit, due date, and recent emails, texts and calls.",
      "Sets the next reminder automatically when staff log a call in one click, like “left voicemail” or “booked”.",
      "Replaces the Excel recall list.",
      "This is not AI calling. Your staff make the calls.",
    ],
    how: [
      "It connects to Open Dental through its API. The API carries a small fee.",
      "You set your rules. For example, 2 weeks before a patient is due, then every 10 to 14 days while overdue.",
      "Each morning your receptionist gets the list, makes the calls and logs each one.",
    ],
    worksWith: "Open Dental.",
    status: "In build",
    tone: "in-build",
    demoNote: "Demo coming soon.",
    screenshots: [{ src: "/tools/05-automatic-call-reminders.webp", caption: "The morning call list, colour-coded, with a short brief on each patient." }],
    videos: [],
  },
  {
    n: "06",
    slug: "ai-project-manager",
    name: "AI Project Manager",
    tagline: "A morning update for each project manager on what changed, what's late and who to chase.",
    who: "Project managers, including MSP teams on ConnectWise or HaloPSA.",
    does: [
      "Reads the Slack channels, email threads and project tools each project manager points it at.",
      "Tells them every morning what changed, what's late and who to chase.",
      "Links back to the source message.",
      "Is read-only by default. It can only post or send if the workspace owner turns that on.",
      "Has an MSP version for ConnectWise and HaloPSA.",
    ],
    how: [
      "Each project manager picks the channels, threads and tools it reads.",
      "It reads them and builds the morning update.",
      "The project manager follows the links back to the source and chases what's late.",
    ],
    worksWith: "Slack, email, ConnectWise and HaloPSA.",
    status: "Pilot",
    tone: "pilot",
    statusNote: "Pilot at Uniserve.",
    demoNote: "Short demo videos available now, including one for MSPs. Full demo coming soon.",
    screenshots: [
      { src: "/tools/06-ai-project-manager.webp", caption: "The morning update: what changed, what is late and who to chase, each line linking back to the source message." },
      { src: "/tools/06-ai-project-manager-msp-version.webp", caption: "The MSP version, reading ConnectWise and HaloPSA." },
    ],
    videos: [
      { src: "/tools/06-ai-project-manager.mp4", poster: "/tools/06-ai-project-manager-poster.webp", aspect: "16/9", label: "AI Project Manager, demo", seconds: 45 },
      { src: "/tools/06-ai-project-manager-msp.mp4", poster: "/tools/06-ai-project-manager-msp-poster.webp", aspect: "16/9", label: "AI Project Manager for MSPs, demo", seconds: 53 },
    ],
  },
  {
    n: "07",
    slug: "client-health-dashboard",
    name: "Client Health Dashboard",
    tagline: "A health score for every business customer, built from live ConnectWise data.",
    who: "MSPs that run on ConnectWise.",
    does: [
      "Scores every business customer from tickets, SLAs, agreements and invoices, plus SmileBack customer surveys.",
      "Shows revenue tiers and green, amber and red alerts.",
      "Drills down to the tickets behind each score.",
      "Runs on your own server with Microsoft sign-in.",
      "Reads your systems without changing them.",
    ],
    how: [
      "It is installed on your own server with Microsoft sign-in.",
      "It reads live data from ConnectWise and SmileBack.",
      "Your team reviews the scores and alerts and opens the tickets behind them. Uniserve's leadership reviews it in their weekly meeting.",
    ],
    worksWith: "ConnectWise, SmileBack and Microsoft sign-in.",
    status: "Live",
    tone: "live",
    statusNote: "Live at Uniserve.",
    demoNote: "Demo coming soon.",
    screenshots: [{ src: "/tools/07-client-health-dashboard.webp", caption: "Every business customer scored, with revenue tiers and green, amber and red alerts." }],
    videos: [],
  },
  {
    n: "08",
    slug: "support-chatbot",
    name: "AI Support Chatbot",
    tagline: "A support chatbot that answers customer questions from your own help documents.",
    who: "Internet, hosting and phone providers with home customers.",
    does: [
      "Answers questions about internet, email, web hosting and home phone.",
      "Answers from your own help documents.",
      "Walks customers through fixes step by step.",
      "Keeps all models and data hosted in Canada.",
    ],
    how: [
      "It is set up with your help documents.",
      "Customers ask their question on your website.",
      "It answers and walks them through the fix step by step.",
    ],
    worksWith: "Your website and your help documents.",
    status: "Live",
    tone: "live",
    statusNote: "Live on home.uniserve.com for Uniserve's home customers. A voice agent for residential support is in build.",
    demoNote: "Short demo clip. Full demo coming soon.",
    screenshots: [{ src: "/tools/08-ai-support-chatbot.webp", caption: "The chatbot answering from Uniserve's own help documents, with the source attached." }],
    videos: [{ src: "/tools/08-support-chatbot.mp4", poster: "/tools/08-support-chatbot-poster-v2.webp", aspect: "4/5", label: "AI Support Chatbot, short demo", seconds: 16 }],
  },
  {
    n: "09",
    slug: "security-testing",
    name: "Security and Penetration Testing",
    tagline: "Manual penetration testing of web apps before launch.",
    who: "Teams launching web apps, including multi-tenant apps and apps that hold health data.",
    does: [
      "Tests every backend endpoint by hand.",
      "Checks database rules (row-level security) and encryption.",
      "Checks how data moves between tenants in multi-tenant apps.",
      "Gives you a report with each vulnerability and the fix.",
      "Re-tests once the fixes are in.",
    ],
    how: [
      "We test your app before launch.",
      "You get a report with each vulnerability and its fix.",
      "We re-test once the fixes are in. Phase two is a HIPAA compliance audit for apps that hold health data.",
    ],
    worksWith: "Web apps, their backend endpoints and their databases.",
    status: "Offered",
    tone: "offered",
    statusNote: "Offered. The first engagement, a dental practice management app, is scoped.",
    demoNote: "Demo coming soon.",
    screenshots: [{ src: "/tools/09-security-and-penetration-testing.webp", caption: "The report: each vulnerability found by hand, with its fix." }],
    videos: [],
  },
  {
    n: "10",
    slug: "dealership-os",
    name: "Dealership OS",
    tagline: "A dealership website built around your inventory.",
    who: "Car dealerships.",
    does: [
      "Builds your website around your inventory, with test drive booking.",
      "Takes trade-ins and financing pre-approval online.",
      "Takes online deposits connected to your in-store POS terminal.",
      "Pulls AutoTrader, CarGurus, Kijiji and Facebook leads into one inbox, with automated follow-ups.",
      "The dealership owns it.",
    ],
    how: [
      "We build it in phases.",
      "Leads from every source land in one inbox and get automated follow-ups.",
      "Customers book test drives, send trade-ins, apply for financing and pay deposits online. Deposits connect to your in-store POS terminal.",
    ],
    worksWith: "AutoTrader, CarGurus, Kijiji, Facebook and your in-store POS terminal.",
    status: "Built to order",
    tone: "made-to-order",
    statusNote: "Built to order, in phases.",
    demoNote: "Demo coming soon.",
    screenshots: [],
    videos: [],
  },
  {
    n: "11",
    slug: "tip-out",
    name: "Tip-Out Software",
    tagline: "Tip-out software that totals the gratuity pool and splits it by role.",
    who: "Tour and hospitality businesses that pool tips across roles.",
    does: ["Totals the gratuity pool.", "Applies your split rules by role.", "Records every payout."],
    how: [
      "You set the split rules for each role.",
      "It totals the gratuity pool.",
      "It applies the split and records every payout.",
    ],
    worksWith: "Your own roles and split rules.",
    status: "Live",
    tone: "live",
    statusNote: "Live. Shipped for Palapa Tours.",
    demoNote: "Short demo clip. Full demo coming soon.",
    screenshots: [{ src: "/tools/11-tip-out-software.webp", caption: "The gratuity pool totalled and split by role, with every payout recorded." }],
    videos: [{ src: "/tools/11-tip-out.mp4", poster: "/tools/11-tip-out-poster-v2.webp", aspect: "4/5", label: "Tip-Out Software, short demo", seconds: 16 }],
  },
  {
    n: "12",
    slug: "multi-venue-inventory",
    name: "Multi-Venue Inventory",
    tagline: "One shared inventory catalogue across all your venues, with counts done on phones.",
    who: "Hospitality groups that run more than one venue.",
    does: [
      "Keeps one shared catalogue across every venue.",
      "Lets staff do stock counts on their phones.",
      "Shows variance per site.",
      "Sets reorder points based on real usage.",
    ],
    how: [
      "Your venues share one catalogue.",
      "Staff count stock on their phones at each site.",
      "You see variance per site and reorder points based on real usage.",
    ],
    worksWith: "Your staff's phones for counts.",
    status: "In build",
    tone: "in-build",
    statusNote: "In build for B-Side Group, across three venues.",
    demoNote: "Short demo clip. Full demo coming soon.",
    screenshots: [{ src: "/tools/12-multi-venue-inventory.webp", caption: "One catalogue across every venue, with variance per site." }],
    videos: [{ src: "/tools/12-multi-venue-inventory.mp4", poster: "/tools/12-multi-venue-inventory-poster-v2.webp", aspect: "4/5", label: "Multi-Venue Inventory, short demo", seconds: 16 }],
  },
  {
    n: "13",
    slug: "fennec",
    name: "Fennec",
    tagline: "The venue operating system we co-founded and built, live at five venues.",
    who: "Nightclubs, event centres and other venues.",
    does: [
      "Runs floor plans, ticketing and bottle service.",
      "Manages promoters and a guest CRM.",
      "Handles inventory and campaigns.",
      "Syncs both ways with Square, Toast and Lightspeed POS.",
      "Includes Ferry AI agents.",
    ],
    how: [
      "Your venue runs floor plans, ticketing and bottle service in Fennec.",
      "Guests, promoters, inventory and campaigns are managed in the same system.",
      "Sales sync both ways with Square, Toast or Lightspeed.",
    ],
    worksWith: "Square, Toast and Lightspeed POS, with two-way sync.",
    status: "Live",
    tone: "live",
    statusNote: "Live at Harbour Event Centre, TradeX, The Pit UBC, The Show Ottawa and Twins Nightclub.",
    demoNote: "Short demo clip. Full demo coming soon.",
    screenshots: [{ src: "/tools/13-fennec.webp", caption: "Fennec running the floor, the door and the bar off one record of the night." }],
    videos: [{ src: "/tools/13-fennec.mp4", poster: "/tools/13-fennec-poster-v2.webp", aspect: "4/5", label: "Fennec, short demo", seconds: 16 }],
    // Fennec already has its own case study; the tool index links there.
    href: "/work/fennec/",
  },
];

/** Tools that get their own page under /what-we-do/. Fennec links out instead. */
export const toolPages = tools.filter((t) => !t.href);
export const toolBySlug = (slug: string) => tools.find((t) => t.slug === slug);
