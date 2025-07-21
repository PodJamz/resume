import React from "react";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { TopBar } from "@/components/blog/TopBar";
import { RightSidebar } from "@/components/blog/RightSidebar";

const sidebarItems = [
  { id: "1", title: "Generate Ideas", gradient: "from-indigo-400 to-purple-600", isActive: true },
  { id: "2", title: "Problem-Solving", gradient: "from-pink-400 to-red-400" },
  { id: "3", title: "Iterate and Refine", gradient: "from-yellow-200 to-orange-400" },
  { id: "4", title: "Industry Trends", gradient: "from-purple-300 to-pink-200" },
  { id: "5", title: "Embrace Design Thinking", gradient: "from-pink-400 to-pink-600" },
  { id: "6", title: "Promote Collaboration", gradient: "from-blue-200 to-blue-400" },
  { id: "7", title: "Encourage Diversity", gradient: "from-blue-400 to-purple-400" },
  { id: "8", title: "Identify Market Needs", gradient: "from-orange-400 to-yellow-400" },
  { id: "9", title: "Stay Updated", gradient: "from-purple-400 to-blue-400" },
  { id: "10", title: "Creative Environment", gradient: "from-pink-400 via-yellow-400 to-blue-400" },
];

const bookmarks = [
  { title: "Problem-Solving", gradient: "from-pink-400 to-red-400", description: "Focus on solving real-world problems rather than chasing trends or gimmicks. Encourage team members to think critically about the challenges faced by users and devise practical solutions that add value." },
  { title: "Iterate and Refine", gradient: "from-yellow-200 to-orange-400", description: "Embrace an iterative approach to idea generation, where concepts are refined through feedback and iteration. Encourage rapid prototyping and testing to validate assumptions and iterate based on user feedback." },
];

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  // Placeholder handlers
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