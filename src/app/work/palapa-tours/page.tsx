import type { Metadata } from "next";
import { CaseHeader, CaseSections, CaseSource } from "@/components/work/CaseStudy";
import { WorkflowMorph } from "@/components/scenes/WorkflowMorph";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "Palapa Tours Ottawa: custom tip-out software, shipped",
  description: "Gratuity splits shifted cruise to cruise and caused disputes. Custom tip-out software now calculates, splits and tracks every payout automatically. Shipped, engagement closed, client owns the code.",
};

export default function PalapaPage() {
  return (
    <>
      <CaseHeader slug="palapa-tours" kicker="Case study 03 · Palapa Tours" />
      <CaseSections slug="palapa-tours" to={4} />
      <WorkflowMorph />
      <CaseSections slug="palapa-tours" from={4} />
      <CaseSource slug="palapa-tours" />
      <CtaBand title="Small problem. Real operational impact." text="A narrow workflow that only works because one person remembers the rule is exactly the kind of thing worth thirty minutes." />
    </>
  );
}
