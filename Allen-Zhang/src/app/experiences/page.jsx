import { profile } from "../../data/profile";
import Experiences from "../../views/Experiences/Experiences";
import { pageMetadata } from "../siteConfig";

export const metadata = pageMetadata(
  "Experiences",
  `Explore ${profile.name}’s engineering experience at Apple, Shopify, and more. ${profile.role.status === "incoming" ? "Incoming " : ""}${profile.role.title} at ${profile.role.company}.`,
  "/experiences/",
);

export default function Page() {
  return <Experiences />;
}
