# Environment Configuration for Mailient

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Supabase Configuration (server-side; there are no hardcoded fallbacks)
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
# Bypasses row-level security. Server only: never prefix with NEXT_PUBLIC_.
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Rube MCP (lib/rube-mcp-client.js)
RUBE_MCP_TOKEN=your_rube_mcp_token

# Search engine verification (optional; see docs/seo/README.md)
GOOGLE_SITE_VERIFICATION=
BING_SITE_VERIFICATION=

# For production, update NEXTAUTH_URL to your actual domain:
# NEXTAUTH_URL=https://yourdomain.com
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Gmail API
4. Go to "Credentials" and create OAuth 2.0 Client ID
5. Add the following authorized redirect URIs:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://yourdomain.com/api/auth/callback/google`

## Supabase Database Setup

1. Go to [Supabase](https://supabase.com/) and create a new project
2. In your Supabase project dashboard, go to the SQL Editor
3. Run the SQL schema from `supabase-schema.sql` in your project
4. Go to Settings > API to get your project URL and anon key
5. Add the Supabase environment variables to your `.env.local` file

## Important Notes

- The app now uses NextAuth for authentication with secure database storage
- Gmail scopes are automatically included in the NextAuth configuration
- User tokens and emails are stored securely in Supabase database
- Row Level Security (RLS) ensures users can only access their own data
- No more insecure localStorage or URL parameter token passing
