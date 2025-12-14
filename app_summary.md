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
1️⃣ Landing Page – index.html

Menampilkan informasi aplikasi, manfaat, dan konsep COBIT 5

Navigasi ke:

Login

Register

2️⃣ Autentikasi – login.html & register.html

Register
Pengguna baru mengisi data akun dan profil perusahaan

Login
Sistem memverifikasi username dan password
Jika valid → diarahkan ke Dashboard

3️⃣ Dashboard Utama – dasboard.html

Menampilkan ringkasan statistik audit

Tombol Mulai Assessment Baru

4️⃣ Proses Assessment

Pengguna memasukkan Nama Proyek / Klien

Mengisi kuesioner MEA01, MEA02, MEA03

Memilih skor 0–5 untuk setiap pertanyaan

Klik Selesai & Hitung Hasil

5️⃣ Hasil & Laporan

Sistem menampilkan:

Skor maturity level (contoh: 3.5 – Established)

Radar Chart visual

Rekomendasi perbaikan

Data otomatis tersimpan ke database dan dapat diakses di Riwayat Laporan

4. Rancangan Skema Database (MySQL)
-- 1. Tabel Users (Menyimpan data pengguna/auditor)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    company_name VARCHAR(100), -- Dari input form register
    phone_number VARCHAR(20),  -- Dari input form register
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Tabel Assessments (Header untuk setiap sesi audit/proyek)
CREATE TABLE assessments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    project_name VARCHAR(150) NOT NULL, -- Contoh: "Audit PT ABC Q3 2025"
    overall_score DECIMAL(4, 2), -- Skor rata-rata akhir (misal: 3.45)
    score_mea01 DECIMAL(4, 2),   -- Skor rata-rata domain MEA01
    score_mea02 DECIMAL(4, 2),   -- Skor rata-rata domain MEA02
    score_mea03 DECIMAL(4, 2),   -- Skor rata-rata domain MEA03
    assessment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Tabel Assessment_Details (Menyimpan jawaban per pertanyaan)
-- Ini memungkinkan analisis detail per butir pertanyaan
CREATE TABLE assessment_details (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    assessment_id INT NOT NULL,
    question_code VARCHAR(10) NOT NULL, -- Contoh: 'MEA01.01', 'MEA02.03'
    score INT NOT NULL, -- Nilai 0 sampai 5
    FOREIGN KEY (assessment_id) REFERENCES assessments(id) ON DELETE CASCADE
);

-- 4. Tabel Knowledge_Base (Untuk fitur artikel/info COBIT)
CREATE TABLE knowledge_base (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50), -- Misal: 'Artikel', 'Studi Kasus'
    author_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

Relasi Antar Tabel

users → assessments (One-to-Many)
Satu auditor dapat melakukan banyak assessment

assessments → assessment_details (One-to-Many)
Satu assessment memiliki banyak jawaban pertanyaan

Skema ini mendukung kebutuhan sistem untuk:

Menyimpan data pengguna yang aman.

Membuat laporan historis (karena data assessment disimpan terpisah per proyek).

Menghitung ulang statistik jika diperlukan karena data mentah (raw score per pertanyaan) disimpan di assessment_details.