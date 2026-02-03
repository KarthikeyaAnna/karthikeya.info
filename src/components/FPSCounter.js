import React, { useEffect, useState, useRef } from 'react';

const FPSCounter = () => {
    const [fps, setFps] = useState(0);
    const frameCount = useRef(0);
    const lastTime = useRef(performance.now());
    const rafId = useRef(null);

    useEffect(() => {
        const calculateFps = (time) => {
            frameCount.current++;
            if (time - lastTime.current >= 1000) {
                setFps(frameCount.current);
                frameCount.current = 0;
                lastTime.current = time;
            }
            rafId.current = requestAnimationFrame(calculateFps);
        };

        rafId.current = requestAnimationFrame(calculateFps);

        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: '#0f0',
            padding: '5px 10px',
            borderRadius: '4px',
            fontFamily: 'monospace',
            zIndex: 9999,
            pointerEvents: 'none',
            fontSize: '14px',
            border: '1px solid #0f0'
        }}>
            FPS: {fps}
        </div>
    );
};

export default FPSCounter;
