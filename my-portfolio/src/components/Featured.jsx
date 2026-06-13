import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  GitPullRequest,
  Award,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import FadeIn from "./ui/FadeIn";

// ─────────────────────────────────────────────────────────────
// COPY STRINGS
// ─────────────────────────────────────────────────────────────
const SUBHEADING_TEXT = "Highlights across projects, open-source, and certifications.";

// ─────────────────────────────────────────────────────────────
// FEATURED ITEMS DATA
// Each item has a `type`: "project" | "oss" | "achievement"
// Fill in real values — placeholder fields marked with TODO
// ─────────────────────────────────────────────────────────────
const featuredItems = [
  {
    id: "osdag",
    type: "internship",
    title: "Osdag — Repository Split",
    subtitle: "Summer Fellowship · IIT Bombay",
    description:
      "Led the architectural separation of the Osdag monolithic codebase into osdag-core and osdag-gui packages. Implemented headless 3D rendering via OCC.Display.OCCViewer.OffscreenRenderer, removed all PySide6 dependencies from the core engine, and raised the production PR. This enables Osdag to run in server/CLI environments without a display for the first time.",
    tags: ["Python", "OpenCASCADE", "PySide6", "MLOps", "Open Source"],
    src: "/oss.png", // TODO: replace with a screenshot or architecture diagram
    primaryLink:  { label: "Repository", href: "https://github.com/osdag-admin/Osdag", icon: Github },   // TODO: real PR URL
    secondaryLink:null,
  },
  {
    id: "academia-ai",
    type: "project",
    title: "Academia.ai",
    subtitle: "AI/ML · RAG System",
    description:
      "Production-grade AI research assistant built on a retrieval-augmented generation pipeline. Indexes academic papers, extracts structured knowledge, and surfaces cited answers via a conversational interface. Deployed on Hugging Face's Space with Docker and Vercel.", // TODO: expand with real metrics
    tags: ["RAG", "LangChain", "AWS", "Docker", "FastAPI"],
    src: "/Academia.png", // TODO: replace with project screenshot
    primaryLink: { label: "View Live", href: "https://academia-ai-nu.vercel.app/", icon: ArrowUpRight },   // TODO: real live URL
    secondaryLink: { label: "Source Code", href: "https://github.com/Mayukh-Jain/Academia.ai", icon: Github },     // TODO: real repo URL
  },
  {
    id: "aws-solution-architect",
    type: "achievement",
    title: "AWS Solutions Architect",
    subtitle: "Amazon Web Services · Certification",
    description:
      "Earned the AWS Solutions Architect – Associate certification, validating expertise in designing distributed systems, selecting appropriate AWS services for cost, performance, and resilience, and applying the Well-Architected Framework across real-world cloud architectures.",
    tags: ["Cloud Architecture", "AWS", "Distributed Systems", "Well-Architected"],
    src: "/awssa.png", // TODO: replace with badge or certificate image
    primaryLink: { label: "Verify Credential", href: "https://www.credly.com/badges/bfafd0e0-539a-4605-b530-7ba8f6d23a74", icon: Award },  // TODO: real Credly URL
    secondaryLink: null,
  },
];

// ─────────────────────────────────────────────────────────────
// TYPE CONFIG — badge label + accent color per item type
// ─────────────────────────────────────────────────────────────
const typeConfig = {
  project:     { badge: "Project",      accent: "blue" },
  oss:         { badge: "Open Source",  accent: "emerald" },
  achievement: { badge: "Achievement",  accent: "violet" },
  internship:   { badge: "Internship",   accent: "emerald" }
};

