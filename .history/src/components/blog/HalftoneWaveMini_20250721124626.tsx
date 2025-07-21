"use client"

import { useEffect, useRef } from "react"

interface HalftoneWaveMiniProps {
  className?: string;
  size?: number;
}

export default function HalftoneWaveMini({ className = "", size = 32 }: HalftoneWaveMiniProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0
    let colorCycle = 0

    canvas.width = size
    canvas.height = size

    const drawHalftoneWave = () => {
      const gridSize = 6 // Smaller grid for mini version
      const rows = Math.ceil(canvas.height / gridSize)
      const cols = Math.ceil(canvas.width / gridSize)

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const centerX = x * gridSize
          const centerY = y * gridSize
          const distanceFromCenter = Math.sqrt(
            Math.pow(centerX - canvas.width / 2, 2) + Math.pow(centerY - canvas.height / 2, 2),
          )
          const maxDistance = Math.sqrt(Math.pow(canvas.width / 2, 2) + Math.pow(canvas.height / 2, 2))
          const normalizedDistance = distanceFromCenter / maxDistance

          const waveOffset = Math.sin(normalizedDistance * 8 - time) * 0.5 + 0.5
          const dotSize = gridSize * waveOffset * 0.6

          // Calculate a hue based on distance and slowly changing colorCycle
          const hue = (normalizedDistance * 180 + colorCycle) % 360
          // Keep saturation and lightness subtle
          const saturation = 70 + waveOffset * 30
          const lightness = 50 + waveOffset * 30

          ctx.beginPath()
          ctx.arc(centerX, centerY, dotSize / 2, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${waveOffset * 0.7})`
          ctx.fill()
        }
      }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawHalftoneWave()

      time += 0.03 // Slightly slower for mini version
      colorCycle += 0.08
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [size])

  return (
    <canvas 
      ref={canvasRef} 
      className={`rounded-full ${className}`}
      style={{ width: size, height: size }}
    />
  )
} 