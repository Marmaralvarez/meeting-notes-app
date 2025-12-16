# Deployment Guide - Meeting Notes App

## Login Issue Resolution

### Problem Identified
The login functionality was not working due to two issues:

1. **Missing Supabase Credentials**: The HTML files contained placeholder values for Supabase credentials instead of actual values
2. **Disabled Authentication Redirects**: Recent code changes removed the authentication redirect logic, allowing unauthenticated users to access protected pages

### Fixes Applied

#### 1. Restored Authentication Logic (app.html)
- Re-enabled authentication checks in `checkAuth()` function
- Users without valid sessions are now properly redirected to login page
- Added proper error handling for session errors
- Fixed `loadMeetingsFromDatabase()` to redirect on 401 unauthorized responses

#### 2. Updated Vercel Configuration (vercel.json)
- Added explicit `buildCommand: "npm run build"` to ensure build process runs
- Build process replaces Supabase placeholders with actual credentials from environment variables

### Required Environment Variables

For the app to work correctly, the following environment variables **MUST** be set in your Vercel project settings:

1. `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous/public key

### How to Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add the following variables:
   - Variable: `NEXT_PUBLIC_SUPABASE_URL`
     Value: `https://your-project.supabase.co`
   - Variable: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     Value: `your-anon-key-here`
4. Make sure to select all environments (Production, Preview, Development)
5. Save the changes
6. Redeploy your application

### How to Get Supabase Credentials

1. Log in to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** > **API**
4. Copy:
   - **Project URL** → Use as `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API keys** > **anon public** → Use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### After Setting Environment Variables

1. The build script will automatically inject these credentials into your HTML files
2. The login functionality will work correctly
3. Users will be able to authenticate and access the app

### Verification

After deployment, check:
1. View page source of login.html
2. Look for `const SUPABASE_URL = '...'`
3. It should contain your actual Supabase URL, not 'YOUR_SUPABASE_URL'

### Local Testing

To test locally with environment variables:

```bash
# Set environment variables (Mac/Linux)
export NEXT_PUBLIC_SUPABASE_URL='https://your-project.supabase.co'
export NEXT_PUBLIC_SUPABASE_ANON_KEY='your-anon-key-here'

# Run build
npm run build

# Check that placeholders were replaced in public/*.html files
```

## Security Notes

- Never commit actual Supabase credentials to the repository
- The anon/public key is safe to expose in client-side code
- Supabase RLS (Row Level Security) policies protect your data
- Always keep your service role key secret (not used in this frontend app)
