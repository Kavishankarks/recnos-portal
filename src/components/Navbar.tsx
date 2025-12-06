"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link href="/" className="logo">
                    <Image
                        src="/logo.png"
                        alt="RECNOS"
                        width={40}
                        height={40}
                        className="logo-image"
                        style={{ height: 'auto', width: 'auto' }}
                    />
                    <span style={{ marginLeft: '10px' }}>RECNOS</span>
                </Link>

                <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
                    {isMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    )}
                </button>

                <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <Link href="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link href="/portfolio" className="nav-link" onClick={() => setIsMenuOpen(false)}>Portfolio</Link>
                    <Link href="/#services" className="nav-link" onClick={() => setIsMenuOpen(false)}>Services</Link>
                    <Link href="/#contact" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>Build with Us</Link>
                </div>
            </div>
        </nav>
    );
}
