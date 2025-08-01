-- Enhanced Company Policies Database with Comprehensive Synthetic Data
-- TechCorp Solutions - Complete Policy Management System

-- Clear existing data
DELETE FROM policy_acknowledgments;
DELETE FROM company_policies;

-- Insert comprehensive policy data
INSERT OR REPLACE INTO company_policies (
    id, title, description, icon, status, version, effective_date, last_updated, requires_acknowledgment, content
) VALUES 

-- Employee Handbook
(
    'POL001',
    'Employee Handbook',
    'Complete guide to company policies, procedures, and benefits',
    'sap-icon://document',
    'Acknowledged',
    'v4.1',
    '2024-01-01',
    '2024-12-15',
    1,
    '# TechCorp Solutions Employee Handbook
Version 4.1 | Effective Date: January 1, 2024 | Last Updated: December 15, 2024

## Table of Contents
1. Welcome & Company Overview
2. Employment Policies
3. Compensation & Benefits
4. Work Environment & Culture
5. Professional Development
6. Health & Safety
7. Technology & Equipment
8. Contact Information

---

## 1. Welcome & Company Overview

### Our Mission
TechCorp Solutions is dedicated to delivering innovative technology solutions that transform businesses and improve lives. We foster a culture of excellence, collaboration, and continuous learning.

### Our Values
- **Innovation**: We embrace creativity and cutting-edge solutions
- **Integrity**: We conduct business with honesty and transparency
- **Collaboration**: We work together to achieve common goals
- **Excellence**: We strive for the highest quality in everything we do
- **Respect**: We value diversity and treat everyone with dignity

### Company History
Founded in 2010, TechCorp Solutions has grown from a startup to a leading technology company with over 2,500 employees worldwide. We specialize in cloud computing, artificial intelligence, and enterprise software solutions.

---

## 2. Employment Policies

### Equal Employment Opportunity
TechCorp Solutions is an equal opportunity employer committed to workplace diversity. We do not discriminate based on race, color, religion, gender, sexual orientation, age, national origin, disability, or veteran status.

### Work Schedule & Attendance
- **Standard Hours**: Monday-Friday, 9:00 AM - 5:00 PM
- **Flexible Start Times**: 8:00 AM - 10:00 AM (with manager approval)
- **Core Collaboration Hours**: 10:00 AM - 3:00 PM (all team members present)
- **Lunch Break**: 1 hour (unpaid)
- **Remote Work**: Available based on role and manager approval

### Performance Management
- Annual performance reviews conducted in Q1
- Quarterly check-ins with direct manager
- 360-degree feedback process for leadership roles
- Performance improvement plans when necessary

---

## 3. Compensation & Benefits

### Salary & Bonuses
- Competitive market-based salaries
- Annual performance bonus (up to 20% of base salary)
- Stock options for eligible employees
- Annual salary review process

### Health & Wellness Benefits
- **Medical Insurance**: Comprehensive coverage with multiple plan options
- **Dental & Vision**: Full coverage for preventive care
- **Mental Health**: Counseling services and wellness programs
- **Fitness**: Gym membership reimbursement ($75/month)
- **Health Savings Account**: Company contribution of $1,000 annually

### Time Off & Leave
- **Vacation**: 15-25 days annually (based on tenure)
- **Sick Leave**: 10 days annually
- **Personal Days**: 3 days annually
- **Holidays**: 12 company holidays plus floating holidays
- **Parental Leave**: 12 weeks paid leave
- **Sabbatical**: 4-week sabbatical after 7 years of service

### Retirement & Financial
- **401(k) Plan**: 6% company match (100% vested immediately)
- **Life Insurance**: 2x annual salary (company-paid)
- **Disability Insurance**: Short and long-term coverage
- **Employee Stock Purchase Plan**: 15% discount

---

## 4. Work Environment & Culture

### Dress Code
- Business casual attire for office days
- Professional attire for client meetings
- Casual dress on Fridays and remote work days

### Communication Guidelines
- Use company email for all business communications
- Slack for team collaboration and quick updates
- Video calls preferred for meetings over 3 people
- Response time expectations: 24 hours for email, 4 hours for Slack

### Workplace Conduct
- Treat all colleagues with respect and professionalism
- Maintain confidentiality of sensitive information
- Report any harassment or discrimination immediately
- Follow open-door policy for concerns or suggestions

---

## 5. Professional Development

### Learning & Development
- **Annual Training Budget**: $3,000 per employee
- **Conference Attendance**: 1-2 conferences per year
- **Internal Training**: Monthly lunch-and-learn sessions
- **Certification Support**: Company pays for relevant certifications
- **Tuition Reimbursement**: Up to $5,000 annually for approved programs

### Career Advancement
- Internal job postings shared before external recruitment
- Mentorship program pairing junior and senior employees
- Leadership development track for high-potential employees
- Cross-functional project opportunities

---

## 6. Health & Safety

### Workplace Safety
- Emergency evacuation procedures posted in all areas
- First aid kits and AED devices available on each floor
- Regular safety drills and training sessions
- Incident reporting system for workplace injuries

### Ergonomics & Wellness
- Ergonomic workstation assessments available
- Standing desks and ergonomic equipment provided
- Eye strain prevention programs for computer users
- Wellness challenges and health screenings

---

## 7. Technology & Equipment

### Equipment Provision
- Laptop/desktop computer based on role requirements
- Monitor, keyboard, mouse, and necessary peripherals
- Mobile phone for eligible positions
- Home office setup allowance for remote workers ($500)

### IT Support & Policies
- Help desk available 24/7 for technical issues
- Software installation requires IT approval
- Regular security updates and patches mandatory
- Equipment return required upon termination

---

## 8. Contact Information

### Human Resources
- **Email**: hr@techcorp.com
- **Phone**: (555) 123-4567
- **Office Hours**: Monday-Friday, 8:00 AM - 6:00 PM

### IT Support
- **Help Desk**: support@techcorp.com
- **Phone**: (555) 123-TECH (8324)
- **Emergency**: (555) 123-9999

### Employee Assistance Program
- **Confidential Counseling**: 1-800-EAP-HELP
- **Financial Counseling**: Available 24/7
- **Legal Assistance**: Basic legal consultation included

---

## Acknowledgment
By signing below, I acknowledge that I have received, read, and understand the Employee Handbook. I agree to comply with all policies and procedures outlined herein.

**Last Updated**: December 15, 2024
**Next Review Date**: January 1, 2025
**Policy Owner**: Human Resources Department'
),

