"use client"

import { useEffect, useRef } from "react"
import createGlobe, { COBEOptions } from "cobe"
import { useMotionValue, useSpring } from "motion/react"
import { cn } from "@/lib/utils"

const MOVEMENT_DAMPING = 1400

export function Globe({
                        className,
                        config,
                      }: {
  className?: string
  config: COBEOptions
}) {
  let phi = 0
  let width = 0
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!canvasRef.current) return

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    let globe: ReturnType<typeof createGlobe> | null = null

    requestAnimationFrame(() => {
      if (!canvasRef.current) return

      try {
        globe = createGlobe(canvasRef.current, {
          ...config,
          width: width * 2,
          height: width * 2,
          onRender: (state) => {
            if (!pointerInteracting.current) phi += 0.005
            state.phi = phi + rs.get()
            state.width = width * 2
            state.height = width * 2
          },
        })

        if (canvasRef.current) {
          canvasRef.current.style.opacity = "1"
        }
      } catch (err) {
        console.warn("Globe init failed, WebGL unavailable", err)
        // Optional: show fallback (image, text, etc.)
      }
    })

    return () => {
      if (globe) globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [rs, config])


  return (
      <div
          className={cn(
              "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
              className
          )}
      >
        <canvas
            ref={canvasRef}
            className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
            onPointerDown={(e) => updatePointerInteraction(e.clientX)}
            onPointerUp={() => updatePointerInteraction(null)}
            onPointerOut={() => updatePointerInteraction(null)}
            onMouseMove={(e) => updateMovement(e.clientX)}
            onTouchMove={(e) =>
                e.touches[0] && updateMovement(e.touches[0].clientX)
            }
        />
      </div>
  )
}
