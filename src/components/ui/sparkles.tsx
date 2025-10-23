"use client";

import React, { useEffect, useMemo, useRef } from "react";

type SparklesCoreProps = {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
};

export function SparklesCore({
  background = "transparent",
  minSize = 0.5,
  maxSize = 1.5,
  particleDensity = 800,
  particleColor = "#FFFFFF",
  className,
}: SparklesCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  const getParticleCount = (width: number, height: number) => {
    const area = width * height;
    return Math.max(10, Math.min(2000, Math.floor((area / 160000) * (particleDensity / 1000)) * 100));
  };

  const createParticles = (width: number, height: number): Particle[] => {
    const count = getParticleCount(width, height);
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * (maxSize - minSize) + minSize;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
      });
    }
    return particles;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameRequested = false;

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(clientWidth * dpr);
      canvas.height = Math.floor(clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particlesRef.current = createParticles(clientWidth, clientHeight);
      if (!frameRequested) {
        frameRequested = true;
        animationRef.current = requestAnimationFrame(tick);
      }
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);
      if (background && background !== "transparent") {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.fillStyle = particleColor;
      for (const p of particlesRef.current) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const update = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      for (const p of particlesRef.current) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < -2) p.x = width + 2;
        if (p.x > width + 2) p.x = -2;
        if (p.y < -2) p.y = height + 2;
        if (p.y > height + 2) p.y = -2;
      }
    };

    const tick = () => {
      frameRequested = false;
      update();
      draw();
      animationRef.current = requestAnimationFrame(tick);
    };

    const observer = new ResizeObserver(() => resize());
    observer.observe(canvas);
    resize();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      observer.disconnect();
    };
  }, [background, minSize, maxSize, particleDensity, particleColor]);

  return <canvas ref={canvasRef} className={className} />;
}

export default SparklesCore;






