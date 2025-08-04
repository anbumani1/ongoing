sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "project1/service/NotesDatabase",
    "project1/service/BlockManager"
], (Controller, JSONModel, MessageToast, MessageBox, Fragment, NotesDatabase, BlockManager) => {
    "use strict";

    return Controller.extend("project1.controller.EmployeeDashboard", {
        onInit() {
            console.log("EmployeeDashboard controller initialized");
            try {
                // Only initialize essential components immediately
                this._initializeModels();
                this._startTimeUpdater();

                // Defer heavy initialization to improve loading speed
                setTimeout(() => {
                    this._loadEmployeeData();
                    this._initializeNavigation();
                    this._initializeNotesSystem();
                    console.log("EmployeeDashboard initialization completed successfully");
                }, 100);

            } catch (error) {
                console.error("Error initializing EmployeeDashboard:", error);
            }
        },

        /**
         * Initialize the Notion-like notes system
         */
        _initializeNotesSystem() {
            try {
                console.log("Initializing Notion-like notes system...");

                // Initialize database
                this._notesDatabase = new NotesDatabase();
                console.log("Notes database initialized");

                // Initialize block manager
                this._blockManager = new BlockManager(this._notesDatabase);
                console.log("Block manager initialized");

                // Auto-save settings
                this._autoSaveEnabled = true;
                this._autoSaveInterval = null;
                this._currentNoteId = null;

                console.log("Notion-like notes system initialized successfully");
            } catch (error) {
                console.error("Error initializing notes system:", error);
            }
        },

        _initializeNavigation() {
            // Set up navigation state
            const oModel = this.getView().getModel();
            oModel.setProperty("/navigation", {
                currentSection: "dashboard",
                isNavExpanded: true
            });
        },

        _setActiveNavItem(sSection) {
            // Update navigation state
            const oModel = this.getView().getModel();
            oModel.setProperty("/navigation/currentSection", sSection);

            // Add visual feedback for navigation
            console.log(`Navigating to: ${sSection}`);
        },

        _initializeModels() {
            console.log("Initializing models...");
            // Create minimal model for fast loading
            const oEmployeeModel = new JSONModel({
                employee: {
                    firstName: "Alice",
                    lastName: "Wilson",
                    department: "Software Engineering",
                    role: "Software Development Intern"
                },
                currentDate: this._formatDate(new Date()),
                currentTime: this._formatTime(new Date()),
                myTasks: [],
                recentActivities: [],
                dashboardStats: {
                    tasksCompleted: 0,
                    coursesInProgress: 0,
                    certificatesEarned: 0,
                    notesCreated: 0
                }
            });
            this.getView().setModel(oEmployeeModel);
            console.log("Minimal employee model set successfully");
        },

        _loadEmployeeData() {
            // Load employee's tasks
            this._loadMyTasks();
            this._loadRecentActivities();
        },

        _loadMyTasks() {
            // Mock data for current user's tasks
            const aTasks = [
                {
                    ID: "TSK001",
                    title: "Complete Onboarding Training",
                    description: "Finish all mandatory training modules including company culture, safety, and compliance",
                    priority: "High",
                    status: "In Progress",
                    dueDate: "2024-12-20",
                    estimatedHours: 8,
                    progress: 75
                },
                {
                    ID: "TSK002",
                    title: "Setup Development Environment",
                    description: "Install required tools: VS Code, Node.js, Git, and configure workspace settings",
                    priority: "High",
                    status: "Completed",
                    dueDate: "2024-12-15",
                    estimatedHours: 4,
                    progress: 100
                },
                {
                    ID: "TSK003",
                    title: "First Code Review Assignment",
                    description: "Review pull request #123 and provide constructive feedback on code quality",
                    priority: "Medium",
                    status: "In Progress",
                    dueDate: "2024-12-18",
                    estimatedHours: 2,
                    progress: 30
                },
                {
                    ID: "TSK004",
                    title: "Team Meeting Preparation",
                    description: "Prepare presentation for weekly team standup on project progress",
                    priority: "Medium",
                    status: "Pending",
                    dueDate: "2024-12-19",
                    estimatedHours: 1,
                    progress: 0
                },
                {
                    ID: "TSK005",
                    title: "Documentation Update",
                    description: "Update API documentation for the user authentication module",
                    priority: "Low",
                    status: "Pending",
                    dueDate: "2024-12-25",
                    estimatedHours: 3,
                    progress: 0
                }
            ];

            this.getView().getModel().setProperty("/myTasks", aTasks);
        },

        _loadRecentActivities() {
            // Mock data for recent activities
            const aActivities = [
                {
                    id: "ACT001",
                    title: "Task Completed: Setup Development Environment",
                    description: "Successfully completed development environment setup with all required tools installed",
                    timestamp: "2 hours ago",
                    type: "task_completed",
                    icon: "sap-icon://accept"
                },
                {
                    id: "ACT002",
                    title: "Learning Module: Company Culture",
                    description: "Completed 'Introduction to Company Culture' training module with 95% score",
                    timestamp: "5 hours ago",
                    type: "learning_completed",
                    icon: "sap-icon://learning-assistant"
                },
                {
                    id: "ACT003",
                    title: "Code Review Submitted",
                    description: "Submitted code review feedback for PR #123 - User Authentication Module",
                    timestamp: "1 day ago",
                    type: "code_review",
                    icon: "sap-icon://review"
                },
                {
                    id: "ACT004",
                    title: "Note Created: Meeting Notes",
                    description: "Created new note 'Team Standup - Dec 12' with key discussion points",
                    timestamp: "1 day ago",
                    type: "note_created",
                    icon: "sap-icon://notes"
                },
                {
                    id: "ACT005",
                    title: "Policy Acknowledged",
                    description: "Read and acknowledged 'Code of Conduct' policy document",
                    timestamp: "2 days ago",
                    type: "policy_acknowledged",
                    icon: "sap-icon://document"
                },
                {
                    id: "ACT006",
                    title: "Profile Information Updated",
                    description: "Updated emergency contact information and personal details",
                    timestamp: "3 days ago",
                    type: "profile_updated",
                    icon: "sap-icon://person-placeholder"
                },
                {
                    id: "ACT007",
                    title: "New Task Assigned",
                    description: "Received new task: 'First Code Review Assignment' from manager Sarah Johnson",
                    timestamp: "3 days ago",
                    type: "task_assigned",
                    icon: "sap-icon://task"
                }
            ];

            this.getView().getModel().setProperty("/recentActivities", aActivities);
        },

        _startTimeUpdater() {
            // Update time every minute
            setInterval(() => {
                const oModel = this.getView().getModel();
                oModel.setProperty("/currentDate", this._formatDate(new Date()));
                oModel.setProperty("/currentTime", this._formatTime(new Date()));
            }, 60000);
        },

        _formatDate(oDate) {
            return oDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },

        _formatTime(oDate) {
            return oDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
        },

        // Event Handlers - Navigation Actions
        onPolicyAccess() {
            this._setActiveNavItem("policies");
            MessageToast.show("Opening Company Policies...");

            if (!this._oPolicyDialog) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "project1.view.PolicyDialog",
                    controller: this
                }).then((oDialog) => {
                    this._oPolicyDialog = oDialog;
                    this.getView().addDependent(this._oPolicyDialog);
                    this._loadPolicyData();
                    this._oPolicyDialog.open();
                });
            } else {
                this._oPolicyDialog.open();
            }
        },

        onLearningPath() {
            this._setActiveNavItem("learning");
            MessageToast.show("Opening Learning Path...");

            if (!this._oLearningDialog) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "project1.view.LearningPathDialog",
                    controller: this
                }).then((oDialog) => {
                    this._oLearningDialog = oDialog;
                    this.getView().addDependent(this._oLearningDialog);
                    this._loadLearningData();
                    this._oLearningDialog.open();
                });
            } else {
                this._oLearningDialog.open();
            }
        },

        onNotesAccess() {
            this._setActiveNavItem("notes");
            MessageToast.show("Opening My Notes...");

            if (!this._oNotesDialog) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "project1.view.NotesDialog",
                    controller: this
                }).then((oDialog) => {
                    this._oNotesDialog = oDialog;
                    this.getView().addDependent(this._oNotesDialog);
                    this._loadNotesData();
                    this._oNotesDialog.open();
                });
            } else {
                this._oNotesDialog.open();
            }
        },

        onProfileAccess() {
            this._setActiveNavItem("profile");
            MessageToast.show("Opening My Profile...");

            MessageBox.information("Opening Profile Management...\n\nYou can update:\n• Personal Information\n• Contact Details\n• Emergency Contacts\n• Preferences", {
                title: "My Profile"
            });
        },

        // Task Management
        onTaskPress(oEvent) {
            try {
                const oContext = oEvent.getSource().getBindingContext();
                if (oContext) {
                    const sTaskTitle = oContext.getProperty("title");
                    MessageToast.show(`Task selected: ${sTaskTitle}`);
                } else {
                    MessageToast.show("Task information not available");
                }
            } catch (error) {
                console.error("Error in onTaskPress:", error);
                MessageToast.show("Error accessing task information");
            }
        },

        onViewAllTasks() {
            MessageToast.show("Navigating to complete task list...");
            // TODO: Navigate to full task management view
        },

        // Quick Links
        onHelpAccess() {
            console.log("Help & Support button clicked");
            MessageToast.show("Opening IT Support...");
            this._openITSupportDialog();
        },

        _openITSupportDialog() {
            console.log("Attempting to load IT Support dialog...");

            if (!this._oITSupportDialog) {
                console.log("Loading IT Support dialog for the first time...");

                Fragment.load({
                    id: this.getView().getId(),
                    name: "project1.view.ITSupportDialogSimple",
                    controller: this
                }).then((oDialog) => {
                    console.log("✅ IT Support dialog loaded successfully");
                    this._oITSupportDialog = oDialog;
                    this.getView().addDependent(this._oITSupportDialog);
                    this._oITSupportDialog.open();
                    MessageToast.show("IT Support dialog opened successfully");
                }).catch((error) => {
                    console.error("❌ Failed to load IT Support dialog:", error);
                    console.error("Error details:", error.stack);

                    MessageBox.error(
                        `Failed to load IT Support dialog.\n\nError: ${error.message}\n\nPlease check the console for more details.`,
                        {
                            title: "Dialog Loading Error"
                        }
                    );
                });
            } else {
                console.log("Opening existing IT Support dialog...");
                this._oITSupportDialog.open();
            }
        },

        onCloseITSupportDialog() {
            if (this._oITSupportDialog) {
                this._oITSupportDialog.close();
            }
        },

        onTestSupportButton() {
            console.log("Test support button clicked!");
            MessageBox.success(
                "✅ IT Support dialog is working correctly!\n\n" +
                "The dialog loaded successfully and button events are functional.",
                {
                    title: "🧪 Test Successful"
                }
            );
        },

        // Email Service Methods
        onTestEmailService() {
            console.log("Testing email service...");
            MessageToast.show("Testing email service...");

            // Call the email service test endpoint
            const oModel = this.getView().getModel();
            oModel.callFunction("/testEmailConnection", {
                method: "POST",
                success: (oData) => {
                    console.log("Email test result:", oData);
                    if (oData.success) {
                        MessageBox.success(
                            `✅ ${oData.message}\n\nCheck your email inbox (anbum2187@gmail.com) for the test message.`,
                            { title: "📧 Email Test Successful" }
                        );
                    } else {
                        MessageBox.error(
                            `❌ Email test failed.\n\nError: ${oData.error}`,
                            { title: "📧 Email Test Failed" }
                        );
                    }
                },
                error: (oError) => {
                    console.error("Email test error:", oError);
                    MessageBox.error(
                        "❌ Failed to test email service.\n\nPlease check the console for details.",
                        { title: "📧 Email Test Error" }
                    );
                }
            });
        },

        onCheckEmailStatus() {
            console.log("Checking email status...");

            const oModel = this.getView().getModel();
            oModel.callFunction("/getEmailStatus", {
                method: "POST",
                success: (oData) => {
                    console.log("Email status:", oData);

                    const statusMessage = `
📧 Email Service Status:

✅ Initialized: ${oData.initialized ? 'Yes' : 'No'}
🌐 Domain: ${oData.domain}
🔑 API Key: ${oData.apiKeyConfigured ? 'Configured' : 'Not configured'}
📅 Last Email: ${oData.lastEmailSent || 'None'}
                    `;

                    MessageBox.information(statusMessage, {
                        title: "📊 Email Service Status"
                    });
                },
                error: (oError) => {
                    console.error("Email status error:", oError);
                    MessageBox.error(
                        "❌ Failed to get email status.\n\nPlease check the console for details.",
                        { title: "📊 Email Status Error" }
                    );
                }
            });
        },

        onQuickSubmitTicket() {
            // Expand the quick ticket form
            const oDialog = this._oITSupportDialog;
            const oPanel = oDialog.getContent()[0].getItems()[2]; // Quick ticket panel
            oPanel.setExpanded(true);
        },

        onSubmitQuickTicket() {
            console.log("Submitting quick support ticket...");

            // Get form data from simplified form
            const oDialog = this._oITSupportDialog;
            const userName = oDialog.byId("quickUserName").getValue();
            const userEmail = oDialog.byId("quickUserEmail").getValue();
            const priority = oDialog.byId("quickPriority").getSelectedKey();
            const subject = oDialog.byId("quickSubject").getValue();
            const description = oDialog.byId("quickDescription").getValue();

            // Validate required fields
            if (!userName || !userEmail || !subject || !description) {
                MessageBox.error(
                    "❌ Please fill in all required fields:\n\n• Your Name\n• Email Address\n• Subject\n• Description",
                    { title: "📝 Missing Information" }
                );
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(userEmail)) {
                MessageBox.error(
                    "❌ Please enter a valid email address.",
                    { title: "📧 Invalid Email" }
                );
                return;
            }

            MessageToast.show("Submitting support ticket...");

            // Submit ticket using the email helper
            try {
                fetch('/odata/v4/intern-onboarding/sendSupportTicketEmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ticketId: 'TK' + Date.now(),
                        ticketNumber: 'TK' + Date.now(),
                        userEmail: userEmail,
                        userName: userName,
                        issue: subject,
                        description: description,
                        priority: priority,
                        category: 'General'
                    })
                }).then(response => response.json())
                .then(result => {
                    if (result.success) {
                        MessageBox.success(
                            `✅ Support ticket created successfully!\n\n` +
                            `🎫 Ticket Number: TK${Date.now()}\n` +
                            `📧 Confirmation email sent to: ${userEmail}\n\n` +
                            `Our IT team will respond according to the priority level.`,
                            {
                                title: "🎫 Ticket Created",
                                onClose: () => {
                                    this.onClearQuickForm();
                                }
                            }
                        );
                    } else {
                        throw new Error(result.error || 'Failed to send email');
                    }
                })
                .catch(error => {
                    console.error("Ticket submission error:", error);
                    MessageBox.error(
                        "❌ Failed to submit support ticket.\n\nPlease try again or contact IT support directly.",
                        { title: "🎫 Submission Error" }
                    );
                });
            } catch (error) {
                console.error("Ticket submission error:", error);
                MessageBox.error(
                    "❌ Failed to submit support ticket.\n\nPlease try again or contact IT support directly.",
                    { title: "🎫 Submission Error" }
                );
            }
        },

        onClearQuickForm() {
            if (!this._oITSupportDialog) return;

            const oDialog = this._oITSupportDialog;
            oDialog.byId("quickSubject").setValue("");
            oDialog.byId("quickDescription").setValue("");
            oDialog.byId("quickPriority").setSelectedKey("Medium");

            MessageToast.show("Form cleared");
        },

        // Contact Methods
        onCallHelpDesk() {
            MessageBox.confirm(
                "📞 Would you like to call the IT Help Desk?\n\nPhone: +1 (555) 123-4567\n\nThis will open your phone app (on mobile) or show the number to dial.",
                {
                    title: "📞 Call Help Desk",
                    actions: [MessageBox.Action.YES, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: (sAction) => {
                        if (sAction === MessageBox.Action.YES) {
                            window.open("tel:+15551234567", "_self");
                        }
                    }
                }
            );
        },

        onSendEmail() {
            const subject = "IT Support Request";
            const body = "Hello IT Support Team,\n\nI need assistance with:\n\n[Please describe your issue here]\n\nBest regards,\nAlice Wilson";
            const mailtoLink = `mailto:itsupport@company.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.open(mailtoLink, "_self");
        },

        onOpenPortal() {
            MessageBox.confirm(
                "🌐 This will open the IT Support Portal in a new tab.\n\nURL: https://support.company.com",
                {
                    title: "🌐 Open Support Portal",
                    actions: [MessageBox.Action.YES, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: (sAction) => {
                        if (sAction === MessageBox.Action.YES) {
                            window.open("https://support.company.com", "_blank");
                        }
                    }
                }
            );
        },

        onEmergencyContact() {
            MessageBox.error(
                "🚨 EMERGENCY IT SUPPORT\n\n" +
                "For critical system outages or security incidents:\n\n" +
                "📞 Emergency Line: +1 (555) 911-HELP\n" +
                "📧 Emergency Email: emergency@company.com\n" +
                "💬 Emergency Chat: Available 24/7\n\n" +
                "⚠️ Use only for genuine emergencies that affect business operations.",
                {
                    title: "🚨 Emergency Contact",
                    actions: [MessageBox.Action.OK, "Call Emergency"],
                    emphasizedAction: "Call Emergency",
                    onClose: (sAction) => {
                        if (sAction === "Call Emergency") {
                            window.open("tel:+15559114357", "_self");
                        }
                    }
                }
            );
        },

        // Test button to verify event handling works
        onTestButton() {
            console.log("🧪 Test button clicked!");
            MessageBox.success(
                "✅ Button event handling is working correctly!\n\n" +
                "This confirms that:\n" +
                "• Fragment is loaded properly\n" +
                "• Controller is bound correctly\n" +
                "• Event handlers are functional\n\n" +
                "If this works but other buttons don't, there might be specific issues with those handlers.",
                {
                    title: "🧪 Button Test Successful"
                }
            );
        },

        // IT Support Actions
        onSubmitTicket() {
            console.log("onSubmitTicket called");
            MessageToast.show("Submit Ticket button clicked!");

            MessageBox.confirm(
                "📧 Email Integration Status: ✅ ACTIVE\n" +
                "Domain: sandbox6990f4f8ebde425795f92cceed5d3266.mailgun.org\n\n" +
                "This will create a support ticket and send you a confirmation email.\n\n" +
                "⚠️ Note: Your Mailgun account needs to be activated first.\n" +
                "Check your email for the activation link from Mailgun.",
                {
                    title: "Submit Support Ticket",
                    actions: [MessageBox.Action.YES, MessageBox.Action.CANCEL, "Test Email"],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: function (sAction) {
                        if (sAction === MessageBox.Action.YES) {
                            this._createSupportTicket();
                        } else if (sAction === "Test Email") {
                            this._testEmailIntegration();
                        }
                    }.bind(this)
                }
            );
        },

        async _createSupportTicket() {
            const ticketId = 'TK' + Date.now();

            // Try to send email confirmation
            try {
                const response = await fetch('/odata/v4/intern-onboarding/sendSupportTicketEmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ticketId: ticketId,
                        userEmail: 'user@example.com', // Replace with actual user email
                        userName: 'John Doe', // Replace with actual user name
                        issue: 'General Support Request',
                        priority: 'High'
                    })
                });

                const result = await response.json();

                if (result.success) {
                    MessageBox.success(
                        `🎫 Support Ticket Created!\n\n` +
                        `Ticket ID: ${ticketId}\n` +
                        `Priority: High\n` +
                        `Issue: General Support Request\n` +
                        `Created: ${new Date().toLocaleString()}\n\n` +
                        `✅ Confirmation email sent successfully!\n` +
                        `📧 Message ID: ${result.messageId}`,
                        {
                            title: "Support Ticket Created"
                        }
                    );
                } else {
                    throw new Error(result.error || 'Email sending failed');
                }

            } catch (error) {
                console.error('Email sending failed:', error);
                MessageBox.success(
                    `🎫 Support Ticket Created!\n\n` +
                    `Ticket ID: ${ticketId}\n` +
                    `Priority: High\n` +
                    `Issue: General Support Request\n` +
                    `Created: ${new Date().toLocaleString()}\n\n` +
                    `⚠️ Note: Email confirmation could not be sent.\n` +
                    `Reason: ${error.message}\n\n` +
                    `Your ticket is still valid and will be processed.`,
                    {
                        title: "Support Ticket Created",
                        actions: [MessageBox.Action.OK, "Check Email Config"],
                        emphasizedAction: MessageBox.Action.OK,
                        onClose: function (sAction) {
                            if (sAction === "Check Email Config") {
                                window.open("https://app.mailgun.com/", "_blank");
                            }
                        }
                    }
                );
            }
        },

        async _testEmailIntegration() {
            try {
                // Get email service status
                const response = await fetch('/odata/v4/intern-onboarding/getEmailStatus', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const result = await response.json();

                if (result.success) {
                    const status = result.status;
                    const statusIcon = status.initialized ? "✅" : "❌";
                    const apiKeyIcon = status.apiKeyConfigured ? "✅" : "❌";

                    MessageBox.information(
                        "📧 Email Integration Status\n\n" +
                        `${statusIcon} Service Initialized: ${status.initialized}\n` +
                        `${apiKeyIcon} API Key Configured: ${status.apiKeyConfigured}\n` +
                        `🌐 Domain: ${status.domain}\n\n` +
                        (status.initialized ?
                            "✅ Email service is ready!\n\nYou can now:\n• Send support ticket confirmations\n• Send welcome emails\n• Test email functionality" :
                            "⚠️ Email service needs configuration\n\nTo activate:\n1. Check your Mailgun account\n2. Verify API key and domain\n3. Activate your account if needed"
                        ),
                        {
                            title: "Email Integration Status",
                            actions: [MessageBox.Action.OK, status.initialized ? "Test Email" : "Open Mailgun"],
                            emphasizedAction: status.initialized ? "Test Email" : "Open Mailgun",
                            onClose: function (sAction) {
                                if (sAction === "Open Mailgun") {
                                    window.open("https://app.mailgun.com/", "_blank");
                                } else if (sAction === "Test Email") {
                                    MessageToast.show("Test email functionality by creating a support ticket!");
                                }
                            }
                        }
                    );
                } else {
                    throw new Error(result.error || 'Failed to get email status');
                }

            } catch (error) {
                console.error('Failed to get email status:', error);
                MessageBox.information(
                    "📧 Email Integration Test\n\n" +
                    "❌ Could not retrieve email service status\n" +
                    `Error: ${error.message}\n\n` +
                    "Please check:\n" +
                    "1. Server is running\n" +
                    "2. Email service is configured\n" +
                    "3. Network connectivity",
                    {
                        title: "Email Integration Test",
                        actions: [MessageBox.Action.OK, "Open Mailgun"],
                        emphasizedAction: "Open Mailgun",
                        onClose: function (sAction) {
                            if (sAction === "Open Mailgun") {
                                window.open("https://app.mailgun.com/", "_blank");
                            }
                        }
                    }
                );
            }
        },

        onLiveChatSupport() {
            console.log("onLiveChatSupport called");
            MessageToast.show("Live Chat button clicked!");

            MessageBox.confirm(
                "This will start a live chat session with IT Support. An agent will be with you shortly.",
                {
                    title: "Live Chat Support",
                    actions: [MessageBox.Action.YES, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: function (sAction) {
                        if (sAction === MessageBox.Action.YES) {
                            // In a real implementation, this would open live chat
                            window.open("https://support.company.com/live-chat", "_blank");
                            MessageToast.show("Connecting to live chat support...");
                        }
                    }
                }
            );
        },

        onRemoteAssistance() {
            MessageBox.confirm(
                "Remote assistance allows IT support to securely access your computer to help resolve issues. Do you want to start a remote assistance session?",
                {
                    title: "Remote Assistance",
                    actions: [MessageBox.Action.YES, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: function (sAction) {
                        if (sAction === MessageBox.Action.YES) {
                            // In a real implementation, this would start remote assistance
                            MessageToast.show("Starting remote assistance session...");
                            MessageBox.information("Remote assistance session ID: RA-2025-001234\n\nPlease provide this ID to the IT support agent when they call you.");
                        }
                    }
                }
            );
        },

        onCallSupport() {
            MessageBox.information(
                "IT Support Hotline: +1 (555) 123-4567\n\n" +
                "Available 24/7 for urgent issues\n" +
                "Business hours: Mon-Fri 8:00 AM - 6:00 PM\n\n" +
                "For faster service, have your employee ID and computer details ready.",
                {
                    title: "Call IT Support",
                    actions: [MessageBox.Action.OK, "Call Now"],
                    emphasizedAction: "Call Now",
                    onClose: function (sAction) {
                        if (sAction === "Call Now") {
                            // In a real implementation, this could trigger a VoIP call
                            window.open("tel:+15551234567");
                        }
                    }
                }
            );
        },

        onFeedbackAccess() {
            MessageBox.information("Feedback Options:\n\n• Rate your experience\n• Suggest improvements\n• Report issues\n• Anonymous feedback\n• Manager feedback", {
                title: "Feedback"
            });
        },

        // Common IT Issues Handlers
        onPasswordReset() {
            MessageBox.confirm(
                "Password Reset Options:\n\n" +
                "• Windows/Domain Password\n" +
                "• Email Password\n" +
                "• Application Passwords\n" +
                "• Multi-Factor Authentication\n\n" +
                "Would you like to start the password reset process?",
                {
                    title: "Password Reset",
                    actions: [MessageBox.Action.YES, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: function (sAction) {
                        if (sAction === MessageBox.Action.YES) {
                            window.open("https://password.company.com/reset", "_blank");
                            MessageToast.show("Opening password reset portal...");
                        }
                    }
                }
            );
        },

        onSoftwareInstall() {
            MessageBox.information(
                "Software Installation Request\n\n" +
                "Available Software:\n" +
                "• Microsoft Office Suite\n" +
                "• Adobe Creative Cloud\n" +
                "• Development Tools (VS Code, Git)\n" +
                "• Browsers (Chrome, Firefox)\n" +
                "• Communication Tools (Teams, Slack)\n\n" +
                "Submit a request through the IT portal for approval and installation.",
                {
                    title: "Software Installation",
                    actions: [MessageBox.Action.OK, "Submit Request"],
                    emphasizedAction: "Submit Request",
                    onClose: function (sAction) {
                        if (sAction === "Submit Request") {
                            window.open("https://software.company.com/request", "_blank");
                        }
                    }
                }
            );
        },

        onNetworkIssues() {
            MessageBox.information(
                "Network Troubleshooting Steps:\n\n" +
                "1. Check WiFi connection and signal strength\n" +
                "2. Restart your network adapter\n" +
                "3. Try connecting to a different network\n" +
                "4. Clear DNS cache (ipconfig /flushdns)\n" +
                "5. Contact IT if issues persist\n\n" +
                "Current Network Status: All systems operational",
                {
                    title: "Network & WiFi Issues",
                    actions: [MessageBox.Action.OK, "Run Diagnostics"],
                    emphasizedAction: "Run Diagnostics",
                    onClose: function (sAction) {
                        if (sAction === "Run Diagnostics") {
                            MessageToast.show("Running network diagnostics...");
                            setTimeout(() => {
                                MessageBox.success("Network diagnostics completed.\n\nConnection: Stable\nSpeed: 150 Mbps\nLatency: 12ms\n\nNo issues detected.");
                            }, 2000);
                        }
                    }
                }
            );
        },

        onEmailProblems() {
            MessageBox.information(
                "Email Support Options:\n\n" +
                "• Outlook configuration issues\n" +
                "• Email sync problems\n" +
                "• Missing emails or folders\n" +
                "• Spam/junk mail settings\n" +
                "• Mobile email setup\n\n" +
                "Most email issues can be resolved by restarting Outlook or reconfiguring your account.",
                {
                    title: "Email Problems",
                    actions: [MessageBox.Action.OK, "Email Setup Guide"],
                    emphasizedAction: "Email Setup Guide",
                    onClose: function (sAction) {
                        if (sAction === "Email Setup Guide") {
                            window.open("https://support.company.com/email-setup", "_blank");
                        }
                    }
                }
            );
        },

        onHardwareIssues() {
            MessageBox.information(
                "Hardware Support:\n\n" +
                "• Laptop/Desktop problems\n" +
                "• Monitor and display issues\n" +
                "• Keyboard and mouse problems\n" +
                "• Printer and scanner support\n" +
                "• Hardware replacement requests\n\n" +
                "For hardware issues, please provide your asset tag number and detailed description of the problem.",
                {
                    title: "Hardware Issues",
                    actions: [MessageBox.Action.OK, "Report Hardware Issue"],
                    emphasizedAction: "Report Hardware Issue",
                    onClose: function (sAction) {
                        if (sAction === "Report Hardware Issue") {
                            window.open("https://hardware.company.com/report", "_blank");
                        }
                    }
                }
            );
        },

        onVPNAccess() {
            MessageBox.information(
                "VPN Access & Setup:\n\n" +
                "• Download VPN client software\n" +
                "• Configure connection settings\n" +
                "• Troubleshoot connection issues\n" +
                "• Request VPN access permissions\n" +
                "• Multi-device VPN setup\n\n" +
                "VPN is required for secure remote access to company resources.",
                {
                    title: "VPN Access",
                    actions: [MessageBox.Action.OK, "Download VPN Client"],
                    emphasizedAction: "Download VPN Client",
                    onClose: function (sAction) {
                        if (sAction === "Download VPN Client") {
                            window.open("https://vpn.company.com/download", "_blank");
                        }
                    }
                }
            );
        },

        // Self-Service Resources
        onOpenFAQ() {
            window.open("https://support.company.com/faq", "_blank");
            MessageToast.show("Opening FAQ section...");
        },

        onOpenUserGuides() {
            window.open("https://support.company.com/guides", "_blank");
            MessageToast.show("Opening user guides...");
        },

        onOpenVideoTutorials() {
            window.open("https://support.company.com/videos", "_blank");
            MessageToast.show("Opening video tutorials...");
        },

        onCheckSystemStatus() {
            MessageBox.information(
                "System Status Dashboard\n\n" +
                "🟢 Email Services: Operational\n" +
                "🟢 Network: Operational\n" +
                "🟢 File Servers: Operational\n" +
                "🟢 VPN: Operational\n" +
                "🟡 Backup Systems: Maintenance\n" +
                "🟢 Phone System: Operational\n\n" +
                "Last updated: " + new Date().toLocaleString(),
                {
                    title: "System Status",
                    actions: [MessageBox.Action.OK, "View Full Status"],
                    emphasizedAction: "View Full Status",
                    onClose: function (sAction) {
                        if (sAction === "View Full Status") {
                            window.open("https://status.company.com", "_blank");
                        }
                    }
                }
            );
        },

        onOpenEmailInbox() {
            this._openEmailInboxDialog();
        },

        // Email Inbox Dialog
        _openEmailInboxDialog() {
            if (!this._oEmailInboxDialog) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "project1.view.EmailInboxDialog",
                    controller: this
                }).then((oDialog) => {
                    this._oEmailInboxDialog = oDialog;
                    this.getView().addDependent(this._oEmailInboxDialog);
                    this._initializeEmailInbox();
                    this._loadEmailInboxData();
                    this._oEmailInboxDialog.open();
                }).catch((error) => {
                    console.error("Failed to load Email Inbox dialog:", error);
                    MessageToast.show("Failed to load Email Inbox dialog");
                });
            } else {
                this._loadEmailInboxData();
                this._oEmailInboxDialog.open();
            }
        },

        onCloseEmailInboxDialog() {
            if (this._oEmailInboxDialog) {
                this._oEmailInboxDialog.close();
            }
        },

        _initializeEmailInbox() {
            // Initialize email inbox data model
            const oEmailModel = new JSONModel({
                emails: [],
                selectedEmail: null,
                inboxStats: {
                    totalEmails: 0,
                    unreadEmails: 0,
                    todayEmails: 0,
                    ticketsCreated: 0
                },
                emailCategories: [
                    { key: "all", text: "All Categories" },
                    { key: "support", text: "Support" },
                    { key: "inquiry", text: "General Inquiry" },
                    { key: "complaint", text: "Complaint" },
                    { key: "feedback", text: "Feedback" }
                ],
                emailPriorities: [
                    { key: "all", text: "All Priorities" },
                    { key: "high", text: "High" },
                    { key: "medium", text: "Medium" },
                    { key: "low", text: "Low" }
                ],
                emailStatuses: [
                    { key: "all", text: "All Status" },
                    { key: "unread", text: "Unread" },
                    { key: "read", text: "Read" },
                    { key: "replied", text: "Replied" }
                ]
            });

            this.getView().setModel(oEmailModel, "emailInbox");
        },

        async _loadEmailInboxData() {
            try {
                // Simulate loading email data - replace with actual service call
                const mockEmails = this._generateMockEmails();
                const oModel = this.getView().getModel("emailInbox");

                oModel.setProperty("/emails", mockEmails);

                // Calculate statistics
                const stats = {
                    totalEmails: mockEmails.length,
                    unreadEmails: mockEmails.filter(email => !email.isRead).length,
                    todayEmails: mockEmails.filter(email => this._isToday(new Date(email.receivedAt))).length,
                    ticketsCreated: mockEmails.filter(email => email.ticketId).length
                };

                oModel.setProperty("/inboxStats", stats);

                MessageToast.show("Email inbox loaded successfully");
            } catch (error) {
                console.error("Failed to load email inbox:", error);
                MessageToast.show("Failed to load email inbox");
            }
        },

        _generateMockEmails() {
            const senders = [
                { email: "john.doe@company.com", name: "John Doe" },
                { email: "jane.smith@external.com", name: "Jane Smith" },
                { email: "support.request@company.com", name: "Support Request" },
                { email: "admin@company.com", name: "System Admin" },
                { email: "user123@gmail.com", name: "External User" }
            ];

            const subjects = [
                "Password reset request",
                "Software installation needed",
                "Network connectivity issues",
                "Email configuration problem",
                "VPN access request",
                "Hardware replacement needed",
                "System performance issues",
                "Security concern report"
            ];

            const categories = ["support", "inquiry", "complaint", "feedback"];
            const priorities = ["high", "medium", "low"];

            const emails = [];

            for (let i = 0; i < 25; i++) {
                const sender = senders[Math.floor(Math.random() * senders.length)];
                const subject = subjects[Math.floor(Math.random() * subjects.length)];
                const category = categories[Math.floor(Math.random() * categories.length)];
                const priority = priorities[Math.floor(Math.random() * priorities.length)];
                const isRead = Math.random() > 0.4; // 60% read, 40% unread

                const receivedDate = new Date();
                receivedDate.setHours(receivedDate.getHours() - Math.floor(Math.random() * 72)); // Last 3 days

                emails.push({
                    ID: `email_${i + 1}`,
                    fromEmail: sender.email,
                    fromName: sender.name,
                    toEmail: "itsupport@company.com",
                    subject: subject,
                    preview: `This is a preview of the email content for ${subject.toLowerCase()}...`,
                    content: `Dear IT Support,\n\nI need assistance with ${subject.toLowerCase()}. Please help me resolve this issue.\n\nBest regards,\n${sender.name}`,
                    htmlContent: `<p>Dear IT Support,</p><p>I need assistance with <strong>${subject.toLowerCase()}</strong>. Please help me resolve this issue.</p><p>Best regards,<br>${sender.name}</p>`,
                    category: category,
                    priority: priority,
                    isRead: isRead,
                    receivedAt: receivedDate.toLocaleString(),
                    ticketId: isRead && Math.random() > 0.7 ? `TK${Date.now() + i}` : null
                });
            }

            return emails.sort((a, b) => new Date(b.receivedAt) - new Date(a.receivedAt));
        },

        _isToday(date) {
            const today = new Date();
            return date.getDate() === today.getDate() &&
                   date.getMonth() === today.getMonth() &&
                   date.getFullYear() === today.getFullYear();
        },

        // Email Inbox Actions
        onRefreshInbox() {
            this._loadEmailInboxData();
        },

        onComposeEmail() {
            MessageBox.information(
                "Compose Email Feature\n\n" +
                "This would open an email composition dialog where you can:\n" +
                "• Send emails to users\n" +
                "• Use email templates\n" +
                "• Attach files\n" +
                "• Set priority and category",
                {
                    title: "Compose Email",
                    actions: [MessageBox.Action.OK, "Open Composer"],
                    emphasizedAction: "Open Composer",
                    onClose: function (sAction) {
                        if (sAction === "Open Composer") {
                            MessageToast.show("Email composer would open here");
                        }
                    }
                }
            );
        },

        onSearchEmails(oEvent) {
            const sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue");
            const oModel = this.getView().getModel("emailInbox");
            const aEmails = oModel.getProperty("/emails");

            if (!sQuery) {
                this._loadEmailInboxData();
                return;
            }

            const aFilteredEmails = aEmails.filter(email =>
                email.fromEmail.toLowerCase().includes(sQuery.toLowerCase()) ||
                email.subject.toLowerCase().includes(sQuery.toLowerCase()) ||
                email.content.toLowerCase().includes(sQuery.toLowerCase())
            );

            oModel.setProperty("/emails", aFilteredEmails);
            MessageToast.show(`Found ${aFilteredEmails.length} emails matching "${sQuery}"`);
        },

        onCategoryFilter(oEvent) {
            this._applyEmailFilters();
        },

        onPriorityFilter(oEvent) {
            this._applyEmailFilters();
        },

        onStatusFilter(oEvent) {
            this._applyEmailFilters();
        },

        _applyEmailFilters() {
            // Implementation for applying multiple filters
            MessageToast.show("Filters applied");
        },

        onClearFilters() {
            const oView = this.getView();
            oView.byId("categoryFilter").setSelectedKey("");
            oView.byId("priorityFilter").setSelectedKey("");
            oView.byId("statusFilter").setSelectedKey("");
            oView.byId("emailSearchField").setValue("");
            this._loadEmailInboxData();
        },

        onEmailSelect(oEvent) {
            const oSelectedItem = oEvent.getParameter("listItem");
            const oContext = oSelectedItem.getBindingContext("emailInbox");
            const oSelectedEmail = oContext.getObject();

            const oModel = this.getView().getModel("emailInbox");
            oModel.setProperty("/selectedEmail", oSelectedEmail);

            // Mark as read if unread
            if (!oSelectedEmail.isRead) {
                oSelectedEmail.isRead = true;
                oModel.updateBindings();
                this._updateEmailReadStatus(oSelectedEmail.ID);
            }
        },

        onEmailItemPress(oEvent) {
            // Same as onEmailSelect but for direct item press
            this.onEmailSelect(oEvent);
        },

        onClosePreview() {
            const oModel = this.getView().getModel("emailInbox");
            oModel.setProperty("/selectedEmail", null);
        },

        async _updateEmailReadStatus(emailId) {
            try {
                // Call email service to mark as read
                MessageToast.show("Email marked as read");
            } catch (error) {
                console.error("Failed to update email status:", error);
            }
        },

        onMarkAllRead() {
            MessageBox.confirm(
                "Are you sure you want to mark all emails as read?",
                {
                    title: "Mark All Read",
                    actions: [MessageBox.Action.YES, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: function (sAction) {
                        if (sAction === MessageBox.Action.YES) {
                            const oModel = this.getView().getModel("emailInbox");
                            const aEmails = oModel.getProperty("/emails");

                            aEmails.forEach(email => email.isRead = true);
                            oModel.updateBindings();

                            MessageToast.show("All emails marked as read");
                        }
                    }.bind(this)
                }
            );
        },

        onDeleteSelected() {
            const oModel = this.getView().getModel("emailInbox");
            const oSelectedEmail = oModel.getProperty("/selectedEmail");

            if (!oSelectedEmail) {
                MessageToast.show("Please select an email to delete");
                return;
            }

            MessageBox.confirm(
                `Are you sure you want to delete the email from ${oSelectedEmail.fromEmail}?`,
                {
                    title: "Delete Email",
                    actions: [MessageBox.Action.DELETE, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.DELETE,
                    onClose: function (sAction) {
                        if (sAction === MessageBox.Action.DELETE) {
                            const aEmails = oModel.getProperty("/emails");
                            const iIndex = aEmails.findIndex(email => email.ID === oSelectedEmail.ID);

                            if (iIndex > -1) {
                                aEmails.splice(iIndex, 1);
                                oModel.setProperty("/emails", aEmails);
                                oModel.setProperty("/selectedEmail", null);
                                MessageToast.show("Email deleted successfully");
                            }
                        }
                    }
                }
            );
        },

        onReplyEmail() {
            const oModel = this.getView().getModel("emailInbox");
            const oSelectedEmail = oModel.getProperty("/selectedEmail");

            if (!oSelectedEmail) {
                MessageToast.show("Please select an email to reply to");
                return;
            }

            MessageBox.information(
                `Reply to: ${oSelectedEmail.fromEmail}\n` +
                `Subject: Re: ${oSelectedEmail.subject}\n\n` +
                "This would open the email composer with the reply template pre-filled.",
                {
                    title: "Reply to Email",
                    actions: [MessageBox.Action.OK, "Open Composer"],
                    emphasizedAction: "Open Composer",
                    onClose: function (sAction) {
                        if (sAction === "Open Composer") {
                            MessageToast.show("Email reply composer would open here");
                        }
                    }
                }
            );
        },

        onForwardEmail() {
            const oModel = this.getView().getModel("emailInbox");
            const oSelectedEmail = oModel.getProperty("/selectedEmail");

            if (!oSelectedEmail) {
                MessageToast.show("Please select an email to forward");
                return;
            }

            MessageBox.information(
                `Forward: ${oSelectedEmail.subject}\n\n` +
                "This would open the email composer to forward the selected email.",
                {
                    title: "Forward Email",
                    actions: [MessageBox.Action.OK, "Open Composer"],
                    emphasizedAction: "Open Composer",
                    onClose: function (sAction) {
                        if (sAction === "Open Composer") {
                            MessageToast.show("Email forward composer would open here");
                        }
                    }
                }
            );
        },

        onCreateTicket() {
            const oModel = this.getView().getModel("emailInbox");
            const oSelectedEmail = oModel.getProperty("/selectedEmail");

            if (!oSelectedEmail) {
                MessageToast.show("Please select an email to create a ticket from");
                return;
            }

            this.onCreateTicketFromEmail();
        },

        onCreateTicketFromEmail() {
            const oModel = this.getView().getModel("emailInbox");
            const oSelectedEmail = oModel.getProperty("/selectedEmail");

            if (!oSelectedEmail) {
                MessageToast.show("Please select an email first");
                return;
            }

            const ticketId = `TK${Date.now()}`;

            MessageBox.confirm(
                `Create Support Ticket\n\n` +
                `From: ${oSelectedEmail.fromEmail}\n` +
                `Subject: ${oSelectedEmail.subject}\n` +
                `Priority: ${oSelectedEmail.priority}\n` +
                `Category: ${oSelectedEmail.category}\n\n` +
                `Ticket ID: ${ticketId}\n\n` +
                "This will create a new support ticket and send a confirmation email to the requester.",
                {
                    title: "Create Support Ticket",
                    actions: [MessageBox.Action.YES, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: function (sAction) {
                        if (sAction === MessageBox.Action.YES) {
                            // Update email with ticket ID
                            oSelectedEmail.ticketId = ticketId;
                            oModel.updateBindings();

                            MessageToast.show(`Support ticket ${ticketId} created successfully`);

                            // Simulate sending confirmation email
                            setTimeout(() => {
                                MessageToast.show("Confirmation email sent to requester");
                            }, 1000);
                        }
                    }
                }
            );
        },

        onSettingsAccess() {
            console.log("Settings button clicked");
            this._openSettingsDialog();
        },

        _openSettingsDialog() {
            if (!this._oSettingsDialog) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "project1.view.SettingsDialog",
                    controller: this
                }).then((oDialog) => {
                    this._oSettingsDialog = oDialog;
                    this.getView().addDependent(this._oSettingsDialog);
                    this._initializeSettings();
                    this._oSettingsDialog.open();
                }).catch((error) => {
                    console.error("Failed to load Settings dialog:", error);
                    MessageBox.error("Failed to load Settings dialog");
                });
            } else {
                this._oSettingsDialog.open();
            }
        },

        onCloseSettingsDialog() {
            if (this._oSettingsDialog) {
                this._oSettingsDialog.close();
            }
        },

        _initializeSettings() {
            // Load saved settings from localStorage
            const savedSettings = this._loadSettings();

            if (this._oSettingsDialog) {
                // Apply saved settings to dialog controls
                this._oSettingsDialog.byId("themeSelect").setSelectedKey(savedSettings.theme);
                this._oSettingsDialog.byId("compactModeSwitch").setState(savedSettings.compactMode);
                this._oSettingsDialog.byId("animationsSwitch").setState(savedSettings.animations);
                this._oSettingsDialog.byId("fontSizeSelect").setSelectedKey(savedSettings.fontSize);
                this._oSettingsDialog.byId("layoutSelect").setSelectedKey(savedSettings.layout);

                // Notification settings
                this._oSettingsDialog.byId("emailNotificationsSwitch").setState(savedSettings.emailNotifications);
                this._oSettingsDialog.byId("browserNotificationsSwitch").setState(savedSettings.browserNotifications);
                this._oSettingsDialog.byId("soundAlertsSwitch").setState(savedSettings.soundAlerts);
                this._oSettingsDialog.byId("taskRemindersSwitch").setState(savedSettings.taskReminders);
                this._oSettingsDialog.byId("systemUpdatesSwitch").setState(savedSettings.systemUpdates);
                this._oSettingsDialog.byId("notificationFrequencySelect").setSelectedKey(savedSettings.notificationFrequency);

                // Privacy settings
                this._oSettingsDialog.byId("dataCollectionSwitch").setState(savedSettings.dataCollection);
                this._oSettingsDialog.byId("analyticsSwitch").setState(savedSettings.analytics);
                this._oSettingsDialog.byId("autoSaveSwitch").setState(savedSettings.autoSave);
                this._oSettingsDialog.byId("sessionTimeoutSelect").setSelectedKey(savedSettings.sessionTimeout);
                this._oSettingsDialog.byId("rememberLoginSwitch").setState(savedSettings.rememberLogin);

                // Update system status
                this._updateSystemStatus();
            }
        },

        _loadSettings() {
            // Default settings
            const defaultSettings = {
                theme: "sap_horizon",
                compactMode: true,
                animations: true,
                fontSize: "medium",
                layout: "default",
                emailNotifications: true,
                browserNotifications: false,
                soundAlerts: true,
                taskReminders: true,
                systemUpdates: true,
                notificationFrequency: "immediate",
                dataCollection: true,
                analytics: false,
                autoSave: true,
                sessionTimeout: "30",
                rememberLogin: true
            };

            try {
                const saved = localStorage.getItem("employeeDashboardSettings");
                return saved ? Object.assign(defaultSettings, JSON.parse(saved)) : defaultSettings;
            } catch (error) {
                console.error("Error loading settings:", error);
                return defaultSettings;
            }
        },

        _saveSettings(settings) {
            try {
                localStorage.setItem("employeeDashboardSettings", JSON.stringify(settings));
                console.log("Settings saved successfully");
                MessageToast.show("Settings saved successfully");
            } catch (error) {
                console.error("Error saving settings:", error);
                MessageToast.show("Failed to save settings");
            }
        },

        onLogout() {
            MessageBox.confirm("Are you sure you want to logout?", {
                title: "Confirm Logout",
                onClose: (sAction) => {
                    if (sAction === MessageBox.Action.OK) {
                        MessageToast.show("Logging out...");
                        // TODO: Implement logout functionality
                    }
                }
            });
        },

        // AI-Powered Features Demo
        onGetAIRecommendations() {
            MessageToast.show("Generating AI-powered learning recommendations...");

            // This would call the OpenAI service
            const oModel = this.getView().getModel();
            const oEmployee = oModel.getProperty("/employee");

            // Simulate AI service call
            setTimeout(() => {
                MessageBox.information(
                    `🤖 AI-Powered Learning Recommendations for ${oEmployee.firstName}:\n\n` +
                    `📚 Based on your role in ${oEmployee.department}, I recommend:\n\n` +
                    `• Advanced SAP ABAP Programming\n` +
                    `• SAP Fiori Development Fundamentals\n` +
                    `• Business Process Integration\n` +
                    `• Cloud Architecture Patterns\n\n` +
                    `💡 These recommendations are personalized based on your current progress and career goals.`,
                    {
                        title: "AI Learning Assistant"
                    }
                );
            }, 1500);
        },

        onGetAITaskHelp() {
            MessageToast.show("Getting AI assistance for your current tasks...");

            setTimeout(() => {
                MessageBox.information(
                    `🤖 AI Task Assistant:\n\n` +
                    `Based on your current tasks, here are some helpful suggestions:\n\n` +
                    `📋 For "Complete Onboarding Training":\n` +
                    `• Focus on SAP GUI navigation first\n` +
                    `• Take notes on business processes\n` +
                    `• Practice transaction codes daily\n\n` +
                    `🔍 For "First Code Review Assignment":\n` +
                    `• Review coding standards document\n` +
                    `• Use collaborative review tools\n` +
                    `• Ask questions about unclear code\n\n` +
                    `💬 Need more specific help? Ask your mentor or use the help desk!`,
                    {
                        title: "AI Task Assistant"
                    }
                );
            }, 1200);
        },

        // Main Chatbot Functionality
        onOpenChatbot() {
            if (!this._oChatbotDialog) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "project1.view.ChatbotDialog",
                    controller: this
                }).then((oDialog) => {
                    this._oChatbotDialog = oDialog;
                    this.getView().addDependent(this._oChatbotDialog);
                    this._initializeChatbot();
                    this._oChatbotDialog.open();
                });
            } else {
                this._oChatbotDialog.open();
            }
        },

        _initializeChatbot() {
            const oModel = this.getView().getModel();
            const oEmployee = oModel.getProperty("/employee");

            const oChatModel = new JSONModel({
                chatMessages: [],
                currentMessage: "",
                isTyping: false,
                chatSession: {
                    startTime: new Date().toLocaleTimeString(),
                    messageCount: 0
                },
                userContext: {
                    firstName: oEmployee.firstName,
                    lastName: oEmployee.lastName,
                    department: oEmployee.department,
                    role: oEmployee.role
                }
            });

            this._oChatbotDialog.setModel(oChatModel);
            this._conversationHistory = [];
        },

        onSendMessage() {
            const oChatModel = this._oChatbotDialog.getModel();
            const sMessage = oChatModel.getProperty("/currentMessage");

            if (!sMessage || sMessage.trim().length === 0) {
                return;
            }

            // Add user message
            this._addChatMessage("user", sMessage.trim());

            // Clear input and show typing indicator
            oChatModel.setProperty("/currentMessage", "");
            oChatModel.setProperty("/isTyping", true);

            // Scroll to bottom
            setTimeout(() => this._scrollToBottom(), 100);

            // Send to AI service
            this._sendToAI(sMessage.trim());
        },

        onQuickAction(oEvent) {
            const sMessage = oEvent.getSource().data("message");
            const oChatModel = this._oChatbotDialog.getModel();
            oChatModel.setProperty("/currentMessage", sMessage);
            this.onSendMessage();
        },

        async _sendToAI(sMessage) {
            const oChatModel = this._oChatbotDialog.getModel();
            const oUserContext = oChatModel.getProperty("/userContext");

            console.log('🤖 Sending message to Google AI:', sMessage);

            try {
                // Call the Google AI service via OData action
                const oModel = this.getView().getModel();
                const sServiceUrl = oModel.sServiceUrl || '/odata/v4/intern-onboarding';

                const oData = {
                    message: sMessage,
                    conversationHistory: JSON.stringify(this._conversationHistory),
                    userContext: JSON.stringify(oUserContext)
                };

                console.log('🤖 Calling Google AI service with data:', oData);

                // Make the API call using fetch for better error handling
                const response = await fetch(`${sServiceUrl}/chat`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(oData)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const responseData = await response.json();

                console.log('🤖 Google AI Response received:', responseData);

                // Add AI response
                setTimeout(() => {
                    oChatModel.setProperty("/isTyping", false);
                    const aiResponse = responseData.response || responseData.value?.response || "I'm here to help! Could you please rephrase your question?";
                    this._addChatMessage("ai", aiResponse);
                    this._scrollToBottom();
                }, 800); // Simulate thinking time

            } catch (error) {
                console.error('❌ Error calling Google AI service:', error);

                // Fallback to enhanced mock response
                setTimeout(() => {
                    oChatModel.setProperty("/isTyping", false);
                    this._addChatMessage("ai", this._getEnhancedMockResponse(sMessage, oUserContext));
                    this._scrollToBottom();
                }, 1000);
            }
        },

        _getEnhancedMockResponse(sMessage, oUserContext) {
            const lowerMessage = sMessage.toLowerCase();
            const userName = oUserContext.firstName || 'there';
            const userDept = oUserContext.department || 'your department';

            if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
                return `Hello ${userName}! 👋 I'm your AI onboarding assistant. I'm here to help you with any questions about your role in ${userDept}, learning resources, tasks, or company policies.

🎯 **I can help you with:**
• Task guidance and project assistance
• Learning recommendations and training resources
• Company policy explanations
• Career development advice
• General onboarding support

What would you like to know about today?`;
            }

            if (lowerMessage.includes('task') || lowerMessage.includes('assignment')) {
                return `I'd be happy to help with your tasks, ${userName}! 📋

**For your current assignments, I recommend:**

🔹 **Break it down**: Divide complex tasks into smaller, manageable steps
🔹 **Set milestones**: Create checkpoints to track your progress
🔹 **Ask questions**: Don't hesitate to reach out when you're stuck
🔹 **Document progress**: Keep notes on what you learn
🔹 **Regular check-ins**: Schedule updates with your supervisor

**Specific to ${userDept}:**
• Use collaborative tools for code reviews
• Follow department coding standards
• Participate in team stand-ups
• Test your work thoroughly before submission

Is there a specific task you'd like detailed guidance on?`;
            }

            if (lowerMessage.includes('learn') || lowerMessage.includes('training') || lowerMessage.includes('course')) {
                return `Excellent question about learning, ${userName}! 🎓

**For someone in ${userDept}, I recommend:**

📚 **Technical Skills:**
• Advanced programming fundamentals
• Software architecture patterns
• Database design and optimization
• API development and integration
• Testing methodologies and frameworks

🛠️ **Tools & Technologies:**
• Version control (Git) best practices
• CI/CD pipeline management
• Cloud platforms and services
• Development environment setup
• Debugging and profiling tools

💼 **Professional Development:**
• Communication skills for technical teams
• Project management methodologies
• Code review and collaboration
• Technical documentation writing
• Leadership and mentoring skills

**Next Steps:**
1. Check our internal learning portal for courses
2. Join relevant professional communities
3. Find a mentor in your department
4. Attend tech talks and workshops

Would you like specific course recommendations or learning paths?`;
            }

            if (lowerMessage.includes('policy') || lowerMessage.includes('rule') || lowerMessage.includes('guideline')) {
                return `I can help with company policies, ${userName}! 📚

**Key Policy Areas:**

🏢 **Employee Handbook:**
• Work hours and attendance policies
• Dress code and workplace conduct
• Benefits and compensation information
• Performance review processes

🔒 **IT Security Policies:**
• Password requirements and 2FA
• Data protection and privacy guidelines
• Software installation procedures
• Remote work security protocols

📋 **HR Policies:**
• Leave and vacation policies
• Professional development opportunities
• Grievance and feedback procedures
• Equal opportunity and diversity guidelines

**How to Access:**
• Company intranet policy portal
• HR department resources
• Manager or mentor guidance
• New employee orientation materials

Is there a specific policy area you'd like to know more about?`;
            }

            if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
                return `I'm here to support you, ${userName}! 🤝

**Available Support Resources:**

👨‍💼 **Direct Support:**
• **Your Supervisor**: Day-to-day guidance and task clarification
• **Assigned Mentor**: Career advice and professional development
• **HR Team**: Policy questions and workplace concerns
• **IT Help Desk**: Technical issues and system access

🤖 **AI Assistant (Me!):**
• 24/7 availability for quick questions
• Learning resource recommendations
• Task guidance and best practices
• Policy clarifications and explanations

📞 **Emergency Contacts:**
• IT Help Desk: ext. 2222
• HR Department: ext. 3333
• Security: ext. 9999
• Building Management: ext. 1111

**Remember:** Asking questions shows initiative and helps you learn faster. Don't hesitate to reach out whenever you need assistance!

What specific area would you like help with today?`;
            }

            if (lowerMessage.includes('career') || lowerMessage.includes('growth') || lowerMessage.includes('development')) {
                return `Great to see you thinking about career development, ${userName}! 🚀

**Career Growth in ${userDept}:**

📈 **Typical Career Path:**
• Junior Developer → Mid-level Developer → Senior Developer
• Technical Lead → Engineering Manager → Director
• Specialist tracks: Architect, Principal Engineer, etc.

🎯 **Key Skills to Develop:**
• **Technical Excellence**: Master your core technologies
• **Communication**: Present ideas clearly and collaborate effectively
• **Leadership**: Mentor others and lead projects
• **Business Acumen**: Understand how technology drives business value

💡 **Growth Opportunities:**
• Internal training programs and certifications
• Conference attendance and speaking opportunities
• Cross-functional project participation
• Open source contributions
• Innovation and research projects

**Action Steps:**
1. Set up regular career discussions with your manager
2. Create a personal development plan
3. Seek stretch assignments and new challenges
4. Build your professional network
5. Document your achievements and impact

Would you like help creating a specific development plan?`;
            }

            // Default comprehensive response
            return `Thanks for your question, ${userName}! I'm your AI onboarding assistant, and I'm here to help you succeed in ${userDept}.

**I can assist you with:**

🎯 **Task & Project Guidance**
• Breaking down complex assignments
• Best practices and methodologies
• Progress tracking and milestone planning

📚 **Learning & Development**
• Course and training recommendations
• Skill development roadmaps
• Professional growth planning

📋 **Company Information**
• Policy explanations and guidelines
• Process documentation and procedures
• Resource locations and contacts

🤝 **General Support**
• Onboarding questions and concerns
• Team integration and collaboration
• Work-life balance and wellness

**Popular Questions:**
• "Help me with my current tasks"
• "What learning resources do you recommend?"
• "Explain company policies"
• "How can I grow my career here?"

Feel free to ask me anything specific about your onboarding journey!`;
        },

        _addChatMessage(sType, sMessage) {
            const oChatModel = this._oChatbotDialog.getModel();
            const aMessages = oChatModel.getProperty("/chatMessages") || [];
            const oMessage = {
                type: sType,
                message: sMessage,
                timestamp: new Date().toLocaleTimeString()
            };

            console.log('📝 Adding chat message:', oMessage);

            aMessages.push(oMessage);
            oChatModel.setProperty("/chatMessages", aMessages);

            console.log('📝 Total messages now:', aMessages.length);
            console.log('📝 All messages:', aMessages);

            // Update conversation history for AI context
            this._conversationHistory.push({
                role: sType === "user" ? "user" : "assistant",
                content: sMessage
            });

            // Update message count
            const iCount = oChatModel.getProperty("/chatSession/messageCount");
            oChatModel.setProperty("/chatSession/messageCount", iCount + 1);

            // Force model refresh
            oChatModel.refresh();
        },

        _scrollToBottom() {
            setTimeout(() => {
                const oScrollContainer = this.byId("chatMessagesContainer");
                if (oScrollContainer) {
                    const oDomRef = oScrollContainer.getDomRef();
                    if (oDomRef) {
                        oDomRef.scrollTop = oDomRef.scrollHeight;
                    }
                }

                // Also try to scroll the messages list
                const oMessagesList = this.byId("dynamicMessages");
                if (oMessagesList) {
                    const oListDomRef = oMessagesList.getDomRef();
                    if (oListDomRef) {
                        oListDomRef.scrollTop = oListDomRef.scrollHeight;
                    }
                }
            }, 200);
        },

        onClearChat() {
            MessageBox.confirm("Are you sure you want to clear the chat history?", {
                title: "Clear Chat",
                onClose: (sAction) => {
                    if (sAction === MessageBox.Action.OK) {
                        const oChatModel = this._oChatbotDialog.getModel();
                        oChatModel.setProperty("/chatMessages", []);
                        oChatModel.setProperty("/chatSession/messageCount", 0);
                        this._conversationHistory = [];
                        MessageToast.show("Chat cleared");
                    }
                }
            });
        },

        onCloseChatbot() {
            this._oChatbotDialog.close();
        },

        // Dialog Data Loading Methods
        _loadPolicyData() {
            // Comprehensive mock policy data
            const oPolicyModel = new JSONModel({
                policyCategories: [
                    {
                        id: "POL001",
                        title: "Employee Handbook",
                        description: "Complete guide to company policies, procedures, and benefits",
                        icon: "sap-icon://document",
                        lastAccessed: "2024-12-10",
                        status: "Acknowledged"
                    },
                    {
                        id: "POL002",
                        title: "Code of Conduct",
                        description: "Ethical guidelines, behavioral expectations, and compliance requirements",
                        icon: "sap-icon://shield",
                        lastAccessed: "2024-12-08",
                        status: "Acknowledged"
                    },
                    {
                        id: "POL003",
                        title: "Information Security Policy",
                        description: "Data protection, cybersecurity guidelines, and IT usage policies",
                        icon: "sap-icon://locked",
                        lastAccessed: "Never",
                        status: "Pending"
                    },
                    {
                        id: "POL004",
                        title: "Workplace Safety Guidelines",
                        description: "Health and safety procedures, emergency protocols, and incident reporting",
                        icon: "sap-icon://warning",
                        lastAccessed: "2024-12-05",
                        status: "Acknowledged"
                    },
                    {
                        id: "POL005",
                        title: "Remote Work Policy",
                        description: "Guidelines for remote work, hybrid schedules, and home office setup",
                        icon: "sap-icon://home",
                        lastAccessed: "Never",
                        status: "Pending"
                    },
                    {
                        id: "POL006",
                        title: "Professional Development",
                        description: "Learning opportunities, career advancement, and skill development programs",
                        icon: "sap-icon://learning-assistant",
                        lastAccessed: "2024-12-12",
                        status: "Reviewed"
                    }
                ],
                selectedPolicy: {
                    title: "Welcome to Company Policies",
                    content: "Please select a policy category from the list to view detailed information.\n\nAll employees are required to read and acknowledge key policies within their first 30 days.\n\nFor questions about any policy, please contact HR at hr@company.com",
                    lastUpdated: "",
                    requiresAcknowledgment: false,
                    version: "",
                    effectiveDate: ""
                },
                acknowledgmentEnabled: false,
                acknowledgmentHistory: [
                    {
                        policyId: "POL001",
                        policyTitle: "Employee Handbook",
                        acknowledgedDate: "2024-12-10",
                        version: "v2.1"
                    },
                    {
                        policyId: "POL002",
                        policyTitle: "Code of Conduct",
                        acknowledgedDate: "2024-12-08",
                        version: "v1.5"
                    }
                ]
            });
            this._oPolicyDialog.setModel(oPolicyModel);
        },

        _loadLearningData() {
            // Real SAP Learning Content
            const oLearningModel = new JSONModel({

                // Real SAP Learning Paths - Basic to Advanced
                learningPaths: [
                    {
                        id: "SAP_BASICS",
                        name: "SAP Basics and Navigation",
                        description: "Learn the fundamentals of SAP software, including navigation, basic concepts, and system overview. Perfect starting point for SAP beginners.",
                        level: "Beginner",
                        duration: "8-12 hours",
                        certification: "SAP Certified User",
                        icon: "sap-icon://learning-assistant",
                        color: "#107e3e",
                        url: "https://learning.sap.com"
                    },
                    {
                        id: "SAP_S4HANA",
                        name: "SAP S/4HANA Fundamentals",
                        description: "Comprehensive introduction to SAP S/4HANA including Finance, Procurement, Manufacturing, and Sales modules.",
                        level: "Intermediate",
                        duration: "20-30 hours",
                        certification: "SAP S/4HANA Certified",
                        icon: "sap-icon://business-suite",
                        color: "#0070f2",
                        url: "https://learning.sap.com/courses"
                    },
                    {
                        id: "SAP_FIORI",
                        name: "SAP Fiori Development",
                        description: "Learn to develop modern, responsive SAP Fiori applications using UI5, OData services, and SAP Cloud Platform.",
                        level: "Advanced",
                        duration: "40-60 hours",
                        certification: "SAP Fiori Developer",
                        icon: "sap-icon://developer-settings",
                        color: "#e9730c",
                        url: "https://developers.sap.com/tutorial-navigator.html"
                    },
                    {
                        id: "SAP_ANALYTICS",
                        name: "SAP Analytics Cloud",
                        description: "Master business intelligence and analytics with SAP Analytics Cloud, including data modeling, visualization, and planning.",
                        level: "Intermediate",
                        duration: "25-35 hours",
                        certification: "SAP Analytics Certified",
                        icon: "sap-icon://chart-axis",
                        color: "#bb0000",
                        url: "https://learning.sap.com/learning-journeys"
                    },
                    {
                        id: "SAP_INTEGRATION",
                        name: "SAP Integration Suite",
                        description: "Learn enterprise integration patterns, API management, and cloud integration using SAP Integration Suite.",
                        level: "Advanced",
                        duration: "30-45 hours",
                        certification: "SAP Integration Specialist",
                        icon: "sap-icon://connected",
                        color: "#5b738b",
                        url: "https://open.sap.com"
                    }
                ],
                // Real SAP Learning Resources
                learningResources: [
                    {
                        name: "SAP Learning Hub",
                        description: "Official SAP training platform with courses, learning journeys, and certifications",
                        type: "Training Platform",
                        icon: "sap-icon://learning-assistant",
                        color: "#0070f2",
                        url: "https://learning.sap.com"
                    },
                    {
                        name: "SAP Help Portal",
                        description: "Comprehensive documentation, guides, and technical references for all SAP products",
                        type: "Documentation",
                        icon: "sap-icon://document",
                        color: "#107e3e",
                        url: "https://help.sap.com"
                    },
                    {
                        name: "SAP Community",
                        description: "Connect with SAP experts, ask questions, and share knowledge with the global SAP community",
                        type: "Community",
                        icon: "sap-icon://group",
                        color: "#e9730c",
                        url: "https://community.sap.com"
                    },
                    {
                        name: "SAP Developer Center",
                        description: "Resources for developers including tutorials, APIs, SDKs, and development tools",
                        type: "Development",
                        icon: "sap-icon://developer-settings",
                        color: "#bb0000",
                        url: "https://developers.sap.com"
                    },
                    {
                        name: "SAP Trial Systems",
                        description: "Free access to SAP systems for hands-on practice and learning",
                        type: "Practice Environment",
                        icon: "sap-icon://lab",
                        color: "#5b738b",
                        url: "https://developers.sap.com/trials-downloads.html"
                    },
                    {
                        name: "openSAP",
                        description: "Free online courses on latest SAP innovations, technologies, and business trends",
                        type: "Free Courses",
                        icon: "sap-icon://course-book",
                        color: "#f0ab00",
                        url: "https://open.sap.com"
                    }
                ],



            });
            this._oLearningDialog.setModel(oLearningModel);
        },

        async _loadNotesData() {
            try {
                // Load notes from database
                const notes = await this._notesDatabase.getAllNotes();

                // If no notes exist, create some sample notes
                if (notes.length === 0) {
                    await this._createSampleNotes();
                    const updatedNotes = await this._notesDatabase.getAllNotes();
                    this._setupNotesModel(updatedNotes);
                } else {
                    this._setupNotesModel(notes);
                }
            } catch (error) {
                console.error("Error loading notes:", error);
                MessageToast.show("Error loading notes");
                // Fallback to empty model
                this._setupNotesModel([]);
            }
        },

        /**
         * Setup the notes model
         */
        _setupNotesModel(notes) {
            console.log("Setting up notes model with", notes.length, "notes:", notes);

            const oNotesModel = new JSONModel({
                notes: notes,
                currentNote: {
                    id: "",
                    title: "Welcome to Notion-like Notes! 📝",
                    blocks: [],
                    created: new Date().toISOString(),
                    lastModified: new Date().toISOString(),
                    wordCount: 0,
                    charCount: 0,
                    category: "Personal",
                    preview: "Start creating your first note..."
                },
                categories: ["Personal", "Work", "Projects", "Ideas", "Meeting Notes"],
                autoSaveEnabled: this._autoSaveEnabled
            });

            this._oNotesDialog.setModel(oNotesModel);
            console.log("Notes model set up successfully");
        },

        /**
         * Create sample notes for demonstration
         */
        async _createSampleNotes() {
            const sampleNotes = [
                {
                    title: "🚀 Welcome to Notion-like Notes",
                    category: "Personal",
                    tags: ["welcome", "tutorial"]
                },
                {
                    title: "📋 Project Planning Template",
                    category: "Work",
                    tags: ["template", "project"]
                }
            ];

            for (const noteData of sampleNotes) {
                try {
                    const note = await this._notesDatabase.createNote(noteData);

                    // Create sample blocks for the welcome note
                    if (note.title.includes("Welcome")) {
                        await this._createWelcomeBlocks(note.id);
                    } else if (note.title.includes("Project")) {
                        await this._createProjectBlocks(note.id);
                    }
                } catch (error) {
                    console.error("Error creating sample note:", error);
                }
            }
        },

        /**
         * Create welcome blocks
         */
        async _createWelcomeBlocks(noteId) {
            const welcomeBlocks = [
                { type: "heading_1", content: "Welcome to Notion-like Notes! 🎉", order: 0 },
                { type: "paragraph", content: "This is a powerful note-taking system inspired by Notion.", order: 1 },
                { type: "heading_2", content: "Features", order: 2 },
                { type: "bulleted_list_item", content: "Block-based editing", order: 3 },
                { type: "bulleted_list_item", content: "Real-time auto-save", order: 4 },
                { type: "bulleted_list_item", content: "SQLite/IndexedDB storage", order: 5 },
                { type: "bulleted_list_item", content: "Rich text formatting", order: 6 },
                { type: "heading_2", content: "Getting Started", order: 7 },
                { type: "numbered_list_item", content: "Click '+ Add Block' to create new content", order: 8 },
                { type: "numbered_list_item", content: "Use different block types for structure", order: 9 },
                { type: "numbered_list_item", content: "Your notes are automatically saved", order: 10 },
                { type: "quote", content: "Start writing and see the magic happen!", order: 11 }
            ];

            for (const blockData of welcomeBlocks) {
                await this._blockManager.createBlock(noteId, blockData);
            }
        },

        /**
         * Create project planning blocks
         */
        async _createProjectBlocks(noteId) {
            const projectBlocks = [
                { type: "heading_1", content: "Project Planning Template 📋", order: 0 },
                { type: "heading_2", content: "Project Overview", order: 1 },
                { type: "paragraph", content: "Brief description of the project goals and objectives.", order: 2 },
                { type: "heading_2", content: "Tasks", order: 3 },
                { type: "to_do", content: "Define project scope", order: 4, properties: { checked: false } },
                { type: "to_do", content: "Create timeline", order: 5, properties: { checked: false } },
                { type: "to_do", content: "Assign team members", order: 6, properties: { checked: false } },
                { type: "heading_2", content: "Resources", order: 7 },
                { type: "bulleted_list_item", content: "Team members", order: 8 },
                { type: "bulleted_list_item", content: "Budget allocation", order: 9 },
                { type: "bulleted_list_item", content: "Tools and software", order: 10 }
            ];

            for (const blockData of projectBlocks) {
                await this._blockManager.createBlock(noteId, blockData);
            }
        },

        // Dialog Event Handlers
        onClosePolicyDialog() {
            this._oPolicyDialog.close();
        },

        onCloseLearningDialog() {
            this._oLearningDialog.close();
        },

        onCloseNotesDialog() {
            this._oNotesDialog.close();
        },

        onPolicyCategorySelect(oEvent) {
            const oSelectedItem = oEvent.getParameter("listItem");
            const sTitle = oSelectedItem.getTitle();

            // Comprehensive mock policy content
            const oPolicyContent = {
                "Employee Handbook": {
                    title: "Employee Handbook - Complete Guide",
                    content: "# Employee Handbook\n\n## Welcome to Our Company!\n\nThis handbook contains essential information about our company culture, policies, procedures, and your rights and responsibilities as an employee.\n\n## Table of Contents\n\n### 1. Company Overview\n- Mission, Vision, and Values\n- Organizational Structure\n- History and Milestones\n\n### 2. Employment Policies\n- Equal Opportunity Employment\n- Anti-Discrimination and Harassment\n- Workplace Conduct\n- Attendance and Punctuality\n\n### 3. Benefits and Compensation\n- Salary and Performance Reviews\n- Health Insurance\n- Retirement Plans\n- Paid Time Off\n- Professional Development\n\n### 4. Workplace Guidelines\n- Dress Code\n- Communication Standards\n- Technology Usage\n- Social Media Policy\n\n### 5. Safety and Security\n- Emergency Procedures\n- Incident Reporting\n- Health and Safety Protocols\n\n## Important Notes\n- This handbook is updated annually\n- All employees must acknowledge receipt\n- Questions should be directed to HR\n\n*Last Updated: November 2024*",
                    lastUpdated: "November 2024",
                    version: "v2.1",
                    effectiveDate: "January 1, 2024",
                    requiresAcknowledgment: true
                },
                "Code of Conduct": {
                    title: "Code of Conduct - Ethical Guidelines",
                    content: "# Code of Conduct\n\n## Our Commitment to Ethics\n\nOur Code of Conduct outlines the ethical standards and behavioral expectations for all employees, contractors, and business partners.\n\n## Core Principles\n\n### 1. Integrity and Honesty\n- Act with honesty in all business dealings\n- Report unethical behavior promptly\n- Avoid conflicts of interest\n- Maintain accurate records\n\n### 2. Respect for Others\n- Treat all individuals with dignity and respect\n- Embrace diversity and inclusion\n- Maintain a harassment-free workplace\n- Respect privacy and confidentiality\n\n### 3. Professional Excellence\n- Deliver high-quality work\n- Continuously improve skills and knowledge\n- Collaborate effectively with teams\n- Meet commitments and deadlines\n\n### 4. Legal Compliance\n- Follow all applicable laws and regulations\n- Respect intellectual property rights\n- Maintain data protection standards\n- Report legal concerns immediately\n\n## Reporting Violations\n- Contact your manager or HR\n- Use anonymous reporting hotline: 1-800-ETHICS\n- Email: ethics@company.com\n- No retaliation for good faith reports\n\n## Consequences\nViolations may result in disciplinary action, up to and including termination.\n\n*Remember: When in doubt, ask for guidance.*",
                    lastUpdated: "October 2024",
                    version: "v1.5",
                    effectiveDate: "October 1, 2024",
                    requiresAcknowledgment: true
                },
                "Information Security Policy": {
                    title: "Information Security Policy",
                    content: "# Information Security Policy\n\n## Purpose\nTo protect company and customer data from unauthorized access, disclosure, modification, or destruction.\n\n## Scope\nApplies to all employees, contractors, and third parties with access to company systems.\n\n## Password Requirements\n- Minimum 12 characters\n- Include uppercase, lowercase, numbers, and symbols\n- Change every 90 days\n- No password reuse for last 12 passwords\n- Use multi-factor authentication where available\n\n## Data Classification\n\n### Public\n- Marketing materials\n- Published documentation\n- General company information\n\n### Internal\n- Employee directories\n- Internal procedures\n- Non-sensitive business data\n\n### Confidential\n- Customer data\n- Financial information\n- Strategic plans\n- Employee personal information\n\n### Restricted\n- Trade secrets\n- Legal documents\n- Security credentials\n- Merger and acquisition data\n\n## Acceptable Use\n- Use company systems only for business purposes\n- No personal software installation\n- Report security incidents immediately\n- Keep software updated\n- Lock workstations when away\n\n## Incident Response\n1. Immediately report suspected security incidents\n2. Contact IT Security: security@company.com\n3. Do not attempt to investigate on your own\n4. Preserve evidence if possible\n\n## Training Requirements\n- Annual security awareness training\n- Phishing simulation exercises\n- Role-specific security training\n\n*Violations may result in disciplinary action and legal consequences.*",
                    lastUpdated: "December 2024",
                    version: "v3.0",
                    effectiveDate: "December 1, 2024",
                    requiresAcknowledgment: true
                },
                "Workplace Safety Guidelines": {
                    title: "Workplace Safety Guidelines",
                    content: "# Workplace Safety Guidelines\n\n## Our Commitment to Safety\nEmployee safety is our top priority. These guidelines help ensure a safe and healthy work environment for everyone.\n\n## General Safety Rules\n\n### Office Environment\n- Keep walkways clear of obstacles\n- Report spills immediately\n- Use proper lifting techniques\n- Maintain good posture at workstations\n- Take regular breaks to prevent strain\n\n### Ergonomics\n- Adjust chair and monitor height properly\n- Use ergonomic keyboards and mice\n- Position monitor 20-26 inches from eyes\n- Take micro-breaks every 30 minutes\n- Report discomfort early\n\n## Emergency Procedures\n\n### Fire Emergency\n1. Activate fire alarm\n2. Evacuate using nearest exit\n3. Proceed to designated assembly area\n4. Do not use elevators\n5. Wait for all-clear from emergency personnel\n\n### Medical Emergency\n1. Call 911 immediately\n2. Notify building security\n3. Provide first aid if trained\n4. Do not move injured person unless necessary\n5. Report incident to HR within 24 hours\n\n### Severe Weather\n- Monitor weather alerts\n- Follow building emergency procedures\n- Stay away from windows during storms\n- Know location of emergency shelters\n\n## Incident Reporting\n- Report all incidents, no matter how minor\n- Use online incident reporting system\n- Notify supervisor immediately\n- Seek medical attention if needed\n- Complete incident report within 24 hours\n\n## Personal Protective Equipment\n- Use required PPE in designated areas\n- Inspect equipment before use\n- Report damaged equipment\n- Attend PPE training sessions\n\n## Health and Wellness\n- Participate in wellness programs\n- Use employee assistance programs\n- Report health and safety concerns\n- Maintain clean work areas\n\n*Safety is everyone's responsibility. When in doubt, ask for help.*",
                    lastUpdated: "September 2024",
                    version: "v2.3",
                    effectiveDate: "September 1, 2024",
                    requiresAcknowledgment: true
                },
                "Remote Work Policy": {
                    title: "Remote Work Policy",
                    content: "# Remote Work Policy\n\n## Purpose\nTo establish guidelines for remote work arrangements that maintain productivity, collaboration, and work-life balance.\n\n## Eligibility\n- Employees in good standing\n- Roles suitable for remote work\n- Manager approval required\n- Minimum 6 months employment\n\n## Work Arrangements\n\n### Fully Remote\n- Work from home full-time\n- Quarterly in-person meetings\n- Annual performance reviews in office\n\n### Hybrid Schedule\n- 2-3 days in office per week\n- Core collaboration days: Tuesday-Thursday\n- Flexible Monday and Friday\n\n### Temporary Remote\n- Short-term arrangements\n- Medical or family reasons\n- Weather or emergency situations\n\n## Home Office Requirements\n\n### Technology\n- Reliable high-speed internet (minimum 25 Mbps)\n- Company-provided laptop and equipment\n- Secure, private workspace\n- Backup power source recommended\n\n### Environment\n- Dedicated workspace\n- Ergonomic setup\n- Good lighting\n- Minimal distractions\n- Professional background for video calls\n\n## Communication Standards\n\n### Availability\n- Core hours: 9 AM - 3 PM local time\n- Respond to messages within 4 hours\n- Update calendar with availability\n- Use status indicators in chat tools\n\n### Meetings\n- Video on for team meetings\n- Mute when not speaking\n- Test technology before important calls\n- Have backup communication method\n\n## Performance Expectations\n- Maintain same productivity standards\n- Meet all deadlines and commitments\n- Participate actively in team activities\n- Complete regular check-ins with manager\n\n## Security Requirements\n- Use VPN for company network access\n- Keep software updated\n- Secure physical workspace\n- Follow data protection guidelines\n- Report security incidents immediately\n\n## Expense Reimbursement\n- Internet costs up to $50/month\n- Ergonomic equipment as approved\n- Home office supplies\n- Submit receipts within 30 days\n\n*Remote work is a privilege that requires responsibility and accountability.*",
                    lastUpdated: "November 2024",
                    version: "v1.2",
                    effectiveDate: "November 1, 2024",
                    requiresAcknowledgment: true
                },
                "Professional Development": {
                    title: "Professional Development Policy",
                    content: "# Professional Development Policy\n\n## Our Investment in You\nWe believe in continuous learning and growth. This policy outlines opportunities and resources available for your professional development.\n\n## Learning Opportunities\n\n### Internal Training\n- Lunch and learn sessions\n- Technical workshops\n- Leadership development programs\n- Mentorship programs\n- Cross-functional projects\n\n### External Training\n- Conference attendance\n- Professional certifications\n- Online course subscriptions\n- University partnerships\n- Industry workshops\n\n## Tuition Reimbursement\n\n### Eligibility\n- Full-time employees\n- Minimum 1 year employment\n- Job-related coursework\n- Pre-approval required\n\n### Coverage\n- Up to $5,000 per calendar year\n- 100% for grades A or B\n- 50% for grade C\n- No reimbursement for grades below C\n\n### Requirements\n- Maintain employment for 2 years after completion\n- Submit transcripts within 60 days\n- Share learnings with team\n\n## Career Development\n\n### Individual Development Plans\n- Annual goal setting\n- Skill gap analysis\n- Career path discussions\n- Regular progress reviews\n\n### Internal Mobility\n- Job posting notifications\n- Internal interview opportunities\n- Skill-building assignments\n- Rotation programs\n\n## Time Allocation\n- 10% of work time for learning\n- Dedicated learning days quarterly\n- Conference time as approved\n- Study time for certifications\n\n## Resources Available\n\n### Learning Platforms\n- LinkedIn Learning\n- Coursera for Business\n- Pluralsight\n- Internal learning management system\n\n### Books and Materials\n- Technical book library\n- Subscription to industry publications\n- Research database access\n\n## Measuring Success\n- Skill assessments\n- Performance improvements\n- Career advancement\n- Knowledge sharing contributions\n- Innovation and creativity\n\n*Your growth is our success. Take advantage of these opportunities!*",
                    lastUpdated: "October 2024",
                    version: "v1.8",
                    effectiveDate: "October 1, 2024",
                    requiresAcknowledgment: false
                }
            };

            const oModel = this._oPolicyDialog.getModel();
            const oContent = oPolicyContent[sTitle] || {
                title: sTitle,
                content: "Policy content is being loaded...\n\nPlease contact HR if you need immediate access to this policy.\n\nEmail: hr@company.com\nPhone: (555) 123-4567",
                lastUpdated: "Recent",
                version: "v1.0",
                effectiveDate: "Current",
                requiresAcknowledgment: false
            };

            oModel.setProperty("/selectedPolicy", oContent);
            oModel.setProperty("/acknowledgmentEnabled", false);
        },

        onAcknowledgmentChange(oEvent) {
            const bSelected = oEvent.getParameter("selected");
            const oModel = this._oPolicyDialog.getModel();
            oModel.setProperty("/acknowledgmentEnabled", bSelected);
        },

        onAcknowledgePolicy() {
            MessageToast.show("Policy acknowledged successfully");
            const oModel = this._oPolicyDialog.getModel();
            oModel.setProperty("/acknowledgmentEnabled", false);
        },

        onViewPolicy(oEvent) {
            const oButton = oEvent.getSource();
            const sPolicyTitle = oButton.data("policyTitle");
            const sPolicyId = oButton.data("policyId");

            MessageToast.show(`Opening ${sPolicyTitle}...`);

            // Use the helper method to load policy content
            this._loadPolicyContent(sPolicyTitle);
        },

        onDownloadPolicy(oEvent) {
            const oButton = oEvent.getSource();
            const sPolicyTitle = oButton.data("policyTitle");
            const sPolicyId = oButton.data("policyId");

            MessageToast.show(`Downloading ${sPolicyTitle} as PDF...`);

            // Simulate PDF download
            setTimeout(() => {
                MessageToast.show(`${sPolicyTitle} downloaded successfully!`);
            }, 1500);
        },

        onPrintPolicy() {
            const oModel = this._oPolicyDialog.getModel();
            const sPolicyTitle = oModel.getProperty("/selectedPolicy/title");

            MessageToast.show(`Preparing ${sPolicyTitle} for printing...`);

            // Simulate print preparation
            setTimeout(() => {
                MessageToast.show("Print dialog opened. Please check your printer settings.");
            }, 1000);
        },

        onSharePolicy() {
            const oModel = this._oPolicyDialog.getModel();
            const sPolicyTitle = oModel.getProperty("/selectedPolicy/title");

            MessageToast.show(`Generating shareable link for ${sPolicyTitle}...`);

            // Simulate share link generation
            setTimeout(() => {
                MessageToast.show("Share link copied to clipboard!");
            }, 1200);
        },

        onPolicyItemPress(oEvent) {
            const oListItem = oEvent.getSource();
            const oBindingContext = oListItem.getBindingContext();
            const sPolicyTitle = oBindingContext.getProperty("title");

            MessageToast.show(`Loading ${sPolicyTitle}...`);

            // Use the same logic as onViewPolicy but get data from binding context
            this._loadPolicyContent(sPolicyTitle);
        },

        _loadPolicyContent(sPolicyTitle) {
            // Comprehensive mock policy content (same as in onViewPolicy)
            const oPolicyContent = {
                "Employee Handbook": {
                    title: "Employee Handbook - Complete Guide",
                    content: "# Employee Handbook\n\n## Welcome to Our Company!\n\nThis handbook contains essential information about our company culture, policies, procedures, and your rights and responsibilities as an employee.\n\n## Table of Contents\n\n### 1. Company Overview\n- Mission, Vision, and Values\n- Organizational Structure\n- History and Milestones\n\n### 2. Employment Policies\n- Equal Opportunity Employment\n- Anti-Discrimination and Harassment\n- Workplace Conduct\n- Attendance and Punctuality\n\n### 3. Benefits and Compensation\n- Salary and Performance Reviews\n- Health Insurance\n- Retirement Plans\n- Paid Time Off\n- Professional Development\n\n### 4. Workplace Guidelines\n- Dress Code\n- Communication Standards\n- Technology Usage\n- Social Media Policy\n\n### 5. Safety and Security\n- Emergency Procedures\n- Incident Reporting\n- Health and Safety Protocols\n\n## Important Notes\n- This handbook is updated annually\n- All employees must acknowledge receipt\n- Questions should be directed to HR\n\n*Last Updated: November 2024*",
                    lastUpdated: "November 2024",
                    version: "v2.1",
                    effectiveDate: "January 1, 2024",
                    requiresAcknowledgment: true
                },
                "Code of Conduct": {
                    title: "Code of Conduct - Ethical Guidelines",
                    content: "# Code of Conduct\n\n## Our Commitment to Ethics\n\nOur Code of Conduct outlines the ethical standards and behavioral expectations for all employees, contractors, and business partners.\n\n## Core Principles\n\n### 1. Integrity and Honesty\n- Act with honesty in all business dealings\n- Report unethical behavior promptly\n- Avoid conflicts of interest\n- Maintain accurate records\n\n### 2. Respect for Others\n- Treat all individuals with dignity and respect\n- Embrace diversity and inclusion\n- Maintain a harassment-free workplace\n- Respect privacy and confidentiality\n\n### 3. Professional Excellence\n- Deliver high-quality work\n- Continuously improve skills and knowledge\n- Collaborate effectively with teams\n- Meet commitments and deadlines\n\n### 4. Legal Compliance\n- Follow all applicable laws and regulations\n- Respect intellectual property rights\n- Maintain data protection standards\n- Report legal concerns immediately\n\n## Reporting Violations\n- Contact your manager or HR\n- Use anonymous reporting hotline: 1-800-ETHICS\n- Email: ethics@company.com\n- No retaliation for good faith reports\n\n## Consequences\nViolations may result in disciplinary action, up to and including termination.\n\n*Remember: When in doubt, ask for guidance.*",
                    lastUpdated: "October 2024",
                    version: "v1.5",
                    effectiveDate: "October 1, 2024",
                    requiresAcknowledgment: true
                },
                "Information Security Policy": {
                    title: "Information Security Policy",
                    content: "# Information Security Policy\n\n## Purpose\nTo protect company and customer data from unauthorized access, disclosure, modification, or destruction.\n\n## Scope\nApplies to all employees, contractors, and third parties with access to company systems.\n\n## Password Requirements\n- Minimum 12 characters\n- Include uppercase, lowercase, numbers, and symbols\n- Change every 90 days\n- No password reuse for last 12 passwords\n- Use multi-factor authentication where available\n\n## Data Classification\n\n### Public\n- Marketing materials\n- Published documentation\n- General company information\n\n### Internal\n- Employee directories\n- Internal procedures\n- Non-sensitive business data\n\n### Confidential\n- Customer data\n- Financial information\n- Strategic plans\n- Employee personal information\n\n### Restricted\n- Trade secrets\n- Legal documents\n- Security credentials\n- Merger and acquisition data\n\n## Acceptable Use\n- Use company systems only for business purposes\n- No personal software installation\n- Report security incidents immediately\n- Keep software updated\n- Lock workstations when away\n\n## Incident Response\n1. Immediately report suspected security incidents\n2. Contact IT Security: security@company.com\n3. Do not attempt to investigate on your own\n4. Preserve evidence if possible\n\n## Training Requirements\n- Annual security awareness training\n- Phishing simulation exercises\n- Role-specific security training\n\n*Violations may result in disciplinary action and legal consequences.*",
                    lastUpdated: "December 2024",
                    version: "v3.0",
                    effectiveDate: "December 1, 2024",
                    requiresAcknowledgment: true
                }
            };

            const oModel = this._oPolicyDialog.getModel();
            const oContent = oPolicyContent[sPolicyTitle] || {
                title: sPolicyTitle,
                content: "Policy content is being loaded...\n\nPlease contact HR if you need immediate access to this policy.\n\nEmail: hr@company.com\nPhone: (555) 123-4567",
                lastUpdated: "Recent",
                version: "v1.0",
                effectiveDate: "Current",
                requiresAcknowledgment: false
            };

            oModel.setProperty("/selectedPolicy", oContent);
            oModel.setProperty("/acknowledgmentEnabled", false);
        },

        // Formatters
        formatPriorityState(sPriority) {
            switch (sPriority) {
                case "High":
                    return "Error";
                case "Medium":
                    return "Warning";
                case "Low":
                    return "Success";
                default:
                    return "None";
            }
        },

        formatCourseStatus(sStatus) {
            switch (sStatus) {
                case "Completed":
                    return "Success";
                case "In Progress":
                    return "Warning";
                case "Not Started":
                    return "Error";
                default:
                    return "None";
            }
        },

        formatTaskStatus(sStatus) {
            switch (sStatus) {
                case "Completed":
                    return "Success";
                case "In Progress":
                    return "Warning";
                case "Pending":
                    return "Error";
                default:
                    return "None";
            }
        },

        formatPolicyStatus(sStatus) {
            switch (sStatus) {
                case "Acknowledged":
                    return "Success";
                case "Reviewed":
                    return "Warning";
                case "Pending":
                    return "Error";
                default:
                    return "None";
            }
        },

        formatCertificateColor(bHasCertificate) {
            return bHasCertificate ? "#107e3e" : "#6a6d70";
        },

        formatCourseButtonText(sStatus) {
            switch (sStatus) {
                case "Completed":
                    return "Review";
                case "In Progress":
                    return "Continue";
                case "Not Started":
                    return "Start";
                default:
                    return "View";
            }
        },

        // Additional Event Handlers
        onViewAllActivities() {
            MessageToast.show("Opening complete activity history...");
            // TODO: Navigate to full activity history view
        },

        onOpenLearningPath(oEvent) {
            const sUrl = oEvent.getSource().data("url");
            const sPathName = oEvent.getSource().data("pathName") || "SAP Learning";

            if (sUrl) {
                MessageToast.show(`Opening ${sPathName} in SAP Learning Hub...`);
                window.open(sUrl, '_blank');
            } else {
                // Fallback to main SAP Learning Hub
                MessageToast.show("Opening SAP Learning Hub...");
                window.open("https://learning.sap.com", '_blank');
            }
        },

        onOpenLearningResource(oEvent) {
            const sUrl = oEvent.getSource().data("url");
            const sResourceName = oEvent.getSource().data("resourceName") || "SAP Resource";

            if (sUrl) {
                MessageToast.show(`Opening ${sResourceName}...`);
                window.open(sUrl, '_blank');
            } else {
                // Fallback to main SAP Learning Hub
                MessageToast.show("Opening SAP Learning Hub...");
                window.open("https://learning.sap.com", '_blank');
            }
        },

        async onNoteSelect(oEvent) {
            try {
                const oSelectedItem = oEvent.getParameter("listItem");

                if (!oSelectedItem) {
                    console.error("No item selected");
                    return;
                }

                const oContext = oSelectedItem.getBindingContext();

                if (!oContext) {
                    console.error("No binding context found");
                    return;
                }

                const oNote = oContext.getObject();

                if (!oNote || !oNote.id) {
                    console.error("Invalid note object:", oNote);
                    return;
                }

                console.log("Loading note:", oNote.title, "ID:", oNote.id);

                // Load blocks for the selected note
                const blocks = await this._blockManager.getBlocksForNote(oNote.id);
                console.log("Loaded blocks:", blocks.length);

                // Set current note with blocks
                const oModel = this._oNotesDialog.getModel();
                oModel.setProperty("/currentNote", {
                    ...oNote,
                    blocks: blocks
                });

                this._currentNoteId = oNote.id;
                this._renderBlocks(blocks);

                // Start auto-save if enabled
                if (this._autoSaveEnabled) {
                    this._startAutoSave();
                }

                MessageToast.show(`📖 Loaded note: ${oNote.title}`);

            } catch (error) {
                console.error("Error loading note:", error);
                MessageToast.show("Error loading note: " + error.message);
            }
        },

        async onAddNote() {
            try {
                const noteData = {
                    title: "Untitled",
                    category: "Personal",
                    tags: []
                };

                const newNote = await this._notesDatabase.createNote(noteData);

                // Add initial paragraph block
                await this._blockManager.createBlock(newNote.id, {
                    type: "paragraph",
                    content: "",
                    order: 0
                });

                // Refresh notes list
                await this._loadNotesData();

                // Select the new note
                const oModel = this._oNotesDialog.getModel();
                const blocks = await this._blockManager.getBlocksForNote(newNote.id);

                oModel.setProperty("/currentNote", {
                    ...newNote,
                    blocks: blocks
                });

                this._currentNoteId = newNote.id;
                this._renderBlocks(blocks);

                MessageToast.show("New note created");

            } catch (error) {
                console.error("Error creating note:", error);
                MessageToast.show("Error creating note");
            }
        },

        async onSaveNote() {
            try {
                const oModel = this._oNotesDialog.getModel();
                const oCurrentNote = oModel.getProperty("/currentNote");

                if (!oCurrentNote.id) {
                    MessageToast.show("No note to save");
                    return;
                }

                // Calculate word count from all blocks
                let totalWords = 0;
                let totalChars = 0;
                let preview = "";

                if (oCurrentNote.blocks && oCurrentNote.blocks.length > 0) {
                    oCurrentNote.blocks.forEach(block => {
                        if (block.content) {
                            const words = block.content.split(/\s+/).filter(word => word.length > 0);
                            totalWords += words.length;
                            totalChars += block.content.length;

                            // Use first non-empty block for preview
                            if (!preview && block.content.trim()) {
                                preview = block.content.substring(0, 100) + (block.content.length > 100 ? "..." : "");
                            }
                        }
                    });
                }

                // Update note in database
                await this._notesDatabase.updateNote(oCurrentNote.id, {
                    title: oCurrentNote.title,
                    wordCount: totalWords,
                    charCount: totalChars,
                    preview: preview,
                    category: oCurrentNote.category
                });

                // Refresh notes list
                await this._loadNotesData();

                MessageToast.show("💾 Note saved successfully");

            } catch (error) {
                console.error("Error saving note:", error);
                MessageToast.show("Error saving note");
            }
        },

        /**
         * Add a new block
         */
        async onAddBlock() {
            try {
                if (!this._currentNoteId) {
                    MessageToast.show("Please select a note first");
                    return;
                }

                const oModel = this._oNotesDialog.getModel();
                const currentBlocks = oModel.getProperty("/currentNote/blocks") || [];
                const newOrder = currentBlocks.length;

                const newBlock = await this._blockManager.createBlock(this._currentNoteId, {
                    type: "paragraph",
                    content: "",
                    order: newOrder
                });

                // Update model
                currentBlocks.push(newBlock);
                oModel.setProperty("/currentNote/blocks", currentBlocks);

                // Re-render blocks
                this._renderBlocks(currentBlocks);

                MessageToast.show("Block added");

            } catch (error) {
                console.error("Error adding block:", error);
                MessageToast.show("Error adding block");
            }
        },

        /**
         * Add block of specific type
         */
        async onAddBlockType(oEvent) {
            try {
                const blockType = oEvent.getSource().data("blockType");

                if (!this._currentNoteId) {
                    MessageToast.show("Please select a note first");
                    return;
                }

                const oModel = this._oNotesDialog.getModel();
                const currentBlocks = oModel.getProperty("/currentNote/blocks") || [];
                const newOrder = currentBlocks.length;

                let content = "";
                let properties = {};

                // Set default content based on block type
                switch (blockType) {
                    case "heading_1":
                        content = "Heading 1";
                        break;
                    case "heading_2":
                        content = "Heading 2";
                        break;
                    case "heading_3":
                        content = "Heading 3";
                        break;
                    case "to_do":
                        content = "Todo item";
                        properties = { checked: false };
                        break;
                    case "quote":
                        content = "Quote text";
                        break;
                    case "code":
                        content = "// Code block";
                        break;
                    case "divider":
                        content = "";
                        break;
                    default:
                        content = "Type your content here...";
                }

                const newBlock = await this._blockManager.createBlock(this._currentNoteId, {
                    type: blockType,
                    content: content,
                    order: newOrder,
                    properties: properties
                });

                // Update model
                currentBlocks.push(newBlock);
                oModel.setProperty("/currentNote/blocks", currentBlocks);

                // Re-render blocks
                this._renderBlocks(currentBlocks);

                MessageToast.show(`${blockType} block added`);

            } catch (error) {
                console.error("Error adding block:", error);
                MessageToast.show("Error adding block");
            }
        },

        async onDeleteNote() {
            const oModel = this._oNotesDialog.getModel();
            const oCurrentNote = oModel.getProperty("/currentNote");

            if (!oCurrentNote.id) {
                MessageToast.show("Nothing to delete");
                return;
            }

            MessageBox.confirm(`Delete note "${oCurrentNote.title}"?`, {
                onClose: async (sAction) => {
                    if (sAction === MessageBox.Action.OK) {
                        try {
                            // Delete from database
                            await this._notesDatabase.deleteNote(oCurrentNote.id);

                            // Refresh notes list
                            await this._loadNotesData();

                            // Reset current note
                            oModel.setProperty("/currentNote", {
                                id: "",
                                title: "Welcome to Notion-like Notes! 📝",
                                blocks: [],
                                created: new Date().toISOString(),
                                lastModified: new Date().toISOString(),
                                wordCount: 0,
                                charCount: 0,
                                category: "Personal",
                                preview: "Start creating your first note..."
                            });

                            this._currentNoteId = null;
                            this._stopAutoSave();

                            // Clear blocks container
                            this._renderBlocks([]);

                            MessageToast.show("🗑️ Note deleted successfully");

                        } catch (error) {
                            console.error("Error deleting note:", error);
                            MessageToast.show("Error deleting note");
                        }
                    }
                }
            });
        },

        /**
         * Render blocks in the UI
         */
        _renderBlocks(blocks) {
            try {
                console.log("Rendering", blocks.length, "blocks");

                // Find the blocks container using Fragment.byId
                const blocksContainer = sap.ui.core.Fragment.byId(this.getView().getId(), "dynamicBlocksContainer");

                if (!blocksContainer) {
                    console.error("Could not find blocks container");
                    return;
                }

                // Clear existing blocks
                blocksContainer.destroyItems();

                // If no blocks, show a placeholder
                if (blocks.length === 0) {
                    const placeholderText = new sap.m.Text({
                        text: "No content yet. Click '+ Add Block' to start writing!",
                        class: "sapUiContentLabelColor"
                    });
                    blocksContainer.addItem(placeholderText);
                    return;
                }

                // Render each block
                blocks.forEach((block, index) => {
                    const blockControl = this._createBlockControl(block, index);
                    blocksContainer.addItem(blockControl);
                });

                console.log("Successfully rendered", blocks.length, "blocks");

            } catch (error) {
                console.error("Error rendering blocks:", error);
                MessageToast.show("Error displaying note content");
            }
        },

        /**
         * Create a control for a block
         */
        _createBlockControl(block, index) {
            const blockContainer = new sap.m.VBox({
                class: "notion-block",
                items: [
                    new sap.m.HBox({
                        alignItems: "Center",
                        items: [
                            new sap.m.Button({
                                icon: "sap-icon://menu2",
                                type: "Transparent",
                                class: "notion-block-handle",
                                tooltip: "Drag to reorder"
                            }),
                            this._createBlockEditor(block)
                        ]
                    })
                ]
            });

            return blockContainer;
        },

        /**
         * Create editor for a block based on its type
         */
        _createBlockEditor(block) {
            switch (block.type) {
                case "heading_1":
                case "heading_2":
                case "heading_3":
                case "paragraph":
                case "bulleted_list_item":
                case "numbered_list_item":
                case "quote":
                case "code":
                    return new sap.m.TextArea({
                        value: block.content,
                        rows: 1,
                        width: "100%",
                        class: `notion-block-input notion-${block.type.replace('_', '-')}`,
                        placeholder: this._getPlaceholderForBlockType(block.type),
                        liveChange: (oEvent) => {
                            this._onBlockContentChange(block.id, oEvent.getParameter("value"));
                        }
                    });
                case "to_do":
                    return new sap.m.HBox({
                        alignItems: "Center",
                        items: [
                            new sap.m.CheckBox({
                                selected: block.properties?.checked || false,
                                select: (oEvent) => {
                                    this._onTodoToggle(block.id, oEvent.getParameter("selected"));
                                }
                            }),
                            new sap.m.TextArea({
                                value: block.content,
                                rows: 1,
                                width: "100%",
                                class: "notion-block-input notion-todo",
                                placeholder: "Todo item",
                                liveChange: (oEvent) => {
                                    this._onBlockContentChange(block.id, oEvent.getParameter("value"));
                                }
                            })
                        ]
                    });
                case "divider":
                    return new sap.m.Panel({
                        height: "1px",
                        class: "notion-divider"
                    });
                default:
                    return new sap.m.Text({
                        text: block.content || "Unknown block type"
                    });
            }
        },

        /**
         * Get placeholder text for block type
         */
        _getPlaceholderForBlockType(type) {
            const placeholders = {
                "heading_1": "Heading 1",
                "heading_2": "Heading 2",
                "heading_3": "Heading 3",
                "paragraph": "Type '/' for commands",
                "bulleted_list_item": "List item",
                "numbered_list_item": "Numbered item",
                "quote": "Quote",
                "code": "Code"
            };
            return placeholders[type] || "Type here...";
        },

        /**
         * Handle block content changes
         */
        async _onBlockContentChange(blockId, newContent) {
            try {
                await this._blockManager.updateBlock(blockId, { content: newContent });

                // Update model
                const oModel = this._oNotesDialog.getModel();
                const blocks = oModel.getProperty("/currentNote/blocks");
                const blockIndex = blocks.findIndex(b => b.id === blockId);
                if (blockIndex !== -1) {
                    blocks[blockIndex].content = newContent;
                    oModel.setProperty("/currentNote/blocks", blocks);
                }

            } catch (error) {
                console.error("Error updating block:", error);
            }
        },

        /**
         * Handle todo toggle
         */
        async _onTodoToggle(blockId, checked) {
            try {
                await this._blockManager.updateBlock(blockId, {
                    properties: { checked: checked }
                });

                // Update model
                const oModel = this._oNotesDialog.getModel();
                const blocks = oModel.getProperty("/currentNote/blocks");
                const blockIndex = blocks.findIndex(b => b.id === blockId);
                if (blockIndex !== -1) {
                    blocks[blockIndex].properties = { checked: checked };
                    oModel.setProperty("/currentNote/blocks", blocks);
                }

            } catch (error) {
                console.error("Error updating todo:", error);
            }
        },

        /**
         * Start auto-save
         */
        _startAutoSave() {
            this._stopAutoSave(); // Clear any existing interval

            if (this._autoSaveEnabled && this._currentNoteId) {
                this._autoSaveInterval = setInterval(() => {
                    this.onSaveNote();
                }, 5000); // Auto-save every 5 seconds
            }
        },

        /**
         * Stop auto-save
         */
        _stopAutoSave() {
            if (this._autoSaveInterval) {
                clearInterval(this._autoSaveInterval);
                this._autoSaveInterval = null;
            }
        },

        /**
         * Toggle auto-save
         */
        onToggleAutoSave() {
            this._autoSaveEnabled = !this._autoSaveEnabled;

            const oModel = this._oNotesDialog.getModel();
            oModel.setProperty("/autoSaveEnabled", this._autoSaveEnabled);

            const toggleButton = this.byId("autoSaveToggle");
            if (toggleButton) {
                toggleButton.setText(this._autoSaveEnabled ? "🔄 Auto-save: ON" : "⏸️ Auto-save: OFF");
            }

            if (this._autoSaveEnabled) {
                this._startAutoSave();
                MessageToast.show("Auto-save enabled");
            } else {
                this._stopAutoSave();
                MessageToast.show("Auto-save disabled");
            }
        },

        /**
         * Handle title changes
         */
        async onTitleChange(oEvent) {
            const newTitle = oEvent.getParameter("value");

            if (this._currentNoteId && newTitle) {
                try {
                    await this._notesDatabase.updateNote(this._currentNoteId, { title: newTitle });

                    // Update model
                    const oModel = this._oNotesDialog.getModel();
                    oModel.setProperty("/currentNote/title", newTitle);

                    // Refresh notes list to show updated title
                    await this._loadNotesData();

                } catch (error) {
                    console.error("Error updating title:", error);
                }
            }
        }
    });
});
