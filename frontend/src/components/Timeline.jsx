import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Timeline = ({ items, type }) => {
    if (!items || items.length === 0) return null;

    // Sort items by date (newest first)
    const sortedItems = [...items].sort((a, b) => new Date(b.start_date) - new Date(a.start_date));

    return (
        <div className="container timeline-container" style={{ position: 'relative', marginTop: '2rem', paddingBottom: '2rem' }}>
            {/* Animated Connector Line */}
            <div
                className="timeline-line"
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    bottom: 0,
                    width: '4px',
                    background: 'var(--surface-border)',
                    transform: 'translateX(-50%)',
                    borderRadius: '2px',
                    zIndex: 0
                }}
            />

            {sortedItems.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                    <motion.div
                        key={item.id || index}
                        className="timeline-item"
                        initial={{ opacity: 0, x: isEven ? -50 : 50, scale: 0.9 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                        style={{
                            display: 'flex',
                            justifyContent: isEven ? 'flex-end' : 'flex-start',
                            position: 'relative',
                            marginBottom: '4rem',
                            zIndex: 1
                        }}
                    >
                        {/* Dot on the line */}
                        <motion.div
                            className="timeline-dot"
                            whileInView={{ scale: [0, 1.2, 1] }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top: '24px',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                background: 'var(--bg-color)',
                                border: '4px solid var(--primary)',
                                transform: 'translateX(-50%)',
                                zIndex: 10,
                                boxShadow: '0 0 15px var(--primary-glow)'
                            }}
                        />

                        {/* Content Card */}
                        <motion.div
                            className="timeline-content"
                            whileHover={{ scale: 1.03, rotate: isEven ? 1 : -1 }}
                            style={{
                                width: '45%',
                                padding: '0 2rem',
                                textAlign: isEven ? 'right' : 'left'
                            }}
                        >
                            <div className="card timeline-card" style={{
                                position: 'relative',
                                borderTop: `4px solid var(--${isEven ? 'primary' : 'secondary'})`,
                                background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2))'
                            }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
                                    {type === 'experience' ? item.role : item.degree}
                                </h3>
                                <h4 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: isEven ? 'flex-end' : 'flex-start', gap: '0.5rem' }}>
                                    {type === 'experience' ? item.company : item.institution}
                                </h4>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '20px',
                                    background: 'rgba(255,255,255,0.1)',
                                    fontSize: '0.85rem',
                                    marginBottom: '1rem',
                                    color: 'var(--text-muted)'
                                }}>
                                    {item.start_date} — {item.end_date || 'Present'}
                                </span>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: item.responsibility ? '1rem' : '0' }}>{item.description}</p>

                                {item.responsibility && (
                                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                        <h5 style={{ fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Key Responsibilities</h5>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', whiteSpace: 'pre-line' }}>{item.responsibility}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default Timeline;
