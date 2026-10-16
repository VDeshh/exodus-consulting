import type { Metadata } from "next";
import { ProofStream } from "@/components/scenes/ProofStream";
import { WorkRows } from "@/components/work/WorkRows";
import { CtaBand } from "@/components/ui/CtaBand";
import { proof } from "@/content/facts";

export const metadata: Metadata = {
  title: "Work: Fennec, Uniserve, Palapa Tours, B-Side Group",
  description: "Five engagements at their real status: two live, one shipped, two in build. Explore by the problem you are trying to fix, not by industry.",
};

export default function Work() {
  return (
    <>
      <ProofStream
        variant="hero"
        eyebrow={<><b>Work</b> · {proof.engagements} engagements · {proof.live} live · {proof.shipped} shipped · {proof.inBuild} in build</>}
        title="Everything we have built, at its real status."
        lede="Nothing here is a proposal. Most consulting portfolios flatten everything into one tense, so a system that went live last year reads the same as one still being written. Ours does not."
      />
      <section className="pt-16 pb-20">
        <WorkRows />
      </section>
      <CtaBand title="Your workflow could be the sixth." text="Tell us the process that annoys you most. We map where it leaks, put a number on it, and say plainly whether it is worth building." />
    </>
  );
}
