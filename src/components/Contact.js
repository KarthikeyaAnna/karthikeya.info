import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="contact-section">
            <div className="section-title">
                <h2>03. Contact</h2>
                <div className="title-line"></div>
            </div>
            <div className="contact-content">
                <p>My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
                <a href="mailto:karthikeyaannavarjula@gmail.com" className="email-link">
                    Say Hello
                </a>
            </div>
        </section>
    );
}

export default Contact;
