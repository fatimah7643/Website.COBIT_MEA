Ringkasan Spesifikasi Aplikasi
COBIT Audit Pro
1. Gambaran Umum Aplikasi

COBIT Audit Pro adalah aplikasi berbasis web yang dirancang untuk membantu auditor TI, konsultan, dan manajer TI dalam melakukan pengukuran tingkat kematangan (maturity level) tata kelola teknologi informasi perusahaan.

Aplikasi ini secara khusus mengadopsi framework COBIT 5, dengan fokus pada domain MEA (Monitor, Evaluate, and Assess) yang meliputi:

MEA01 – Performance and Conformance

MEA02 – System of Internal Control

MEA03 – Compliance with External Requirements

COBIT Audit Pro menggantikan proses audit manual dengan kuesioner digital interaktif, perhitungan otomatis maturity level, visualisasi Radar Chart, serta rekomendasi perbaikan berbasis gap analysis yang tersimpan sebagai laporan historis.

2. Fitur Utama Aplikasi
A. Manajemen Pengguna (User Management)

Fitur ini memastikan sistem memiliki kontrol akses dan keamanan data yang baik.

Registrasi & Login
Pengguna dapat mendaftar dengan data:

Username

Email

Password

Nama Perusahaan

Nomor HP

Role-based Access Control

Admin: Mengelola konten, knowledge base, dan sistem

User: Auditor atau klien yang melakukan assessment

Profil Pengguna
Menyimpan data identitas auditor dan perusahaan yang diaudit untuk kebutuhan laporan.

B. Assessment Tool (Inti Sistem)

Merupakan fungsi utama dari aplikasi COBIT Audit Pro.

Digital Questionnaire
Kuesioner berbasis web untuk 3 sub-domain MEA:

MEA01 dengan pertanyaan membahas tentang:
1.Establish a monitoring approach.
2.Set performance and conformance targets.
3.Collect and process performance and conformance data.
4.Analyse and report performance.
5.Ensure the implementation of corrective actions.

MEA02 dengan pertanyaan membahas tentang:
1.Monitor internal controls.
2.Review business process controls effectiveness.
3.Perform control self-assessments.
4.Identify and report control deficiencies.
5.Ensure that assurance providers are independent and qualified.
6.Plan assurance initiatives.
7.Scope assurance initiatives.
8.Execute assurance initiatives.

MEA03 dengan pertanyaan membahas tentang:
1.Identify external compliance requirements.
2.Optimise response to external requirements.
3.Confirm external compliance.
4.Obtain assurance of external compliance.



Sistem Penilaian (Scoring System)
Setiap control objective dinilai menggunakan skala 0–5:

0 – Incomplete

1 – Performed

2 – Managed

3 – Established

4 – Predictable

5 – Optimizing

Perhitungan Otomatis
Sistem menghitung:

Rata-rata skor per domain MEA

Skor kematangan keseluruhan (overall maturity level)

C. Dashboard & Reporting

Fitur ini menyajikan hasil audit secara visual dan informatif.

Dashboard Real-time
Menampilkan:

Total assessment yang pernah dilakukan

Rata-rata maturity level

Aktivitas audit terbaru

Visualisasi Data

Radar Chart (Spider Chart) untuk membandingkan performa MEA01, MEA02, dan MEA03

Rekomendasi Otomatis
Sistem memberikan saran perbaikan berdasarkan skor, misalnya:

Skor < 2 → Standarisasi Proses

Skor 3 → Optimasi dan dokumentasi lanjutan

Riwayat Laporan
Mendukung operasi CRUD (Create, Read, Update, Delete) terhadap data hasil assessment.

D. Knowledge Base & Informasi COBIT

Menyediakan edukasi mengenai:

Konsep COBIT 5

Prinsip tata kelola TI

Penjelasan detail domain MEA

Konten dapat dikelola oleh Admin sebagai referensi auditor.

E. Pilihan Mode aplikasi
Dark Mode, Light Mode, dan System

3. Alur Kerja Aplikasi (User Flow)

    1. Landing Page
        Menampilkan informasi aplikasi, manfaat, dan pengenalan COBIT 5.

        Autentikasi (Login & Register)

        Register: Pengguna baru mengisi data akun dan perusahaan

        Login: Sistem memverifikasi kredensial pengguna

    2. Dashboard Utama
        Menampilkan ringkasan statistik audit dan opsi memulai assessment baru.

        Proses Assessment

        Input nama proyek/klien

        Pengisian kuesioner MEA01, MEA02, dan MEA03

        Penentuan skor 0–5 untuk setiap pertanyaan

        Penyelesaian dan perhitungan hasil

    3. Hasil & Laporan

        Skor maturity level

        Visualisasi Radar Chart

        Rekomendasi perbaikan

        Penyimpanan otomatis ke database dan akses riwayat laporan

# Rancangan Skema Database (PostgreSQL)

## COBIT Audit Pro

Dokumen ini merupakan versi **PostgreSQL** dari rancangan skema database COBIT Audit Pro, yang disesuaikan dari versi MySQL tanpa mengubah struktur logis dan relasi data.

Perbedaan utama:

* `AUTO_INCREMENT` → `SERIAL` / `BIGSERIAL`
* `ENUM` → `CHECK CONSTRAINT`
* Tipe waktu distandarkan ke `TIMESTAMP`

---

## 1. Tabel Users

*Menyimpan data pengguna/auditor*

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    company_name VARCHAR(100),
    phone_number VARCHAR(20),
    role VARCHAR(10) DEFAULT 'user'
        CHECK (role IN ('admin', 'user')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 2. Tabel Assessments

*Header untuk setiap sesi audit / proyek assessment*

```sql
CREATE TABLE assessments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    project_name VARCHAR(150) NOT NULL,
    overall_score NUMERIC(4,2),
    score_mea01 NUMERIC(4,2),
    score_mea02 NUMERIC(4,2),
    score_mea03 NUMERIC(4,2),
    assessment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_assessments_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
```

---

## 3. Tabel Assessment_Details

*Menyimpan jawaban per pertanyaan (raw score)*

```sql
CREATE TABLE assessment_details (
    id BIGSERIAL PRIMARY KEY,
    assessment_id INT NOT NULL,
    question_code VARCHAR(10) NOT NULL,
    score INT NOT NULL
        CHECK (score BETWEEN 0 AND 5),
    CONSTRAINT fk_details_assessment
        FOREIGN KEY (assessment_id)
        REFERENCES assessments(id)
        ON DELETE CASCADE
);
```

---

## 4. Tabel Knowledge_Base

*Menyimpan artikel dan informasi COBIT*

```sql
CREATE TABLE knowledge_base (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50),
    author_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_kb_author
        FOREIGN KEY (author_id)
        REFERENCES users(id)
        ON DELETE SET NULL
);
```

---

## 5. Relasi Antar Tabel

* **users → assessments** (One-to-Many)
  Satu auditor dapat melakukan banyak assessment.

* **assessments → assessment_details** (One-to-Many)
  Satu assessment memiliki banyak jawaban pertanyaan.

* **users → knowledge_base** (One-to-Many, opsional)
  Admin dapat menulis banyak artikel knowledge base.

---

## 6. Dukungan terhadap Kebutuhan Sistem

Skema PostgreSQL ini mendukung:

* Penyimpanan data pengguna secara aman dan terstruktur
* Penyimpanan laporan historis per proyek audit
* Analisis ulang dan audit trail karena data mentah disimpan terpisah
* Integrasi langsung dengan backend modern (Next.js API, Supabase, Prisma, dll)

Struktur ini siap digunakan baik untuk kebutuhan akademik maupun implementasi produksi.
