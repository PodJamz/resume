"use client"

import Image from "next/image"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"

interface IrisHeroProps {
  className?: string
  imageSrc?: string
  title?: string
  subtitle?: string
  interactive?: boolean
}

// Idea generator (hundreds of unique combos)
const IDEA_ADJECTIVES = [
  "autonomous","frictionless","context-aware","ambient","lightweight","instant","structured","playful","collaborative","resilient","evaluable","explainable","privacy-first","adaptive","semantic","multimodal","temporal","offline-first","streaming","intuitive","minimal","assistive","realtime","composable","modular","synchronous","asynchronous","guided","self-healing","human-in-the-loop","agentic","memoryful","intent-driven","elastic","zero-config","headless","themeable"
]
const IDEA_NOUNS = [
  "copilot","agent","workflow","memory","planner","scheduler","canvas","playground","notebook","knowledge graph","vector search","retrieval","evaluation","guardrails","router","recommender","dashboard","observability","analytics","feature flags","A/B testing","matching engine","task graph","SDK","toolbox","orchestrator","studio","notes","backlog","actions","blocks","blueprint","prototype","journal","timeline","brief","deck"
]
const IDEA_DOMAINS = [
  "for founders","for students","for teachers","for healthcare","for sales","for recruiting","for support","for onboarding","for personal CRM","for kids","for creatives","for developers","for research","for product teams","for strategy workshops","for content ops","for community","for finance","for compliance"
]
const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]
function generateRandomIdea() {
  return `${rand(IDEA_ADJECTIVES)} ${rand(IDEA_NOUNS)} ${rand(IDEA_DOMAINS)}`
}

