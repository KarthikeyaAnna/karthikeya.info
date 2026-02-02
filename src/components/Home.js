import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
    const [text, setText] = useState('');
    const name = 'KARTHIKEYA';

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= name.length) {
                setText(name.substring(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 200);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="home-section">
            <h1 className="glitch-container" data-text={name}>
                {text}
                <span className="glitch-cursor">_</span>
            </h1>
            <p className="subtitle">Software Developer | Exploring the Digital Frontier.</p>
        </section>
    );
}

export default Home;
