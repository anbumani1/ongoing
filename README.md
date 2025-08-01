# 🚀 Intern Onboarding System

A comprehensive SAP CAP (Cloud Application Programming) application for managing intern onboarding processes with AI-powered features and policy management.

## 📋 Features

### 🏠 Employee Dashboard
- **Main Landing Page**: Clean, professional employee-focused interface
- **Navigation Panel**: Easy access to all onboarding features
- **Responsive Design**: Works on desktop and mobile devices

### 📚 Company Policies Management
- **Comprehensive Policy Database**: 6 detailed company policies stored in SQLite
- **Policy Categories**:
  - Employee Handbook (v4.1)
  - Code of Conduct (v3.0)
  - Information Security Policy (v2.8)
  - Remote Work Policy (v2.5)
  - Professional Development Policy (v1.9)
  - Workplace Safety Policy (v3.1)
- **Acknowledgment Tracking**: Track which policies employees have acknowledged
- **Real-time Status Updates**: See pending vs acknowledged policies

### 🤖 AI Integration
- **Google AI (Gemini) Integration**: Powered by Google's Generative AI
- **AI Assistant Chat**: Interactive chatbot for intern support
- **Policy Enhancement**: AI-powered policy content generation and improvement
- **Smart Responses**: Context-aware assistance for common onboarding questions

### 🗄️ Database Management
- **SQLite Database**: Lightweight, efficient data storage
- **Policy Storage**: Comprehensive policy content with versioning
- **Acknowledgment History**: Track employee policy acknowledgments
- **Data Integrity**: Proper indexing and relationships

## 🛠️ Technology Stack

- **Backend**: SAP CAP (Cloud Application Programming Model)
- **Frontend**: SAP UI5 with XML views
- **Database**: SQLite with comprehensive schema
- **AI Services**: Google Generative AI (Gemini)
- **Runtime**: Node.js
- **Package Manager**: npm

## 📁 Project Structure

```
intern-onboarding/
├── app/
│   └── project1/           # UI5 Frontend Application
│       ├── webapp/
│       │   ├── controller/ # UI Controllers
│       │   ├── view/       # XML Views
│       │   ├── model/      # Data Models
│       │   └── css/        # Stylesheets
│       └── annotations.cds
├── srv/                    # Backend Services
│   ├── ai-service.js       # AI Integration Service
│   ├── intern-service.js   # Main Business Logic
│   ├── policies-service.js # Policy Management Service
│   └── google-ai-service.js # Google AI Integration
├── db/                     # Database Layer
│   ├── schema.cds          # Data Model Definition
│   ├── policies.db         # SQLite Policy Database
│   └── enhanced-policies-data.sql # Sample Data
├── package.json            # Dependencies and Scripts
└── README.md              # This file
```

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/anbumani1/ongoing.git
   cd ongoing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   # Google AI API Configuration
   GOOGLE_AI_API_KEY=your_google_ai_api_key_here

   # Application Configuration
   NODE_ENV=development
   PORT=4004
   ```

4. **Initialize Database**
   The SQLite database will be automatically created with sample data on first run.

5. **Start the Development Server**
   ```bash
   npm run watch
   ```

6. **Access the Application**
   Open your browser and navigate to:
   - Main Application: `http://localhost:4004/project1/webapp/index.html`
   - Employee Dashboard: `http://localhost:4004/project1/webapp/index.html`

## 🎯 Usage

### Employee Dashboard
1. **Access the Dashboard**: Navigate to the main application URL
2. **Company Policies**: Click on "Company Policies" to view and acknowledge policies
3. **AI Assistant**: Use the "🤖 AI Assistant Chat" for interactive help
4. **Learning Path**: Access professional development resources
5. **My Profile**: Manage personal information and preferences

### Policy Management
1. **View Policies**: Browse through comprehensive company policies
2. **Read Content**: Click on any policy to view detailed content
3. **Acknowledge Policies**: Mark policies as read and acknowledged
4. **Track Progress**: Monitor acknowledgment status and history

### AI Features
1. **Chat Assistant**: Ask questions about company policies and procedures
2. **Smart Responses**: Get contextual help for onboarding tasks
3. **Policy Guidance**: Receive AI-powered explanations of policy content

## 🔧 Configuration

### Environment Variables
- `GOOGLE_AI_API_KEY`: Your Google AI API key for Gemini integration
- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default: 4004)

### Database Configuration
The application uses SQLite for data persistence. The database is automatically created and populated with sample data on first run.

## 🚀 Deployment

### Development
```bash
npm run watch
```

### Production Build
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- **Development Team** - Initial work and ongoing development

## 🙏 Acknowledgments

- SAP CAP framework for the robust backend architecture
- Google AI for powerful generative AI capabilities
- SAP UI5 for the professional frontend framework
- SQLite for reliable data storage

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**Built with ❤️ using SAP CAP, UI5, and Google AI**
