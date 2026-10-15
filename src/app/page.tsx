import { Hero } from "@/components/scenes/Hero";
import { Integration } from "@/components/scenes/Integration";
import { TaskCollapse } from "@/components/scenes/TaskCollapse";
import { AuditXray } from "@/components/scenes/AuditXray";
import { Stages } from "@/components/scenes/Stages";
import { WorkflowMorph } from "@/components/scenes/WorkflowMorph";
import { Transition } from "@/components/scenes/Transition";
import { Ledger } from "@/components/scenes/Ledger";
import { ProofStream } from "@/components/scenes/ProofStream";
import { FennecOS } from "@/components/scenes/FennecOS";
import { Ferry } from "@/components/scenes/Ferry";
import { Process } from "@/components/scenes/Process";
import { Founders } from "@/components/scenes/Founders";
import { Depart } from "@/components/scenes/Depart";
import { fennecVenues, proof } from "@/content/facts";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="section-tight border-t hairline" aria-label="Where things stand">
        <div className="wrap grid gap-6 md:grid-cols-3">
          <p className="display display-sm text-paper md:col-span-3 max-w-3xl">
            Two founders. Direct access. No account managers, no slide decks. You own the code. The number is agreed before we start.
          </p>
          <div className="fig">
            <b>{proof.engagements} engagements</b> · {proof.live} live · {proof.shipped} shipped · {proof.inBuild} in build
          </div>
          <div className="fig">
            <b>Fennec</b> live at {fennecVenues.join(", ")}
          </div>
          <div className="fig">
            <b>{proof.eventCompanies} event companies</b> publishing on the Fennec network
          </div>
        </div>
      </section>
      <Integration />
      <TaskCollapse />
      <AuditXray />
      <Stages />
      <WorkflowMorph />
      <Transition />
      <ProofStream
        eyebrow={<><b>07</b> · The proof</>}
        title="The new way is already running."
        lede="Not a mockup. Fennec is the operating system we co-founded, live in venues tonight. What follows is every engagement at its real status."
      />
      <Ledger compact />
      <FennecOS />
      <Ferry />
      <Process />
      <Founders />
      <Depart />
    </>
  );
}
