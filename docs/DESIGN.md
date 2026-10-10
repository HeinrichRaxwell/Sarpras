# Design System Specification
## SaranaPrasana - Asset Management (v1.0.0)

Standar acuan desain antarmuka berbasis Clean Enterprise UI & Material Architecture sesuai spesifikasi resmi:

---

## 1. Color Palette Tokens

| Nama Token | HEX Code | CSS Variable | Peran & Penggunaan |
| :--- | :--- | :--- | :--- |
| **Primary** | `#1F46E5` | `--color-primary` | Warna utama tombol CTA, state aktif navigasi, dan aksen fokus. |
| **Secondary** | `#06B6D4` | `--color-secondary` | Aksen grafis, grafik pendukung, dan badge informasi. |
| **Accent** | `#F59E0B` | `--color-accent` | Penanda visual sekunder, sorotan kartu metrik. |
| **Success** | `#10B981` | `--color-success` | Kondisi aset Baik, pertumbuhan positif, status Disetujui. |
| **Warning** | `#F97316` | `--color-warning` | Status Dalam Perawatan, tiket pemeliharaan aktif. |
| **Danger** | `#EF4444` | `--color-danger` | Status Aset Rusak, tombol hapus, modal konfirmasi kritis. |
| **Background** | `#F8FAFC` | `--color-bg-canvas` | Latar belakang kanvas ruang kerja (Slate 50). |
| **Sidebar** | `#1E293B` | `--color-sidebar-bg` | Bilah navigasi vertikal samping (Dark Slate Navy). |
| **Text Primary** | `#0F172A` | `--color-text-title` | Judul utama, angka metrik KPI, teks sel tabel tebal. |
| **Text Secondary** | `#64748B` | `--color-text-muted` | Subjudul, label sekunder, placeholder formulir. |

---

## 2. Typography Scale (Inter Font Family)

Font keluarga tunggal: **Inter** (`sans-serif`), dioptimalkan untuk keterbacaan data tabel dan formulir administratif.

* **Bold (24px):** Judul halaman utama (`h1.page-title`, Dashboard & Master Data).
* **Semibold (18px):** Subjudul bagian kartu data dan modal dialog heading.
* **Medium (16px):** Label item navigasi sidebar dan judul widget.
* **Regular (14px):** Teks paragraf, isi sel tabel, dan input formulir.
* **Caption (12px):** Label kecil, timestamp log aktivitas, dan teks bantuan formulir.

---

## 3. Komponen Antarmuka Terstandarisasi

### A. Tombol (Buttons)
* **Button Primary:** Latar `#1F46E5`, teks `#FFFFFF`, tinggi 38px, radius 8px, padding 0 16px.
* **Button Secondary:** Latar `#FFFFFF`, border 1px solid `#E2E8F0`, teks `#334155`.
* **Button Danger:** Latar `#EF4444`, teks `#FFFFFF`, untuk aksi destruktif.
* **Button Success:** Latar `#10B981`, teks `#FFFFFF`, untuk aksi persetujuan.

### B. Status Badges (Pills)
* **Kondisi Baik:** Background `rgba(16, 185, 129, 0.12)`, teks `#10B981`, radius 9999px.
* **Dalam Perawatan:** Background `rgba(249, 115, 22, 0.12)`, teks `#F97316`, radius 9999px.
* **Rusak:** Background `rgba(239, 68, 68, 0.12)`, teks `#EF4444`, radius 9999px.

### C. Kartu Metrik (Summary KPI Cards)
* Background `#FFFFFF`, border 1px solid `#E2E8F0`, padding 20px, radius 12px, soft ambient shadow.

---

## 4. Checklist 8 Fitur Utama Sistem
1. Dashboard interaktif (chart dan statistik)
2. Data master aset (tabel dan aksi CRUD)
3. Form input dan edit dengan validasi JavaScript
4. Laporan dan detail aset (cetak A4 / unduh)
5. Sidebar responsif dan toggle drawer
6. Modal konfirmasi hapus (destructive guard)
7. Notifikasi dan indikator status real-time
8. Desain modern clean enterprise dengan subtle glassmorphism
