import { profile } from "./profile";

// Experience content for the Experiences page. Add new roles at the top.
// `description` may contain JSX (links are styled by the page's CSS).
// Optional `status`: "current" or "incoming" renders a badge.
// `logo` is a square image in public/experiences/ (sources for edited logos are in assets/experience-logos/).
// Omit `location` or `description` until those details are available.

export const experiences = [
  {
    id: 7,
    position: profile.role.title,
    company: profile.role.company,
    location: profile.role.location,
    period: profile.role.period,
    description: profile.role.team,
    skills: [],
    url: profile.role.companyUrl,
    logo: "/experiences/rippling.jpeg",
    gradient: "linear-gradient(180deg, #fdb71c 0%, #7a005d 100%)",
    status: profile.role.status,
  },
  {
    id: 0,
    position: "Software Engineer Intern",
    company: "Apple",
    location: "Cupertino, CA",
    period: "May 2026 - Aug 2026",
    description: "Device Compute Team",
    skills: ["Python", "Go", "Swift", "AI", "AI Agents"],
    url: "https://www.apple.com/",
    logo: "/experiences/apple.webp",
    gradient: "linear-gradient(135deg, #a1a1aa 0%, #27272a 100%)",
  },
  {
    id: 1,
    position: "Software Engineer Intern",
    company: "Shopify",
    location: "Toronto, ON",
    period: "Sep 2025 - Dec 2025",
    description: (
      <>
        Shipped products and features for millions of merchants and shoppers worldwide on Shopify&apos;s{" "}
        <a href="https://shop.com/" target="_blank" rel="noopener noreferrer">
          Shop Team
        </a>
        .
      </>
    ),
    skills: ["Ruby", "Ruby on Rails", "React Native", "GraphQL", "Google Cloud Platform", "Apache Kafka", "Grafana"],
    url: "https://www.shopify.com/",
    logo: "/experiences/shopify.webp",
    gradient: "linear-gradient(135deg, #5bf02eff 0%, #024c28ff 100%)",
  },
  {
    id: 2,
    position: "Software Developer Intern",
    company: "Hanov Solutions",
    location: "Waterloo, ON",
    period: "Jan 2025 - Apr 2025",
    description:
      "Delivered full-stack solutions by modernizing systems while developing new features, including AI-driven tools.",
    skills: ["TypeScript", "Go", "Python", "Vue.js", "SQL"],
    url: "https://www.linkedin.com/company/hanov-solutions-inc./",
    logo: "/experiences/websequencediagrams.svg",
    gradient: "linear-gradient(135deg, #937decff 0%, #6a11cb 100%)",
  },
  {
    id: 3,
    position: "Software Developer Intern",
    company: "Dandelion Networks",
    location: "Toronto, ON",
    period: "May 2024 - Aug 2024",
    description:
      "Led end-to-end blockchain app development across frontend, backend, and database, streamlining workflows and improving reliability.",
    skills: ["Go", "Nuxt.js", "Vue.js", "TypeScript", "SQL"],
    // The company site is offline, so the link opens this site's 404 page.
    url: "/404/",
    logo: "/experiences/dandelion-networks.webp",
    gradient: "linear-gradient(180deg, #de975aff 0%, #121f80ff 100%)",
  },
  {
    id: 5,
    position: "Lifeguard and Swim Instructor",
    company: "City of Toronto",
    location: "Toronto, ON",
    period: "Mar 2022 - Sep 2023",
    description: "Lifeguarded pools and waterparks across Toronto and taught swimming lessons to children ages 5-14.",
    skills: ["Leadership", "Teamwork", "Communication", "First Aid + CPR", "Public Relations"],
    url: "https://www.toronto.ca/",
    logo: "/experiences/city-of-toronto.webp",
    gradient: "linear-gradient(135deg, #d8b0b0ff 0%, #e95a5dff 100%)",
  },
  {
    id: 6,
    position: "Data Analyst and Logistics Operator",
    company: "Somerville Merchandising",
    location: "Toronto, ON",
    period: "Sep 2021 - Feb 2022",
    description:
      "Analyzed company and business data while coordinating logistics operations, including shipment planning and delivery handling.",
    skills: ["Microsoft Office", "Data Analysis", "Data Entry", "Logistics Management", "Inventory Control"],
    url: "https://experiencesomerville.com/",
    logo: "/experiences/somerville.webp",
    gradient: "linear-gradient(135deg, #708dc0ff 0%, #16346aff 100%)",
  },
];

// Design team roles, shown as cards below the work timeline. Optional `status`: "current" renders a badge.
export const designTeams = [
  {
    id: 0,
    position: "Technical Lead",
    name: "UW Blueprint",
    description: "Leading engineering delivery for nonprofit projects across North America.",
    url: "https://uwblueprint.org/",
    logo: "/experiences/blueprint.jpeg",
    gradient: "linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%)",
    status: "current",
  },
  {
    id: 1,
    position: "Software Developer",
    name: "UW Formula Electric",
    description: "Built embedded systems and dashboards for electric race cars.",
    url: "https://www.uwfsae.ca/",
    logo: "/experiences/uwfe.webp",
    gradient: "linear-gradient(180deg, #f6d567ff 0%, #79580cff 100%)",
  },
  {
    id: 2,
    position: "Software Developer",
    name: "WATonomous",
    description: "Developed software for autonomous vehicles and self-driving systems.",
    url: "https://www.watonomous.ca/",
    logo: "/experiences/wato.jpeg",
    gradient: "linear-gradient(135deg, #22d3ee 0%, #0f2a4a 100%)",
  },
];
