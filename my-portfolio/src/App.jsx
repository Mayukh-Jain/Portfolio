import React, { useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import CustomCursor from './components/CustomCursor'; 

// UI Components
import NeuralMatrixBackground from "./components/ui/NeuralMatrixBackground";
import Preloader from "./components/ui/Preloader"; // This points to the component above

// Page Sections
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Skills from "./components/sections/Skills";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact"; 
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-black min-h-screen text-white selection:bg-blue-500/30 selection:text-blue-200 overflow-hidden font-sans">
      <CustomCursor />
      
      {/* 1. Preloader */}
      <AnimatePresence>
  {loading && <Preloader onComplete={() => setLoading(false)} />}
</AnimatePresence>

      {/* 2. Main App Content - Only visible after loading or use opacity logic */}
      <div className={loading ? "opacity-0 h-screen overflow-hidden" : "opacity-100 transition-opacity duration-1000"}>
        <NeuralMatrixBackground />
        
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-60"
          style={{ scaleX }}
        />
        
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </main>
      </div>
    </div>
  );
}