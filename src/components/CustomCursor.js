import React, { useEffect, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        // Disable on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        // DIRECT DOM UPDATE for minimal latency
        // Bypassing React state and RAF loops ensures the cursor updates
        // in the same macro-task as the mouse event, critical for high-hz displays.
        const onMouseMove = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
            }
        };

        // Direct DOM class toggle - no React re-renders!
        const onMouseOver = (e) => {
            if (cursorRef.current && (
                e.target.tagName === 'A' ||
                e.target.tagName === 'BUTTON' ||
                e.target.closest('.project-card') ||
                e.target.closest('.theme-btn') ||
                e.target.closest('a')
            )) {
                cursorRef.current.classList.add('hover');
            }
        };

        const onMouseOut = (e) => {
            if (cursorRef.current && (
                e.target.tagName === 'A' ||
                e.target.tagName === 'BUTTON' ||
                e.target.closest('.project-card') ||
                e.target.closest('.theme-btn') ||
                e.target.closest('a')
            )) {
                cursorRef.current.classList.remove('hover');
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

    return (
        <div
            ref={cursorRef}
            className="custom-cursor"
            style={{ opacity: 1 }}
        >
            <div className="cursor-inner"></div>
        </div>
    );
};

export default CustomCursor;
