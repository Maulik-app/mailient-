/**
 * Rube MCP Client for email operations
 * Connects to https://rube.app/mcp with JWT authentication
 */

class RubeMCPClient {
  constructor() {
    this.baseUrl = 'https://rube.app/mcp';
    // Token comes from the environment only; this repository is public.
    this.token = process.env.RUBE_MCP_TOKEN;
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };
  }

  /**
   * Send request to Rube MCP server
   */
  async sendRequest(method, params = {}) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: Date.now(),
          method: method,
          params: params
        })
      });

      if (!response.ok) {
        throw new Error(`MCP request failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(`MCP Error: ${result.error.message}`);
      }

      return result.result;
    } catch (error) {
      console.error('Rube MCP Client Error:', error);
      throw error;
    }
  }

  /**
   * List available tools/capabilities
   */
  async listTools() {
    try {
      const result = await this.sendRequest('tools/list');
      return result.tools || [];
    } catch (error) {
      console.error('Error listing tools:', error);
      return [];
    }
  }

  /**
   * Search emails using MCP server
   */
  async searchEmails(query, options = {}) {
    try {
      const params = {
        query: query,
        max_results: options.maxResults || 20,
        ...options
      };

      const result = await this.sendRequest('tools/call', {
        name: 'search_emails',
        arguments: params
      });

      return result;
    } catch (error) {
      console.error('Error searching emails:', error);
      throw error;
    }
  }

  /**
   * Get email by ID
   */
  async getEmail(emailId) {
    try {
      const result = await this.sendRequest('tools/call', {
        name: 'get_email',
        arguments: {
          email_id: emailId
        }
      });

      return result;
    } catch (error) {
      console.error('Error getting email:', error);
      throw error;
    }
  }

  /**
   * Get multiple emails by IDs
   */
  async getEmails(emailIds) {
    try {
      const results = [];
      
      for (const emailId of emailIds) {
        try {
          const email = await this.getEmail(emailId);
          results.push(email);
        } catch (error) {
          console.warn(`Failed to get email ${emailId}:`, error);
        }
      }

      return results;
    } catch (error) {
      console.error('Error getting emails:', error);
      throw error;
    }
  }

  /**
   * Send email using MCP server
   */
  async sendEmail(emailData) {
    try {
      const result = await this.sendRequest('tools/call', {
        name: 'send_email',
        arguments: emailData
      });

      return result;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  /**
   * Get email labels/folders
   */
  async getLabels() {
    try {
      const result = await this.sendRequest('tools/call', {
        name: 'get_labels',
        arguments: {}
      });

      return result;
    } catch (error) {
      console.error('Error getting labels:', error);
      return { labels: [] };
    }
  }

  /**
   * Parse email search query to extract filters
   */
  static parseSearchQuery(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    let query = '';
    let filters = {};

    // Check for specific senders
    if (lowerMessage.includes('from')) {
      const fromMatch = lowerMessage.match(/from\s+([^\s]+)/);
      if (fromMatch) {
        filters.from = fromMatch[1];
        query += `from:${fromMatch[1]} `;
      }
    }

    // Check for unread
    if (lowerMessage.includes('unread')) {
      filters.isUnread = true;
      query += 'is:unread ';
    }

    // Check for urgent or important
    if (lowerMessage.includes('urgent') || lowerMessage.includes('important')) {
      filters.isImportant = true;
      query += 'is:important ';
    }

    // Check for recent
    if (lowerMessage.includes('recent') || lowerMessage.includes('today') || lowerMessage.includes('yesterday')) {
      filters.timeRange = '7d';
      query += 'newer_than:7d ';
    }

    // Check for subject keywords
    if (lowerMessage.includes('subject:')) {
      const subjectMatch = lowerMessage.match(/subject:([^,\s]+)/);
      if (subjectMatch) {
        filters.subject = subjectMatch[1];
        query += `subject:${subjectMatch[1]} `;
      }
    }

    // Check for specific date ranges
    if (lowerMessage.includes('last week')) {
      filters.timeRange = '7d';
      query += 'newer_than:7d ';
    } else if (lowerMessage.includes('last month')) {
      filters.timeRange = '30d';
      query += 'newer_than:30d ';
    }

    // Default to recent emails if no specific query
    if (!query.trim()) {
      query = 'newer_than:30d'; // Last 30 days
      filters.timeRange = '30d';
    }

    return {
      query: query.trim(),
      filters: filters
    };
  }

  /**
   * Format email data for AI consumption
   */
  static formatEmailForAI(email) {
    return {
      id: email.id || email.messageId || 'unknown',
      subject: email.subject || '(No Subject)',
      from: email.from || email.sender || 'Unknown Sender',
      date: email.date || email.timestamp || new Date().toISOString(),
      snippet: email.snippet || email.body?.substring(0, 200) || '',
      body: email.body ? email.body.substring(0, 500) : '',
      labels: email.labels || [],
      isRead: email.isRead !== false,
      isImportant: email.isImportant || false
    };
  }
}

export { RubeMCPClient };