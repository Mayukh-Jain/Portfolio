import React from "react";
import { motion } from "framer-motion";
import { 
  Brain, Layout, Wrench, Cloud, Terminal, Cpu 
} from "lucide-react";
import FadeIn from "../ui/FadeIn";

// Updated data structure including your Libraries and Tools
const skillsData = [
  {
    category: "AI & GenAI",
    icon: <Brain className="w-6 h-6" />,
    color: "from-purple-500/20 to-indigo-500/20",
    textColor: "text-purple-400",
    skills: ["LangChain", "RAG (Retrieval Augmented Generation)", "TensorFlow", "PyTorch", "Scikit-learn", "DeepSeek API (LLMs)", "OpenCV", "Pytesseract (OCR)", "Hugging Face Transformers", "Cosine Similarity"]
  },
  {
    category: "Cloud & MLOps",
    icon: <Cloud className="w-6 h-6" />,
    color: "from-sky-500/20 to-blue-500/20",
    textColor: "text-sky-400",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "MLFlow", "Hugging Face", "Vercel", "Azure"]
  },
  {
    category: "Languages & DBs",
    icon: <Terminal className="w-6 h-6" />,
    color: "from-blue-500/20 to-cyan-500/20",
    textColor: "text-blue-400",
    skills: ["Python", "C++", "JavaScript", "PostgreSQL", "MongoDB", "Java", "Vector DBs (FAISS/Chroma)"]
  },
  {
    category: "Frameworks",
    icon: <Layout className="w-6 h-6" />,
    color: "from-emerald-500/20 to-teal-500/20",
    textColor: "text-emerald-400",
    skills: ["React", "FastAPI", "Next.js", "Flask", "TailwindCSS","Streamlit", "Scikit-learn"]
  }
];

const toolsData = {
  category: "Libraries & Tools",
  icon: <Wrench className="w-6 h-6" />,
  color: "from-amber-500/20 to-orange-500/20",
  textColor: "text-amber-400",
  groups: [
    { label: "AI Libs", items: ["NumPy", "Pandas", "Scikit-Learn", "Matplotlib", "Seaborn", ] },
    { label: "Dev Tools", items: ["Git", "Postman", "Vercel", "Bash", "Jupyter Notebook", "REST APIs"] },
    { label: "Design", items: ["Figma", "Framer Motion", "Canva"] }
  ]
};

const SkillCard = ({ group, index, span = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className={`group relative ${span}`}
  >
    {/* Background Glow Effect */}
    <div className={`absolute inset-0 bg-gradient-to-br ${group.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] blur-xl`} />
    
    <div className="relative h-full p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-md border border-white/10 overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className={`p-3 rounded-2xl bg-white/5 ${group.textColor}`}>
          {group.icon}
        </div>
        <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
          Module_0{index + 1}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-6 tracking-tight group-hover:text-cyan-400 transition-colors uppercase">
        {group.category}
      </h3>

      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span 
            key={skill}
            className="px-3 py-1 text-xs font-medium text-gray-400 bg-white/5 border border-white/5 rounded-lg group-hover:border-white/20 group-hover:text-white transition-all"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  </motion.div>
);

const Skills = () => {
  return (
    <section id="skills" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- SECTION HEADER --- */}
        <FadeIn>
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-xs font-mono text-blue-400 uppercase tracking-widest border border-blue-500/20 bg-blue-500/5 px-3 py-1 rounded-full">
            02 / Skills
          </span>
          <div className="h-px bg-white/10 flex-1" />
        </div>
      </FadeIn>
          

        {/* --- BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Main Module: AI & GenAI */}
          <SkillCard group={skillsData[0]} index={0} span="md:col-span-2 lg:col-span-2" />
          
          {/* Secondary: Cloud & MLOps */}
          <SkillCard group={skillsData[1]} index={1} />
          
          {/* Secondary: Languages */}
          <SkillCard group={skillsData[2]} index={2} />
          
          {/* Third Row: Frameworks */}
          <SkillCard group={skillsData[3]} index={3} />
          
          {/* --- DECORATIVE TECH INFO MODULE --- */}
          <div className="lg:col-span-3 p-8 rounded-[2rem] border border-white/5 flex items-center justify-between bg-white/[0.01] backdrop-blur-sm">
             <div className="flex gap-12">
                <div>
                   <p className="text-[10px] text-gray-500 uppercase mb-2">Primary OS</p>
                   <p className="text-white font-mono text-sm">Windows</p>
                </div>
                <div>
                   <p className="text-[10px] text-gray-500 uppercase mb-2">Cloud Preference</p>
                   <p className="text-white font-mono text-sm">AWS / GCP</p>
                </div>
             </div>
             <Cpu className="text-white/5 w-16 h-16 animate-pulse hidden sm:block" />
          </div>

          {/* --- FULL WIDTH TOOL BOX --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 group relative"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${toolsData.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] blur-xl`} />
            
            <div className="relative p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-md border border-white/10 overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                
                {/* Info Block */}
                <div className="flex items-center gap-4 min-w-fit">
                  <div className={`p-3 rounded-2xl bg-white/5 ${toolsData.textColor}`}>
                    {toolsData.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight uppercase">System Utilities</h3>
                    <p className={`text-[10px] font-mono ${toolsData.textColor} opacity-60 uppercase tracking-widest`}>Toolchain & Libs</p>
                  </div>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 flex-grow">
                  {toolsData.groups.map((subGroup) => (
                    <div key={subGroup.label} className="space-y-3">
                      <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
                        {subGroup.label}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {subGroup.items.map((item) => (
                          <span key={item} className="text-sm text-gray-400 hover:text-white transition-colors cursor-default">
                            {item} <span className="text-white/10 ml-1">/</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Animated Widget */}
                <div className="hidden lg:block relative w-32 h-16 border-l border-white/5 pl-4">
                  <div className="w-full h-full flex flex-col justify-between py-1">
                      {[1, 2, 3, 4].map((i) => (
                          <motion.div 
                            key={i}
                            animate={{ width: ["20%", "80%", "20%"] }}
                            transition={{ repeat: Infinity, duration: 3, delay: i * 0.2 }}
                            className="h-1 bg-white/5 rounded-full overflow-hidden"
                          >
                              <div className="h-full bg-amber-500/20 w-full" />
                          </motion.div>
                      ))}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Skills;