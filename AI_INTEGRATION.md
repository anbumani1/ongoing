# AI Integration with OpenAI

This document describes the AI integration features added to the Intern Onboarding System using OpenAI's API.

## 🔧 Setup

### Environment Variables
The application requires the following environment variable to be set in the `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### Dependencies
The following npm packages have been added:
- `openai` - Official OpenAI Node.js library
- `dotenv` - Environment variable management

## 🚀 Features

### 1. OpenAI Service (`srv/openai-service.js`)
Core service class that handles all OpenAI API interactions:

#### Methods:
- `generateCompletion(prompt, options)` - General purpose text generation
- `generateOnboardingContent(internData)` - Personalized welcome messages
- `generateTaskDescription(taskData)` - Detailed task descriptions
- `generateProgressFeedback(progressData)` - Constructive feedback
- `generateFAQResponse(question, context)` - FAQ responses
- `generateLearningRecommendations(internProfile)` - Learning plans

### 2. AI Service (`srv/ai-service.cds` & `srv/ai-service.js`)
CAP service that exposes AI functionality through OData endpoints:

#### Intern Actions:
- `generateWelcomeMessage()` - Creates personalized welcome content
- `generateLearningPlan()` - Generates learning recommendations
- `generateProgressFeedback()` - Provides progress analysis

#### Task Actions:
- `generateTaskDescription()` - Auto-generates detailed task descriptions
- `generateTaskSuggestions()` - Suggests related learning activities

#### Utility Functions:
- `generateFAQResponse(question, context)` - Answers common questions
- `generateCustomContent(prompt, contentType)` - Custom AI content generation

### 3. Database Entities

#### AIGeneratedContent
Stores all AI-generated content for audit and reuse:
```cds
entity AIGeneratedContent : managed, cuid {
    contentType       : String(50) not null;
    prompt           : String(2000);
    generatedText    : String(5000);
    relatedEntityID  : UUID;
    relatedEntityType : String(50);
}
```

#### AIInsights
Stores AI-generated insights and analytics:
```cds
entity AIInsights : managed, cuid {
    insightType      : String(50) not null;
    title           : String(200);
    description     : String(1000);
    data            : String(5000);
    validUntil      : Timestamp;
}
```

#### Enhanced Entities
Added AI-supporting fields to existing entities:

**Interns:**
- `interests` - Personal/professional interests
- `skills` - Current skill set
- `careerGoals` - Career aspirations

**Tasks:**
- `estimatedHours` - Time estimation for AI context
- `department` - Department context for AI

## 🧪 Testing

### Manual Testing
Run the OpenAI service test:
```bash
npm run test-openai
```

This will test:
- Basic completion generation
- Onboarding content creation
- Task description generation
- FAQ response generation

### API Testing
Once the service is running (`npm start`), you can test the AI endpoints:

#### Generate Welcome Message
```http
POST /odata/v4/ai/Interns(ID)/generateWelcomeMessage
```

#### Generate Learning Plan
```http
POST /odata/v4/ai/Interns(ID)/generateLearningPlan
```

#### Generate Task Description
```http
POST /odata/v4/ai/Tasks(ID)/generateTaskDescription
```

#### Custom FAQ Response
```http
POST /odata/v4/ai/generateFAQResponse
Content-Type: application/json

{
  "question": "How do I submit my timesheet?",
  "context": "Company uses SAP SuccessFactors for time tracking"
}
```

## 📊 Usage Examples

### 1. Welcome Message Generation
```javascript
// Automatically generates personalized welcome content
const welcomeMessage = await openaiService.generateOnboardingContent({
    firstName: 'Alice',
    lastName: 'Johnson',
    department: 'Marketing',
    startDate: '2024-02-01',
    email: 'alice.johnson@company.com'
});
```

### 2. Task Description Enhancement
```javascript
// Generates detailed, educational task descriptions
const description = await openaiService.generateTaskDescription({
    title: 'Market Research Analysis',
    department: 'Marketing',
    priority: 'High',
    estimatedHours: 12
});
```

### 3. Progress Feedback
```javascript
// Provides constructive feedback based on progress
const feedback = await openaiService.generateProgressFeedback({
    internName: 'Alice Johnson',
    completedTasks: 8,
    totalTasks: 12,
    status: 'Active',
    focusAreas: 'Marketing Analytics'
});
```

## 🔒 Security Considerations

1. **API Key Protection**: Never commit the `.env` file to version control
2. **Rate Limiting**: OpenAI API has rate limits - implement caching for frequently requested content
3. **Content Validation**: Always validate AI-generated content before displaying to users
4. **Error Handling**: Implement proper error handling for API failures
5. **Cost Management**: Monitor API usage to control costs

## 🚀 Deployment

### Environment Setup
1. Set the `OPENAI_API_KEY` environment variable in your deployment environment
2. Ensure the `.env` file is properly configured for your environment
3. Deploy the updated schema with AI entities

### Database Migration
After deployment, run:
```bash
npm run deploy
```

This will create the new AI-related database tables.

## 🔄 Future Enhancements

1. **Caching Layer**: Implement Redis caching for frequently generated content
2. **Content Moderation**: Add content filtering and moderation
3. **Analytics Dashboard**: Create insights dashboard using AIInsights entity
4. **Batch Processing**: Implement batch AI operations for multiple entities
5. **Custom Models**: Support for fine-tuned models specific to company context
6. **Multi-language Support**: Generate content in multiple languages
7. **Integration with Learning Management Systems**: Connect with LMS for personalized learning paths

## 📞 Support

For issues related to AI integration:
1. Check the console logs for detailed error messages
2. Verify the OpenAI API key is correctly set
3. Ensure sufficient API credits are available
4. Review the OpenAI API documentation for rate limits and usage guidelines
