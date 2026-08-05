import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <Image className="footer-logo" src="/logo.svg" alt="Recnos" width={150} height={44} />
                        <p>Engineering the Future with AI + Scalable Software</p>
                    </div>
                    <div className="footer-links">
                        <div className="link-group">
                            <h4>Company</h4>
                            <a href="#">About</a>
                            <a href="#">Careers</a>
                            <a href="mailto:dev@recnos.com">Contact</a>
                        </div>
                        <div className="link-group">
                            <h4>Services</h4>
                            <a href="#">AI Engineering</a>
                            <a href="#">Cloud Platforms</a>
                            <a href="#">DevOps</a>
                            <a href="#">SEO & AEO</a>
                            <a href="#">Figma Design</a>
                            <a href="#">Marketing</a>
                            <a href="#">Daily Content & Video</a>
                        </div>
                        <div className="link-group">
                            <h4>Connect</h4>
                            <a href="#">LinkedIn</a>
                            <a href="#">Twitter</a>
                            <a href="#">GitHub</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} RECNOS. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
