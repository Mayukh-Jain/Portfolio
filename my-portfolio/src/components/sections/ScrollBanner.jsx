import React from "react";
// Go up two levels (../../) to get to components/ui
import { VelocityScroll } from "../ui/scroll-based-velocity"; 
import { cn } from "../../lib/utils"; 

const ScrollBanner = () => {
  return (
    <div className="relative w-full py-16 md:py-24 overflow-hidden border-y border-white/10 bg-black/40 backdrop-blur-sm">
      <div className="absolute inset-0 bg-blue-500/5 blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-full mx-auto">
        <VelocityScroll
          text="Cloud Computing • AI & GenAI • DevOps • Full Stack • Docker • Kubernetes • AWS • "
          default_velocity={1}
          className="font-mono text-center text-4xs font-bold tracking-[-0.02em] text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-white to-gray-600 drop-shadow-sm md:text-7xl md:leading-[5rem] opacity-80"
        />
      </div>
    </div>
  );
};

export default ScrollBanner;