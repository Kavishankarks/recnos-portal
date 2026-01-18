"use client";
import { useState, useEffect } from 'react';

export default function Hero() {
    const textOptions = [
        "RECNOS is your end-to-end engineering partner for AI foundation models, distributed systems, and enterprise-grade digital solutions.",
        "Building the next generation of scalable, high-performance software for the AI era.",
        "Transforming complex challenges into elegant, enterprise-grade digital systems.",
        "Expertise in Cloud, AI, and Distributed Computing – delivered with precision."
    ];

    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(50);

    useEffect(() => {
        const i = loopNum % textOptions.length;
        const fullText = textOptions[i];

        const handleTyping = () => {
            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            // Determine typing speed
            setTypingSpeed(isDeleting ? 30 : 50);

            if (!isDeleting && text === fullText) {
                // Finished typing, pause before deleting
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && text === "") {
                // Finished deleting, move to next text
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                setTypingSpeed(500); // Pause before typing new text
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed, textOptions]);

    return (
        <section className="hero">
            <div className="container hero-content">
                <div className="hero-text">
                    <h1 className="hero-title">
                        <span className="anim-left" style={{ display: 'inline-block' }}>Engineering the Future with </span> <span className="highlight2 anim-pop" style={{ display: 'inline-block' }}>AI</span> <span className="highlight anim-right" style={{ display: 'inline-block' }}>+ Scalable Software</span>
                    </h1>
                    <p className="hero-subtitle" style={{ minHeight: '3.2em' }}>
                        {text}<span className="cursor">|</span>
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
