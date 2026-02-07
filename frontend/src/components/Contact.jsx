import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setFormState({ name: '', email: '', message: '' });
        }, 1500);
    };

    return (
        <section id="contact" className="section" style={{ position: 'relative', paddingBottom: '5rem' }}>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-title"
            >
                Let's Connect
            </motion.h2>

            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Get in touch</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem', maxWidth: '500px' }}>
                        I'm currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                        <a href="mailto:hello@example.com" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', color: 'var(--text-main)' }}>
                            <div style={{ padding: '0.8rem', background: 'color-mix(in srgb, var(--primary), transparent 85%)', borderRadius: '50%', color: 'var(--primary)' }}><Mail size={24} /></div>
                            abhishekcu82@gmail.com
                        </a>
                        <a href="https://www.linkedin.com/in/abhishek0912/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', color: 'var(--text-main)' }}>
                            <div style={{ padding: '0.8rem', background: 'color-mix(in srgb, var(--secondary), transparent 85%)', borderRadius: '50%', color: 'var(--secondary)' }}><Linkedin size={24} /></div>
                            LinkedIn
                        </a>
                        <a href="https://github.com/sabhishek7" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', color: 'var(--text-main)' }}>
                            <div style={{ padding: '0.8rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%', color: 'white' }}><Github size={24} /></div>
                            GitHub
                        </a>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="card"
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Name</label>
                        <input
                            type="text"
                            className="input-field"
                            required
                            value={formState.name}
                            onChange={e => setFormState({ ...formState, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email</label>
                        <input
                            type="email"
                            className="input-field"
                            required
                            value={formState.email}
                            onChange={e => setFormState({ ...formState, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Message</label>
                        <textarea
                            rows="4"
                            className="input-field"
                            required
                            value={formState.message}
                            onChange={e => setFormState({ ...formState, message: e.target.value })}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={status === 'sending' || status === 'success'}
                        style={{ width: '100%', justifyContent: 'center' }}
                    >
                        {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : <><Send size={18} style={{ marginRight: '0.5rem' }} /> Send Message</>}
                    </button>

                </motion.form>
            </div>
        </section>
    );
};

export default Contact;
