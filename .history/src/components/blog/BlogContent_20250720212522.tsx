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

      {/* Content with custom editorial styling */}
      <div className="prose prose-lg dark:prose-invert max-w-none prose-zinc editorial-content">
        {children}
      </div>

      {/* Custom CSS for editorial styling */}
      <style jsx global>{`
        .editorial-content {
          line-height: 1.8;
        }

        .editorial-content p:first-of-type::first-letter {
          font-size: 4rem;
          font-weight: 700;
          float: left;
          line-height: 1;
          margin-top: 0.1em;
          margin-right: 0.1em;
          margin-bottom: -0.1em;
          color: rgb(99 102 241);
        }

        .dark .editorial-content p:first-of-type::first-letter {
          color: rgb(129 140 248);
        }

        .editorial-content p:first-of-type {
          font-size: 1.25rem;
          line-height: 1.7;
          margin-bottom: 2rem;
          font-weight: 400;
          color: rgb(82 82 91);
        }

        .dark .editorial-content p:first-of-type {
          color: rgb(161 161 170);
        }

        .editorial-content h2 {
          margin-top: 3.5rem;
          margin-bottom: 1.5rem;
          font-size: 1.875rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          color: rgb(24 24 27);
        }

        .dark .editorial-content h2 {
          color: rgb(244 244 245);
        }

        .editorial-content h3 {
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          font-size: 1.5rem;
          font-weight: 600;
          color: rgb(24 24 27);
        }

        .dark .editorial-content h3 {
          color: rgb(244 244 245);
        }

        .editorial-content blockquote {
          border-left: 4px solid rgb(99 102 241);
          background: rgb(250 250 250);
          padding: 1.5rem 2rem;
          margin: 2.5rem 0;
          border-radius: 0.75rem;
          font-style: italic;
          font-size: 1.125rem;
          position: relative;
        }

        .dark .editorial-content blockquote {
          background: rgb(24 24 27);
          border-left-color: rgb(129 140 248);
        }

        .editorial-content code {
          background: rgb(244 244 245);
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .dark .editorial-content code {
          background: rgb(39 39 42);
        }

        .editorial-content a {
          text-decoration: none;
          font-weight: 500;
          border-bottom: 1px solid currentColor;
          transition: all 0.2s ease;
          color: rgb(99 102 241);
        }

        .dark .editorial-content a {
          color: rgb(129 140 248);
        }

        .editorial-content a:hover {
          border-bottom-width: 2px;
        }

        .editorial-content ul li::marker {
          color: rgb(99 102 241);
        }

        .dark .editorial-content ul li::marker {
          color: rgb(129 140 248);
        }

        .editorial-content p {
          color: rgb(63 63 70);
          margin-bottom: 1.5rem;
        }

        .dark .editorial-content p {
          color: rgb(212 212 216);
        }
      `}</style>
    </article>
  );
}; 