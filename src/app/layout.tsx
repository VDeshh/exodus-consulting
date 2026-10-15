import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import { MobileCta } from "@/components/ui/MobileCta";
import { site } from "@/lib/site";
import { founders } from "@/content/facts";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap", weight: ["400", "500", "600", "700", "800"] });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap", weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | Exodus Consulting" },
  description: site.description,
  openGraph: { type: "website", locale: "en_CA", siteName: site.name, title: site.title, description: site.description },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0a0b0f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    email: site.email,
    description: site.description,
    areaServed: ["CA", "GB"],
    address: { "@type": "PostalAddress", addressLocality: "Vancouver", addressRegion: "BC", addressCountry: "CA" },
    founder: founders.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.role, email: f.email })),
    sameAs: [site.instagram],
  };
  return (
    <html lang="en-CA" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-paper focus:text-bg-0 focus:px-3 focus:py-2 focus:rounded">
          Skip to content
        </a>
        <SmoothScroll />
        <Cursor />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <MobileCta />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
