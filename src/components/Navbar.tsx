"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Left Section: Sunburst Icon & Logo */}
        <Link href="/" className={styles.brand} aria-label="RECNOS home">
          <span className={styles.brandIcon}>
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="3.5" fill="currentColor" />
              <path d="M12 2v2.5" />
              <path d="M12 19.5V22" />
              <path d="M4.93 4.93l1.77 1.77" />
              <path d="M17.3 17.3l1.77 1.77" />
              <path d="M2 12h2.5" />
              <path d="M19.5 12H22" />
              <path d="M4.93 19.07l1.77-1.77" />
              <path d="M17.3 6.7l1.77-1.77" />
            </svg>
          </span>
          <span className={styles.brandName}>RECNOS</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <div className={styles.productMenu}>
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
              <div
                onMouseLeave={() => setProductsOpen(false)}
                className={styles.dropdown}
              >
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
