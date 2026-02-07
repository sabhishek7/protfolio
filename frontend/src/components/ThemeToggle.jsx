import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            style={{
                background: 'transparent',
                border: '1px solid var(--surface-border)',
                color: 'var(--text-main)',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '1.5rem',
                backdropFilter: 'blur(5px)',
                width: '40px',
                height: '40px'
            }}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
    );
};

export default ThemeToggle;
