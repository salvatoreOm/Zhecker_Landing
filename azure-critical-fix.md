# 🚨 CRITICAL: Azure Node.js Version Fix Required

## Issues Identified from Logs
1. **Azure is using Node.js v22.17.0** instead of required v20
2. **Container expects port 8080** not 8000
3. **MODULE_NOT_FOUND error** due to version incompatibility

## Immediate Azure Portal Fixes Required

### 1. CRITICAL: Force Node.js 20 in Azure Portal
**Azure Portal → App Service → Configuration → General Settings:**

Change these settings:
- **Runtime Stack**: Node.js
- **Major Version**: 20 (NOT 22!)
- **Minor Version**: LTS
- **Startup Command**: `node server.js`

### 2. CRITICAL: Add Environment Variables
**Azure Portal → App Service → Configuration → Application Settings:**

Add EXACTLY these variables:
```
WEBSITE_NODE_DEFAULT_VERSION=20-lts
NODE_ENV=production
SCM_DO_BUILD_DURING_DEPLOYMENT=true
PORT=8080
EMAIL_USER=yuvrajsinghchauha@Zhecker.com
EMAIL_PASSWORD=LetsBuildZhecker123#
```

### 3. Alternative: Use Docker Container Settings
If the above doesn't work, try these container settings:
**Azure Portal → App Service → Deployment Center → Settings:**
- **Registry**: Docker Hub
- **Image**: `node:20-alpine`
- **Tag**: `latest`

## Code Changes Made
- ✅ Fixed port to 8080 (Azure container requirement)
- ✅ Updated web.config for better Node.js path detection
- ✅ Maintained .nvmrc file for Node.js 20 specification

## Manual Commands to Deploy
```bash
git add .
git commit -m "Fix Azure Node.js version and port configuration"
git push origin main
```

## Critical Next Steps
1. **Change Node.js version in Azure Portal to 20**
2. **Add the environment variables above**
3. **Push the code changes**
4. **Restart the Azure App Service**

The Node.js version mismatch is causing the MODULE_NOT_FOUND error. This MUST be fixed in Azure Portal first!