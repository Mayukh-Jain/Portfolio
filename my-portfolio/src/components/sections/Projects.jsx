import React, { useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../../data/portfolioData";
import ProjectModal from "../ProjectModal";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null); 
  const [selectedProject, setSelectedProject] = useState(null); 
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <section id="work" className="relative z-10 py-20 md:py-32 px-6">
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <div className="mb-12 border-b border-white/10 pb-4">
        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">01 / Selected Work</span>
      </div>

      <div className="relative" onMouseMove={handleMouseMove}>
        {projects.map((project) => (
          <div
            key={project.id}
            onMouseEnter={() => setActiveProject(project.id)}
            onMouseLeave={() => setActiveProject(null)}
            onClick={() => setSelectedProject(project)}
            className="group relative border-t border-white/10 py-12 transition-colors hover:bg-white/5 px-2 md:px-4 cursor-pointer"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-6xl font-bold tracking-tighter text-gray-400 transition-colors group-hover:text-white md:group-hover:translate-x-4 duration-500">
                  {project.title}
                </h2>
                <div className="flex flex-wrap gap-2 mt-3 md:group-hover:translate-x-4 transition-transform duration-500">
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10px] md:text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col items-start md:items-end">
                <span className="text-xs md:text-sm font-mono text-gray-500 uppercase">{project.category}</span>
                <ArrowUpRight className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity text-white mt-2" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <motion.div
        style={{
          x: xSpring,
          y: ySpring,
          top: "-200px",
          left: "-150px",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: activeProject ? 1 : 0,
          opacity: activeProject ? 1 : 0,
        }}
        className="pointer-events-none fixed z-30 h-[400px] w-[300px] overflow-hidden rounded-lg shadow-2xl hidden md:block"
      >
        <div className="relative h-full w-full bg-neutral-800">
          {projects.map((project) => (
            <img
              key={project.id}
              src={project.src}
              alt={project.title}
              className={`absolute h-full w-full object-cover transition-opacity duration-500 ${
                activeProject === project.id ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;