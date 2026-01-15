import React from "react";
import { Mail, Phone, Linkedin, Github, Code, Terminal } from "lucide-react";
import { personalDetails } from "../data/portfolioData";

const Footer = () => {
  return (
    <footer id="contact" className="relative z-10 pt-20 pb-10 px-6 border-t border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-12">
          
          <div className="max-w-lg">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
              Let's <br/><span className="text-gray-500">Connect.</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
              Open to new opportunities in Data Science, ML Engineering, and Full Stack Development.
            </p>
            <div className="space-y-4">
              <a 
                href={`mailto:${personalDetails.email}`}
                className="flex items-center gap-3 text-xl text-white hover:text-gray-300 transition-colors"
              >
                <Mail /> {personalDetails.email}
              </a>
              <a 
                href={`tel:${personalDetails.phone}`}
                className="flex items-center gap-3 text-xl text-white hover:text-gray-300 transition-colors"
              >
                <Phone /> {personalDetails.phone}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-12 w-full md:w-auto">
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-4 text-xs md:text-sm">Profiles</h4>
              <ul className="space-y-3 text-sm md:text-base">
                <li><a href={personalDetails.links.linkedin} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"><Linkedin size={18} /> LinkedIn</a></li>
                <li><a href={personalDetails.links.github} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"><Github size={18} /> GitHub</a></li>
                <li><a href={personalDetails.links.leetcode} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"><Code size={18} /> Leetcode</a></li>
                <li><a href={personalDetails.links.codeforces} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"><Terminal size={18} /> Codeforces</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-4 text-xs md:text-sm">Navigation</h4>
              <ul className="space-y-3 text-sm md:text-base">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#skills" className="text-gray-400 hover:text-white transition-colors">Skills</a></li>
                <li><a href="#work" className="text-gray-400 hover:text-white transition-colors">Projects</a></li>
                <li><a href="#experience" className="text-gray-400 hover:text-white transition-colors">Experience</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-gray-600 text-xs md:text-sm font-mono gap-4">
          <p>&copy; 2026 {personalDetails.name}. All rights reserved.</p>
          <p>Designed with React & Framer Motion</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;