import Image from 'next/image';

export default function Hero() {
    return (
        <section className="hero">
            <div className="container hero-content">
                <div className="hero-text">
                    <h1 className="hero-title">
                        Engineering the Future with <span className="highlight">AI + Scalable Software</span>
                    </h1>
                    <p className="hero-subtitle">
                        RECNOS is your end-to-end engineering partner for AI foundation models, distributed systems, and enterprise-grade digital solutions.
                    </p>
                    <div className="hero-actions">
                        <a href="#contact" className="btn btn-primary">Get Started</a>
                        <a href="#services" className="btn btn-secondary">Explore Services</a>
                    </div>
                </div>
                <div className="hero-visual">
                    {/* Abstract AI Visual Placeholder */}
                    <div className="visual-circle"></div>
                    <div className="visual-grid"></div>
                    <div style={{ position: 'absolute', zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                        <Image
                            src="/logo.png"
                            alt="Recnos Logo"
                            width={300}
                            height={300}
                            style={{ filter: 'drop-shadow(0 0 20px rgba(255, 153, 51, 0.5))' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
