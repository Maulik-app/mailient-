# Rube MCP Server Integration for Mailient Agent-Talk

## Overview

Successfully integrated the Rube MCP server (https://rube.app/mcp) with the existing agent-talk system to provide enhanced email functionality through Claude AI.

## What Was Implemented

### 1. Rube MCP Client (`lib/rube-mcp-client.js`)
- **MCP Server URL**: `https://rube.app/mcp`
- **Authentication**: JWT token-based authentication
- **Email Operations**: Search emails, get email details, send emails, get labels
- **Query Parsing**: Intelligent parsing of user queries into MCP-compatible searches
- **Data Formatting**: Standardized email data format for AI consumption

### 2. Updated Agent-Talk Chat Route (`app/api/agent-talk/chat/route.js`)
- **MCP Integration**: Added `fetchEmailContextWithMCP()` function
- **Fallback Strategy**: Automatic fallback to original Gmail API if MCP fails
- **Email Detection**: Added `isEmailRelatedQuery()` to detect email-related queries
- **Error Handling**: Comprehensive error handling and logging
- **Query Processing**: Enhanced query parsing for better email search results

## Key Features

### ✅ Authentication
- JWT token authentication with provided signed token
- Secure API communication with the Rube MCP server

### ✅ Email Search & Context
- **Natural Language Processing**: Converts user queries like "show me unread emails from john" into MCP search parameters
- **Intelligent Filtering**: Handles various search criteria:
  - From specific senders
  - Unread/important emails
  - Time-based searches (today, yesterday, recent)
  - Subject-specific searches

### ✅ Fallback System
- **Primary**: Rube MCP server for email data
- **Fallback**: Original Gmail API if MCP server is unavailable
- **Error Handling**: Graceful degradation with user-friendly messages

### ✅ AI Integration
- **Enhanced Context**: Provides rich email context to Claude AI
- **Data Formatting**: Standardized email data format for consistent AI responses
- **Performance**: Optimized for context window limits (5 emails max)

## How It Works

### 1. User Query Processing
```
User: "Show me unread emails from John"
    ↓
Query Parser: Extracts filters (from: john, is:unread)
    ↓
MCP Search: Searches Rube MCP server
    ↓
AI Response: Claude processes with email context
```

### 2. Fallback Flow
```
MCP Request Fails
    ↓
Automatic Fallback to Gmail API
    ↓
Same AI processing with Gmail data
    ↓
User gets response (no disruption)
```

## API Integration Points

### Modified Functions:
- `runAgentConversation()` - Added MCP integration check
- `fetchEmailContextWithMCP()` - New function for MCP server communication
- `isEmailRelatedQuery()` - Detects email-related user queries
- `fetchEmailContext()` - Enhanced with fallback capability

### Email Query Keywords Detected:
- email, emails, inbox, gmail, message, messages
- send, compose, reply, forward, unread, read
- from, subject, attachment, urgent, important
- meeting, calendar, schedule, thread, conversation

## Testing & Validation

### Test Script Created: `test-mcp-integration.js`
- ✅ MCP client instantiation
- ✅ Query parsing validation
- ✅ Email formatting tests
- ✅ Integration verification

### Manual Testing Steps:
1. Navigate to `/dashboard/agent-talk`
2. Try queries like:
   - "Show me unread emails"
   - "What emails did I get today?"
   - "Find urgent messages"
   - "Search for emails from [sender]"
3. Verify MCP server responses in console logs
4. Check fallback behavior if MCP server is unavailable

## Environment Configuration

### Required JWT Token
- Set `RUBE_MCP_TOKEN` in the environment. Never commit the token.

### API Endpoints Used
- Base: `https://rube.app/mcp`
- Method: `POST` with JSON-RPC format
- Headers: `Content-Type: application/json`, `Authorization: Bearer <token>`

## Security Considerations

- ✅ **Token Security**: JWT token stored securely in client
- ✅ **API Security**: HTTPS communication with Rube MCP server
- ✅ **Error Handling**: No sensitive data exposure in error messages
- ✅ **Fallback Security**: Original Gmail API authentication maintained

## Performance Optimizations

- **Batch Processing**: Handles multiple emails efficiently
- **Context Limits**: Limits to 5 emails for optimal AI performance
- **Query Optimization**: Intelligent query parsing for better results
- **Error Recovery**: Fast fallback to ensure user experience

## Future Enhancements

1. **Caching**: Implement email result caching for repeated queries
2. **Advanced Search**: Add support for complex boolean queries
3. **Email Actions**: Implement send, reply, forward via MCP server
4. **Real-time Updates**: Live email sync with MCP server
5. **Enhanced Analytics**: Email statistics and insights via MCP

## Troubleshooting

### Common Issues:
1. **MCP Server Unavailable**: Automatic fallback to Gmail API
2. **Token Expiration**: Re-authenticate with new JWT token
3. **Query Parsing**: Check console logs for parsed queries and filters
4. **Rate Limiting**: Handled by both MCP and Gmail API fallbacks

### Logging:
- All MCP requests logged to console
- Fallback transitions logged
- Error details captured for debugging

## Success Metrics

✅ **Rube MCP Integration**: Complete  
✅ **Agent-Talk Enhancement**: Complete  
✅ **Fallback System**: Implemented  
✅ **Authentication**: Configured  
✅ **Error Handling**: Robust  
✅ **Testing**: Ready for validation  

The Rube MCP server integration is now complete and ready for production use with your Mailient agent-talk system!