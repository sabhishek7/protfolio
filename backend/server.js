const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Default Global Client (Anonymous)
// Used for public reads only
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabasePublic = createClient(supabaseUrl, supabaseKey);

// Middleware to check Authentication AND Create Authenticated Client
const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No authorization header forwarded' });
    }

    const token = authHeader.split(' ')[1];

    // 1. Verify token
    const { data: { user }, error } = await supabasePublic.auth.getUser(token);

    if (error || !user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;

    // 2. Create Scoped Client for this user
    // This ensures Postgres RLS policies (auth.role() = 'authenticated') work correctly!
    req.supabase = createClient(supabaseUrl, supabaseKey, {
        global: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    });

    next();
};

// --- ROUTES ---

// 1. PROFILE
// GET /profile - Public Read
app.get('/api/profile', async (req, res) => {
    const { data, error } = await supabasePublic.from('profiles').select('*').single();
    // Don't error 500 if no profile found, just return null
    if (error && error.code !== 'PGRST116') return res.status(500).json({ error: error.message });
    res.json(data);
});

// PUT /profile (Protected)
app.put('/api/profile', requireAuth, async (req, res) => {
    const { full_name, title, bio, photo_url, resume_url } = req.body;

    // Use Authenticated Client (req.supabase)

    // 1. Try to fetch existing profile
    const { data: existing } = await req.supabase.from('profiles').select('id').limit(1).single();

    let result;
    if (existing) {
        // Update
        result = await req.supabase.from('profiles').update({ full_name, title, bio, photo_url, resume_url }).eq('id', existing.id).select();
    } else {
        // Insert
        result = await req.supabase.from('profiles').insert([{ full_name, title, bio, photo_url, resume_url }]).select();
    }


    if (result.error) return res.status(500).json({ error: result.error.message });
    res.json(result.data[0]);
});

// 2. SKILLS
app.get('/api/skills', async (req, res) => {
    const { data, error } = await supabasePublic.from('skills').select('*').order('created_at', { ascending: true });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.post('/api/skills', requireAuth, async (req, res) => {
    const { name, category, level } = req.body;
    const { data, error } = await req.supabase.from('skills').insert([{ name, category, level }]).select();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data[0]);
});

app.delete('/api/skills/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { error } = await req.supabase.from('skills').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Deleted successfully' });
});

// 3. EDUCATION
app.get('/api/education', async (req, res) => {
    const { data, error } = await supabasePublic.from('education').select('*').order('start_date', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.post('/api/education', requireAuth, async (req, res) => {
    const { institution, degree, start_date, end_date, description } = req.body;
    const { data, error } = await req.supabase.from('education').insert([{ institution, degree, start_date, end_date, description }]).select();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data[0]);
});

app.delete('/api/education/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { error } = await req.supabase.from('education').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Deleted successfully' });
});

// 4. PROJECTS
app.get('/api/projects', async (req, res) => {
    const { data, error } = await supabasePublic.from('projects').select('*').order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.post('/api/projects', requireAuth, async (req, res) => {
    const { title, description, image_url, live_link, repo_link, tags, responsibility } = req.body;
    const { data, error } = await req.supabase.from('projects').insert([{ title, description, image_url, live_link, repo_link, tags, responsibility }]).select();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data[0]);
});

app.delete('/api/projects/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { error } = await req.supabase.from('projects').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Deleted successfully' });
});

// 5. EXPERIENCE
app.get('/api/experience', async (req, res) => {
    const { data, error } = await supabasePublic.from('experience').select('*').order('start_date', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.post('/api/experience', requireAuth, async (req, res) => {
    const { company, role, start_date, end_date, description, responsibility } = req.body;
    const { data, error } = await req.supabase.from('experience').insert([{ company, role, start_date, end_date, description, responsibility }]).select();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data[0]);
});

app.delete('/api/experience/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { error } = await req.supabase.from('experience').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
