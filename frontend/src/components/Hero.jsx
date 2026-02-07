import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = ({ profile }) => {
    const [textIndex, setTextIndex] = useState(0);
    const titles = profile?.title ? [profile.title, "Creative Thinker", "Problem Solver"] : ["Developer", "Designer", "Creator"];

    // Typewriter effect logic
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % titles.length;
            const fullText = titles[i];

            setDisplayText(isDeleting
                ? fullText.substring(0, displayText.length - 1)
                : fullText.substring(0, displayText.length + 1)
            );

            setTypingSpeed(isDeleting ? 80 : 150);

            if (!isDeleting && displayText === fullText) {
                setTimeout(() => setIsDeleting(true), 1500); // Pause at end
            } else if (isDeleting && displayText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                setTypingSpeed(500); // Pause before new word
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayText, isDeleting, loopNum, titles, typingSpeed]);

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    if (!profile) return null; // Or a skeleton loader

    return (
        <section id="hero" style={{
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '60px' // Offset navbar
        }}>
            {/* Animated Background Mesh */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                zIndex: 0,
                background: 'radial-gradient(circle at 15% 50%, var(--primary-glow), transparent 25%), radial-gradient(circle at 85% 30%, var(--secondary-glow), transparent 25%)',
                filter: 'blur(60px)',
            }} />

            {/* Floating Orbs (Parallax) */}
            <motion.div style={{ y: y1, position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--primary), transparent)', opacity: 0.1, filter: 'blur(80px)' }} />
            <motion.div style={{ y: y2, position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--secondary), transparent)', opacity: 0.1, filter: 'blur(80px)' }} />

            <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>

                {/* Profile Image with Glow */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    style={{ marginBottom: '2.5rem', display: 'inline-block', position: 'relative' }}
                >
                    <div style={{
                        position: 'absolute', inset: -5, borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        filter: 'blur(20px)', opacity: 0.7, zIndex: -1
                    }}></div>
                    {profile.photo_url && (
                        <img
                            src={profile.photo_url}
                            alt={profile.full_name}
                            style={{
                                width: '180px',
                                height: '180px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '4px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                            }}
                        />
                    )}
                </motion.div>

                {/* Text Content */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{
                        fontSize: 'clamp(3rem, 5vw, 5rem)',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        marginBottom: '1rem',
                        background: 'var(--gradient-text)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    {profile.full_name}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ fontSize: '1.75rem', color: 'var(--secondary)', marginBottom: '3rem', height: '2rem', fontFamily: 'monospace' }}
                >
                    I am a {displayText}<span style={{ borderRight: '2px solid var(--primary)', animation: 'blink 0.7s infinite' }}>&nbsp;</span>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    <motion.a href="#projects" className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        View Work
                    </motion.a>
                    <motion.a href="#contact" className="btn btn-outline" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Contact Me
                    </motion.a>
                    {profile.resume_url && (
                        <motion.a
                            href={profile.resume_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                            style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
                            whileHover={{ scale: 1.05, background: 'rgba(139, 92, 246, 0.1)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Download Resume
                        </motion.a>
                    )}
                </motion.div>
            </div>

            <style>{`
        @keyframes blink { 0% { opacity: 0 } 50% { opacity: 1 } 100% { opacity: 0 } }
      `}</style>
        </section>
    );
};

export default Hero;
