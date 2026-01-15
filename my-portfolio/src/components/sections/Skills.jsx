import React from "react";
import TiltCard from "../ui/TiltCard";
import { skillsData } from "../../data/portfolioData";

const Skills = () => {
  return (
    <section id="skills" className="relative z-10 py-20 md:py-32 px-6 max-w-4xl mx-auto">
       <div className="mb-16 border-b border-white/10 pb-4">
        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">02 / Skills</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1000">
        {skillsData.map((skillGroup, index) => (
          <TiltCard 
            key={index} 
            className="border border-white/10 p-6 md:p-8 rounded-xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm group hover:border-white/30 transition-colors"
          >
             <h3 className="text-lg md:text-xl font-bold text-white mb-6 flex items-center gap-3">
               <span className="w-2 h-2 bg-gray-500 rounded-full group-hover:bg-white transition-colors shadow-[0_0_10px_rgba(255,255,255,0.5)]"></span>
               {skillGroup.category}
             </h3>
             <div className="flex flex-wrap gap-2">
               {skillGroup.items.map((item) => (
                 <span 
                    key={item} 
                    className="px-3 py-1 bg-black/40 text-gray-400 text-xs md:text-sm rounded-md border border-white/5 group-hover:text-white group-hover:border-white/20 transition-all cursor-default"
                  >
                   {item}
                 </span>
               ))}
             </div>
          </TiltCard>
        ))}
      </div>
    </section>
  )
}

export default Skills;