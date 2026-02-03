import React, { useState, useEffect, useRef } from 'react';
import './Home.css';

const Home = () => {
    const [text, setText] = useState('');
    const name = 'KARTHIKEYA';
    const intervalRef = useRef(null);

    useEffect(() => {
        let currentIndex = 0;

        intervalRef.current = setInterval(() => {
            if (currentIndex <= name.length) {
                setText(name.substring(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(intervalRef.current);
            }
        }, 200);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
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

export default React.memo(Home);
