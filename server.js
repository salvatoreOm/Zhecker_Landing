// Azure Web App entry point
// This file ensures proper startup in Azure App Service environment

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set NODE_ENV for Azure
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Set the correct port from Azure environment
const port = process.env.PORT || 3000;
process.env.PORT = port;

console.log(`🚀 Starting Zhecker Landing Page on Azure...`);
console.log(`📍 Working directory: ${process.cwd()}`);
console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
console.log(`🔌 Port: ${port}`);

// Import and start the main application
try {
  const appPath = resolve(__dirname, 'dist', 'index.js');
  console.log(`📂 Loading app from: ${appPath}`);
  
  await import(appPath);
  console.log('✅ Zhecker Landing Page started successfully on Azure!');
} catch (error) {
  console.error('❌ Failed to start application:', error);
  console.error('Stack trace:', error.stack);
  process.exit(1);
}