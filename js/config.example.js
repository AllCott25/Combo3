// Configuration Example for COMBO MEAL
// Copy this file to js/config.js and update with your actual values
// DO NOT commit js/config.js to version control!

// Method 1: Direct injection (for development)
window.SUPABASE_URL = 'your-supabase-project-url';
window.SUPABASE_ANON_KEY = 'your-supabase-anon-key';

// Method 2: Using environment variables with a build process
// window.SUPABASE_URL = process.env.SUPABASE_URL;
// window.SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Method 3: Server-side injection (recommended for production)
// Have your server inject these values into the HTML before serving