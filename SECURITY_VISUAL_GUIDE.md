# 📸 Visual Guide - Where to Click

This guide shows you exactly where to find everything mentioned in the security setup.

---

## 🟦 Supabase Dashboard Navigation

### Finding Your Credentials
```
Supabase Dashboard Layout:
┌─────────────────────────────────────┐
│ [Your Project Name]                 │
├─────────────────────────────────────┤
│ 🏠 Home                             │
│ 📊 Table Editor                     │
│ 📝 SQL Editor     ← Click this      │
│ 🔐 Authentication                   │
│ 💾 Storage                          │
│ ⚡ Edge Functions                   │
│ ⚙️ Settings       ← Then this       │
│    └── API       ← Finally this     │
└─────────────────────────────────────┘
```

### What You'll See in API Settings
```
Project API
┌─────────────────────────────────────┐
│ Project URL                         │
│ ┌─────────────────────────────────┐ │
│ │ https://xxxxx.supabase.co       │ │ ← Copy this
│ └─────────────────────────────────┘ │
│                                     │
│ Project API keys                    │
│ ┌─────────────────────────────────┐ │
│ │ anon/public                     │ │
│ │ eyJhbGciOiJIUzI1NiIs...        │ │ ← Copy this
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## 🟧 Cloudflare Dashboard Navigation

### Creating a Worker
```
Cloudflare Dashboard:
┌─────────────────────────────────────┐
│ Your Domain (playsker.com)          │
├─────────────────────────────────────┤
│ 🏠 Overview                         │
│ 📈 Analytics                        │
│ 🔒 SSL/TLS                          │
│ 🛡️ Security                         │
│ ⚡ Workers & Pages  ← Click this    │
│    └── Create application           │
│        └── Create Worker            │
└─────────────────────────────────────┘
```

### Worker Settings
```
Worker Dashboard:
┌─────────────────────────────────────┐
│ combo-meal-security                 │
├─────────────────────────────────────┤
│ [Metrics] [Logs] [Settings]         │
│                    ↑                │
│                Click Settings       │
│                                     │
│ Settings Page:                      │
│ ┌─────────────────────────────────┐ │
│ │ General | Variables | ...        │ │
│ │           ↑                      │ │
│ │       Click Variables            │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## 📁 File Structure in Your Project

### Where Files Should Be
```
your-project-folder/
│
├── index.html
├── admin.html
├── admin-tree.html
│
├── js/
│   ├── config.example.js  ← Copy this
│   ├── config.js         ← To create this (DON'T commit!)
│   ├── supabase.js       ← Modified
│   ├── admin.js          ← Modified
│   ├── security-utils.js ← New file
│   └── admin-auth.js     ← New file
│
├── css/
├── assets/
│
├── .gitignore           ← New file
├── SECURITY_UPDATES.md  ← Documentation
└── SECURITY_IMPLEMENTATION_GUIDE.md
```

---

## 🔍 What Success Looks Like

### ✅ Correct: Credentials Hidden
```html
<!-- View Page Source -->
<script src="js/security-utils.js"></script>
<script>
  window.SUPABASE_URL = 'https://xxxxx.supabase.co';
  window.SUPABASE_ANON_KEY = 'eyJ...';
</script>
```

### ❌ Wrong: Credentials in Code
```javascript
// In js/supabase.js - THIS IS BAD
const SUPABASE_URL = 'https://xxxxx.supabase.co';
const SUPABASE_KEY = 'eyJ...actual-key...';
```

---

## 🎯 Quick Reference - Copy/Paste Commands

### Local Terminal Commands
```bash
# Navigate to js folder
cd js

# Copy config example (Mac/Linux)
cp config.example.js config.js

# Copy config example (Windows)
copy config.example.js config.js

# Check if file exists
ls config.js  # Mac/Linux
dir config.js # Windows
```

### Browser Console Tests
```javascript
// Test 1: Check if config loaded
console.log(window.SUPABASE_URL);
// Should show: "https://xxxxx.supabase.co"

// Test 2: Check security utils
console.log(typeof SecurityUtils);
// Should show: "object"

// Test 3: Check admin auth
console.log(typeof AdminAuth);
// Should show: "object"
```

---

## 🚦 Status Indicators

### In Supabase SQL Editor
```
✅ Success Indicators:
- "Success. No rows returned"
- "Success. 1 row(s) updated"
- Green checkmark ✓

❌ Error Indicators:
- Red error message
- "Failed to run query"
- Usually means typo or missing table
```

### In Browser Console
```
✅ Good Messages:
- "Supabase client initialized"
- "Auth state changed: SIGNED_IN"
- No red errors

❌ Bad Messages:
- "Supabase credentials not properly configured"
- "401 Unauthorized"
- "TypeError: Cannot read property..."
```

---

## 💡 Pro Tips

1. **Always test locally first** before deploying
2. **Keep config.js in .gitignore** to prevent accidents
3. **Use browser incognito mode** to test as new user
4. **Check Supabase logs** for detailed error info
5. **Cloudflare workers** have logs - check them!

---

## 🆘 Emergency Fixes

### If You Accidentally Exposed Keys
1. Go to Supabase → Settings → API
2. Click "Roll API keys" immediately
3. Update all your config files
4. Check git history and remove if needed

### If Admin Login Broken
1. Use Supabase dashboard → SQL Editor
2. Run: `SELECT * FROM auth.users WHERE email = 'your-email';`
3. Check if `raw_app_metadata` has `"role": "admin"`
4. If not, run the UPDATE query again

### If Game Won't Load
1. Open browser console (F12)
2. Look for first red error
3. Usually it's:
   - Wrong URL format
   - Missing quotes in config
   - Using service key instead of anon key

---

Remember: Take it slow, follow each step, and test as you go! 🚀