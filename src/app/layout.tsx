import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseSparks from "@/components/MouseSparks";

export const metadata: Metadata = {
  title: "RECNOS | AI Website Builder - Build Faster",
  description: "Design at the speed of thought. Create fully functional, SEO-optimized websites in seconds with our advanced AI engine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-black">
      <body className="bg-black text-white font-instrument-sans antialiased min-h-screen selection:bg-[#3054ff] selection:text-white">
        <MouseSparks />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
