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

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section className="border-t border-zinc-200 dark:border-zinc-800 pt-12">
      {/* Comments Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Discussion
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          {comments.length === 0 
            ? "Start the conversation by leaving a comment below."
            : `Join ${comments.length} other${comments.length === 1 ? '' : 's'} in the discussion.`
          }
        </p>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-12 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            required
          />
        </div>
        <textarea
          placeholder="Share your thoughts..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
          rows={4}
          required
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Post Comment
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-zinc-400">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400">No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment, index) => (
            <article key={comment.timestamp + index} className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
              <header className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                    {comment.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {comment.name}
                    </h4>
                    <time className="text-xs text-zinc-500 dark:text-zinc-400">
                      {formatDate(comment.timestamp)}
                    </time>
                  </div>
                </div>
              </header>
              <div className="text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line pl-13">
                {comment.text}
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}; 