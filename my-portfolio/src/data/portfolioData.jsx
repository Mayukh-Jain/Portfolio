export const personalDetails = {
  name: "Mayukh Jain",
  title: "Data Scientist & ML Engineer",
  email: "jainmayukh@gmail.com",
  phone: "+91-7007535723",
  location: "Bhopal, India",
  links: {
    github: "https://github.com/Mayukh-Jain",
    linkedin: "https://www.linkedin.com/in/mayukh-jain-b4732128a",
    leetcode: "https://leetcode.com/u/Fey5VQ6tLR/",
    codeforces: "https://codeforces.com/profile/jackspar",
    credly: "https://www.credly.com/users/mayukh-jain.4c6b99fe/badges#credly"
  }
};

export const projects = [
  {
    id: 1,
    title: "Cine Ai",
    category: "AI Recommendation System",
    src: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop",
    tech: ["React", "FastAPI", "RAG", "Qdrant", "Google Gemini"],
    description: "A semantic search engine and movie recommendation system. Indexes 10,000+ movie embeddings using Qdrant for natural language discovery. Integrated RAG with Google Gemini to generate context-aware, AI-driven movie explanations. Deployed via Docker microservices on Vercel and Hugging Face.",
    liveLink: "https://cine-ai-vert.vercel.app/",
    repoLink: "https://github.com/Mayukh-Jain/Cine-Ai"
  },
  {
    id: 2,
    title: "Leaf Compass",
    category: "Agri-Tech Platform",
    src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2670&auto=format&fit=crop",
    tech: ["TensorFlow (CNN)", "DeepSeek API", "FastAPI", "React"],
    description: "Full-stack AgriAI application featuring disease diagnosis, crop prediction, and yield forecasting with ~90% accuracy using CNNs. Includes a context-aware AI chatbot powered by DeepSeek-V3.2 API for instant agricultural advice. Scalable containerized deployment.",
    liveLink: "https://leafcompass.vercel.app/",
    repoLink: "https://github.com/Mayukh-Jain/Leaf-Compass"
  },
  {
    id: 3,
    title: "NYAYA.AI",
    category: "Legal Intelligence",
    src: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2600&auto=format&fit=crop",
    tech: ["Llama 3", "Pinecone", "RAG", "FastAPI", "Docker"],
    description: "AI companion interpreting the Bhartiya Nyaya Sanhita (BNS) with 98% accuracy. Architected a vector search pipeline to query 15k+ precedents in sub-second time. Features an AI Verdict Predictor and Automated Document Drafter using Llama 3.3 via Groq.",
    liveLink: "https://samvidhan-ai-psi.vercel.app/",
    repoLink: "https://github.com/Mayukh-Jain/Nyaya.AI"
  },
  {
    id: 4,
    title: "Flood Prediction",
    category: "Predictive Analytics",
    src: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2670&auto=format&fit=crop",
    tech: ["Python", "Scikit-learn", "Random Forest", "Flask", "OpenWeather API"],
    description: "ML-powered flood risk assessment system achieving 80-90% accuracy. Integrates real-time weather data via OpenWeather API to improve forecasting efficiency by 40%. Deployed as a Flask web application for instant risk analysis.",
    liveLink: "https://flood-prediction-app-05sz.onrender.com/",
    repoLink: "https://github.com/Mayukh-Jain/Flood_Prediction_App"
  },
];

export const experience = [
  {
    year: "Oct 2024 – Present",
    role: "Technical Team Member",
    company: "TechnoMech Club (VIT Bhopal)",
    description: "Spearheading technical operations for coding contests and workshops (100+ students). Co-developed and maintaining the club's official website, focusing on load time optimization and mobile responsiveness.",
  }
];

export const education = [
  {
    institution: "VIT Bhopal University",
    degree: "B.Tech CSE (Cloud Computing & Automation)",
    year: "2023 – Present",
    score: "CGPA: 8.34"
  }
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
    items: ["Python", "C++", "SQL", "Java", "Vector DBs (FAISS/Chroma)"]
  },
  {
    category: "AI & GenAI",
    items: ["LangChain", "RAG", "TensorFlow", "PyTorch", "DeepSeek API", "OpenCV"]
  },
  {
    category: "Frameworks",
    items: ["FastAPI", "Flask", "React", "Streamlit", "Scikit-learn"]
  },
  {
    category: "Cloud & MLOps",
    items: ["AWS (EC2, S3, Lambda)", "Docker", "Hugging Face", "Vercel", "Azure"]
  }
];