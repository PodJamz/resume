import React from "react";

export const TopBar: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      {/* Left: macOS traffic lights and nav */}
      <div className="flex items-center gap-4">
        <div className="flex gap-1 mr-4">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-300" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <button className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
          {/* Back arrow */}
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M12 15l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
          {/* Forward arrow */}
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="ml-4 px-3 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-xs font-mono text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">writer.ai</div>
      </div>
      {/* Center: search */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-80 max-w-full">
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
            <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="8.5" cy="8.5" r="6.5" stroke="currentColor" strokeWidth="2"/><path d="M16 16l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </span>
        </div>
      </div>
      {/* Right: actions and avatar */}
      <div className="flex items-center gap-4">
        <button className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-indigo-500">
          {/* Comment icon */}
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M4 15v2a1 1 0 001 1h10a1 1 0 001-1v-2M17 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v2m14 0v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8m14 0H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-indigo-500">
          {/* Share icon */}
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M15 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 14l6-6m0 0h-4m4 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-indigo-500">
          {/* Star icon */}
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.122-6.545L.488 7.91l6.564-.955L10 1.5l2.948 5.455 6.564.955-4.756 4.635 1.122 6.545z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
        </button>
        <button className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-indigo-500">
          {/* Menu dots */}
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="4" cy="10" r="2" fill="currentColor"/><circle cx="10" cy="10" r="2" fill="currentColor"/><circle cx="16" cy="10" r="2" fill="currentColor"/></svg>
        </button>
        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 via-pink-400 to-purple-600 flex items-center justify-center ml-2">
          {/* Placeholder for avatar */}
          <span className="w-4 h-4 rounded-full bg-white/60" />
        </span>
      </div>
    </header>
  );
}; 