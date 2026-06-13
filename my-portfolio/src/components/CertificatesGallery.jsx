import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, Copy, Check, Filter, Linkedin } from "lucide-react";
import { certificates } from "../data/certificates";
import FadeIn from "./ui/FadeIn";

const cardClasses = {
  container: "group h-[240px] [perspective:1000px] cursor-pointer",
  inner: "relative h-full w-full transition-all duration-500 [transform-style:preserve-3d]",
  face: "absolute inset-0 h-full w-full rounded-2xl border border-white/10 [backface-visibility:hidden]",
  front: "overflow-hidden flex flex-col items-center justify-end p-8 gap-4 backdrop-blur-sm",
  back: "bg-zinc-950 flex flex-col p-6 [transform:rotateY(180deg)] border-blue-500/20 backdrop-blur-md",
};

const CertificateCard = ({ cert }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let timeout;
    if (isCopied) {
      timeout = setTimeout(() => setIsCopied(false), 1500);
    }
    return () => clearTimeout(timeout);
  }, [isCopied]);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(cert.credentialId);
    setIsCopied(true);
  };

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      className={cardClasses.container}
      onHoverStart={handleFlip}
      onHoverEnd={handleFlip}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      role="button"
      aria-label={`Certificate for ${cert.title}. Click to flip.`}
    >
      <div className={`${cardClasses.inner} ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}>
        {/* Front Face */}
        <div className={`${cardClasses.face} ${cardClasses.front}`}>
          {/* Certificate image as background */}
          {cert.frontImage && (
            <img
              src={cert.frontImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          )}

          {/* Bottom fade gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Date badge — top right, above gradient */}
          <div className="absolute top-4 right-4 z-10 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded-md text-[10px] font-mono text-blue-400">
            {cert.date}
          </div>

          {/* Text sits above the fade at the bottom */}
          <div className="relative z-10 text-center space-y-1 w-full">
            <h3 className="text-lg font-bold text-white leading-tight">
              {cert.title}
            </h3>
            <p className="text-sm text-gray-400 font-medium">
              {cert.issuer}
            </p>
          </div>
        </div>

        {/* Back Face */}
        <div className={`${cardClasses.face} ${cardClasses.back}`}>
          <div className="flex-1 space-y-4">
            <h4 className="text-xs font-mono text-blue-400 uppercase tracking-widest">Skills & Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {cert.skills.map(skill => (
                <span key={skill} className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300">
                  {skill}
                </span>
              ))}
            </div>

            <div className="space-y-2 pt-4">
              <span className="text-[10px] text-gray-500 font-mono uppercase">Credential ID</span>
              <div className="flex items-center justify-between bg-black/40 border border-white/5 rounded-lg px-3 py-2 group/copy">
                <code className="text-[11px] text-gray-300 truncate mr-2">
                  {cert.credentialId}
                </code>
                <button 
                  onClick={handleCopy}
                  className="text-gray-500 hover:text-white transition-colors"
                  aria-label="Copy credential ID"
                >
                  {isCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
                {isCopied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] px-2 py-1 rounded">
                    Copied!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl text-sm font-semibold hover:bg-blue-500 hover:text-white transition-all"
          >
            Verify Certificate <ExternalLink size={14} />
          </a> */}
        </div>
      </div>
    </motion.div>
  );
};

const FilterBar = ({ issuers, activeFilter, onFilterChange }) => (
  <div className="flex flex-wrap justify-center gap-3 mb-12">
    {issuers.map(issuer => (
      <button
        key={issuer}
        onClick={() => onFilterChange(issuer)}
        className={`px-5 py-2 rounded-full text-xs font-medium transition-all border ${
          activeFilter === issuer
            ? "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/20"
            : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
        }`}
      >
        {issuer}
      </button>
    ))}
  </div>
);

const INITIAL_VISIBLE = 8; // 4 cols × 1.5 rows

const CertificatesGallery = () => {
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const issuers = ["All", ...new Set(certificates.map(c => c.issuer))];
  const filteredCerts = filter === "All"
    ? certificates
    : certificates.filter(c => c.issuer === filter);

  const visibleCerts = showAll ? filteredCerts : filteredCerts.slice(0, INITIAL_VISIBLE);
  const hasMore = filteredCerts.length > INITIAL_VISIBLE;

  const handleFilterChange = (issuer) => {
    setFilter(issuer);
    setShowAll(false);
  };

  return (
    <section id="certifications" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 pb-6 border-b border-white/5">
          {/* Left Side: Section Badge Index */}
          <div className="flex items-center gap-4 flex-1">
            <div className="h-px bg-white/10 w-8 md:w-12" />
            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest border border-blue-500/20 bg-blue-500/5 px-3 py-1 rounded-full whitespace-nowrap">
              05 / Certifications
            </span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          {/* Right Side: External Verification Badges Profiles */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Credly Button */}
            <a 
              href="https://www.credly.com/users/mayukh-jain.4c6b99fe/badges"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-blue-500/5 rounded-xl text-xs font-mono text-zinc-300 hover:text-white transition-all group"
            >
              <Award size={14} className="text-blue-400 group-hover:scale-110 transition-transform" />
              Credly Transcript
              <ExternalLink size={12} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            </a>

            {/* LinkedIn Button */}
            <a 
              href="https://www.linkedin.com/in/mayukh-jain-b4732128a/details/certifications/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-blue-500/5 rounded-xl text-xs font-mono text-zinc-300 hover:text-white transition-all group"
            >
              <Linkedin size={14} className="text-blue-400 group-hover:scale-110 transition-transform" />
              LinkedIn Profile
              <ExternalLink size={12} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            </a>
          </div>
        </div>
      </FadeIn>

      <FilterBar
        issuers={issuers}
        activeFilter={filter}
        onFilterChange={handleFilterChange}
      />

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {visibleCerts.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} />
          ))}
        </AnimatePresence>
      </motion.div>

      {hasMore && (
        <FadeIn>
          <div className="flex items-center gap-4 mt-12">
            <div className="h-px bg-white/10 flex-1" />
            <button
              onClick={() => setShowAll(prev => !prev)}
              className="text-xs font-mono text-blue-400 uppercase tracking-widest border border-blue-500/20 bg-blue-500/5 px-5 py-2 rounded-full hover:bg-blue-500/10 hover:border-blue-500/40 transition-all whitespace-nowrap"
            >
              {showAll
                ? `↑ Show Less`
                : `↓ Show All — ${filteredCerts.length - INITIAL_VISIBLE} More`}
            </button>
            <div className="h-px bg-white/10 flex-1" />
          </div>
        </FadeIn>
      )}
    </section>
  );
};

export default CertificatesGallery;