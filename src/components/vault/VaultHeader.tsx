import React from "react";

interface VaultHeaderProps {
  title: string;
  summary?: string;
  isPrivate?: boolean;
}

export function VaultHeader({ title, summary, isPrivate = false }: VaultHeaderProps) {
  return (
    <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 truncate">
            {title}
          </h1>
          {summary && (
            <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
              {summary}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isPrivate && (
            <span className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-800 px-2.5 py-1 text-xs text-zinc-700 dark:text-zinc-300 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-sm">
              Private
            </span>
          )}
        </div>
      </div>
      <div className="mt-6 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
    </header>
  );
}
