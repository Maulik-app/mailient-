import { createClient } from '@supabase/supabase-js';
import { encrypt, decrypt } from './crypto.js';

// Credentials come from the environment only. Never add fallback values here:
// this repository is public. The NEXT_PUBLIC_ names are accepted because
// ENVIRONMENT_SETUP.md documented them. The service-role key bypasses row-level
// security and must never have a NEXT_PUBLIC_ name or reach client code.
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔧 SUPABASE - Environment check:', {
  hasUrl: !!supabaseUrl,
  hasAnonKey: !!supabaseAnonKey,
  hasServiceKey: !!supabaseServiceKey,
});

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
  console.error('🔧 SUPABASE - Missing environment variables:', {
    SUPABASE_URL: supabaseUrl ? 'present' : 'missing',
    SUPABASE_ANON_KEY: supabaseAnonKey ? 'present' : 'missing',
    SUPABASE_SERVICE_ROLE_KEY: supabaseServiceKey ? 'present' : 'missing'
  });
  throw new Error('Missing Supabase environment variables');
}

// Use anon key for client operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Use service role key for admin operations (only on server)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export class DatabaseService {
  constructor(isAdmin = true) {
    this.supabase = isAdmin ? supabaseAdmin : supabase;
  }

  // Store user tokens securely
  async storeUserTokens(userId, tokens) {
    try {
      console.log('StoreUserTokens called:', {
        userId,
        hasAccessToken: !!tokens.access_token,
        hasRefreshToken: !!tokens.refresh_token,
        expiresIn: tokens.expires_in
      });

      const { data, error } = await this.supabase
        .from('user_tokens')
        .upsert({
          user_id: userId,
          google_email: tokens.google_email || userId, // Prefer explicit google_email
          encrypted_access_token: tokens.access_token,
          encrypted_refresh_token: tokens.refresh_token,
          access_token_expires_at: new Date(Date.now() + (tokens.expires_in * 1000)).toISOString(),
          token_type: tokens.token_type,
          scopes: tokens.scopes || '',
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'google_email',
          ignoreDuplicates: false
        });

      if (error) {
        // If table doesn't exist, log and continue (tokens will be stored in session only)
        if (error.code === '42P01') {
          console.warn('user_tokens table does not exist, tokens stored in session only');
          return null;
        }

        // Check for specific table constraint issues
        if (error.code === '23505') {
          console.log('Duplicate key issue, trying update instead');
          const { data: updateData, error: updateError } = await this.supabase
            .from('user_tokens')
            .update({
              encrypted_access_token: tokens.access_token,
              encrypted_refresh_token: tokens.refresh_token,
              access_token_expires_at: new Date(Date.now() + (tokens.expires_in * 1000)).toISOString(),
              token_type: tokens.token_type,
              scopes: tokens.scopes || '',
              updated_at: new Date().toISOString()
            })
            .eq('google_email', userId);

          if (updateError) {
            console.error('Update failed:', updateError);
            throw updateError;
          }
          console.log('Token update successful');
          return updateData;
        }

        console.error('Database error storing tokens:', error);
        throw error;
      }

      console.log('Token storage successful:', !!data);
      return data;
    } catch (error) {
      console.error('Error storing user tokens:', error);
      // Don't throw error, just return null so app can continue with session tokens
      return null;
    }
  }

  // Get user tokens
  async getUserTokens(userId) {
    try {
      console.log('DatabaseService.getUserTokens called for userId:', userId);
      const { data, error } = await this.supabase
        .from('user_tokens')
        .select('*')
        .or(`user_id.eq."${userId}",google_email.eq."${userId}"`)
        .maybeSingle();

      console.log('Supabase query result:', { hasData: !!data, error: error?.message, errorCode: error?.code, dataKeys: data ? Object.keys(data) : null });

      if (error) {
        // PGRST116 = no rows found, which is fine
        // 42P01 = table doesn't exist
        if (error.code === 'PGRST116' || error.code === '42P01') {
          console.log('No tokens found or table missing, returning null');
          return null;
        }
        console.error('Unexpected database error:', error);
        throw error;
      }
      console.log('Tokens retrieved successfully');
      return data;
    } catch (error) {
      console.error('Error getting user tokens:', error);
      throw error;
    }
  }

  // Store user profile
  async storeUserProfile(userId, profile) {
    try {
      const { data, error } = await this.supabase
        .from('user_profiles')
        .upsert({
          user_id: userId, // userId is already the email
          email: profile.email,
          name: profile.name,
          picture: profile.picture,
          last_synced_at: profile.last_synced_at || new Date().toISOString(),
          integrations: profile.integrations || {},
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error storing user profile:', error);
      throw error;
    }
  }

  // Get user profile
  async getUserProfile(userId) {
    try {
      const { data, error } = await this.supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }

  // Update integration status
  async updateIntegrationStatus(userId, integrationId, enabled) {
    try {
      // First get current profile
      const profile = await this.getUserProfile(userId);
      const integrations = profile?.integrations || {};

      integrations[integrationId] = enabled;

      const { data, error } = await this.supabase
        .from('user_profiles')
        .update({
          integrations: integrations,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating integration status:', error);
      throw error;
    }
  }

  // Store emails
  async storeEmails(userId, emails) {
    try {
      // Check if user has advanced encryption enabled
      const profile = await this.getUserProfile(userId);
      const isAdvancedEncryption = profile?.preferences?.advanced_security === 'active';

      if (isAdvancedEncryption) {
        console.log('🔐 Advanced Encryption is ACTIVE: Encrypting emails for storage.');
      }

      const emailData = emails.map(email => {
        // Parse and format the date properly for PostgreSQL
        let formattedDate;
        try {
          // Handle different date formats from Gmail API
          if (email.date) {
            // Parse RFC 2822 format (e.g., "Sat, 18 Oct 2025 03:45:54 +0000")
            const parsedDate = new Date(email.date);
            if (!isNaN(parsedDate.getTime())) {
              formattedDate = parsedDate.toISOString();
            } else {
              // Fallback to current date if parsing fails
              console.warn(`Invalid date format for email ${email.id}: ${email.date}, using current date`);
              formattedDate = new Date().toISOString();
            }
          } else {
            formattedDate = new Date().toISOString();
          }
        } catch (dateError) {
          console.warn(`Date parsing error for email ${email.id}:`, dateError.message);
          formattedDate = new Date().toISOString();
        }

        // Encrypt sensitive fields if advanced encryption is on
        const subject = isAdvancedEncryption ? encrypt(email.subject) : (email.subject || '');
        const fromEmail = isAdvancedEncryption ? encrypt(email.from) : (email.from || '');
        const toEmail = isAdvancedEncryption ? encrypt(email.to) : (email.to || '');
        const snippet = isAdvancedEncryption ? encrypt(email.snippet) : (email.snippet || '');

        return {
          user_id: userId,
          email_id: email.id,
          thread_id: email.threadId,
          subject,
          from_email: fromEmail,
          to_email: toEmail,
          date: formattedDate,
          snippet,
          labels: JSON.stringify(email.labels || []),
          created_at: new Date().toISOString()
        };
      });

      // Process emails in smaller batches to avoid database timeouts
      const batchSize = 50;
      const results = [];

      for (let i = 0; i < emailData.length; i += batchSize) {
        const batch = emailData.slice(i, i + batchSize);

        const { data, error } = await this.supabase
          .from('user_emails')
          .upsert(batch, { onConflict: 'user_id,email_id' });

        if (error) {
          // If table doesn't exist, log and skip
          if (error.code === '42P01') {
            console.warn('user_emails table does not exist, skipping email storage');
            return null;
          }
          console.error('Batch storage error:', error);
          // Continue with next batch instead of failing completely
          continue;
        }

        if (data) {
          results.push(...data);
        }

        // Small delay between batches to avoid overwhelming the database
        if (i + batchSize < emailData.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      return results;
    } catch (error) {
      console.error('Error storing emails:', error);
      throw error;
    }
  }

  // Get user emails
  async getUserEmails(userId, limit = 50, offset = 0) {
    try {
      const { data, error } = await this.supabase
        .from('user_emails')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      // Decrypt fields if they are encrypted
      return data.map(email => ({
        ...email,
        subject: decrypt(email.subject),
        from_email: decrypt(email.from_email),
        to_email: decrypt(email.to_email),
        snippet: decrypt(email.snippet)
      }));
    } catch (error) {
      console.error('Error getting user emails:', error);
      throw error;
    }
  }

  // Update email labels
  async updateEmailLabels(userId, emailId, labels) {
    try {
      const { data, error } = await this.supabase
        .from('user_emails')
        .update({
          labels: JSON.stringify(labels),
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('email_id', emailId);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating email labels:', error);
      throw error;
    }
  }

  // Delete user data
  async deleteUserData(userId) {
    try {
      // Delete in order to respect foreign key constraints
      await this.supabase.from('user_emails').delete().eq('user_id', userId);
      await this.supabase.from('user_tokens').delete().eq('user_id', userId);
      await this.supabase.from('user_profiles').delete().eq('user_id', userId);

      return { success: true };
    } catch (error) {
      console.error('Error deleting user data:', error);
      throw error;
    }
  }

  // Store a single agent chat message pair
  async storeAgentChatMessage(userId, userMessage, agentResponse, conversationId, messageOrder = 1, isInitialMessage = false) {
    try {
      // Check for advanced encryption
      const profile = await this.getUserProfile(userId);
      const isAdvancedEncryption = profile?.preferences?.advanced_security === 'active';

      const { data, error } = await this.supabase
        .from('agent_chat_history')
        .insert({
          user_id: userId,
          conversation_id: conversationId,
          user_message: isAdvancedEncryption ? encrypt(userMessage) : (userMessage || ''),
          agent_response: isAdvancedEncryption ? encrypt(agentResponse) : (agentResponse || ''),
          message_order: messageOrder,
          is_initial_message: isInitialMessage,
        });

      if (error) {
        if (error.code === '42P01') {
          console.warn('agent_chat_history table does not exist, skipping chat storage.');
          return null;
        }
        // If new columns don't exist, throw error to trigger fallback
        if (error.message.includes('conversation_id') || error.message.includes('message_order') || error.message.includes('is_initial_message')) {
          throw new Error('NEW_SCHEMA_COLUMNS_MISSING');
        }
        throw error;
      }
      return data;
    } catch (error) {
      if (error.message === 'NEW_SCHEMA_COLUMNS_MISSING') {
        throw error; // Re-throw to trigger fallback in API route
      }
      console.error('Error storing agent chat message:', error);
      throw error;
    }
  }

  // Get all agent chat history for a user
  async getAgentChatHistory(userId) {
    try {
      const { data, error } = await this.supabase
        .from('agent_chat_history')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Decrypt messages if they are encrypted
      return (data || []).map(msg => ({
        ...msg,
        user_message: decrypt(msg.user_message),
        agent_response: decrypt(msg.agent_response)
      }));
    } catch (error) {
      console.error('Error getting agent chat history:', error);
      throw error;
    }
  }

  // Get agent chat history with pagination
  async getAgentChatHistoryWithPagination(userId, limit = 50, offset = 0) {
    try {
      // First check if the table exists
      const { data: tableCheck, error: tableError } = await this.supabase
        .from('agent_chat_history')
        .select('id')
        .eq('user_id', userId)
        .limit(1);

      if (tableError) {
        if (tableError.code === '42P01') {
          console.log('agent_chat_history table does not exist');
          return [];
        }
        throw tableError;
      }

      const { data, error } = await this.supabase
        .from('agent_chat_history')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      // Decrypt messages if they are encrypted
      return (data || []).map(msg => ({
        ...msg,
        user_message: decrypt(msg.user_message),
        agent_response: decrypt(msg.agent_response)
      }));
    } catch (error) {
      console.error('Error getting agent chat history with pagination:', error);
      throw error;
    }
  }

  // Get conversation thread by conversation ID
  async getConversationThread(userId, conversationId) {
    try {
      const { data, error } = await this.supabase
        .from('agent_chat_history')
        .select('*')
        .eq('user_id', userId)
        .eq('conversation_id', conversationId)
        .order('message_order', { ascending: true });

      if (error) {
        // If conversation_id column doesn't exist, try to get by message ID for backward compatibility
        if (error.message.includes('conversation_id')) {
          console.log('conversation_id column not available, trying to get by message ID');
          const { data: fallbackData, error: fallbackError } = await this.supabase
            .from('agent_chat_history')
            .select('*')
            .eq('id', conversationId)
            .eq('user_id', userId);

          if (fallbackError) throw fallbackError;
          return (fallbackData || []).map(msg => ({
            ...msg,
            user_message: decrypt(msg.user_message),
            agent_response: decrypt(msg.agent_response)
          }));
        }
        throw error;
      }
      return (data || []).map(msg => ({
        ...msg,
        user_message: decrypt(msg.user_message),
        agent_response: decrypt(msg.agent_response)
      }));
    } catch (error) {
      console.error('Error getting conversation thread:', error);
      throw error;
    }
  }

  // Get all conversations for a user (grouped by conversation_id)
  async getUserConversations(userId) {
    try {
      // First check if the table exists
      const { data: tableCheck, error: tableError } = await this.supabase
        .from('agent_chat_history')
        .select('id')
        .eq('user_id', userId)
        .limit(1);

      if (tableError) {
        if (tableError.code === '42P01') {
          console.log('agent_chat_history table does not exist');
          return [];
        }
        throw tableError;
      }

      const { data, error } = await this.supabase
        .from('agent_chat_history')
        .select('*')
        .eq('user_id', userId)
        .eq('is_initial_message', true)
        .order('created_at', { ascending: false });

      if (error) {
        // If the new column doesn't exist, fall back to getting all messages
        if (error.message.includes('is_initial_message')) {
          console.log('is_initial_message column not available, falling back to all messages');
          const { data: fallbackData, error: fallbackError } = await this.supabase
            .from('agent_chat_history')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

          if (fallbackError) throw fallbackError;
          return fallbackData || [];
        }
        throw error;
      }
      return data || [];
    } catch (error) {
      console.error('Error getting user conversations:', error);
      throw error;
    }
  }

  // Get conversation message count
  async getConversationMessageCount(userId, conversationId) {
    try {
      const { count, error } = await this.supabase
        .from('agent_chat_history')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('conversation_id', conversationId);

      if (error) {
        // If conversation_id column doesn't exist, return 1 for single message
        if (error.message.includes('conversation_id')) {
          console.log('conversation_id column not available, returning count of 1');
          return 1;
        }
        throw error;
      }
      return count || 0;
    } catch (error) {
      console.error('Error getting conversation message count:', error);
      throw error;
    }
  }

  // Generate a unique conversation ID
  generateConversationId() {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substr(2, 9);
    return `conv_${timestamp}_${randomStr}`;
  }



  // Create user connection (Orbit)
  async createUserConnection(connectionData) {
    try {
      const { data, error } = await this.supabase
        .from('user_connections')
        .insert(connectionData);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating user connection:', error);
      throw error;
    }
  }

  // Get user's connections
  async getUserConnections(userId) {
    try {
      const { data, error } = await this.supabase
        .from('user_connections')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'accepted')
        .order('connected_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting user connections:', error);
      throw error;
    }
  }

  // Log email action (analytics/history)
  async logEmailAction(userId, actionType, details) {
    try {
      const { data, error } = await this.supabase
        .from('email_actions_log')
        .insert({
          user_id: userId,
          action_type: actionType,
          details: details,
          created_at: new Date().toISOString()
        });

      if (error) {
        if (error.code === '42P01') {
          console.warn('email_actions_log table does not exist, skipping log.');
          return null;
        }
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error logging email action:', error);
      return null;
    }
  }
}
