# Azure Web App Deployment Guide

This guide explains how to deploy the Zhecker Landing Page to Azure App Service.

## Prerequisites

- Azure subscription
- GitHub repository connected to Azure App Service
- Azure CLI (optional, for local management)

## Deployment Configuration

### Files Created for Azure:
- `web.config` - IIS configuration for proper routing
- `.deployment` - Deployment configuration
- `package.json` - Updated with Node.js engines specification

### GitHub Actions Workflow
The project uses `.github/workflows/main_zheck.yml` for automatic deployment:
- Triggers on push to `main` branch
- Builds the application using Node.js 20.x
- Deploys to Azure App Service named "Zheck"

## Azure App Service Configuration

### 1. Application Settings (Environment Variables)

In your Azure App Service, configure these application settings:

#### Required for Email Service:
```
EMAIL_USER=yuvrajsinghchauha@Zhecker.com
EMAIL_PASSWORD=LetsBuildZhecker123#
```

#### Optional (if using database):
```
DATABASE_URL=your-database-connection-string
```

#### Node.js Settings:
```
WEBSITE_NODE_DEFAULT_VERSION=~20
SCM_DO_BUILD_DURING_DEPLOYMENT=true
```

### 2. Startup Command

Set the startup command in Azure App Service:
```
node dist/index.js
```

### 3. General Settings

- **Stack**: Node.js
- **Major version**: 20
- **Minor version**: LTS
- **Startup Command**: `node dist/index.js`

## Deployment Steps

### Automatic Deployment (Recommended)

1. **Connect GitHub Repository**:
   - Go to Azure Portal → App Service → Deployment Center
   - Select GitHub as source
   - Authorize and select your repository
   - Select `main` branch

2. **Configure Secrets** (if not already done):
   The following secrets should be configured in your GitHub repository:
   - `AZUREAPPSERVICE_CLIENTID_7B06DFB09E9248A1977375A2542F4338`
   - `AZUREAPPSERVICE_TENANTID_CB6692794B84478D8D4A9C0DEBBE556A`
   - `AZUREAPPSERVICE_SUBSCRIPTIONID_D97080276912466B96634E786DD2D9BF`

3. **Push to Main Branch**:
   ```bash
   git add .
   git commit -m "Configure for Azure deployment"
   git push origin main
   ```

### Manual Deployment

If you prefer manual deployment:

1. **Build the Application**:
   ```bash
   npm install
   npm run build
   ```

2. **Deploy using Azure CLI**:
   ```bash
   az webapp up --name Zheck --resource-group your-resource-group
   ```

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check Node.js version compatibility
   - Ensure all dependencies are in `dependencies` (not `devDependencies`)

2. **Runtime Errors**:
   - Check Application Logs in Azure Portal
   - Verify environment variables are set correctly

3. **Routing Issues**:
   - Ensure `web.config` is properly configured
   - Check that static files are being served correctly

### Viewing Logs:

1. **Azure Portal**:
   - Go to App Service → Monitoring → Log stream

2. **Local Azure CLI**:
   ```bash
   az webapp log tail --name Zheck --resource-group your-resource-group
   ```

## Production Checklist

Before deploying to production:

- [ ] Set up email configuration (`EMAIL_USER`, `EMAIL_PASSWORD`)
- [ ] Configure custom domain (if applicable)
- [ ] Set up SSL certificate
- [ ] Configure monitoring and alerts
- [ ] Test email notifications
- [ ] Verify all contact information is correct
- [ ] Test subscription form functionality

## Security Notes

- Never commit sensitive environment variables to the repository
- Use Azure Key Vault for sensitive configuration (advanced)
- Enable HTTPS only in Azure App Service settings
- Consider using managed identity for Azure services

## Support

For Azure-specific issues:
- Azure Documentation: https://docs.microsoft.com/azure/app-service/
- Azure Support: Available through Azure Portal

For application issues:
- Check logs in Azure Portal
- Contact: info@zhecker.com