import React from "react";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { TopBar } from "@/components/blog/TopBar";
import { RightSidebar } from "@/components/blog/RightSidebar";
import { getBlogPosts } from "@/data/blog";
import { usePathname } from "next/navigation";

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  const posts = await getBlogPosts();
  // Get current path for active state
  // (In RSC, can't use usePathname, so fallback to window.location if needed in client component)
  // For now, mark none as active; wire up in client if needed.

  const sidebarItems = posts.map((post) => ({
    id: post.slug,
    title: post.metadata.title,
    gradient: post.metadata.authors?.[0]?.gradientClass || "from-indigo-400 to-purple-600",
    isActive: false, // Will be set in client if needed
  }));

  const bookmarks = posts
    .filter((post) => post.metadata.bookmarked)
    .map((post) => ({
      title: post.metadata.title,
      gradient: post.metadata.authors?.[0]?.gradientClass || "from-indigo-400 to-purple-600",
      description: post.metadata.summary,
    }));

  const handleSidebarSelect = (id: string) => {};
  const handleAddComment = () => {};

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
      <TopBar />
      <div className="flex flex-1 w-full max-w-[1600px] mx-auto">
        <BlogSidebar items={sidebarItems} onSelect={handleSidebarSelect} onAddComment={handleAddComment} />
        <main className="flex-1 px-8 py-8 overflow-y-auto">{children}</main>
        <RightSidebar bookmarks={bookmarks} />
      </div>
    </div>
  );
} 