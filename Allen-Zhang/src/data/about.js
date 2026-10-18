// Skills and education content for the About page.

export const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "C++", "C#", "C", "Go", "Ruby", "Swift", "SQL/NoSQL", "TypeScript", "JavaScript", "CSS", "HTML"],
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      "Next.js",
      "React.js",
      "React Native",
      "Nuxt.js",
      "Vue.js",
      "Ruby on Rails",
      "GraphQL",
      "Tailwind CSS",
      "PyTorch",
    ],
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    title: "Developer Tools",
    skills: ["Git", "GitHub", "Node.js", "Grafana", "Vite"],
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    title: "Cloud & Services",
    skills: ["Amazon Web Services", "Google Cloud Platform", "Apache Kafka", "Firebase", "Cloudflare", "Stripe"],
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
  {
    title: "Misc",
    skills: ["Figma", "Microsoft Office", "Google Workspace", "Adobe Suite", "Unity"],
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
  {
    title: "Soft Skills",
    skills: ["Leadership", "Teamwork", "Communication", "Creativity", "Problem-Solving"],
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  },
];

// An explicit status distinguishes active/upcoming courses from completed courses.
export const educationYears = [
  {
    year: "Third Year",
    terms: [
      {
        name: "3A (Jan 2026 - Apr 2026)",
        courses: [
          "Communication Systems",
          "Digital Hardware Systems",
          "Real-Time Operating Systems",
          "Analog Control Systems",
          "Customer Experience Design",
          "Research in the Workplace",
        ],
      },
      {
        name: "3B (Sep 2026 - Dec 2026)",
        status: "in-progress",
        courses: [
          "Computer Architecture",
          "Compilers",
          "Database Systems",
          "Software Requirements Specification and Analysis",
          "Earth Science",
          "Environmental Sciences",
        ],
      },
    ],
  },
  {
    year: "Second Year",
    terms: [
      {
        name: "2A (Sep 2024 - Dec 2024)",
        courses: [
          "Algorithms and Data Structures",
          "Advanced Calculus 1",
          "Digital Computers",
          "Numerical Methods",
          "Electronic Circuits",
          "Materials Chemistry",
          "Strategies for Career Success",
        ],
      },
      {
        name: "2B (May 2025 - Aug 2025)",
        courses: [
          "Probability Theory and Statistics 1",
          "Signals and Systems",
          "Discrete Math and Logic 2",
          "Embedded Microprocessor Systems",
          "Systems Programming and Concurrency",
          "Instrumentation and Prototyping Laboratory",
          "Professionalism and Ethics in Engineering",
        ],
      },
    ],
  },
  {
    year: "First Year",
    terms: [
      {
        name: "1A (Sep 2023 - Dec 2023)",
        courses: [
          "Linear Algebra",
          "Calculus 1 & 2",
          "Classical Mechanics",
          "Programming",
          "Project Studio",
          "Engineering Profession and Practice",
          "Communication in Engineering",
        ],
      },
      {
        name: "1B (Jan 2024 - Apr 2024)",
        courses: [
          "Calculus 3",
          "Electricity and Magnetism",
          "Discrete Math and Logic 1",
          "Digital Circuits and Systems",
          "Linear Circuits",
          "Engineering Economics",
          "Tactics for Workplace Success",
        ],
      },
    ],
  },
];
