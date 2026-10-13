import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import BackToTop from "../components/BackToTop";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { roleLabel } from "../data/profile";
import ClientLayout from "./ClientLayout";
import Providers from "./providers";
import { pageMetadata, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIALS } from "./siteConfig";

export const metadata = {
  title: {
    default: SITE_NAME,
    template: "%s | AZ05",
  },
  metadataBase: new URL(SITE_URL),
  ...pageMetadata(null, SITE_DESCRIPTION, "/"),
  icons: {
    icon: [
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon_io/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/favicon_io/site.webmanifest",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    sameAs: SOCIALS,
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "University of Waterloo",
      url: "https://uwaterloo.ca/",
    },
    jobTitle: roleLabel,
  };

  return (
    <html
      lang="en"
      data-theme="dark"
      style={{ colorScheme: "dark" }}
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(() => {
            try {
              const savedTheme = localStorage.getItem("theme");
              const theme = savedTheme === "light" ? "light" : "dark";
              document.documentElement.setAttribute("data-theme", theme);
              document.documentElement.style.colorScheme = theme;
            } catch {
              // ignore
            }
          })();`}
        </Script>

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-FESWP1E6XM" strategy="afterInteractive" />
        <Script id="ga" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} 
          gtag('js', new Date());
          gtag('config', 'G-FESWP1E6XM');`}
        </Script>
        {/* Structured data is not executable, so it belongs in the static HTML rather than next/script. */}
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON with "<" escaped, per Next.js JSON-LD guidance.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />

        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Providers>
          <Navbar />
          <ClientLayout>{children}</ClientLayout>
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