-- Code of Conduct
(
    'POL002',
    'Code of Conduct',
    'Ethical guidelines, behavioral expectations, and compliance requirements',
    'sap-icon://shield',
    'Acknowledged',
    'v3.0',
    '2024-03-01',
    '2024-12-10',
    1,
    '# TechCorp Solutions Code of Conduct
Version 3.0 | Effective Date: March 1, 2024 | Last Updated: December 10, 2024

## Our Commitment to Ethical Business

At TechCorp Solutions, we are committed to conducting business with the highest standards of ethics and integrity. This Code of Conduct outlines our expectations for all employees, contractors, and business partners.

---

## Core Ethical Principles

### 1. Integrity in All Actions
- Be honest and transparent in all business dealings
- Keep commitments and promises made to colleagues and clients
- Admit mistakes and take responsibility for correcting them
- Avoid conflicts of interest or situations that could appear improper

### 2. Respect for People
- Treat all individuals with dignity and respect
- Value diversity and promote inclusive practices
- Maintain confidentiality of personal and business information
- Provide equal opportunities regardless of background

### 3. Excellence in Service
- Deliver high-quality products and services
- Continuously improve processes and outcomes
- Listen to feedback and act on constructive criticism
- Exceed customer expectations whenever possible

---

## Workplace Conduct Standards

### Professional Behavior
- **Communication**: Use professional, respectful language in all interactions
- **Punctuality**: Arrive on time for meetings and commitments
- **Collaboration**: Work effectively with team members and support colleagues
- **Accountability**: Take ownership of work and decisions

### Harassment & Discrimination Policy
TechCorp Solutions maintains a zero-tolerance policy for harassment and discrimination:

**Prohibited Conduct Includes:**
- Verbal or physical harassment based on protected characteristics
- Unwelcome sexual advances or inappropriate comments
- Bullying, intimidation, or threatening behavior
- Creating a hostile work environment

**Reporting Process:**
1. Report incidents immediately to HR or your manager
2. Use anonymous reporting hotline: 1-800-ETHICS-1
3. All reports investigated promptly and confidentially
4. No retaliation against good-faith reporters

### Substance Abuse Policy
- Alcohol and illegal drugs prohibited on company premises
- Prescription medications must not impair work performance
- Employee assistance programs available for substance abuse issues
- Violation may result in immediate termination

---

## Business Ethics & Compliance

### Conflicts of Interest
Employees must avoid situations where personal interests conflict with company interests:

**Examples of Conflicts:**
- Financial interest in competitors, suppliers, or customers
- Outside employment that competes with company business
- Personal relationships affecting business decisions
- Accepting gifts or favors from business partners

**Disclosure Requirements:**
- Report potential conflicts to your manager and HR
- Complete annual conflict of interest disclosure
- Seek approval before engaging in outside business activities

### Confidential Information
Protecting confidential information is critical to our success:

**Confidential Information Includes:**
- Customer data and business plans
- Financial information and projections
- Product development and technical specifications
- Employee personal information
- Strategic plans and competitive intelligence

**Protection Requirements:**
- Access confidential information only when necessary for work
- Use secure systems and follow data protection protocols
- Never share confidential information with unauthorized persons
- Return all confidential materials upon termination

### Intellectual Property
- Respect copyrights, trademarks, and patents of others
- Properly license all software and materials used
- Report suspected intellectual property violations
- Protect company intellectual property and trade secrets

---

## Financial Integrity & Compliance

### Accurate Record Keeping
- Maintain accurate and complete business records
- Follow established accounting principles and procedures
- Never falsify documents or misrepresent information
- Cooperate fully with internal and external audits

### Anti-Bribery & Corruption
TechCorp Solutions prohibits all forms of bribery and corruption:

**Prohibited Activities:**
- Offering or accepting bribes, kickbacks, or improper payments
- Facilitating payments to expedite routine services
- Lavish entertainment or gifts to influence business decisions
- Political contributions using company funds without approval

**Gift & Entertainment Guidelines:**
- Gifts under $50 value may be accepted occasionally
- Business meals and entertainment must be reasonable and infrequent
- Always decline gifts or entertainment that could influence decisions
- Report any offers of inappropriate gifts or payments

---

## Technology & Information Security

### Acceptable Use of Technology
Company technology resources must be used responsibly:

**Permitted Uses:**
- Business-related activities and communications
- Limited personal use during breaks (email, news, etc.)
- Professional development and training activities

**Prohibited Uses:**
- Accessing inappropriate or offensive content
- Downloading unauthorized software or files
- Using company resources for personal business ventures
- Sharing login credentials or accessing others'' accounts

### Data Security & Privacy
- Use strong passwords and enable two-factor authentication
- Lock computers when away from desk
- Report suspected security breaches immediately
- Follow data classification and handling procedures
- Respect customer and employee privacy rights

---

## Compliance with Laws & Regulations

### Legal Compliance
All employees must comply with applicable laws and regulations:

- **Employment Laws**: Fair labor practices, wage and hour requirements
- **Environmental Laws**: Proper waste disposal and environmental protection
- **Safety Regulations**: OSHA compliance and workplace safety standards
- **Industry Regulations**: Sector-specific compliance requirements
- **International Laws**: Trade regulations and export controls

### Regulatory Reporting
- Cooperate with government investigations and audits
- Report suspected legal violations to the Legal Department
- Maintain required licenses and certifications
- Follow document retention and destruction policies

---

## Reporting Violations & Seeking Guidance

### When to Report
Report suspected violations of this Code of Conduct when you observe:
- Unethical behavior or policy violations
- Illegal activities or regulatory non-compliance
- Harassment, discrimination, or safety concerns
- Conflicts of interest or financial irregularities

### How to Report
**Multiple Reporting Options Available:**
1. **Direct Manager**: Discuss concerns with immediate supervisor
2. **Human Resources**: Contact HR department directly
3. **Ethics Hotline**: 1-800-ETHICS-1 (available 24/7)
4. **Online Portal**: www.techcorp.com/ethics-reporting
5. **Legal Department**: legal@techcorp.com

**Anonymous Reporting:**
- Anonymous reports accepted through hotline and online portal
- Provide as much detail as possible for effective investigation
- Follow-up communication available through secure case numbers

### Investigation Process
1. **Receipt**: All reports acknowledged within 24 hours
2. **Investigation**: Thorough, impartial investigation conducted
3. **Resolution**: Appropriate corrective action taken
4. **Follow-up**: Reporter updated on resolution (when possible)

### Non-Retaliation Policy
TechCorp Solutions prohibits retaliation against employees who:
- Report suspected violations in good faith
- Participate in investigations
- Refuse to engage in illegal or unethical conduct

---

## Consequences of Violations

Violations of this Code of Conduct may result in disciplinary action, including:
- Verbal or written warnings
- Performance improvement plans
- Suspension with or without pay
- Termination of employment
- Legal action and prosecution

The severity of consequences depends on:
- Nature and severity of the violation
- Employee''s position and responsibilities
- Previous disciplinary history
- Cooperation with investigation

---

## Training & Acknowledgment

### Required Training
- All employees must complete Code of Conduct training annually
- New employees complete training within 30 days of hire
- Specialized training for managers and high-risk positions
- Refresher training when policies are updated

### Annual Certification
All employees must annually certify that they:
- Have read and understand the Code of Conduct
- Will comply with all policies and procedures
- Will report suspected violations
- Have disclosed any potential conflicts of interest

---

## Questions & Resources

### Getting Help
If you have questions about this Code of Conduct or need guidance on ethical issues:

- **Ethics & Compliance Office**: ethics@techcorp.com
- **Human Resources**: hr@techcorp.com
- **Legal Department**: legal@techcorp.com
- **Employee Assistance Program**: 1-800-EAP-HELP

### Additional Resources
- Employee Handbook
- Company Policies Portal
- Ethics & Compliance Training Materials
- Industry Best Practices Guidelines

---

**Remember**: When in doubt, ask for guidance. It''s better to seek clarification than to make a mistake that could harm you, your colleagues, or the company.

**Effective Date**: March 1, 2024
**Next Review**: March 1, 2025
**Policy Owner**: Ethics & Compliance Office'
),

