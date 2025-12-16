# Login Troubleshooting Guide

Since you already have environment variables set in Vercel but login still doesn't work, here are the most likely issues:

## 🔍 Issue #1: Build Process Not Running (MOST LIKELY)

Even though we added `"buildCommand": "npm run build"` to vercel.json, **Vercel might be using a cached deployment from before this change**.

### Solution:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Deployments** tab
4. Click on the latest deployment
5. Click the **⋯** (three dots menu)
6. Select **Redeploy**
7. **IMPORTANT:** Uncheck "Use existing Build Cache"
8. Click **Redeploy**

This forces a fresh build that will:
- Run `npm run build`
- Replace placeholder credentials with your env vars
- Deploy the updated HTML files

### Verify Build Ran:
After redeployment, check the deployment logs:
- Should see: `npm run build` command
- Should see: `✅ Build complete! Environment variables injected into HTML files.`

---

## 🔍 Issue #2: Supabase Project Paused (COMMON)

Free tier Supabase projects automatically pause after **1 week of inactivity**.

### Check if paused:
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Look for a yellow/orange banner saying "Project Paused"

### Solution:
- Click the **"Resume"** or **"Restore"** button
- Wait 1-2 minutes for project to become active

---

## 🔍 Issue #3: Verify Current Credentials

### Get your current Supabase credentials:
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Note down:
   - **Project URL** (e.g., `https://abcdefgh.supabase.co`)
   - **Project API keys** → **anon** → **public** (long JWT token)

### Compare with Vercel:
1. Go to Vercel Dashboard → Your Project
2. Go to **Settings** → **Environment Variables**
3. Click the 👁️ icon to reveal values
4. Compare:
   - `NEXT_PUBLIC_SUPABASE_URL` should match Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` should match anon public key

### If they don't match:
- Update the values in Vercel
- Redeploy (without cache)

---

## 🔍 Issue #4: Check What's Actually Deployed

### Test in browser console:
1. Open your deployed app: `https://your-app.vercel.app/login.html`
2. Right-click → **Inspect** → **Console** tab
3. Type this and press Enter:

```javascript
console.log('SUPABASE_URL:', SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', SUPABASE_ANON_KEY ? 'Set (length: ' + SUPABASE_ANON_KEY.length + ')' : 'Not set');
```

**If you see:**
- `YOUR_SUPABASE_URL` → Build didn't run, need to redeploy without cache
- `https://xxxxx.supabase.co` → Credentials injected correctly, check if Supabase project is paused

---

## 🔍 Issue #5: Authentication Errors

### Check browser console for errors:
1. Open login page
2. Try to login
3. Check Console tab for error messages

**Common errors:**

**"Invalid API key"** or **"API key not found"**:
- Supabase project might be paused
- Or anon key is incorrect/expired

**"Failed to fetch"** or **CORS errors**:
- Supabase project is paused
- Or Supabase URL is wrong

**"Invalid login credentials"**:
- This is actually GOOD - means Supabase connection works
- User just entered wrong email/password

---

## ✅ Quick Checklist

Run through this checklist:

- [ ] Supabase project is **active** (not paused)
- [ ] Environment variables are set in Vercel (all environments)
- [ ] Latest commit includes `buildCommand` in vercel.json
- [ ] Redeployed **without cache** after adding buildCommand
- [ ] Build logs show "Build complete! Environment variables injected"
- [ ] Browser console shows actual URL, not 'YOUR_SUPABASE_URL'

---

## 🆘 Still Not Working?

If you've tried everything above:

1. **Share the error message** from browser console when trying to login
2. **Check deployment logs** in Vercel - paste any errors
3. **Verify Supabase status** - is there a status page showing issues?

Most login issues are caused by:
1. **Cached builds** (90% of cases) - Fix: Redeploy without cache
2. **Paused Supabase projects** (8% of cases) - Fix: Resume project
3. **Wrong credentials** (2% of cases) - Fix: Verify and update env vars
