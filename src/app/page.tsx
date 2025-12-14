"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Target,
  BarChart3,
  Eye,
  FileText,
  ShieldCheck,
  Users,
  ExternalLink,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center space-x-2">
            <Target className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              COBIT Audit Pro
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle />
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="sm" className="text-xs sm:text-sm">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="sm" className="text-xs sm:text-sm">
                  Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-20">
        <div className="container px-4 sm:px-6 max-w-5xl">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                COBIT Audit Pro
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl">
              Professional IT Governance Assessment Platform based on COBIT 5 Framework
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button size="lg" className="px-6">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <Button size="lg" className="px-6">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </SignedIn>

              <Link href="/knowledge-base">
                <Button size="lg" variant="outline" className="px-6">
                  Learn COBIT
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-800/30">
        <div className="container px-4 sm:px-6 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Powerful Features for IT Governance
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
              <BarChart3 className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Assessment Tool</h3>
              <p className="text-muted-foreground">
                Interactive digital questionnaires for MEA01, MEA02, and MEA03 domains
              </p>
            </div>

            <div className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
              <Eye className="h-10 w-10 text-indigo-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Real-time Dashboard</h3>
              <p className="text-muted-foreground">
                Visual analytics and maturity level tracking
              </p>
            </div>

            <div className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
              <FileText className="h-10 w-10 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Reporting</h3>
              <p className="text-muted-foreground">
                Comprehensive reports with historical data
              </p>
            </div>

            <div className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
              <ShieldCheck className="h-10 w-10 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Secure Platform</h3>
              <p className="text-muted-foreground">
                Role-based access control and data protection
              </p>
            </div>

            <div className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
              <Users className="h-10 w-10 text-red-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Knowledge Base</h3>
              <p className="text-muted-foreground">
                Reference materials and COBIT framework guidance
              </p>
            </div>

            <div className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
              <CheckCircle className="h-10 w-10 text-yellow-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Automated Insights</h3>
              <p className="text-muted-foreground">
                Gap analysis and improvement recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About COBIT Section */}
      <section className="py-12 sm:py-16">
        <div className="container px-4 sm:px-6 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            About COBIT 5 and Domain MEA
          </h2>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p>
              COBIT 5 (Control Objectives for Information and Related Technologies) is a comprehensive
              framework created by ISACA for IT governance and management. It helps enterprises achieve
              strategic goals by ensuring effective and efficient use of IT resources.
            </p>

            <p>
              The Monitor, Evaluate, and Assess (MEA) domain focuses on ensuring that IT-related
              activities are effectively monitored, evaluated, and assessed. It consists of three
              processes:
            </p>

            <ul className="space-y-2">
              <li><strong>MEA01 - Monitor, Evaluate and Assess Performance and Conformance</strong>: Establishes and maintains an ongoing approach to monitor performance and conformance to standards and objectives.</li>
              <li><strong>MEA02 - Monitor, Evaluate and Assess System of Internal Control</strong>: Ensures that the system of internal control continues to operate effectively and remains current.</li>
              <li><strong>MEA03 - Monitor, Evaluate and Assess Compliance with External Requirements</strong>: Ensures that compliance with external requirements is maintained and that non-compliance is addressed.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container px-4 sm:px-6 max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Transform Your IT Governance?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of auditors and IT professionals using COBIT Audit Pro
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="lg" variant="secondary" className="text-blue-600">
                  Start Free Trial
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="text-blue-600">
                  Access Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>
    </div>
  );
}
