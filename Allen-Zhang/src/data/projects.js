// Project content for the Projects page. Add new projects here — no component changes needed.
// `image` is a path under /public (cover screenshot); omit it to fall back to the gradient.
// Link `type` must be one of: "website", "repository", "demo".

export const projects = [
  {
    id: 0,
    title: "TimeCoPilot",
    techStack: "AWS, Next.js, TypeScript, Tailwind CSS, NoSQL, Cloudflare, Stripe",
    status: "In development",
    description:
      "The ultimate productivity platform that unifies your calendars, goals, tasks, and notes in an AI-powered context-aware workspace, proactively helping you plan and execute what matters most.",
    gradient: "linear-gradient(135deg, #7f7fd5 0%, #86a8e7 50%, #91eae4 100%)",
    image: "/projects/timecopilot.jpg",
    links: [{ type: "website", url: "https://www.timecopilot.app/", label: "Website" }],
  },
  {
    id: 1,
    title: "HockeyLensPro",
    techStack: "Next.js, React.js, TypeScript, Tailwind CSS, Supabase, NHL API",
    status: "In development",
    description: "Beautiful NHL stats, charts, and comparisons.",
    gradient: "linear-gradient(135deg, #4b1e82 0%, #994897ff 100%)",
    image: "/projects/hockeylenspro.jpg",
    links: [{ type: "website", url: "https://hockeylenspro.vercel.app/", label: "Website" }],
  },
  {
    id: 2,
    title: "Personal Website",
    techStack: "Next.js, React.js, JavaScript, HTML, CSS",
    description:
      "A responsive personal website showcasing a bit about me, my experiences, and projects I've worked on. You're on it right now!",
    gradient: "linear-gradient(135deg, #0a5af9ff 0%, #3b82f6 50%, #60a5fa 100%)",
    image: "/projects/personal-website.png",
    links: [{ type: "repository", url: "https://github.com/AllenZ05/Allen-Zhang", label: "Repository" }],
  },
  {
    id: 3,
    title: "Fall Detection Device",
    techStack: "C, C++, STM32, Accelerometer, GSM Module",
    description:
      "Wearable IoT device using STM32 + accelerometer to detect falls and send GSM alerts to emergency contacts.",
    gradient: "linear-gradient(135deg, #f53346ff 0%, #f68f7dff 100%)",
    image: "/projects/fall-detection-device.jpg",
    links: [{ type: "repository", url: "https://github.com/AllenZ05/Fall-Detection-Device", label: "Repository" }],
  },
  {
    id: 4,
    title: "Minesweeper",
    techStack: "C++",
    description:
      "A Waterloo-themed twist on Minesweeper; avoid the geese while clearing the board in this classic game remake.",
    gradient: "linear-gradient(135deg, #232323ff 0%, #e52d27 100%)",
    image: "/projects/minesweeper.jpg",
    links: [
      {
        type: "demo",
        url: "https://github.com/user-attachments/assets/abed9941-ae4a-4830-8f50-09bf21d47cab",
        label: "Demo",
      },
      { type: "repository", url: "https://github.com/AllenZ05/Minesweeper", label: "Repository" },
    ],
  },
  {
    id: 5,
    title: "Snake",
    techStack: "Python, Pygame",
    description: "Classical Snake in Pygame with smooth controls, animations, sound effects, and score tracking.",
    gradient: "linear-gradient(135deg, #0b6439ff 0%, #40ee6eff 100%)",
    image: "/projects/snake.jpg",
    links: [
      {
        type: "demo",
        url: "https://github.com/user-attachments/assets/ace73ade-3ee0-4d42-868a-ffef13b5f889",
        label: "Demo",
      },
      { type: "repository", url: "https://github.com/AllenZ05/Python-Games", label: "Repository" },
    ],
  },
  {
    id: 6,
    title: "Movie Website",
    techStack: "Vue.js, JavaScript, CSS, HTML, Firebase, Postman, TMDb API",
    description:
      "Movie discovery site with TMDB API search, detailed movie info, user auth, watchlists, and favourites using Vue.js and Firebase.",
    gradient: "linear-gradient(135deg, #2f3d4dff 0%, #42b883 100%)",
    image: "/projects/movie-website.jpg",
    links: [
      { type: "website", url: "https://cs12-summative.web.app/", label: "Website" },
      { type: "repository", url: "https://github.com/AllenZ05/Movie-Project", label: "Repository" },
    ],
  },
];
