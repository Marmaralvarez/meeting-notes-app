const fs = require('fs');
const path = require('path');

// Determine output directory (Vercel uses .vercel/output/static, local uses public)
const isVercel = process.env.VERCEL === '1';
const outputDir = isVercel ? '.vercel/output/static' : './public';
const inputDir = './public';

console.log('Build environment:', isVercel ? 'Vercel' : 'Local');
console.log('Input directory:', inputDir);
console.log('Output directory:', outputDir);

// Create output directory if it doesn't exist (for Vercel)
if (isVercel && !fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log('Created output directory:', outputDir);
}

// Read the HTML files from input directory
let loginHtml = fs.readFileSync(path.join(inputDir, 'login.html'), 'utf8');
let appHtml = fs.readFileSync(path.join(inputDir, 'app.html'), 'utf8');
let resetHtml = fs.readFileSync(path.join(inputDir, 'reset-password.html'), 'utf8');

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || '';

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

// Write the files to output directory
fs.writeFileSync(path.join(outputDir, 'login.html'), loginHtml);
fs.writeFileSync(path.join(outputDir, 'app.html'), appHtml);
fs.writeFileSync(path.join(outputDir, 'reset-password.html'), resetHtml);

// Copy favicon if exists
const faviconPath = path.join(inputDir, 'favicon.ico');
if (fs.existsSync(faviconPath)) {
  fs.copyFileSync(faviconPath, path.join(outputDir, 'favicon.ico'));
  console.log('Copied favicon.ico');
}

// Create Vercel Build Output API config if on Vercel
if (isVercel) {
  const configDir = '.vercel/output';
  const config = {
    version: 3,
    routes: [
      { src: '/', dest: '/login.html' },
      { src: '/app', dest: '/app.html' },
      { src: '/login', dest: '/login.html' },
      { src: '/reset-password', dest: '/reset-password.html' }
    ]
  };

  fs.writeFileSync(
    path.join(configDir, 'config.json'),
    JSON.stringify(config, null, 2)
  );
  console.log('Created Vercel config.json');
}

console.log('✅ Build complete! Environment variables injected into HTML files.');
console.log('✅ Output written to:', outputDir);
