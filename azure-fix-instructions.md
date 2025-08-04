# 🔧 URGENT: Azure Fix Instructions

Your website is failing because Azure is using Node.js v22 instead of v20. Here's exactly what to fix:

## 🚨 Critical Azure Portal Settings

### 1. Set Node.js Version to 20
**Azure Portal → App Service → Configuration → General Settings:**

- **Runtime Stack**: Node.js
- **Major Version**: 20
- **Minor Version**: LTS
- **Startup Command**: `node server.js`

### 2. Required Application Settings
**Azure Portal → App Service → Configuration → Application Settings:**

Add these EXACT environment variables:
```
WEBSITE_NODE_DEFAULT_VERSION=~20
NODE_ENV=production
SCM_DO_BUILD_DURING_DEPLOYMENT=true
EMAIL_USER=yuvrajsinghchauha@Zhecker.com
EMAIL_PASSWORD=LetsBuildZhecker123#
```

## 🚀 Deploy the Fixed Code

1. **Commit and push the fixes:**
   ```bash
   git add .
   git commit -m "Fix Azure Node.js version compatibility"
   git push origin main
   ```

2. **GitHub Actions will automatically redeploy**

## 🔍 What I Fixed

1. **Updated `server.js`** - Made it compatible with both Node.js versions
2. **Added `.nvmrc`** - Specifies Node.js 20 requirement
3. **Enhanced `web.config`** - Forces Node.js 20 path
4. **Better error logging** - Shows exactly what's missing

## ✅ After Deployment

Test these URLs:
- **Health**: https://zheck.azurewebsites.net/health
- **Website**: https://zheck.azurewebsites.net/

## 🆘 If Still Failing

Check Azure logs for:
- "Node.js version: v20.x.x" (should show v20, not v22)
- "✅ Zhecker Landing Page started successfully"
- Any MODULE_NOT_FOUND errors

The Node.js version mismatch was the root cause. These fixes will resolve it!