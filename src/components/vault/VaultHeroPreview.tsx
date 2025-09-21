"use client";

import Link from "next/link";
import React from "react";
import ProfileHeroButton from "@/components/profile/ProfileHeroButton";
import StrengthsHeroButton from "@/components/profile/StrengthsHeroButton";

type Author = {
  name: string;
  role: string;
  gradientClass: string;
};

export type VaultPostMeta = {
  title: string;
  summary?: string;
  gradient?: string;
  authors?: Author[];
};

export function VaultHeroPreview({ slug, metadata }: { slug: string; metadata: VaultPostMeta }) {
  const { title, summary, gradient } = metadata;

  const Hero = () => {
    switch (slug) {
      case "profile":
      case "james-spalding-profile":
        return (
          <ProfileHeroButton title="Professional Profile Page" blurb="Full background, strengths, and contact." />
        );
      case "strengths-analysis":
        return <StrengthsHeroButton />;
      default:
        return (
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200/70 dark:border-zinc-800/60">
            <div
              className="w-full h-56 sm:h-64 md:h-72 lg:h-80 bg-gradient-to-br"
              style={{ background: gradient || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
              aria-label="Hero preview"
            />
            <div className="p-5 sm:p-6">
              <h2 className="text-2xl font-bold tracking-tight mb-2">{title}</h2>
              {summary && <p className="text-zinc-600 dark:text-zinc-400">{summary}</p>}
            </div>
          </div>
        );
    }
  };

  return (
    <Link href={`/vault/${slug}`} className="block focus:outline-none focus:ring-2 focus:ring-indigo-500/60 rounded-2xl">
      <Hero />
    </Link>
  );
}
