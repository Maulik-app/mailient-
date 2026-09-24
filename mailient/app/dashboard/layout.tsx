import { auth } from '../../lib/auth.js';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Arcus',
  description: 'Chat with your AI email agent for email agentic performance.',
  robots: { index: false, follow: false },
};

// This layout wraps ALL dashboard routes but doesn't enforce authentication
// Authentication is enforced in the specific pages that need it
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}