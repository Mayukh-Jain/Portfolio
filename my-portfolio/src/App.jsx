import React, { useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import CustomCursor from './components/CustomCursor'; 

// UI Components
import SpotlightBackground from "./components/ui/SpotlightBackground";
import Preloader from "./components/ui/Preloader";

// Page Sections
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Skills from "./components/sections/Skills";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact"; // <--- ADDED THIS IMPORT
import Footer from "./components/Footer";
import ScrollBanner from "./components/sections/ScrollBanner"; // Import the new component

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
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. Main App Content */}
      <SpotlightBackground />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-60"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      {/* Main Content Area (Pushed right for Sidebar Nav) */}
      {/* <main className="md:pl-20 flex flex-col">  */}
        <Hero />
        <ScrollBanner />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact /> {/* Now defined! */}
        <Footer />
      {/* </main> */}
    </div>
  );
}