# Email Configuration Setup

This guide explains how to configure email notifications for subscription requests.

## Quick Setup

When someone subscribes via the landing page, an email notification will be sent to: **yuvrajsinghchauhan@Zhecker.com**

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-digit-app-password
```

## Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this 16-digit password (not your regular Gmail password)
3. **Update environment variables**:
   ```env
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=abcd-efgh-ijkl-mnop
   ```

## Other Email Providers

To use different email providers, modify `server/email.ts`:

### Outlook/Hotmail
```typescript
const EMAIL_CONFIG = {
  host: 'smtp.outlook.com',
  port: 587,
  // ... rest of config
};
```

### Custom SMTP
```typescript
const EMAIL_CONFIG = {
  host: 'your-smtp-server.com',
  port: 587, // or 465 for SSL
  secure: false, // true for SSL
  // ... rest of config
};
```

## Email Content

The notification email includes:
- Institution details (name, type, contact person)
- Contact information (email, phone)
- Additional requirements/message
- Reply-to functionality (direct reply to subscriber)

## Security Notes

- Never commit your `.env` file to version control
- Use app passwords, not account passwords
- The notification recipient is hardcoded as `yuvrajsinghchauhan@Zhecker.com`
- Email failures won't block subscription submissions (graceful degradation)

## Testing

To test email functionality:
1. Set up your environment variables
2. Submit a test subscription
3. Check the console for email status logs
4. Verify email delivery to yuvrajsinghchauhan@Zhecker.com