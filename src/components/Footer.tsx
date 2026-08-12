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
            Engineering the future of AI website generation, high-performance distributed systems, and enterprise digital solutions.
          </p>
        </div>

        {/* Links Column 1: Product */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Product</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li>
              <Link href="/#services" className="hover:text-white transition-colors">
                AI Engine
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-white transition-colors">
                Templates
              </Link>
            </li>
            <li>
              <Link href="/#services" className="hover:text-white transition-colors">
                SEO & AEO
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-white transition-colors">
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        {/* Links Column 2: Company */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li>
              <Link href="/portfolio" className="hover:text-white transition-colors">
                Customer Stories
              </Link>
            </li>
            <li>
              <Link href="/#services" className="hover:text-white transition-colors">
                Resources
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-white transition-colors">
                Book A Demo
              </Link>
            </li>
          </ul>
        </div>

        {/* Links Column 3: Connect */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Contact</h4>
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
          Design at the speed of thought.
        </p>
      </div>
    </footer>
  );
}