const accentClasses = {
  blue:    { badge: "text-blue-400 border-blue-500/20 bg-blue-500/5",    primary: "bg-blue-500 hover:bg-blue-600",    ring: "hover:border-blue-500/30" },
  emerald: { badge: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5", primary: "bg-emerald-500 hover:bg-emerald-600", ring: "hover:border-emerald-500/30" },
  violet:  { badge: "text-violet-400 border-violet-500/20 bg-violet-500/5",  primary: "bg-violet-500 hover:bg-violet-600",  ring: "hover:border-violet-500/30" },
};

// ─────────────────────────────────────────────────────────────
// FEATURED CARD
// ─────────────────────────────────────────────────────────────
const FeaturedCard = ({ item, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isEven = index % 2 === 0;
  const config = typeConfig[item.type];
  const accent = accentClasses[config.accent];
  const PrimaryIcon = item.primaryLink?.icon;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      className={`group relative flex flex-col ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-8 lg:gap-16 items-center border border-white/10 rounded-3xl p-6 lg:p-10 bg-white/5 ${accent.ring} transition-colors duration-300`}
    >
      {/* Decorative Number */}
      <div
        className={`absolute top-4 ${
          isEven ? "right-8" : "left-8"
        } text-8xl font-bold text-white/5 select-none pointer-events-none z-0`}
      >
        0{index + 1}
      </div>

      {/* Image / Placeholder */}
      <div className="w-ful lg:w-1/2 aspect-video rounded-2xl border border-white/10 relative z-10">
        {item.src ? (
          <img
            src={item.src}
            alt={item.title}
            className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        ) : (
          <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center gap-3 text-gray-700">
            <span className={`text-4xl font-bold ${accent.badge.split(" ")[0]} opacity-20`}>
              0{index + 1}
            </span>
            <span className="text-xs font-mono uppercase tracking-widest">
              {/* TODO: add a screenshot here */}
              No Image Yet
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="w-full lg:w-1/2 space-y-6 relative z-10">
        <div className="space-y-3">
          {/* Type badge + subtitle */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-[10px] font-mono font-semibold uppercase tracking-widest border px-2 py-1 rounded-full ${accent.badge}`}
            >
              {config.badge}
            </span>
            <span className="text-xs text-gray-500 font-mono">{item.subtitle}</span>
          </div>

          {/* Tech / skill tags */}
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] md:text-xs font-mono font-medium text-gray-400 bg-white/5 border border-white/10 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white">
            {item.title}
          </h3>
        </div>

        {/* Description with read more toggle */}
        <div className="text-gray-400 leading-relaxed text-base">
          <p>
            {isExpanded
              ? item.description
              : `${item.description.slice(0, 150)}${item.description.length > 150 ? "…" : ""}`}
          </p>
          {item.description.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm font-medium transition-colors"
              aria-label={isExpanded ? "Show less description" : "Read full description"}
            >
              {isExpanded ? (
                <>Show less <ChevronUp size={14} /></>
              ) : (
                <>Read more <ChevronDown size={14} /></>
              )}
            </button>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-4">
          {item.primaryLink && (
            <a
              href={item.primaryLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-6 py-3 ${accent.primary} text-white rounded-xl font-semibold transition-all hover:scale-105`}
            >
              {item.primaryLink.label}
              {PrimaryIcon && <PrimaryIcon size={16} />}
            </a>
          )}
          {item.secondaryLink && (
            <a
              href={item.secondaryLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              {item.secondaryLink.icon && <item.secondaryLink.icon size={16} />}
              {item.secondaryLink.label}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────
// FEATURED SECTION
// ─────────────────────────────────────────────────────────────
const Featured = () => (
  <section id="featured" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
    {/* Section Header */}
    <FadeIn>
      <div className="flex items-center gap-4 mb-12 ">
        <div className="h-px bg-white/10 flex-1" />
        <span className="text-xs font-mono text-blue-400 uppercase tracking-widest border border-blue-500/20 bg-blue-500/5 px-3 py-1 rounded-full">
          02 / Featured
        </span>
        <div className="h-px bg-white/10 flex-1" />
      </div>
      
    </FadeIn>

    {/* Cards */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ staggerChildren: 0.15 }}
      className="space-y-16 lg:space-y-24"
    >
      {featuredItems.map((item, index) => (
        <FeaturedCard key={item.id} item={item} index={index} />
      ))}
    </motion.div>
  </section>
);

export default Featured;