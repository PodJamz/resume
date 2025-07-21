import React from "react";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { TopBar } from "@/components/blog/TopBar";
import { RightSidebar } from "@/components/blog/RightSidebar";
import { getBlogPosts } from "@/data/blog";

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  const posts = await getBlogPosts();

  const sidebarItems = posts.map((post) => ({
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

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
      {/* Top Bar - Full Width */}
      <TopBar />
      
      {/* Main Content Area - 3 Column Layout */}
      <div className="flex flex-1 h-full">
        {/* Left Sidebar - Fixed Width */}
        <div className="flex-shrink-0">
          <BlogSidebar items={sidebarItems} />
        </div>
        
        {/* Main Content - Flexible */}
        <main className="flex-1 min-w-0 px-8 py-8 overflow-y-auto">
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