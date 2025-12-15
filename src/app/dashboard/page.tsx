'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartLegend, ChartConfig } from '@/components/ui/chart';
import { RadarChart } from '@/components/charts/radar-chart';
import { BarChart } from '@/components/charts/bar-chart';
import { CobitInfoCard } from '@/components/charts/cobit-info-card';
import { useDashboardData } from '@/hooks/useDashboardData';
import {
  ActivityIcon,
  FileTextIcon,
  CalendarIcon,
  TargetIcon
} from 'lucide-react';

export default function DashboardPage() {
  const { data, loading, error } = useDashboardData();
  const [timeRange, setTimeRange] = useState('monthly');

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-pulse">
          <div className="mb-8">
            <div className="h-8 w-1/2 bg-muted rounded mb-2"></div>
            <div className="h-4 w-2/3 bg-muted rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="h-4 w-3/4 bg-muted rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-8 w-1/4 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard">Coba Lagi</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data.stats || !data.user || data.recentActivities.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Data Kosong</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Anda belum memiliki data assessment. Silakan lakukan assessment pertama.</p>
            <Button asChild className="mt-4">
              <Link href="/assessment/new">Mulai Assessment Baru</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const radarChartData = [
    { domain: 'MEA01', score: data.stats.mea01Score },
    { domain: 'MEA02', score: data.stats.mea02Score },
    { domain: 'MEA03', score: data.stats.mea03Score },
  ];

  const barChartData = [
    { domain: 'MEA01', score: data.stats.mea01Score },
    { domain: 'MEA02', score: data.stats.mea02Score },
    { domain: 'MEA03', score: data.stats.mea03Score },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Salam Perkenalan */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400">Selamat Datang, {data.user.fullName}!</h1>
        <p className="text-muted-foreground">
          Di COBIT Audit MEA - Platform Tata Kelola Teknologi Informasi Berbasis Framework COBIT 5
        </p>
      </div>

      {/* Ringkasan Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Assessment</CardTitle>
            <FileTextIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">{data.stats.totalAssessments}</div>
            <p className="text-xs text-muted-foreground">+2 dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Rata-rata Skor</CardTitle>
            <TargetIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">{data.stats.averageScore.toFixed(1)}</div>
            <Progress value={data.stats.averageScore * 20} className="mt-2 [&>div]:bg-blue-500" />
            <p className="text-xs text-muted-foreground mt-1">Skala 0-5 (Optimizing)</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Performa MEA01</CardTitle>
            <ActivityIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">{data.stats.mea01Score.toFixed(1)}</div>
            <Badge variant="secondary" className="mt-1 border-blue-300 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
              {data.stats.mea01Score >= 4 ? 'Tinggi' : data.stats.mea01Score >= 3 ? 'Sedang' : 'Rendah'}
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Aktifitas Terakhir</CardTitle>
            <CalendarIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
              {data.recentActivities.length > 0
                ? new Date(data.recentActivities[0].date).toLocaleDateString('id-ID')
                : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              {data.recentActivities.length > 0 ? data.recentActivities[0].projectName : 'Tidak ada aktivitas'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Visualisasi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="text-blue-700 dark:text-blue-300">Kemampuan Domains MEA</CardTitle>
            <CardDescription>Visualisasi Maturity Level</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
              domain: {
                label: 'Domain',
                color: 'hsl(var(--chart-1))',
              },
              score: {
                label: 'Skor',
              },
            }} className="h-[300px]">
              <RadarChart data={radarChartData} dataKey="domain" margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <ChartTooltip />
                <ChartLegend />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="text-blue-700 dark:text-blue-300">Perbandingan Maturity Levels</CardTitle>
            <CardDescription>Per domain MEA</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
              domain: {
                label: 'Domain',
                color: 'hsl(var(--chart-2))',
              },
              score: {
                label: 'Score',
              },
            }} className="h-[300px]">
              <BarChart data={barChartData} dataKey="domain" margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <ChartTooltip />
                <ChartLegend />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Rekomendasi Otomatis */}
      <div className="mb-8">
        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="text-blue-700 dark:text-blue-300">Rekomendasi Perbaikan</CardTitle>
            <CardDescription>Analisis berdasarkan hasil assessment Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.stats.mea01Score < 3 && (
                <div className="border-l-4 border-yellow-500 pl-4 py-1 bg-yellow-50 rounded-r">
                  <h4 className="font-semibold">MEA01 - Performance and Conformance</h4>
                  <p className="text-sm">Skor rendah dalam domain ini menunjukkan perlunya standarisasi proses monitoring.</p>
                </div>
              )}
              {data.stats.mea02Score < 3 && (
                <div className="border-l-4 border-yellow-500 pl-4 py-1 bg-yellow-50 rounded-r">
                  <h4 className="font-semibold">MEA02 - System of Internal Control</h4>
                  <p className="text-sm">Perlu peningkatan dalam efektivitas kontrol internal dan penilaian mandiri.</p>
                </div>
              )}
              {data.stats.mea03Score < 3 && (
                <div className="border-l-4 border-yellow-500 pl-4 py-1 bg-yellow-50 rounded-r">
                  <h4 className="font-semibold">MEA03 - Compliance with External Requirements</h4>
                  <p className="text-sm">Butuh perhatian lebih terhadap kepatuhan terhadap persyaratan eksternal.</p>
                </div>
              )}
              {(data.stats.mea01Score >= 3 || data.stats.mea02Score >= 3 || data.stats.mea03Score >= 3) && (
                <div className="border-l-4 border-green-500 pl-4 py-1 bg-green-50 rounded-r">
                  <p className="text-sm">Secara keseluruhan, tingkat kematangan Anda menunjukkan bahwa proses tata kelola TI sudah cukup baik. Pertahankan dan terus optimalkan.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs untuk Aktifitas dan Riwayat */}
      <Tabs defaultValue="activities" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 bg-blue-100/50 dark:bg-blue-900/30">
          <TabsTrigger value="activities" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">Aktifitas Terbaru</TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">Riwayat Assessment</TabsTrigger>
        </TabsList>
        <TabsContent value="activities">
          <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-300">Aktifitas Terbaru</CardTitle>
              <CardDescription>Daftar assessment terbaru yang telah Anda lakukan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100/50 dark:hover:bg-blue-900/30 transition-colors">
                    <div>
                      <h4 className="font-semibold">{activity.projectName}</h4>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">Skor: {activity.score.toFixed(1)}</span>
                      <Badge variant="outline" className="border-blue-300 text-blue-700 dark:text-blue-300">{activity.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-300">Riwayat Assessment</CardTitle>
              <CardDescription>Daftar assessment terbaru yang telah Anda lakukan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-blue-200 dark:border-blue-800">
                      <th className="py-2 text-left text-blue-700 dark:text-blue-300">Project</th>
                      <th className="py-2 text-left text-blue-700 dark:text-blue-300">Tanggal</th>
                      <th className="py-2 text-right text-blue-700 dark:text-blue-300">Skor MEA01</th>
                      <th className="py-2 text-right text-blue-700 dark:text-blue-300">Skor MEA02</th>
                      <th className="py-2 text-right text-blue-700 dark:text-blue-300">Skor MEA03</th>
                      <th className="py-2 text-right text-blue-700 dark:text-blue-300">Rata-rata</th>
                      <th className="py-2 text-right text-blue-700 dark:text-blue-300">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <tr key={idx} className="border-b border-blue-100 dark:border-blue-900/50 hover:bg-blue-100/30 dark:hover:bg-blue-900/20">
                        <td className="py-2">{data.recentActivities[idx]?.projectName || `Assessment Project ${idx + 1}`}</td>
                        <td className="py-2">{data.recentActivities[idx]?.date || `2024-${String(12 - idx).padStart(2, '0')}-01`}</td>
                        <td className="py-2 text-right">{(Math.random() * 3 + 2).toFixed(1)}</td>
                        <td className="py-2 text-right">{(Math.random() * 3 + 2).toFixed(1)}</td>
                        <td className="py-2 text-right">{(Math.random() * 3 + 2).toFixed(1)}</td>
                        <td className="py-2 text-right">{(Math.random() * 2 + 2.5).toFixed(1)}</td>
                        <td className="py-2 text-right">
                          <Badge variant="outline" className="border-blue-300 text-blue-700 dark:text-blue-300">Completed</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Tombol Aksi */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700">
          <Link href="/assessment/new">
            Mulai Assessment Baru
          </Link>
        </Button>
        <Button variant="outline" asChild size="lg" className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/50">
          <Link href="/knowledge-base">
            Pelajari COBIT 5
          </Link>
        </Button>
        <Button variant="outline" asChild size="lg" className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/50">
          <Link href="/reports">
            Lihat Semua Laporan
          </Link>
        </Button>
      </div>

      {/* Informasi COBIT 5 */}
      <div className="mt-8">
        <CobitInfoCard />
      </div>
    </div>
  );
}