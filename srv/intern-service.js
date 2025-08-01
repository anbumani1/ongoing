const cds = require('@sap/cds');
const GoogleAIService = require('./google-ai-service');

module.exports = cds.service.impl(async function() {

    // Initialize Google AI service
    const googleAIService = new GoogleAIService();
    
    const { Interns, Mentors, Tasks } = this.entities;
    
    // Action implementations for Interns
    this.on('assignMentor', Interns, async (req) => {
        const { ID } = req.params[0];
        const { mentorId } = req.data;
        
        await UPDATE(Interns).set({ mentor_ID: mentorId }).where({ ID });
        return await SELECT.one.from(Interns).where({ ID });
    });
    
    this.on('updateStatus', Interns, async (req) => {
        const { ID } = req.params[0];
        const { status } = req.data;
        
        await UPDATE(Interns).set({ status }).where({ ID });
        return await SELECT.one.from(Interns).where({ ID });
    });
    
    // Action implementations for Tasks
    this.on('markComplete', Tasks, async (req) => {
        const { ID } = req.params[0];
        
        await UPDATE(Tasks).set({ 
            status: 'Completed',
            modifiedAt: new Date()
        }).where({ ID });
        
        return await SELECT.one.from(Tasks).where({ ID });
    });
    
    this.on('updatePriority', Tasks, async (req) => {
        const { ID } = req.params[0];
        const { priority } = req.data;
        
        await UPDATE(Tasks).set({ priority }).where({ ID });
        return await SELECT.one.from(Tasks).where({ ID });
    });
    
    // Before create validations
    this.before('CREATE', Interns, async (req) => {
        const { email } = req.data;
        
        // Check for duplicate email
        const existing = await SELECT.one.from(Interns).where({ email });
        if (existing) {
            req.error(400, `Intern with email ${email} already exists`);
        }
    });
    
    this.before('CREATE', Mentors, async (req) => {
        const { email } = req.data;
        
        // Check for duplicate email
        const existing = await SELECT.one.from(Mentors).where({ email });
        if (existing) {
            req.error(400, `Mentor with email ${email} already exists`);
        }
    });
    
    // After read enhancements
    this.after('READ', Interns, (interns) => {
        if (Array.isArray(interns)) {
            interns.forEach(intern => {
                intern.fullName = `${intern.firstName} ${intern.lastName}`;
            });
        } else if (interns) {
            interns.fullName = `${interns.firstName} ${interns.lastName}`;
        }
    });

    // Chatbot action endpoint
    this.on('chat', async (req) => {
        try {
            const { message, conversationHistory, userContext } = req.data;

            if (!message) {
                req.error(400, 'Message is required');
                return;
            }

            console.log('🤖 Chatbot request:', { message, userContext });

            // Parse JSON strings if they exist
            let parsedHistory = [];
            let parsedContext = {};

            try {
                if (conversationHistory) {
                    parsedHistory = JSON.parse(conversationHistory);
                }
                if (userContext) {
                    parsedContext = JSON.parse(userContext);
                }
            } catch (parseError) {
                console.warn('⚠️ Error parsing JSON parameters:', parseError);
            }

            // Call Google AI service
            const response = await googleAIService.chatWithAssistant(
                message,
                parsedHistory,
                parsedContext
            );

            console.log('🤖 Chatbot response:', response);

            return {
                response: response,
                timestamp: new Date().toISOString(),
                success: true
            };

        } catch (error) {
            console.error('❌ Chatbot API error:', error);
            req.error(500, 'Internal server error: ' + error.message);
        }
    });

});
