import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.3s ease',
        background: scrolled ? 'var(--nav-bg-scrolled)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
    };

    const linkStyle = {
        color: 'var(--text-main)',
        marginLeft: '2rem',
        fontWeight: '500',
        cursor: 'pointer',
        position: 'relative',
    };

    return (
        <nav style={navStyle}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Portfolio.
            </div>
            <div>
                <a href="#hero" style={linkStyle}>Home</a>
                <a href="#about" style={linkStyle}>About</a>
                <a href="#skills" style={linkStyle}>Skills</a>
                <a href="#experience" style={linkStyle}>Experience</a>
                <a href="#projects" style={linkStyle}>Projects</a>
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;

