import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="social-links">
                    <a href="https://github.com/KarthikeyaAnna" target="_blank" rel="noopener noreferrer" className="social-link">
                        <span className="social-icon">GitHub</span>
                    </a>
                    <a href="https://twitter.com/SriKarthikeyaaa" target="_blank" rel="noopener noreferrer" className="social-link">
                        <span className="social-icon">Twitter</span>
                    </a>
                    <a href="mailto:karthikeyaannavarjula@gmail.com" className="social-link">
                        <span className="social-icon">Email</span>
                    </a>
                    <a href="/resume.pdf" download="Sri_Karthikeya_Resume.pdf" className="social-link resume-link">
                        <span className="social-icon">Resume</span>
                    </a>
                </div>
                <div className="footer-text">
                    <p>© 2026 Sri Karthikeya Annavarjula</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
