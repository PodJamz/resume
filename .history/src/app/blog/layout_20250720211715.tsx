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

interface BlogLayoutClientProps {
  children: React.ReactNode;
  posts: BlogPost[];
}

function BlogLayoutClient({ children, posts }: BlogLayoutClientProps) {
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

  const sidebarItems = filteredPosts.map((post) => ({
    id: post.slug,
    title: post.metadata.title,
    gradient: post.metadata.authors?.[0]?.gradientClass || "from-indigo-400 to-purple-600",
    isActive: false,
  }));

  const bookmarks = posts
    .filter((post) => post.metadata.bookmarked)
    .map((post) => ({
      title: post.metadata.title,
      gradient: post.metadata.authors?.[0]?.gradientClass || "from-indigo-400 to-purple-600",
      description: post.metadata.summary,
    }));

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
      {/* Top Bar - Full Width */}
      <TopBar onSearch={handleSearch} />
      
      {/* Main Content Area - 3 Column Layout */}
      <div className="flex flex-1 h-full">
        {/* Left Sidebar - Fixed Width */}
        <div className="flex-shrink-0">
          <BlogSidebar items={sidebarItems} />
        </div>
        
        {/* Main Content - Flexible */}
        <main className="flex-1 min-w-0 px-8 py-8 overflow-y-auto">
          {searchQuery && (
            <div className="mb-6">
              <h2 className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                {filteredPosts.length} result{filteredPosts.length === 1 ? '' : 's'} for "{searchQuery}"
              </h2>
            </div>
          )}
          {children}
        </main>
        
        {/* Right Sidebar - Fixed Width */}
        <div className="flex-shrink-0">
          <RightSidebar bookmarks={bookmarks} />
        </div>
      </div>
    </div>
  );
}

// Server Component that loads data and passes to client
export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  const { getBlogPosts } = await import("@/data/blog");
  const posts = await getBlogPosts();

  return (
    <BlogLayoutClient posts={posts}>
      {children}
    </BlogLayoutClient>
  );
} 