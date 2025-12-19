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
            <div className="glitch-container" data-text={name}>
                {text}
                <span className="glitch-cursor">_</span>
            </div>
            <p className="subtitle">A Developer Exploring the Digital Frontier.</p>
        </section>
    );
}

export default Home;
