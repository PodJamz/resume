import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Author {
  name: string;
  role: string;
  gradientClass: string;
}

interface PostHeaderProps {
  title: string;
  summary: string;
  publishedAt: string;
  authors: Author[];
}

export const PostHeader: React.FC<PostHeaderProps> = ({ title, summary, publishedAt, authors }) => {
  // Get initials from author name
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className="max-w-4xl mx-auto mb-12">
      {/* Title Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 mb-4">
          {title}
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
          {summary}
        </p>
      </div>

      {/* Metadata and Authors Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-zinc-200 dark:border-zinc-800">
        {/* Published Date */}
        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          Published {publishedAt}
        </div>

        {/* Authors */}
        {authors && authors.length > 0 && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">by</span>
            <div className="flex items-center gap-3">
              {authors.map((author, index) => (
                <div key={author.name} className="group relative flex items-center gap-3">
                  {/* Avatar */}
                  <Avatar className="w-10 h-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ring-2 ring-white/20">
                    <AvatarImage src="/me.png" alt={author.name} className="object-cover" />
                    <AvatarFallback className={`bg-gradient-to-br ${author.gradientClass} text-white font-semibold text-sm`}>
                      {getInitials(author.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Name and Role */}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {author.name}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {author.role}
                    </span>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 hidden group-hover:block bg-zinc-900 dark:bg-zinc-700 text-white text-xs rounded-lg px-3 py-2 shadow-xl whitespace-nowrap">
                    <div className="font-semibold">{author.name}</div>
                    <div className="text-zinc-300">{author.role}</div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-zinc-900 dark:border-t-zinc-700"></div>
                  </div>

                  {/* Separator between multiple authors */}
                  {index < authors.length - 1 && (
                    <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-700 ml-3"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}; 