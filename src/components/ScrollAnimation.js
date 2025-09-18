import React, { useEffect, useRef, useState } from 'react';
import './ScrollAnimation.css';

const ScrollAnimation = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(elementRef.current);
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={elementRef}
            className={`scroll-animation ${isVisible ? 'is-visible' : ''}`}
        >
            {children}
        </div>
    );
};

export default ScrollAnimation;
