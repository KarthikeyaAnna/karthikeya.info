import React, { useState, useEffect, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // DIRECT DOM UPDATE for minimal latency
        // Bypassing React state and RAF loops ensures the cursor updates
        // in the same macro-task as the mouse event, critical for high-hz displays.
        const onMouseMove = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
            }
        };

        const onMouseOver = (e) => {
            if (e.target.tagName === 'A' ||
                e.target.tagName === 'BUTTON' ||
                e.target.closest('.project-card') ||
                e.target.closest('.theme-btn') ||
                e.target.closest('a')) {
                setIsHovering(true);
            }
        };

        const onMouseOut = (e) => {
            if (e.target.tagName === 'A' ||
                e.target.tagName === 'BUTTON' ||
                e.target.closest('.project-card') ||
                e.target.closest('.theme-btn') ||
                e.target.closest('a')) {
                setIsHovering(false);
            }
        };

        // Use 'capture' phase for mousemove to ensure we get it ASAP
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseout', onMouseOut);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseout', onMouseOut);
        };
    }, []);

    const cursorClasses = `custom-cursor ${isHovering ? 'hover' : ''}`;

    return (
        <div
            ref={cursorRef}
            className={cursorClasses}
            style={{ opacity: 1 }}
        >
            <div className="cursor-inner"></div>
        </div>
    );
};

export default CustomCursor;
