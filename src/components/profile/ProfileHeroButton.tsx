"use client";

import Image from "next/image";
import * as React from "react";

export default function ProfileHeroButton({
  name = "James Spalding",
  title = "Professional Profile Page",
  headshotSrc = "/James2025Profile.png",
  headshotPosition = "center 38%",
  blurb = "View detailed experience, strengths, and links.",
}: {
  name?: string;
  title?: string;
  headshotSrc?: string;
  headshotPosition?: string;
  blurb?: string;
}) {
  return (
    <section className="rounded-2xl sm:rounded-3xl bg-[var(--surface,#f8fafc)] border border-zinc-200/70 dark:border-zinc-800/60 p-4 sm:p-6">
      <div className="grid grid-cols-[auto,1fr] gap-4 sm:gap-6 items-center">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-[0_0_0_6px_#fff,0_2px_20px_rgba(0,0,0,.08)]">
          <Image
            src={headshotSrc}
            alt={`${name} headshot`}
            width={160}
            height={160}
            sizes="(max-width: 720px) 120px, 140px"
            priority
            style={{ objectFit: "cover", width: "100%", height: "100%", objectPosition: headshotPosition }}
          />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 mb-1">{name}</h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">{title}</p>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm">{blurb}</p>
        </div>
      </div>
    </section>
  );
}
