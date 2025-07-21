import React from "react";

interface Author {
  name: string;
  role: string;
  gradientClass: string;
}

interface PostHeaderProps {
  title: string;
  subtitle: string;
  authors: Author[];
}

export const PostHeader: React.FC<PostHeaderProps> = ({ title, subtitle, authors }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-zinc-100" style={{ fontSize: 32 }}>{title}</h1>
      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm text-zinc-500 dark:text-zinc-400" style={{ fontSize: 14 }}>{subtitle}</span>
        <div className="flex items-center gap-2 ml-4">
          {authors.map((author) => (
            <div key={author.name} className="relative group">
              <span
                className={`w-6 h-6 rounded-full bg-gradient-to-br ${author.gradientClass} flex items-center justify-center border-2 border-white dark:border-zinc-900`}
                style={{ width: 24, height: 24 }}
              />
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 z-10 hidden group-hover:block bg-zinc-900 text-white text-xs rounded px-2 py-1 shadow-lg whitespace-nowrap">
                <span className="font-semibold">{author.name}</span> <span className="text-zinc-400">({author.role})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 