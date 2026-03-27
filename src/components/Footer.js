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
                </div>
                <div className="footer-text">
                    <p>© 2026 Sri Karthikeya Annavarjula</p>
                </div>
            </div>
        </footer>
    );
}

export default React.memo(Footer);
