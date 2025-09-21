"use client"

import Image from "next/image"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useCallback } from "react"

interface IrisHeroProps {
  className?: string
  imageSrc?: string
  title?: string
  subtitle?: string
}

export default function IrisHero({
  className = "",
  imageSrc = "/irishcountryside.png",
  title = "Gather Your Thoughts",
  subtitle = "Save thoughts the moment they appear. Keep them effortlessly organized and never lose ",
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

  return (
    <motion.section
      onMouseMove={handlePointerMove}
      onMouseLeave={handleLeave}
      style={{ perspective: 1200 }}
      className={`relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ${className}`}
      aria-label="Hero"
    >
      {/* Background image with subtle parallax */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{ x: translateBgX, y: translateBgY }}
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
        style={{ x: translateBgX, y: translateBgY }}
      />

      {/* Content card with glassmorphism */}
      <motion.div
        className="relative h-full flex flex-col items-center justify-center px-4"
        style={{ rotateX, rotateY }}
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

          <div className="p-3 sm:p-4">
            <div className="rounded-xl bg-white/60 dark:bg-zinc-900/40 ring-1 ring-black/10 dark:ring-white/10 px-3 py-3 flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
              <span className="text-sm sm:text-base select-none opacity-90">Type a thought or press / for quick actions</span>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="text-[11px] sm:text-xs text-zinc-600/90 dark:text-zinc-300/80 px-2 py-1 rounded-lg bg-zinc-50/70 dark:bg-white/5 ring-1 ring-black/10 dark:ring-white/10">
                Use Swift to collect and organize ideas
              </div>
              <div className="flex items-center gap-2">
                <button className="text-[11px] sm:text-xs px-2.5 py-1 rounded-lg bg-white/70 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 text-zinc-800 dark:text-zinc-200 ring-1 ring-black/10 dark:ring-white/10 transition-colors">
                  Archive
                </button>
                <button className="text-[11px] sm:text-xs px-2.5 py-1 rounded-lg bg-emerald-500/90 hover:bg-emerald-500 text-white shadow-sm">
                  Save
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Subtle grain and vignette */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5 rounded-2xl sm:rounded-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_400px_at_50%_-50%,rgba(255,255,255,0.35),transparent)] dark:bg-[radial-gradient(1200px_400px_at_50%_-50%,rgba(0,0,0,0.45),transparent)]" />
    </motion.section>
  )
}
