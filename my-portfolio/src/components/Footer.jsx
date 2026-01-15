import React from "react";
import { Mail, Phone, Linkedin, Github, Code, Terminal } from "lucide-react";
import { personalDetails } from "../data/portfolioData";

// --- Custom Icons for Platforms ---

const KaggleIcon = ({ size = 18, className }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.825 23.859c-.022.092-.117.141-.283.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.447 1.374v5.111c0 .235-.117.352-.353.352H5.353c-.236 0-.352-.117-.352-.352V.353c0-.236.116-.353.352-.353h2.58c.236 0 .353.117.353.353v14.373l6.458-7.466c.141-.165.305-.247.492-.247h3.352c.165 0 .26.049.282.146.023.111-.028.212-.152.306l-6.326 6.941 6.579 8.527c.106.13.141.27.106.41z"/>
  </svg>
);

const HuggingFaceIcon = ({ size = 18, className }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M7.3 22.3a1.6 1.6 0 0 1-1-1.3l-.2-2.1a1 1 0 0 0-.2-.5l-1.6-1.6a1.6 1.6 0 0 1 .4-2.6l2-.7a1 1 0 0 0 .5-.4l1-1.8a1.6 1.6 0 0 1 2.8 0l1 1.8a1 1 0 0 0 .5.4l2 .7a1.6 1.6 0 0 1 .4 2.6l-1.6 1.6a1 1 0 0 0-.2.5l-.2 2.1a1.6 1.6 0 0 1-1 1.3l-2.1.2a1 1 0 0 0-.5.2l-1.6 1.6a1.6 1.6 0 0 1-2.5 0l-1.6-1.6a1 1 0 0 0-.5-.2Zm-1-8a4 4 0 0 0-2.4-.8 4 4 0 0 0-4 4 4.5 4.5 0 0 0 1.3 3.2l1.6-1.6a2.3 2.3 0 0 1-1-1.6 1.9 1.9 0 0 1 1.9-1.9 1.9 1.9 0 0 1 1.9 1.9c0 .6-.3 1-.7 1.4l1.6 1.6A4.5 4.5 0 0 0 6.3 14.3ZM12 4a3.5 3.5 0 0 0-3.5 3.5 3.4 3.4 0 0 0 .6 2l1.7-1.4a1.3 1.3 0 0 1-.2-.6 1.4 1.4 0 1 1 1.4 1.4c-.2 0-.4 0-.6-.2L9.7 10.4A3.5 3.5 0 0 0 12 11a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 12 4Zm5.7 10.3a4 4 0 0 0-2.4.8 4.5 4.5 0 0 0 3.2 6.2l1.6-1.6a2.2 2.2 0 0 1-.7-1.4 1.9 1.9 0 0 1 1.9-1.9 1.9 1.9 0 0 1 1.9 1.9 2.3 2.3 0 0 1-1 1.6l1.6 1.6a4.5 4.5 0 0 0 1.3-3.2 4 4 0 0 0-4-4Z"/>
  </svg>
);

const CheggIcon = ({ size = 18, className }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.016 0C5.391 0 0 5.381 0 12.008c0 6.627 5.391 12.008 12.016 12.008 6.616 0 12.008-5.381 12.008-12.008S18.632 0 12.016 0zM8.96 7.647h6.065v2.304h-3.48v2.103h2.952v2.128h-2.952v2.32H15.16v2.304H6.384V7.647H8.96z"/>
  </svg>
);


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
                <li><a href={personalDetails.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"><Linkedin size={18} /> LinkedIn</a></li>
                <li><a href={personalDetails.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"><Github size={18} /> GitHub</a></li>
                
                {/* --- Data Science Profiles --- */}
                <li><a href={personalDetails.links.kaggle} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"><KaggleIcon size={18} /> Kaggle</a></li>
                <li><a href={personalDetails.links.huggingface} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"><HuggingFaceIcon size={18} /> Hugging Face</a></li>
                
                {/* --- Certification & Expert Profiles --- */}
                <li><a href={personalDetails.links.chegg} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"><CheggIcon size={18} /> Chegg</a></li>
                <li><a href={personalDetails.links.leetcode} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"><Code size={18} /> Leetcode</a></li>
                <li><a href={personalDetails.links.codeforces} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"><Terminal size={18} /> Codeforces</a></li>
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