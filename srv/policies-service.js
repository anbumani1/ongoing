const sqlite3 = require('sqlite3').verbose();
const path = require('path');

/**
 * Policies Service - SQLite Database Integration
 * Provides API endpoints for company policies management
 */
class PoliciesService {
    constructor() {
        this.dbPath = path.join(__dirname, '..', 'db', 'policies.db');
        this.db = null;
        this.init();
    }

    init() {
        console.log('🗄️  Initializing Policies Service...');
        console.log('📍 Database path:', this.dbPath);
        
        this.db = new sqlite3.Database(this.dbPath, (err) => {
            if (err) {
                console.error('❌ Error connecting to SQLite database:', err.message);
            } else {
                console.log('✅ Connected to SQLite policies database');
            }
        });
    }

    /**
     * Get all policies with their acknowledgment status for a specific employee
     */
    async getPolicies(employeeId = 'EMP001') {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    p.*,
                    CASE 
                        WHEN pa.acknowledged_date IS NOT NULL THEN 'Acknowledged'
                        ELSE p.status
                    END as current_status,
                    pa.acknowledged_date,
                    pa.policy_version as acknowledged_version
                FROM company_policies p
                LEFT JOIN policy_acknowledgments pa ON p.id = pa.policy_id AND pa.employee_id = ?
                ORDER BY p.effective_date DESC
            `;

            this.db.all(query, [employeeId], (err, rows) => {
                if (err) {
                    console.error('❌ Error fetching policies:', err.message);
                    reject(err);
                } else {
                    console.log(`📋 Retrieved ${rows.length} policies for employee ${employeeId}`);
                    resolve(rows);
                }
            });
        });
    }

    /**
     * Get a specific policy by ID
     */
    async getPolicy(policyId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM company_policies WHERE id = ?';
            
            this.db.get(query, [policyId], (err, row) => {
                if (err) {
                    console.error('❌ Error fetching policy:', err.message);
                    reject(err);
                } else if (!row) {
                    reject(new Error(`Policy ${policyId} not found`));
                } else {
                    console.log(`📄 Retrieved policy: ${row.title}`);
                    resolve(row);
                }
            });
        });
    }

    /**
     * Acknowledge a policy for an employee
     */
    async acknowledgePolicy(policyId, employeeId = 'EMP001', policyVersion) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT OR REPLACE INTO policy_acknowledgments 
                (policy_id, employee_id, acknowledged_date, policy_version)
                VALUES (?, ?, date('now'), ?)
            `;

            this.db.run(query, [policyId, employeeId, policyVersion], function(err) {
                if (err) {
                    console.error('❌ Error acknowledging policy:', err.message);
                    reject(err);
                } else {
                    console.log(`✅ Policy ${policyId} acknowledged by ${employeeId}`);
                    resolve({ 
                        success: true, 
                        policyId, 
                        employeeId, 
                        acknowledgedDate: new Date().toISOString().split('T')[0]
                    });
                }
            });
        });
    }

    /**
     * Get acknowledgment history for an employee
     */
    async getAcknowledgmentHistory(employeeId = 'EMP001') {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    pa.*,
                    p.title as policy_title
                FROM policy_acknowledgments pa
                JOIN company_policies p ON pa.policy_id = p.id
                WHERE pa.employee_id = ?
                ORDER BY pa.acknowledged_date DESC
            `;

            this.db.all(query, [employeeId], (err, rows) => {
                if (err) {
                    console.error('❌ Error fetching acknowledgment history:', err.message);
                    reject(err);
                } else {
                    console.log(`📊 Retrieved ${rows.length} acknowledgments for employee ${employeeId}`);
                    resolve(rows);
                }
            });
        });
    }

    /**
     * Update policy last accessed timestamp
     */
    async updateLastAccessed(policyId) {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE company_policies 
                SET updated_at = datetime('now')
                WHERE id = ?
            `;

            this.db.run(query, [policyId], function(err) {
                if (err) {
                    console.error('❌ Error updating last accessed:', err.message);
                    reject(err);
                } else {
                    console.log(`📅 Updated last accessed for policy ${policyId}`);
                    resolve({ success: true, policyId });
                }
            });
        });
    }

    /**
     * Get policies formatted for UI5 JSONModel
     */
    async getPoliciesForUI5(employeeId = 'EMP001') {
        try {
            const policies = await this.getPolicies(employeeId);
            const acknowledgmentHistory = await this.getAcknowledgmentHistory(employeeId);

            // Format for UI5 model
            const formattedPolicies = policies.map(policy => ({
                id: policy.id,
                title: policy.title,
                description: policy.description,
                icon: policy.icon,
                lastAccessed: policy.acknowledged_date || 'Never',
                status: policy.current_status,
                content: policy.content,
                version: policy.version,
                effectiveDate: policy.effective_date,
                lastUpdated: policy.last_updated,
                requiresAcknowledgment: Boolean(policy.requires_acknowledgment)
            }));

            return {
                policyCategories: formattedPolicies,
                selectedPolicy: {
                    title: "Welcome to Company Policies",
                    content: "Please select a policy category from the list to view detailed information.\n\nAll employees are required to read and acknowledge key policies within their first 30 days.\n\nFor questions about any policy, please contact HR at hr@company.com",
                    lastUpdated: "",
                    requiresAcknowledgment: false,
                    version: "",
                    effectiveDate: ""
                },
                acknowledgmentEnabled: false,
                acknowledgmentHistory: acknowledgmentHistory.map(ack => ({
                    policyId: ack.policy_id,
                    policyTitle: ack.policy_title,
                    acknowledgedDate: ack.acknowledged_date,
                    version: ack.policy_version
                }))
            };
        } catch (error) {
            console.error('❌ Error formatting policies for UI5:', error);
            throw error;
        }
    }

    /**
     * Close database connection
     */
    close() {
        if (this.db) {
            this.db.close((err) => {
                if (err) {
                    console.error('❌ Error closing database:', err.message);
                } else {
                    console.log('🔒 Database connection closed');
                }
            });
        }
    }
}

module.exports = PoliciesService;
