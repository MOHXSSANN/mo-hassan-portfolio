"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible,  setVisible]  = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ring lags behind
  const ringX = useSpring(mouseX, { stiffness: 600, damping: 32, mass: 0.15 });
  const ringY = useSpring(mouseY, { stiffness: 600, damping: 32, mass: 0.15 });

  useEffect(() => {
    let leaveTimer: ReturnType<typeof setTimeout>;

    const onMove = (e: MouseEvent) => {
      clearTimeout(leaveTimer);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };
    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    // Debounce hide so brief layout-reflow mouseleave events don't flash the cursor away
    const onLeave = () => { leaveTimer = setTimeout(() => setVisible(false), 200); };
    const onEnter = () => { clearTimeout(leaveTimer); setVisible(true); };
    const onOver  = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(!!el.closest("button:not([disabled]), a[href], [role='button'], input, textarea, select"));
    };

    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseover",  onOver);
    return () => {
      clearTimeout(leaveTimer);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseover",  onOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer ring — trails behind */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 2147483647,
          width:  hovering ? 42 : 32,
          height: hovering ? 42 : 32,
          borderRadius: "2px",
          border: hovering ? "1.5px solid var(--vsc-red-light)" : "1.5px solid rgba(255,255,255,0.7)",
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.8 : 1,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.15s ease, scale 0.1s ease",
        }}
      />

      {/* Inner dot — snaps exactly to mouse, zero delay */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 2147483647,
          width:  hovering ? 6 : 4,
          height: hovering ? 6 : 4,
          borderRadius: "50%",
          background: hovering ? "var(--vsc-red-light)" : "white",
          opacity: visible ? 1 : 0,
          transition: "width 0.15s ease, height 0.15s ease, opacity 0.15s ease",
        }}
      />
    </>
  );
}
