# 🚀 Quick Reference Guide - Employee Dashboard

## 📁 File Structure Quick Map

```
📦 Project Root
├── 🎨 app/project1/webapp/          # Frontend (UI5)
│   ├── view/                        # XML Views & Fragments
│   ├── controller/                  # JavaScript Controllers
│   ├── css/                         # Stylesheets
│   └── services/                    # Frontend Services
├── 🔧 srv/                          # Backend Services (CAP)
│   ├── intern-service.js            # Main business logic
│   ├── email-service.js             # Email functionality
│   ├── ai-service.js                # AI integration
│   └── *.cds                        # Service definitions
├── 🗄️ db/                           # Database Layer
│   ├── schema.cds                   # Data model
│   └── *.db                         # SQLite databases
└── ⚙️ Configuration Files
    ├── package.json                 # Dependencies
    ├── .env                         # Environment variables
    └── manifest.json                # App configuration
```

---

## 🎯 Key Components at a Glance

### **🎨 Frontend (UI Layer)**
| File | Purpose | Key Features |
|------|---------|--------------|
| `EmployeeDashboard.view.xml` | Main UI layout | Navigation, content areas |
| `EmployeeDashboard.controller.js` | Main logic (3000+ lines) | All UI interactions |
| `ChatbotDialog.fragment.xml` | AI chat interface | Google Gemini integration |
| `ITSupportDialogSimple.fragment.xml` | Support center | Email ticket system |
| `NotesDialog.fragment.xml` | Notes system | Notion-like editor |
| `EmailInboxDialog.fragment.xml` | Email management | Mailgun integration |

### **🔧 Backend (Service Layer)**
| File | Purpose | Key Features |
|------|---------|--------------|
| `intern-service.js` | Core business logic | CRUD operations, mentoring |
| `email-service.js` | Email functionality | Support tickets, templates |
| `ai-service.js` | AI integration | Chat responses, context |
| `google-ai-service.js` | Google Gemini API | AI conversation handling |
| `email-helper.js` | Mailgun integration | Professional email templates |

### **🗄️ Database (Data Layer)**
| Entity | Purpose | Key Fields |
|--------|---------|------------|
| `Interns` | Employee data | firstName, lastName, email, department |
| `Mentors` | Mentor information | firstName, lastName, email, department |
| `Tasks` | Task management | title, description, dueDate, priority |
| `SupportTickets` | IT support | ticketNumber, subject, priority, status |
| `EmailLogs` | Email tracking | recipient, messageId, status |

---

## 🔄 Common Operations

### **Adding a New Dialog**
1. Create Fragment: `app/project1/webapp/view/NewDialog.fragment.xml`
2. Add controller method: `onOpenNewDialog()` in `EmployeeDashboard.controller.js`
3. Load fragment: Use `Fragment.load()` pattern
4. Add button: Update main view XML

### **Adding a New Service**
1. Define service: Create `new-service.cds` in `srv/`
2. Implement logic: Create `new-service.js` in `srv/`
3. Add entities: Update `db/schema.cds` if needed
4. Register service: Add to `package.json` cds configuration

### **Adding a New Database Entity**
1. Define entity: Add to `db/schema.cds`
2. Create service projection: Add to service CDS file
3. Implement handlers: Add to service JS file
4. Update UI: Add views/controllers as needed

---

## 🛠️ Development Workflow

### **Starting Development**
```bash
# 1. Install dependencies
npm install

# 2. Start server
npm start
# or with specific port
PORT=4007 npm start

# 3. Access application
http://localhost:4007/project1/webapp/index.html
```

### **Making Changes**
1. **Frontend Changes**: Edit XML views or JS controllers
2. **Backend Changes**: Edit CDS definitions or JS implementations
3. **Database Changes**: Update `schema.cds` and restart server
4. **Styling Changes**: Edit CSS files in `app/project1/webapp/css/`

### **Testing Features**
- **Email**: Use "Test Email Service" button in IT Support
- **AI Chat**: Click AI Assistant button in navigation
- **Notes**: Click "My Notes" in main actions
- **Support**: Click "Help & Support" in support section

---

## 🔧 Configuration Quick Reference

### **Environment Variables (.env)**
```env
# AI Configuration
GOOGLE_AI_API_KEY=your_google_ai_key

# Email Configuration  
MAILGUN_API_KEY=your_mailgun_key
MAILGUN_DOMAIN=your_mailgun_domain

# App Configuration
PORT=4007
NODE_ENV=development
```

### **Key Dependencies**
```json
{
  "@sap/cds": "SAP CAP Framework",
  "@cap-js/sqlite": "Database driver",
  "@google/generative-ai": "Google AI integration",
  "mailgun.js": "Email service",
  "multer": "File uploads",
  "sqlite3": "SQLite database"
}
```

---

## 🎯 Feature Locations

### **Where to Find Key Features**

| Feature | Frontend Location | Backend Location |
|---------|------------------|------------------|
| **AI Chat** | `ChatbotDialog.fragment.xml` | `ai-service.js` |
| **Email System** | `EmailInboxDialog.fragment.xml` | `email-service.js` |
| **IT Support** | `ITSupportDialogSimple.fragment.xml` | `email-helper.js` |
| **Notes System** | `NotesDialog.fragment.xml` | `NotesDatabase.js` |
| **Task Management** | `EmployeeDashboard.view.xml` | `intern-service.js` |
| **Settings** | `SettingsDialog.fragment.xml` | `localStorage` |

### **Key Controller Methods**
```javascript
// Main navigation
onAIAssistantAccess()     // Opens AI chat
onNotesAccess()           // Opens notes system
onHelpAccess()            // Opens IT support
onSettingsAccess()        // Opens settings

// Email functionality
onTestEmailService()      // Tests email connection
onSubmitQuickTicket()     // Creates support ticket

// AI functionality
onSendMessage()           // Sends AI chat message
onClearChat()             // Clears chat history

// Notes functionality
onSaveNote()              // Saves note to database
onCreateNewNote()         // Creates new note
```

---

## 🚨 Troubleshooting

### **Common Issues**
1. **Server won't start**: Check if port is in use, try different port
2. **Email not working**: Verify Mailgun API key and domain
3. **AI not responding**: Check Google AI API key
4. **Database errors**: Restart server to reinitialize SQLite
5. **UI not loading**: Check browser console for JavaScript errors

### **Debug Commands**
```bash
# Check running processes
ps aux | grep node

# Check port usage
netstat -tulpn | grep 4007

# Kill process on port
lsof -ti:4007 | xargs kill -9

# View logs
npm start 2>&1 | tee app.log
```

---

## 📊 Data Flow Summary

```
User Action (UI5) 
    ↓
Controller Method (JavaScript)
    ↓
Service Call (OData/REST)
    ↓
CAP Service (Node.js)
    ↓
Database Query (SQLite)
    ↓
Response Chain Back to UI
```

---

## 🎯 Quick Development Tips

1. **Use Browser DevTools**: F12 for debugging frontend
2. **Check Console Logs**: Server logs show backend errors
3. **Test API Endpoints**: Use `test.http` file
4. **Restart Server**: After database schema changes
5. **Clear Browser Cache**: After CSS/JS changes
6. **Use Fragment Pattern**: For reusable UI components
7. **Follow MVC Pattern**: Keep logic in controllers, UI in views
