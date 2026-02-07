import React, { useState } from 'react';
import { ExternalLink, Github, X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = ({ projects }) => {
    const [selectedId, setSelectedId] = useState(null);

    // Variants for staggered animations
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
    };

    if (!projects || projects.length === 0) return null;

    // Use a placeholder if image_url is missing or broken (handled via error would be better but simple logic for now)
    const getImg = (url) => url || "https://placehold.co/600x400/1e293b/ffffff?text=Project+Preview";

    return (
        <section id="projects" className="section" style={{ position: 'relative' }}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Featured Projects
                </motion.h2>

                <motion.div
                    className="projects-grid"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}
                >
                    {projects.map((project) => (
                        <motion.div
                            layoutId={`card-container-${project.id}`}
                            key={project.id}
                            variants={item}
                            onClick={() => setSelectedId(project.id)}
                            className="card"
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            style={{
                                padding: 0,
                                overflow: 'hidden',
                                cursor: 'pointer',
                                border: '1px solid var(--surface-border)',
                                borderRadius: '20px',
                                background: 'var(--surface)',
                                position: 'relative',
                                group: 'card' // conceptual
                            }}
                        >
                            {/* Image with Zoom Effect */}
                            <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                                <motion.img
                                    src={getImg(project.image_url)}
                                    alt={project.title}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)',
                                    display: 'flex', alignItems: 'flex-end', padding: '1.5rem'
                                }}>
                                    <div style={{ width: '100%' }}>
                                        <motion.h3 layoutId={`card-title-${project.id}`} style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>{project.title}</motion.h3>
                                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                            {project.tags && project.tags.slice(0, 3).map((tag, i) => (
                                                <span key={i} style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', borderRadius: '12px', color: 'white' }}>
                                                    {tag}
                                                </span>
                                            ))}
                                            {project.tags && project.tags.length > 3 && (
                                                <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', borderRadius: '12px', color: 'white' }}>+{project.tags.length - 3}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Hover "View" Button */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    style={{
                                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                        background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)',
                                        padding: '1rem', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.5)'
                                    }}
                                >
                                    <Eye color="white" size={32} />
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Expanded Card Modal */}
                <AnimatePresence>
                    {selectedId && (() => {
                        const project = projects.find(p => p.id === selectedId);
                        return (
                            <div
                                style={{
                                    position: 'fixed', inset: 0, zIndex: 1000,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    padding: '1rem'
                                }}
                            >
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setSelectedId(null)}
                                    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
                                />

                                <motion.div
                                    layoutId={`card-container-${selectedId}`}
                                    className="card"
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                        width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto',
                                        background: '#121212', border: '1px solid var(--surface-border)', padding: 0,
                                        position: 'relative', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)'
                                    }}
                                >
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        style={{
                                            position: 'absolute', top: '1.5rem', right: '1.5rem',
                                            background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white',
                                            width: '40px', height: '40px', borderRadius: '50%',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            cursor: 'pointer', zIndex: 20, transition: 'background 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(200,0,0,0.8)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                                    >
                                        <X size={20} />
                                    </button>

                                    <div style={{ height: '400px', width: '100%', position: 'relative' }}>
                                        <img src={getImg(project.image_url)} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, #121212 100%)' }} />
                                    </div>

                                    <div className="project-card-expanded" style={{ padding: '3rem 3rem 4rem', marginTop: '-4rem', position: 'relative' }}>
                                        <motion.h2 className="project-title-expanded" layoutId={`card-title-${selectedId}`} style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: 1.1 }}>{project.title}</motion.h2>

                                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                                            {project.tags && project.tags.map((tag, i) => (
                                                <span key={i} style={{
                                                    fontSize: '1rem', padding: '0.5rem 1.25rem',
                                                    background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa',
                                                    borderRadius: '100px', border: '1px solid rgba(139, 92, 246, 0.3)',
                                                    fontWeight: '500'
                                                }}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <p style={{ color: '#d4d4d8', fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '2rem', whiteSpace: 'pre-line' }}>
                                            {project.description}
                                        </p>

                                        {project.responsibility && (
                                            <div style={{ marginBottom: '3rem', padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                                                <h4 style={{ fontSize: '1.1rem', color: '#a78bfa', marginBottom: '0.75rem', fontWeight: 'bold' }}>Key Features & Responsibilities</h4>
                                                <p style={{ color: '#e5e7eb', lineHeight: '1.7', whiteSpace: 'pre-line' }}>{project.responsibility}</p>
                                            </div>
                                        )}

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            {project.live_link && (
                                                <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ justifyContent: 'center', padding: '1rem' }}>
                                                    <ExternalLink size={20} style={{ marginRight: '0.75rem' }} /> Launch Demo
                                                </a>
                                            )}
                                            {project.repo_link && (
                                                <a href={project.repo_link} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ justifyContent: 'center', padding: '1rem' }}>
                                                    <Github size={20} style={{ marginRight: '0.75rem' }} /> View Source
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })()}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Projects;
