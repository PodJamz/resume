"use client";

import * as React from "react";
import { Dumbbell } from "lucide-react";

export default function StrengthsHeroButton({
  title = "Strengths Analysis",
  line1 = "Core skills scorecard",
  line2 = "Where I partner",
  line3 = "Fit for this role",
}: {
  title?: string;
  line1?: string;
  line2?: string;
  line3?: string;
}) {
  return (
    <section className="rounded-2xl sm:rounded-3xl bg-[var(--surface,#f8fafc)] border border-zinc-200/70 dark:border-zinc-800/60 p-4 sm:p-6">
      <div className="grid grid-cols-[auto,1fr] gap-4 sm:gap-6 items-center">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-indigo-600/10 dark:bg-indigo-400/10 border border-indigo-200/60 dark:border-indigo-900/60 flex items-center justify-center shadow-[0_0_0_6px_#fff,0_2px_20px_rgba(0,0,0,.06)]">
          <Dumbbell className="w-12 h-12 sm:w-14 sm:h-14 text-indigo-600 dark:text-indigo-400" strokeWidth={2.2} />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 mb-1">{title}</h2>
          <ul className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 space-y-1">
            <li>{line1}</li>
            <li>{line2}</li>
            <li>{line3}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
