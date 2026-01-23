import cineAiImg from "../assets/project-images/cineai.png";
import leafCompassImg from "../assets/project-images/leafcompass.png";
import nyayaImg from "../assets/project-images/nyaya.png";
import floodImg from "../assets/project-images/flood.png";
import AcademiaImg from "../assets/project-images/Academia.png";

export const personalDetails = {
  name: "Mayukh Jain",
  title: "Data Scientist & ML Engineer",
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
    description: "Academia.AI is an AI-powered learning platform that transforms academic PDFs into interactive chats, adaptive courses, and podcast-style audio using Retrieval-Augmented Generation (RAG). Built with React (Vite), FastAPI, Google Gemini 1.5, Supabase (Auth + pgvector), and Tailwind CSS.",
    liveLink: "https://academia-ai-nu.vercel.app/",
    repoLink: "https://github.com/Mayukh-Jain/Academia.ai"
  },
  {
    id: 2,
    title: "Cine Ai",
    category: "AI Recommendation System",
    src: cineAiImg,
    tech: ["React", "FastAPI", "RAG", "Qdrant", "Sentence Transformers", "TMDB API"],
    description: "A semantic search engine and movie recommendation system. Indexes 10,000+ movie embeddings using Qdrant for natural language discovery. Integrated RAG with Google Gemini to generate context-aware, AI-driven movie explanations. Deployed via Docker microservices on Vercel and Hugging Face.",
    liveLink: "https://cine-ai-vert.vercel.app/",
    repoLink: "https://github.com/Mayukh-Jain/Cine-Ai"
  },
  {
    id: 3,
    title: "Leaf Compass",
    category: "Agri-Tech Platform",
    src: leafCompassImg,
    tech: ["React", "Python", "FastAPI", "TensorFlow (CNNs)", "Scikit-learn", "GenAI (LLMs)"],
    description: "Full-stack AgriAI application featuring disease diagnosis, crop prediction, and yield forecasting with ~90% accuracy using CNNs. Includes a context-aware AI chatbot powered by DeepSeek-V3.2 API for instant agricultural advice. Scalable containerized deployment.",
    liveLink: "https://leafcompass.vercel.app/",
    repoLink: "https://github.com/Mayukh-Jain/Leaf-Compass"
  },
  {
    id: 4,
    title: "NYAYA.AI",
    category: "Legal Intelligence",
    src: nyayaImg,
    tech: ["FastAPI", "RAG", "Llama 3", "Pinecone", "Docker", "Vercel"],
    description: "AI companion interpreting the Bhartiya Nyaya Sanhita (BNS) with 98% accuracy. Architected a vector search pipeline to query 15k+ precedents in sub-second time. Features an AI Verdict Predictor and Automated Document Drafter using Llama 3.3 via Groq.",
    liveLink: "https://samvidhan-ai-psi.vercel.app/",
    repoLink: "https://github.com/Mayukh-Jain/Nyaya.AI"
  },
  {
    id: 5,
    title: "Flood Prediction",
    category: "Predictive Analytics",
    src: floodImg,
    tech: [ "Flask", "Streamlit", "Random Forest", "OpenWeather API", "Scikit-learn", "Python"],
    description: "ML-powered flood risk assessment system achieving 80-90% accuracy. Integrates real-time weather data via OpenWeather API to improve forecasting efficiency by 40%. Deployed as a Flask web application for instant risk analysis.",
    liveLink: "https://flood-prediction-app-05sz.onrender.com/",
    repoLink: "https://github.com/Mayukh-Jain/Flood_Prediction_App"
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
    role: "Cloud Engineering Intern",
    company: "CloudAILabs",
    companyUrl: "https://cloudailabs.in/", // Optional
    date: "Jan 2026 – Present",
    description: [
      "Optimized Docker container orchestration, reducing deployment time by 40%.",
      "Assisted in setting up CI/CD pipelines using GitHub Actions and AWS CodePipeline.",
      "Learnt Various new concepts in cloud engineering."
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
    score: "CGPA: 8.34"
  },
  // {
  //   institution: "Little Flower House", // Replace with your School Name
  //   degree: "Higher Secondary (Class XII)",
  //   year: "2021 - 2023",
  //   score: "", // Replace with your score
  //   desc: "Science Stream (PCM) with Computer Science"
  // },
  // {
  //   institution: "Sacred Heart Convent School", // Replace with your School Name
  //   degree: "Secondary School (Class X)",
  //   year: "2009 - 2021",
  //   score: "", // Replace with your score
  //   desc: "General Studies"
  // }
];

export const certifications = [
  "Smartbridge Certified Machine Learning (Google)",
  "Applied Machine Learning in Python (Univ. of Michigan)",
  "Microsoft Certified: Azure Data Fundamentals",
  "IBM Cloud Computing Fundamentals"
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