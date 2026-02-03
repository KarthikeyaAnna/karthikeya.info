import React, { useState, useEffect, useRef } from 'react';
import './Typewriter.css';

const Typewriter = ({ text, isLast = false }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const intervalRef = useRef(null);

    useEffect(() => {
        // Start typing immediately
        let i = 0;
        intervalRef.current = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.substring(0, i + 1));
                i++;
            } else {
                setIsTyping(false);
                clearInterval(intervalRef.current);
            }
        }, 40);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [text]);

    // Show cursor while typing, or if this is the last line (persistent blinking)
    const showCursor = isTyping || isLast;

    return (
        <p className="typewriter-text">
            {displayedText}
            {showCursor && <span className={`typing-cursor ${!isTyping ? 'blink' : ''}`}>▌</span>}
        </p>
    );
};

export default Typewriter;
