export default function Hero() {
    return (
        <section className="hero">
            <div className="container hero-content">
                <div className="hero-text">
                    <h1 className="hero-title">
                        Engineering the Future with <span className="highlight2">AI</span> <span className="highlight">+ Scalable Software</span>
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
                </div>
            </div>
        </section>
    );
}
