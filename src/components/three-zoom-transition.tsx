import { useEffect, useRef } from "react"
import * as THREE from "three"

interface ThreeZoomTransitionProps {
  imageUrl: string
  trigger: boolean
  onComplete: () => void
}

export function ThreeZoomTransition({ imageUrl, trigger, onComplete }: ThreeZoomTransitionProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (!trigger || started.current) return
    started.current = true

    const width = window.innerWidth
    const height = window.innerHeight
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 2
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    mountRef.current!.appendChild(renderer.domElement)

    // Texture
    const loader = new THREE.TextureLoader()
    loader.load(imageUrl, (texture: THREE.Texture) => {
      const geometry = new THREE.PlaneGeometry(2, 2)
      const material = new THREE.MeshBasicMaterial({ map: texture })
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      let zoom = 1
      let frame = 0
      const maxFrames = 60
      function animate() {
        frame++
        zoom += 0.05
        camera.zoom = zoom
        camera.updateProjectionMatrix()
        renderer.render(scene, camera)
        if (frame < maxFrames) {
          requestAnimationFrame(animate)
        } else {
          onComplete()
        }
      }
      animate()
    })

    return () => {
      renderer.dispose()
      if (mountRef.current) {
        mountRef.current.innerHTML = ""
      }
    }
  }, [trigger, imageUrl, onComplete])

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        pointerEvents: "none",
        background: "#0a0a0d"
      }}
    />
  )
}
