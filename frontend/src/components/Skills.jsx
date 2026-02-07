import React from 'react';
import { motion } from 'framer-motion';

const Skills = ({ skills }) => {
    if (!skills || skills.length === 0) return null;

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const item = {
        hidden: { opacity: 0, scale: 0, rotate: -20 },
        show: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: { type: "spring", stiffness: 200, damping: 15 }
        }
    };

    return (
        <section id="skills" className="section" style={{ position: 'relative', zIndex: 5 }}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Tech Arsenal
                </motion.h2>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                        gap: '2rem'
                    }}
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.id || index}
                            variants={item}
                            whileHover={{
                                scale: 1.1,
                                rotate: [0, -5, 5, 0],
                                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                                borderColor: 'var(--primary)',
                                boxShadow: '0 10px 30px -10px rgba(139, 92, 246, 0.5)'
                            }}
                            className="card"
                            style={{
                                padding: '2rem',
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'default',
                                aspectRatio: '1/1',
                                border: '1px solid var(--surface-border)',
                                transition: 'background-color 0.3s'
                            }}
                        >
                            {/* Icon Placeholder with Glass Glare */}
                            <div style={{
                                width: '64px', height: '64px',
                                borderRadius: '18px',
                                background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))`,
                                borderTop: '1px solid rgba(255,255,255,0.2)',
                                borderLeft: '1px solid rgba(255,255,255,0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary)',
                                marginBottom: '1rem',
                                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                                position: 'relative', overflow: 'hidden'
                            }}>
                                {skill.name.charAt(0)}
                                {/* Glare effect */}
                                <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'linear-gradient(to bottom right, rgba(255,255,255,0.2), transparent, transparent)', transform: 'rotate(45deg)' }} />
                            </div>

                            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.25rem' }}>{skill.name}</h3>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {skill.category}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
