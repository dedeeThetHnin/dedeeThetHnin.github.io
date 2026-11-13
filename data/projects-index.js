window.PORTFOLIO_DATA = {
  courses: {
    year1: [
      { code: "CMPUT 174", name: "Introduction to the Foundations of Computation I" },
      { code: "CMPUT 175", name: "Introduction to the Foundations of Computation II" },
      { code: "CMPUT 272", name: "Formal Systems and Logic in Computing Science" },
      { code: "MATH 144", name: "Calculus for the Physical Sciences I" },
      { code: "MATH 146", name: "Calculus for the Physical Sciences II" },
      { code: "MATH 125", name: "Linear Algebra I" },
      { code: "MATH 111", name: "Introduction to Discrete Mathematics" },
      { code: "MATH 241", name: "Geometry" },
      { code: "STAT 151", name: "Introduction to Applied Statistics I" },
      { code: "STAT 252", name: "Introduction to Applied Statistics II" },
      { code: "PHIL 120", name: "Symbolic Logic I" },
      { code: "ENGL 130", name: "Academic Writing & Critical Analysis" },
      { code: "WRS 102", name: "Writing in the Disciplines" }
    ],
    year2: [
      { code: "CMPUT 201", name: "Practical Programming Methodology" },
      { code: "CMPUT 204", name: "Algorithms I" },
      { code: "CMPUT 200", name: "Ethics of Data Science and Artificial Intelligence" },
      { code: "CMPUT 291", name: "Introduction to File and Database Management" },
      { code: "CMPUT 301", name: "Introduction to Software Engineering" },
      { code: "PHYS 124", name: "Particles and Waves" },
      { code: "ECON 101", name: "Introduction to Microeconomics" },
      { code: "PSYCH 104", name: "Basic Psychological Processes" },
      { code: "NS 115", name: "Indigenous Peoples and Technoscience" },
      { code: "SPH 200", name: "Introduction to Public Health" }
    ],
    year3: [
      { code: "CMPUT 229", name: "Computer Organization and Architecture I" },
      { code: "CMPUT 267", name: "Basics of Machine Learning" },
      { code: "ECON 102", name: "Introduction to Macroeconomics" },
      { code: "MATH 225", name: "Linear Algebra II" }
    ]
  },
  experiences: [
    {
      role: "Web Developer | ARVP",
      date: "Sep 2026 – Present",
      bullets: [
        "Maintain and improve an existing website by identifying UI/UX issues, inconsistent layouts, broken functionality, and opportunities to improve usability.",
        "Implement frontend updates and feature improvements within an existing codebase while maintaining consistency across website components.",
        "Troubleshoot website issues through testing and iterative debugging to identify problems and validate fixes.",
        "Collaborate with team members to gather requirements, clarify website needs, prioritize improvements, and communicate development progress."
      ]
    },
    {
      role: "Junior Research Assistant | University of Alberta",
      date: "Sep 2026 – Present",
      bullets: [
        "Support PhD and Master's researchers under Professor Alona Fyshe in research exploring applications of Large Language Models (LLMs) in neuroscience.",
        "Process and analyze text datasets using Python to investigate machine learning model behavior and identify performance patterns.",
        "Develop reproducible data-processing workflows for dataset preparation, analysis, and experimental evaluation.",
        "Collaborate with graduate researchers to investigate results, identify patterns, and communicate findings throughout the research process."
      ]
    }
  ],
  skills: {
    "Programming": ["Python", "Java", "C", "SQL"],
    "Web Development": ["React", "TypeScript", "HTML/CSS", "JavaScript (ES6+)"],
    "Databases": ["SQLite", "MongoDB", "Firebase/Firestore"],
    "Development Tools": ["Git", "GitHub", "Android Studio", "VS Code"],
    "Development Practices": ["Agile Development", "Debugging", "Testing", "Requirements Gathering", "Code Collaboration"],
    "Design": ["Figma", "UI/UX Design"],
    "AI & Automation": ["Large Language Models (LLMs)", "Generative AI Tools"]
  },
  hobbies: [
    {
      title: "🍳 Cooking & Culinary Experiments",
      desc: "Exploring Southeast Asian comfort dishes, trying out new recipes from scratch, and plating homemade meals for friends and family after a busy week of classes."
    },
    {
      title: "🎵 Music & Melodies",
      desc: "Curating playlists for deep-focus coding and late-night study sessions, discovering new artists, and blending my love for music with technology (which inspired building Sakura Sonata)."
    }
  ],
  projects: window.PORTFOLIO_PROJECTS || []
};