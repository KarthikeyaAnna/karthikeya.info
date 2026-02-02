import React, { useEffect } from 'react';
import './SettingsPanel.css';

const SettingsPanel = ({ settings, onSettingChange, currentTheme, onThemeChange, isOpen, onToggle }) => {
    // Colors for themes
    const themes = [
        { id: 'green', label: 'Green', color: '#00ff66' },
        { id: 'amber', label: 'Amber', color: '#ff8100' },
        { id: 'blue', label: 'Blue', color: '#7fb4ff' },
        { id: 'white', label: 'White', color: '#ffffff' },
        { id: 'cyan', label: 'Cyan', color: '#00ffff' },
        { id: 'magenta', label: 'Magenta', color: '#ff00ff' },
    ];

    const sliders = [
        { id: 'curvature', label: 'Curvature', min: 0, max: 0.5, step: 0.01 },
        { id: 'scanlines', label: 'Scanlines', min: 0, max: 0.5, step: 0.01 },
        { id: 'bloom', label: 'Bloom', min: 0, max: 1.0, step: 0.01 },
        { id: 'noise', label: 'Noise', min: 0, max: 0.5, step: 0.01 },
        { id: 'flicker', label: 'Flicker', min: 0, max: 0.2, step: 0.005 },
        { id: 'vignette', label: 'Vignette', min: 0, max: 0.5, step: 0.01 },
        { id: 'imageIntensity', label: 'Intensity', min: 0.5, max: 1.5, step: 0.05 },
        { id: 'brightness', label: 'Brightness', min: 0.5, max: 1.5, step: 0.05 },
    ];

    // Handle keyboard shortcut 'S'
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key.toLowerCase() === 's' && !e.ctrlKey && !e.metaKey && !e.altKey &&
                e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                onToggle();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onToggle]);

    if (!isOpen) {
        return (
            <button
                className="settings-toggle-btn"
                onClick={onToggle}
                aria-label="Open Settings"
            >
                ⚙
            </button>
        );
    }

    return (
        <div className="settings-panel">
            <div className="settings-header">
                <h2>TERMINAL CONFIGURATION</h2>
                <button className="close-btn" onClick={onToggle}>×</button>
            </div>

            <div className="setting-group" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <label>True Curve (Experimental)</label>
                <input
                    type="checkbox"
                    checked={settings.trueCurve}
                    onChange={(e) => onSettingChange('trueCurve', e.target.checked)}
                    style={{ width: '20px', height: '20px', cursor: 'none' }}
                />
            </div>

            <div className="settings-content">
                <div className="settings-group">
                    <h3>PHOSPHOR COLOR</h3>
                    <div className="theme-grid">
                        {themes.map(theme => (
                            <button
                                key={theme.id}
                                className={`theme-btn-lg ${currentTheme === theme.id ? 'active' : ''}`}
                                onClick={() => onThemeChange(theme.id)}
                                style={{ borderColor: theme.color, color: theme.color }}
                            >
                                <span className="dot" style={{ backgroundColor: theme.color }}></span>
                                {theme.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="settings-group">
                    <h3>DISPLAY PARAMETERS</h3>
                    {sliders.map(slider => (
                        <div key={slider.id} className="range-control">
                            <label htmlFor={slider.id}>
                                {slider.label}
                                <span className="value">{settings[slider.id]?.toFixed(2)}</span>
                            </label>
                            <input
                                type="range"
                                id={slider.id}
                                min={slider.min}
                                max={slider.max}
                                step={slider.step}
                                value={settings[slider.id] || 0}
                                onChange={(e) => onSettingChange(slider.id, parseFloat(e.target.value))}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="settings-footer">
                <p>Use 'S' to toggle visibility</p>
                <div className="status-light success">ONLINE</div>
            </div>
        </div>
    );
};

export default SettingsPanel;
