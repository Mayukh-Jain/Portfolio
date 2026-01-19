import React from "react";
import { Mail, MapPin, Send, Linkedin, Github, Twitter, ExternalLink } from "lucide-react";
import FadeIn from "../ui/FadeIn";
import { personalDetails } from "../../data/portfolioData"; // Import data

const Contact = () => {
  return (
    <section id="contact" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
      
      <FadeIn>
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-xs font-mono text-blue-400 uppercase tracking-widest border border-blue-500/20 bg-blue-500/5 px-3 py-1 rounded-full">
            05 / Get In Touch
          </span>
          <div className="h-px bg-white/10 flex-1" />
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Left Column: Info */}
        <div className="space-y-8">
          <FadeIn delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Let's work <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                together.
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mt-6">
              I'm currently open to new opportunities in <strong>Cloud Computing</strong> and <strong>AI/ML</strong>. Whether you have a project idea or just want to discuss the latest in DevOps, feel free to drop a message!
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-6 mt-8">
              {/* Email Item */}
              <a href={`mailto:${personalDetails.email}`} className="flex items-center gap-4 group">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-blue-500/10 group-hover:border-blue-500/50 transition-colors">
                  <Mail size={20} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">Mail me</p>
                  <p className="text-white font-medium group-hover:text-blue-400 transition-colors">{personalDetails.email}</p>
                </div>
              </a>

              {/* Location Item */}
              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-purple-500/10 group-hover:border-purple-500/50 transition-colors">
                  <MapPin size={20} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">Based in</p>
                  <p className="text-white font-medium">Bhopal, India</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Dynamic Social Links */}
          <FadeIn delay={0.3}>
            <div className="flex gap-4 mt-8">
              <a href={personalDetails.links.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 hover:border-white/30 transition-all text-gray-400 hover:text-white">
                <Github size={20} />
              </a>
              <a href={personalDetails.links.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 hover:border-white/30 transition-all text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </a>
              {/* Add more from data if needed */}
            </div>
          </FadeIn>
        </div>

        {/* Right Column: Form */}
        <FadeIn delay={0.4}>
          <form 
            action="https://formspree.io/f/YOUR_FORM_ID" // OPTIONAL: Add your Formspree ID here
            method="POST"
            className="space-y-6 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-mono text-gray-400 uppercase tracking-wider">Name</label>
              <input type="text" name="name" id="name" placeholder="John Doe" required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-black/40 transition-all"/>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-mono text-gray-400 uppercase tracking-wider">Email</label>
              <input type="email" name="email" id="email" placeholder="john@example.com" required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-black/40 transition-all"/>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-mono text-gray-400 uppercase tracking-wider">Message</label>
              <textarea name="message" id="message" rows="4" placeholder="Tell me about your project..." required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-black/40 transition-all resize-none"/>
            </div>

            <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group">
              Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </FadeIn>

      </div>
    </section>
  );
};

export default Contact;