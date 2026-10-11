// Shared personal details used by the pages, contact links, and metadata.
export const profile = {
  name: "Allen Zhang",
  email: "allen.zhang.y05@gmail.com",
  role: {
    title: "Software Engineer Intern",
    company: "Rippling",
    companyUrl: "https://www.rippling.com/",
    status: "incoming",
    location: "San Francisco, CA",
    period: "Jan 2027 - Apr 2027",
    team: "Device Management AI Team",
  },
  education: "Computer Engineering student at the University of Waterloo",
  availability: "Summer or Fall 2027",
  socials: {
    linkedin: "https://www.linkedin.com/in/allenzhang-05-/",
    instagram: "https://www.instagram.com/allenz05/",
    github: "https://github.com/AllenZ05",
  },
};

export const roleLabel = `${profile.role.status === "incoming" ? "Incoming " : ""}${profile.role.title} at ${profile.role.company}`;
export const emailHref = `mailto:${profile.email}`;
