-- TechCorp Solutions Company Policies Database Setup
-- This script creates the policies table and inserts sample data

-- Create the policies table
CREATE TABLE IF NOT EXISTS company_policies (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    status TEXT DEFAULT 'Pending',
    version TEXT,
    effective_date DATE,
    last_updated DATE,
    requires_acknowledgment BOOLEAN DEFAULT 0,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create acknowledgment history table
CREATE TABLE IF NOT EXISTS policy_acknowledgments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    policy_id TEXT NOT NULL,
    employee_id TEXT NOT NULL,
    acknowledged_date DATE NOT NULL,
    policy_version TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (policy_id) REFERENCES company_policies(id)
);

-- Clear existing data and insert comprehensive policy data
DELETE FROM policy_acknowledgments;
DELETE FROM company_policies;

INSERT OR REPLACE INTO company_policies (
    id, title, description, icon, status, version, effective_date, last_updated, requires_acknowledgment, content
) VALUES
(
    'POL001',
    'Employee Handbook',
    'Complete guide to company policies, procedures, and benefits',
    'sap-icon://document',
    'Acknowledged',
    'v3.2',
    '2024-01-01',
    '2024-12-01',
    1,
    '# TechCorp Solutions Employee Handbook
Version 3.2 | Effective Date: January 1, 2024

## Welcome to TechCorp Solutions

Welcome to TechCorp Solutions! This handbook serves as your comprehensive guide to our company policies, procedures, and benefits. We''re excited to have you as part of our innovative team.

## Company Overview

**Mission Statement:** To deliver cutting-edge technology solutions that transform businesses and improve lives worldwide.

**Core Values:**
• Innovation: We embrace creativity and forward-thinking solutions
• Integrity: We conduct business with honesty and transparency
• Collaboration: We work together to achieve exceptional results
• Excellence: We strive for the highest quality in everything we do
• Respect: We value diversity and treat everyone with dignity

## Employment Basics

### Work Schedule
• Standard hours: Monday-Friday, 9:00 AM - 5:00 PM
• Flexible start times: 8:00 AM - 10:00 AM (with manager approval)
• Lunch break: 1 hour (unpaid)
• Core collaboration hours: 10:00 AM - 3:00 PM (all team members present)

### Benefits Package

#### Health & Wellness
• Comprehensive medical, dental, and vision insurance
• Mental health support and counseling services
• Fitness center membership reimbursement ($50/month)
• Annual wellness check-up (company paid)

#### Financial Benefits
• 401(k) with 4% company match (vested immediately)
• Annual performance bonus (up to 15% of salary)
• Stock options for eligible employees
• Professional development budget: $2,000 annually

For questions contact HR: hr@techcorp.com or ext. 3333'
),
(
    'POL002',
    'Code of Conduct',
    'Ethical guidelines, behavioral expectations, and compliance requirements',
    'sap-icon://shield',
    'Acknowledged',
    'v2.1',
    '2024-03-01',
    '2024-11-15',
    1,
    '# TechCorp Solutions Code of Conduct
Version 2.1 | Effective Date: March 1, 2024

## Our Commitment to Ethical Business

At TechCorp Solutions, we are committed to conducting business with the highest ethical standards.

## Core Principles

### Integrity in All Actions
• Be honest and transparent in all business dealings
• Report concerns without fear of retaliation
• Take responsibility for your actions and decisions
• Admit mistakes and work to correct them promptly

### Respect for All People
• Treat colleagues, clients, and partners with dignity
• Embrace diversity and inclusion in all interactions
• Prohibit discrimination based on any protected characteristic
• Foster an environment free from harassment

## Reporting Violations
• Report suspected violations promptly
• Use anonymous reporting hotline: 1-800-ETHICS-1
• Contact HR or Legal department directly
• No retaliation for good faith reporting

For ethics questions contact: ethics@techcorp.com or 1-800-ETHICS-1'
),
(
    'POL003',
    'Information Security Policy',
    'Data protection, cybersecurity guidelines, and IT usage policies',
    'sap-icon://locked',
    'Pending',
    'v4.0',
    '2024-06-01',
    '2024-10-30',
    1,
    '# TechCorp Solutions Information Security Policy
Version 4.0 | Effective Date: June 1, 2024

## Information Security Framework

TechCorp Solutions is committed to protecting the confidentiality, integrity, and availability of all information assets.

## Security Principles

### Access Control and Authentication
• Unique user accounts for each employee
• Strong password requirements (minimum 12 characters)
• Multi-factor authentication (MFA) required for all systems
• Regular password changes (every 90 days)

### Data Protection
• Encrypt sensitive data in transit and at rest
• Secure disposal of data and media
• Data retention policies strictly followed
• Privacy impact assessments for new systems

### Incident Response
• Report incidents immediately to IT Security
• Security hotline: ext. 9999 (24/7)
• Email: security@techcorp.com
• Document all incidents in security system

For security questions contact: security@techcorp.com or ext. 9999'
),
(
    'POL004',
    'Workplace Safety Guidelines',
    'Health and safety procedures, emergency protocols, and incident reporting',
    'sap-icon://warning',
    'Acknowledged',
    'v2.3',
    '2024-04-01',
    '2024-09-15',
    1,
    '# TechCorp Solutions Workplace Safety Guidelines
Version 2.3 | Effective Date: April 1, 2024

## Our Commitment to Safety

TechCorp Solutions is committed to providing a safe and healthy work environment for all employees, contractors, and visitors.

## General Safety Principles
• Follow all safety procedures and guidelines
• Report unsafe conditions immediately
• Use personal protective equipment (PPE) when required
• Participate in safety training programs

## Emergency Procedures

### Emergency Contacts
• Fire/Medical Emergency: 911
• Security Emergency: ext. 9999
• Facilities Emergency: ext. 1111

### Evacuation Procedures
1. Stop work immediately when alarm sounds
2. Use nearest safe exit route
3. Gather at designated outdoor location
4. Report to floor warden
5. Wait for official all-clear signal

For safety questions contact: safety@techcorp.com ext. 4444'
),
(
    'POL005',
    'Remote Work Policy',
    'Guidelines for remote work, hybrid schedules, and home office setup',
    'sap-icon://home',
    'Pending',
    'v1.8',
    '2024-09-01',
    '2024-11-20',
    1,
    '# TechCorp Solutions Remote Work Policy
Version 1.8 | Effective Date: September 1, 2024

## Remote Work Philosophy

TechCorp Solutions embraces flexible work arrangements that support work-life balance while maintaining productivity and collaboration.

## Eligibility and Approval
• Roles that can be performed effectively without physical presence
• Positions with measurable deliverables and outcomes
• Submit remote work request to direct supervisor
• Complete remote work readiness assessment

## Home Office Requirements
• Dedicated, quiet workspace free from distractions
• High-speed internet connection (minimum 25 Mbps)
• Company-provided laptop and necessary peripherals
• Secure Wi-Fi network (not public or shared)

## Communication Expectations
• Available during core business hours (10 AM - 3 PM)
• Respond to messages within 4 hours during business hours
• Video on for all team meetings
• Professional appearance and background

For remote work questions contact: hr@techcorp.com'
),
(
    'POL006',
    'Professional Development',
    'Learning opportunities, career advancement, and skill development programs',
    'sap-icon://learning-assistant',
    'Reviewed',
    'v3.1',
    '2024-07-01',
    '2024-10-15',
    0,
    '# TechCorp Solutions Professional Development Policy
Version 3.1 | Effective Date: July 1, 2024

## Our Commitment to Growth

TechCorp Solutions believes that investing in our employees'' professional development is essential for both individual success and organizational excellence.

## Development Opportunities

### Educational Support
• Tuition Reimbursement: Up to $5,000 annually for approved degree programs
• Professional Certifications: Full reimbursement for job-related certifications
• Conference Attendance: Budget allocation for industry conferences
• Online Learning Platforms: Access to LinkedIn Learning, Coursera, and Udemy

### Individual Development Budget
• All Employees: $2,000 annually for professional development
• Senior Staff: $3,500 annually with additional conference budget
• Leadership Team: $5,000 annually plus executive coaching

### Skills Development Programs
• Programming Languages: Training in current and emerging technologies
• Data Analytics: Statistical analysis, visualization, and interpretation
• Cloud Computing: AWS, Azure, and Google Cloud Platform certifications
• Leadership Skills: Communication, team management, strategic thinking

For learning questions contact: learning@techcorp.com ext. 5555'
);

