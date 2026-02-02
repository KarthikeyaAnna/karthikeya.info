import React, { useEffect, useRef, useCallback } from 'react';
import './CRTEffects.css';

/**
 * CRT Effects Component
 * WebGL shader-based CRT effects for React
 */
const CRTEffects = ({ settings: propSettings }) => {
    const canvasRef = useRef(null);
    const glRef = useRef(null);
    const programRef = useRef(null);
    const animationRef = useRef(null);

    // Store latest settings in a ref to avoid re-creating render loop
    const settingsRef = useRef(propSettings);

    const timeRef = useRef(0);
    const isScrollingRef = useRef(false);
    const effectMultiplierRef = useRef(1.0);
    const scrollTimeoutRef = useRef(null);

    // Update settings ref when props change
    useEffect(() => {
        settingsRef.current = propSettings;
    }, [propSettings]);

    // Vertex shader
    const vertexShaderSource = `
        attribute vec4 a_position;
        attribute vec2 a_texCoord;
        varying vec2 v_texCoord;
        
        void main() {
            gl_Position = a_position;
            v_texCoord = a_texCoord;
        }
    `;

    // Fragment shader with CRT effects
    const fragmentShaderSource = `
        precision highp float;
        
        varying vec2 v_texCoord;
        
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform float u_curvature;
        uniform float u_scanlines;
        uniform float u_bloom;
        uniform float u_noise;
        uniform float u_flicker;
        uniform float u_glowingLine;
        uniform float u_vignette;
        uniform float u_brightness;
        uniform vec3 u_fontColor;
        uniform float u_intensity;
        
        float rand(vec2 co) {
            return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        vec2 distortCoordinates(vec2 coords, float curvature) {
            vec2 cc = coords - 0.5;
            float dist = dot(cc, cc) * curvature;
            // INVERTED: Use subtraction to match SVG displacement semantics
            return coords - cc * (1.0 + dist) * dist;
        }
        
        float isInScreen(vec2 coords) {
            vec2 s = step(vec2(0.0), coords) - step(vec2(1.0), coords);
            return s.x * s.y;
        }
        
        void main() {
            vec2 uv = v_texCoord;
            vec2 curvedUV = distortCoordinates(uv, u_curvature); // Curvature stays constant
            float inScreen = isInScreen(curvedUV);
            
            if (inScreen > 0.5) {
                // Scanlines
                float scanline = 1.0;
                float scanIntensity = u_scanlines * u_intensity;
                if (scanIntensity > 0.0) {
                    float scanY = curvedUV.y * u_resolution.y;
                    scanline = 1.0 - scanIntensity * 0.4 * (1.0 - abs(sin(scanY * 3.14159)));
                }
                
                // Glowing line
                float glowLine = 0.0;
                float glowIntensity = u_glowingLine * u_intensity;
                if (glowIntensity > 0.0) {
                    float linePos = fract(u_time * 0.08);
                    float lineDist = abs(curvedUV.y - linePos);
                    glowLine = glowIntensity * smoothstep(0.015, 0.0, lineDist);
                }
                
                // Noise
                float noise = 0.0;
                float noiseIntensity = u_noise * u_intensity;
                if (noiseIntensity > 0.0) {
                    noise = (rand(curvedUV + fract(u_time)) - 0.5) * noiseIntensity;
                }
                
                // Flicker
                float flicker = 1.0;
                float flickerIntensity = u_flicker * u_intensity;
                if (flickerIntensity > 0.0) {
                    flicker = 1.0 - flickerIntensity * 0.3 * (0.5 + 0.5 * sin(u_time * 6.0));
                }
                
                // Vignette - separate calculation
                float vignette = 1.0;
                if (u_vignette > 0.0) {
                    vec2 vignetteUV = curvedUV * (1.0 - curvedUV.yx);
                    vignette = pow(vignetteUV.x * vignetteUV.y * 15.0, u_vignette * 0.4);
                    vignette = clamp(vignette, 0.0, 1.0);
                }
                
                // Bloom
                float bloomGlow = u_bloom * u_intensity * 0.12;
                
                // Combine
                vec3 color = u_fontColor * scanline;
                color += u_fontColor * glowLine;
                color += u_fontColor * bloomGlow * vignette;
                color += vec3(noise);
                color *= flicker;
                color *= vignette;
                color *= u_brightness;
                color = clamp(color, 0.0, 1.0);
                
                // Keep alpha low to avoid green tint
                float alpha = 0.10 + bloomGlow * 0.3 + glowLine * 0.3;
                alpha *= u_intensity;
                alpha = clamp(alpha, 0.0, 0.25);
                
                gl_FragColor = vec4(color, alpha);
            } else {
                // Border glow
                float borderDist = 1.0 - max(
                    abs(curvedUV.x - 0.5) * 2.0,
                    abs(curvedUV.y - 0.5) * 2.0
                );
                float borderGlow = smoothstep(0.0, 0.08, -borderDist) * 0.2 * u_intensity;
                gl_FragColor = vec4(u_fontColor * borderGlow, borderGlow);
            }
        }
    `;

    const createShader = useCallback((gl, type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compile error:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }, []);

    const initWebGL = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
            console.warn('WebGL not supported, CRT effects disabled');
            return;
        }
        glRef.current = gl;

        // Create shaders
        const vertShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        if (!vertShader || !fragShader) return;

        // Create program
        const program = gl.createProgram();
        gl.attachShader(program, vertShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(program));
            return;
        }
        programRef.current = program;

        // Create buffers
        const positions = new Float32Array([
            -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1
        ]);
        const texCoords = new Float32Array([
            0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0
        ]);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

        const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
        gl.enableVertexAttribArray(texCoordLocation);
        gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

    }, [createShader, vertexShaderSource, fragmentShaderSource]);

    const resize = useCallback(() => {
        const canvas = canvasRef.current;
        const gl = glRef.current;
        if (!canvas || !gl) return;

        const dpr = 1; // Force 1:1 pixel ratio for performance and retro look
        // const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }, []);

    const render = useCallback((timestamp) => {
        const gl = glRef.current;
        const program = programRef.current;
        const canvas = canvasRef.current;
        const settings = settingsRef.current; // Use ref to get latest settings without re-binding

        if (!gl || !program || !canvas) {
            animationRef.current = requestAnimationFrame(render);
            return;
        }

        timeRef.current = timestamp / 1000;

        // Smooth effect multiplier for scrolling
        const targetMult = isScrollingRef.current ? 0.3 : (settings.imageIntensity || 1.0);
        effectMultiplierRef.current += (targetMult - effectMultiplierRef.current) * 0.1;

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(program);

        const mult = effectMultiplierRef.current;

        // Set uniforms
        gl.uniform1f(gl.getUniformLocation(program, 'u_time'), timeRef.current);
        gl.uniform2f(gl.getUniformLocation(program, 'u_resolution'), canvas.width, canvas.height);
        gl.uniform1f(gl.getUniformLocation(program, 'u_curvature'), settings.curvature);
        gl.uniform1f(gl.getUniformLocation(program, 'u_scanlines'), settings.scanlines);
        gl.uniform1f(gl.getUniformLocation(program, 'u_bloom'), settings.bloom);
        gl.uniform1f(gl.getUniformLocation(program, 'u_noise'), settings.noise);
        gl.uniform1f(gl.getUniformLocation(program, 'u_flicker'), settings.flicker);
        gl.uniform1f(gl.getUniformLocation(program, 'u_glowingLine'), settings.glowingLine);
        gl.uniform1f(gl.getUniformLocation(program, 'u_vignette'), settings.vignette);
        gl.uniform1f(gl.getUniformLocation(program, 'u_brightness'), settings.brightness);
        gl.uniform1f(gl.getUniformLocation(program, 'u_intensity'), mult);

        // Handle font color array safely
        const fc = settings.fontColor || [0, 1, 0];
        gl.uniform3f(gl.getUniformLocation(program, 'u_fontColor'), fc[0], fc[1], fc[2]);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        animationRef.current = requestAnimationFrame(render);
    }, []); // Empty dependency array for render loop stability

    // Handle scroll events
    useEffect(() => {
        const handleScroll = () => {
            isScrollingRef.current = true;
            clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = setTimeout(() => {
                isScrollingRef.current = false;
            }, 100);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Initialize and start
    useEffect(() => {
        initWebGL();
        resize();

        window.addEventListener('resize', resize);
        animationRef.current = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', resize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [initWebGL, resize, render]);

    return (
        <canvas
            ref={canvasRef}
            className="crt-effects-canvas"
            aria-hidden="true"
        />
    );
};

export default CRTEffects;
