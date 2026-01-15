import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Speed of the counter
    const duration = 2000; // 2 seconds total
    const steps = 100;
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(timer);
          return 100;
        }
      });
    }, intervalTime);

    // When counter hits 100, wait a moment then trigger onComplete
    if (count === 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 500); // 0.5s delay at 100% before lifting the curtain
      return () => clearTimeout(timeout);
    }

    return () => clearInterval(timer);
  }, [count, onComplete]);

  return (
    <motion.div
      // The "Curtain" Slide Up Animation
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-white"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Large Counter Number */}
        <span className="text-6xl md:text-9xl font-bold font-mono tracking-tighter">
          {count}%
        </span>
        
        {/* Progress Bar */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${count}%` }}
          />
        </div>

        {/* Loading Text */}
        <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-2 font-mono animate-pulse">
          System Initializing...
        </span>
      </div>
    </motion.div>
  );
};

export default Preloader;