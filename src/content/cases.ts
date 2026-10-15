/**
 * Case study copy. Every sentence traces to the live page named in `source`.
 * Sections follow the template: context → old way → bottleneck → why off-the-shelf
 * didn't fit → approach → build → AI/automation → human role → result → next.
 */
export interface CaseSection { label: string; title: string; body: string[]; note?: string }
export interface CaseFacts { k: string; v: string }[]

export interface CaseContent {
  slug: string;
  source: string;
  facts: { k: string; v: string }[];
  sections: CaseSection[];
}

export const cases: Record<string, CaseContent> = {
  fennec: {
    slug: "fennec",
    source: "exdsconsulting.com/work-fennec",
    facts: [
      { k: "Client", v: "Fennec, fennecapp.com (co-founded)" },
      { k: "Sector", v: "Premium nightlife and events" },
      { k: "Status", v: "Live" },
      { k: "What we built", v: "A venue operating system: floor plans, live ops, ticketing, guest CRM, bottle service, inventory, campaigns and analytics, with the Ferry AI agent network underneath" },
      { k: "Integrations", v: "Two-way POS sync with Square, Toast and Lightspeed" },
      { k: "Venues", v: "Harbour Event Centre, TradeX, The Pit UBC, The Show Ottawa, Twins Nightclub, plus 20+ event companies" },
      { k: "Architecture", v: "Core and Ferry AI network architected by Vishal Desh, Co-Founder" },
    ],
    sections: [
      { label: "Context", title: "A venue does not need five tools. It needs one record of the night.", body: ["Fennec is an operating system, not a feature. It runs the floor, the door, the bar, the bottles, the coat check, the guest record, the campaigns and the count in the stock room, off one set of records that every surface reads at the same time."] },
      { label: "The old way", title: "What a disconnected stack looks like on a Saturday.", body: ["A venue running separate tools is running separate versions of the same night. Each one is right about its own slice and wrong about everything else, and the reconciliation happens in a group chat at 11pm.", "The floor plan is a drawing that cannot tell anyone which table is still free. Tickets sell on a third-party page that knows the guest bought and nothing about where they will sit. The guestlist is a spreadsheet or a text thread, stale by midnight. The bar runs on a POS that has never heard of the table. Marketing is a separate address book."] },
      { label: "Bottleneck", title: "Availability lived in a thread between a promoter, a host and an owner.", body: ["Every one of them held a slightly different version of it. The same table could be sold twice. Somebody had to phone the office to ask whether T3 was gone."] },
      { label: "Why off-the-shelf did not fit", title: "Five products, five records.", body: ["Each tool was right about its own slice. None of them could be the record of the night, because none of them knew about the others. An agent cannot tell you what is leaking if the numbers are sitting in five accounts that never speak."] },
      { label: "The build", title: "The event, the table, the tab and the guest are single records.", body: ["The guest picks the table over a photograph of the real room. Seat counts sit on each table, the bar and the backstage table are marked, and a legend says what is available, requested, booked, unavailable and selected.", "The operator half is the floor plan editor. Every table carries a label, a section, a capacity, a table fee, a shape, a VIP flag and its own generated QR code. Layouts are versioned, so a Friday room and a Saturday room are two saved states. Activating a layout is what publishes the map the guest picks from, which is why the two screens can never disagree.", "The public event page is generated from the event the operator built. The discover feed puts it in front of guests who came for a different room."], note: "Product copy quoted on the live site: \"Design, version, and activate floor layouts in seconds.\"" },
      { label: "AI and automation", title: "Ferry AI is a roster, not a chat.", body: ["A coordinated agent network across operations, guests, campaigns, inventory and service, plus a Revenue Copilot that reads voids, pricing, promoters and inventory. Each agent owns one part of the operation and reads the same record as every other surface."] },
      { label: "Human role", title: "A guest request is a request, not a booking.", body: ["The host works the same map and confirms where the party actually lands, which is how a venue keeps control of its best tables without making a guest guess at a seating chart."] },
      { label: "Result", title: "Five named venues. More than twenty event companies. In production tonight.", body: ["Every venue on the network runs its own nights, its own promoters and its own bar. They share one system, which is why an event published in one room shows up in a feed that guests of the others already use. No hours-saved or revenue figure is claimed for Fennec on this site."] },
      { label: "What came next", title: "The same architecture, now on the Uniserve build.", body: ["Fennec is where our own architecture came from. Vishal built the core of it and the Ferry agent network, and that is the same pair of hands on the Uniserve engagement."] },
    ],
  },
  uniserve: {
    slug: "uniserve",
    source: "exdsconsulting.com/work-uniserve",
    facts: [
      { k: "Client", v: "Uniserve Communications Corporation" },
      { k: "Sector", v: "Internet and telecom, Canada" },
      { k: "Status", v: "In build" },
      { k: "What we are building", v: "A customer-facing AI chatbot and a voice agent for residential support" },
      { k: "Constraint", v: "All data and models hosted in Canada" },
      { k: "Term", v: "3 months, AI enablement" },
      { k: "Mandate", v: "Owner level" },
    ],
    sections: [
      { label: "Context", title: "Repeat customer questions, and a mandate from the top.", body: ["Uniserve is a Canadian internet and telecom provider. A high volume of repeat questions arrives through their residential support channels. The mandate came from the owner, not from a department: a three month AI enablement engagement aimed at Uniserve's own customers, with a working system at the end of it rather than a strategy document."] },
      { label: "The old way", title: "The same problem, described again by the next customer.", body: ["A technician spends part of the day answering something that has been answered before. A customer who gets the real answer at 11pm does not need a technician at 9am."] },
      { label: "Bottleneck", title: "The leak is the repeat question.", body: ["Most of the repeat questions already had an answer written down somewhere the customer could not find."] },
      { label: "Why off-the-shelf did not fit", title: "Buying software before you know where the work repeats is how the 95 percent figure happens.", body: ["95% of enterprise AI pilots show no measurable P&L return (MIT NANDA, The GenAI Divide, 2025). 93% of AI budgets go to technology and about 7% to the people expected to use it (Deloitte, 2025). This engagement was scoped around the people, and around a hard hosting constraint no generic tool met."] },
      { label: "Exodus approach", title: "A map first, then the cut.", body: ["We read the business for three things: where work repeats, where information is re-typed from one place into another, and where a person waits on another person before they can finish. That is the map, and it is the part most AI projects skip.", "Then we cut it. Each candidate was written up with the arithmetic beside it, so the ranking was arguable rather than asserted, and the shortlist was chosen on return plus feasibility, in that order. Anything that could not be hosted in Canada was struck for that reason and no other. Nothing was chosen because it demos well."] },
      { label: "The build", title: "One system with two front doors.", body: ["The chatbot answers residential support questions in writing. The voice agent answers the same questions on the phone, for the customer who would rather talk than type. A customer gets the same answer whichever one they use.", "Both were designed to the hosting requirement rather than around it. The data and the models sit in Canada, and that decision was made before the first line of code rather than patched in afterwards."] },
      { label: "AI and automation", title: "Classified, routed, summarised, drafted. Held.", body: ["A request lands in the support queue. It is classified, routed and summarised. A suggested reply is drafted and held. Repeat questions are answered from Uniserve's own material rather than the open internet, with the source attached so the answer can be checked in one click."] },
      { label: "Human role", title: "Nothing irreversible leaves without a person.", body: ["A technician reads a short version instead of a thread, and a person still releases anything that goes back to a customer. The gate is the point: the draft sits until a technician reads it."] },
      { label: "Result", title: "A projection, with the sum written out.", body: ["Roughly one hour of a technician's day given back once customers can get the answer themselves. 1 hr/day × about 250 working days × about $40/hr = about $10,000 per technician per year, scaling with team size. This is a forecast agreed as a target, not a booked result. Uniserve's team size is not published here."], note: "Projection, Uniserve programme model. Nothing on this page is presented as a finished result." },
      { label: "What comes next", title: "The clock starts at deployment.", body: ["The bar was agreed in writing before the build. When the system is in the team's hands, the measurement window opens, and the arithmetic will be printed here the same way as everything else on this site."] },
    ],
  },
  "palapa-tours": {
    slug: "palapa-tours",
    source: "exdsconsulting.com/work-palapa-tours",
    facts: [
      { k: "Client", v: "Palapa Tours Ottawa" },
      { k: "Sector", v: "Floating tiki-bar cruises" },
      { k: "Status", v: "Shipped, engagement closed" },
      { k: "Built", v: "Custom tip-out software that calculates, splits and tracks staff gratuities automatically" },
      { k: "Stack", v: "Custom build, owned by the client" },
      { k: "Problem solved", v: "Tip-out variance and payout disputes" },
    ],
    sections: [
      { label: "Context", title: "A bar that floats, with a new crew on every sailing.", body: ["Palapa Tours runs floating tiki-bar cruises in Ottawa. Each sailing is its own shift: guests board, the bar serves, the deck works the room, the boat comes back, and the crew is paid out before everyone goes home. Cash and card sit side by side, and the roster is not the same twice."] },
      { label: "The old way", title: "Arithmetic done at the end of a shift by someone who wanted to go home.", body: ["The rules existed in someone's head. Totalling gratuities across cash and card, then dividing them by role, was manual arithmetic worked out after a long shift. Different crew, different mix of roles, different judgement calls: the same shift on two nights could produce two different shapes of payout."] },
      { label: "Bottleneck", title: "There was no record to point at.", body: ["Without a stored calculation per cruise, a question about last weekend could not be answered. It could only be re-argued. That was the real cost: not a line on a P&L, but disputes among staff on a small team where everyone works the same deck next weekend."] },
      { label: "Why off-the-shelf did not fit", title: "The fix was not a bigger spreadsheet.", body: ["It was making the rule the only thing that decides the number. A spreadsheet still needs a person to remember what was agreed last month and to work it out the same way every time."] },
      { label: "The build", title: "Software that does one job properly.", body: ["The cruise closes, the gratuity pool is totalled, the split rules the operator set are applied, and every staff member's payout is written down and kept. The rules are set once instead of being re-decided at the end of each sailing."] },
      { label: "AI and automation", title: "No AI. Deterministic arithmetic.", body: ["This is a place where AI does not belong. The calculation has to come out the same way every night, so it is software with fixed rules, not a model."] },
      { label: "Human role", title: "The operator sets the rules. Once.", body: ["Roles and percentages are whatever the operator decides. The software applies them the same way no matter who is looking."] },
      { label: "Result", title: "Consistent payouts. Transparent logic. Fewer arguments.", body: ["The number is the same number whoever runs it. A question about a past sailing has an answer. No hours or dollar figure is claimed. The engagement is closed, the software shipped, and Palapa owns it."], note: "The interface shown on this site is a diagram, not a screenshot. Role names and percentages are placeholders standing in for whatever rules an operator sets, not Palapa's figures." },
      { label: "What came next", title: "The same idea, at venue scale.", body: ["Tip splitting by rules agreed before the shift is also a family inside Fennec, where it sits next to the stock count on the same arithmetic."] },
    ],
  },
};
