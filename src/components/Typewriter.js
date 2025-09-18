import React, { useState, useEffect, useRef } from 'react';
import './Typewriter.css';

const Typewriter = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const elementRef = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        };

        const callback = (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                let i = 0;
                const interval = setInterval(() => {
                    if (i < text.length) {
                        setDisplayedText(text.substring(0, i + 1));
                        i++;
                    } else {
                        setIsTyping(false);
                        clearInterval(interval);
                    }
                }, 25);
                observerRef.current.disconnect();
            }
        };

        observerRef.current = new IntersectionObserver(callback, options);
        if (elementRef.current) {
            observerRef.current.observe(elementRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [text]);

    return (
        <p ref={elementRef} className="typewriter-text">
            {displayedText}
            {isTyping && <span className="typing-cursor">_</span>}
        </p>
    );
};

export default Typewriter;
