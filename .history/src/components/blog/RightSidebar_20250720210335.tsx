import React from "react";

interface Bookmark {
  title: string;
  gradient: string;
  description: string;
}

interface RightSidebarProps {
  bookmarks: Bookmark[];
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ bookmarks }) => {
  return (
    <aside className="w-[280px] min-h-screen flex flex-col bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-4">
      <div className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100 text-lg flex items-center gap-2">
        <span>Bookmarks</span>
        <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="ml-1 text-zinc-400"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <div className="flex flex-col gap-4">
        {bookmarks.map((bm) => (
          <div key={bm.title} className="flex items-start gap-3">
            <span
              className={`w-8 h-8 rounded-lg bg-gradient-to-br ${bm.gradient} flex-shrink-0`}
            />
            <div>
              <div className="font-medium text-sm text-zinc-900 dark:text-zinc-100">{bm.title}</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{bm.description}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}; 