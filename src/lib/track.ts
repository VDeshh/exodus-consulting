/**
 * Analytics seam. No vendor is wired yet (see docs/02-open-questions.md, Q9).
 * Events are pushed to window.dataLayer so any tag manager or Plausible/PostHog
 * adapter can pick them up later without touching components.
 */
export type EventName =
  | "hero_cta"
  | "bottleneck_input"
  | "bottleneck_submitted"
  | "case_study_view"
  | "service_viewed"
  | "fennec_click"
  | "founder_video_play"
  | "audit_cta"
  | "call_booked"
  | "email_clicked"
  | "work_category_selected"
  | "workflow_interaction"
  | "roi_calculated";

declare global {
  interface Window { dataLayer?: Record<string, unknown>[] }
}

export function track(event: EventName, props: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  (window.dataLayer ||= []).push({ event, ...props, ts: Date.now() });
}
