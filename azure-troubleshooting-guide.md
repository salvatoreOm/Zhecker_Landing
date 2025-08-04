# 🚨 Azure Website Not Opening - Fix Guide

Your website isn't opening on Azure. Here are the fixes I've applied and what you need to do:

## ✅ Fixed Issues

### 1. **Fixed Entry Point**
- ✅ Created `server.js` as the main Azure entry point
- ✅ Updated `web.config` to use `server.js` instead of `dist/index.js` 
- ✅ Added proper Azure environment detection and logging

### 2. **Azure-Specific Configuration**
- ✅ Server now properly binds to `0.0.0.0` in production (Azure requirement)
- ✅ Uses `process.env.PORT` from Azure environment
- ✅ Enhanced startup logging for Azure debugging

## 🔧 Required Azure App Service Settings

**Go to Azure Portal → Your App Service → Configuration → Application Settings**

Add these environment variables:

```
NODE_ENV=production
WEBSITE_NODE_DEFAULT_VERSION=~20
SCM_DO_BUILD_DURING_DEPLOYMENT=true
EMAIL_USER=yuvrajsinghchauha@Zhecker.com
EMAIL_PASSWORD=LetsBuildZhecker123#
```

## 🎯 Critical Azure App Service Configuration

### Startup Command:
In Azure Portal → Configuration → General Settings:
**Startup Command**: `node server.js`

### Stack Settings:
- **Runtime Stack**: Node.js
- **Major Version**: 20
- **Minor Version**: LTS
- **Platform**: 64-bit

## 🚀 Deployment Steps

### Option 1: GitHub Actions (Automatic)
1. Push your changes to `main` branch:
   ```bash
   git add .
   git commit -m "Fix Azure deployment configuration"
   git push origin main
   ```
2. GitHub Actions will automatically deploy

### Option 2: Manual Deployment
1. Build locally:
   ```bash
   npm run build
   ```
2. Deploy via Azure CLI:
   ```bash
   az webapp up --name Zheck --resource-group your-resource-group
   ```

## 🔍 Debugging Steps

### 1. Check Logs in Azure Portal
- Go to **App Service → Monitoring → Log Stream**
- Look for startup errors or application logs

### 2. Test Health Endpoint
- Visit: `https://zheck.azurewebsites.net/health`
- Should return JSON with status information

### 3. Common Error Messages & Solutions

**"Application Error"**
- Check startup command is set to `node server.js`
- Verify Node.js version is set to 20

**"502 Bad Gateway"**
- App isn't starting properly
- Check Application Logs for errors
- Verify all environment variables are set

**"404 Not Found"**
- Static files aren't being served
- Check that build completed successfully
- Verify `dist/` directory exists

## 📊 Verify Successful Deployment

1. **Health Check**: `https://zheck.azurewebsites.net/health`
2. **Landing Page**: `https://zheck.azurewebsites.net/`
3. **API Test**: `POST https://zheck.azurewebsites.net/api/subscriptions`

## 🆘 If Still Not Working

### Check These in Order:

1. **Azure Portal Logs**:
   - App Service → Monitoring → Log Stream
   - Look for Node.js startup errors

2. **Build Verification**:
   - Ensure GitHub Actions completed successfully
   - Check that `dist/` folder was created

3. **Environment Variables**:
   - Verify all required settings are configured
   - Check for typos in variable names

4. **Startup Command**:
   - Must be exactly: `node server.js`
   - Not `npm start` or `node dist/index.js`

## 📞 Next Steps

1. **Deploy the fixes** using one of the deployment methods above
2. **Set the required environment variables** in Azure Portal
3. **Update the startup command** to `node server.js`
4. **Check the logs** if it still doesn't work

The website should now open successfully on Azure! Let me know if you see any specific error messages in the Azure logs.