"use client";

import { useId, useMemo, useState } from "react";
import { track } from "@/lib/track";

/**
 * The live site's ROI calculator, kept because it is the most honest thing on
 * the page: numbers you enter, 48 working weeks assumed, not a promise.
 */
const WEEKS = 48;
const fmt = (n: number) => n.toLocaleString("en-CA", { maximumFractionDigits: 0 });

export function RoiCalculator() {
  const [people, setPeople] = useState(3);
  const [hours, setHours] = useState(6);
  const [rate, setRate] = useState(40);
  const id = useId();

  const out = useMemo(() => {
    const h = people * hours * WEEKS;
    return { hours: h, dollars: h * rate };
  }, [people, hours, rate]);

  const field = (label: string, value: number, set: (v: number) => void, min: number, max: number, suffix = "") => {
    const fid = `${id}-${label.replace(/\s/g, "")}`;
    return (
      <div>
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor={fid} className="label !mb-0">{label}</label>
          <span className="tabular text-paper font-medium">{suffix === "$" ? `$${value}` : value}{suffix !== "$" ? suffix : ""}</span>
        </div>
        <input
          id={fid}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => { set(Number(e.target.value)); track("roi_calculated", { people, hours, rate }); }}
          className="w-full mt-2 accent-[#2f6bff] h-11 cursor-pointer"
          aria-valuetext={suffix === "$" ? `$${value} per hour` : `${value}${suffix}`}
        />
        <p className="fig mt-1">{suffix === "$" ? `$${min} to $${max}` : `${min} to ${max}`}</p>
      </div>
    );
  };

  return (
    <div className="glass p-5 md:p-6" data-cursor="explore">
      <p className="fig"><b>Fig. 10</b> · Run your own numbers</p>
      <h3 className="display display-sm text-paper mt-2">The number we would be measured against.</h3>
      <p className="text-sm text-silver mt-2">Put your own headcount, hours and hourly cost in. Whatever this prints is the kind of figure that goes on the signed page, once we have measured it with you rather than guessed it.</p>
      <div className="grid gap-5 mt-6">
        {field("People doing the manual work", people, setPeople, 1, 50)}
        {field("Hours per person per week", hours, setHours, 1, 40, " h")}
        {field("Average hourly cost", rate, setRate, 15, 200, "$")}
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6 border-t hairline pt-5" aria-live="polite">
        <div>
          <p className="display display-md tabular text-paper">{fmt(out.hours)}</p>
          <p className="fig mt-1">Hours recovered per year</p>
        </div>
        <div>
          <p className="display display-md tabular text-advance">${fmt(out.dollars)}</p>
          <p className="fig mt-1">Dollars recovered per year</p>
        </div>
      </div>
      <p className="mono-lc text-xs text-stone mt-4 leading-6">
        {people} × {hours} hrs/week × {WEEKS} weeks = {fmt(out.hours)} hrs/year<br />
        {fmt(out.hours)} hrs/year × ${rate}/hr = ${fmt(out.dollars)}/year
      </p>
      <p className="text-xs text-stone mt-3">An estimate from numbers you enter, not a promise. {WEEKS} working weeks assumed. Your real figure depends on the process we replace, and only the measured version goes on the signed page.</p>
    </div>
  );
}
