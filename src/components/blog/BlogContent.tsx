import React from "react";

interface BlogContentProps {
  heroImageGradient: string;
  imageCaption?: string;
  children: React.ReactNode;
}

export const BlogContent: React.FC<BlogContentProps> = ({ heroImageGradient, imageCaption, children }) => {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Hero Image */}
      <div className="mb-16">
        <div
          className="w-full h-96 md:h-[500px] rounded-3xl shadow-2xl bg-gradient-to-br transform hover:scale-[1.02] transition-transform duration-500"
          style={{ background: heroImageGradient }}
          aria-label="Hero image"
        />
        {imageCaption && (
          <figcaption className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-6 italic font-medium">
            {imageCaption}
          </figcaption>
        )}
      </div>

      {/* Content with editorial styling using Tailwind classes */}
      <div className="prose prose-lg dark:prose-invert max-w-none prose-zinc prose-indigo">
        <div className="[&>p:first-of-type]:text-xl [&>p:first-of-type]:leading-relaxed [&>p:first-of-type]:text-zinc-600 dark:[&>p:first-of-type]:text-zinc-400 [&>p:first-of-type]:mb-8 [&>p:first-of-type]:font-normal [&>p:first-of-type:first-letter]:text-6xl [&>p:first-of-type:first-letter]:font-bold [&>p:first-of-type:first-letter]:float-left [&>p:first-of-type:first-letter]:mr-2 [&>p:first-of-type:first-letter]:mt-1 [&>p:first-of-type:first-letter]:leading-none [&>p:first-of-type:first-letter]:text-indigo-600 dark:[&>p:first-of-type:first-letter]:text-indigo-400 [&>h2]:mt-14 [&>h2]:mb-6 [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:tracking-tight [&>h3]:mt-10 [&>h3]:mb-4 [&>h3]:text-2xl [&>h3]:font-semibold [&>blockquote]:border-l-4 [&>blockquote]:border-indigo-500 [&>blockquote]:bg-zinc-50 dark:[&>blockquote]:bg-zinc-900 dark:[&>blockquote]:border-indigo-400 [&>blockquote]:p-6 [&>blockquote]:my-10 [&>blockquote]:rounded-xl [&>blockquote]:text-lg [&>blockquote]:italic [&>code]:bg-zinc-100 dark:[&>code]:bg-zinc-800 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:font-medium [&>a]:no-underline [&>a]:font-medium [&>a]:border-b [&>a]:border-current [&>a]:transition-all hover:[&>a]:border-b-2 [&>ul>li::marker]:text-indigo-500 dark:[&>ul>li::marker]:text-indigo-400 leading-8">
          {children}
        </div>
      </div>
    </article>
  );
}; 