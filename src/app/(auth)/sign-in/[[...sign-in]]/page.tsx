import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Sign In</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Access your COBIT Audit Pro account</p>
        </div>
        <SignIn path="/sign-in" routing="path" />
      </div>
    </div>
  );
}