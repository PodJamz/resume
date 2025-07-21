"use client"

import { useRef, useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import Three.js components to avoid SSR issues
const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => ({ default: mod.Canvas })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-4 h-4 bg-white/60 rounded-sm animate-pulse" />
    </div>
  ),
})

const ParadoxCube = dynamic(() => import("./ParadoxCubeContent"), {
  ssr: false,
})

export default function ParadoxCubeIcon({ size = 24 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: "#000000",
        borderRadius: "4px",
      }}
      className="flex items-center justify-center"
    >
      <Canvas camera={{ position: [3, 2, 3], fov: 45 }} style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[2, 2, 2]} intensity={0.7} color="#ffffff" />
        <directionalLight position={[-1, -1, -1]} intensity={0.2} color="#ffffff" />
        <ParadoxCube />
      </Canvas>
    </div>
  )
} 