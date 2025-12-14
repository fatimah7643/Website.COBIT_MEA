"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Eye,
  FileText,
  ShieldCheck,
  Users,
  CheckCircle,
  ArrowRight,
  Target,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">

      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 z-50 w-full backdrop-blur bg-white/80 dark:bg-gray-900/80 border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-7 w-7 text-blue-600" />
            <span className="font-bold text-lg text-blue-700 dark:text-blue-400">
              COBIT Audit MEA
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="sm">Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="sm">Dashboard</Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative w-full bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 flex flex-col md:flex-row items-center gap-12">
          
          {/* Left */}
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Optimalkan Tata Kelola TI dengan <br />
              <span className="text-blue-200">COBIT 5 – Domain MEA</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-xl">
              Platform digital untuk monitoring, evaluasi, dan penilaian
              tata kelola TI berbasis framework COBIT 5 secara profesional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-100">
                    Mulai Sekarang
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <Link href="/dashboard">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-100">
                    Ke Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </SignedIn>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4 bg-white/30 backdrop-blur-lg rounded-xl p-6 md:p-8 w-full md:w-1/2">
              {/* MEA01 */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>MEA01 – Performance & Conformance</span>
                  <span className="font-semibold">Level 2</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-800 h-2.5 rounded-full" style={{ width: "40%" }} />
                </div>
              </div>

              {/* MEA02 */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>MEA02 – Internal Control</span>
                  <span className="font-semibold">Level 3</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "60%" }} />
                </div>
              </div>

              {/* MEA03 */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>MEA03 – External Compliance</span>
                  <span className="font-semibold">Level 1</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: "20%" }} />
                </div>
              </div>
            </div>


        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="w-full bg-gray-50 dark:bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-14">
            Fitur Utama Platform
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature
              icon={<BarChart3 />}
              title="Assessment Digital"
              desc="Kuesioner MEA01, MEA02, MEA03 berbasis COBIT 5"
            />
            <Feature
              icon={<Eye />}
              title="Dashboard Monitoring"
              desc="Visualisasi maturity level & performa TI"
            />
            <Feature
              icon={<FileText />}
              title="Laporan Otomatis"
              desc="Rekap audit dan histori penilaian"
            />
            <Feature
              icon={<ShieldCheck />}
              title="Keamanan Data"
              desc="Role-based access & proteksi data"
            />
            <Feature
              icon={<Users />}
              title="Knowledge Base"
              desc="Panduan dan referensi COBIT 5"
            />
            <Feature
              icon={<CheckCircle />}
              title="Insight & Rekomendasi"
              desc="Gap analysis & improvement suggestion"
            />
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="w-full py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Tentang COBIT 5 – Domain MEA
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Domain Monitor, Evaluate, and Assess (MEA) memastikan bahwa
            aktivitas TI dipantau, dievaluasi, dan dinilai secara berkelanjutan
            untuk mendukung tujuan organisasi serta kepatuhan terhadap standar.
          </p>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="w-full bg-gradient-to-r from-indigo-600 to-blue-700 py-20 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Siap Meningkatkan Tata Kelola TI?
          </h2>
          <p className="text-blue-100 mb-8">
            Gunakan platform COBIT Audit MEA sekarang juga.
          </p>

          <SignedOut>
            <SignInButton mode="modal">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-100">
                Mulai Gratis
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-100">
                Buka Dashboard
              </Button>
            </Link>
          </SignedIn>
        </div>
      </section>

    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border hover:shadow-xl transition">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground">{desc}</p>
    </div>
  );
}
