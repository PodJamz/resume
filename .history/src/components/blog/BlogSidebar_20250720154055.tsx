import React from "react";

interface SidebarItem {
  id: string;
  title: string;
  gradient: string;
  isActive?: boolean;
}

interface BlogSidebarProps {
  items: SidebarItem[];
  onSelect: (id: string) => void;
  onAddComment: () => void;
}

export const BlogSidebar: React.FC<BlogSidebarProps> = ({ items, onSelect, onAddComment }) => {
  return (
    <aside className="w-[280px] h-full flex flex-col justify-between bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-4">
      <div>
        <div className="flex items-center mb-8">
          <span className="font-bold text-lg tracking-tight mr-2">AI James</span>
          <span className="inline-block w-6 h-6 rounded bg-gradient-to-br from-indigo-400 to-purple-600" />
        </div>
        <nav className="flex flex-col gap-2">
          {items.map((item) => (
            <button
              key={item.id}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 text-sm font-medium ${item.isActive ? "bg-zinc-100 dark:bg-zinc-800 font-bold" : "hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}
              onClick={() => onSelect(item.id)}
              aria-current={item.isActive ? "page" : undefined}
            >
              <span
                className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
              >
                {/* Placeholder icon */}
                <span className="w-4 h-4 bg-white/60 rounded-full" />
              </span>
              <span>{item.title}</span>
            </button>
          ))}
        </nav>
      </div>
      <button
        className="flex items-center gap-2 mt-8 px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium shadow hover:opacity-90 transition"
        onClick={onAddComment}
      >
        <span className="w-5 h-5 bg-gradient-to-br from-pink-400 to-red-400 rounded-full flex items-center justify-center" />
        Add comment
      </button>
    </aside>
  );
}; 