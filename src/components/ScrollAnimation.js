import React from 'react';
import './ScrollAnimation.css';

const ScrollAnimation = ({ children }) => {
    // Always visible - no lazy loading
    return (
        <div className="scroll-animation is-visible">
            {children}
        </div>
    );
};

export default ScrollAnimation;
