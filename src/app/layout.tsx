import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Scroll3DScene from "@/components/Scroll3DScene";

export const metadata: Metadata = {
  metadataBase: new URL("https://recnos.com"),
  title: {
    default: "RECNOS | AI & Scalable Software Engineering Studio",
    template: "%s | RECNOS",
  },
  description:
    "RECNOS is an engineering studio building AI foundation models, distributed systems, and SEO-optimized web and mobile platforms for enterprises.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://recnos.com/",
    siteName: "RECNOS",
    title: "RECNOS | AI & Scalable Software Engineering Studio",
    description:
      "RECNOS is an engineering studio building AI foundation models, distributed systems, and SEO-optimized web and mobile platforms for enterprises.",
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
    title: "RECNOS | AI & Scalable Software Engineering Studio",
    description:
      "RECNOS is an engineering studio building AI foundation models, distributed systems, and SEO-optimized web and mobile platforms for enterprises.",
    images: ["/og.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://recnos.com/#organization",
  name: "RECNOS",
  url: "https://recnos.com/",
  logo: "https://recnos.com/logo.svg",
  description:
    "RECNOS is an engineering studio building AI foundation models, distributed systems, and SEO-optimized web and mobile platforms.",
  email: "dev@recnos.com",
  telephone: "+91-7892883611",
  sameAs: ["https://rolit.ai/"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "dev@recnos.com",
      telephone: "+91-7892883611",
      availableLanguage: ["English"],
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://recnos.com/#website",
  name: "RECNOS",
  url: "https://recnos.com/",
  inLanguage: "en",
  dateModified: "2026-10-15",
  publisher: { "@id": "https://recnos.com/#organization" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-black">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
          }}
        />
      </head>
      <body className="bg-black text-white font-instrument-sans antialiased min-h-screen selection:bg-[#3054ff] selection:text-white">
        <Scroll3DScene />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
