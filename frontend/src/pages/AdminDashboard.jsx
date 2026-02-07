import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Trash2, Edit2, Plus, LogOut, User, Code, BookOpen, Briefcase, Layers, Home, Search, ExternalLink, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
        toast.success('Logged out successfully');
    };

    const navItems = [
        { id: 'overview', label: 'Overview', icon: <Home size={18} /> },
        { id: 'profile', label: 'Profile', icon: <User size={18} /> },
        { id: 'skills', label: 'Skills', icon: <Code size={18} /> },
        { id: 'education', label: 'Education', icon: <BookOpen size={18} /> },
        { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> },
        { id: 'projects', label: 'Projects', icon: <Layers size={18} /> },
    ];

    return (
        <div className="dashboard-layout" style={{ background: 'var(--bg-color)', color: 'var(--text-main)', display: 'flex', height: '100vh', overflow: 'hidden' }}>
            <Toaster position="top-right" toastOptions={{ style: { background: '#1e293b', color: '#fff', border: '1px solid #334155' } }} />

            {/* Sidebar */}
            <aside className="sidebar" style={{ width: '250px', borderRight: '1px solid var(--surface-border)', background: '#111827', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '2rem', borderBottom: '1px solid var(--surface-border)' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.5px' }}>Admin Panel</h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Manage your portfolio</p>
                </div>

                <nav className="sidebar-nav" style={{ padding: '1rem', flex: 1, overflowY: 'auto' }}>
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            style={{
                                width: '100%', textAlign: 'left', cursor: 'pointer', padding: '0.75rem 1rem',
                                color: activeTab === item.id ? 'white' : 'var(--text-muted)',
                                background: activeTab === item.id ? 'var(--primary)' : 'transparent',
                                border: 'none', borderRadius: '8px', marginBottom: '0.5rem',
                                display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.2s',
                                fontWeight: activeTab === item.id ? '600' : '400'
                            }}
                        >
                            {item.icon} {item.label}
                        </button>
                    ))}
                </nav>

                <div style={{ padding: '1rem', borderTop: '1px solid var(--surface-border)' }}>
                    <a href="/" target="_blank" style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem',
                        color: 'var(--text-main)', textDecoration: 'none', borderRadius: '8px', marginBottom: '0.5rem',
                        background: 'rgba(255,255,255,0.05)', fontSize: '0.9rem'
                    }}>
                        <ExternalLink size={16} /> View Live Site
                    </a>
                    <button onClick={handleLogout} style={{
                        width: '100%', textAlign: 'left', cursor: 'pointer', padding: '0.75rem 1rem',
                        color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '8px',
                        display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem'
                    }}>
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="content-area" style={{ flex: 1, padding: '2rem', overflowY: 'auto', background: '#0f172a' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'overview' && <OverviewStats setActiveTab={setActiveTab} />}
                        {activeTab === 'profile' && <ProfileEditor />}
                        {activeTab === 'skills' && <SkillsManager />}
                        {activeTab === 'education' && <EducationManager />}
                        {activeTab === 'projects' && <ProjectsManager />}
                        {activeTab === 'experience' && <ExperienceManager />}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

// --- Sub-components ---

const OverviewStats = ({ setActiveTab }) => {
    const [stats, setStats] = useState({ skills: 0, projects: 0, experience: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Parallel fetch for speed
                const [s, p, e] = await Promise.all([
                    api.get('/skills'),
                    api.get('/projects'),
                    api.get('/experience')
                ]);
                setStats({
                    skills: s.data.length || 0,
                    projects: p.data.length || 0,
                    experience: e.data.length || 0
                });
            } catch (err) { console.error(err); }
        };
        fetchStats();
    }, []);

    const cards = [
        { label: 'Total Projects', value: stats.projects, color: '#8b5cf6', tab: 'projects', icon: <Layers size={24} /> },
        { label: 'Skills Listed', value: stats.skills, color: '#06b6d4', tab: 'skills', icon: <Code size={24} /> },
        { label: 'Experience Entries', value: stats.experience, color: '#ec4899', tab: 'experience', icon: <Briefcase size={24} /> },
    ];

    return (
        <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Dashboard Overview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                {cards.map((card, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        onClick={() => setActiveTab(card.tab)}
                        style={{
                            background: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155',
                            cursor: 'pointer', position: 'relative', overflow: 'hidden'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div style={{ padding: '0.75rem', borderRadius: '12px', background: `${card.color}20`, color: card.color }}>
                                {card.icon}
                            </div>
                            {/* Decorative blur */}
                            <div style={{
                                position: 'absolute', right: -20, top: -20, width: '100px', height: '100px',
                                background: card.color, borderRadius: '50%', filter: 'blur(40px)', opacity: 0.1
                            }} />
                        </div>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{card.value}</h3>
                        <p style={{ color: 'var(--text-muted)' }}>{card.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions or recent logs could go here */}
            <div style={{ marginTop: '3rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Quick Actions</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => setActiveTab('projects')} className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <Plus size={18} /> Add New Project
                    </button>
                    <button onClick={() => setActiveTab('skills')} className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <Plus size={18} /> Add New Skill
                    </button>
                    <a href="/" target="_blank" className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginLeft: 'auto' }}>
                        <ExternalLink size={18} /> View Site
                    </a>
                </div>
            </div>
        </div>
    );
};

const ProfileEditor = () => {
    const [profile, setProfile] = useState({ full_name: '', title: '', bio: '', photo_url: '', resume_url: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get('/profile').then(res => { if (res.data) setProfile(res.data) });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put('/profile', profile);
            toast.success('Profile updated successfully!');
        } catch (err) { toast.error('Failed to update profile'); }
        setLoading(false);
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `profile-${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabase.storage
                .from('portfolio-images')
                .getPublicUrl(filePath);

            setProfile(prev => ({ ...prev, photo_url: publicUrlData.publicUrl }));
            toast.success('Profile photo uploaded!');
        } catch (error) {
            console.error('Error uploading photo:', error);
            toast.error('Error uploading photo');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem' }}>Edit Profile</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '2rem', flexDirection: 'row-reverse' }}>
                    {/* Image Preview Side */}
                    <div style={{ width: '200px', flexShrink: 0 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Profile Photo Preview</label>
                        <div style={{
                            width: '100%', aspectRatio: '1/1', borderRadius: '12px', overflow: 'hidden',
                            background: '#111827', border: '1px solid var(--surface-border)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            {profile.photo_url ? (
                                <img src={profile.photo_url} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <User size={48} color="#4b5563" />
                            )}
                        </div>
                    </div>

                    {/* Inputs Side */}
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div><label style={{ display: 'block', marginBottom: '0.5rem' }}>Full Name</label><input className="input-field" value={profile.full_name} onChange={e => setProfile({ ...profile, full_name: e.target.value })} /></div>
                            <div><label style={{ display: 'block', marginBottom: '0.5rem' }}>Job Title</label><input className="input-field" value={profile.title} onChange={e => setProfile({ ...profile, title: e.target.value })} /></div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Photo URL</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input className="input-field" value={profile.photo_url} onChange={e => setProfile({ ...profile, photo_url: e.target.value })} placeholder="Paste URL or upload..." style={{ flex: 1 }} />
                                <label style={{
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    padding: '0.75rem 1rem',
                                    background: 'var(--surface)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        style={{ display: 'none' }}
                                        disabled={loading}
                                    />
                                    {loading ? <RefreshCw size={18} className="spin" /> : <Plus size={18} />}
                                    Upload
                                </label>
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}><label style={{ display: 'block', marginBottom: '0.5rem' }}>Resume URL <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>(Link to PDF/Drive)</span></label><input className="input-field" value={profile.resume_url || ''} onChange={e => setProfile({ ...profile, resume_url: e.target.value })} placeholder="https://example.com/my-resume.pdf" /></div>
                        <div style={{ marginBottom: '2rem' }}><label style={{ display: 'block', marginBottom: '0.5rem' }}>Bio</label><textarea className="input-field" rows={5} value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} /></div>
                        <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%' }}>{loading ? 'Saving...' : 'Save Changes'}</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

// Generic List Manager
const ListManager = ({ title, fetchUrl, fields, renderItem }) => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [search, setSearch] = useState('');
    const [form, setForm] = useState(fields.reduce((acc, f) => ({ ...acc, [f.key]: '' }), {}));
    const [isEditing, setIsEditing] = useState(null);
    const [uploading, setUploading] = useState(false);

    const fetchItems = () => api.get(fetchUrl).then(res => {
        setItems(res.data);
        setFilteredItems(res.data);
    });
    useEffect(() => { fetchItems(); }, []);

    // Search Effect
    useEffect(() => {
        if (!search.trim()) {
            setFilteredItems(items);
            return;
        }
        const lowerSearch = search.toLowerCase();
        const filtered = items.filter(item => {
            // Very basic heuristic: search only string values
            return Object.values(item).some(val =>
                typeof val === 'string' && val.toLowerCase().includes(lowerSearch)
            );
        });
        setFilteredItems(filtered);
    }, [search, items]);

    const handleImageUpload = async (e, fieldKey) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabase.storage
                .from('portfolio-images')
                .getPublicUrl(filePath);

            setForm(prev => ({ ...prev, [fieldKey]: publicUrlData.publicUrl }));
            toast.success('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Error uploading image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.delete(`${fetchUrl}/${isEditing}`);
                await api.post(fetchUrl, form);
                toast.success('Item updated successfully!');
            } else {
                await api.post(fetchUrl, form);
                toast.success('Item added successfully!');
            }

            setForm(fields.reduce((acc, f) => ({ ...acc, [f.key]: '' }), {}));
            setIsEditing(null);
            fetchItems();
        } catch (err) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            try {
                await api.delete(`${fetchUrl}/${id}`);
                toast.success('Item deleted successfully!');
                fetchItems();
            } catch (err) { toast.error('Delete failed'); }
        }
    };

    const handleEdit = (item) => {
        const formattedForm = { ...item };
        if (formattedForm.tags && Array.isArray(formattedForm.tags)) {
            formattedForm.tags = formattedForm.tags.join(', ');
        }
        setForm(formattedForm);
        setIsEditing(item.id);
        toast('Editing item... check the form above', { icon: '✏️' });
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* Form Section */}
            <div className="card" style={{ marginBottom: '2rem', borderLeft: isEditing ? '4px solid var(--primary)' : '1px solid var(--surface-border)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {isEditing ? <Edit2 size={20} className="text-primary" /> : <Plus size={20} />}
                    {isEditing ? `Edit ${title}` : `Add New ${title}`}
                    {isEditing && <button onClick={() => { setIsEditing(null); setForm(fields.reduce((acc, f) => ({ ...acc, [f.key]: '' }), {})) }} style={{ marginLeft: 'auto', fontSize: '0.8rem', background: 'none', border: '1px solid var(--border)', color: 'var(--text-muted)', padding: '0.25rem 0.75rem', borderRadius: '12px', cursor: 'pointer' }}>Cancel</button>}
                </h3>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                    {fields.map(field => (
                        <div key={field.key}>
                            {field.type === 'textarea' ? (
                                <textarea
                                    className="input-field"
                                    placeholder={field.label}
                                    value={form[field.key] || ''}
                                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                                    required={!field.optional}
                                    style={{ minHeight: '100px' }}
                                />
                            ) : field.type === 'image' ? (
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{field.label}</label>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <input
                                                type="text"
                                                className="input-field"
                                                placeholder="Paste URL or upload..."
                                                value={form[field.key] || ''}
                                                onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                                                required={!field.optional}
                                                style={{ flex: 1 }}
                                            />
                                            <label style={{
                                                cursor: uploading ? 'not-allowed' : 'pointer',
                                                padding: '0.75rem 1rem',
                                                background: 'var(--surface)',
                                                border: '1px solid var(--border)',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageUpload(e, field.key)}
                                                    style={{ display: 'none' }}
                                                    disabled={uploading}
                                                />
                                                {uploading ? <RefreshCw size={18} className="spin" /> : <Plus size={18} />}
                                                Upload
                                            </label>
                                        </div>
                                    </div>
                                    {form[field.key] && (
                                        <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', background: '#000', border: '1px solid var(--surface-border)' }}>
                                            <img src={form[field.key]} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    )}
                                </div>
                            ) : field.type === 'row' ? (
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    {field.subFields.map(sub => (
                                        <div key={sub.key} style={{ flex: 1, minWidth: '200px' }}>
                                            <input
                                                type={sub.inputType || 'text'}
                                                className="input-field"
                                                placeholder={sub.label}
                                                value={form[sub.key] || ''}
                                                onChange={e => setForm({ ...form, [sub.key]: e.target.value })}
                                                required={!sub.optional}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <input
                                    type={field.inputType || 'text'}
                                    className="input-field"
                                    placeholder={field.label}
                                    value={form[field.key] || ''}
                                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                                    required={!field.optional}
                                />
                            )}
                        </div>
                    ))}
                    <button className="btn btn-primary" type="submit" style={{ justifyContent: 'center' }} disabled={uploading}>{isEditing ? 'Update Item' : 'Add Item'}</button>
                </form>
            </div>

            {/* List Section */}
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <h3 style={{ margin: 0 }}>Existing Items <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>({filteredItems.length})</span></h3>
                    <div style={{ position: 'relative', width: '250px' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder={`Search ${title}s...`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input-field"
                            style={{ paddingLeft: '2.5rem', marginBottom: 0 }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <AnimatePresence>
                        {filteredItems.map(item => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                layout
                                style={{
                                    background: 'rgba(255,255,255,0.03)', border: '1px solid var(--surface-border)',
                                    borderRadius: '12px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                }}
                            >
                                <div style={{ flex: 1 }}>{renderItem(item)}</div>
                                <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                                    <button onClick={() => handleEdit(item)} style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--primary)', padding: '0.6rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '0.6rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {filteredItems.length === 0 && <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', border: '2px dashed var(--surface-border)', borderRadius: '12px' }}>No items found.</div>}
                </div>
            </div>
        </div>
    );
};

const SkillsManager = () => (
    <ListManager
        title="Skill"
        fetchUrl="/skills"
        fields={[
            { key: 'name', label: 'Skill Name' },
            { key: 'category', label: 'Category (e.g. Frontend, Backend, Tools)' }
        ]}
        renderItem={(s) => <div><strong>{s.name}</strong> <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>— {s.category}</span></div>}
    />
);

const EducationManager = () => (
    <ListManager
        title="Education"
        fetchUrl="/education"
        fields={[
            { key: 'institution', label: 'Institution' },
            { key: 'degree', label: 'Degree' },
            {
                type: 'row', subFields: [
                    { key: 'start_date', label: 'Start Date', inputType: 'date' },
                    { key: 'end_date', label: 'End Date (Empty for Present)', inputType: 'date', optional: true }
                ]
            },
            { key: 'description', label: 'Description', type: 'textarea', optional: true }
        ]}
        renderItem={(i) => <div><strong>{i.degree}</strong> at {i.institution}</div>}
    />
);

const ExperienceManager = () => (
    <ListManager
        title="Experience"
        fetchUrl="/experience"
        fields={[
            { key: 'company', label: 'Company' },
            { key: 'role', label: 'Role' },
            {
                type: 'row', subFields: [
                    { key: 'start_date', label: 'Start Date', inputType: 'date' },
                    { key: 'end_date', label: 'End Date (Empty for Present)', inputType: 'date', optional: true }
                ]
            },
            { key: 'description', label: 'Description', type: 'textarea', optional: true },
            { key: 'responsibility', label: 'Responsibilities', type: 'textarea', optional: true }
        ]}
        renderItem={(i) => <div><strong>{i.role}</strong> @ {i.company}</div>}
    />
);

const ProjectsManager = () => (
    <ListManager
        title="Project"
        fetchUrl="/projects"
        fields={[
            { key: 'title', label: 'Project Title' },
            { key: 'description', label: 'Description', type: 'textarea' },
            { key: 'responsibility', label: 'Responsibilities / Key Features', type: 'textarea', optional: true },
            { key: 'image_url', label: 'Project Image', type: 'image' }, // Changed to type: 'image'
            {
                type: 'row', subFields: [
                    { key: 'live_link', label: 'Live Link', optional: true },
                    { key: 'repo_link', label: 'Repo Link', optional: true }
                ]
            },
            { key: 'tags', label: 'Tags (comma separated)' }
        ]}
        renderItem={(i) => (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', background: '#000', flexShrink: 0 }}>
                    {i.image_url ? <img src={i.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}><Layers size={20} /></div>}
                </div>
                <div>
                    <strong>{i.title}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        {i.tags && i.tags.length > 0 ? i.tags.join(', ') : 'No tags'}
                    </div>
                </div>
            </div>
        )}
    />
);

export default AdminDashboard;
