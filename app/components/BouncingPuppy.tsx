"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";

const PUPPY_SIZE = 250;
const SPEED = 3;

// Hydration-safe client detection
const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function BouncingPuppy() {
  const isClient = useIsClient();
  const containerRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ vx: SPEED, vy: SPEED });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize random position and direction
    const maxX = window.innerWidth - PUPPY_SIZE;
    const maxY = window.innerHeight - PUPPY_SIZE;
    const angle = Math.random() * 2 * Math.PI;

    positionRef.current = {
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    };
    velocityRef.current = {
      vx: Math.cos(angle) * SPEED,
      vy: Math.sin(angle) * SPEED,
    };

    // Apply initial position
    container.style.left = `${positionRef.current.x}px`;
    container.style.top = `${positionRef.current.y}px`;

    const animate = () => {
      const maxX = window.innerWidth - PUPPY_SIZE;
      const maxY = window.innerHeight - PUPPY_SIZE;

      let newX = positionRef.current.x + velocityRef.current.vx;
      let newY = positionRef.current.y + velocityRef.current.vy;

      // Bounce off walls
      if (newX <= 0 || newX >= maxX) {
        velocityRef.current.vx *= -1;
        newX = Math.max(0, Math.min(maxX, newX));
      }
      if (newY <= 0 || newY >= maxY) {
        velocityRef.current.vy *= -1;
        newY = Math.max(0, Math.min(maxY, newY));
      }

      positionRef.current = { x: newX, y: newY };

      // Direct DOM update - no React re-render
      if (container) {
        container.style.left = `${newX}px`;
        container.style.top = `${newY}px`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const maxX = window.innerWidth - PUPPY_SIZE;
      const maxY = window.innerHeight - PUPPY_SIZE;
      positionRef.current.x = Math.min(positionRef.current.x, maxX);
      positionRef.current.y = Math.min(positionRef.current.y, maxY);

      if (container) {
        container.style.left = `${positionRef.current.x}px`;
        container.style.top = `${positionRef.current.y}px`;
      }
    };

    window.addEventListener("resize", handleResize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: PUPPY_SIZE,
        height: PUPPY_SIZE,
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      <Image
        src="/appa.png"
        alt="Appa"
        width={PUPPY_SIZE}
        height={PUPPY_SIZE}
        className="spinning"
        style={{ objectFit: "contain" }}
        priority
      />
    </div>
  );
}