-- Insert sample acknowledgment history
INSERT OR REPLACE INTO policy_acknowledgments (
    policy_id, employee_id, acknowledged_date, policy_version
) VALUES 
('POL001', 'EMP001', '2024-12-10', 'v3.2'),
('POL002', 'EMP001', '2024-12-08', 'v2.1'),
('POL004', 'EMP001', '2024-12-05', 'v2.3');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_policies_status ON company_policies(status);
CREATE INDEX IF NOT EXISTS idx_policies_effective_date ON company_policies(effective_date);
CREATE INDEX IF NOT EXISTS idx_acknowledgments_employee ON policy_acknowledgments(employee_id);
CREATE INDEX IF NOT EXISTS idx_acknowledgments_policy ON policy_acknowledgments(policy_id);

-- Create a view for policies with acknowledgment status
CREATE VIEW IF NOT EXISTS policies_with_acknowledgment AS
SELECT 
    p.*,
    CASE 
        WHEN pa.acknowledged_date IS NOT NULL THEN 'Acknowledged'
        ELSE p.status
    END as current_status,
    pa.acknowledged_date,
    pa.policy_version as acknowledged_version
FROM company_policies p
LEFT JOIN policy_acknowledgments pa ON p.id = pa.policy_id AND pa.employee_id = 'EMP001';

-- Query to get all policies with their acknowledgment status
-- SELECT * FROM policies_with_acknowledgment ORDER BY effective_date DESC;
