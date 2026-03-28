# 📂 Panduan Instalasi Lanpeg-Desa (Portal Digital Desa Terintegrasi)

Selamat datang di Sistem Manajemen Desa **Lanpeg-Desa**. Panduan ini akan membantu Anda menjalankan aplikasi dari awal hingga siap digunakan (Production-Ready).

---

## 🛠️ Prasyarat (Requirements)

Sebelum memulai, pastikan perangkat Anda sudah terpasang:

1.  **PHP** `^8.1` atau `8.2` (dengan ekstensi: `bcmath`, `ctype`, `fileinfo`, `json`, `mbstring`, `openssl`, `pdo`, `tokenizer`, `xml`).
2.  **Node.js** `^18.x` atau `20.x` (LTS).
3.  **npm** (Bawaan Node.js).
4.  **Composer** `^2.x`.
5.  **Database Server**: MySQL atau MariaDB.

---

## 📦 Langkah Instalasi (Step-by-Step)

### 1. Ekstrak & Masuk ke Folder Project
Pastikan terminal Anda sudah berada di root direktori project:
```powershell
cd Lanpeg-Desa
```

### 2. Instalasi Paket Backend
Jalankan composer untuk mengunduh semua library Laravel:
```powershell
composer install
```

### 3. Instalasi Paket Frontend
Jalankan npm untuk mengunduh semua library React & Animasi (Framer Motion, Recharts, Lucide-React):
```powershell
npm install
```

### 4. Konfigurasi Lingkungan (`.env`)
Salin file konfigurasi contoh dan buat file `.env` baru:
```powershell
cp .env.example .env
```
Setelah itu, buka file `.env` dan sesuaikan nama database, username, dan password Anda:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=lanpeg_desa
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Generate Application Key
```powershell
php artisan key:generate
```

### 6. Migrasi Database & Seeding Data
Jalankan migrasi untuk membuat tabel dan mengisi data awal (admin & statistik):
```powershell
php artisan migrate --seed
```

### 7. Hubungkan Storage Link (Wajib)
Penting agar gambar berita dan foto-foto profil desa muncul:
```powershell
php artisan storage:link
```

---

## 🚀 Cara Menjalankan Aplikasi

Anda harus membuka **dua tab terminal** untuk menjalankan server secara bersamaan:

**Tab 1 (Server PHP):**
```powershell
php artisan serve
```

**Tab 2 (Server Vite/Frontend):**
```powershell
npm run dev
```

Akses aplikasi melalui: `http://127.0.0.1:8000/`

---

## 🔐 Informasi Login Admin Default

*   **URL Portal Admin:** `/login`
*   **Email:** `admin@desa.id`
*   **Password:** `admin123`

---

## 📝 Catatan Penting
*   Jika Anda mengaktifkan **Production Mode**, jalankan `npm run build` untuk kompilasi file aset.
*   Pastikan folder `storage` dan `bootstrap/cache` memiliki izin tulis (writable).

---
**Powered by Lanpeg Digital Ecosystem**
