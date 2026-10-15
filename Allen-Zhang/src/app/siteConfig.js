import { profile, roleLabel } from "../data/profile";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://allenzhang05.com").replace(/\/$/, "");
export const SITE_NAME = profile.name;
export const SITE_DESCRIPTION = `${profile.name} is an ${roleLabel.charAt(0).toLowerCase() + roleLabel.slice(1)} and a ${profile.education}, seeking ${profile.availability} internships.`;
export const OG_IMAGE = "/social-preview.png";
export const SOCIALS = Object.values(profile.socials);

export function pageMetadata(title, description, path) {
  const url = `${SITE_URL}${path}`;
  const socialTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${roleLabel}, ${profile.education}`,
        },
      ],
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [OG_IMAGE] },
  };
}
