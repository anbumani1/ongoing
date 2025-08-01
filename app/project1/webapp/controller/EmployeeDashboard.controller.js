sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment"
], (Controller, JSONModel, MessageToast, MessageBox, Fragment) => {
    "use strict";

    return Controller.extend("project1.controller.EmployeeDashboard", {
        onInit() {
            console.log("EmployeeDashboard controller initialized");
            try {
                this._initializeModels();
                this._loadEmployeeData();
                this._startTimeUpdater();
                this._initializeNavigation();
                console.log("EmployeeDashboard initialization completed successfully");
            } catch (error) {
                console.error("Error initializing EmployeeDashboard:", error);
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
            // Create local model for employee dashboard data with mock data
            const oEmployeeModel = new JSONModel({
                employee: {
                    firstName: "Alice",
                    lastName: "Wilson",
                    department: "Software Engineering",
                    role: "Software Development Intern",
                    employeeId: "EMP001",
                    email: "alice.wilson@company.com",
                    startDate: "2024-01-15",
                    manager: "Sarah Johnson"
                },
                currentDate: this._formatDate(new Date()),
                currentTime: this._formatTime(new Date()),
                myTasks: [],
                recentActivities: [],
                dashboardStats: {
                    tasksCompleted: 8,
                    coursesInProgress: 3,
                    certificatesEarned: 1,
                    notesCreated: 12
                }
            });
            this.getView().setModel(oEmployeeModel);
            console.log("Employee model set successfully:", oEmployeeModel.getData());
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
            MessageBox.information("Help & Support Resources:\n\n• FAQ Section\n• Contact IT Support\n• User Guides\n• Video Tutorials\n• Submit Support Ticket", {
                title: "Help & Support"
            });
        },

        onFeedbackAccess() {
            MessageBox.information("Feedback Options:\n\n• Rate your experience\n• Suggest improvements\n• Report issues\n• Anonymous feedback\n• Manager feedback", {
                title: "Feedback"
            });
        },

        onSettingsAccess() {
            MessageBox.information("Settings & Preferences:\n\n• Notification Settings\n• Language Preferences\n• Theme Selection\n• Privacy Settings\n• Account Security", {
                title: "Settings"
            });
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
            // SAP Learning Content - Basic to Advanced
            const oLearningModel = new JSONModel({
                learningProgress: {
                    overall: 45,
                    completed: 8,
                    inProgress: 5,
                    certificates: 3,
                    totalHours: 156,
                    streak: 12
                },

                // SAP Learning Paths from Basic to Advanced
                learningPaths: [
                    {
                        id: "SAP_BASIC",
                        name: "SAP Fundamentals (Basic)",
                        description: "Introduction to SAP ecosystem, navigation, and core concepts",
                        level: "Beginner",
                        progress: 85,
                        totalCourses: 8,
                        completedCourses: 7,
                        estimatedHours: 24,
                        dueDate: "2024-12-30",
                        status: "In Progress",
                        icon: "sap-icon://learning-assistant",
                        color: "#107e3e"
                    },
                    {
                        id: "SAP_INTERMEDIATE",
                        name: "SAP Business Processes (Intermediate)",
                        description: "Core business modules: FI/CO, MM, SD, HR, and integration",
                        level: "Intermediate",
                        progress: 35,
                        totalCourses: 12,
                        completedCourses: 4,
                        estimatedHours: 48,
                        dueDate: "2025-02-28",
                        status: "In Progress",
                        icon: "sap-icon://business-suite",
                        color: "#e9730c"
                    },
                    {
                        id: "SAP_ADVANCED",
                        name: "SAP Development & Customization (Advanced)",
                        description: "ABAP programming, Fiori development, and system customization",
                        level: "Advanced",
                        progress: 0,
                        totalCourses: 15,
                        completedCourses: 0,
                        estimatedHours: 80,
                        dueDate: "2025-06-30",
                        status: "Not Started",
                        icon: "sap-icon://developer-settings",
                        color: "#bb0000"
                    },
                    {
                        id: "SAP_EXPERT",
                        name: "SAP Architecture & Innovation (Expert)",
                        description: "S/4HANA, Cloud solutions, AI/ML integration, and enterprise architecture",
                        level: "Expert",
                        progress: 0,
                        totalCourses: 20,
                        completedCourses: 0,
                        estimatedHours: 120,
                        dueDate: "2025-12-31",
                        status: "Locked",
                        icon: "sap-icon://cloud",
                        color: "#6a6d70"
                    }
                ],
                // Current SAP Courses with Real Content
                currentCourses: [
                    // BASIC LEVEL COURSES
                    {
                        id: "SAP_001",
                        name: "Introduction to SAP ERP",
                        description: "Overview of SAP ecosystem, history, and core principles of enterprise resource planning",
                        level: "Basic",
                        progress: 100,
                        dueDate: "Completed on Dec 5, 2024",
                        status: "Completed",
                        instructor: "Dr. Sarah Mueller",
                        duration: "3 hours",
                        rating: 4.9,
                        certificate: true,
                        topics: ["SAP History", "ERP Concepts", "SAP Modules Overview", "Business Benefits"],
                        pathId: "SAP_BASIC"
                    },
                    {
                        id: "SAP_002",
                        name: "SAP GUI Navigation & Basics",
                        description: "Master SAP GUI interface, transaction codes, and basic navigation techniques",
                        level: "Basic",
                        progress: 100,
                        dueDate: "Completed on Dec 8, 2024",
                        status: "Completed",
                        instructor: "Michael Chen",
                        duration: "2.5 hours",
                        rating: 4.7,
                        certificate: true,
                        topics: ["SAP GUI Interface", "Transaction Codes", "Menu Navigation", "Favorites & Shortcuts"],
                        pathId: "SAP_BASIC"
                    },
                    {
                        id: "SAP_003",
                        name: "SAP Data Management Fundamentals",
                        description: "Understanding master data, organizational structures, and data integrity in SAP",
                        level: "Basic",
                        progress: 90,
                        dueDate: "Dec 20, 2024",
                        status: "In Progress",
                        instructor: "Jennifer Liu",
                        duration: "4 hours",
                        rating: 4.8,
                        certificate: false,
                        topics: ["Master Data Concepts", "Organizational Units", "Data Validation", "Data Governance"],
                        pathId: "SAP_BASIC"
                    },

                    // INTERMEDIATE LEVEL COURSES
                    {
                        id: "SAP_101",
                        name: "SAP Financial Accounting (FI)",
                        description: "Core financial processes: GL accounting, AP/AR, asset accounting, and financial reporting",
                        level: "Intermediate",
                        progress: 65,
                        dueDate: "Jan 15, 2025",
                        status: "In Progress",
                        instructor: "Robert Schmidt",
                        duration: "8 hours",
                        rating: 4.6,
                        certificate: false,
                        topics: ["General Ledger", "Accounts Payable", "Accounts Receivable", "Asset Accounting", "Financial Reporting"],
                        pathId: "SAP_INTERMEDIATE"
                    },
                    {
                        id: "SAP_102",
                        name: "SAP Materials Management (MM)",
                        description: "Procurement processes, inventory management, and vendor management in SAP",
                        level: "Intermediate",
                        progress: 40,
                        dueDate: "Jan 30, 2025",
                        status: "In Progress",
                        instructor: "Anna Weber",
                        duration: "6 hours",
                        rating: 4.5,
                        certificate: false,
                        topics: ["Purchase Requisitions", "Purchase Orders", "Goods Receipt", "Invoice Verification", "Inventory Management"],
                        pathId: "SAP_INTERMEDIATE"
                    },
                    {
                        id: "SAP_103",
                        name: "SAP Sales & Distribution (SD)",
                        description: "Sales order processing, pricing, shipping, and billing in SAP SD module",
                        level: "Intermediate",
                        progress: 0,
                        dueDate: "Feb 15, 2025",
                        status: "Not Started",
                        instructor: "Thomas Braun",
                        duration: "7 hours",
                        rating: 4.7,
                        certificate: false,
                        topics: ["Sales Orders", "Pricing Procedures", "Delivery Processing", "Billing", "Credit Management"],
                        pathId: "SAP_INTERMEDIATE"
                    },

                    // ADVANCED LEVEL COURSES
                    {
                        id: "SAP_201",
                        name: "ABAP Programming Fundamentals",
                        description: "Introduction to ABAP language, data types, and basic programming constructs",
                        level: "Advanced",
                        progress: 0,
                        dueDate: "Mar 30, 2025",
                        status: "Locked",
                        instructor: "Dr. Klaus Hoffmann",
                        duration: "12 hours",
                        rating: 4.8,
                        certificate: false,
                        topics: ["ABAP Syntax", "Data Types", "Internal Tables", "Modularization", "Debugging"],
                        pathId: "SAP_ADVANCED"
                    },
                    {
                        id: "SAP_202",
                        name: "SAP Fiori Development",
                        description: "Building modern UIs with SAP Fiori, UI5, and OData services",
                        level: "Advanced",
                        progress: 0,
                        dueDate: "Apr 30, 2025",
                        status: "Locked",
                        instructor: "Maria Gonzalez",
                        duration: "15 hours",
                        rating: 4.9,
                        certificate: false,
                        topics: ["Fiori Architecture", "UI5 Development", "OData Services", "Fiori Launchpad", "Responsive Design"],
                        pathId: "SAP_ADVANCED"
                    }
                ],
                // SAP Certificates Earned
                certificates: [
                    {
                        id: "SAP_CERT_001",
                        name: "SAP Certified User - SAP ERP",
                        issuedDate: "2024-12-05",
                        validUntil: "2026-12-05",
                        credentialId: "SAP-ERP-2024-001-AW",
                        level: "Basic",
                        badgeUrl: "https://www.sap.com/training-certification/badges/"
                    },
                    {
                        id: "SAP_CERT_002",
                        name: "SAP Certified User - SAP GUI Navigation",
                        issuedDate: "2024-12-08",
                        validUntil: "2026-12-08",
                        credentialId: "SAP-GUI-2024-002-AW",
                        level: "Basic",
                        badgeUrl: "https://www.sap.com/training-certification/badges/"
                    },
                    {
                        id: "SAP_CERT_003",
                        name: "SAP Certified Associate - Data Management",
                        issuedDate: "2024-12-15",
                        validUntil: "2027-12-15",
                        credentialId: "SAP-DM-2024-003-AW",
                        level: "Associate",
                        badgeUrl: "https://www.sap.com/training-certification/badges/"
                    }
                ],

                // Learning Resources
                resources: [
                    {
                        type: "Documentation",
                        title: "SAP Help Portal",
                        url: "https://help.sap.com",
                        description: "Official SAP documentation and guides",
                        icon: "sap-icon://document"
                    },
                    {
                        type: "Community",
                        title: "SAP Community",
                        url: "https://community.sap.com",
                        description: "Connect with SAP experts and developers",
                        icon: "sap-icon://group"
                    },
                    {
                        type: "Training",
                        title: "SAP Learning Hub",
                        url: "https://learning.sap.com",
                        description: "Official SAP training platform",
                        icon: "sap-icon://learning-assistant"
                    },
                    {
                        type: "Practice",
                        title: "SAP Sandbox Environment",
                        url: "https://developers.sap.com/trials-downloads.html",
                        description: "Free SAP system for hands-on practice",
                        icon: "sap-icon://lab"
                    }
                ],

                // Learning Tips
                tips: [
                    "Start with SAP GUI navigation before moving to complex modules",
                    "Practice transaction codes daily to build muscle memory",
                    "Join SAP Community forums for real-world problem solving",
                    "Complete hands-on exercises in each module",
                    "Take notes on business processes, not just technical steps"
                ]
            });
            this._oLearningDialog.setModel(oLearningModel);
        },

        _loadNotesData() {
            // Comprehensive mock notes data
            const oNotesModel = new JSONModel({
                notes: [
                    {
                        id: "NOTE001",
                        title: "Team Standup - Dec 12, 2024",
                        preview: "Daily standup discussion points, sprint progress, and blockers...",
                        content: "# Team Standup - December 12, 2024\n\n## Attendees\n- Sarah Johnson (Manager)\n- Alex Rodriguez (Senior Dev)\n- Jennifer Liu (Product Owner)\n- Alice Wilson (Intern)\n\n## Sprint Progress\n- **Completed**: User authentication module (95%)\n- **In Progress**: API integration for user profiles\n- **Blocked**: Waiting for database schema approval\n\n## Discussion Points\n- Code review process improvements\n- New intern onboarding feedback\n- Sprint retrospective planning\n\n## Action Items\n- [ ] Alice: Complete code review training\n- [ ] Alex: Review PR #123\n- [ ] Sarah: Schedule 1:1 with Alice\n\n## Next Meeting\nDecember 13, 2024 at 9:00 AM",
                        lastModified: "2 hours ago",
                        created: "Dec 12, 2024",
                        wordCount: 98,
                        charCount: 612,
                        tags: ["meeting", "standup", "team"],
                        category: "Work"
                    },
                    {
                        id: "NOTE002",
                        title: "Learning Goals & Development Plan",
                        preview: "Personal development objectives and skill improvement roadmap...",
                        content: "# My Learning & Development Plan\n\n## Technical Skills (Priority: High)\n\n### Frontend Development\n- **React.js**: Complete advanced course by Jan 2025\n- **TypeScript**: Practice with real projects\n- **Testing**: Learn Jest and React Testing Library\n\n### Backend Development\n- **Node.js**: Build REST APIs\n- **Database Design**: PostgreSQL and MongoDB\n- **Cloud Services**: AWS basics\n\n## Soft Skills (Priority: Medium)\n\n### Communication\n- **Public Speaking**: Join Toastmasters club\n- **Technical Writing**: Improve documentation skills\n- **Presentation**: Practice demo sessions\n\n### Leadership\n- **Project Management**: Scrum certification\n- **Mentoring**: Help other interns\n- **Team Collaboration**: Cross-functional projects\n\n## Timeline\n- **Q1 2025**: Focus on React and TypeScript\n- **Q2 2025**: Backend development and databases\n- **Q3 2025**: Cloud services and DevOps\n- **Q4 2025**: Leadership and mentoring skills",
                        lastModified: "1 day ago",
                        created: "Dec 10, 2024",
                        wordCount: 156,
                        charCount: 1024,
                        tags: ["goals", "learning", "career"],
                        category: "Personal"
                    },
                    {
                        id: "NOTE003",
                        title: "Code Review Checklist",
                        preview: "Best practices and checklist for conducting effective code reviews...",
                        content: "# Code Review Checklist\n\n## Before Starting Review\n- [ ] Understand the requirements\n- [ ] Check if tests are included\n- [ ] Verify branch is up to date\n\n## Code Quality\n- [ ] **Readability**: Code is clean and well-commented\n- [ ] **Naming**: Variables and functions have meaningful names\n- [ ] **Structure**: Proper separation of concerns\n- [ ] **Performance**: No obvious performance issues\n\n## Security\n- [ ] Input validation is present\n- [ ] No hardcoded secrets or passwords\n- [ ] Proper error handling\n- [ ] SQL injection prevention\n\n## Testing\n- [ ] Unit tests cover new functionality\n- [ ] Edge cases are tested\n- [ ] Tests are meaningful and not just for coverage\n\n## Documentation\n- [ ] README updated if needed\n- [ ] API documentation updated\n- [ ] Inline comments for complex logic\n\n## Feedback Guidelines\n- Be constructive and specific\n- Suggest improvements, don't just point out problems\n- Ask questions to understand the approach\n- Acknowledge good practices",
                        lastModified: "3 days ago",
                        created: "Dec 9, 2024",
                        wordCount: 142,
                        charCount: 1156,
                        tags: ["code-review", "checklist", "best-practices"],
                        category: "Work"
                    },
                    {
                        id: "NOTE004",
                        title: "Onboarding Experience Feedback",
                        preview: "Reflections on the intern onboarding process and suggestions...",
                        content: "# Onboarding Experience - Week 1 Reflection\n\n## What Went Well\n- **Warm Welcome**: Team was very welcoming and supportive\n- **Clear Documentation**: Setup guides were comprehensive\n- **Mentor Assignment**: Sarah is an excellent mentor\n- **Learning Resources**: Great access to courses and materials\n\n## Challenges Faced\n- **Information Overload**: Too much information in first few days\n- **Tool Setup**: Some development tools had compatibility issues\n- **Access Permissions**: Delayed access to some systems\n\n## Suggestions for Improvement\n- **Gradual Introduction**: Spread orientation over 2 weeks\n- **Buddy System**: Pair new interns with recent hires\n- **Pre-boarding**: Send setup instructions before start date\n- **Regular Check-ins**: Weekly feedback sessions in first month\n\n## Personal Action Items\n- Schedule regular 1:1s with mentor\n- Join intern community group\n- Set up personal learning plan\n- Start contributing to team projects\n\n## Overall Rating: 8/10\nGreat experience overall with room for minor improvements.",
                        lastModified: "5 days ago",
                        created: "Dec 7, 2024",
                        wordCount: 168,
                        charCount: 1289,
                        tags: ["onboarding", "feedback", "reflection"],
                        category: "Personal"
                    },
                    {
                        id: "NOTE005",
                        title: "Project Ideas & Innovation",
                        preview: "Creative project ideas and potential improvements for current systems...",
                        content: "# Project Ideas & Innovation Opportunities\n\n## Internal Tool Improvements\n\n### Employee Dashboard Enhancement\n- **Dark Mode**: Add theme switching capability\n- **Mobile App**: Native mobile version for on-the-go access\n- **AI Assistant**: Chatbot for common HR queries\n- **Analytics**: Personal productivity insights\n\n### Development Workflow\n- **Automated Testing**: Improve CI/CD pipeline\n- **Code Quality**: Implement automated code review tools\n- **Documentation**: Auto-generate API docs from code\n\n## New Project Concepts\n\n### Intern Collaboration Platform\n- **Peer Learning**: Match interns with similar interests\n- **Project Showcase**: Gallery of intern projects\n- **Skill Exchange**: Intern-to-intern teaching platform\n\n### Sustainability Initiative\n- **Carbon Footprint Tracker**: Monitor team's environmental impact\n- **Green Commute**: App to encourage eco-friendly transportation\n- **Paperless Office**: Digitize remaining manual processes\n\n## Implementation Strategy\n- Start with small proof-of-concept\n- Get feedback from team members\n- Present to management if successful\n- Consider open-source contributions",
                        lastModified: "1 week ago",
                        created: "Dec 5, 2024",
                        wordCount: 189,
                        charCount: 1456,
                        tags: ["projects", "innovation", "ideas"],
                        category: "Work"
                    }
                ],
                currentNote: {
                    id: "",
                    title: "New Note",
                    content: "",
                    created: new Date().toLocaleDateString(),
                    lastModified: new Date().toLocaleDateString(),
                    wordCount: 0,
                    charCount: 0,
                    tags: [],
                    category: "Personal"
                },
                categories: ["Work", "Personal", "Learning", "Projects"],
                tags: ["meeting", "standup", "team", "goals", "learning", "career", "code-review", "checklist", "best-practices", "onboarding", "feedback", "reflection", "projects", "innovation", "ideas"],
                searchQuery: "",
                selectedCategory: "All"
            });
            this._oNotesDialog.setModel(oNotesModel);
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

        onStartLearningPath(oEvent) {
            const sPathId = oEvent.getSource().data("pathId");
            MessageToast.show(`Starting learning path: ${sPathId}`);
            // TODO: Navigate to specific learning path
        },

        onContinueCourse(oEvent) {
            const oContext = oEvent.getSource().getBindingContext();
            const sCourseName = oContext.getProperty("name");
            MessageToast.show(`Continuing course: ${sCourseName}`);
            // TODO: Navigate to course content
        },

        onNoteSelect(oEvent) {
            const oSelectedItem = oEvent.getParameter("listItem");
            const oContext = oSelectedItem.getBindingContext();
            const oNote = oContext.getObject();

            // Load selected note into editor
            const oModel = this._oNotesDialog.getModel();
            oModel.setProperty("/currentNote", oNote);
        },

        onAddNote() {
            const oModel = this._oNotesDialog.getModel();
            const oNewNote = {
                id: "NOTE" + Date.now(),
                title: "New Note",
                content: "",
                created: new Date().toLocaleDateString(),
                lastModified: new Date().toLocaleDateString(),
                wordCount: 0,
                charCount: 0,
                tags: [],
                category: "Personal"
            };

            oModel.setProperty("/currentNote", oNewNote);
            MessageToast.show("New note created");
        },

        onSaveNote() {
            const oModel = this._oNotesDialog.getModel();
            const oCurrentNote = oModel.getProperty("/currentNote");

            // Update word and character count
            const sContent = oCurrentNote.content || "";
            oCurrentNote.wordCount = sContent.split(/\s+/).filter(word => word.length > 0).length;
            oCurrentNote.charCount = sContent.length;
            oCurrentNote.lastModified = new Date().toLocaleDateString();

            // Update or add to notes array
            const aNotes = oModel.getProperty("/notes");
            const iIndex = aNotes.findIndex(note => note.id === oCurrentNote.id);

            if (iIndex >= 0) {
                aNotes[iIndex] = oCurrentNote;
            } else {
                aNotes.unshift(oCurrentNote);
            }

            oModel.setProperty("/notes", aNotes);
            MessageToast.show("Note saved successfully");
        },

        onDeleteNote() {
            const oModel = this._oNotesDialog.getModel();
            const oCurrentNote = oModel.getProperty("/currentNote");

            if (!oCurrentNote.id) {
                MessageToast.show("Nothing to delete");
                return;
            }

            MessageBox.confirm(`Delete note "${oCurrentNote.title}"?`, {
                onClose: (sAction) => {
                    if (sAction === MessageBox.Action.OK) {
                        const aNotes = oModel.getProperty("/notes");
                        const aFilteredNotes = aNotes.filter(note => note.id !== oCurrentNote.id);
                        oModel.setProperty("/notes", aFilteredNotes);

                        // Reset current note
                        oModel.setProperty("/currentNote", {
                            id: "",
                            title: "New Note",
                            content: "",
                            created: new Date().toLocaleDateString(),
                            lastModified: new Date().toLocaleDateString(),
                            wordCount: 0,
                            charCount: 0,
                            tags: [],
                            category: "Personal"
                        });

                        MessageToast.show("Note deleted successfully");
                    }
                }
            });
        }
    });
});
