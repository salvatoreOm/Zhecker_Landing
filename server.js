// Azure Web App entry point - CommonJS version for compatibility
const { resolve } = require('path');
const { existsSync } = require('fs');

// Set NODE_ENV for Azure
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Set the correct port from Azure environment
const port = process.env.PORT || 8000;
process.env.PORT = port;

console.log('🚀 Starting Zhecker Landing Page on Azure...');
console.log('📍 Working directory:', process.cwd());
console.log('🌍 Environment:', process.env.NODE_ENV);
console.log('🔌 Port:', port);
console.log('📦 Node.js version:', process.version);

// Check if dist directory exists
const distPath = resolve(__dirname, 'dist');
const appPath = resolve(distPath, 'index.js');

console.log('📂 Checking paths:');
console.log('   dist directory:', distPath, existsSync(distPath) ? '✅' : '❌');
console.log('   app file:', appPath, existsSync(appPath) ? '✅' : '❌');

if (!existsSync(appPath)) {
  console.error('❌ Application file not found. Build may have failed.');
  console.error('📁 Directory contents:');
  try {
    const fs = require('fs');
    console.log('Root:', fs.readdirSync(__dirname));
    if (existsSync(distPath)) {
      console.log('Dist:', fs.readdirSync(distPath));
    }
  } catch (e) {
    console.error('Could not read directory:', e.message);
  }
  process.exit(1);
}

// Import and start the main application using dynamic import
import(appPath)
  .then(() => {
    console.log('✅ Zhecker Landing Page started successfully on Azure!');
  })
  .catch((error) => {
    console.error('❌ Failed to start application:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  });