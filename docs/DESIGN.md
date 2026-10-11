# Design System Specification
## SaranaPrasana - Asset Management (v2.0.0)

Dokumen ini mendefinisikan seluruh Design Tokens, tipografi, palet warna, komponen UI, dan standar interaktivitas yang diterapkan secara kanonikal di assets/css/style.css.

---

## 1. Color Palette Tokens

| Peran | Hex Code | Penggunaan |
|---|---|---|
| Primary | #1F46E5 | Tombol utama, menu aktif, badge brand, fokus |
| Primary Hover | #1A3BC4 | Interaksi hover tombol primer |
| Secondary | #06B6D4 | Aksen info, indikator visual pelengkap |
| Success | #10B981 | Status aset Baik, tren positif |
| Warning | #F59E0B | Status Dalam Perawatan, peringatan |
| Danger | #EF4444 | Status Aset Rusak, tombol hapus destruktif |
| Canvas Background | #F8FAFC | Latar belakang area kerja |
| Surface Card | #FFFFFF | Kartu metrik, panel tabel, modal |
| Sidebar Background | #1E293B | Latar bilah navigasi kiri (Dark Slate Navy) |
| Sidebar Border | #334155 | Garis pemisah sidebar dan kartu profil |
| Text Primary | #0F172A | Judul halaman, nama aset, label tabel |
| Text Secondary | #334155 | Teks isi deskriptif |
| Text Muted | #64748B | Label sekunder, tanggal, timestamp |
| Text Subtle | #94A3B8 | Kategori menu navigasi (MENU UTAMA) |

---

## 2. Typography

- Font Family Display & UI: 'Inter', system-ui, -apple-system, sans-serif
- Font Family Monospace / Kode: 'JetBrains Mono', Consolas, monospace (digunakan pada Nomor Inventaris seperti A-001)

### Skala Tipografi:
- Page Title: 24px, Bold (700), Line-height 1.2
- Card Title: 16px, Bold (700)
- Body Regular: 14px, Regular (400)
- Table Header: 12px, Semi-Bold (600), Uppercase
- Caption / Label Kategori: 11px, Bold (700), Letter-spacing 0.08em

---

## 3. Komponen UI Kanonikal

### 3.1 Modal Dialog (Satu Pintu Tambah Data)
- Overlay: Posisi fixed, latar belakang rgba(15, 23, 42, 0.55), backdrop-filter blur 4px, z-index 9999.
- Dialog Box: Radius 16px, latar #FFFFFF, bayangan elevasi tinggi (box-shadow modal), max-width 540px.
- Animasi: Transisi fade-in dan scale-up 0.2s cubic-bezier.

### 3.2 Tabel Data Master
- Header tabel: Latar #F1F5F9, font 12px huruf kapital, garis batas bawah 1px #E2E8F0.
- Baris tabel: Hover latar rgba(241, 245, 249, 0.6), padding 14px 18px.
- Status Badge: Pill berkontur (Baik: hijau lembut, Dalam Perawatan: amber lembut, Rusak: merah lembut).

### 3.3 Kartu KPI & Widget Analitik
- Latar putih, border 1px #E2E8F0, radius 16px, padding 20px.
- Elevasi hover halus translateY(-2px).
- Nilai angka besar (26px Extra-Bold) tabular-nums.
