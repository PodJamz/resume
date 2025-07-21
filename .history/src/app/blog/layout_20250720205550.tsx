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
      <TopBar />
      <div className="flex flex-1 w-full max-w-[1600px] mx-auto">
        <BlogSidebar items={sidebarItems} />
        <main className="flex-1 px-8 py-8 overflow-y-auto">{children}</main>
        <RightSidebar bookmarks={bookmarks} />
      </div>
    </div>
  );
} 