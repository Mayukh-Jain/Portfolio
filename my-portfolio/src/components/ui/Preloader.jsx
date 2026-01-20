import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const duration = 3500; 
    const intervalTime = duration / 100;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(timer);
        return 100;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (count === 100) {
      const timeout = setTimeout(() => onComplete(), 800);
      return () => clearTimeout(timeout);
    }
  }, [count, onComplete]);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [count]);
  // Advanced Glitch Variants for RGB layers
  const mainGlitch = {
    glitch: {
      x: [0, -1, 2, -2, 1, 0],
      filter: [
        "blur(0px)",
        "blur(1px)",
        "blur(0px)",
        "blur(2px)",
        "blur(0px)"
      ],
      transition: { duration: 0.2, repeat: Infinity }
    }
  };

  const redLayerGlitch = {
    glitch: {
      x: [-3, 3, -2, 4, -3],
      y: [1, -1, 0, 2, -1],
      opacity: [0, 0.6, 0.3, 0.7, 0],
      transition: { duration: 0.15, repeat: Infinity }
    }
  };

  const blueLayerGlitch = {
    glitch: {
      x: [3, -3, 2, -4, 3],
      y: [-1, 1, 0, -2, 1],
      opacity: [0, 0.6, 0.3, 0.7, 0],
      transition: { duration: 0.15, repeat: Infinity, delay: 0.05 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      exit={{ 
        y: "-100%", 
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080808] text-[#e0e0e0] font-mono overflow-hidden"
    >
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* MASSIVE HUD CIRCLE */}
      <div 
        className="hidden md:block absolute left-[-85vh] w-[180vh] h-[180vh] border-[3px] border-white rounded-full flex items-center justify-center"
        style={{ boxShadow: '0 0 100px rgba(255, 255, 255, 0.81), inset 0 0 80px rgba(255, 255, 255, 0.4)' }}
      >
        <motion.div
          animate={{ rotate: [55,135], }}
          transition={{ duration: 3.6, repeat:2 ,ease: "ease-in-out" }}
          className="absolute w-full h-full rounded-full pointer-events-none"
        >
          {/* THE DOT - Adjusted top to sit exactly on the 3px border */}
          <div 
            className="absolute top-[-7.5px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white]" 
          />
        </motion.div>
      </div>

      <div className="relative w-full max-w-[1400px] px-12 flex flex-col md:flex-row items-center justify-between z-20">
        

        {/* IMPROVED TERMINAL */}
        <div className="w-full hidden md:block max-w-[500px] h-[350px] border border-white/20 bg-black/80 backdrop-blur-xl rounded-md flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-[10px] text-white/40 tracking-[0.2em]">Mayukh_SYSTEM_CORE_V4</span>
          </div>

          {/* Terminal Content */}
          <div 
            ref={scrollRef}
            className="p-5 text-[11px] leading-relaxed overflow-y-auto scrollbar-hide space-y-1"
          >
            <p className="text-blue-400">[SYSTEM] <span className="text-white/60">Initializing encrypted handshake...</span></p>
            {count > 5 && <p className="text-green-500">[OK] <span className="text-white/60">SSL Certificates verified.</span></p>}
            {count > 15 && <p className="text-white/40">Fetching remote_assets/main.bundle.js...</p>}
            {count > 25 && <p className="text-yellow-500">[WARN] <span className="text-white/60">Legacy kernel detected. Patching...</span></p>}
            {count > 35 && <p className="text-blue-400">[ENV] <span className="text-white/60">Node_Env: Production</span></p>}
            {count > 45 && <p className="text-purple-400">[MEM] <span className="text-white/60">Allocation 256MB/512MB [||||------]</span></p>}
            {count > 55 && <p className="text-white/40">Compiling shaders: {count*4}/400</p>}
            {count > 65 && <p className="text-green-500">[OK] <span className="text-white/60">GPU acceleration active.</span></p>}
            {count > 75 && <p className="text-blue-400">[NET] <span className="text-white/60">Latency: 24ms | Packets: {count + 200}</span></p>}
            {count > 85 && <p className="text-white/60 italic">/ cleaning_temporary_artifacts...</p>}
            {count > 92 && <p className="text-green-400 animate-pulse font-bold mt-2">LINK_ESTABLISHED_SUCCESSFULLY</p>}
            {count === 100 && <p className="bg-white text-black px-2 inline-block mt-1">EXECUTION_READY</p>}
          </div>
        </div>

        {/* GLITCH COUNTER SECTION */}
        <div className="flex flex-col items-end">
          <div className="flex items-baseline leading-none relative">
            <motion.span 
              variants={count === 100 ? mainGlitch : {}}
              animate={count === 100 ? "glitch" : ""}
              className="text-[10rem] md:text-[15rem] font-light tracking-tighter text-white"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {count}
            </motion.span>
            <span className="text-3xl md:text-8xl font-thin opacity-10 ml-4">%</span>
          </div>

          {/* SYNCED PROGRESS BAR */}
          <div className="w-full h-[1px] bg-white/10 relative">
            <motion.div 
              className="absolute h-full bg-white shadow-[0_0_20px_white]"
              initial={{ width: 0 }}
              animate={{ width: `${count}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <div className="flex justify-between w-full mt-2 text-[10px] text-white/30 tracking-widest uppercase">
            <span>Progress</span>
            <span>Bitrate: {(count * 1.2).toFixed(1)} mb/s</span>
          </div>
        </div>
      </div>

      {/* SCANLINE & CRT EFFECT */}
      <div className="absolute inset-0 pointer-events-none z-[50] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%]" />
    </motion.div>
  );
};

export default Preloader;