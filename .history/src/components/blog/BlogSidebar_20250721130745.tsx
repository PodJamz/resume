"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FolderCard from "@/components/ui/folder-card";
import HalftoneWaveMini from "./HalftoneWaveMini";
import Image from "next/image";

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
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-[280px]'} min-h-screen flex flex-col justify-between bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-4 transition-all duration-300 ease-in-out`}>
      <div>
        <div className="flex items-center mb-8 justify-center">
          <div 
            className="cursor-pointer transition-all duration-300"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <FolderCard 
              title={!isCollapsed ? "AI James" : undefined}
              isOpen={!isCollapsed}
            />
          </div>
        </div>
        
        {!isCollapsed && (
          <nav className="flex flex-col gap-2 animate-in fade-in duration-300">
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
        )}
        
        {isCollapsed && (
          <div className="flex flex-col items-center gap-4 animate-in fade-in duration-300">
            {items.map((item) => {
              const isActive = item.id === currentSlug;
              return (
                <Link
                  key={item.id}
                  href={`/blog/${item.id}`}
                  className={`w-12 h-12 rounded-xl transition-all duration-200 flex items-center justify-center ${isActive ? "bg-zinc-100 dark:bg-zinc-800 ring-2 ring-indigo-400 dark:ring-purple-500" : "hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}
                  aria-current={isActive ? "page" : undefined}
                  scroll={false}
                  title={item.title}
                >
                  <span
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center transition-all duration-200`}
                  >
                    <span className="w-4 h-4 bg-white/60 rounded-full" />
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      
    </aside>
  );
}; 