const fs = require('fs');

// Read the HTML files
let loginHtml = fs.readFileSync('./public/login.html', 'utf8');
let appHtml = fs.readFileSync('./public/app.html', 'utf8');
let resetHtml = fs.readFileSync('./public/reset-password.html', 'utf8');

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

console.log('Building with Supabase URL:', supabaseUrl ? 'Present' : 'Missing');
console.log('Building with Anon Key:', supabaseAnonKey ? 'Present' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables!');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'SET' : 'MISSING');
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'SET' : 'MISSING');
  process.exit(1);
}

// Replace placeholders with env variables
loginHtml = loginHtml.replace(/YOUR_SUPABASE_URL/g, supabaseUrl);
loginHtml = loginHtml.replace(/YOUR_SUPABASE_ANON_KEY/g, supabaseAnonKey);

appHtml = appHtml.replace(/YOUR_SUPABASE_URL/g, supabaseUrl);
appHtml = appHtml.replace(/YOUR_SUPABASE_ANON_KEY/g, supabaseAnonKey);

resetHtml = resetHtml.replace(/YOUR_SUPABASE_URL/g, supabaseUrl);
resetHtml = resetHtml.replace(/YOUR_SUPABASE_ANON_KEY/g, supabaseAnonKey);

// Write the files back
fs.writeFileSync('./public/login.html', loginHtml);
fs.writeFileSync('./public/app.html', appHtml);
fs.writeFileSync('./public/reset-password.html', resetHtml);

console.log('✅ Build complete! Environment variables injected into HTML files.');
