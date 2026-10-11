import About from "../../views/About/About";
import { pageMetadata } from "../siteConfig";

export const metadata = pageMetadata(
  "About",
  "Get to know Allen Zhang: Computer Engineering at the University of Waterloo, education, technical skills, and interests.",
  "/about/",
);

export default function Page() {
  return <About />;
}
