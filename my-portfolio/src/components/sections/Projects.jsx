import React, { useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight, FolderOpen } from "lucide-react";
import { projects } from "../../data/portfolioData";
import ProjectModal from "../ProjectModal";
import FadeIn from "../ui/FadeIn";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null); 
  const [selectedProject, setSelectedProject] = useState(null); 
  
  // Cursor tracking for image preview
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 100, damping: 20 }); // Slightly softer spring
  const ySpring = useSpring(y, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <section id="work" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
      
      {/* Modal Popup */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      {/* Section Header */}
      <FadeIn>
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-xs font-mono text-blue-400 uppercase tracking-widest border border-blue-500/20 bg-blue-500/5 px-3 py-1 rounded-full">
            05 / Selected Projects
          </span>
          <div className="h-px bg-white/10 flex-1" />
        </div>
      </FadeIn>

      {/* Project List */}
      <div className="relative" onMouseMove={handleMouseMove}>
        {projects.map((project, index) => (
          <FadeIn key={project.id} delay={index * 0.1}>
            <div
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
              onClick={() => setSelectedProject(project)}
              className="group relative border-t border-white/10 py-12 transition-all duration-500 hover:border-blue-500/30 cursor-pointer"
            >
              {/* Background Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                
                {/* Left Side: Title & Tech */}
                <div className="md:w-2/3">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-sm text-gray-600 group-hover:text-blue-400 transition-colors duration-300">
                      0{index + 1}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white transition-all duration-300 group-hover:text-blue-100 md:group-hover:translate-x-2">
                      {project.title}
                    </h2>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4 ml-0 md:ml-10 md:group-hover:translate-x-2 transition-transform duration-300">
                    {project.tech.slice(0, 4).map((t) => (
                      <span key={t} className="text-[10px] md:text-xs font-mono font-medium text-gray-400 bg-white/5 border border-white/10 px-2 py-1 rounded group-hover:border-blue-500/30 group-hover:text-gray-300 transition-colors">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-[10px] md:text-xs font-mono text-gray-500 px-2 py-1">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Right Side: Category & Arrow */}
                <div className="flex flex-row md:flex-col justify-between items-center md:items-end w-full md:w-auto mt-4 md:mt-0">
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest group-hover:text-blue-400 transition-colors">
                    {project.category}
                  </span>
                  
                  <div className="flex items-center gap-2 mt-2">
                     <span className="text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                        View Details
                     </span>
                     <div className="p-2 rounded-full border border-white/10 text-gray-400 group-hover:bg-blue-500 group-hover:border-blue-500 group-hover:text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                       <ArrowUpRight size={20} />
                     </div>
                  </div>
                </div>

              </div>
            </div>
          </FadeIn>
        ))}
        {/* Bottom Border for last item */}
        <div className="border-t border-white/10" />
      </div>

      {/* Floating Image Preview (Hidden on Mobile) */}
      <motion.div
        style={{
          x: xSpring,
          y: ySpring,
          top: "-200px",  // Offset to center cursor relative to image
          left: "-175px",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: activeProject ? 1 : 0,
          opacity: activeProject ? 1 : 0,
        }}
        className="pointer-events-none fixed z-30 h-[350px] w-[550px] overflow-hidden rounded-2xl shadow-2xl hidden lg:block border border-white/10 bg-black"
      >
        <div className="relative h-full w-full">
           {/* Placeholder if no image is loaded yet */}
           <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center text-gray-700">
              <FolderOpen size={48} />
           </div>

          {projects.map((project) => (
            <img
              key={project.id}
              src={project.src}
              alt={project.title}
              className={`absolute h-full w-full object-cover transition-opacity duration-300 ${
                activeProject === project.id ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          
          {/* Overlay gradient on the image for better text readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Floating Caption inside the image */}
          <div className="absolute bottom-4 left-6">
             <span className="text-white font-mono text-sm bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-white/20">
               Click to view details
             </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;