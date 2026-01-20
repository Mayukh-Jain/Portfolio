import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LImg from '../../assets/hero.png';
import { VelocityScroll } from "../../components/ui/scroll-based-velocity";

const HeroSection = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-dvh w-full bg-[#0a0a0a] text-white overflow-hidden flex flex-col">
      
      {/* --- BACKGROUND MARQUEE LAYER --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-20 md:opacity-30">
        <VelocityScroll
          text="MAYUKH JAIN"
          default_velocity={3}
          className="font-['Syncopate'] text-center text-[30vw] md:text-[15vw] font-bold leading-none text-transparent [-webkit-text-stroke:2px_white] md:[-webkit-text-stroke:2px_white] select-none"
        />
      </div>

      {/* --- FOREGROUND IMAGE LAYER --- */}
      {/* Mobile: Align Right (justify-end). Desktop: Align Center (md:justify-center) */}
      <div className="absolute inset-0 flex items-end justify-end md:justify-center z-10 pointer-events-none">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src={LImg}
          className="
            /* MOBILE STYLES: Giant size, pushed to bottom right */
            w-[230%] max-w-none 
            translate-x-[35%] translate-y-[5%] 
            
            /* DESKTOP STYLES: Normal size, centered */
            md:w-auto md:h-[95%] md:max-w-full
            md:translate-x-0 md:translate-y-0
            
            object-contain grayscale hover:grayscale-0 transition-all duration-700 pointer-events-auto
          " 
        />
      </div>

      {/* --- UI CONTENT LAYER --- */}
      {/* Mobile: justify-between (Spreads Top/Bottom). Desktop: justify-end (Bottom aligned). */}
      <div className="relative z-20 flex flex-col h-full p-6 md:p-10 justify-between md:justify-end pt-15 pb-20 md:pt-0 md:pb-10">
        
        {/* Wrapper: Handles flex direction switch between Mobile (col) and Desktop (row) */}
        <div className="flex flex-col md:flex-row justify-between w-full h-full md:h-auto md:items-end">
          
          {/* 1. TOP LEFT (Mobile) / BOTTOM LEFT (Desktop): Role & Description */}
          <div className="flex flex-col gap-3 md:gap-3">
            <h2 className="text-5xl md:text-7xl text-white font-medium tracking-tight leading-[0.9]">
              Cloud & AI<br/>Engineer
            </h2>
            
            <p className="text-sm md:text-base text-gray-300 md:text-gray-400 max-w-[280px] md:max-w-[300px] leading-snug opacity-90">
              Specializing in Automation, DevOps, and Intelligent Systems.
            </p>
          </div>
          
          {/* 2. BOTTOM LEFT (Mobile) / BOTTOM RIGHT (Desktop): Info (Location/Time) */}
          {/* Mobile: items-start/text-left. Desktop: items-end/text-right. */}
          <div className="flex flex-col gap-4 md:gap-2 items-start text-left md:items-end md:text-right font-mono shrink-0">
            <div className="flex flex-col items-start md:items-end">
              <span className="text-xs text-gray-400 uppercase tracking-wider">Location</span>
              <span className="text-base text-white font-medium">Bhopal, India</span>
            </div>

            <div className="flex flex-col items-start md:items-end">
              <span className="text-xs text-gray-400 uppercase tracking-wider">Local Time</span>
              <span className="text-base text-white font-medium min-w-[60px]">
                {time || "--:--"} 
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;