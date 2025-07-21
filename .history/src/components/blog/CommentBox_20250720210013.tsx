"use client";
import React, { useState, useEffect } from "react";

interface Comment {
  name: string;
  text: string;
  timestamp: number;
}

interface CommentBoxProps {
  postId: string;
}

export const CommentBox: React.FC<CommentBoxProps> = ({ postId }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(`comments-${postId}`);
    if (saved) setComments(JSON.parse(saved));
  }, [postId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const newComment = { name, text, timestamp: Date.now() };
    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(`comments-${postId}`, JSON.stringify(updated));
    setText("");
  };

  return (
    <div className="mt-12">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 rounded bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
          required
        />
        <textarea
          placeholder="Leave a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="px-3 py-2 rounded bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none min-h-[60px]"
          required
        />
        <button
          type="submit"
          className="self-end px-4 py-2 rounded bg-indigo-600 text-white dark:bg-indigo-500 dark:text-zinc-900 font-medium hover:bg-indigo-700 dark:hover:bg-indigo-400 transition"
        >
          Send
        </button>
      </form>
      <div className="flex flex-col gap-4">
        {comments.length === 0 && (
          <div className="text-zinc-400 text-sm">No comments yet.</div>
        )}
        {comments.map((c, i) => (
          <div key={c.timestamp + i} className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3">
            <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{c.name}</div>
            <div className="text-zinc-700 dark:text-zinc-300 text-sm mt-1 whitespace-pre-line">{c.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}; 