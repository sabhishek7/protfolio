const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
    const email = 'admin@portfolio.com';
    const password = 'securePassword123';

    console.log(`Attempting to create user: ${email}`);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.error('❌ Error creating user:', error.message);
        return;
    }

    console.log('✅ User created successfully!');
    console.log('------------------------------------------------');
    console.log(`Email:    ${email}`);
    console.log(`Password: ${password}`);
    console.log('------------------------------------------------');

    if (data.user && data.user.identities && data.user.identities.length === 0) {
        console.log('⚠️ User already registered. Try logging in.');
    } else if (data.session) {
        console.log('🎉 Auto-login successful! You can use these credentials immediately.');
    } else {
        console.log('⚠️ IMPORTANT: Email confirmation may be required.');
        console.log('1. Go to Supabase Dashboard -> Authentication -> Users');
        console.log('2. Find this user and click the three dots (...) -> "Confirm Access" (if needed)');
    }
}

createAdmin();
