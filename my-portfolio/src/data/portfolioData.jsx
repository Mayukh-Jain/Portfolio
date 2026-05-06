import cineAiImg from "../assets/project-images/cineai.png";
import leafCompassImg from "../assets/project-images/leafcompass.png";
import nyayaImg from "../assets/project-images/nyaya.png";
import floodImg from "../assets/project-images/flood.png";
import AcademiaImg from "../assets/project-images/Academia.png";
import astraflowImg from "../assets/project-images/astraflow.png";
import soulScriptImg from "../assets/project-images/soulscript.png";

export const personalDetails = {
  name: "Mayukh Jain",
  title: "AI/ML Engineer & Cloud Architect",
  email: "jainmayukh@gmail.com",
  phone: "+91-7007535723",
  location: "Bhopal, India",
  links: {
    github: "https://github.com/Mayukh-Jain",
    instagram: "https://www.instagram.com/mayukh__jain",
    linkedin: "https://www.linkedin.com/in/mayukh-jain-b4732128a",
    leetcode: "https://leetcode.com/u/Fey5VQ6tLR/",
    codeforces: "https://codeforces.com/profile/jackspar",
    credly: "https://www.credly.com/users/mayukh-jain.4c6b99fe/badges#credly",
    kaggle: "https://www.kaggle.com/mayukhj", 
    huggingface: "https://huggingface.co/Jain-Mayukh"
  }
};

export const projects = [
  {
    id: 1,
    title: "Academia.AI",
    category: "EdTech Platform",
    src: AcademiaImg,
    tech: ["React", "FastAPI", "RAG", "Supabase", "Sentence Transformers", "Edge TTS", "pgvector", "Docker"],
    description: "Transforms PDFs into interactive courses using RAG with sub-2s query response. Converts academic PDFs into interactive chats, adaptive courses, and podcast-style audio. Built with React (Vite), FastAPI, Google Gemini 1.5, and Supabase (Auth + pgvector). Deployed as scalable Docker microservices.",
    liveLink: "https://academia-ai-nu.vercel.app/",
    repoLink: "https://github.com/Mayukh-Jain/Academia.ai"
  },
  {
    id: 2,
    title: "Cine Ai",
    category: "AI Recommendation System",
    src: cineAiImg,
    tech: ["React", "FastAPI", "RAG", "Qdrant", "Sentence Transformers", "TMDB API"],
    description: "Indexes 10,000+ movie embeddings for semantic search with <100ms Qdrant retrieval. A semantic search engine and movie recommendation system. Integrated RAG with Google Gemini to generate context-aware, AI-driven movie explanations. Deployed via Docker microservices on Vercel and Hugging Face.",
    liveLink: "https://cine-ai-vert.vercel.app/",
    repoLink: "https://github.com/Mayukh-Jain/Cine-Ai"
  },
  {
    id: 3,
    title: "Leaf Compass",
    category: "Agri-Tech Platform",
    src: leafCompassImg,
    tech: ["React", "Python", "FastAPI", "TensorFlow (CNNs)", "Scikit-learn", "GenAI (LLMs)"],
    description: "~90% disease diagnosis accuracy using CNNs across 38 crop classes. Full-stack AgriAI application featuring disease diagnosis, crop prediction, and yield forecasting. Includes a context-aware AI chatbot powered by DeepSeek-V3.2 API for instant agricultural advice. Scalable containerized deployment.",
    liveLink: "https://leafcompass.vercel.app/",
    repoLink: "https://github.com/Mayukh-Jain/Leaf-Compass"
  },
  {
    id: 4,
    title: "NYAYA.AI",
    category: "Legal Intelligence",
    src: nyayaImg,
    tech: ["FastAPI", "RAG", "Llama 3", "Pinecone", "Docker", "Vercel"],
    description: "98% accuracy interpreting 15k+ legal precedents in sub-second vector search. AI companion interpreting the Bhartiya Nyaya Sanhita (BNS). Features an AI Verdict Predictor and Automated Document Drafter using Llama 3.3 via Groq. Architected a vector search pipeline to query 15k+ precedents in sub-second time.",
    liveLink: "https://samvidhan-ai-psi.vercel.app/",
    repoLink: "https://github.com/Mayukh-Jain/Nyaya.AI"
  },
  {
    id: 5,
    title: "ASTraFlow",
    category: "Code Visualisation",
    src: astraflowImg,
    tech: [ "AST", "Flowchart", "Code-Visualization", "Tree-Sitter", "FastAPI", "React", "Developer-Tools", "monaco-editor", "react-flow", "dagre"],
    description: "95% parsing accuracy across Python, JS, and C++ using custom AST parsers. AST-powered developer tool that converts source code into interactive, ISO-standard logic flowcharts for visual code analysis and documentation. Achieves 95% accuracy in parsing complex code structures using custom AST parsers.",
    liveLink: "https://astra-flow-rho.vercel.app/",
    repoLink: "https://github.com/Mayukh-Jain/ASTraFlow"
  },
  {
    id: 6,
    title: "Flood Prediction",
    category: "Predictive Analytics",
    src: floodImg,
    tech: [ "Flask", "Streamlit", "Random Forest", "OpenWeather API", "Scikit-learn", "Python"],
    description: "80–90% flood risk accuracy with 40% improved forecasting via real-time weather API. ML-powered flood risk assessment system. Integrates real-time weather data via OpenWeather API to improve forecasting efficiency by 40%. Deployed as a Flask web application for instant risk analysis.",
    liveLink: "https://flood-prediction-app-05sz.onrender.com/",
    repoLink: "https://github.com/Mayukh-Jain/Flood_Prediction_App"
  },
  {
    id: 7,
    title: "SoulScript",
    category: "Motion Design & Storytelling UI",
    src: soulScriptImg,
    tech: [ "React", "Tailwind CSS", "Framer Motion", "HTML5 Canvas", "React Router"],
    description: "Motion-driven interactive digital gift engine built with Framer Motion architecture and canvas animations. Transformed personal memories into an immersive storytelling experience with a focus on aesthetic minimalism and high-end motion design. Optimized for performance and fluid UX across devices.",
    liveLink: "https://soulscript-six.vercel.app/",
    repoLink: "https://github.com/Mayukh-Jain/SoulScript"
  },
];

