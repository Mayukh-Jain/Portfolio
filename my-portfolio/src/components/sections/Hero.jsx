import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { personalDetails } from "../../data/portfolioData";

// New Imports
import { SplineScene } from "../ui/SplineScene";
import { Card } from "../ui/Card";
import { Spotlight } from "../ui/Spotlight";
import profileImg from "../../assets/profile.jpg"; // Importing the profile image

const Hero = () => {
  return (
    <section className="relative z-10 min-h-screen w-full flex items-center justify-center px-6 pt-20 md:pt-0 overflow-hidden">
      
      {/* Container for the 2-column layout */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-40 items-center">
        
        {/* --- LEFT SIDE: Original Text Content --- */}
        <div className="pointer-events-auto order-2 md:order-1 relative z-20 ">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[12vw] md:text-[6.5vw] leading-[0.85] font-bold tracking-tighter text-white uppercase mb-6 md:mb-8 mix-blend-overlay">
              MAYUKH <br />
              <span className="text-gray-500">JAIN</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-white font-light tracking-tight mb-8">
              Aspiring Data Scientist & ML Engineer
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-lg mb-10 md:mb-12 leading-relaxed">
               Specializing in predictive modeling, Computer Vision, Cloud Computing and Generative AI. 
               Building scalable, data-driven applications with Python, TensorFlow, and AWS.
            </p>
            <div className="flex gap-4">
              <a href="#work" className="inline-flex items-center gap-2 text-white border-b border-white pb-1 hover:text-gray-400 hover:border-gray-400 transition-colors">
                View Projects <ArrowRight size={16} />
              </a>
              <a href={personalDetails.links.github} target="_blank" className="inline-flex items-center gap-2 text-gray-400 border-b border-gray-400 pb-1 hover:text-white hover:border-white transition-colors">
                GitHub <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT SIDE: New 3D Spline Scene --- */}
        <div className="hidden md:block md:order-2 h-[400px] md:h-[600px] w-full relative z-10 ">
          <Card className="w-full h-full bg-black/40 border-white/10 relative overflow-hidden rounded-2xl">
           
            <div className="absolute inset-0 z-0 group">
               
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <img 
                  src={profileImg} 
                  alt="Profile" 
                  className="relative w-full h-full object-cover rounded-2xl border-2 border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500 shadow-2xl"
                />
                           
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
};

export default Hero;