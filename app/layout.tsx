import type { Metadata, Viewport } from "next";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { site } from "./site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.title}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Practical Python automation, browser tools, and internal software for repetitive operational work. Available for freelance projects, contract work, and full-time roles.",
  applicationName: `${site.name} — ${site.title}`,
  keywords: [
    "operations automation developer",
    "Python automation",
    "browser automation",
    "data pipelines",
    "internal tools",
  ],
  openGraph: {
    type: "website",
    siteName: `${site.name} — ${site.title}`,
    title: `${site.name} | ${site.title}`,
    description:
      "Practical Python automation, browser tools, and internal software for repetitive operational work.",
    images: [{ url: "/social/home.png", width: 1200, height: 630, alt: `${site.name} — ${site.title}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.title}`,
    description: "Practical Python automation, browser tools, and internal software for repetitive operational work.",
    images: ["/social/home.png"],
  },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070b12",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  description:
    "Builds Python data pipelines, browser automation, and focused internal tools with practical AI and explicit human review.",
  url: site.url,
  email: `mailto:${site.email}`,
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
