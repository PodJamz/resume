import React from "react";
import HalftoneWave from "./HalftoneWave";
import CursorIDEHero from "./CursorIDEHero";
import ProfileHero from "@/components/profile/ProfileHero";
import IrisHero from "./IrisHero";

interface BlogContentProps {
  heroImageGradient: string;
  imageCaption?: string;
  children: React.ReactNode;
  postSlug?: string;
}

export const BlogContent: React.FC<BlogContentProps> = ({ heroImageGradient, imageCaption, children, postSlug }) => {
  
  const renderHeroExperience = () => {
    switch (postSlug) {
      case 'Cursor':
        return <CursorIDEHero className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px]" />;
      case 'ND-AI':
        return <HalftoneWave className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl sm:rounded-3xl" />;
      case 'design-psychology':
        return <IrisHero className="w-full" imageSrc="/irishcountryside.png" title="Your Shortcut To Clarity" subtitle="Save thoughts the moment they appear. Keep them effortlessly organized so you always find what matters." />;
      case 'profile':
      case 'james-spalding-profile':
        return (
          <div className="w-full rounded-2xl sm:rounded-3xl">
            <ProfileHero
              name="James Spalding"
              title="Systems Analyst & Developer; Product Builder (AI Platforms)"
              location="Dublin, IE"
              bio="I map complex processes and ship simple, reliable AI native software. . "
              email="james@jamesspalding.org"
              linkedinHref="https://www.linkedin.com/in/jameslawrencespalding/"
            />
          </div>
        );
      default:
        return (
          <div
            className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl bg-gradient-to-br transform hover:scale-[1.02] transition-transform duration-500"
            style={{ background: heroImageGradient }}
            aria-label="Hero image"
          />
        );
    }
  };
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
              {/* Hero Experience */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          {renderHeroExperience()}
          {imageCaption && (
            <figcaption className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-4 sm:mt-6 italic font-medium px-4">
              {imageCaption}
            </figcaption>
          )}
        </div>

      {/* Content with editorial styling using Tailwind classes */}
      <div className="prose prose-base sm:prose-lg dark:prose-invert max-w-none prose-zinc prose-indigo">
        <div className="max-w-[72ch] mx-auto leading-[1.65] [&>p]:mb-4 [&>ul]:pl-5 [&>ol]:pl-5 [&>ul>li]:mb-2.5 [&>ol>li]:mb-2.5 [&>h2]:mt-10 sm:[&>h2]:mt-12 [&>h2]:mb-4 sm:[&>h2]:mb-5 [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-bold [&>h2]:tracking-tight [&>h3]:mt-8 sm:[&>h3]:mt-10 [&>h3]:mb-3 sm:[&>h3]:mb-4 [&>h3]:text-xl sm:[&>h3]:text-2xl [&>h3]:font-semibold [&>blockquote]:border-l-4 [&>blockquote]:border-indigo-500 [&>blockquote]:bg-zinc-50 dark:[&>blockquote]:bg-zinc-900 dark:[&>blockquote]:border-indigo-400 [&>blockquote]:p-4 sm:[&>blockquote]:p-6 [&>blockquote]:my-6 sm:[&>blockquote]:my-10 [&>blockquote]:rounded-xl [&>blockquote]:text-base sm:[&>blockquote]:text-lg [&>blockquote]:italic [&>code]:bg-zinc-100 dark:[&>code]:bg-zinc-800 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:font-medium [&>a]:no-underline [&>a]:font-medium [&>a]:border-b [&>a]:border-current [&>a]:transition-all hover:[&>a]:border-b-2 [&>ul>li::marker]:text-indigo-500 dark:[&>ul>li::marker]:text-indigo-400">
          {children}
        </div>
      </div>
    </article>
  );
}; 