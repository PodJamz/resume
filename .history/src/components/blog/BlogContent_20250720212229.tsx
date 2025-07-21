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
      <div className="mb-12">
        <div
          className="w-full h-96 md:h-[500px] rounded-3xl shadow-2xl bg-gradient-to-br"
          style={{ background: heroImageGradient }}
          aria-label="Hero image"
        />
        {imageCaption && (
          <figcaption className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-4 italic">
            {imageCaption}
          </figcaption>
        )}
      </div>

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none prose-zinc">
        {/* Custom prose styles for luxury editorial feel */}
        <style jsx global>{`
          .prose {
            --tw-prose-body: theme(colors.zinc.700);
            --tw-prose-headings: theme(colors.zinc.900);
            --tw-prose-lead: theme(colors.zinc.600);
            --tw-prose-links: theme(colors.indigo.600);
            --tw-prose-bold: theme(colors.zinc.900);
            --tw-prose-counters: theme(colors.zinc.500);
            --tw-prose-bullets: theme(colors.zinc.300);
            --tw-prose-hr: theme(colors.zinc.200);
            --tw-prose-quotes: theme(colors.zinc.900);
            --tw-prose-quote-borders: theme(colors.zinc.200);
            --tw-prose-captions: theme(colors.zinc.500);
            --tw-prose-code: theme(colors.zinc.900);
            --tw-prose-pre-code: theme(colors.zinc.200);
            --tw-prose-pre-bg: theme(colors.zinc.800);
            --tw-prose-th-borders: theme(colors.zinc.300);
            --tw-prose-td-borders: theme(colors.zinc.200);
          }
          
          .dark .prose {
            --tw-prose-body: theme(colors.zinc.300);
            --tw-prose-headings: theme(colors.zinc.100);
            --tw-prose-lead: theme(colors.zinc.400);
            --tw-prose-links: theme(colors.indigo.400);
            --tw-prose-bold: theme(colors.zinc.100);
            --tw-prose-counters: theme(colors.zinc.400);
            --tw-prose-bullets: theme(colors.zinc.600);
            --tw-prose-hr: theme(colors.zinc.700);
            --tw-prose-quotes: theme(colors.zinc.100);
            --tw-prose-quote-borders: theme(colors.zinc.700);
            --tw-prose-captions: theme(colors.zinc.400);
            --tw-prose-code: theme(colors.zinc.100);
            --tw-prose-pre-code: theme(colors.zinc.200);
            --tw-prose-pre-bg: theme(colors.zinc.800);
            --tw-prose-th-borders: theme(colors.zinc.600);
            --tw-prose-td-borders: theme(colors.zinc.700);
          }

          .prose p:first-of-type {
            font-size: 1.25rem;
            line-height: 1.6;
            color: var(--tw-prose-lead);
            margin-bottom: 2rem;
          }

          .prose h2 {
            margin-top: 3rem;
            margin-bottom: 1.5rem;
            font-size: 1.875rem;
            font-weight: 700;
          }

          .prose h3 {
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            font-size: 1.5rem;
            font-weight: 600;
          }

          .prose blockquote {
            border-left: 4px solid theme(colors.indigo.500);
            background: theme(colors.zinc.50);
            padding: 1.5rem;
            margin: 2rem 0;
            border-radius: 0.5rem;
            font-style: italic;
          }

          .dark .prose blockquote {
            background: theme(colors.zinc.900);
            border-left-color: theme(colors.indigo.400);
          }

          .prose code {
            background: theme(colors.zinc.100);
            padding: 0.25rem 0.5rem;
            border-radius: 0.375rem;
            font-size: 0.875rem;
          }

          .dark .prose code {
            background: theme(colors.zinc.800);
          }
        `}</style>
        
        <div className="first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none first-letter:text-zinc-900 dark:first-letter:text-zinc-100">
          {children}
        </div>
      </div>
    </article>
  );
}; 