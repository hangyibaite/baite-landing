"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const SPRING = { type: "spring" as const, stiffness: 150, damping: 20 };
const MAX_TILT = 4; // degrees

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const reducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, SPRING);
  const rotateY = useSpring(rawY, SPRING);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (reducedMotion) return;
      if (rafRef.current) return; // throttle to one RAF per frame

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        rawY.set(((x - cx) / cx) * MAX_TILT);
        rawX.set(((y - cy) / cy) * -MAX_TILT);

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    },
    [reducedMotion, rawX, rawY]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || reducedMotion) return;
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, handleMouseLeave, reducedMotion]);

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
          position: "relative",
          overflow: "hidden",
        }}
        className={className}
      >
        {/* radial glare following cursor */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        {/* content sits above glare */}
        <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
      </motion.div>
    </div>
  );
}

/*
Usage example:

import TiltCard from "@/components/ui/tilt-card";

<TiltCard className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
  <h3 className="text-xl font-bold text-white">The Offer Stack</h3>
  <p className="text-zinc-400 mt-2">Engineer an offer people line up to pay for...</p>
</TiltCard>
*/
