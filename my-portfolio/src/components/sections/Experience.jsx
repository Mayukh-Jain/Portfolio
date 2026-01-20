import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { experienceData } from "../../data/portfolioData";
import FadeIn from "../ui/FadeIn";

const Experience = () => {
  return (
    <section id="experience" className="relative z-10 py-24 px-6 max-w-5xl mx-auto">
      {/* Section Header */}
        <FadeIn>
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-xs font-mono text-blue-400 uppercase tracking-widest border border-blue-500/20 bg-blue-500/5 px-3 py-1 rounded-full">
            03 / Selected Projects
          </span>
          <div className="h-px bg-white/10 flex-1" />
        </div>
      </FadeIn>


      <div className="relative flex flex-col space-y-12">
        {/* Vertical Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/20 to-transparent md:left-1/2 md:-ml-px hidden md:block" />

        {experienceData.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-center gap-8 ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot (Center) */}
              <div className="absolute left-8 md:left-1/2 -ml-[5px] w-[10px] h-[10px] rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] z-10 mt-1.5 md:mt-0 hidden md:block ring-4 ring-black" />

              {/* Date Column (Opposite side on Desktop) */}
              <div className={`w-full md:w-1/2 flex ${isEven ? "md:justify-start" : "md:justify-end"}`}>
                 <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm">
                    <Calendar size={14} className="text-blue-400" />
                    <span className="text-sm font-mono text-gray-300">{item.date}</span>
                 </div>
              </div>

              {/* Content Card */}
              <div className="w-full md:w-1/2 pl-16 md:pl-0">
                <div className="group relative bg-white/5 border border-white/10 p-6 rounded-3xl hover:border-blue-500/30 hover:bg-white/10 transition-all duration-300">
                  
                  {/* Mobile Date (Visible only on small screens) */}
                  <div className="md:hidden flex items-center gap-2 mb-4 text-xs font-mono text-blue-400">
                     <Calendar size={14} />
                     <span>{item.date}</span>
                  </div>

                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {item.role}
                      </h3>
                      <p className="text-sm text-gray-400 font-medium mt-1 flex items-center gap-2">
                        <Briefcase size={14} />
                        {item.company}
                      </p>
                    </div>
                    {/* Optional Link Icon if company has a URL */}
                    {item.companyUrl && (
                      <a 
                        href={item.companyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-blue-500 transition-all"
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>

                  {/* Description List */}
                  <ul className="space-y-2 mb-6">
                    {item.description.map((desc, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed">
                        <span className="mt-1.5 min-w-[6px] h-1.5 rounded-full bg-white/20 group-hover:bg-blue-500 transition-colors" />
                        {desc}
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Tags */}
                  {item.tech && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                      {item.tech.map((tech, t) => (
                        <span 
                          key={t} 
                          className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-gray-500 border border-white/5 rounded bg-black/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Mobile Timeline Decorator */}
                  <div className="absolute left-[-33px] top-6 w-3 h-3 rounded-full bg-blue-500 border-4 border-black md:hidden" />
                  <div className="absolute left-[-28px] top-9 bottom-[-40px] w-px bg-white/10 md:hidden last:hidden" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;