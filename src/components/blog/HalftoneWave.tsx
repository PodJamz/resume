"use client"

import { useEffect, useRef } from "react"

interface HalftoneWaveProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function HalftoneWave({ className = "", width, height }: HalftoneWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0
    let colorCycle = 0

    const resizeCanvas = () => {
      if (width && height) {
        canvas.width = width
        canvas.height = height
      } else {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
    }

    const drawHalftoneWave = () => {
      const gridSize = 20
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

          const waveOffset = Math.sin(normalizedDistance * 10 - time) * 0.5 + 0.5
          const size = gridSize * waveOffset * 0.8

          // Calculate a hue based on distance and slowly changing colorCycle
          const hue = (normalizedDistance * 180 + colorCycle) % 360
          // Keep saturation and lightness subtle
          const saturation = 70 + waveOffset * 30
          const lightness = 50 + waveOffset * 30

          ctx.beginPath()
          ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${waveOffset * 0.5})`
          ctx.fill()
        }
      }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawHalftoneWave()

      time += 0.05
      colorCycle += 0.1 // Very slow color cycling
      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    const resizeObserver = new ResizeObserver(resizeCanvas)
    resizeObserver.observe(canvas)

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
    }
  }, [width, height])

  return (
    <canvas 
      ref={canvasRef} 
      className={`w-full h-full bg-black ${className}`}
      style={{ width: width || '100%', height: height || '100%' }}
    />
  )
} 