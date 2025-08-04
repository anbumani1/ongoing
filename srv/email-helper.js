const Mailgun = require('mailgun.js');
const formData = require('form-data');
require('dotenv').config();

class EmailHelper {
    constructor() {
        this.isInitialized = false;
        this.mg = null;
        this.init();
    }

    init() {
        try {
            if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
                console.log('⚠️  Email service not configured - missing API key or domain');
                return;
            }

            const mailgun = new Mailgun(formData);
            this.mg = mailgun.client({
                username: 'api',
                key: process.env.MAILGUN_API_KEY
            });

            this.isInitialized = true;
            console.log('✅ Email service initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize email service:', error.message);
        }
    }

    async sendSupportTicketEmail(ticketData) {
        if (!this.isInitialized) {
            console.log('⚠️  Email service not available');
            return { success: false, error: 'Email service not configured' };
        }

        try {
            const { ticketId, ticketNumber, userEmail, userName, issue, description, priority, category } = ticketData;

            const emailData = {
                from: `${process.env.EMAIL_FROM_NAME || 'IT Support'} <noreply@${process.env.MAILGUN_DOMAIN}>`,
                to: userEmail,
                'h:Reply-To': process.env.EMAIL_REPLY_TO || `support@${process.env.MAILGUN_DOMAIN}`,
                subject: `✅ Support Ticket #${ticketNumber || ticketId} Created - ${issue}`,
                text: this.generateSupportTicketText(ticketNumber || ticketId, userName, issue, description, priority, category),
                html: this.generateSupportTicketHTML(ticketNumber || ticketId, userName, issue, description, priority, category),
                'o:tag': ['support-ticket', priority.toLowerCase()],
                'o:tracking': 'yes',
                'o:tracking-clicks': 'yes',
                'o:tracking-opens': 'yes'
            };

            const result = await this.mg.messages.create(process.env.MAILGUN_DOMAIN, emailData);

            console.log(`📧 Support ticket email sent to ${userEmail}:`, result.id);
            return {
                success: true,
                messageId: result.id,
                message: 'Support ticket confirmation email sent successfully'
            };

        } catch (error) {
            console.error('❌ Failed to send support ticket email:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async sendWelcomeEmail(userData) {
        if (!this.isInitialized) {
            console.log('⚠️  Email service not available');
            return { success: false, error: 'Email service not configured' };
        }

        try {
            const { userEmail, userName, department } = userData;
            
            const emailData = {
                from: `IT Support <noreply@${process.env.MAILGUN_DOMAIN}>`,
                to: userEmail,
                subject: `Welcome to ${department} - IT Support Information`,
                text: this.generateWelcomeText(userName, department),
                html: this.generateWelcomeHTML(userName, department)
            };

            const result = await this.mg.messages.create(process.env.MAILGUN_DOMAIN, emailData);
            
            console.log('📧 Welcome email sent:', result.id);
            return {
                success: true,
                messageId: result.id,
                message: 'Welcome email sent successfully'
            };

        } catch (error) {
            console.error('❌ Failed to send welcome email:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    generateSupportTicketText(ticketNumber, userName, issue, description, priority, category) {
        const responseTime = this.getResponseTime(priority);

        return `
Hello ${userName},

✅ Your support ticket has been created successfully!

📋 Ticket Details:
- Ticket Number: #${ticketNumber}
- Category: ${category || 'General'}
- Priority: ${priority}
- Issue: ${issue}
- Description: ${description}
- Created: ${new Date().toLocaleString()}

⏰ Expected Response Time: ${responseTime}

Our IT support team will review your request and respond accordingly. You will receive updates via email as your ticket progresses.

📞 Need immediate assistance?
- Emergency Line: +1 (555) 123-4567
- Email: ${process.env.EMAIL_REPLY_TO || 'itsupport@company.com'}
- Portal: https://support.company.com

Thank you for contacting IT Support!

Best regards,
IT Support Team
        `;
    }

    generateSupportTicketHTML(ticketNumber, userName, issue, description, priority, category) {
        const priorityColor = this.getPriorityColor(priority);
        const priorityIcon = this.getPriorityIcon(priority);
        const categoryIcon = this.getCategoryIcon(category);
        const responseTime = this.getResponseTime(priority);

        return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Support Ticket #${ticketNumber}</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .header h2 { margin: 10px 0 0 0; font-size: 20px; opacity: 0.9; }
        .content { padding: 30px; }
        .ticket-info { background: #f8f9fa; padding: 25px; border-radius: 8px; border-left: 4px solid #007bff; margin: 20px 0; }
        .info-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #e9ecef; }
        .info-label { font-weight: bold; color: #495057; }
        .info-value { color: #6c757d; }
        .priority { color: ${priorityColor}; font-weight: bold; }
        .category { background: #e9ecef; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
        .description-box { background: white; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; margin: 15px 0; }
        .contact-info { background: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .contact-info h4 { margin-top: 0; color: #0056b3; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #6c757d; background: #f8f9fa; }
        .btn { display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
        .btn:hover { background: #0056b3; }
        @media (max-width: 600px) { .container { margin: 0; } .content { padding: 20px; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Support Ticket Created</h1>
            <h2>Ticket #${ticketNumber}</h2>
        </div>
        <div class="content">
            <h3>Hello ${userName}! 👋</h3>
            <p>Your support ticket has been created successfully and our IT team has been notified.</p>

            <div class="ticket-info">
                <div class="info-row">
                    <span class="info-label">📋 Ticket Number:</span>
                    <span class="info-value">#${ticketNumber}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">${categoryIcon} Category:</span>
                    <span class="info-value"><span class="category">${category || 'General'}</span></span>
                </div>
                <div class="info-row">
                    <span class="info-label">${priorityIcon} Priority:</span>
                    <span class="info-value"><span class="priority">${priority}</span></span>
                </div>
                <div class="info-row">
                    <span class="info-label">⏰ Expected Response:</span>
                    <span class="info-value">${responseTime}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">📅 Created:</span>
                    <span class="info-value">${new Date().toLocaleString()}</span>
                </div>
            </div>

            <h4>📝 Issue Summary:</h4>
            <p><strong>${issue}</strong></p>

            <div class="description-box">
                <h4>📄 Description:</h4>
                <p>${description}</p>
            </div>

            <div class="contact-info">
                <h4>📞 Need Immediate Assistance?</h4>
                <p><strong>Emergency Line:</strong> +1 (555) 123-4567</p>
                <p><strong>Email:</strong> ${process.env.EMAIL_REPLY_TO || 'itsupport@company.com'}</p>
                <p><strong>Portal:</strong> support.company.com</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
                <a href="https://support.company.com/ticket/${ticketNumber}" class="btn">🔍 Track Your Ticket</a>
                <a href="mailto:${process.env.EMAIL_REPLY_TO || 'itsupport@company.com'}?subject=Re: Ticket #${ticketNumber}" class="btn">📧 Reply to Ticket</a>
            </div>
        </div>
        <div class="footer">
            <p>💡 <strong>Tip:</strong> Reply to this email to add comments to your ticket.</p>
            <p>This is an automated message from IT Support. Please do not reply to this email address.</p>
            <p>&copy; 2025 Company IT Support. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
        `;
    }

    generateWelcomeText(userName, department) {
        return `
Welcome ${userName}!

Welcome to the ${department} team! We're excited to have you on board.

IT Support Information:
- Help Desk: +1 (555) 123-4567
- Email: itsupport@company.com
- Portal: https://support.company.com
- Emergency: Available 24/7

Getting Started:
1. Set up your company email
2. Install required software
3. Configure VPN access
4. Complete security training

If you need any technical assistance, don't hesitate to contact our IT support team.

Best regards,
IT Support Team
        `;
    }

    generateWelcomeHTML(userName, department) {
        return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome to ${department}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { padding: 30px; background: #f8f9fa; }
        .support-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; background: #e9ecef; border-radius: 0 0 8px 8px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Welcome ${userName}!</h1>
            <p>Welcome to the ${department} team</p>
        </div>
        <div class="content">
            <div class="support-info">
                <h3>🛠️ IT Support Information</h3>
                <p><strong>📞 Help Desk:</strong> +1 (555) 123-4567</p>
                <p><strong>📧 Email:</strong> itsupport@company.com</p>
                <p><strong>🌐 Portal:</strong> support.company.com</p>
                <p><strong>🚨 Emergency:</strong> Available 24/7</p>
            </div>
            <h3>🚀 Getting Started</h3>
            <ol>
                <li>Set up your company email</li>
                <li>Install required software</li>
                <li>Configure VPN access</li>
                <li>Complete security training</li>
            </ol>
        </div>
        <div class="footer">
            <p>Need help? Contact IT Support anytime!</p>
        </div>
    </div>
</body>
</html>
        `;
    }

    getPriorityColor(priority) {
        const colors = {
            'Critical': '#dc3545',
            'High': '#fd7e14',
            'Medium': '#ffc107',
            'Low': '#28a745'
        };
        return colors[priority] || '#6c757d';
    }

    getPriorityIcon(priority) {
        const icons = {
            'Critical': '🚨',
            'High': '🔴',
            'Medium': '🟡',
            'Low': '🟢'
        };
        return icons[priority] || '⚪';
    }

    getCategoryIcon(category) {
        const icons = {
            'Hardware': '🖥️',
            'Software': '💻',
            'Network': '🌐',
            'Account': '👤',
            'Email': '📧',
            'Other': '❓'
        };
        return icons[category] || '📋';
    }

    getResponseTime(priority) {
        const times = {
            'Critical': 'Within 1 hour',
            'High': 'Within 2 hours',
            'Medium': 'Within 4 hours',
            'Low': 'Within 24 hours'
        };
        return times[priority] || 'Within 24 hours';
    }

    getStatus() {
        return {
            initialized: this.isInitialized,
            domain: process.env.MAILGUN_DOMAIN || 'Not configured',
            apiKeyConfigured: !!process.env.MAILGUN_API_KEY
        };
    }
}

// Create a singleton instance
const emailHelper = new EmailHelper();

module.exports = emailHelper;
