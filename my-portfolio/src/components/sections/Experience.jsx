import React from "react";
import { experience } from "../../data/portfolioData";
import FadeIn from "../ui/FadeIn";

const Experience = () => {
  return (
    <section id="experience" className="relative z-10 py-20 md:py-32 px-6 max-w-4xl mx-auto">
      
      {/* Section Header with Animation */}
      <FadeIn>
        <div className="mb-16 border-b border-white/10 pb-4">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
            04 / Experience
          </span>
        </div>
      </FadeIn>

      {/* Experience List */}
      <div className="space-y-12">
        {experience.map((exp, index) => (
          <FadeIn key={index} delay={index * 0.2}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 group">
              {/* Year Column */}
              <span className="text-gray-500 font-mono text-sm pt-1">
                {exp.year}
              </span>
              
              {/* Content Column */}
              <div className="md:col-span-3">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {exp.role}
                </h3>
                <h4 className="text-lg text-gray-400 mb-4 font-medium">
                  {exp.company}
                </h4>
                <p className="text-gray-400 leading-relaxed text-base">
                  {exp.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default Experience;