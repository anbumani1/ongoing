# 📧 Email Integration Setup Guide

## Overview
This guide will help you set up the complete email system for IT Support using Mailgun's free tier.

## 🚀 Features Implemented

### ✅ **Email Sending Capabilities**
- **Support Ticket Emails** - Automatic confirmation emails when tickets are created
- **Welcome Emails** - Onboarding emails for new employees
- **Auto-responses** - Automated replies to support emails
- **Custom Email Templates** - HTML and text templates for different scenarios
- **Bulk Email Support** - Send emails to multiple recipients

### ✅ **Email Receiving & Inbox**
- **Webhook Integration** - Receive emails via Mailgun webhooks
- **Email Inbox UI** - Professional inbox interface in IT Support dialog
- **Email Management** - Read, reply, forward, delete emails
- **Auto-ticket Creation** - Automatically create support tickets from emails
- **Email Filtering** - Filter by category, priority, status
- **Email Search** - Search through email content and metadata

### ✅ **Database Storage**
- **Sent Emails** - Track all outgoing emails with delivery status
- **Received Emails** - Store incoming emails with metadata
- **Email Statistics** - Track email metrics and performance
- **Support Tickets** - Link emails to support tickets
- **Email Templates** - Manage reusable email templates

## 🛠️ Setup Instructions

### 1. **Mailgun Account Setup (FREE)**

