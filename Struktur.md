Struktur Folder Aplikasi
COBIT Audit Pro (Next.js – App Router)

Dokumen ini menjelaskan struktur folder aplikasi COBIT Audit Pro yang disesuaikan dengan spesifikasi sistem, fitur, dan alur kerja yang telah didefinisikan.

Struktur ini menggunakan Next.js App Router dan memisahkan tanggung jawab antara halaman, komponen, logika bisnis, dan integrasi database.

Struktur Folder 

src/
│ │ │ │ └── page.tsx # Detail hasil assessment
│ │ │ ├── components/ # Komponen khusus assessment
│ │ │ │ ├── Questionnaire.tsx
│ │ │ │ ├── ScoreSelector.tsx
│ │ │ │ ├── RadarChart.tsx
│ │ │ │ └── Recommendation.tsx
│ │ │ └── types.ts # Tipe data assessment
│ │ │
│ │ ├── reports/ # Riwayat & laporan audit
│ │ │ └── page.tsx
│ │ │
│ │ ├── knowledge-base/ # Artikel & informasi COBIT
│ │ │ ├── page.tsx
│ │ │ └── [id]/
│ │ │ └── page.tsx
│ │ │
│ │ └── settings/ # Profil & pengaturan pengguna
│ │ └── page.tsx
│ │
│ └── api/ # Backend API Routes
│ ├── auth/
│ │ └── route.ts # Login & register API
│ ├── assessments/
│ │ └── route.ts # CRUD assessment
│ ├── knowledge-base/
│ │ └── route.ts # CRUD artikel COBIT
│ └── users/
│ └── route.ts # Manajemen user
│
├── components/ # Komponen global reusable
│ ├── ui/ # Button, Card, Modal, dll
│ ├── Navbar.tsx
│ ├── Sidebar.tsx
│ └── ThemeToggle.tsx
│
├── hooks/ # Custom React hooks
│ ├── useAuth.ts
│ └── useTheme.ts
│
├── lib/ # Utilitas & logic bisnis
│ ├── db.ts # Koneksi database MySQL
│ ├── auth.ts # Helper autentikasi
│ └── scoring.ts # Perhitungan maturity level
│
├── supabase/ # (Opsional) Client Supabase
│
├── middleware.ts # Proteksi route & RBAC
│
└── types/ # Global TypeScript types
├── user.ts
├── assessment.ts
└── report.ts