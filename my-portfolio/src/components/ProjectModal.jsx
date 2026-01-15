import React from "react";
import { motion } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-[#0a0a0a] border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-white/20 transition-colors z-20 border border-white/10"
        >
          <X size={20} className="text-white" />
        </button>

        <div className="h-[200px] md:h-[350px] w-full relative">
          <img src={project.src} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <span className="text-gray-400 font-mono text-xs md:text-sm uppercase">{project.category}</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mt-1">{project.title}</h2>
            </div>
            <div className="flex gap-3 mt-6 md:mt-0 w-full md:w-auto">
               <a href={project.liveLink} className="flex-1 md:flex-none justify-center flex items-center gap-2 px-4 py-3 bg-white text-black rounded-md font-medium hover:bg-gray-200 transition-colors text-sm">
                 <ExternalLink size={16} /> Live Demo
               </a>
               <a href={project.repoLink} className="flex-1 md:flex-none justify-center flex items-center gap-2 px-4 py-3 border border-white/20 text-white rounded-md hover:bg-white/10 transition-colors text-sm">
                 <Github size={16} /> Code
               </a>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-8">
            {project.description}
          </p>

          <div>
            <h3 className="text-white font-bold mb-4 text-xs md:text-sm uppercase tracking-widest">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs md:text-sm text-gray-300">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;