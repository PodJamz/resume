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
    <div className={`relative group flex flex-col items-center justify-center w-full ${className}`}>
      <div 
        className="file relative w-16 h-12 cursor-pointer origin-bottom [perspective:1500px] z-50"
        onClick={onClick}
      >
        <div className="work-5 bg-amber-600 w-full h-full origin-top rounded-lg rounded-tl-none group-hover:shadow-[0_8px_16px_rgba(0,0,0,.2)] transition-all ease duration-300 relative after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-5 after:h-1 after:bg-amber-600 after:rounded-t-lg before:absolute before:content-[''] before:-top-[6px] before:left-[18px] before:w-1 before:h-1 before:bg-amber-600 before:[clip-path:polygon(0_35%,0%_100%,50%_100%);]" />
        <div className="work-4 absolute inset-0.5 bg-zinc-400 rounded-lg transition-all ease duration-300 origin-bottom select-none group-hover:[transform:rotateX(-20deg)]" />
        <div className="work-3 absolute inset-0.5 bg-zinc-300 rounded-lg transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-30deg)]" />
        <div className="work-2 absolute inset-0.5 bg-zinc-200 rounded-lg transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-38deg)]" />
        <div className="work-1 absolute bottom-0 bg-gradient-to-t from-amber-500 to-amber-400 w-full h-[38px] rounded-lg rounded-tr-none after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[36px] after:h-[4px] after:bg-amber-400 after:rounded-t-lg before:absolute before:content-[''] before:-top-[2px] before:right-[34px] before:size-1 before:bg-amber-400 before:[clip-path:polygon(100%_14%,50%_100%,100%_100%);] transition-all ease duration-300 origin-bottom flex items-end group-hover:shadow-[inset_0_8px_16px_#fbbf24,_inset_0_-8px_16px_#d97706] group-hover:[transform:rotateX(-46deg)_translateY(1px)]" />
      </div>
      {title && (
        <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
          {title}
        </span>
      )}
    </div>
  );
}

export default FolderCard; 