import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillsData } from "../../data/portfolioData";

const Skills = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <section id="skills" className="relative z-10 py-20 md:py-32 px-6 max-w-4xl mx-auto">
      <div className="mb-16 border-b border-white/10 pb-4">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">02 / Skills</span>
      </div>

      <div className="flex flex-col gap-4">
        {skillsData.map((group, idx) => {
          const isOpen = expandedIndex === idx;

          return (
            <div
              key={group.category}
              onClick={() => setExpandedIndex(isOpen ? null : idx)}
              className={`relative cursor-pointer rounded-2xl border transition-all duration-500 overflow-hidden ${
                isOpen 
                  ? "border-white/40 bg-white/5" 
                  : "border-white/10 bg-transparent hover:border-white/20"
              }`}
            >
              {/* Background Ghost Text */}
              <span className={`absolute -right-4 -bottom-8 text-8xl font-black uppercase pointer-events-none transition-opacity duration-700 ${
                isOpen ? "opacity-10 text-white" : "opacity-0"
              }`}>
                {group.category.split(' ')[0]}
              </span>

              {/* Centered Header Container */}
              <div className="px-6 md:px-8 flex flex-col justify-center min-h-[85px]">
                
                {/* Always visible header row */}
                <div className="flex justify-between items-center py-6">
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-[11px] text-cyan-500">0{idx + 1}</span>
                    <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-wider">
                      {group.category}
                    </h3>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-white/40"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                </div>

                {/* Animated Content Section */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="flex flex-wrap gap-3 pb-8 pt-2">
                        {group.items.map((skill, i) => (
                          <motion.span
                            key={skill}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.02 }}
                            className="px-5 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-cyan-500 hover:text-white transition-colors"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;