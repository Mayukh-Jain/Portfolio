import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // --- PHYSICS SETUP ---
  // We use 3 different spring configs to create the "Trail/Lag" effect.
  
  // 1. The Core (Fastest, leads the pack)
  const spring1 = { damping: 30, stiffness: 500 };
  const x1 = useSpring(mouseX, spring1);
  const y1 = useSpring(mouseY, spring1);

  // 2. The Middle (Medium lag)
  const spring2 = { damping: 30, stiffness: 300 };
  const x2 = useSpring(mouseX, spring2);
  const y2 = useSpring(mouseY, spring2);

  // 3. The Tail (Slowest, follows lazily)
  const spring3 = { damping: 30, stiffness: 150 };
  const x3 = useSpring(mouseX, spring3);
  const y3 = useSpring(mouseY, spring3);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target;
      setIsHovered(
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest('[role="button"]') ||
        target.closest(".cursor-pointer")
      );
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // Shared Animation Props
  const cursorBase = "fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference";

  return (
    <>
      {/* LAYER 3: The Tail (Largest, Slowest) */}
      <motion.div
        className={`${cursorBase} border border-white opacity-20`}
        style={{ x: x3, y: y3, translateX: "-50%", translateY: "-50%" }}
        animate={{
          height: isHovered ? 0 : 64, // Disappears on hover
          width: isHovered ? 0 : 64,
        }}
      />

      {/* LAYER 2: The Middle (Medium opacity) */}
      <motion.div
        className={`${cursorBase} border border-white opacity-60`}
        style={{ x: x2, y: y2, translateX: "-50%", translateY: "-50%" }}
        animate={{
          height: isHovered ? 64 : 32, // Expands to merge on hover
          width: isHovered ? 64 : 32,
          backgroundColor: isHovered ? "white" : "transparent",
        }}
      />

      {/* LAYER 1: The Core (Solid, Fast) */}
      <motion.div
        className={`${cursorBase} bg-white`}
        style={{ x: x1, y: y1, translateX: "-50%", translateY: "-50%" }}
        animate={{
          height: isHovered ? 64 : 8, // Expands to fill the ring
          width: isHovered ? 64 : 8,
        }}
      />
      
      {/* Optional: Text Label that appears inside the orb on hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center text-[10px] font-bold text-black uppercase tracking-widest"
        style={{ x: x1, y: y1, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        OPEN
      </motion.div>
    </>
  );
};

export default CustomCursor;