-- Information Security Policy
(
    'POL003',
    'Information Security Policy',
    'Data protection, cybersecurity guidelines, and IT usage policies',
    'sap-icon://locked',
    'Pending',
    'v2.8',
    '2024-02-15',
    '2024-12-12',
    1,
    '# TechCorp Solutions Information Security Policy
Version 2.8 | Effective Date: February 15, 2024 | Last Updated: December 12, 2024

## Executive Summary

Information security is fundamental to TechCorp Solutions'' business operations and competitive advantage. This policy establishes the framework for protecting our information assets, customer data, and technology infrastructure from security threats.

---

## Scope & Applicability

This policy applies to:
- All TechCorp Solutions employees, contractors, and temporary staff
- All information systems, networks, and devices owned or operated by the company
- All data processed, stored, or transmitted by company systems
- Third-party vendors and partners with access to company information

---

## Information Classification

### Data Classification Levels

**1. Public Information**
- Marketing materials and public website content
- Published research papers and whitepapers
- General company information available to the public
- **Handling**: No special protection required

**2. Internal Information**
- Internal policies and procedures
- Employee directories and organizational charts
- Internal communications and memos
- **Handling**: Accessible to employees only, not for external sharing

**3. Confidential Information**
- Customer data and business plans
- Financial reports and projections
- Product development information
- **Handling**: Access on need-to-know basis, encryption required

**4. Restricted Information**
- Trade secrets and proprietary algorithms
- Security procedures and vulnerability assessments
- Legal documents and regulatory filings
- **Handling**: Highest level of protection, executive approval required

### Data Handling Requirements

**Labeling & Marking**
- All documents must be clearly labeled with appropriate classification
- Electronic files should include classification in metadata
- Physical documents require classification stamps or labels

**Storage Requirements**
- Public: Standard file systems and cloud storage
- Internal: Company-approved systems with access controls
- Confidential: Encrypted storage with multi-factor authentication
- Restricted: Air-gapped systems with executive-level access controls

**Transmission Security**
- Public: Standard email and communication channels
- Internal: Company email and approved collaboration tools
- Confidential: Encrypted email and secure file transfer
- Restricted: Encrypted channels with end-to-end security

---

## Access Control & Authentication

### User Access Management

**Account Provisioning**
- New user accounts created only with proper authorization
- Access rights based on job role and business need
- Regular access reviews conducted quarterly
- Immediate account deactivation upon termination

**Password Requirements**
- Minimum 12 characters with complexity requirements
- Unique passwords for each system and account
- Password changes required every 90 days
- No sharing of passwords or credentials

**Multi-Factor Authentication (MFA)**
- Required for all business-critical systems
- Mandatory for remote access and cloud services
- Hardware tokens provided for high-privilege accounts
- Regular MFA device updates and replacements

### Privileged Access Management

**Administrative Accounts**
- Separate administrative accounts for IT staff
- Elevated privileges granted only when necessary
- All administrative activities logged and monitored
- Regular review of privileged access rights

**System Access Controls**
- Role-based access control (RBAC) implementation
- Principle of least privilege enforced
- Regular access certification by data owners
- Automated access provisioning and deprovisioning

---

## Network & Infrastructure Security

### Network Architecture

**Network Segmentation**
- Separate networks for different security zones
- DMZ for public-facing services
- Internal network isolation by department
- Guest network for visitors and contractors

**Firewall Management**
- Next-generation firewalls with intrusion prevention
- Regular firewall rule reviews and updates
- Logging and monitoring of all network traffic
- Automated threat detection and response

**Wireless Security**
- WPA3 encryption for all wireless networks
- Regular security assessments of wireless infrastructure
- Guest network isolation from corporate resources
- Mobile device management (MDM) for company devices

### Endpoint Security

**Antivirus & Anti-Malware**
- Enterprise-grade antivirus on all endpoints
- Real-time scanning and automatic updates
- Centralized management and reporting
- Regular security scans and remediation

**Device Management**
- Company-owned devices enrolled in MDM system
- Encryption required for all laptops and mobile devices
- Remote wipe capability for lost or stolen devices
- Regular security patches and updates

**BYOD (Bring Your Own Device)**
- Approved BYOD policy with security requirements
- Containerization of business data on personal devices
- Regular security assessments of BYOD devices
- User agreement and compliance monitoring

---

## Data Protection & Privacy

### Data Privacy Compliance

**Regulatory Compliance**
- GDPR compliance for European customer data
- CCPA compliance for California residents
- HIPAA compliance for healthcare-related data
- SOX compliance for financial reporting data

**Privacy by Design**
- Privacy considerations in all system designs
- Data minimization and purpose limitation
- Regular privacy impact assessments
- User consent management and tracking

**Data Subject Rights**
- Processes for handling data access requests
- Data portability and deletion procedures
- Breach notification within 72 hours
- Privacy officer designated for compliance oversight

### Data Loss Prevention (DLP)

**DLP Controls**
- Automated scanning of outbound communications
- Content inspection and classification
- Policy enforcement for sensitive data
- User education and awareness programs

**Data Backup & Recovery**
- Regular automated backups of critical data
- Offsite backup storage with encryption
- Disaster recovery testing quarterly
- Recovery time objectives (RTO) and recovery point objectives (RPO) defined

---

## Incident Response & Management

### Security Incident Response

**Incident Classification**
- **Low**: Minor policy violations or system anomalies
- **Medium**: Potential security breaches or data exposure
- **High**: Confirmed breaches or system compromises
- **Critical**: Major breaches affecting customer data or business operations

**Response Procedures**
1. **Detection**: Automated monitoring and user reporting
2. **Assessment**: Initial triage and impact analysis
3. **Containment**: Immediate actions to limit damage
4. **Investigation**: Forensic analysis and root cause determination
5. **Recovery**: System restoration and security improvements
6. **Lessons Learned**: Post-incident review and policy updates

**Communication Plan**
- Internal notification procedures for different incident types
- External communication requirements for customers and regulators
- Media relations and public communications
- Legal and regulatory notification timelines

### Business Continuity

**Continuity Planning**
- Business impact analysis for critical systems
- Recovery strategies for different disaster scenarios
- Alternative work arrangements and remote access
- Regular testing and plan updates

**Crisis Management**
- Crisis management team with defined roles
- Communication protocols during emergencies
- Coordination with external agencies and vendors
- Regular crisis simulation exercises

---

## Security Awareness & Training

### Employee Training Program

**Security Awareness Training**
- Annual mandatory training for all employees
- Role-specific training for IT and security staff
- New employee security orientation
- Regular security updates and communications

**Phishing & Social Engineering**
- Simulated phishing campaigns quarterly
- Social engineering awareness training
- Reporting procedures for suspicious communications
- Recognition and rewards for security-conscious behavior

**Incident Reporting Training**
- How to recognize and report security incidents
- Escalation procedures and contact information
- No-blame culture for good-faith reporting
- Regular refresher training and updates

### Security Culture

**Leadership Commitment**
- Executive sponsorship of security initiatives
- Security metrics reported to board of directors
- Security considerations in business decisions
- Investment in security tools and resources

**Employee Engagement**
- Security champions program in each department
- Regular security newsletters and communications
- Security suggestion box and feedback mechanisms
- Recognition programs for security contributions

---

## Vendor & Third-Party Security

### Vendor Risk Management

**Due Diligence Process**
- Security assessments for all new vendors
- Contractual security requirements and SLAs
- Regular vendor security reviews and audits
- Vendor access controls and monitoring

**Data Sharing Agreements**
- Clear data handling and protection requirements
- Liability and indemnification clauses
- Breach notification and response procedures
- Right to audit and inspect vendor security controls

### Cloud Security

**Cloud Service Providers**
- Security assessment of cloud providers
- Shared responsibility model understanding
- Data encryption in transit and at rest
- Regular security monitoring and compliance checks

**Cloud Configuration Management**
- Secure configuration baselines for cloud services
- Regular configuration reviews and updates
- Automated compliance monitoring
- Identity and access management in cloud environments

---

## Compliance & Audit

### Regulatory Compliance

**Compliance Framework**
- Regular compliance assessments and gap analyses
- Remediation plans for compliance deficiencies
- Documentation and evidence collection
- Regulatory reporting and communications

**Industry Standards**
- ISO 27001 information security management
- NIST Cybersecurity Framework implementation
- SOC 2 Type II compliance for service organizations
- Industry-specific security standards compliance

### Internal Audit

**Security Audits**
- Annual comprehensive security audits
- Quarterly focused audits on high-risk areas
- Penetration testing and vulnerability assessments
- Audit findings tracking and remediation

**Metrics & Reporting**
- Key security metrics and KPIs
- Regular security dashboard reporting
- Executive and board-level security briefings
- Trend analysis and continuous improvement

---

## Policy Enforcement & Violations

### Enforcement Procedures

**Monitoring & Detection**
- Automated security monitoring and alerting
- User activity monitoring and analysis
- Regular policy compliance assessments
- Whistleblower and anonymous reporting mechanisms

**Investigation Process**
- Prompt investigation of suspected violations
- Preservation of evidence and documentation
- Coordination with legal and HR departments
- Fair and consistent investigation procedures

### Disciplinary Actions

**Progressive Discipline**
- Verbal warnings for minor violations
- Written warnings for repeated or moderate violations
- Suspension for serious violations
- Termination for severe or repeated violations

**Factors Considered**
- Severity and impact of the violation
- Intent and circumstances of the violation
- Employee''s disciplinary history
- Cooperation with investigation and remediation efforts

---

## Contact Information & Resources

### Security Team Contacts
- **Chief Information Security Officer**: ciso@techcorp.com
- **Security Operations Center**: soc@techcorp.com (24/7)
- **Incident Response Hotline**: 1-800-SEC-HELP
- **Security Awareness Team**: security-training@techcorp.com

### Emergency Contacts
- **Security Incidents**: security-incident@techcorp.com
- **Data Breach Response**: breach-response@techcorp.com
- **Business Continuity**: bcp@techcorp.com
- **Legal Department**: legal@techcorp.com

### Additional Resources
- Security Policies and Procedures Portal
- Security Awareness Training Materials
- Incident Response Playbooks
- Vendor Security Assessment Templates

---

**Policy Approval**: Chief Information Security Officer
**Effective Date**: February 15, 2024
**Next Review**: February 15, 2025
**Document Classification**: Internal'
),

