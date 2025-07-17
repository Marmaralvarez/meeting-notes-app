const fs = require('fs');

// Read the HTML files
let loginHtml = fs.readFileSync('./public/login.html', 'utf8');
let appHtml = fs.readFileSync('./public/app.html', 'utf8');

// Replace placeholders with env variables
loginHtml = loginHtml.replace('YOUR_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL || '');
loginHtml = loginHtml.replace('YOUR_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');

appHtml = appHtml.replace('YOUR_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL || '');
appHtml = appHtml.replace('YOUR_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');

// Write the files back
fs.writeFileSync('./public/login.html', loginHtml);
fs.writeFileSync('./public/app.html', appHtml);

console.log('Build complete!');
