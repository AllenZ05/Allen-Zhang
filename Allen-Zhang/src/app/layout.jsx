import "./globals.css";
import Script from "next/script";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import Providers from "./providers";
import ClientLayout from "./ClientLayout";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, OG_IMAGE, SOCIALS } from "./siteConfig";

export const metadata = {
  title: {
    default: SITE_NAME,
    template: "%s | AZ05",
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        alt: `${SITE_NAME} - Personal Website`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
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
    jobTitle: "Computer Engineering Student",
  };

  return (
    <html lang="en" data-theme="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(() => {
            try {
              const savedTheme = localStorage.getItem("theme");
              const theme = savedTheme || "dark";
              document.documentElement.setAttribute("data-theme", theme);
              document.documentElement.style.colorScheme = theme;
            } catch {
              // ignore
            }
          })();`}
        </Script>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FESWP1E6XM"
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} 
          gtag('js', new Date());
          gtag('config', 'G-FESWP1E6XM');`}
        </Script>
        <Script id="json-ld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(jsonLd)}
        </Script>

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
