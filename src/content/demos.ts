/**
 * PRODUCT DEMOS.
 * Films of software Exodus built. Each one is categorised the same way the rest
 * of the site is: against a capability from facts.ts and the problem tags used
 * by the work filter.
 *
 * `kind` is deliberately separate from the engagement statuses in facts.ts.
 * A film of a working product is not the same claim as a shipped client
 * engagement, so demos never borrow Live / Shipped / In build.
 *
 * Any figure that appears inside a film stays inside the film. Site prose does
 * not restate it, because the numbers on this site carry a source and these do
 * not. Each demo says plainly that its data is illustrative.
 */
import type { ProblemTag } from "./facts";

export type DemoKind = "product-demo" | "capability-demo";

export const DEMO_KIND_LABEL: Record<DemoKind, string> = {
  "product-demo": "Product demo",
  "capability-demo": "Capability demo",
};

export interface Demo {
  slug: string;
  /** Short product name. */
  name: string;
  /** One line: what it is. */
  short: string;
  /** Which engagement it belongs to, if any. */
  engagement?: string;
  kind: DemoKind;
  /** Capability number and name from facts.ts `capabilities`. */
  capability: string;
  capabilityName: string;
  fixes: ProblemTag[];
  /** Who it is built for, in plain words. */
  builtFor: string;
  /** What the film actually shows, in order. */
  shows: string[];
  /** Files under /public/demos. Poster is a still from the film. */
  video: { mp4: string; poster: string; seconds: number; width: number; height: number };
  /** Printed under the player. Keeps the claim honest. */
  note?: string;
  /**
   * Flip to true once the encoded files are in /public/demos AND the content is
   * cleared to publish. Until then the demo is hidden.
   */
  ready?: boolean;
}

export const demos: Demo[] = [
  {
    slug: "pm-scan",
    name: "pm-scan",
    short: "Reads the channels, threads and tickets a project already runs on, then prints what is actually urgent.",
    engagement: "uniserve",
    kind: "product-demo",
    capability: "06",
    capabilityName: "Operational intelligence",
    fixes: ["operations", "reporting", "internal-tooling"],
    builtFor: "Uniserve Communications and managed service providers",
    shows: [
      "The real input: project channels, threads, emails and tickets, where a plan update, a kickoff note and a client sign-off all live as messages.",
      "The jargon a technical operation runs on, and the problem of telling from the outside what is actually going on.",
      "pm-scan scanning three projects and ranking what is urgent now, flagged red or amber: a sign-off three days overdue, a launch date moved with the plan not updated, a budget approval sitting with finance.",
      "It is read-only. It reports on the systems the team already uses rather than becoming another one to update.",
    ],
    video: { mp4: "/demos/uniserve-pm-scan.mp4", poster: "/demos/uniserve-pm-scan.jpg", seconds: 45, width: 1280, height: 720 },
    note: "Product film. Project names, people and ticket numbers on screen are sample data, and any figure shown in the film is illustrative rather than a measured client result.",
    ready: true,
  },
  {
    slug: "dealership-call-triage",
    name: "Outbound call triage for a car dealership",
    short: "Dials a list, catches the answers, routes each one to a free rep and pushes the customer's context before they speak.",
    kind: "capability-demo",
    capability: "02",
    capabilityName: "Ticket triage and support automation",
    fixes: ["ai-enablement", "customer-experience", "revenue-leakage"],
    builtFor: "Dealership sales floors, as an illustration of agentic triage",
    shows: [
      "A dialer running ten lines in flight on a fifteen-second ring window, with dials placed, answered, transferred and abandoned counted live.",
      "Three sales reps as available or on call, so a connected customer only ever lands on someone free.",
      "The brief pushed to the rep on connect: who the customer is, what they looked at and when, and the one offer that applies to them.",
      "Nobody is left holding. The abandoned rate stays at zero because a line is only dialled when a rep can take it.",
    ],
    video: { mp4: "/demos/dealership-call-triage.mp4", poster: "/demos/dealership-call-triage.jpg", seconds: 19, width: 1280, height: 720 },
    note: "Illustrative demo. Sample customer data, fictional numbers, call timers shown at 4× speed. Not a client engagement.",
    ready: false,
  },
];

export const demosFor = (engagement: string) => demos.filter((d) => d.engagement === engagement && d.ready);
export const capabilityDemos = () => demos.filter((d) => d.kind === "capability-demo" && d.ready);
