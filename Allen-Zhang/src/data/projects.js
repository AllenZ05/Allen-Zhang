// Project content for the Projects page. Add new projects here — no component changes needed.
// `image` is a small thumbnail; `preview` optionally points to the full-size original.
// Link `type` must be one of: "website", "repository", "demo".

export const projects = [
  {
    id: 0,
    title: "TimeCoPilot",
    techStack: "AWS, Next.js, TypeScript, Tailwind CSS, NoSQL, Cloudflare, Stripe",
    description:
      "An AI-powered workspace bringing calendars, goals, tasks, and notes together to help plan your day and keep track of what matters.",
    gradient: "linear-gradient(135deg, #7f7fd5 0%, #86a8e7 50%, #91eae4 100%)",
    image: "/projects/timecopilot-thumb.webp",
    preview: "/projects/timecopilot.webp",
    links: [{ type: "website", url: "https://www.timecopilot.app/", label: "Website" }],
  },
  {
    id: 1,
    title: "HockeyLensPro",
    techStack: "Next.js, React.js, TypeScript, Tailwind CSS, Supabase, NHL API",
    description:
      "An NHL dashboard for exploring player and team statistics, visualizing performance, and comparing careers using NHL API data.",
    gradient: "linear-gradient(135deg, #4b1e82 0%, #994897ff 100%)",
    image: "/projects/hockeylenspro-thumb.webp",
    preview: "/projects/hockeylenspro.webp",
    links: [{ type: "website", url: "https://hockeylenspro.vercel.app/", label: "Website" }],
  },
  {
    id: 2,
    title: "Personal Website",
    techStack: "Next.js, React.js, JavaScript, HTML, CSS",
    description:
      "A responsive personal website showcasing a bit about me, my experiences, and projects I've worked on. You're on it right now!",
    gradient: "linear-gradient(135deg, #0a5af9ff 0%, #3b82f6 50%, #60a5fa 100%)",
    image: "/projects/personal-website-thumb.webp",
    preview: "/projects/personal-website-preview.webp",
    imageAlt: "Allen Zhang’s homepage with a typing introduction and social links",
    links: [{ type: "repository", url: "https://github.com/AllenZ05/Allen-Zhang", label: "Repository" }],
  },
  {
    id: 3,
    title: "Fall Detection Device",
    techStack: "C, C++, STM32, Accelerometer, GSM Module",
    description:
      "Wearable IoT device using STM32 + accelerometer to detect falls and send GSM alerts to emergency contacts.",
    gradient: "linear-gradient(135deg, #f53346ff 0%, #f68f7dff 100%)",
    image: "/projects/fall-detection-diagram.svg",
    imageAlt:
      "Fall detection system: an accelerometer feeds an STM32 microcontroller, which sends alerts through a GSM module to emergency contacts",
    links: [{ type: "repository", url: "https://github.com/AllenZ05/Fall-Detection-Device", label: "Repository" }],
  },
  {
    id: 4,
    title: "Minesweeper",
    techStack: "C++",
    description:
      "A Waterloo-themed twist on Minesweeper; avoid the geese while clearing the board in this classic game remake.",
    gradient: "linear-gradient(135deg, #232323ff 0%, #e52d27 100%)",
    image: "/projects/minesweeper-thumb.webp",
    preview: "/projects/minesweeper.jpg",
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
    image: "/projects/snake-thumb.webp",
    preview: "/projects/snake.jpg",
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
    image: "/projects/movie-website-thumb.webp",
    preview: "/projects/movie-website.webp",
    links: [
      { type: "website", url: "https://cs12-summative.web.app/", label: "Website" },
      { type: "repository", url: "https://github.com/AllenZ05/Movie-Project", label: "Repository" },
    ],
  },
];