// export const experience = [
//   {
//     year: "Oct 2024 – Present",
//     role: "Technical Team Member",
//     company: "TechnoMech Club (VIT Bhopal)",
//     description: "Spearheading technical operations for coding contests and workshops (100+ students). Co-developed and maintaining the club's official website, focusing on load time optimization and mobile responsiveness.",
//   }
// ];

// data/portfolioData.js
export const experienceData = [
  {
    role: "FOSSEE Summer Fellow (Osdag)",
    company: "IIT Bombay",
    companyUrl: "https://fossee.in/", // Optional
    date: "April 2026 – Present",
    description: [
      "Contributed to Osdag, an open-source structural steel design software, under the FOSSEE initiative.",
      "Developed the Desktop UI for the Bridge Module using PySide6 to handle complex parametric modeling and data visualization.",
      "Implemented responsive design patterns for engineering workflows, ensuring compliance with IS 800:2007 specifications.",
      "Shipped parametric UI components in PySide6 that render IS 800:2007-compliant steel design outputs for 3 bridge module types."
    ],
    tech: ["Python", "PySide6", "Qt", "Open Source", "Git"]
  },
  {
    role: "Cloud Engineering Intern",
    company: "CloudAILabs",
    companyUrl: "https://cloudailabs.in/", // Optional
    date: "Jan 2026 – Present",
    description: [
      "Optimized Docker container orchestration, reducing deployment time by 40%.",
      "Assisted in setting up CI/CD pipelines using GitHub Actions and AWS CodePipeline.",
      "Configured and deployed containerised microservices on AWS EC2, reducing manual provisioning time by ~35%."
    ],
    tech: ["AWS", "Docker", "CI/CD", "Linux"]
  },
  {
    role: "Technical Team Member",
    company: "TechnoMech Club",
    date: "Aug 2024 – Present",
    description: [
      "Mentored 50+ students in Python and Basic Data Structures.",
      "Organized 3 major hackathons, managing technical logistics for 200+ participants."
    ],
    tech: ["Leadership", "Python", "Event Management"]
  },
  // Add more...
];

export const education = [
  {
    institution: "VIT Bhopal University",
    degree: "B.Tech CSE (Cloud Computing & Automation)",
    year: "2023 – Present",
    score: "CGPA: 8.34 / 10",
    desc: "Specialisation: Cloud Computing & Automation"
  }
];

export const certifications = [
  "AWS Certified Solutions Architect – Associate",
  "AWS Cloud Practitioner Essentials",
  "Microsoft Certified: Azure Data Fundamentals",
  "Applied Machine Learning in Python (Univ. of Michigan)",
  "Smartbridge Certified Machine Learning (Google)",
  "IBM Introduction to Artificial Intelligence (AI)",
  "IBM Information Technology Fundamentals",
  "IBM Journey to Cloud: Envisioning Your Solution",
  "IBM Getting Started with Artificial Intelligence",
  "IBM Cloud Computing Fundamentals",
];

export const skillsData = [
  {
    category: "Languages & DBs",
    items: ["Python", "C++", "SQL", "Java", "JavaScript", "Vector DBs (FAISS/Chroma)"]
  },
  {
    category: "AI & GenAI",
    items: ["LangChain", "RAG (Retrieval Augmented Generation)", "TensorFlow", "PyTorch", "Scikit-learn", "DeepSeek API (LLMs)", "OpenCV", "Pytesseract (OCR)", "Hugging Face Transformers", "Cosine Similarity"]
  },
  {
    category: "Frameworks",
    items: ["FastAPI", "Flask", "React", "Streamlit", "Scikit-learn", ]
  },
  {
    category: "Libraries & Tools",
    items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Git", "MySQL", "Jupyter Notebook", "REST APIs"]
  },
  {
    category: "Cloud & MLOps",
    items: ["AWS (EC2, S3, Lambda)", "Docker", "Hugging Face", "Vercel", "Azure"]
  }
];