-- Remote Work Policy
(
    'POL004',
    'Remote Work Policy',
    'Guidelines for remote work arrangements, equipment, and productivity expectations',
    'sap-icon://home',
    'Acknowledged',
    'v2.5',
    '2024-04-01',
    '2024-11-20',
    1,
    '# TechCorp Solutions Remote Work Policy
Version 2.5 | Effective Date: April 1, 2024 | Last Updated: November 20, 2024

## Policy Overview

TechCorp Solutions recognizes that remote work arrangements can benefit both employees and the organization by increasing flexibility, productivity, and job satisfaction while reducing commuting time and office space requirements.

---

## Eligibility & Approval Process

### Eligible Positions
Remote work is available for positions that:
- Can be performed effectively without regular in-person collaboration
- Do not require access to specialized on-site equipment
- Have measurable performance outcomes
- Allow for effective communication with team members and customers

### Approval Process
1. **Employee Request**: Submit formal remote work request to direct manager
2. **Manager Review**: Assessment of role suitability and performance history
3. **HR Approval**: Review of policy compliance and documentation
4. **Trial Period**: 90-day trial period with regular check-ins
5. **Permanent Approval**: Based on successful trial period performance

### Types of Remote Work Arrangements

**Full-Time Remote**
- Employee works from home or approved location 100% of time
- Occasional office visits for meetings or team events
- Suitable for roles with minimal in-person requirements

**Hybrid Schedule**
- Combination of office and remote work days
- Minimum 2 days per week in office (unless otherwise approved)
- Flexible scheduling based on business needs and team requirements

**Temporary Remote Work**
- Short-term remote work for specific circumstances
- Medical reasons, family emergencies, or business travel
- Approval for up to 30 days without formal remote work agreement

---

## Home Office Requirements

### Workspace Setup
**Physical Environment**
- Dedicated workspace separate from personal living areas
- Adequate lighting and ventilation
- Ergonomic furniture and equipment setup
- Professional background for video calls

**Technology Requirements**
- Reliable high-speed internet connection (minimum 25 Mbps download/5 Mbps upload)
- Backup internet connection (mobile hotspot or alternative provider)
- Quiet environment suitable for phone calls and video conferences
- Adequate electrical outlets and surge protection

### Equipment & Technology

**Company-Provided Equipment**
- Laptop or desktop computer with necessary software
- Monitor, keyboard, and mouse
- Headset for calls and video conferences
- Mobile phone for business use (if applicable)

**Home Office Allowance**
- One-time setup allowance of $750 for new remote employees
- Annual allowance of $300 for office supplies and equipment maintenance
- Reimbursement for internet costs up to $75 per month
- Ergonomic equipment reimbursement up to $500 annually

**Security Requirements**
- VPN connection for all business activities
- Encrypted storage for confidential information
- Secure Wi-Fi network with WPA3 encryption
- Physical security measures to protect equipment and data

---

## Work Schedule & Availability

### Core Business Hours
- Available during core collaboration hours: 10:00 AM - 3:00 PM (local time)
- Flexible start and end times within approved parameters
- Advance notice required for schedule changes
- Participation in scheduled meetings and team activities

### Communication Expectations
**Response Times**
- Email: Within 4 hours during business hours
- Slack/Teams: Within 1 hour during core hours
- Phone calls: Answer or return within 2 hours
- Video conferences: Join on time and be prepared

**Communication Tools**
- Primary: Company email and Slack/Teams
- Video conferencing: Zoom or Microsoft Teams
- Project management: Approved collaboration tools
- Document sharing: Company-approved cloud platforms

### Meeting Participation
- Camera on for video meetings (unless technical issues)
- Professional appearance and background
- Mute when not speaking to reduce background noise
- Active participation and engagement in discussions

---

## Performance & Productivity

### Performance Standards
Remote employees are held to the same performance standards as office-based employees:
- Achievement of individual and team goals
- Quality of work output and deliverables
- Meeting deadlines and project milestones
- Professional communication and collaboration

### Productivity Monitoring
**Performance Metrics**
- Goal achievement and KPI performance
- Project completion rates and quality
- Customer satisfaction scores
- Team collaboration effectiveness

**Regular Check-ins**
- Weekly one-on-one meetings with direct manager
- Monthly team meetings and updates
- Quarterly performance reviews
- Annual goal setting and career development discussions

### Time Management
**Work Hours Tracking**
- Accurate time reporting in company systems
- Clear distinction between work and personal time
- Breaks and lunch periods as per company policy
- Overtime approval required in advance

**Productivity Tools**
- Use of approved project management and time tracking tools
- Regular status updates and progress reports
- Documentation of work activities and accomplishments
- Participation in team planning and coordination activities

---

## Health, Safety & Well-being

### Ergonomics & Safety
**Workspace Ergonomics**
- Proper desk and chair height adjustment
- Monitor at eye level to prevent neck strain
- Keyboard and mouse positioning for comfort
- Regular breaks and stretching exercises

**Safety Considerations**
- Safe electrical connections and equipment setup
- Adequate lighting to prevent eye strain
- Emergency contact information readily available
- First aid kit and emergency procedures

### Work-Life Balance
**Boundary Setting**
- Clear separation between work and personal time
- Designated work hours and availability windows
- Respect for personal time and family commitments
- Encouragement of breaks and time off

**Mental Health Support**
- Access to Employee Assistance Program (EAP)
- Mental health resources and counseling services
- Stress management and wellness programs
- Regular check-ins on well-being and job satisfaction

---

## Security & Confidentiality

### Information Security
**Data Protection**
- All company data must be stored on company-approved systems
- No storage of confidential information on personal devices
- Regular backup of work files to company servers
- Secure disposal of printed materials containing sensitive information

**Access Controls**
- VPN required for all business system access
- Multi-factor authentication for all accounts
- Regular password updates and security training
- Immediate reporting of security incidents or concerns

**Confidentiality**
- Maintain confidentiality of company and customer information
- Secure workspace to prevent unauthorized access to information
- Professional discretion in home environment during business calls
- Compliance with all company confidentiality and non-disclosure agreements

### Compliance Requirements
**Policy Compliance**
- Adherence to all company policies and procedures
- Participation in required training and certification programs
- Regular security assessments and updates
- Cooperation with audits and compliance reviews

---

## Professional Development

### Training & Development
**Remote Learning Opportunities**
- Online training courses and certifications
- Virtual conferences and webinars
- Internal training programs and lunch-and-learns
- Mentorship and coaching programs

**Career Advancement**
- Equal consideration for promotions and new opportunities
- Regular career development discussions
- Cross-functional project participation
- Leadership development programs

### Networking & Collaboration
**Team Building**
- Virtual team building activities and social events
- Quarterly in-person team meetings (when possible)
- Cross-departmental collaboration projects
- Company-wide events and celebrations

**Professional Networks**
- Participation in industry associations and groups
- Conference attendance and professional development events
- Internal employee resource groups and committees
- Mentoring and knowledge sharing opportunities

---

## Travel & Office Visits

### Business Travel
- Same travel policies apply to remote employees
- Advance approval required for business travel
- Expense reimbursement per company travel policy
- Safety and security protocols for travel

### Office Visits
**Required Visits**
- Quarterly team meetings and planning sessions
- Annual company meetings and events
- Training sessions requiring in-person attendance
- Customer meetings and presentations (as needed)

**Voluntary Visits**
- Access to office space when needed
- Advance notice for desk/meeting room reservations
- Parking and facility access arrangements
- Coordination with local team members

---

## Policy Violations & Corrective Actions

### Common Violations
- Failure to maintain professional workspace
- Inadequate communication or availability
- Security breaches or policy non-compliance
- Performance issues or missed deadlines

### Corrective Actions
**Progressive Discipline**
1. Verbal coaching and guidance
2. Written warning and improvement plan
3. Temporary return to office requirement
4. Termination of remote work privileges
5. Employment termination (for serious violations)

### Appeal Process
- Right to appeal remote work decisions
- Review by HR and senior management
- Consideration of extenuating circumstances
- Fair and consistent application of policies

---

## Resources & Support

### Technical Support
- **IT Help Desk**: support@techcorp.com | 1-800-TECH-HELP
- **VPN Support**: vpn-support@techcorp.com
- **Equipment Issues**: equipment@techcorp.com
- **Security Concerns**: security@techcorp.com

### HR Support
- **Remote Work Questions**: remote-work@techcorp.com
- **Policy Clarifications**: hr-policy@techcorp.com
- **Performance Issues**: performance@techcorp.com
- **Employee Relations**: employee-relations@techcorp.com

### Manager Resources
- Remote Management Training Materials
- Performance Management Guidelines
- Communication Best Practices
- Team Building Activity Ideas

---

**Policy Owner**: Human Resources Department
**Approved By**: Chief Human Resources Officer
**Effective Date**: April 1, 2024
**Next Review**: April 1, 2025'
),

