"use client"

import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  fps: number
  memoryUsage: number
  renderTime: number
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    renderTime: 0
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measurePerformance = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        
        // Get memory usage if available
        const memoryUsage = (performance as any).memory 
          ? Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)
          : 0

        setMetrics(prev => ({
          ...prev,
          fps,
          memoryUsage
        }))

        frameCount = 0
        lastTime = currentTime
      }

      animationId = requestAnimationFrame(measurePerformance)
    }

    animationId = requestAnimationFrame(measurePerformance)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-black/80 text-white px-3 py-2 rounded-lg text-xs font-mono backdrop-blur-sm"
      >
        Perf
      </button>
      
      {isVisible && (
        <div className="absolute bottom-12 right-0 bg-black/90 text-white p-3 rounded-lg text-xs font-mono backdrop-blur-sm min-w-[200px]">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>FPS:</span>
              <span className={metrics.fps >= 55 ? 'text-green-400' : metrics.fps >= 30 ? 'text-yellow-400' : 'text-red-400'}>
                {metrics.fps}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Memory:</span>
              <span className={metrics.memoryUsage < 50 ? 'text-green-400' : metrics.memoryUsage < 100 ? 'text-yellow-400' : 'text-red-400'}>
                {metrics.memoryUsage}MB
              </span>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Target: 60 FPS, &lt;50MB
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
