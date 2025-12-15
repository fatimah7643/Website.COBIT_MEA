'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NewAssessmentPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the main assessment page
    router.push('/assessment');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-lg text-gray-600">Redirecting to assessment...</p>
      </div>
    </div>
  );
};

export default NewAssessmentPage;