"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const productMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!productsOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!productMenuRef.current?.contains(event.target as Node)) {
        setProductsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [productsOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.brand} aria-label="RECNOS home">
          <Image
            src="/logo.svg"
            alt="RECNOS"
            width={926}
            height={200}
            className={styles.brandLogo}
            priority
          />
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <div
            ref={productMenuRef}
            className={styles.productMenu}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              onMouseEnter={() => setProductsOpen(true)}
              className={styles.productTrigger}
              aria-expanded={productsOpen}
            >
              Products
              <ChevronDown
                className={`${styles.chevron} ${productsOpen ? styles.chevronOpen : ""}`}
                aria-hidden="true"
              />
            </button>

            {/* Dropdown Menu */}
            {productsOpen && (
              <div className={styles.dropdown}>
                <Link
                  href="/#services"
                  className={styles.dropdownLink}
                  onClick={() => setProductsOpen(false)}
                >
                  AI Builder Core
                </Link>
                <Link
                  href="/portfolio"
                  className={styles.dropdownLink}
                  onClick={() => setProductsOpen(false)}
                >
                  Enterprise Templates
                </Link>
                <Link
                  href="/#services"
                  className={styles.dropdownLink}
                  onClick={() => setProductsOpen(false)}
                >
                  SEO & AEO Engine
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/portfolio"
            className={styles.navLink}
          >
            Customer Stories
          </Link>

          <Link
            href="/#services"
            className={styles.navLink}
          >
            Resources
          </Link>

          <Link
            href="/#contact"
            className={styles.navLink}
          >
            Pricing
          </Link>
        </nav>

        {/* Right Section */}
        <div className={styles.actions}>
          {/* Book A Demo link */}
          <Link
            href="/#contact"
            className={styles.demoLink}
          >
            Book A Demo
          </Link>

          {/* Get Started button */}
          <Link
            href="/#contact"
            className={styles.getStarted}
          >
            Get Started
          </Link>

          {/* Mobile menu button toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={styles.menuButton}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav className={styles.mobileMenu} aria-label="Mobile navigation">
          <Link
            href="/#services"
            className={styles.mobileLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/portfolio"
            className={styles.mobileLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Customer Stories
          </Link>
          <Link
            href="/#services"
            className={styles.mobileLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Resources
          </Link>
          <Link
            href="/#contact"
            className={styles.mobileLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/#contact"
            className={styles.mobileLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Book A Demo
          </Link>
        </nav>
      )}
    </header>
  );
}
