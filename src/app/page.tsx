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
            Two founders. Direct access. Builds that run on their own, with optional monthly support for bigger projects. You own the code. The number is agreed before we start.
          </p>
          {/* Figures carry themselves. Three mono-caps runs reading like a
              readout was the loudest generated-looking thing on the page. */}
          <div className="md:col-span-3 mt-4 grid gap-8 border-t hairline pt-8 md:grid-cols-3 md:gap-10">
            <div>
              <p className="display display-md text-paper tabular">{proof.engagements}</p>
              <p className="text-paper font-medium mt-2">Engagements</p>
              <p className="note mt-1">{proof.live} live · {proof.shipped} shipped · {proof.inBuild} in build</p>
            </div>
            <div className="md:border-l hairline md:pl-10">
              <p className="display display-md text-paper">Fennec</p>
              <p className="text-paper font-medium mt-2">Live tonight</p>
              <p className="note mt-1">{fennecVenues.join(", ")}</p>
            </div>
            <div className="md:border-l hairline md:pl-10">
              <p className="display display-md text-paper tabular">{proof.eventCompanies}</p>
              <p className="text-paper font-medium mt-2">Event companies</p>
              <p className="note mt-1">Publishing on the Fennec network</p>
            </div>
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