export default function IrisHero({
  className = "",
  imageSrc = "/irishcountryside.png",
  title = "Gather Your Thoughts",
  subtitle = "Save thoughts the moment they appear. Keep them effortlessly organized and never lose an idea.",
  interactive = true,
}: IrisHeroProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 12 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 12 })
  const translateBgX = useSpring(useTransform(x, [-0.5, 0.5], [-20, 20]), { stiffness: 60, damping: 18 })
  const translateBgY = useSpring(useTransform(y, [-0.5, 0.5], [-12, 12]), { stiffness: 60, damping: 18 })

  const handlePointerMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    x.set(px - 0.5)
    y.set(py - 0.5)
  }, [x, y])

  const handleLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  // Interactive input state
  const [thought, setThought] = useState("")
  const [saved, setSaved] = useState<{ text: string; ts: number }[]>([])
  const [archived, setArchived] = useState<{ text: string; ts: number }[]>([])
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [activeShortcut, setActiveShortcut] = useState(0)
  const [toast, setToast] = useState<{ type: "saved" | "archived"; message: string } | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const shortcutsRef = useRef<HTMLUListElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("irisHero.saved") || "[]")
      const a = JSON.parse(localStorage.getItem("irisHero.archived") || "[]")
      setSaved(Array.isArray(s) ? s : [])
      setArchived(Array.isArray(a) ? a : [])
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem("irisHero.saved", JSON.stringify(saved))
  }, [saved])
  useEffect(() => {
    localStorage.setItem("irisHero.archived", JSON.stringify(archived))
  }, [archived])

  // Close shortcuts when clicking outside
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return
      if (showShortcuts && !containerRef.current.contains(e.target as Node)) {
        setShowShortcuts(false)
      }
    }
    document.addEventListener("mousedown", onDocClick)
    return () => document.removeEventListener("mousedown", onDocClick)
  }, [showShortcuts])

  const applyShortcut = useCallback((kind: number) => {
    const options = [
      { id: "random", label: "Seed random idea", apply: (t: string) => `Let's talk about that ${generateRandomIdea()} idea from the other day.` },
      { id: "timestamp", label: "Insert timestamp", apply: (t: string) => `${t ? t + " " : ""}[${new Date().toLocaleString()}]` },
      { id: "todo", label: "Make todo", apply: (t: string) => `- [ ] ${t || "New task"}` },
      { id: "quote", label: "Wrap in quotes", apply: (t: string) => (t ? `“${t}”` : "“Idea”") },
      { id: "clear", label: "Clear", apply: (_: string) => "" },
    ]
    const chosen = options[kind] || options[0]
    setThought((prev) => {
      const withoutTrailingSlash = prev.replace(/\/$/, "").trim()
      return chosen.apply(withoutTrailingSlash)
    })
    setShowShortcuts(false)
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "/") {
      setShowShortcuts(true)
      setActiveShortcut(0)
      return
    }
    if (showShortcuts && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      e.preventDefault()
      setActiveShortcut((prev) => {
        const max = 4
        if (e.key === "ArrowDown") return (prev + 1) % (max + 1)
        return (prev - 1 + (max + 1)) % (max + 1)
      })
    }
    if (showShortcuts && e.key === "Enter") {
      e.preventDefault()
      applyShortcut(activeShortcut)
    }
    if (showShortcuts && e.key === "Escape") {
      e.preventDefault()
      setShowShortcuts(false)
    }
  }, [activeShortcut, applyShortcut, showShortcuts])

  const remindMe = useCallback(() => {
    setThought(`Let's talk about that ${generateRandomIdea()} idea from the other day.`)
    inputRef.current?.focus()
  }, [])

  const archiveThought = useCallback(() => {
    const t = thought.trim()
    if (!t) return
    setArchived((prev) => [{ text: t, ts: Date.now() }, ...prev])
    setThought("")
    setToast({ type: "archived", message: "Archived" })
    setTimeout(() => setToast(null), 1200)
  }, [thought])

  const saveThought = useCallback(() => {
    const t = thought.trim()
    if (!t) return
    setSaved((prev) => [{ text: t, ts: Date.now() }, ...prev])
    setThought("")
    setToast({ type: "saved", message: "Saved" })
    setTimeout(() => setToast(null), 1200)
  }, [thought])

  return (
    <motion.section
      onMouseMove={interactive ? handlePointerMove : undefined}
      onMouseLeave={interactive ? handleLeave : undefined}
      style={{ perspective: 1200 }}
      className={`relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ${className}`}
      aria-label="Hero"
    >
      {/* Background image with subtle parallax */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{ x: interactive ? translateBgX : 0, y: interactive ? translateBgY : 0 }}
      >
        <Image
          src={imageSrc}
          alt="Lush countryside landscape with a winding path"
          fill
          priority
          className="object-cover will-change-transform"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </motion.div>

      {/* Soft vignette and gradient haze for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/10 dark:from-black/50 dark:via-black/30 dark:to-black/40" />
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_80%_at_50%_20%,black,transparent)]" />

      {/* Floating sun gleam */}
      <motion.div
        aria-hidden
        className="absolute -top-16 right-10 h-40 w-40 rounded-full bg-gradient-to-br from-yellow-200/70 to-amber-400/60 blur-2xl"
        style={{ x: interactive ? translateBgX : 0, y: interactive ? translateBgY : 0 }}
      />

      {/* Content card with glassmorphism */}
      <motion.div
        className="relative h-full flex flex-col items-center justify-center px-4"
        style={{ rotateX: interactive ? rotateX : 0, rotateY: interactive ? rotateY : 0 }}
      >
        <motion.h1
          className="text-center font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-zinc-900 dark:text-white drop-shadow-[0_1px_0_rgba(255,255,255,0.35)] dark:drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="mt-3 max-w-2xl text-center text-sm sm:text-base text-zinc-700/90 dark:text-zinc-200/90"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          {subtitle}
        </motion.p>

        {/* Glass input panel */}
        <motion.div
          className="mt-6 sm:mt-8 w-full max-w-3xl rounded-2xl sm:rounded-3xl bg-white/40 dark:bg-white/10 backdrop-blur-xl ring-1 ring-black/10 dark:ring-white/10 shadow-[0_8px_40px_-10px_rgba(0,0,0,0.35)] overflow-hidden"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          role="region"
          aria-label="Quick capture panel"
        >
          {/* Shine on hover */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl">
            <motion.div
              className="absolute inset-y-0 left-[-20%] w-[40%] bg-white/30 blur-2xl"
              initial={false}
              whileHover={{ x: "140%" }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
            />
          </div>

          <div className="p-3 sm:p-4" ref={containerRef}>
            <div className="relative">
              <div className="rounded-xl bg-white/60 dark:bg-zinc-900/40 ring-1 ring-black/10 dark:ring-white/10 px-3 py-2 flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
                <input
                  ref={inputRef}
                  value={thought}
                  onChange={(e) => setThought(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a thought or press / for shortcuts"
                  className="w-full bg-transparent outline-none placeholder-zinc-500/80 dark:placeholder-zinc-400 text-sm sm:text-base"
                  aria-label="Thought input"
                />
              </div>

              {/* Shortcuts dropdown */}
              <AnimatePresence>
                {showShortcuts && (
                  <motion.ul
                    ref={shortcutsRef}
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="absolute z-10 mt-2 left-0 right-0 overflow-hidden rounded-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl ring-1 ring-black/10 dark:ring-white/10 shadow-2xl"
                  >
                    {[
                      "Seed random idea",
                      "Insert timestamp",
                      "Make todo",
                      "Wrap in quotes",
                      "Clear",
                    ].map((label, i) => (
                      <li
                        key={label}
                        className={`px-3 py-2 text-sm cursor-pointer select-none ${
                          activeShortcut === i
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                            : "text-zinc-700 dark:text-zinc-200"
                        }`}
                        onMouseEnter={() => setActiveShortcut(i)}
                        onClick={() => applyShortcut(i)}
                      >
                        {label}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={remindMe}
                className="text-[11px] sm:text-xs text-zinc-600/90 dark:text-zinc-300/80 px-2 py-1 rounded-lg bg-zinc-50/70 dark:bg-white/5 ring-1 ring-black/10 dark:ring-white/10 hover:bg-zinc-50/90 dark:hover:bg-white/10 transition-colors"
              >
                Click here to remind you of something
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={archiveThought}
                  disabled={!thought.trim()}
                  className="text-[11px] sm:text-xs px-2.5 py-1 rounded-lg bg-white/70 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 text-zinc-800 dark:text-zinc-200 ring-1 ring-black/10 dark:ring-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Archive
                </button>
                <button
                  type="button"
                  onClick={saveThought}
                  disabled={!thought.trim()}
                  className="text-[11px] sm:text-xs px-2.5 py-1 rounded-lg bg-emerald-500/90 hover:bg-emerald-500 text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tiny toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-xs px-3 py-1.5 rounded-full shadow-md ring-1 ring-black/10 ${
                toast.type === "saved" ? "bg-emerald-500 text-white" : "bg-zinc-800 text-white"
              }`}
            >
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Subtle grain and vignette */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5 rounded-2xl sm:rounded-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_400px_at_50%_-50%,rgba(255,255,255,0.35),transparent)] dark:bg-[radial-gradient(1200px_400px_at_50%_-50%,rgba(0,0,0,0.45),transparent)]" />
    </motion.section>
  )
}
