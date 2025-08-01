/**
 * Mock Data for Employee Dashboard Testing
 * This file contains comprehensive test data for all dashboard features
 */

sap.ui.define([], function() {
    "use strict";

    return {
        // Employee Profile Data
        getEmployeeData: function() {
            return {
                firstName: "Alice",
                lastName: "Wilson",
                department: "Software Engineering",
                role: "Software Development Intern",
                employeeId: "EMP001",
                email: "alice.wilson@company.com",
                startDate: "January 15, 2024",
                manager: "Sarah Johnson",
                location: "San Francisco, CA",
                phone: "+1 (555) 123-4567"
            };
        },

        // Dashboard Statistics
        getDashboardStats: function() {
            return {
                tasksCompleted: 8,
                coursesInProgress: 3,
                certificatesEarned: 2,
                notesCreated: 12,
                totalHours: 24,
                streak: 7
            };
        },

        // Task Data
        getTasksData: function() {
            return [
                {
                    ID: "TSK001",
                    title: "Complete Onboarding Training",
                    description: "Finish all mandatory training modules including company culture, safety, and compliance",
                    priority: "High",
                    status: "In Progress",
                    dueDate: "December 20, 2024",
                    estimatedHours: 8,
                    progress: 75,
                    assignedBy: "Sarah Johnson",
                    category: "Training"
                },
                {
                    ID: "TSK002",
                    title: "Setup Development Environment",
                    description: "Install required tools: VS Code, Node.js, Git, and configure workspace settings",
                    priority: "High",
                    status: "Completed",
                    dueDate: "December 15, 2024",
                    estimatedHours: 4,
                    progress: 100,
                    assignedBy: "Alex Rodriguez",
                    category: "Technical"
                },
                {
                    ID: "TSK003",
                    title: "First Code Review Assignment",
                    description: "Review pull request #123 and provide constructive feedback on code quality",
                    priority: "Medium",
                    status: "In Progress",
                    dueDate: "December 18, 2024",
                    estimatedHours: 2,
                    progress: 30,
                    assignedBy: "Alex Rodriguez",
                    category: "Development"
                },
                {
                    ID: "TSK004",
                    title: "Team Meeting Preparation",
                    description: "Prepare presentation for weekly team standup on project progress",
                    priority: "Medium",
                    status: "Pending",
                    dueDate: "December 19, 2024",
                    estimatedHours: 1,
                    progress: 0,
                    assignedBy: "Sarah Johnson",
                    category: "Communication"
                },
                {
                    ID: "TSK005",
                    title: "Documentation Update",
                    description: "Update API documentation for the user authentication module",
                    priority: "Low",
                    status: "Pending",
                    dueDate: "December 25, 2024",
                    estimatedHours: 3,
                    progress: 0,
                    assignedBy: "Jennifer Liu",
                    category: "Documentation"
                }
            ];
        },

        // Learning Progress Data
        getLearningData: function() {
            return {
                learningProgress: {
                    overall: 68,
                    completed: 5,
                    inProgress: 3,
                    certificates: 2,
                    totalHours: 24,
                    streak: 7
                },
                learningPaths: [
                    {
                        id: "PATH001",
                        name: "Onboarding Essentials",
                        description: "Required courses for all new employees",
                        progress: 85,
                        totalCourses: 6,
                        completedCourses: 5,
                        estimatedHours: 12,
                        dueDate: "2024-12-20",
                        status: "In Progress"
                    },
                    {
                        id: "PATH002",
                        name: "Technical Skills Development",
                        description: "Role-specific technical training and certifications",
                        progress: 45,
                        totalCourses: 8,
                        completedCourses: 3,
                        estimatedHours: 32,
                        dueDate: "2025-02-15",
                        status: "In Progress"
                    },
                    {
                        id: "PATH003",
                        name: "Professional Development",
                        description: "Soft skills, leadership, and career advancement",
                        progress: 0,
                        totalCourses: 5,
                        completedCourses: 0,
                        estimatedHours: 15,
                        dueDate: "2025-03-30",
                        status: "Not Started"
                    }
                ],
                currentCourses: [
                    {
                        id: "CRS001",
                        name: "Company Culture & Values",
                        description: "Understanding our mission, vision, core values, and organizational structure",
                        progress: 100,
                        dueDate: "Completed on Dec 10, 2024",
                        status: "Completed",
                        instructor: "Sarah Johnson",
                        duration: "2 hours",
                        rating: 4.8,
                        certificate: true
                    },
                    {
                        id: "CRS002",
                        name: "Information Security Fundamentals",
                        description: "Cybersecurity best practices, data protection, and compliance requirements",
                        progress: 100,
                        dueDate: "Completed on Dec 8, 2024",
                        status: "Completed",
                        instructor: "Mike Chen",
                        duration: "3 hours",
                        rating: 4.6,
                        certificate: true
                    },
                    {
                        id: "CRS003",
                        name: "Technical Onboarding - Development Tools",
                        description: "IDE setup, version control, debugging tools, and development workflow",
                        progress: 75,
                        dueDate: "Dec 18, 2024",
                        status: "In Progress",
                        instructor: "Alex Rodriguez",
                        duration: "4 hours",
                        rating: 4.9,
                        certificate: false
                    },
                    {
                        id: "CRS004",
                        name: "Agile Methodology & Scrum",
                        description: "Agile principles, Scrum framework, and team collaboration practices",
                        progress: 30,
                        dueDate: "Dec 25, 2024",
                        status: "In Progress",
                        instructor: "Jennifer Liu",
                        duration: "3 hours",
                        rating: 4.7,
                        certificate: false
                    },
                    {
                        id: "CRS005",
                        name: "Effective Communication Skills",
                        description: "Professional communication, presentation skills, and team collaboration",
                        progress: 0,
                        dueDate: "Jan 15, 2025",
                        status: "Not Started",
                        instructor: "David Park",
                        duration: "2.5 hours",
                        rating: 4.5,
                        certificate: false
                    }
                ],
                certificates: [
                    {
                        id: "CERT001",
                        name: "Company Culture Certification",
                        issuedDate: "2024-12-10",
                        validUntil: "2025-12-10",
                        credentialId: "CC-2024-001-AW"
                    },
                    {
                        id: "CERT002",
                        name: "Information Security Awareness",
                        issuedDate: "2024-12-08",
                        validUntil: "2025-12-08",
                        credentialId: "ISA-2024-002-AW"
                    }
                ]
            };
        },

        // Recent Activities Data
        getActivitiesData: function() {
            return [
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
        },

        // Utility Functions
        formatDate: function(oDate) {
            return oDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },

        formatTime: function(oDate) {
            return oDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    };
});
