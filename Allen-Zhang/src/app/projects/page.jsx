import Projects from "../../views/Projects/Projects";
import { pageMetadata } from "../siteConfig";

export const metadata = pageMetadata(
  "Projects",
  "Explore Allen Zhang’s software and hardware projects, including TimeCoPilot, HockeyLensPro, games, and an STM32 fall detection device.",
  "/projects/",
);

export default function Page() {
  return <Projects />;
}