-- Professional Development Policy
(
    'POL005',
    'Professional Development Policy',
    'Training opportunities, career advancement, and continuous learning programs',
    'sap-icon://learning-assistant',
    'Pending',
    'v1.9',
    '2024-05-15',
    '2024-12-01',
    1,
    '# TechCorp Solutions Professional Development Policy
Version 1.9 | Effective Date: May 15, 2024 | Last Updated: December 1, 2024

## Our Commitment to Employee Growth

TechCorp Solutions believes that investing in employee development is essential for both individual success and organizational excellence. This policy outlines our comprehensive approach to professional development, training, and career advancement.

---

## Professional Development Framework

### Core Principles
- **Continuous Learning**: Encourage lifelong learning and skill development
- **Career Growth**: Support advancement opportunities within the organization
- **Innovation**: Foster creativity and innovative thinking
- **Knowledge Sharing**: Promote collaboration and knowledge transfer
- **Performance Excellence**: Align development with business objectives

### Development Categories

**Technical Skills Development**
- Programming languages and frameworks
- Cloud computing and infrastructure
- Data analysis and machine learning
- Cybersecurity and compliance
- Project management methodologies

**Leadership & Management Skills**
- Team leadership and motivation
- Strategic thinking and planning
- Communication and presentation skills
- Conflict resolution and negotiation
- Change management and adaptability

**Professional Skills**
- Industry certifications and credentials
- Business acumen and financial literacy
- Customer service and relationship management
- Process improvement and efficiency
- Cross-functional collaboration

---

## Training & Development Programs

### Internal Training Programs

**New Employee Orientation**
- Comprehensive 2-week onboarding program
- Company culture and values training
- Role-specific technical training
- Mentorship program assignment
- 90-day integration checkpoints

**Ongoing Skills Development**
- Monthly lunch-and-learn sessions
- Technical workshops and seminars
- Leadership development programs
- Cross-training opportunities
- Innovation challenges and hackathons

**Leadership Development Track**
- High-potential employee identification
- Executive coaching and mentoring
- 360-degree feedback assessments
- Strategic project assignments
- Board presentation opportunities

### External Training Opportunities

**Conference Attendance**
- Annual training budget: $3,000 per employee
- Industry conferences and trade shows
- Professional association events
- Networking opportunities
- Knowledge sharing requirements upon return

**Certification Programs**
- Company-sponsored professional certifications
- Exam fees and preparation materials covered
- Study time allocation during work hours
- Certification maintenance support
- Recognition and compensation adjustments

**Educational Partnerships**
- Tuition reimbursement up to $5,000 annually
- Partnerships with local universities
- Online degree and certificate programs
- Flexible scheduling for class attendance
- Academic achievement recognition

---

## Career Development Planning

### Individual Development Plans (IDPs)

**Annual Planning Process**
- Self-assessment of skills and interests
- Manager feedback and performance review
- Career goal setting and pathway planning
- Development activity selection
- Progress tracking and regular updates

**IDP Components**
- Current role competency assessment
- Short-term and long-term career goals
- Skill gaps and development priorities
- Specific learning objectives and timelines
- Success metrics and evaluation criteria

### Career Pathways

**Technical Career Track**
- Individual Contributor → Senior Specialist → Principal → Distinguished Engineer
- Specialized expertise development
- Technical leadership opportunities
- Innovation and research projects
- Industry recognition and thought leadership

**Management Career Track**
- Team Lead → Manager → Senior Manager → Director → VP
- People management and leadership skills
- Strategic planning and execution
- Budget and resource management
- Organizational development responsibilities

**Cross-Functional Opportunities**
- Lateral moves between departments
- Project-based assignments
- Temporary rotations and secondments
- International assignment opportunities
- Entrepreneurial and innovation roles

---

## Mentorship & Coaching Programs

### Formal Mentorship Program

**Mentor-Mentee Matching**
- Skills-based and career goal alignment
- Cross-departmental pairing opportunities
- Senior leader involvement and commitment
- Structured program with defined objectives
- Regular program evaluation and improvement

**Program Structure**
- 12-month mentorship commitments
- Monthly one-on-one meetings
- Quarterly group sessions and networking
- Goal setting and progress tracking
- Program completion recognition

### Executive Coaching

**Coaching Eligibility**
- High-potential employees and leaders
- New managers and executives
- Performance improvement situations
- Career transition support
- Leadership development participants

**Coaching Process**
- Professional coach selection and matching
- Confidential coaching relationship
- Goal-oriented coaching plans
- Regular progress assessments
- Integration with performance management

---

## Learning & Development Resources

### Learning Management System (LMS)

**Online Learning Platform**
- Comprehensive course catalog
- Self-paced and instructor-led options
- Mobile learning capabilities
- Progress tracking and reporting
- Social learning and collaboration features

**Content Library**
- Technical training modules
- Leadership and soft skills courses
- Compliance and regulatory training
- Industry-specific content
- Custom company content

### Knowledge Management

**Internal Knowledge Base**
- Best practices documentation
- Process and procedure guides
- Technical documentation and wikis
- Lessons learned repositories
- Expert directories and contact information

**Communities of Practice**
- Technical interest groups
- Professional development circles
- Innovation and research teams
- Cross-functional working groups
- External professional associations

---

## Performance & Development Integration

### Performance Review Process

**Development Focus**
- Performance evaluation includes development planning
- Competency-based assessments
- 360-degree feedback incorporation
- Career aspiration discussions
- Development goal setting and tracking

**Calibration & Fairness**
- Consistent evaluation standards
- Manager training on development planning
- HR oversight and guidance
- Bias awareness and mitigation
- Equal opportunity considerations

### Recognition & Rewards

**Development Achievement Recognition**
- Certification completion awards
- Conference presentation opportunities
- Internal recognition programs
- Career advancement celebrations
- Peer nomination and recognition

**Compensation Alignment**
- Skill-based pay adjustments
- Certification bonuses and premiums
- Performance-based salary increases
- Promotion and advancement opportunities
- Long-term incentive programs

---

## Budget & Resource Allocation

### Development Budget Framework

**Individual Allocations**
- Annual training budget per employee: $3,000
- Additional budget for high-potential employees: $2,000
- Leadership development program budget: $5,000
- Conference and travel budget: varies by role
- Tuition reimbursement: $5,000 annually

**Department Budgets**
- Team training and development initiatives
- Department-specific skill development
- Cross-functional collaboration programs
- Innovation and research projects
- External consultant and trainer fees

### Resource Management

**Budget Approval Process**
- Manager approval for individual requests
- Department head approval for team initiatives
- HR approval for policy compliance
- Finance approval for budget allocation
- Executive approval for major investments

**ROI Measurement**
- Training effectiveness evaluation
- Performance improvement tracking
- Employee engagement and retention metrics
- Business impact assessment
- Cost-benefit analysis reporting

---

## Policy Implementation & Support

### Roles & Responsibilities

**Employees**
- Active participation in development planning
- Commitment to learning and growth
- Knowledge sharing and mentoring others
- Application of new skills and knowledge
- Feedback and program improvement suggestions

**Managers**
- Development planning and coaching
- Resource allocation and support
- Performance feedback and guidance
- Career opportunity identification
- Program participation and modeling

**HR Department**
- Policy development and maintenance
- Program design and implementation
- Vendor management and partnerships
- Budget oversight and reporting
- Compliance and quality assurance

### Support Resources

**Development Team Contacts**
- **Learning & Development**: learning@techcorp.com
- **Career Counseling**: careers@techcorp.com
- **Mentorship Program**: mentorship@techcorp.com
- **Leadership Development**: leadership@techcorp.com

**External Resources**
- Professional association memberships
- Industry training providers
- University partnerships
- Certification bodies
- Conference and event organizers

---

**Policy Owner**: Learning & Development Department
**Approved By**: Chief Human Resources Officer
**Effective Date**: May 15, 2024
**Next Review**: May 15, 2025'
),

