import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Timeline from '../components/Timeline';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import ScrollProgress from '../components/ScrollProgress';

const SectionWrapper = ({ children, id, delay = 0 }) => (
    <motion.section
        id={id}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className="section"
    >
        {children}
    </motion.section>
);

const Portfolio = () => {
    const [data, setData] = useState({
        profile: null,
        skills: [],
        education: [],
        experience: [],
        projects: []
    });
    const [loading, setLoading] = useState(true);
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Use Promise.allSettled to ensure partial failures don't block the whole page
                const results = await Promise.allSettled([
                    api.get('/profile'),
                    api.get('/skills'),
                    api.get('/education'),
                    api.get('/experience'),
                    api.get('/projects')
                ]);

                // Helper to extract data or default
                const getVal = (res, def) => (res.status === 'fulfilled' ? res.value.data : def);

                setData({
                    profile: getVal(results[0], null),
                    skills: getVal(results[1], []),
                    education: getVal(results[2], []),
                    experience: getVal(results[3], []),
                    projects: getVal(results[4], [])
                });
            } catch (error) {
                console.error("Critical error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        const handleScroll = () => {
            setShowTopBtn(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-color)', color: 'white', flexDirection: 'column', gap: '1rem' }}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    style={{ width: '40px', height: '40px', border: '3px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%' }}
                />
                <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >Loading Experience...</motion.p>
            </div>
        );
    }

    return (
        <div style={{ overflowX: 'hidden' }}>
            <ScrollProgress />

            <Navbar />

            <Hero profile={data.profile} />

            <div className="container">
                <SectionWrapper id="about">
                    <h2 className="section-title">About Me</h2>
                    <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
                        {/* Decorative Quote Mark */}
                        <div style={{ position: 'absolute', top: '-10px', left: '20px', fontSize: '6rem', color: 'var(--primary)', opacity: 0.1, fontFamily: 'serif' }}>"</div>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.8', position: 'relative', zIndex: 1 }}>
                            {data.profile?.bio || "I am a passionate developer dedicated to building high-quality digital experiences. Welcome to my portfolio where I showcase my journey and work."}
                        </p>
                    </div>
                </SectionWrapper>

                <Skills skills={data.skills} />

                <SectionWrapper id="experience">
                    <h2 className="section-title">Experience</h2>
                    <Timeline items={data.experience} type="experience" />
                </SectionWrapper>

                <SectionWrapper id="education">
                    <h2 className="section-title">Education</h2>
                    <Timeline items={data.education} type="education" />
                </SectionWrapper>

                <Projects projects={data.projects} />

                <Contact />

                <footer style={{ textAlign: 'center', padding: '3rem 2rem', color: 'var(--text-muted)', borderTop: '1px solid var(--surface-border)', marginTop: '4rem' }}>
                    <motion.div whileHover={{ scale: 1.1 }} style={{ display: 'inline-block', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        <span style={{ color: 'var(--primary)' }}>Port</span>folio.
                    </motion.div>
                    <p>© {new Date().getFullYear()} {data.profile?.full_name || 'Abhishek Kumar'}. Crafted with React & Motion.</p>
                </footer>
            </div>

            {/* Back to Top Button */}
            <AnimatePresence>
                {showTopBtn && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={scrollToTop}
                        style={{
                            position: 'fixed', bottom: '2rem', right: '2rem',
                            width: '50px', height: '50px', borderRadius: '50%',
                            background: 'var(--primary)', color: 'white', border: 'none',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)',
                            zIndex: 100
                        }}
                    >
                        <ArrowUp size={24} />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Portfolio;
