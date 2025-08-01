using { intern.onboarding as db } from '../db/schema';

service AIService {
    
    // AI-powered actions for interns
    entity Interns as projection on db.Interns actions {
        action generateWelcomeMessage() returns String;
        action generateLearningPlan() returns String;
        action generateProgressFeedback() returns String;
    };
    
    // AI-powered actions for tasks
    entity Tasks as projection on db.Tasks actions {
        action generateTaskDescription() returns String;
        action generateTaskSuggestions() returns String;
    };
    
    // AI utility functions
    function generateFAQResponse(question: String, context: String) returns String;
    function generateCustomContent(prompt: String, contentType: String) returns String;
    
    // AI-generated content entities
    entity AIGeneratedContent {
        key ID: UUID;
        contentType: String;
        prompt: String;
        generatedText: String;
        createdAt: Timestamp;
        createdBy: String;
        relatedEntityID: UUID;
        relatedEntityType: String;
    };
    
    // Analytics and insights
    entity AIInsights {
        key ID: UUID;
        insightType: String;
        title: String;
        description: String;
        data: String; // JSON string containing insight data
        generatedAt: Timestamp;
        validUntil: Timestamp;
    };
}
