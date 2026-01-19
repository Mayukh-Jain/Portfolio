import React from "react";
import { motion } from "framer-motion";
import { X, ExternalLink, Github, Layers } from "lucide-react";

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-blue-600/80 backdrop-blur-md border border-white/10 rounded-full text-white transition-all duration-300 group"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Hero Image Section */}
        <div className="relative h-[250px] md:h-[400px] w-full group">
          <img 
            src={project.src} 
            alt={project.title} 
            className="w-full h-full object-cover" 
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
          
          {/* Category Badge (Floating) */}
          <div className="absolute top-6 left-6">
            <span className="px-3 py-1 text-xs font-mono font-bold tracking-widest text-blue-200 uppercase bg-blue-500/20 backdrop-blur-md border border-blue-500/30 rounded-full shadow-lg">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-10 space-y-8">
          
          {/* Header & Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
                {project.title}
              </h2>
              <div className="h-1 w-20 bg-blue-500 rounded-full mt-4"></div>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <a 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 md:flex-none justify-center flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-500/30 hover:-translate-y-0.5"
              >
                <ExternalLink size={18} /> 
                <span>Live Demo</span>
              </a>
              <a 
                href={project.repoLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 md:flex-none justify-center flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all hover:-translate-y-0.5"
              >
                <Github size={18} /> 
                <span>Code</span>
              </a>
            </div>
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 text-gray-300 leading-relaxed text-base md:text-lg">
              {project.description}
            </div>

            {/* Tech Stack Sidebar */}
            <div className="lg:col-span-1 space-y-4">
               <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest mb-4">
                 <Layers size={16} className="text-blue-400" /> Technologies
               </div>
               <div className="flex flex-wrap gap-2">
                 {project.tech.map((t) => (
                   <span 
                     key={t} 
                     className="px-3 py-1.5 text-xs font-medium text-blue-200 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                   >
                     {t}
                   </span>
                 ))}
               </div>
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;