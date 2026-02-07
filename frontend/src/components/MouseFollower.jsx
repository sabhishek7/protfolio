import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MouseFollower = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring physics for trailing effect
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16); // Center offset (32px / 2)
            cursorY.set(e.clientY - 16);
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    return (
        <motion.div
            style={{
                translateX: springX,
                translateY: springY,
                position: 'fixed',
                top: 0,
                left: 0,
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1px solid var(--primary)',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                backdropFilter: 'blur(1px)',
                pointerEvents: 'none',
                zIndex: 9999,
                mixBlendMode: 'screen'
            }}
        >
            <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                width: '4px', height: '4px',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'var(--secondary)',
                borderRadius: '50%'
            }} />
        </motion.div>
    );
};

export default MouseFollower;
