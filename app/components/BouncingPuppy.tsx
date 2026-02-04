"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const PUPPY_SIZE = 150;
const SPEED = 3;

interface Position {
  x: number;
  y: number;
}

interface Velocity {
  vx: number;
  vy: number;
}

export function BouncingPuppy() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const velocityRef = useRef<Velocity>({ vx: SPEED, vy: SPEED });
  const animationRef = useRef<number | null>(null);

  const initializePosition = useCallback(() => {
    const maxX = window.innerWidth - PUPPY_SIZE;
    const maxY = window.innerHeight - PUPPY_SIZE;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    // Random initial direction
    const angle = Math.random() * 2 * Math.PI;
    velocityRef.current = {
      vx: Math.cos(angle) * SPEED,
      vy: Math.sin(angle) * SPEED,
    };

    setPosition({ x, y });
  }, []);

  const animate = useCallback(() => {
    setPosition((prev) => {
      const maxX = window.innerWidth - PUPPY_SIZE;
      const maxY = window.innerHeight - PUPPY_SIZE;

      let newX = prev.x + velocityRef.current.vx;
      let newY = prev.y + velocityRef.current.vy;

      // Bounce off walls
      if (newX <= 0 || newX >= maxX) {
        velocityRef.current.vx *= -1;
        newX = Math.max(0, Math.min(maxX, newX));
      }
      if (newY <= 0 || newY >= maxY) {
        velocityRef.current.vy *= -1;
        newY = Math.max(0, Math.min(maxY, newY));
      }

      return { x: newX, y: newY };
    });

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    setIsClient(true);
    initializePosition();

    const handleResize = () => {
      setPosition((prev) => ({
        x: Math.min(prev.x, window.innerWidth - PUPPY_SIZE),
        y: Math.min(prev.y, window.innerHeight - PUPPY_SIZE),
      }));
    };

    window.addEventListener("resize", handleResize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, initializePosition]);

  if (!isClient) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        width: PUPPY_SIZE,
        height: PUPPY_SIZE,
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      <Image
        src="/puppy.png"
        alt="Puppy"
        width={PUPPY_SIZE}
        height={PUPPY_SIZE}
        className="spinning"
        style={{ objectFit: "contain" }}
        priority
      />
    </div>
  );
}
