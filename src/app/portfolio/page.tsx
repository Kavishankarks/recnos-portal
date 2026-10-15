import type { Metadata } from "next";
import PortfolioProjects from "./[slug]/page";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Case studies from RECNOS: AI-native creator platforms, real-time marketplaces, digital signage networks, and industrial training systems we designed, built, and scaled.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    type: "website",
    url: "https://recnos.com/portfolio",
    siteName: "RECNOS",
    title: "Portfolio | RECNOS",
    description:
      "Case studies from RECNOS: AI-native creator platforms, real-time marketplaces, digital signage networks, and industrial training systems we designed, built, and scaled.",
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

export default function PortfolioPage() {
  return <PortfolioProjects />;
}
