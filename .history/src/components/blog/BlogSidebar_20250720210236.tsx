"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  id: string;
  title: string;
  gradient: string;
  isActive?: boolean;
}

interface BlogSidebarProps {
  items: SidebarItem[];
}

export const BlogSidebar: React.FC<BlogSidebarProps> = ({ items }) => {
  const pathname = usePathname();
  const currentSlug = pathname?.split("/").pop();

  return (
    <aside className="w-[280px] min-h-screen flex flex-col justify-between bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-4">
      <div>
        <div className="flex items-center mb-8">
          <span className="font-bold text-lg tracking-tight mr-2">AI James</span>
          <span className="inline-block w-6 h-6 rounded bg-gradient-to-br from-indigo-400 to-purple-600" />
        </div>
        <nav className="flex flex-col gap-2">
          {items.map((item) => {
            const isActive = item.id === currentSlug;
            return (
              <Link
                key={item.id}
                href={`/blog/${item.id}`}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-[15px] font-medium ${isActive ? "bg-zinc-100 dark:bg-zinc-800 font-bold border-l-4 border-indigo-400 dark:border-purple-500 shadow-md" : "hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}
                aria-current={isActive ? "page" : undefined}
                scroll={false}
                style={{ marginBottom: 8 }}
              >
                <span
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center transition-all duration-200 ${isActive ? "ring-2 ring-indigo-400 dark:ring-purple-500" : ""}`}
                  style={{ minWidth: 32, minHeight: 32 }}
                >
                  {/* Placeholder icon */}
                  <span className="w-5 h-5 bg-white/60 rounded-full" />
                </span>
                <span className="flex-1 flex items-center" style={{ minHeight: 32 }}>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <button
        className="flex items-center gap-2 mt-8 px-4 py-3 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold shadow-lg hover:opacity-90 transition-all text-[15px]"
        type="button"
        style={{ minHeight: 44 }}
      >
        <span className="w-6 h-6 bg-gradient-to-br from-pink-400 to-red-400 rounded-full flex items-center justify-center" />
        Add comment
      </button>
    </aside>
  );
}; 