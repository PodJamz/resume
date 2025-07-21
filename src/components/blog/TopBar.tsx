"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface TopBarProps {
  onSearch?: (query: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onSearch }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  useEffect(() => {
    // Check if browser navigation is available
    setCanGoBack(window.history.length > 1);
    // Note: canGoForward is harder to detect reliably, but we'll try
    const handlePopState = () => {
      setCanGoBack(window.history.length > 1);
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleGoBack = () => {
    if (canGoBack) {
      router.back();
    }
  };

  const handleGoForward = () => {
    router.forward();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or trigger search
      onSearch?.(searchQuery);
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      {/* Left: macOS traffic lights and nav */}
      <div className="flex items-center gap-4">
        <div className="flex gap-1 mr-4">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-300" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <button 
          onClick={handleGoBack}
          disabled={!canGoBack}
          aria-label="Go back"
          className={`w-6 h-6 flex items-center justify-center transition-colors ${
            canGoBack 
              ? "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200" 
              : "text-zinc-300 dark:text-zinc-600 cursor-not-allowed"
          }`}
        >
          {/* Back arrow */}
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M12 15l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button 
          onClick={handleGoForward}
          aria-label="Go forward"
          className="w-6 h-6 flex items-center justify-center text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
        >
          {/* Forward arrow */}
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="ml-4 px-3 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-xs font-mono text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">Blog</div>
      </div>
      {/* Center: search */}
      <div className="flex-1 flex justify-center">
        <form onSubmit={handleSearchSubmit} className="relative w-80 max-w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search posts..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-indigo-500 transition-colors"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="8.5" cy="8.5" r="6.5" stroke="currentColor" strokeWidth="2"/><path d="M16 16l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </form>
      </div>
      {/* Right: avatar only */}
      <div className="flex items-center">
        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 via-pink-400 to-purple-600 flex items-center justify-center">
          {/* Placeholder for avatar */}
          <span className="w-4 h-4 rounded-full bg-white/60" />
        </span>
      </div>
    </header>
  );
}; 