import React from "react";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { TopBar } from "@/components/blog/TopBar";
import { RightSidebar } from "@/components/blog/RightSidebar";
import { getBlogPosts } from "@/data/blog";
import { BlogLayoutClient } from "@/components/blog/BlogLayoutClient";

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
    <BlogLayoutClient 
      posts={posts}
      sidebarItems={sidebarItems}
      bookmarks={bookmarks}
    >
      {children}
    </BlogLayoutClient>
  );
} 