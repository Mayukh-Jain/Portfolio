import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#work" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/10">
      <a href="#" className="text-sm font-medium tracking-widest uppercase text-white z-50">
        MJ_20
      </a>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-sm text-gray-300 hover:text-white transition-colors uppercase tracking-wider"
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Mobile Hamburger Button */}
      <button 
        className="md:hidden text-white z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 bg-black border-b border-white/10 p-6 pt-20 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)} // Close menu on click
                className="text-lg text-gray-300 hover:text-white transition-colors uppercase tracking-wider font-medium"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;