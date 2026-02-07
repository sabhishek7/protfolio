const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Force load .env from current dir
dotenv.config({ path: './.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

console.log('URL:', supabaseUrl ? 'Found' : 'Missing');
console.log('Key:', supabaseKey ? 'Found' : 'Missing');

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkStorage() {
    console.log('Checking Supabase Storage...');

    // 1. Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
        console.error('Error listing buckets:', listError.message);
        return;
    }

    console.log('Buckets found:', buckets.map(b => b.name));

    const bucketName = 'portfolio-images';
    const bucket = buckets.find(b => b.name === bucketName);
    let bucketReady = false;

    if (bucket) {
        console.log(`Bucket '${bucketName}' EXISTS.`);
        bucketReady = true;
    } else {
        console.error(`Bucket '${bucketName}' DOES NOT EXIST.`);
        console.log('Attempting to create bucket...');

        try {
            const { data, error: createError } = await supabase.storage.createBucket(bucketName, {
                public: true
            });

            if (createError) {
                console.error('Failed to create bucket via API:', createError.message);
                console.log('Manual Action Required: Create a PUBLIC bucket named "portfolio-images" in your Supabase Dashboard.');
            } else {
                console.log(`Bucket '${bucketName}' CREATED successfully.`);
                bucketReady = true;
            }
        } catch (e) {
            console.error('Exception creating bucket:', e.message);
        }
    }

    // 2. Try uploading a test file
    if (bucketReady) {
        console.log('Attempting test upload...');
        const testContent = Buffer.from('Test upload content'); // dummy buffer
        const fileName = `test-upload-${Date.now()}.txt`;

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from(bucketName)
            .upload(fileName, testContent);

        if (uploadError) {
            console.error('Upload FAILED:', uploadError.message);
            console.log('Suggestion: Check RLS policies. The user (Anon/Auth) must have permission to INSERT into storage.objects.');
        } else {
            console.log('Upload SUCCESS:', uploadData);
            // clean up
            await supabase.storage.from(bucketName).remove([fileName]);
        }
    }
}

checkStorage().catch(err => console.error('Unhandled script error:', err));
