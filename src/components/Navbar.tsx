import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link href="/" className="logo">
                    RECNOS
                </Link>
                <div className="nav-links">
                    <Link href="/" className="nav-link">Home</Link>
                    <Link href="/portfolio" className="nav-link">Portfolio</Link>
                    <a href="#services" className="nav-link">Services</a>
                    <a href="#contact" className="btn btn-primary">Build with Us</a>
                </div>
            </div>
        </nav>
    );
}
