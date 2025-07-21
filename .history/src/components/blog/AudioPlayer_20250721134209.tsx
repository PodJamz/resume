"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

interface AudioPlayerProps {
  src: string;
  title: string;
  description?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title, description }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [src]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 shadow-sm">
      <audio ref={audioRef} src={src} preload="metadata" />
      
      {/* Header */}
      <div className="mb-4">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm mb-1">
          Audio Deepdive
        </h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {description || "Two hosts discussing the content"}
        </p>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Play/Pause Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={togglePlayPause}
            disabled={isLoading}
            className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all duration-200 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-800 hover:scale-105 active:scale-95"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-0.5" />
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={progressPercentage}
              onChange={handleProgressChange}
              className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer slider"
              disabled={!duration}
              aria-label="Audio progress"
            />
            <div
              className="absolute top-0 left-0 h-2 bg-indigo-600 dark:bg-indigo-500 rounded-lg pointer-events-none transition-all duration-150"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          {/* Time Display */}
          <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #4f46e5;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        
        .slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #4f46e5;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
        }
        
        .slider::-moz-range-thumb:hover {
          transform: scale(1.1);
        }
        
        .slider:disabled::-webkit-slider-thumb {
          background: #9ca3af;
        }
        
        .slider:disabled::-moz-range-thumb {
          background: #9ca3af;
        }
        
        /* Mobile touch improvements */
        @media (max-width: 768px) {
          .slider::-webkit-slider-thumb {
            width: 20px;
            height: 20px;
          }
          
          .slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>
    </div>
  );
}; 