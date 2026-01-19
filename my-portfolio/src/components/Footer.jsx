import React from "react";
import { Mail, Linkedin, Github, Instagram, Twitter } from "lucide-react";
import { personalDetails } from "../data/portfolioData";

// --- Custom SVGs for Tech Platforms ---

const KaggleIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="18" height="18">
    <path d="M18.825 23.859c-.022.092-.117.141-.283.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.447 1.374v5.111c0 .235-.117.352-.353.352H5.353c-.236 0-.352-.117-.352-.352V.353c0-.236.116-.353.352-.353h2.58c.236 0 .353.117.353.353v14.373l6.458-7.466c.141-.165.305-.247.492-.247h3.352c.165 0 .26.049.282.146.023.111-.028.212-.152.306l-6.326 6.941 6.579 8.527c.106.13.141.27.106.41z"/>
  </svg>
);

const HuggingFaceIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="18" height="18">
    <path d="M7.3 22.3a1.6 1.6 0 0 1-1-1.3l-.2-2.1a1 1 0 0 0-.2-.5l-1.6-1.6a1.6 1.6 0 0 1 .4-2.6l2-.7a1 1 0 0 0 .5-.4l1-1.8a1.6 1.6 0 0 1 2.8 0l1 1.8a1 1 0 0 0 .5.4l2 .7a1.6 1.6 0 0 1 .4 2.6l-1.6 1.6a1 1 0 0 0-.2.5l-.2 2.1a1.6 1.6 0 0 1-1 1.3l-2.1.2a1 1 0 0 0-.5.2l-1.6 1.6a1.6 1.6 0 0 1-2.5 0l-1.6-1.6a1 1 0 0 0-.5-.2Zm-1-8a4 4 0 0 0-2.4-.8 4 4 0 0 0-4 4 4.5 4.5 0 0 0 1.3 3.2l1.6-1.6a2.3 2.3 0 0 1-1-1.6 1.9 1.9 0 0 1 1.9-1.9 1.9 1.9 0 0 1 1.9 1.9c0 .6-.3 1-.7 1.4l1.6 1.6A4.5 4.5 0 0 0 6.3 14.3ZM12 4a3.5 3.5 0 0 0-3.5 3.5 3.4 3.4 0 0 0 .6 2l1.7-1.4a1.3 1.3 0 0 1-.2-.6 1.4 1.4 0 1 1 1.4 1.4c-.2 0-.4 0-.6-.2L9.7 10.4A3.5 3.5 0 0 0 12 11a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 12 4Zm5.7 10.3a4 4 0 0 0-2.4.8 4.5 4.5 0 0 0 3.2 6.2l1.6-1.6a2.2 2.2 0 0 1-.7-1.4 1.9 1.9 0 0 1 1.9-1.9 1.9 1.9 0 0 1 1.9 1.9 2.3 2.3 0 0 1-1 1.6l1.6 1.6a4.5 4.5 0 0 0 1.3-3.2 4 4 0 0 0-4-4Z"/>
  </svg>
);

const CredlyIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="18" height="18">
    <path d="M13.33 0c6.048 1.096 10.63 6.36 10.63 12.72 0 7.152-5.783 12.952-12.915 12.952-6.522 0-11.939-4.809-13.065-11.08h6.293c1.077 2.872 3.824 4.908 7.058 4.908 4.14 0 7.502-3.359 7.502-7.5s-3.361-7.5-7.502-7.5c-3.142 0-5.832 1.917-6.96 4.655H-0.28C.674 3.922 5.676 0 11.644 0h1.688Z"/>
  </svg>
);

const LeetCodeIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="18" height="18">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.173 5.823a1.375 1.375 0 0 0 0 1.941l1.832 1.832a1.375 1.375 0 0 0 1.943 0l5.349-5.385a1.375 1.375 0 0 0 0-1.942l-1.833-1.832A1.373 1.373 0 0 0 13.483 0zM5.234 5.385a4.42 4.42 0 0 0-1.283 3.129 4.385 4.385 0 0 0 .524 2.05l-2.924 2.923a1.373 1.373 0 0 0 0 1.941l1.832 1.832a1.375 1.375 0 0 0 1.943 0l2.923-2.923a4.387 4.387 0 0 0 2.05.524 4.42 4.42 0 0 0 3.128-1.284l-1.942-1.942a1.635 1.635 0 0 1-2.228 0 1.637 1.637 0 0 1 0-2.228l1.942-1.942zm11.776 5.845a4.388 4.388 0 0 0-2.05-.524 4.42 4.42 0 0 0-3.128 1.284l1.942 1.942a1.635 1.635 0 0 1 2.228 0 1.638 1.638 0 0 1 0 2.228l-1.942 1.942a4.42 4.42 0 0 0 1.283-3.128 4.387 4.387 0 0 0-.524-2.05l2.924-2.924a1.374 1.374 0 0 0 0-1.94L18.953 9.29a1.374 1.374 0 0 0-1.943 0z"/>
  </svg>
);

const CodeforcesIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="18" height="18">
    <path d="M4.5 7.5A1.5 1.5 0 0 1 6 9v10.5A1.5 1.5 0 0 1 4.5 21h-3A1.5 1.5 0 0 1 0 19.5V9a1.5 1.5 0 0 1 1.5-1.5h3zm9-4.5A1.5 1.5 0 0 1 15 4.5v15A1.5 1.5 0 0 1 13.5 21h-3A1.5 1.5 0 0 1 9 19.5v-15A1.5 1.5 0 0 1 10.5 3h3zm9 9A1.5 1.5 0 0 1 24 13.5v6A1.5 1.5 0 0 1 22.5 21h-3A1.5 1.5 0 0 1 18 19.5v-6A1.5 1.5 0 0 1 19.5 12h3z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer id="footer" className="relative z-10 pt-20 pb-10 px-6 border-t border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Content: Flex container to push Brand Left and Links Right */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-12">
          
          {/* --- LEFT SIDE: Brand & Contact --- */}
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold tracking-tighter text-white">
              {personalDetails.name}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mt-4">
              Building scalable cloud infrastructures and intelligent AI solutions. 
              Let's create something extraordinary together.
            </p>
            <div className="mt-6">
              <a 
                href={`mailto:${personalDetails.email}`} 
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Mail size={16} /> {personalDetails.email}
              </a>
            </div>
          </div>

          {/* --- RIGHT SIDE: 3-Column Grid for Links --- */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-16 w-full lg:w-auto">
            
            {/* Column 1: Social Connect */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-xs text-blue-400">
                Connect
              </h4>
              <ul className="space-y-4 text-sm">
                {personalDetails.links.linkedin && (
                  <li>
                    <a href={personalDetails.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white group transition-colors">
                      <Linkedin size={18} className="group-hover:text-blue-400 transition-colors" /> LinkedIn
                    </a>
                  </li>
                )}
                {personalDetails.links.github && (
                  <li>
                    <a href={personalDetails.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white group transition-colors">
                      <Github size={18} className="group-hover:text-white transition-colors" /> GitHub
                    </a>
                  </li>
                )}
                {personalDetails.links.twitter && (
                  <li>
                    <a href={personalDetails.links.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white group transition-colors">
                      <Twitter size={18} className="group-hover:text-sky-400 transition-colors" /> Twitter / X
                    </a>
                  </li>
                )}
                {personalDetails.links.instagram && (
                  <li>
                    <a href={personalDetails.links.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white group transition-colors">
                      <Instagram size={18} className="group-hover:text-pink-400 transition-colors" /> Instagram
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Column 2: Coding & Data Profiles */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-xs text-purple-400">
                Expertise
              </h4>
              <ul className="space-y-4 text-sm">
                {personalDetails.links.kaggle && (
                  <li>
                    <a href={personalDetails.links.kaggle} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white group transition-colors">
                      <KaggleIcon className="group-hover:text-sky-400 transition-colors" /> Kaggle
                    </a>
                  </li>
                )}
                {personalDetails.links.huggingface && (
                  <li>
                    <a href={personalDetails.links.huggingface} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white group transition-colors">
                      <HuggingFaceIcon className="group-hover:text-yellow-400 transition-colors" /> Hugging Face
                    </a>
                  </li>
                )}
                {personalDetails.links.leetcode && (
                  <li>
                    <a href={personalDetails.links.leetcode} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white group transition-colors">
                      <LeetCodeIcon className="group-hover:text-orange-400 transition-colors" /> LeetCode
                    </a>
                  </li>
                )}
                {personalDetails.links.codeforces && (
                  <li>
                    <a href={personalDetails.links.codeforces} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white group transition-colors">
                      <CodeforcesIcon className="group-hover:text-red-500 transition-colors" /> Codeforces
                    </a>
                  </li>
                )}
                {personalDetails.links.credly && (
                  <li>
                    <a href={personalDetails.links.credly} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white group transition-colors">
                      <CredlyIcon className="group-hover:text-orange-500 transition-colors" /> Credly
                    </a>
                  </li>
                )}
              </ul>
            </div>

             {/* Column 3: Sitemap/Menu */}
             <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-xs text-emerald-400">
                Menu
              </h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white hover:pl-1 transition-all">Home</a></li>
                <li><a href="#about" className="flex items-center gap-3 text-gray-400 hover:text-white hover:pl-1 transition-all">About</a></li>
                <li><a href="#skills" className="flex items-center gap-3 text-gray-400 hover:text-white hover:pl-1 transition-all">Skills</a></li>
                <li><a href="#work" className="flex items-center gap-3 text-gray-400 hover:text-white hover:pl-1 transition-all">Projects</a></li>
                <li><a href="#experience" className="flex items-center gap-3 text-gray-400 hover:text-white hover:pl-1 transition-all">Experience</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-gray-600 text-xs font-mono gap-4">
          <p>&copy; {new Date().getFullYear()} {personalDetails.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;