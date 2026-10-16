import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#000000] text-white border-t border-white/10 py-16 px-6 font-instrument-sans relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <Link href="/" className="flex items-center text-white group">
            <Image
              src="/logo.svg"
              alt="RECNOS"
              width={926}
              height={200}
              className="h-7 w-auto"
            />
          </Link>
          <p className="text-white/60 text-sm max-w-sm leading-relaxed">
            An engineering studio building AI products, distributed systems, and the platforms enterprises run on.
          </p>
        </div>

        {/* Links Column 1: Services */}
        <div className="md:col-span-2 space-y-3">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Services</h2>
          <ul className="space-y-2 text-sm text-white/60">
            <li>
              <Link href="/services/ai-foundation-models" className="hover:text-white transition-colors">
                AI Engineering
              </Link>
            </li>
            <li>
              <Link href="/services/distributed-systems" className="hover:text-white transition-colors">
                Distributed Systems
              </Link>
            </li>
            <li>
              <Link href="/services/seo-aeo" className="hover:text-white transition-colors">
                SEO &amp; AEO
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white transition-colors">
                All services
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-white transition-colors">
                Portfolio
              </Link>
            </li>
          </ul>
        </div>

        {/* Links Column 2: Company */}
        <div className="md:col-span-2 space-y-3">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h2>
          <ul className="space-y-2 text-sm text-white/60">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white transition-colors">
                Capabilities
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition-colors">
                Engineering Notes
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Book A Call
              </Link>
            </li>
          </ul>
        </div>

        {/* Links Column 3: Connect */}
        <div className="md:col-span-3 space-y-3">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Contact</h2>
          <ul className="space-y-2 text-sm text-white/60">
            <li>
              <a href="mailto:dev@recnos.com" className="hover:text-white transition-colors">
                dev@recnos.com
              </a>
            </li>
            <li>
              <a href="tel:+917892883611" className="hover:text-white transition-colors">
                +91 7892883611
              </a>
            </li>
            <li className="pt-2 text-xs text-white/40">
              Bengaluru, Karnataka, India
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
        <p>&copy; {new Date().getFullYear()} RECNOS Inc. All rights reserved.</p>
        <p className="font-instrument-serif text-sm text-white/60">
          Engineering, end to end.
        </p>
      </div>
    </footer>
  );
}
