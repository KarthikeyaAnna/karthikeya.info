import React from 'react';
import './About.css';
import Typewriter from './Typewriter';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="section-title">
                <h2>01. About Me</h2>
                <div className="title-line"></div>
            </div>
            <div className="about-content">
                <Typewriter text="Hello! I'm Karthikeya ." />
                <Typewriter text="Currently persuing Btech in Computer Science from IIIT-Delhi" />
                <Typewriter text="I specialize in Large scale Database mangement , Automation , Building Scrapers ." />
            </div>
        </section>
    );
}

export default About;
