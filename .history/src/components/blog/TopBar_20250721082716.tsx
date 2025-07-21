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

  const scrollToComments = () => {
    const commentsSection = document.getElementById('comments');
    if (commentsSection) {
      commentsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
      {/* Left: macOS traffic lights and nav - hidden on mobile */}
      <div className="hidden sm:flex items-center gap-2 lg:gap-4">
        <div className="flex gap-1 mr-2 lg:mr-4">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-300" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <button 
          onClick={handleGoBack}
          disabled={!canGoBack}
          aria-label="Go back"
          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
            canGoBack 
              ? "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800" 
              : "text-zinc-300 dark:text-zinc-600 cursor-not-allowed"
          }`}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><path d="M11 13l-4-4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button 
          onClick={handleGoForward}
          aria-label="Go forward"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><path d="M7 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="ml-2 lg:ml-4 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs font-mono text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">Blog</div>
      </div>

      {/* Mobile: Just blog indicator */}
      <div className="sm:hidden flex items-center gap-3">
        <button 
          onClick={handleGoBack}
          disabled={!canGoBack}
          aria-label="Go back"
          className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${
            canGoBack 
              ? "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95" 
              : "text-zinc-300 dark:text-zinc-600 cursor-not-allowed"
          }`}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M12 15l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-mono text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">Blog</div>
      </div>
      
      {/* Center: search - responsive width */}
      <div className="flex-1 flex justify-center px-2 sm:px-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search posts..."
            className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all border border-zinc-200 dark:border-zinc-700"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-indigo-500 transition-colors"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/><path d="M14 14l-2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </form>
      </div>
      
      {/* Right: Comment button and avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Add comment button - perfectly positioned for thumbs */}
        <button
          onClick={scrollToComments}
          aria-label="Jump to comments"
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="flex-shrink-0">
            <path d="M2 6c0-1.105.895-2 2-2h8c1.105 0 2 .895 2 2v4c0 1.105-.895 2-2 2H7l-3 2v-2H4c-1.105 0-2-.895-2-2V6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="hidden sm:inline">Comment</span>
        </button>
        
        {/* Avatar */}
        <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-indigo-400 via-pink-400 to-purple-600 flex items-center justify-center flex-shrink-0">
          <span className="w-4 h-4 rounded-full bg-white/60" />
        </span>
      </div>
    </header>
  );
}; 