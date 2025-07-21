import React from 'react';

interface FolderCardProps {
  title?: string;
  isOpen?: boolean;
  onClick?: () => void;
  className?: string;
}

const FolderCard: React.FC<FolderCardProps> = ({ 
  title,
  isOpen = false,
  onClick,
  className = ""
}) => {
  return (
    <div 
      className={`relative group flex items-center gap-3 w-full cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="file relative w-10 h-8 origin-bottom [perspective:1500px] z-50">
        <div className="work-5 bg-amber-600 w-full h-full origin-top rounded-md rounded-tl-none group-hover:shadow-[0_4px_8px_rgba(0,0,0,.2)] transition-all ease duration-300 relative after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-3 after:h-0.5 after:bg-amber-600 after:rounded-t-md before:absolute before:content-[''] before:-top-[3px] before:left-[11px] before:w-0.5 before:h-0.5 before:bg-amber-600 before:[clip-path:polygon(0_35%,0%_100%,50%_100%);]" />
        <div className="work-4 absolute inset-0.5 bg-zinc-400 rounded-md transition-all ease duration-300 origin-bottom select-none group-hover:[transform:rotateX(-20deg)]" />
        <div className="work-3 absolute inset-0.5 bg-zinc-300 rounded-md transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-30deg)]" />
        <div className="work-2 absolute inset-0.5 bg-zinc-200 rounded-md transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-38deg)]" />
        <div className="work-1 absolute bottom-0 bg-gradient-to-t from-amber-500 to-amber-400 w-full h-[24px] rounded-md rounded-tr-none after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[22px] after:h-[2px] after:bg-amber-400 after:rounded-t-md before:absolute before:content-[''] before:-top-[1px] before:right-[21px] before:size-0.5 before:bg-amber-400 before:[clip-path:polygon(100%_14%,50%_100%,100%_100%);] transition-all ease duration-300 origin-bottom flex items-end group-hover:shadow-[inset_0_4px_8px_#fbbf24,_inset_0_-4px_8px_#d97706] group-hover:[transform:rotateX(-46deg)_translateY(0.5px)]" />
      </div>
      {title && (
        <span className="text-sm text-zinc-700 dark:text-zinc-300 font-semibold tracking-tight">
          {title}
        </span>
      )}
    </div>
  );
}

export default FolderCard; 