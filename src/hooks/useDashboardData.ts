import { useState, useEffect } from 'react';

// Interfaces untuk data
export interface User {
  id: number;
  username: string;
  fullName: string;
  companyName: string;
  role: string;
}

export interface AssessmentStats {
  totalAssessments: number;
  averageScore: number;
  mea01Score: number;
  mea02Score: number;
  mea03Score: number;
}

export interface Activity {
  id: number;
  projectName: string;
  date: string;
  score: number;
  status: string;
}

interface DashboardData {
  user: User | null;
  stats: AssessmentStats | null;
  recentActivities: Activity[];
}

// Mock data untuk pengujian
const mockUserData: User = {
  id: 1,
  username: 'auditor_pro',
  fullName: 'John Doe',
  companyName: 'PT Maju Jaya',
  role: 'User',
};

const mockAssessmentStats: AssessmentStats = {
  totalAssessments: 12,
  averageScore: 3.2,
  mea01Score: 3.5,
  mea02Score: 2.8,
  mea03Score: 3.7,
};

const mockRecentActivities: Activity[] = [
  {
    id: 1,
    projectName: 'Audit PT. ABC Q4 2024',
    date: '2024-12-10',
    score: 3.6,
    status: 'completed',
  },
  {
    id: 2,
    projectName: 'Assessment PT. XYZ Q3 2024',
    date: '2024-11-25',
    score: 2.9,
    status: 'completed',
  },
  {
    id: 3,
    projectName: 'Internal Audit Divisi IT',
    date: '2024-11-15',
    score: 4.1,
    status: 'completed',
  },
];

export function useDashboardData() {
  const [data, setData] = useState<DashboardData>({
    user: null,
    stats: null,
    recentActivities: [],
  });
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Dalam implementasi nyata, ini akan fetch dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simulasi delay API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Dalam implementasi nyata, ini akan fetch dari API
        // const response = await fetch('/api/dashboard');
        // const apiData = await response.json();
        
        setData({
          user: mockUserData,
          stats: mockAssessmentStats,
          recentActivities: mockRecentActivities,
        });
      } catch (err) {
        setError('Gagal memuat data dashboard');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}