import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillsData } from "../../data/portfolioData";
import { 
  Code2,       // For Languages
  Brain,       // For AI & GenAI
  Layout,      // For Frameworks
  Wrench,      // For Libraries & Tools
  Cloud,       // For Cloud & MLOps
  Database     // Fallback / Secondary
} from "lucide-react"; 

const Skills = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  // Helper to get specific icon and color based on exact category name
  const getCategoryStyle = (category) => {
    switch (category) {
      case "Languages & DBs":
        return { 
          icon: <Code2 size={22} />, 
          color: "text-blue-400", 
          borderColor: "group-hover:border-blue-500/50" 
        };
      case "AI & GenAI":
        return { 
          icon: <Brain size={22} />, 
          color: "text-purple-400", 
          borderColor: "group-hover:border-purple-500/50" 
        };
      case "Frameworks":
        return { 
          icon: <Layout size={22} />, 
          color: "text-emerald-400", 
          borderColor: "group-hover:border-emerald-500/50" 
        };
      case "Libraries & Tools":
        return { 
          icon: <Wrench size={22} />, 
          color: "text-amber-400", 
          borderColor: "group-hover:border-amber-500/50" 
        };
      case "Cloud & MLOps":
        return { 
          icon: <Cloud size={22} />, 
          color: "text-sky-400", 
          borderColor: "group-hover:border-sky-500/50" 
        };
      default:
        return { 
          icon: <Code2 size={22} />, 
          color: "text-gray-400", 
          borderColor: "group-hover:border-gray-500/50" 
        };
    }
  };

  return (
    <section id="skills" className="relative z-10 py-24 px-6 max-w-5xl mx-auto">
      <div className="mb-16 border-b border-white/10 pb-4 flex items-center justify-between">
        <span className="text-xs font-mono text-blue-400 uppercase tracking-widest border border-blue-500/20 bg-blue-500/5 px-3 py-1 rounded-full">
          02 / Skills
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {skillsData.map((group, idx) => {
          const isOpen = expandedIndex === idx;
          const style = getCategoryStyle(group.category);

          return (
            <motion.div
              layout
              key={group.category}
              className={`relative rounded-3xl border transition-all duration-500 overflow-hidden ${
                isOpen 
                  ? "border-white/10 bg-white/5 shadow-2xl" 
                  : "border-white/5 bg-transparent hover:border-white/10"
              }`}
            >
              {/* Accessible Button Header */}
              <button
                onClick={() => setExpandedIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none rounded-3xl z-20 relative"
              >
                <div className="flex items-center gap-6">
                  <span className={`font-mono text-sm transition-colors duration-300 ${isOpen ? style.color : "text-gray-600"}`}>
                    0{idx + 1}
                  </span>
                  
                  <div className="flex items-center gap-4">
                    {/* Dynamic Icon */}
                    <div className={`p-2 rounded-lg transition-colors duration-300 ${isOpen ? "bg-white/10 " + style.color : "text-gray-500 bg-transparent"}`}>
                       {style.icon}
                    </div>
                    <h3 className={`text-lg md:text-xl font-bold uppercase tracking-wider transition-colors duration-300 ${isOpen ? "text-white" : "text-gray-400"}`}>
                      {group.category}
                    </h3>
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                  className={`p-2 rounded-full border transition-colors duration-300 ${isOpen ? `border-white/20 ${style.color}` : "border-white/10 text-gray-600"}`}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7H13M7 1L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </button>

              {/* Background Decorative Text */}
              {/* Background Ghost Text */}
              <span className={`absolute -right-4 -bottom-8 text-8xl font-black uppercase pointer-events-none transition-opacity duration-700 ${
                isOpen ? "opacity-10 text-white" : "opacity-0"
              }`}>
                {group.category.split(' ')[0]}
              </span>
              {/* Animated Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-6 md:px-8 pb-8 pt-2 relative z-10">
                       <div className="h-px w-full bg-white/5 mb-6"></div>
                       
                       <div className="flex flex-wrap gap-3">
                        {group.items.map((skill, i) => (
                          <motion.div
                            key={skill}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.03, duration: 0.3 }}
                            className="group relative"
                          >
                             {/* Skill Pill with Dynamic Hover Color */}
                             <div className={`px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:text-white cursor-default shadow-sm ${style.borderColor}`}>
                               {skill}
                             </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;