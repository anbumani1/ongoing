using { cuid, managed } from '@sap/cds/common';

namespace email;

entity SupportTickets : cuid, managed {
    ticketNumber    : String(20) @title: 'Ticket Number';
    userEmail      : String(100) @title: 'User Email';
    userName       : String(100) @title: 'User Name';
    department     : String(100) @title: 'Department';
    subject        : String(200) @title: 'Subject';
    description    : String(2000) @title: 'Description';
    priority       : String(10) @title: 'Priority' enum {
        Low    = 'Low';
        Medium = 'Medium';
        High   = 'High';
        Critical = 'Critical';
    };
    category       : String(50) @title: 'Category' enum {
        Hardware = 'Hardware';
        Software = 'Software';
        Network = 'Network';
        Account = 'Account';
        Email = 'Email';
        Other = 'Other';
    };
    status         : String(20) @title: 'Status' enum {
        Open = 'Open';
        InProgress = 'In Progress';
        Resolved = 'Resolved';
        Closed = 'Closed';
    } default 'Open';
    assignedTo     : String(100) @title: 'Assigned To';
    resolution     : String(2000) @title: 'Resolution';
    emailSent      : Boolean @title: 'Email Sent' default false;
    emailMessageId : String(200) @title: 'Email Message ID';
}

entity EmailLogs : cuid, managed {
    ticketId       : Association to SupportTickets;
    emailType      : String(50) @title: 'Email Type';
    recipient      : String(100) @title: 'Recipient';
    subject        : String(200) @title: 'Subject';
    messageId      : String(200) @title: 'Message ID';
    status         : String(20) @title: 'Status' enum {
        Sent = 'Sent';
        Failed = 'Failed';
        Pending = 'Pending';
    };
    errorMessage   : String(500) @title: 'Error Message';
}

entity EmailTemplates : cuid {
    templateName   : String(100) @title: 'Template Name';
    templateType   : String(50) @title: 'Template Type';
    subject        : String(200) @title: 'Subject';
    htmlContent    : String(5000) @title: 'HTML Content';
    textContent    : String(5000) @title: 'Text Content';
    isActive       : Boolean @title: 'Is Active' default true;
}

service EmailService {
    entity SupportTickets as projection on email.SupportTickets;
    entity EmailLogs as projection on email.EmailLogs;
    entity EmailTemplates as projection on email.EmailTemplates;
    
    // Actions
    action submitSupportTicket(
        userEmail: String,
        userName: String,
        department: String,
        subject: String,
        description: String,
        priority: String,
        category: String
    ) returns {
        success: Boolean;
        ticketId: String;
        ticketNumber: String;
        message: String;
        error: String;
    };
    
    action sendWelcomeEmail(
        userEmail: String,
        userName: String,
        department: String
    ) returns {
        success: Boolean;
        messageId: String;
        message: String;
        error: String;
    };
    
    action getEmailStatus() returns {
        initialized: Boolean;
        domain: String;
        apiKeyConfigured: Boolean;
        lastEmailSent: String;
    };
    
    action testEmailConnection() returns {
        success: Boolean;
        message: String;
        error: String;
    };
}
