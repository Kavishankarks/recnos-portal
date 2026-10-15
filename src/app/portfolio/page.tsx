import type { Metadata } from "next";
import PortfolioProjects from "./[slug]/page";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Case studies from RECNOS: AI-native creator platforms, real-time marketplaces, digital signage networks, and industrial training systems we built and scaled.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    type: "website",
    url: "https://recnos.com/portfolio",
    siteName: "RECNOS",
    title: "Portfolio | RECNOS",
    description:
      "Case studies from RECNOS: AI-native creator platforms, real-time marketplaces, digital signage networks, and industrial training systems we built and scaled.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RECNOS — AI and scalable software engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | RECNOS",
    description:
      "Case studies from RECNOS: AI-native creator platforms, real-time marketplaces, digital signage networks, and industrial training systems.",
    images: ["/og.png"],
  },
};

const caseStudiesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://recnos.com/portfolio#casestudies",
  name: "RECNOS client case studies",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Rolit AI - Making Content Creation Truly AI-Native",
      url: "https://rolit.ai/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "PG Marketplace Engine",
      url: "https://trovare.in/",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Mr. Ads - In-Restaurant Digital Signage Network",
      url: "https://mr-ads.in/",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Synapse - Industrial Training Platform",
      url: "https://synapse.recnos.com/",
    },
  ],
};

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudiesJsonLd) }}
      />
      <PortfolioProjects />
    </>
  );
}
