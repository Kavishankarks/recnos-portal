import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowLeft } from "lucide-react";

/**
 * Explicit 404 route.
 *
 * Without this file Next renders its built-in "not found" fallback, which
 * injects its own inline stylesheet (`body{color:#000;background:#fff}`) after
 * the app's CSS. That rule wins over `bg-black` on `<body>`, so on any machine
 * whose OS is not set to dark mode the 3D background canvas sat on a white
 * page and the wireframe scene read as washed out and broken.
 *
 * Owning the route means the page is rendered through the root layout like
 * every other page: the black background from globals.css applies, SiteChrome
 * keeps the navbar, footer and Scroll3DScene, and the copy matches the rest of
 * the site instead of Next's stock sentence.
 */
export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you were looking for does not exist on recnos.com. Browse the services, case studies and engineering notes instead.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-8">
      {/* The 3D scene is fixed behind the layout, so the copy sits on a soft
          vignette: the wireframe knot passes directly through this area and
          the text is unreadable against it without the backing. */}
      <div className="max-w-2xl text-center rounded-3xl bg-black/70 px-6 py-10 backdrop-blur-sm sm:px-12 sm:py-14">
        <p className="font-instrument-serif text-6xl sm:text-8xl tracking-tight text-white">
          404
        </p>

        <h1 className="mt-4 font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          This page could not be found
        </h1>

        <p className="mt-4 font-sans text-base leading-relaxed text-white/65">
          The URL may have changed, or the page may never have existed. The work
          is still here — start from the services, the case studies, or the
          engineering notes.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#3054ff] hover:bg-[#2040e0] text-white font-sans text-sm font-semibold transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to home
          </Link>

          <Link
            href="/services"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/5 hover:bg-[#3054ff]/15 border border-white/15 hover:border-[#3054ff]/50 text-white font-sans text-sm font-semibold transition-all duration-300"
          >
            Browse services
            <ArrowRight className="w-4 h-4 text-[#3054ff] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
