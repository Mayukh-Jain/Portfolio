import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  User, 
  Briefcase, 
  Code2, 
  Layers, 
  Mail,
  FileText
} from "lucide-react";

const navItems = [
  { id: "home", name: "Home", href: "#", icon: <Home size={18} className="sm:w-5 sm:h-5" /> },
  { id: "about", name: "About", href: "#about", icon: <User size={18} className="sm:w-5 sm:h-5" /> },
  { id: "skills", name: "Skills", href: "#skills", icon: <Code2 size={18} className="sm:w-5 sm:h-5" /> },
  { id: "work", name: "Projects", href: "#work", icon: <Layers size={18} className="sm:w-5 sm:h-5" /> },
  { id: "experience", name: "Experience", href: "#experience", icon: <Briefcase size={18} className="sm:w-5 sm:h-5" /> },
  { id: "contact", name: "Contact", href: "#contact", icon: <Mail size={18} className="sm:w-5 sm:h-5" /> },
];

const Navbar = () => {
  const [hoveredTab, setHoveredTab] = useState(null);

  return (
    // Outer Container: Added px-4 for safe margins on mobile
    <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="pointer-events-auto"
      >
        <div className="flex items-center gap-1 sm:gap-2 p-2 mx-auto max-w-full rounded-[24px] bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] shadow-black/40 ring-1 ring-white/5">
          
          {/* --- STATUS BADGE (Hidden on Mobile) --- */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-white/5 rounded-full border border-white/5 mr-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-semibold tracking-wide text-white/60 uppercase">Available</span>
          </div>

          {/* --- NAVIGATION ITEMS --- */}
          <ul className="flex items-center gap-0.5 sm:gap-1">
            {navItems.map((item) => (
              <li key={item.id} className="relative group">
                <a
                  href={item.href}
                  onMouseEnter={() => setHoveredTab(item.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  // Reduced padding on mobile (p-2) vs desktop (p-3)
                  className="relative z-10 block p-2 sm:p-3 text-white/50 transition-colors duration-300 group-hover:text-white"
                >
                  {item.icon}
                  
                  {/* Sliding Background Effect */}
                  {hoveredTab === item.id && (
                    <motion.div
                      layoutId="nav-bg"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/5 -z-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </a>

                {/* Animated Tooltip (Hidden on touch devices via CSS hover rules if needed, but handled here structurally) */}
                <AnimatePresence>
                  {hoveredTab === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      // Added hidden sm:block to ensure tooltips don't obscure content on very small touch screens
                      className="hidden sm:block absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg text-xs font-medium text-white shadow-xl whitespace-nowrap pointer-events-none"
                    >
                      {item.name}
                      <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45 border-r border-b border-white/10"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* --- SEPARATOR --- */}
          <div className="w-px h-6 bg-white/10 mx-1 sm:mx-2" />
          
          {/* --- ACTION BUTTON (RESUME) --- */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/My_Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            // Mobile: Icon only (p-2). Desktop: Text + Icon (px-4 py-2)
            className="flex items-center justify-center gap-2 p-2 sm:px-4 sm:py-2 bg-white text-black rounded-full font-bold text-sm shadow-lg shadow-white/10 hover:shadow-white/20 transition-all"
          >
             {/* Text hidden on mobile */}
             <span className="hidden sm:inline">Resume</span>
             {/* Icon size adjusted slightly */}
             <FileText size={18} className="sm:w-[14px] sm:h-[14px] sm:opacity-60" />
          </motion.a>

        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;