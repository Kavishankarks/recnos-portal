"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Scroll3DScene from "@/components/Scroll3DScene";

/** Consoles and the docs bring their own chrome: no 3D background, navbar or footer. */
const BARE_PREFIXES = ["/superadmin", "/dashboard", "/docs"];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (BARE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return <main>{children}</main>;
  }
  return (
    <>
      <Scroll3DScene />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  );
}
