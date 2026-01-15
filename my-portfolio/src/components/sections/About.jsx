import React from "react";
import { BookOpen, Award } from "lucide-react";
import { education, certifications } from "../../data/portfolioData";
// import FadeIn from "../ui/FadeIn";

const About = () => {
  return (
    <section id="about" className="relative z-10 py-20 md:py-32 px-6 max-w-4xl mx-auto">
      <div className="mb-16 border-b border-white/10 pb-4">
        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">04 / About Me</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8 text-base md:text-lg text-gray-300 leading-relaxed">
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

        <div className="space-y-10">
          <div>
            <h3 className="flex items-center gap-2 text-white font-bold mb-4 uppercase tracking-widest text-sm">
              <BookOpen size={16} /> Education
            </h3>
            {education.map((edu, index) => (
               <div key={index} className="mb-4">
                 <h4 className="text-white font-medium">{edu.institution}</h4>
                 <p className="text-gray-400 text-sm">{edu.degree}</p>
                 <div className="flex justify-between text-gray-500 text-xs mt-1 font-mono">
                   <span>{edu.year}</span>
                   <span>{edu.score}</span>
                 </div>
               </div>
            ))}
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-white font-bold mb-4 uppercase tracking-widest text-sm">
              <Award size={16} /> Certifications
            </h3>
            <ul className="space-y-3">
              {certifications.map((cert, index) => (
                <li key={index} className="text-gray-400 text-sm border-l border-white/10 pl-4 hover:border-white/50 transition-colors">
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;