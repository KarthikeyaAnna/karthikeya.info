import React, { useState, useEffect } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const onMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const onMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.closest('.project-card')) {
                setIsHovering(true);
            }
        };

        const onMouseOut = (e) => {
            if (e.target.tagName === 'A' || e.target.closest('.project-card')) {
                setIsHovering(false);
            }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseout', onMouseOut);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseout', onMouseOut);
        };
    }, []);

    const cursorClasses = `custom-cursor ${isHovering ? 'hover' : ''}`;

    return (
        <div
            className={cursorClasses}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
        >
            <div className="cursor-inner"></div>
        </div>
    );
};

export default CustomCursor;
