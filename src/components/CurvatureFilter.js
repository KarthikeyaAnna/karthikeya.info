import React, { useEffect, useState } from 'react';

const CurvatureFilter = ({ curvature = 0.3 }) => {
    const [mapUrl, setMapUrl] = useState('');

    useEffect(() => {
        const canvas = document.createElement('canvas');
        const size = 256; // Reduced for performance
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        const imageData = ctx.createImageData(size, size);
        const data = imageData.data;

        // Fixed scale - simpler and more predictable
        const scale = 0.15;

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const i = (y * size + x) * 4;

                // Normalized coordinates using pixel center
                const u = (x + 0.5) / size;
                const v = (y + 0.5) / size;

                // Center relative coords (-0.5 to 0.5)
                const ccx = u - 0.5;
                const ccy = v - 0.5;

                // Distance squared * curvature (direct, no damping)
                const dist = (ccx * ccx + ccy * ccy) * curvature;

                // Distortion factor
                const factor = (1.0 + dist) * dist;

                // Offset
                const offX = ccx * factor;
                const offY = ccy * factor;

                // Map to color - NEGATED for SVG displacement semantics
                let normR = (-offX / scale) + 0.5;
                let normG = (-offY / scale) + 0.5;

                // Clamp
                normR = Math.max(0, Math.min(1, normR));
                normG = Math.max(0, Math.min(1, normG));

                data[i] = normR * 255;
                data[i + 1] = normG * 255;
                data[i + 2] = 127;
                data[i + 3] = 255;
            }
        }

        ctx.putImageData(imageData, 0, 0);
        setMapUrl(canvas.toDataURL());
    }, [curvature]);

    if (!mapUrl) return null;

    return (
        <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none', zIndex: -1 }}>
            <defs>
                <filter
                    id="crt-bend"
                    primitiveUnits="objectBoundingBox"
                    x="0" y="0" width="1" height="1"
                >
                    <feImage
                        result="pict1"
                        href={mapUrl}
                        xlinkHref={mapUrl}
                        x="0" y="0" width="1" height="1"
                        preserveAspectRatio="none"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="pict1"
                        scale="0.15"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
            </defs>
        </svg>
    );
};

export default CurvatureFilter;
