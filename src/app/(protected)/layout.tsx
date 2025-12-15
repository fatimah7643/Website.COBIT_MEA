import { auth } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-blue-200 dark:border-blue-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h1 className="text-xl font-bold text-blue-700 dark:text-blue-400">COBIT Audit Pro</h1>
            </div>
            <div className="flex items-center space-x-6">
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <Link href="/dashboard" className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300">Dashboard</Link>
                  </li>
                  <li>
                    <Link href="/assessment" className="text-muted-foreground hover:text-blue-700 dark:hover:text-blue-300">Assessment</Link>
                  </li>
                  <li>
                    <Link href="/reports" className="text-muted-foreground hover:text-blue-700 dark:hover:text-blue-300">Reports</Link>
                  </li>
                  <li>
                    <Link href="/knowledge-base" className="text-muted-foreground hover:text-blue-700 dark:hover:text-blue-300">Knowledge Base</Link>
                  </li>
                </ul>
              </nav>
              <div className="flex items-center space-x-4">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}