"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function ParadoxCube() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.008
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main cube structure - dark gray faces */}
      {/* Left face - dark */}
      <mesh position={[-1, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshLambertMaterial color="#404040" side={THREE.DoubleSide} />
      </mesh>

      {/* Top face - dark */}
      <mesh position={[0, 1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshLambertMaterial color="#505050" side={THREE.DoubleSide} />
      </mesh>

      {/* Right face - medium gray */}
      <mesh position={[1, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshLambertMaterial color="#808080" side={THREE.DoubleSide} />
      </mesh>

      {/* Bottom face - light gray */}
      <mesh position={[0, -1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshLambertMaterial color="#a0a0a0" side={THREE.DoubleSide} />
      </mesh>

      {/* Front face - medium gray */}
      <mesh position={[0, 0, 1]}>
        <planeGeometry args={[2, 2]} />
        <meshLambertMaterial color="#707070" side={THREE.DoubleSide} />
      </mesh>

      {/* Back face - darker */}
      <mesh position={[0, 0, -1]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshLambertMaterial color="#606060" side={THREE.DoubleSide} />
      </mesh>

      {/* Internal paradoxical triangular faces - white/light */}
      {/* Main white triangular face */}
      <mesh position={[0.2, 0.2, 0.2]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <planeGeometry args={[1.8, 1.8]} />
        <meshLambertMaterial color="#f0f0f0" side={THREE.DoubleSide} />
      </mesh>

      {/* Secondary white face */}
      <mesh position={[-0.3, -0.3, 0.3]} rotation={[-Math.PI / 6, Math.PI / 3, Math.PI / 6]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshLambertMaterial color="#ffffff" side={THREE.DoubleSide} />
      </mesh>

      {/* Internal connecting faces for the impossible effect */}
      <mesh position={[0.5, -0.2, 0]} rotation={[0, 0, Math.PI / 3]}>
        <planeGeometry args={[1.2, 0.8]} />
        <meshLambertMaterial color="#d0d0d0" side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[-0.2, 0.5, 0]} rotation={[Math.PI / 3, 0, 0]}>
        <planeGeometry args={[0.8, 1.2]} />
        <meshLambertMaterial color="#c0c0c0" side={THREE.DoubleSide} />
      </mesh>

      {/* Additional internal geometry for the paradox */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 4, Math.PI / 4, Math.PI / 4]}>
        <planeGeometry args={[1, 1]} />
        <meshLambertMaterial color="#e0e0e0" side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>
    </group>
  )
} 