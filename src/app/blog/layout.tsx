import React from "react";
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

  return (
    <BlogLayoutClient 
      posts={posts}
      sidebarItems={sidebarItems}
      bookmarks={[]} // Empty array for backward compatibility
    >
      {children}
    </BlogLayoutClient>
  );
} 