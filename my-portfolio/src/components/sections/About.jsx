import React from "react";
import { BookOpen, Award } from "lucide-react";
import { education, certifications } from "../../data/portfolioData";
import FadeIn from "../ui/FadeIn";
import profileImg from "../../assets/image.png"; // <--- Import your image here

const About = () => {
  return (
    <section id="about" className="relative z-10 py-20 md:py-32 px-6 max-w-4xl mx-auto">
      <FadeIn>
        <div className="mb-16 border-b border-white/10 pb-4">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">04 / About Me</span>
        </div>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left Column: Image + Bio */}
        <div className="space-y-8">
          <FadeIn>
            {/* Profile Image with "Tech" Styling */}
            <div className="relative w-48 h-48 mb-8 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <img 
                src={profileImg} 
                alt="Profile" 
                className="relative w-full h-full object-cover rounded-2xl border-2 border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500 shadow-2xl"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="text-base md:text-lg text-gray-300 leading-relaxed space-y-6">
              <p>
                I am a B.Tech Computer Science student specializing in <span className="text-white font-semibold">Cloud Computing & Automation</span>. My passion lies in bridging the gap between heavy-duty Machine Learning models and scalable real-world applications.
              </p>
              <p>
                With a strong foundation in <span className="text-white font-semibold">Predictive Modeling</span> and <span className="text-white font-semibold">Computer Vision</span>, I have proven experience deploying containerized applications using Docker and AWS.
              </p>
              <p>
                Currently, I am focused on exploring Generative AI and RAG architectures to build intelligent systems that solve complex problems in Agriculture, Law, and Media.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Right Column: Education & Certs */}
        <div className="space-y-10">
          <FadeIn delay={0.4}>
            <div>
              <h3 className="flex items-center gap-2 text-white font-bold mb-4 uppercase tracking-widest text-sm">
                <BookOpen size={16} className="text-blue-400" /> Education
              </h3>
              {education.map((edu, index) => (
                 <div key={index} className="mb-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                   <h4 className="text-white font-medium">{edu.institution}</h4>
                   <p className="text-gray-400 text-sm mt-1">{edu.degree}</p>
                   <div className="flex justify-between text-gray-500 text-xs mt-3 font-mono border-t border-white/10 pt-3">
                     <span>{edu.year}</span>
                     <span>{edu.score}</span>
                   </div>
                 </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div>
              <h3 className="flex items-center gap-2 text-white font-bold mb-4 uppercase tracking-widest text-sm">
                <Award size={16} className="text-purple-400" /> Certifications
              </h3>
              <ul className="space-y-3">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-400 text-sm group">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-purple-400 transition-colors"></span>
                    <span className="group-hover:text-gray-200 transition-colors">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default About;