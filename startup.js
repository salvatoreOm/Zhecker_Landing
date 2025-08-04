// Azure App Service startup script
// This file ensures proper startup in Azure environment

// Set production environment
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Import and start the main application
import('./dist/index.js')
  .then(() => {
    console.log('🚀 Zhecker Landing Page started successfully in Azure!');
  })
  .catch((error) => {
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  });