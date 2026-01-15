import React, { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

const SpotlightBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const background = useMotionTemplate`radial-gradient(
    500px circle at ${mouseX}px ${mouseY}px,
    rgba(255, 255, 255, 0.08),
    transparent 80%
  )`;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-black" />
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{ 
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }}
      />
      <motion.div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ background: background }}
      />
    </div>
  );
};

export default SpotlightBackground;