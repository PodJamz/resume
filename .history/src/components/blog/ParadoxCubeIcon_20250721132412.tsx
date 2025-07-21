"use client"

import { useRef, useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import the entire @react-three/fiber module to avoid SSR issues
const ThreeFiberCanvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-black rounded">
        <div className="w-4 h-4 bg-white/60 rounded-sm animate-pulse" />
      </div>
    ),
  }
)

const ParadoxCube = dynamic(() => import("./ParadoxCubeContent"), {
  ssr: false,
})

export default function ParadoxCubeIcon({ size = 24 }: { size?: number }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
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
        <div className="w-4 h-4 bg-white/60 rounded-sm animate-pulse" />
      </div>
    )
  }

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
      <ThreeFiberCanvas 
        camera={{ position: [3, 2, 3], fov: 45 }} 
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor("#000000", 1)
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[2, 2, 2]} intensity={0.7} color="#ffffff" />
        <directionalLight position={[-1, -1, -1]} intensity={0.2} color="#ffffff" />
        <ParadoxCube />
      </ThreeFiberCanvas>
    </div>
  )
} 