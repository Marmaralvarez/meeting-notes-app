# How to Verify Supabase Credentials

## Check if Supabase URL/Key Changed

### 1. Check Supabase Dashboard

Go to your Supabase project:
1. Visit https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Check these values:

**Project URL:**
- Should match your `NEXT_PUBLIC_SUPABASE_URL` in Vercel
- Format: `https://xxxxxxxxxxxxx.supabase.co`

**API Keys (anon public):**
- Should match your `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel
- This is a long JWT token starting with `eyJ...`

### 2. Test Supabase Connection

You can test if your Supabase credentials are valid by running this in browser console on your site:

```javascript
// Test connection
const testSupabase = async () => {
    const SUPABASE_URL = 'YOUR_URL_FROM_VERCEL';
    const SUPABASE_ANON_KEY = 'YOUR_KEY_FROM_VERCEL';

    const { createClient } = supabase;
    const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data, error } = await client.auth.getSession();
    console.log('Connection test:', { data, error });
};

testSupabase();
```

### 3. Common Issues

**Supabase Project Paused:**
- Free tier Supabase projects pause after 1 week of inactivity
- Check if your project is paused in Supabase dashboard
- If paused, click "Resume" button

**Organization/Project Deleted:**
- Verify the project still exists in your Supabase dashboard
- Check if you're logged into the correct Supabase account

**API Keys Rotated:**
- If you manually rotated your API keys in Supabase, you need to update them in Vercel
- Anon keys rarely change unless manually rotated

### 4. Force Vercel Rebuild

Even if env vars are set, the build might not have run:

1. Go to Vercel Dashboard → Your Project
2. Click on **Deployments** tab
3. Find the latest deployment
4. Click the three dots (...) → **Redeploy**
5. Make sure "Use existing Build Cache" is **UNCHECKED**
6. Click **Redeploy**

This will force a fresh build with your environment variables.

### 5. Verify Build Actually Ran

After redeployment:
1. Check deployment logs for "npm run build" output
2. Should see: "✅ Build complete! Environment variables injected into HTML files."
3. If you don't see this, the build script didn't run

### 6. Quick Test Command

To verify what's actually deployed, run:

```bash
curl https://your-app.vercel.app/login.html | grep "const SUPABASE_URL"
```

If you see `YOUR_SUPABASE_URL`, the build didn't inject the env vars.
If you see `https://xxxxx.supabase.co`, the build worked correctly.
