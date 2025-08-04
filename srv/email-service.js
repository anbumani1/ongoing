const cds = require('@sap/cds');
const emailHelper = require('./email-helper');

class EmailService extends cds.ApplicationService {
    async init() {
        // Register event handlers
        this.on('submitSupportTicket', this.submitSupportTicket);
        this.on('sendWelcomeEmail', this.sendWelcomeEmail);
        this.on('getEmailStatus', this.getEmailStatus);
        this.on('testEmailConnection', this.testEmailConnection);
        
        // Call parent init
        await super.init();
        
        console.log('📧 Email Service initialized');
    }

    async submitSupportTicket(req) {
        try {
            const { userEmail, userName, department, subject, description, priority, category } = req.data;
            
            // Validate required fields
            if (!userEmail || !userName || !subject || !description) {
                return {
                    success: false,
                    error: 'Missing required fields: userEmail, userName, subject, description'
                };
            }

            // Generate ticket number
            const ticketNumber = this.generateTicketNumber();
            
            // Create support ticket record
            const { SupportTickets } = this.entities;
            const ticket = await INSERT.into(SupportTickets).entries({
                ticketNumber,
                userEmail,
                userName,
                department: department || 'Unknown',
                subject,
                description,
                priority: priority || 'Medium',
                category: category || 'Other',
                status: 'Open'
            });

            // Send email notification
            const emailResult = await emailHelper.sendSupportTicketEmail({
                ticketId: ticket.ID,
                ticketNumber,
                userEmail,
                userName,
                issue: subject,
                description,
                priority: priority || 'Medium',
                category: category || 'Other'
            });

            // Update ticket with email status
            if (emailResult.success) {
                await UPDATE(SupportTickets)
                    .set({ 
                        emailSent: true, 
                        emailMessageId: emailResult.messageId 
                    })
                    .where({ ID: ticket.ID });
            }

            // Log email attempt
            await this.logEmail({
                ticketId: ticket.ID,
                emailType: 'Support Ticket',
                recipient: userEmail,
                subject: `Support Ticket #${ticketNumber} - ${subject}`,
                messageId: emailResult.messageId,
                status: emailResult.success ? 'Sent' : 'Failed',
                errorMessage: emailResult.error
            });

            return {
                success: true,
                ticketId: ticket.ID,
                ticketNumber,
                message: `Support ticket #${ticketNumber} created successfully${emailResult.success ? ' and email sent' : ' but email failed'}`,
                emailSent: emailResult.success
            };

        } catch (error) {
            console.error('❌ Error submitting support ticket:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async sendWelcomeEmail(req) {
        try {
            const { userEmail, userName, department } = req.data;
            
            if (!userEmail || !userName) {
                return {
                    success: false,
                    error: 'Missing required fields: userEmail, userName'
                };
            }

            const emailResult = await emailHelper.sendWelcomeEmail({
                userEmail,
                userName,
                department: department || 'Company'
            });

            // Log email attempt
            await this.logEmail({
                emailType: 'Welcome Email',
                recipient: userEmail,
                subject: `Welcome to ${department || 'Company'} - IT Support Information`,
                messageId: emailResult.messageId,
                status: emailResult.success ? 'Sent' : 'Failed',
                errorMessage: emailResult.error
            });

            return emailResult;

        } catch (error) {
            console.error('❌ Error sending welcome email:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async getEmailStatus(req) {
        try {
            const status = emailHelper.getStatus();
            
            // Get last email sent
            const { EmailLogs } = this.entities;
            const lastEmail = await SELECT.one.from(EmailLogs)
                .where({ status: 'Sent' })
                .orderBy({ createdAt: 'desc' });

            return {
                ...status,
                lastEmailSent: lastEmail ? lastEmail.createdAt : 'None'
            };

        } catch (error) {
            console.error('❌ Error getting email status:', error);
            return {
                initialized: false,
                error: error.message
            };
        }
    }

    async testEmailConnection(req) {
        try {
            // Test email with a simple message
            const testResult = await emailHelper.sendSupportTicketEmail({
                ticketId: 'TEST-001',
                ticketNumber: 'TEST-001',
                userEmail: 'anbum2187@gmail.com', // Your email for testing
                userName: 'Test User',
                issue: 'Email Connection Test',
                description: 'This is a test email to verify Mailgun integration is working correctly.',
                priority: 'Low',
                category: 'Other'
            });

            return {
                success: testResult.success,
                message: testResult.success ? 
                    'Test email sent successfully! Check your inbox.' : 
                    'Failed to send test email.',
                error: testResult.error
            };

        } catch (error) {
            console.error('❌ Error testing email connection:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async logEmail(emailData) {
        try {
            const { EmailLogs } = this.entities;
            await INSERT.into(EmailLogs).entries(emailData);
        } catch (error) {
            console.error('❌ Error logging email:', error);
        }
    }

    generateTicketNumber() {
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `TK${timestamp}${random}`;
    }
}

module.exports = EmailService;
