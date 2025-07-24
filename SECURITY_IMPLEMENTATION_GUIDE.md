# 🔒 COMBO MEAL Security Implementation Guide (Step-by-Step)

This guide will walk you through implementing all security updates. Follow each step carefully.

---

## 📋 Table of Contents
1. [Part 1: Local Setup (5 minutes)](#part-1-local-setup)
2. [Part 2: Supabase Setup (15 minutes)](#part-2-supabase-setup)
3. [Part 3: Cloudflare Setup (10 minutes)](#part-3-cloudflare-setup)
4. [Part 4: Testing Everything (5 minutes)](#part-4-testing)

---

## Part 1: Local Setup (5 minutes) {#part-1-local-setup}

### Step 1.1: Create Your Config File

1. **Open your project folder** in your file manager
2. **Navigate to** the `js` folder
3. **Find** the file named `config.example.js`
4. **Copy** this file (Ctrl+C or Cmd+C)
5. **Paste** it in the same folder (Ctrl+V or Cmd+V)
6. **Rename** the copied file to exactly: `config.js`

### Step 1.2: Get Your Supabase Credentials

1. **Go to** [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **Log in** to your account
3. **Click** on your COMBO MEAL project
4. **Click** on the "Settings" icon (⚙️) in the left sidebar
5. **Click** on "API" under Configuration
6. You'll see two important values:
   - **Project URL**: Looks like `https://xxxxxxxxxxxxx.supabase.co`
   - **Project API keys - anon/public**: A long string starting with `eyJ...`

### Step 1.3: Update Your Config File

1. **Open** `js/config.js` in a text editor (Notepad, VS Code, etc.)
2. **Replace** the placeholder values:

```javascript
// BEFORE (what you'll see):
window.SUPABASE_URL = 'your-supabase-project-url';
window.SUPABASE_ANON_KEY = 'your-supabase-anon-key';

// AFTER (example - use YOUR values):
window.SUPABASE_URL = 'https://ovrvtfjejmhrflybslwi.supabase.co';
window.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

3. **Save** the file (Ctrl+S or Cmd+S)

### Step 1.4: Update Test Passwords (Optional)

If you use the test files:

1. **Open** `js/test-game.js`
2. **Find** the line with `CHANGE_THIS_PASSWORD`
3. **Replace** it with a secure password you'll remember
4. **Save** the file

---

## Part 2: Supabase Setup (15 minutes) {#part-2-supabase-setup}

### Step 2.1: Open Supabase SQL Editor

1. **Go to** your Supabase project dashboard
2. **Click** on "SQL Editor" in the left sidebar (it looks like: `< >`​)
3. **Click** the "+ New query" button

### Step 2.2: Create Admin Logs Table

1. **Copy** this entire code block:

```sql
-- Create admin logs table for security auditing
CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  details JSONB,
  ip_address TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- Create policy so only admins can view logs
CREATE POLICY "Only admins can view logs" 
ON admin_logs FOR SELECT 
USING (
  auth.jwt() ->> 'role' = 'admin' 
  OR auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
);
```

2. **Paste** it into the SQL editor
3. **Click** "Run" button (or press F5)
4. You should see "Success. No rows returned"

### Step 2.3: Create Admin Verification Function

1. **Click** "+ New query" again
2. **Copy** this entire code block:

```sql
-- Create function to verify if a user is an admin
CREATE OR REPLACE FUNCTION verify_admin_access(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if user has admin role
  RETURN EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = user_id 
    AND (
      raw_user_meta_data->>'role' = 'admin' 
      OR raw_app_metadata->>'role' = 'admin'
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION verify_admin_access TO authenticated;
```

3. **Paste** and **Run** it
4. You should see "Success. No rows returned"

### Step 2.4: Set Up Your Admin User

**IMPORTANT**: Replace `your-email@example.com` with YOUR actual admin email!

1. **Click** "+ New query" again
2. **Copy** this code and **EDIT THE EMAIL**:

```sql
-- Replace 'your-email@example.com' with YOUR admin email
UPDATE auth.users 
SET raw_app_metadata = jsonb_set(
  COALESCE(raw_app_metadata, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'your-email@example.com';
```

3. **Change** `your-email@example.com` to your actual email
4. **Run** the query
5. You should see "Success. 1 row(s) updated"

### Step 2.5: Add Row Level Security to Your Tables

1. **Click** "+ New query" again
2. **Copy** and run each of these blocks ONE AT A TIME:

**For recipes table:**
```sql
-- Enable RLS on recipes table
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Everyone can read recipes
CREATE POLICY "Recipes are viewable by everyone" 
ON recipes FOR SELECT 
USING (true);

-- Only admins can modify recipes
CREATE POLICY "Only admins can modify recipes" 
ON recipes FOR INSERT 
USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

CREATE POLICY "Only admins can update recipes" 
ON recipes FOR UPDATE 
USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

CREATE POLICY "Only admins can delete recipes" 
ON recipes FOR DELETE 
USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');
```

**For game_sessions table:**
```sql
-- Enable RLS on game_sessions
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;

-- Users can only see their own sessions
CREATE POLICY "Users can view own sessions" 
ON game_sessions FOR SELECT 
USING (
  auth.uid() = user_id 
  OR session_id = current_setting('request.headers')::json->>'device-fingerprint'
);

-- Users can create their own sessions
CREATE POLICY "Users can create own sessions" 
ON game_sessions FOR INSERT 
WITH CHECK (
  auth.uid() = user_id 
  OR user_id IS NULL
);

-- Users can update their own sessions
CREATE POLICY "Users can update own sessions" 
ON game_sessions FOR UPDATE 
USING (
  auth.uid() = user_id 
  OR session_id = current_setting('request.headers')::json->>'device-fingerprint'
);
```

---

## Part 3: Cloudflare Setup (10 minutes) {#part-3-cloudflare-setup}

### Step 3.1: Create Environment Variables in Cloudflare

1. **Log in** to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. **Select** your domain (playsker.com)
3. **Click** on "Workers & Pages" in the left sidebar
4. **Click** on your worker (or create one if needed)
5. **Click** on "Settings" tab
6. **Click** on "Variables" 
7. **Add** these environment variables:
   - Click "Add variable"
   - Variable name: `SUPABASE_URL`
   - Value: Your Supabase URL (from Step 1.2)
   - Click "Save"
8. **Repeat** for:
   - Variable name: `SUPABASE_ANON_KEY`
   - Value: Your Supabase anon key (from Step 1.2)

### Step 3.2: Create Cloudflare Worker

1. **Go to** "Workers & Pages" → "Create application"
2. **Click** "Create Worker"
3. **Name it** something like `combo-meal-security`
4. **Click** "Deploy"
5. **Click** "Edit code"
6. **Delete** all existing code
7. **Copy** and paste this ENTIRE code:

```javascript
export default {
  async fetch(request, env, ctx) {
    // Get the original response
    const response = await fetch(request);
    
    // Only modify HTML responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('text/html')) {
      return response;
    }
    
    // Get the HTML content
    let html = await response.text();
    
    // Inject the Supabase credentials
    const injection = `
    <script>
      window.SUPABASE_URL = '${env.SUPABASE_URL}';
      window.SUPABASE_ANON_KEY = '${env.SUPABASE_ANON_KEY}';
    </script>`;
    
    // Replace the config.js script tag with our injection
    html = html.replace(
      '<script src="js/config.js"></script>',
      injection
    );
    
    // Return modified response
    return new Response(html, {
      headers: response.headers
    });
  }
};
```

8. **Click** "Save and deploy"

### Step 3.3: Route Your Domain Through the Worker

1. **Go back** to your domain in Cloudflare
2. **Click** on "Workers Routes" 
3. **Click** "Add route"
4. **Enter**:
   - Route: `*playsker.com/*` (or your domain)
   - Worker: Select `combo-meal-security`
5. **Click** "Save"

### Step 3.4: Delete the Local Config File from Production

**IMPORTANT**: After Cloudflare is working, remove the config.js from your live site:

1. **Delete** `js/config.js` from your production server
2. **Keep** it locally for development
3. The Cloudflare worker will inject the credentials instead

---

## Part 4: Testing Everything {#part-4-testing}

### Test 1: Check Credentials Are Hidden

1. **Open** your website in Chrome/Firefox
2. **Right-click** → "View Page Source"
3. **Search** (Ctrl+F) for "supabase"
4. **Verify** you DON'T see your actual credentials
5. You should see `YOUR_SUPABASE_URL_HERE` or the injected script

### Test 2: Test Admin Login

1. **Go to** `yourdomain.com/admin.html`
2. **Try** logging in with:
   - A non-admin email → Should fail
   - Your admin email → Should succeed
3. **Wait** 5 minutes while logged in
4. **Verify** session validation works (no logout)

### Test 3: Test Game Still Works

1. **Go to** your main game page
2. **Verify** the game loads properly
3. **Try** playing a round
4. **Check** that recipes load correctly

### Test 4: Security Audit

Run these checks:

1. **Open** Developer Tools (F12)
2. **Go to** Console tab
3. **Type**: `window.SUPABASE_KEY` and press Enter
4. **Verify** it shows your key (this is OK - it's the anon key)
5. **Type**: `SecurityUtils` and press Enter
6. **Verify** it shows the security object

---

## 🚨 Troubleshooting

### "Supabase credentials not properly configured" Error

**Solution**:
1. Check that `js/config.js` exists locally
2. Verify the values are wrapped in quotes
3. Check for typos in variable names
4. If using Cloudflare, check the worker is active

### "Unauthorized: Admin access required" Error

**Solution**:
1. Make sure you ran the SQL to set your admin role
2. Use the exact email you registered with
3. Try logging out and back in
4. Check the auth.users table in Supabase

### Game Won't Load

**Solution**:
1. Check browser console for errors (F12)
2. Verify Supabase URL is correct (no trailing slash)
3. Make sure you're using the anon/public key, NOT the service key
4. Clear browser cache and cookies

### Cloudflare Worker Not Working

**Solution**:
1. Check worker route matches your domain
2. Verify environment variables are set
3. Check worker logs in Cloudflare dashboard
4. Make sure worker is deployed and active

---

## 📞 Getting Help

If you're stuck:

1. **First**: Read the error message carefully
2. **Check**: Browser console (F12) for detailed errors
3. **Verify**: You followed each step exactly
4. **Try**: The troubleshooting section above
5. **Document**: 
   - What step you're on
   - Exact error message
   - Screenshot of the issue

Remember: These security updates are critical for protecting your game and user data. Take your time and follow each step carefully.

---

## ✅ Completion Checklist

- [ ] Created `js/config.js` with your credentials
- [ ] Created admin_logs table in Supabase
- [ ] Created verify_admin_access function
- [ ] Set your user as admin in Supabase
- [ ] Added Row Level Security policies
- [ ] Set up Cloudflare environment variables
- [ ] Created and deployed Cloudflare worker
- [ ] Tested admin login works
- [ ] Verified credentials are hidden in production
- [ ] Deleted `js/config.js` from production (kept locally)

Once all boxes are checked, your security updates are complete! 🎉