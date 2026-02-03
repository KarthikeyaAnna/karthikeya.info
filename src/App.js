import React, { useEffect, useMemo } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Projects from './components/Projects';
import CustomCursor from './components/CustomCursor';
import ScrollAnimation from './components/ScrollAnimation';
import About from './components/About';
import Footer from './components/Footer';
import CRTEffects from './components/CRTEffects';

// Helper to convert hex to rgb string "r, g, b" - defined once, reused
const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
};

const App = () => {
    // Fixed settings - green theme, default CRT effects, no curvature
    const settings = useMemo(() => ({
        curvature: 0, // Curvature disabled
        scanlines: 0.25,
        bloom: 0.40,
        noise: 0.10,
        flicker: 0.05,
        vignette: 0.3,
        imageIntensity: 1.0,
        brightness: 1.0,
        glowingLine: 0.15,
        trueCurve: false // Curvature disabled
    }), []);

    // Green theme colors (fixed, no theme switching)
    const greenTheme = useMemo(() => ({
        primary: '#00ff66',
        secondary: '#00cc52',
        glow: 'rgba(0, 255, 102, 0.6)'
    }), []);

    // Apply green theme colors to CSS variables
    useEffect(() => {
        const root = document.documentElement;

        root.style.setProperty('--crt-primary', greenTheme.primary);
        root.style.setProperty('--crt-secondary', greenTheme.secondary);
        root.style.setProperty('--crt-glow', greenTheme.glow);
        root.style.setProperty('--crt-accent', greenTheme.primary);
        root.style.setProperty('--crt-bg', '#000');
        root.style.setProperty('--crt-primary-rgb', hexToRgb(greenTheme.primary));
        root.style.setProperty('--crt-secondary-rgb', hexToRgb(greenTheme.secondary));
    }, [greenTheme]);

    // Calculate font color array for WebGL
    const fontColorArray = useMemo(() => {
        const hex = greenTheme.primary;
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        return [r, g, b];
    }, [greenTheme]);

    // Combine font color into settings object passed to CRTEffects
    const crtSettings = useMemo(() => ({
        ...settings,
        fontColor: fontColorArray
    }), [settings, fontColorArray]);

    return (
        <div className="App">
            <CRTEffects settings={crtSettings} />
            {/* Main content container - no curvature filter */}
            <div className="crt-content-container" style={{
                width: '100%',
                height: '100vh',
                position: 'relative',
                overflow: 'hidden',
                transform: 'translateZ(0)'
            }}>
                <Header />

                {/* Scrollable area for the main content */}
                <div className="crt-scroll-content" style={{
                    height: '100%',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    scrollbarWidth: 'none',
                    paddingTop: '80px',
                    transform: 'translateZ(0)',
                    willChange: 'scroll-position'
                }}>
                    <main>
                        <Home />
                        <ScrollAnimation>
                            <About />
                        </ScrollAnimation>
                        <ScrollAnimation>
                            <Projects />
                        </ScrollAnimation>
                        <Footer />
                    </main>
                </div>
            </div>

            <CustomCursor />
        </div>
    );
};

export default App;
