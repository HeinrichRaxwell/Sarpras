# Design System Specification
## SaranaPrasana Admin Dashboard (Stitch Project 8744053701019094011)
### Design Theme: Sarana Enterprise Ops

Dokumentasi resmi token desain antarmuka berbasis Google Stitch Project ID `8744053701019094011`.

---

## 1. Fondasi Arsitektur Desain
* **Platform:** Web Back-Office (Desktop-first, Fluid Adaptive Grid)
* **Karakter Visual:** Corporate Modernism berpadu dengan ketajaman developer-tooling (gaya Linear / Stripe)
* **Kontras Struktural:** Bilah navigasi samping bernuansa Dark Slate Navy (#101828) membungkus kanvas ruang kerja terang (#F5F7FB)
* **Elevasi & Kedalaman:** Border hairline 1px (#E6EAF0), ambient soft shadows tanpa drop shadow berat

---

## 2. Palet Warna Baku (Color Palette Tokens)

| Token Peran | Nilai HEX | Penggunaan & Konteks Antarmuka |
| :--- | :--- | :--- |
| **Shell Primary (Sidebar)** | `#101828` | Latar belakang bilah navigasi vertikal tetap (Dark Slate Navy) |
| **Shell Elevated (Active Nav)** | `#18243A` | Kontainer menu aktif dan item terpilih di sidebar |
| **Shell Border** | `#22314E` | Garis pemisah struktural pada panel sidebar |
| **Workspace Canvas** | `#F5F7FB` | Latar belakang ruang kerja utama (Cool Grey-Blue) |
| **Surface Level 1 (Cards & Tables)** | `#FFFFFF` | Latar belakang kontainer kartu, tabel data, dan modal dialog |
| **Surface Level 2 (Headers & Wells)** | `#F8FAFC` | Header tabel, background input pencarian, dan panel sekunder |
| **Divider & Border** | `#E6EAF0` | Garis batas 1px pada kartu dan pemisah sel tabel |
| **Primary Operational** | `#3B82F6` | Tombol aksi primer (+ Tambah Aset, + Transaksi), border aktif |
| **Primary Hover** | `#2563EB` | State hover tombol primer |
| **Secondary Analytical** | `#6366F1` | Aksen analitik, grafik komparasi, dan visualisasi kategori |
| **Success / Operable** | `#10B981` | Status Baik, badge Sistem Siap, tren pertumbuhan positif |
| **Warning / Maintenance** | `#F59E0B` | Status Pemeliharaan, peringatan servis berkala |
| **Critical / Defect** | `#EF4444` | Status Rusak / Kendala Kritis, tombol hapus massal |
| **Text Title / Headings** | `#141B2C` | Teks judul utama halaman, angka metrik KPI (Slate 900) |
| **Text Body** | `#334155` | Isi sel tabel, teks deskripsi, dan paragraf |
| **Text Muted** | `#64748B` | Label sekunder, placeholder formulir, dan penanda waktu |

---

## 3. Tipografi (Typography Hierarchy)

* **Display & Headings:** `Plus Jakarta Sans` (Geometric modern sans-serif)
  - Display Hero: 36px / Bold 700
  - Headline Large: 24px / SemiBold 600 (Judul Halaman Dashboard & Data Aset)
  - Headline Medium: 20px / SemiBold 600 (Judul Kartu Widget)
  - Headline Small: 16px / SemiBold 600 (Label Metrik & Sub-panel)
* **Body, Input & Tabular:** `Inter` (Optimized for dense UI data)
  - Body Large: 16px / Regular 400
  - Body Medium: 14px / Regular 400 & Medium 500 (Isi Tabel & Form Input)
  - Body Small: 13px / Regular 400 (Teks Keterangan & Sub-label)
  - Label Medium: 12px / Medium 500 (Badge Pill & Status)
  - Label XS: 11px / SemiBold 600 (Kategori Tag & Header Tabel)
* **Angka Tabular:** Enforced `font-variant-numeric: tabular-nums` pada seluruh nilai Rupiah, kuantitas inventaris, dan kode nomor inventaris.

---

## 4. Komponen Antarmuka Terstandarisasi

1. **Tombol Primer (Primary Action):**
   Tinggi 38px / 40px, latar `#3B82F6`, teks `#FFFFFF`, radius 6px/8px, hover `#2563EB`, aktif scale(0.99).
2. **Tombol Sekunder (Outline Button):**
   Tinggi 38px, latar `#FFFFFF`, border 1px `#E6EAF0`, teks `#101828`, hover latar `#F8FAFC`.
3. **Bilah Aksi Massal (Bulk Action Bar):**
   Kontainer melayang kontras tinggi saat baris tabel dipilih (Cetak Barcode, Mutasi Lokasi, Jadwalkan Servis, Hapus Masal).
4. **Badge Status Kondisi:**
   - Baik: Background `#ECFDF5`, teks `#047857`, dot indikator 6px `#10B981`
   - Pemeliharaan: Background `#FFFBEB`, teks `#B45309`, dot indikator 6px `#F59E0B`
   - Rusak: Background `#FEF2F2`, teks `#B91C1C`, dot indikator 6px `#EF4444`
