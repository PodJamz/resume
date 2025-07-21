"use client";

import React, { useState, useMemo } from "react";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { TopBar } from "@/components/blog/TopBar";
import { RightSidebar } from "@/components/blog/RightSidebar";

interface BlogPost {
  slug: string;
  metadata: {
    title: string;
    summary: string;
    authors?: Array<{
      name: string;
      role: string;
      gradientClass: string;
    }>;
    bookmarked?: boolean;
  };
  source: string;
}

interface SidebarItem {
  id: string;
  title: string;
  gradient: string;
  isActive: boolean;
}

interface Bookmark {
  title: string;
  gradient: string;
  description: string;
}

interface BlogLayoutClientProps {
  children: React.ReactNode;
  posts: BlogPost[];
  sidebarItems: SidebarItem[];
  bookmarks: Bookmark[];
}

export function BlogLayoutClient({ children, posts, sidebarItems, bookmarks }: BlogLayoutClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    
    const query = searchQuery.toLowerCase();
    return posts.filter(post => 
      post.metadata.title.toLowerCase().includes(query) ||
      post.metadata.summary.toLowerCase().includes(query) ||
      post.source.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  // Filter sidebar items based on search
  const filteredSidebarItems = useMemo(() => {
    if (!searchQuery.trim()) return sidebarItems;
    
    const query = searchQuery.toLowerCase();
    return sidebarItems.filter(item => 
      item.title.toLowerCase().includes(query)
    );
  }, [sidebarItems, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
      {/* Top Bar - Full Width */}
      <TopBar onSearch={handleSearch} />
      
      {/* Main Content Area - Responsive Layout */}
      <div className="flex flex-1 h-full">
        {/* Left Sidebar - Hidden on mobile, overlay on tablet */}
        <div className="hidden lg:flex flex-shrink-0">
          <BlogSidebar items={filteredSidebarItems} />
        </div>
        
        {/* Main Content - Flexible with mobile-first padding */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 overflow-y-auto">
          {searchQuery ? (
            <div>
              <div className="mb-6">
                <h2 className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                  {filteredPosts.length} result{filteredPosts.length === 1 ? '' : 's'} for &ldquo;{searchQuery}&rdquo;
                </h2>
              </div>
              {filteredPosts.length > 0 ? (
                <div className="space-y-6">
                  {filteredPosts.map((post) => (
                    <article key={post.slug} className="border-b border-zinc-200 dark:border-zinc-800 pb-6 last:border-b-0">
                      <a href={`/blog/${post.slug}`} className="group block">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${post.metadata.authors?.[0]?.gradientClass || 'from-indigo-400 to-purple-600'} flex-shrink-0`} />
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {post.metadata.title}
                            </h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                              {post.metadata.summary}
                            </p>
                            {post.metadata.authors && (
                              <div className="flex items-center gap-2 mt-3">
                                <span className="text-xs text-zinc-500">by</span>
                                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                  {post.metadata.authors[0].name}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </a>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-zinc-400">
                      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">No results found</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">Try searching with different keywords</p>
                </div>
              )}
            </div>
          ) : (
            children
          )}
        </main>
        
        {/* Right Sidebar - Hidden on mobile and tablet */}
        <div className="hidden xl:flex flex-shrink-0">
          <RightSidebar bookmarks={bookmarks} />
        </div>
      </div>
    </div>
  );
} 