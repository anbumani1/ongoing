const cds = require('@sap/cds');
const GoogleAIService = require('./google-ai-service');

module.exports = cds.service.impl(async function() {

    const { Interns, Tasks, AIGeneratedContent, AIInsights } = this.entities;
    const googleAIService = new GoogleAIService();
    
    // AI actions for Interns
    this.on('generateWelcomeMessage', Interns, async (req) => {
        try {
            const { ID } = req.params[0];
            const intern = await SELECT.one.from(Interns).where({ ID });
            
            if (!intern) {
                req.error(404, 'Intern not found');
            }
            
            const welcomeMessage = await openaiService.generateOnboardingContent({
                firstName: intern.firstName,
                lastName: intern.lastName,
                department: intern.department,
                startDate: intern.startDate,
                email: intern.email
            });
            
            // Store the generated content
            await INSERT.into(AIGeneratedContent).entries({
                ID: cds.utils.uuid(),
                contentType: 'welcome_message',
                prompt: `Welcome message for ${intern.firstName} ${intern.lastName}`,
                generatedText: welcomeMessage,
                createdAt: new Date(),
                createdBy: req.user?.id || 'system',
                relatedEntityID: ID,
                relatedEntityType: 'Intern'
            });
            
            return welcomeMessage;
        } catch (error) {
            console.error('Error generating welcome message:', error);
            req.error(500, 'Failed to generate welcome message');
        }
    });
    
    this.on('generateLearningPlan', Interns, async (req) => {
        try {
            const { ID } = req.params[0];
            const intern = await SELECT.one.from(Interns).where({ ID });
            
            if (!intern) {
                req.error(404, 'Intern not found');
            }
            
            const learningPlan = await openaiService.generateLearningRecommendations({
                firstName: intern.firstName,
                lastName: intern.lastName,
                department: intern.department,
                interests: intern.interests,
                skills: intern.skills,
                careerGoals: intern.careerGoals
            });
            
            // Store the generated content
            await INSERT.into(AIGeneratedContent).entries({
                ID: cds.utils.uuid(),
                contentType: 'learning_plan',
                prompt: `Learning plan for ${intern.firstName} ${intern.lastName}`,
                generatedText: learningPlan,
                createdAt: new Date(),
                createdBy: req.user?.id || 'system',
                relatedEntityID: ID,
                relatedEntityType: 'Intern'
            });
            
            return learningPlan;
        } catch (error) {
            console.error('Error generating learning plan:', error);
            req.error(500, 'Failed to generate learning plan');
        }
    });
    
    this.on('generateProgressFeedback', Interns, async (req) => {
        try {
            const { ID } = req.params[0];
            const intern = await SELECT.one.from(Interns).where({ ID });
            
            if (!intern) {
                req.error(404, 'Intern not found');
            }
            
            // Get intern's tasks to analyze progress
            const tasks = await SELECT.from(Tasks).where({ intern_ID: ID });
            const completedTasks = tasks.filter(task => task.status === 'Completed').length;
            
            const feedback = await openaiService.generateProgressFeedback({
                internName: `${intern.firstName} ${intern.lastName}`,
                completedTasks,
                totalTasks: tasks.length,
                status: intern.status,
                focusAreas: intern.department
            });
            
            // Store the generated content
            await INSERT.into(AIGeneratedContent).entries({
                ID: cds.utils.uuid(),
                contentType: 'progress_feedback',
                prompt: `Progress feedback for ${intern.firstName} ${intern.lastName}`,
                generatedText: feedback,
                createdAt: new Date(),
                createdBy: req.user?.id || 'system',
                relatedEntityID: ID,
                relatedEntityType: 'Intern'
            });
            
            return feedback;
        } catch (error) {
            console.error('Error generating progress feedback:', error);
            req.error(500, 'Failed to generate progress feedback');
        }
    });
    
    // AI actions for Tasks
    this.on('generateTaskDescription', Tasks, async (req) => {
        try {
            const { ID } = req.params[0];
            const task = await SELECT.one.from(Tasks).where({ ID });
            
            if (!task) {
                req.error(404, 'Task not found');
            }
            
            const description = await openaiService.generateTaskDescription({
                title: task.title,
                department: task.department || 'General',
                priority: task.priority,
                estimatedHours: task.estimatedHours || 8
            });
            
            // Update the task with the generated description
            await UPDATE(Tasks).set({ description }).where({ ID });
            
            // Store the generated content
            await INSERT.into(AIGeneratedContent).entries({
                ID: cds.utils.uuid(),
                contentType: 'task_description',
                prompt: `Task description for: ${task.title}`,
                generatedText: description,
                createdAt: new Date(),
                createdBy: req.user?.id || 'system',
                relatedEntityID: ID,
                relatedEntityType: 'Task'
            });
            
            return description;
        } catch (error) {
            console.error('Error generating task description:', error);
            req.error(500, 'Failed to generate task description');
        }
    });
    
    this.on('generateTaskSuggestions', Tasks, async (req) => {
        try {
            const { ID } = req.params[0];
            const task = await SELECT.one.from(Tasks).where({ ID });
            
            if (!task) {
                req.error(404, 'Task not found');
            }
            
            const suggestions = await openaiService.generateCompletion(
                `Based on the task "${task.title}" with priority "${task.priority}", suggest 3-5 related learning activities or sub-tasks that would help an intern complete this task successfully. Focus on practical, actionable suggestions.`,
                {
                    systemMessage: 'You are a mentor providing helpful suggestions for intern tasks.',
                    temperature: 0.7
                }
            );
            
            // Store the generated content
            await INSERT.into(AIGeneratedContent).entries({
                ID: cds.utils.uuid(),
                contentType: 'task_suggestions',
                prompt: `Task suggestions for: ${task.title}`,
                generatedText: suggestions,
                createdAt: new Date(),
                createdBy: req.user?.id || 'system',
                relatedEntityID: ID,
                relatedEntityType: 'Task'
            });
            
            return suggestions;
        } catch (error) {
            console.error('Error generating task suggestions:', error);
            req.error(500, 'Failed to generate task suggestions');
        }
    });
    
    // AI utility functions
    this.on('generateFAQResponse', async (req) => {
        try {
            const { question, context } = req.data;
            
            if (!question) {
                req.error(400, 'Question is required');
            }
            
            const response = await openaiService.generateFAQResponse(question, context);
            
            // Store the generated content
            await INSERT.into(AIGeneratedContent).entries({
                ID: cds.utils.uuid(),
                contentType: 'faq_response',
                prompt: question,
                generatedText: response,
                createdAt: new Date(),
                createdBy: req.user?.id || 'system',
                relatedEntityID: null,
                relatedEntityType: 'FAQ'
            });
            
            return response;
        } catch (error) {
            console.error('Error generating FAQ response:', error);
            req.error(500, 'Failed to generate FAQ response');
        }
    });
    
    this.on('generateCustomContent', async (req) => {
        try {
            const { prompt, contentType } = req.data;
            
            if (!prompt) {
                req.error(400, 'Prompt is required');
            }
            
            const content = await openaiService.generateCompletion(prompt, {
                systemMessage: 'You are a helpful assistant for an intern onboarding system.',
                temperature: 0.7
            });
            
            // Store the generated content
            await INSERT.into(AIGeneratedContent).entries({
                ID: cds.utils.uuid(),
                contentType: contentType || 'custom',
                prompt,
                generatedText: content,
                createdAt: new Date(),
                createdBy: req.user?.id || 'system',
                relatedEntityID: null,
                relatedEntityType: 'Custom'
            });
            
            return content;
        } catch (error) {
            console.error('Error generating custom content:', error);
            req.error(500, 'Failed to generate custom content');
        }
    });
    
    // Before create validation for AI content
    this.before('CREATE', AIGeneratedContent, async (req) => {
        if (!req.data.ID) {
            req.data.ID = cds.utils.uuid();
        }
        if (!req.data.createdAt) {
            req.data.createdAt = new Date();
        }
    });
    
    this.before('CREATE', AIInsights, async (req) => {
        if (!req.data.ID) {
            req.data.ID = cds.utils.uuid();
        }
        if (!req.data.generatedAt) {
            req.data.generatedAt = new Date();
        }
    });
    
});
