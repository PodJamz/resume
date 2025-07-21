"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GripIcon } from "@/components/ui/grip-icon";

interface TopBarProps {
  onSearch?: (query: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onSearch }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

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
      
      {/* Right: Menu, Theme, Comment, and Avatar */}
      <div className="flex items-center gap-2">
        {/* App menu - Gmail style */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open app menu"
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <GripIcon size={18} />
          </button>
          
          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 top-12 w-72 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-3 gap-4">
                {/* App shortcuts - Gmail style */}
                <div className="flex flex-col items-center p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                    <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-zinc-700 dark:text-zinc-300 text-center">Blog</span>
                </div>
                
                <div className="flex flex-col items-center p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mb-2">
                    <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-zinc-700 dark:text-zinc-300 text-center">Projects</span>
                </div>
                
                <div className="flex flex-col items-center p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mb-2">
                    <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-zinc-700 dark:text-zinc-300 text-center">Resume</span>
                </div>
                
                <div className="flex flex-col items-center p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mb-2">
                    <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-zinc-700 dark:text-zinc-300 text-center">Contact</span>
                </div>
                
                <div className="flex flex-col items-center p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mb-2">
                    <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                      <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4zm-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-zinc-700 dark:text-zinc-300 text-center">Code</span>
                </div>
                
                <div className="flex flex-col items-center p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center mb-2">
                    <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-zinc-700 dark:text-zinc-300 text-center">About</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Theme selector button */}
        <button
          aria-label="Toggle theme"
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="flex-shrink-0">
            <path d="M12 2a9.97 9.97 0 0 1 7.07 2.93A9.97 9.97 0 0 1 22 12a9.97 9.97 0 0 1-2.93 7.07A9.97 9.97 0 0 1 12 22a9.97 9.97 0 0 1-7.07-2.93A9.97 9.97 0 0 1 2 12a9.97 9.97 0 0 1 2.93-7.07A9.97 9.97 0 0 1 12 2z" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="9" cy="9" r="1" fill="currentColor"/>
            <circle cx="15" cy="9" r="1" fill="currentColor"/>
          </svg>
        </button>

        {/* Chat button - clean icon only */}
        <button
          onClick={scrollToComments}
          aria-label="Jump to comments"
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="flex-shrink-0">
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
                 {/* Avatar */}
         <Avatar className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 ring-2 ring-white/20 hover:ring-white/40 transition-all duration-200">
           <AvatarImage src="/me.png" alt="James Spalding" className="object-cover" />
           <AvatarFallback className="bg-gradient-to-br from-indigo-400 via-pink-400 to-purple-600 text-white font-semibold text-sm">
             JS
           </AvatarFallback>
         </Avatar>
      </div>
    </header>
  );
}; 