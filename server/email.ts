import nodemailer from 'nodemailer';
import type { InsertSubscription } from '@shared/schema';

// Email configuration
const EMAIL_CONFIG = {
  // Use Gmail SMTP for sending (you can change this to any email provider)
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com', // sender email
    pass: process.env.EMAIL_PASSWORD || 'your-app-password' // app password (not regular password)
  }
};

// Notification email recipient
const NOTIFICATION_EMAIL = 'yuvrajsinghchauhan@Zhecker.com';

// Create transporter
const transporter = nodemailer.createTransporter(EMAIL_CONFIG);

export interface EmailService {
  sendSubscriptionNotification(subscription: InsertSubscription): Promise<void>;
}

class NodeMailerService implements EmailService {
  async sendSubscriptionNotification(subscription: InsertSubscription): Promise<void> {
    try {
      // Email content for the notification
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; margin-bottom: 20px;">New Zhecker Subscription Request</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #334155; margin-bottom: 15px;">Institution Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Institution Name:</td>
                <td style="padding: 8px 0; color: #334155;">${subscription.instituteName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Institution Type:</td>
                <td style="padding: 8px 0; color: #334155;">${subscription.instituteType}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Contact Person:</td>
                <td style="padding: 8px 0; color: #334155;">${subscription.contactPerson}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Email:</td>
                <td style="padding: 8px 0; color: #334155;">
                  <a href="mailto:${subscription.email}" style="color: #2563eb; text-decoration: none;">${subscription.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Phone:</td>
                <td style="padding: 8px 0; color: #334155;">${subscription.phone}</td>
              </tr>
            </table>
          </div>
          
          ${subscription.message ? `
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #92400e; margin-bottom: 10px;">Additional Requirements</h3>
            <p style="color: #92400e; margin: 0; line-height: 1.5;">${subscription.message}</p>
          </div>
          ` : ''}
          
          <div style="background-color: #dcfce7; padding: 15px; border-radius: 8px; text-align: center;">
            <p style="color: #166534; margin: 0; font-weight: 500;">
              📧 Reply to this email to contact the institution directly
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          
          <p style="color: #64748b; font-size: 14px; text-align: center; margin: 0;">
            This notification was sent from the Zhecker landing page subscription form.
          </p>
        </div>
      `;

      // Send notification email
      await transporter.sendMail({
        from: `"Zhecker Landing Page" <${EMAIL_CONFIG.auth.user}>`,
        to: NOTIFICATION_EMAIL,
        replyTo: subscription.email, // Allow direct reply to the subscriber
        subject: `New Subscription: ${subscription.instituteName}`,
        html: htmlContent,
        // Plain text version
        text: `
New Zhecker Subscription Request

Institution Details:
- Institution Name: ${subscription.instituteName}
- Institution Type: ${subscription.instituteType}
- Contact Person: ${subscription.contactPerson}
- Email: ${subscription.email}
- Phone: ${subscription.phone}

${subscription.message ? `Additional Requirements:\n${subscription.message}` : ''}

Reply to this email to contact the institution directly.
        `.trim()
      });

      console.log(`✅ Subscription notification sent for: ${subscription.instituteName}`);
    } catch (error) {
      console.error('❌ Failed to send subscription notification:', error);
      throw new Error('Failed to send email notification');
    }
  }
}

export const emailService = new NodeMailerService();