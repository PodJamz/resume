import React from "react";
import { AudioPlayer } from "./AudioPlayer";

interface RightSidebarProps {
  postSlug?: string;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ postSlug }) => {
  // Only show audio player if we have a post slug and corresponding audio file
  if (!postSlug) {
    return null;
  }

  const audioSrc = `/${postSlug}.mp3`;
  
  return (
    <aside className="w-[280px] min-h-screen flex flex-col bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-4">
      <AudioPlayer 
        src={audioSrc}
        title={postSlug}
        description="Deep dive discussion between two hosts exploring the key insights and themes from this post"
      />
    </aside>
  );
}; 