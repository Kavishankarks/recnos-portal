import type { Metadata } from "next";

/**
 * `/portfolio/page.tsx` renders a client component, so metadata declared there
 * was emitted by React into the body rather than into `<head>`. That still
 * "worked" for the browser, but crawlers reading the static HTML saw a page
 * with no canonical and no social tags. Declaring it in a server layout puts it
 * back in the head where it belongs.
 */
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

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
