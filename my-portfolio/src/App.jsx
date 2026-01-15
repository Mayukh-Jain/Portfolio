import React, { useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

// UI Components
import SpotlightBackground from "./components/ui/SpotlightBackground";
import Preloader from "./components/ui/Preloader"; // <--- Import the Preloader

// Page Sections
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Skills from "./components/sections/Skills";
import About from "./components/sections/About";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true); // <--- State for loading status

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black overflow-hidden font-sans">
      
      {/* 1. The Preloader Wrapper */}
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. Main App Content (Always rendered underneath) */}
      <SpotlightBackground />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-60 mix-blend-difference"
        style={{ scaleX }}
      />
      
      <Navbar />
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <About />
      <Footer />
    </div>
  );
}