import React from "react";

interface BlogContentProps {
  heroImageGradient: string;
  imageCaption?: string;
  children: React.ReactNode;
}

export const BlogContent: React.FC<BlogContentProps> = ({ heroImageGradient, imageCaption, children }) => {
  return (
    <div className="max-w-[800px] mx-auto">
      <div
        className="w-full h-80 rounded-2xl mb-4"
        style={{ background: heroImageGradient }}
        aria-label="Hero image"
      />
      {imageCaption && (
        <div className="text-center italic text-zinc-500 dark:text-zinc-400 mb-8">{imageCaption}</div>
      )}
      <div className="prose dark:prose-invert text-base leading-relaxed">
        {children}
      </div>
    </div>
  );
}; 