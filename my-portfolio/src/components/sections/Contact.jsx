import React from "react";
import { Mail, MapPin, Send, Linkedin, Github } from "lucide-react";
import FadeIn from "../ui/FadeIn";
import { personalDetails } from "../../data/portfolioData"; 
import { useForm, ValidationError } from '@formspree/react';

const Contact = () => {
  // Replace "YOUR_FORM_ID" with the ID from your Formspree dashboard
  const [state, handleSubmit] = useForm("mreeakdy");

  // If the form is submitted successfully, show this UI
  if (state.succeeded) {
    return (
      <section id="contact" className="relative z-10 py-24 px-6 max-w-7xl mx-auto text-center">
        <FadeIn>
          <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 p-12 rounded-3xl backdrop-blur-sm">
            <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="text-blue-400" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Message Sent!</h2>
            <p className="text-gray-400 text-lg">
              Thanks for reaching out, {personalDetails.name.split(' ')[0]}. I've received your message and will get back to you shortly.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
            >
              Send another message
            </button>
          </div>
        </FadeIn>
      </section>
    );
  }

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

          <FadeIn delay={0.3}>
            <div className="flex gap-4 mt-8">
              <a href={personalDetails.links.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 hover:border-white/30 transition-all text-gray-400 hover:text-white">
                <Github size={20} />
              </a>
              <a href={personalDetails.links.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 hover:border-white/30 transition-all text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Right Column: Form */}
        <FadeIn delay={0.4}>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
            <div className="space-y-2">
              <label htmlFor="full-name" className="text-xs font-mono text-gray-400 uppercase tracking-wider">Full Name</label>
              <input 
                id="full-name" 
                type="text" 
                name="name" 
                placeholder="John Doe"
                required 
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-black/40 transition-all" 
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-mono text-gray-400 uppercase tracking-wider">Email Address</label>
              <input 
                id="email" 
                type="email" 
                name="email" 
                placeholder="john@example.com"
                required 
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-black/40 transition-all" 
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs mt-1" />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-mono text-gray-400 uppercase tracking-wider">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="4"
                placeholder="Tell me about your project..."
                required 
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-black/40 transition-all resize-none" 
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs mt-1" />
            </div>

            <button 
              type="submit" 
              disabled={state.submitting} 
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl disabled:opacity-50 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-900/20"
            >
              {state.submitting ? 'Sending...' : 'Send Message'}
              {!state.submitting && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
            </button>
          </form>
        </FadeIn>

      </div>
    </section>
  );
};

export default Contact;                                            