-- Workplace Safety Policy
(
    'POL006',
    'Workplace Safety Policy',
    'Health and safety protocols, emergency procedures, and incident reporting',
    'sap-icon://warning',
    'Pending',
    'v3.1',
    '2024-06-01',
    '2024-12-05',
    1,
    '# TechCorp Solutions Workplace Safety Policy
Version 3.1 | Effective Date: June 1, 2024 | Last Updated: December 5, 2024

## Safety Commitment Statement

The health and safety of our employees, contractors, and visitors is TechCorp Solutions'' highest priority. We are committed to providing a safe and healthy work environment through comprehensive safety programs, training, and continuous improvement initiatives.

---

## General Safety Principles

### Zero Harm Philosophy
- No task is so urgent that it cannot be done safely
- Every employee has the right to a safe workplace
- Every employee has the responsibility to work safely
- All accidents and incidents are preventable
- Safety is everyone''s responsibility

### Safety Culture
- Open communication about safety concerns
- Continuous learning and improvement
- Proactive hazard identification and mitigation
- Employee participation in safety programs
- Leadership commitment and accountability

---

## Emergency Procedures

### Fire Emergency Response

**Fire Prevention**
- Regular inspection of electrical equipment
- Proper storage of flammable materials
- Maintenance of fire suppression systems
- Clear evacuation routes and exits
- Employee fire safety training

**Fire Emergency Actions**
1. **Discover Fire**: Activate nearest fire alarm
2. **Alert Others**: Warn nearby personnel
3. **Evacuate**: Use nearest safe exit route
4. **Assemble**: Meet at designated assembly point
5. **Report**: Provide information to emergency responders

**Evacuation Procedures**
- Remain calm and move quickly but safely
- Use stairs, never elevators during fire emergency
- Assist individuals with disabilities
- Close doors behind you to slow fire spread
- Do not re-enter building until authorized

### Medical Emergency Response

**Medical Emergency Actions**
1. **Assess Situation**: Ensure scene safety
2. **Call for Help**: Dial 911 for serious injuries
3. **Provide First Aid**: If trained and safe to do so
4. **Notify Management**: Report incident immediately
5. **Document**: Complete incident report

**First Aid Resources**
- First aid kits located on each floor
- AED (Automated External Defibrillator) devices available
- Trained first aid responders identified
- Emergency contact information posted
- Medical emergency procedures displayed

### Severe Weather Procedures

**Tornado/Severe Storm Response**
- Monitor weather alerts and warnings
- Move to designated shelter areas
- Stay away from windows and glass
- Remain in shelter until all-clear given
- Report any damage or injuries

**Earthquake Response**
- Drop, Cover, and Hold On during shaking
- Stay under desk or table if possible
- Evacuate building after shaking stops
- Use stairs, avoid elevators
- Check for injuries and hazards

---

## Workplace Hazard Management

### Hazard Identification

**Common Workplace Hazards**
- Slips, trips, and falls
- Ergonomic risks from computer work
- Electrical hazards and equipment
- Chemical exposure from cleaning products
- Violence and security threats

**Hazard Reporting**
- Immediate reporting of unsafe conditions
- Anonymous reporting options available
- Regular safety inspections and audits
- Employee safety suggestion program
- Prompt corrective action implementation

### Risk Assessment Process

**Risk Evaluation Criteria**
- Likelihood of occurrence
- Severity of potential consequences
- Number of people at risk
- Frequency of exposure
- Existing control measures

**Control Hierarchy**
1. **Elimination**: Remove the hazard completely
2. **Substitution**: Replace with less hazardous alternative
3. **Engineering Controls**: Physical safeguards and barriers
4. **Administrative Controls**: Policies, procedures, and training
5. **Personal Protective Equipment**: Last line of defense

---

## Ergonomics & Computer Safety

### Workstation Setup

**Proper Ergonomics**
- Monitor at eye level, arm''s length away
- Keyboard and mouse at elbow height
- Feet flat on floor or footrest
- Back supported by chair
- Adequate lighting to prevent glare

**Equipment Adjustments**
- Adjustable chairs and desks available
- Monitor arms and laptop stands provided
- Ergonomic keyboards and mice available
- Document holders and phone headsets
- Regular workstation assessments offered

### Computer Vision Syndrome Prevention

**Eye Strain Prevention**
- Follow 20-20-20 rule (every 20 minutes, look at something 20 feet away for 20 seconds)
- Adjust screen brightness and contrast
- Position screen to minimize glare
- Blink frequently to keep eyes moist
- Take regular breaks from screen work

**Repetitive Strain Injury Prevention**
- Take frequent micro-breaks
- Vary tasks and positions throughout day
- Use proper typing and mouse techniques
- Stretch and exercise regularly
- Report early symptoms of discomfort

---

## Chemical & Environmental Safety

### Chemical Safety Program

**Hazardous Materials Management**
- Safety Data Sheets (SDS) readily available
- Proper labeling of all chemicals
- Appropriate storage and handling procedures
- Personal protective equipment provided
- Spill response procedures established

**Common Office Chemicals**
- Cleaning products and disinfectants
- Printer toners and inks
- Maintenance and repair chemicals
- Laboratory chemicals (if applicable)
- Pest control products

### Indoor Air Quality

**Air Quality Monitoring**
- Regular HVAC system maintenance
- Air quality testing and monitoring
- Mold and moisture control
- Ventilation system optimization
- Employee comfort surveys

**Pollution Prevention**
- Smoke-free workplace policy
- Proper ventilation for equipment
- Control of dust and particulates
- Management of odors and fumes
- Green cleaning product usage

---

## Security & Violence Prevention

### Workplace Violence Prevention

**Violence Prevention Program**
- Zero tolerance for workplace violence
- Threat assessment and management procedures
- Employee training on warning signs
- Reporting mechanisms for concerns
- Coordination with law enforcement

**Security Measures**
- Access control systems and badges
- Security cameras in common areas
- Visitor management procedures
- Emergency communication systems
- Security personnel and patrols

### Personal Safety

**General Safety Practices**
- Be aware of surroundings at all times
- Report suspicious activities or individuals
- Keep personal belongings secure
- Use buddy system for late work or parking
- Follow established security procedures

**Travel Safety**
- Business travel safety guidelines
- Emergency contact information
- Travel insurance and assistance programs
- Security briefings for high-risk destinations
- Regular check-ins during travel

---

## Incident Reporting & Investigation

### Incident Reporting Requirements

**Reportable Incidents**
- All injuries, regardless of severity
- Near-miss events and close calls
- Property damage incidents
- Security breaches or threats
- Environmental releases or spills

**Reporting Process**
1. **Immediate Care**: Provide first aid and medical attention
2. **Secure Scene**: Prevent further incidents
3. **Report Incident**: Notify supervisor and safety team
4. **Document**: Complete incident report within 24 hours
5. **Investigate**: Participate in investigation process

### Investigation Process

**Investigation Objectives**
- Determine root causes of incident
- Identify corrective actions needed
- Prevent similar incidents in future
- Comply with regulatory requirements
- Share lessons learned organization-wide

**Investigation Team**
- Safety professional or trained investigator
- Supervisor or manager
- Employee representative
- Subject matter experts as needed
- HR representative for serious incidents

---

## Training & Competency

### Safety Training Program

**New Employee Safety Orientation**
- General safety policies and procedures
- Emergency response procedures
- Job-specific safety training
- Personal protective equipment use
- Incident reporting requirements

**Ongoing Safety Training**
- Annual safety refresher training
- Job-specific safety updates
- Emergency drill participation
- Safety meeting attendance
- Specialized training for high-risk activities

### Training Records & Competency

**Documentation Requirements**
- Training attendance records
- Competency assessments
- Certification tracking
- Refresher training schedules
- Individual training plans

**Competency Verification**
- Practical demonstrations
- Written assessments
- On-the-job observations
- Peer evaluations
- Supervisor sign-offs

---

## Regulatory Compliance

### OSHA Compliance

**Regulatory Requirements**
- Compliance with all applicable OSHA standards
- Workplace injury and illness recordkeeping
- Employee right-to-know training
- Hazard communication program
- Regular safety inspections and audits

**Record Keeping**
- OSHA 300 Log maintenance
- Injury and illness reporting
- Training documentation
- Safety inspection records
- Corrective action tracking

### Other Regulatory Compliance

**Environmental Regulations**
- Waste management and disposal
- Air quality monitoring
- Water discharge permits
- Chemical storage requirements
- Environmental impact assessments

**Building and Fire Codes**
- Fire safety system maintenance
- Building occupancy limits
- Exit route requirements
- Accessibility compliance
- Regular code inspections

---

## Contractor & Visitor Safety

### Contractor Safety Management

**Pre-Qualification Requirements**
- Safety program evaluation
- Insurance verification
- Training documentation
- Past safety performance review
- Competency assessments

**On-Site Requirements**
- Safety orientation before work begins
- Compliance with company safety rules
- Regular safety monitoring
- Incident reporting procedures
- Corrective action requirements

### Visitor Safety

**Visitor Management**
- Check-in procedures and badges
- Safety briefing for extended visits
- Escort requirements in work areas
- Emergency evacuation procedures
- Incident reporting for visitor injuries

---

## Contact Information & Resources

### Emergency Contacts
- **Emergency Services**: 911
- **Security**: 1-800-SECURITY
- **Facilities Management**: facilities@techcorp.com
- **Safety Department**: safety@techcorp.com

### Safety Team Contacts
- **Safety Director**: safety-director@techcorp.com
- **Occupational Health Nurse**: health@techcorp.com
- **Emergency Coordinator**: emergency@techcorp.com
- **Environmental Specialist**: environmental@techcorp.com

### Additional Resources
- Safety policies and procedures portal
- Emergency response procedures
- Safety training materials
- Incident reporting system
- Safety suggestion program

---

**Policy Owner**: Safety & Risk Management Department
**Approved By**: Chief Operations Officer
**Effective Date**: June 1, 2024
**Next Review**: June 1, 2025'
);

-- Insert sample acknowledgment history
INSERT OR REPLACE INTO policy_acknowledgments (
    policy_id, employee_id, acknowledged_date, policy_version
) VALUES
('POL001', 'EMP001', '2024-12-15', 'v4.1'),
('POL002', 'EMP001', '2024-12-10', 'v3.0'),
('POL004', 'EMP001', '2024-11-25', 'v2.5'),
('POL001', 'EMP002', '2024-12-12', 'v4.1'),
('POL002', 'EMP002', '2024-12-08', 'v3.0'),
('POL003', 'EMP003', '2024-12-01', 'v2.8'),
('POL004', 'EMP003', '2024-11-20', 'v2.5'),
('POL001', 'EMP004', '2024-12-14', 'v4.1');

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
