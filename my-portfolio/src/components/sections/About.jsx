import React, { useState } from "react";
import { BookOpen, Award, ArrowUpRight, Github, FileText, Layers, ChevronDown, ChevronUp } from "lucide-react";
import { education, certifications, personalDetails } from "../../data/portfolioData";
import FadeIn from "../ui/FadeIn";
import profileImg from "../../assets/image.png"; 
import profileImg2 from "../../assets/profile.jpg"; 

const About = () => {
  // State for toggling certifications
  const [isExpanded, setIsExpanded] = useState(false);

  // Logic to determine which certificates to display
  const displayedCerts = isExpanded ? certifications : certifications.slice(0, 3);
  const remainingCount = certifications.length - 3;

  return (
    <section id="about" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
      <FadeIn>
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-xs font-mono text-blue-400 uppercase tracking-widest border border-blue-500/20 bg-blue-500/5 px-3 py-1 rounded-full">
            01 / About Me
          </span>
          <div className="h-px bg-white/10 flex-1" />
        </div>
      </FadeIn>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT COLUMN (4 spans) --- */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Profile Card */}
          <FadeIn>
            <div className="group relative w-full aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-2">
              {/* Decorative Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none" />
              
              {/* Stacked Images Effect */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                {/* Back Image (Creative) - Peeks out on hover */}
                <img 
                  src={profileImg} 
                  alt="Creative Portrait" 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-out z-0"
                />
                
                {/* Front Image (Professional) - Fades out on hover */}
                <img 
                  src={profileImg2} 
                  alt="Professional Portrait" 
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:opacity-0 transition-opacity duration-500 z-10"
                />

                {/* Overlay Text */}
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl">
                    <p className="text-white text-sm font-semibold">Mayukh Jain</p>
                    <p className="text-gray-400 text-xs">Cloud & Automation</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Links Card */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              <a 
                href={personalDetails.links.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
              >
                <Github size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                <span className="text-sm font-medium text-gray-300 group-hover:text-white">GitHub</span>
              </a>
              <a 
                href="/MayukhJain.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
              >
                <FileText size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                <span className="text-sm font-medium text-gray-300 group-hover:text-white">Resume</span>
              </a>
            </div>
          </FadeIn>
        </div>

        {/* --- RIGHT COLUMN (8 spans) --- */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Bio Section */}
          <FadeIn delay={0.3}>
            <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <Layers size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">The Developer</h3>
              </div>
              <div className="space-y-4 text-gray-400 leading-relaxed text-base md:text-lg">
                <p>
                  I don't just train models; I deploy them. As a CS student specializing in <strong className="text-gray-200 font-semibold">Cloud Computing & Automation</strong>, my focus lies in <span className="text-blue-200">Cloud-Native AI</span>—building robust DevOps pipelines to turn theoretical ML concepts into scalable, production-ready applications.
                </p>
                <p>
                  Beyond the code, I serve as a technical mentor for the <strong className="text-gray-200 font-semibold">TechnoMech Club</strong>. When I'm not optimizing Docker containers, I'm exploring <span className="text-purple-200">minimalist UI design</span> or capturing architecture through my lens.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Bento Grid for Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Education Card */}
            <FadeIn delay={0.4}>
              <div className="h-full bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-colors">
                <h3 className="flex items-center gap-2 text-white font-bold mb-6 text-sm uppercase tracking-wider">
                  <BookOpen size={16} className="text-blue-400" /> Education
                </h3>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="relative pl-4 border-l border-white/10">
                      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-900 border border-blue-500"></div>
                      <h4 className="text-white font-medium text-sm">{edu.institution}</h4>
                      <p className="text-gray-500 text-xs mt-1">{edu.degree}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs font-mono text-gray-600">{edu.year}</span>
                        <span className="text-xs font-bold text-blue-400/80 bg-blue-500/5 px-2 py-0.5 rounded">{edu.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Certifications Card (UPDATED) */}
            <FadeIn delay={0.5}>
              <div className="h-full bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-colors">
                <h3 className="flex items-center gap-2 text-white font-bold mb-6 text-sm uppercase tracking-wider">
                  <Award size={16} className="text-purple-400" /> Certifications
                </h3>
                
                <div className="flex flex-wrap gap-2 content-start transition-all duration-300">
                  {displayedCerts.map((cert, index) => (
                    <div 
                      key={index} 
                      className="group flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-all cursor-default"
                    >
                      <span className="text-xs text-gray-300 group-hover:text-white transition-colors">{cert}</span>
                    </div>
                  ))}

                  {/* Toggle Button */}
                  {certifications.length > 3 && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="flex items-center gap-1 px-3 py-2 border border-dashed border-white/10 hover:border-white/30 hover:bg-white/5 rounded-lg text-xs text-gray-500 hover:text-gray-300 transition-all cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          Show Less <ChevronUp size={12} />
                        </>
                      ) : (
                        <>
                          +{remainingCount} More <ChevronDown size={12} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;