1. **Sign up for Mailgun**:
   - Go to [mailgun.com](https://www.mailgun.com)
   - Create a free account (includes 5,000 emails/month)
   - Verify your email address

2. **Get your API credentials**:
   ```
   Domain: sandbox-xxx.mailgun.org (for testing)
   API Key: key-xxxxxxxxxxxxxxxxxxxxxxxxx
   ```

3. **Add authorized recipients** (for sandbox):
   - Go to Mailgun Dashboard > Sending > Authorized Recipients
   - Add email addresses that can receive test emails

### 2. **Environment Configuration**

Update your `.env` file with Mailgun credentials:

```env
# Mailgun Email Configuration
MAILGUN_API_KEY=key-your_actual_api_key_here
MAILGUN_DOMAIN=sandbox-your_domain.mailgun.org
MAILGUN_HOST=api.mailgun.net
MAILGUN_WEBHOOK_SIGNING_KEY=your_webhook_signing_key

# Email Settings
EMAIL_FROM_NAME=IT Support
EMAIL_FROM_ADDRESS=noreply@sandbox-your_domain.mailgun.org
EMAIL_SUPPORT_ADDRESS=support@sandbox-your_domain.mailgun.org
EMAIL_REPLY_TO=itsupport@company.com
```

### 3. **Webhook Configuration**

1. **Set up webhooks in Mailgun**:
   - Go to Mailgun Dashboard > Sending > Webhooks
   - Add webhook URLs:
     ```
     Incoming Messages: https://your-domain.com/webhook/email/receive
     Email Events: https://your-domain.com/webhook/email/events
     ```

2. **For local development** (using ngrok):
   ```bash
   # Install ngrok
   npm install -g ngrok
   
   # Expose local server
   ngrok http 4004
   
   # Use the ngrok URL for webhooks
   https://abc123.ngrok.io/webhook/email/receive
   ```

### 4. **Install Dependencies**

```bash
npm install mailgun-js nodemailer multer body-parser
```

### 5. **Database Setup**

The email schema is already included. Deploy the database:

```bash
npm run deploy
```

### 6. **Test Email Functionality**

1. **Start the application**:
   ```bash
   npm start
   ```

2. **Test sending emails**:
   - Open IT Support dialog
   - Click "Submit Support Ticket"
   - Check if confirmation email is sent

3. **Test email inbox**:
   - Click "System Status" in IT Support
   - Click "Email Inbox" to open the inbox interface

## 📋 **Usage Examples**

### **Sending Support Ticket Email**
```javascript
// Automatically triggered when support ticket is created
const result = await this.sendSupportTicketEmail({
    ticketId: "TK123456",
    userEmail: "user@company.com",
    userName: "John Doe",
    issue: "Password reset needed",
    priority: "High"
});
```

### **Sending Welcome Email**
```javascript
// Send welcome email to new employees
const result = await this.sendWelcomeEmail({
    userEmail: "newuser@company.com",
    userName: "Jane Smith",
    department: "Engineering"
});
```

### **Processing Incoming Emails**
```javascript
// Webhook automatically processes incoming emails
// Creates support tickets and sends auto-responses
```

## 🎨 **Email Templates**

### **Support Ticket Template**
- Professional HTML design
- Ticket information and tracking
- Contact details and next steps
- Branded with company colors

### **Welcome Email Template**
- Welcoming message for new employees
- IT support contact information
- Getting started checklist
- Department-specific information

### **Auto-response Template**
- Immediate acknowledgment of support requests
- Ticket creation confirmation
- Expected response times
- Self-service resources

## 📊 **Email Inbox Features**

### **Professional Interface**
- Clean, modern design similar to Gmail/Outlook
- Email list with sender, subject, date
- Email preview panel with full content
- Priority and category indicators

### **Email Management**
- Mark emails as read/unread
- Reply to emails with templates
- Forward emails to other agents
- Create support tickets from emails
- Delete and archive emails

### **Filtering & Search**
- Filter by category (support, inquiry, complaint)
- Filter by priority (high, medium, low)
- Filter by status (read, unread, replied)
- Search email content and metadata
- Clear all filters option

### **Statistics Dashboard**
- Total emails received
- Unread email count
- Today's email count
- Support tickets created

## 🔒 **Security Features**

### **Webhook Verification**
- Mailgun signature verification
- Prevents unauthorized webhook calls
- Secure API key handling

### **Email Validation**
- Sender verification
- Spam detection and filtering
- Malicious content scanning

### **Data Protection**
- Encrypted email storage
- Secure API communications
- Access logging and monitoring

## 🚀 **Production Deployment**

### **Domain Setup**
1. **Add your domain to Mailgun**:
   - Go to Mailgun Dashboard > Sending > Domains
   - Add your domain (e.g., company.com)
   - Verify DNS records

2. **Update environment variables**:
   ```env
   MAILGUN_DOMAIN=company.com
   EMAIL_FROM_ADDRESS=noreply@company.com
   EMAIL_SUPPORT_ADDRESS=support@company.com
   ```

### **Webhook URLs**
Update webhook URLs to production:
```
https://your-production-domain.com/webhook/email/receive
https://your-production-domain.com/webhook/email/events
```

### **Email Limits**
- **Free Tier**: 5,000 emails/month
- **Flex Plan**: Pay-as-you-go ($0.80/1000 emails)
- **Foundation Plan**: $35/month (50,000 emails)

## 🧪 **Testing**

### **Manual Testing**
1. Send test emails through the interface
2. Check email delivery in Mailgun logs
3. Test webhook endpoints with sample data
4. Verify email storage in database

### **Automated Testing**
```bash
# Test email service
npm test -- email-service.test.js

# Test webhook endpoints
npm test -- webhook.test.js
```

## 📞 **Support**

### **Mailgun Support**
- Documentation: [documentation.mailgun.com](https://documentation.mailgun.com)
- Support: [help.mailgun.com](https://help.mailgun.com)
- Status: [status.mailgun.com](https://status.mailgun.com)

### **Implementation Support**
- Check console logs for error messages
- Verify environment variables are set
- Test webhook connectivity with ngrok
- Review Mailgun dashboard for delivery status

## 🎯 **Next Steps**

1. **Set up Mailgun account and get API keys**
2. **Configure environment variables**
3. **Test email sending functionality**
4. **Set up webhooks for receiving emails**
5. **Test the email inbox interface**
6. **Deploy to production with custom domain**

The email system is now fully integrated into your IT Support system and ready for production use!
