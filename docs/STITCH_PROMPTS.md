# Kumpulan Prompt Terstruktur Google Stitch & Figma (SIM-Sarpras)
Dibuat sesuai kaidah skill enhance-prompt, anti-slop-ui-prompting, dan prompt-engineering.

---

## Prompt 1: Halaman Login Admin (Split-Screen Modern)

Salin prompt berikut langsung ke Google Stitch atau Figma AI:

```text
Admin Back-Office Split-Screen Login Page for Institutional Facility Management (SIM-Sarpras).

DESIGN SYSTEM (REQUIRED):
- Platform: Web, Desktop-first, fully responsive to mobile
- Theme: Clean Material Design with high contrast (WCAG AA)
- Background: Canvas Slate (#F8FAFC)
- Primary Accent: Indigo Blue (#4F46E5) for primary sign-in action button
- Card Surface: Crisp White (#FFFFFF) with 1px border (#E2E8F0) and soft shadow
- Typography: Plus Jakarta Sans for UI labels, JetBrains Mono for ID input
- Zero emojis, precision monochrome SVG icons only

Page Structure:
1. Left Panel (50% Width): High-resolution modern architectural photography background with deep institutional navy overlay (#0A1128). Displays white vector logo mark for SIM-Sarpras, bold display headline 'Sistem Manajemen Sarana & Prasarana', and short descriptive caption explaining centralized campus asset governance.
2. Right Panel (50% Width): Clean centered authentication card (max-width 400px).
   - Brand header with small application title and subtitle 'Masuk ke Panel Pengelola'
   - Form field for NIP / Username with icon prefix
   - Form field for Password with right-aligned reveal eye toggle icon
   - Remember Me checkbox aligned left, 'Lupa Kata Sandi?' link aligned right
   - Full-width solid primary button 'Masuk ke Sistem' (#4F46E5) with subtle active press effect
   - Quick Demo Access pill badge below form ('Akun Demo: admin / admin123')
3. Footer: Institutional copyright text and system build version in subtle muted slate (#64748B).
```

---

## Prompt 2: Halaman Dashboard Eksekutif (Command Center)

```text
Executive Asset Management Dashboard for School and Institutional Infrastructure (SIM-Sarpras).

DESIGN SYSTEM (REQUIRED):
- Platform: Web, Desktop-first with fluid grid collapse
- Theme: Clean Enterprise SaaS Material Design
- Sidebar: Deep Navy (#0A1128) persistent vertical rail with active indicator in Indigo (#4F46E5)
- Canvas Background: Slate 50 (#F8FAFC)
- Card Containers: Pure White (#FFFFFF) with 1px hairline border (#E2E8F0)
- Status Palette: Emerald (#10B981) for Baik, Amber (#F97316) for Perawatan, Rose (#EF4444) for Rusak
- Typography: Plus Jakarta Sans for headers, JetBrains Mono for numerical data and metrics

Page Structure:
1. Top Command Bar:
   - Left: Sidebar collapse toggle button and breadcrumb path ('Dashboard / Ringkasan')
   - Center: Quick search input with magnifying glass icon ('Cari aset, ruangan, nomor seri...')
   - Right: Real-time system date pill, Light/Dark theme toggle button, and Admin profile dropdown with avatar chip
2. Top Metric Row (4 KPI Cards in 4-column grid):
   - Card 1: Total Aset (Value: 1,420, trend badge: +12 bulan ini)
   - Card 2: Kondisi Baik (Value: 1,150, Emerald badge: 81% Siap Pakai)
   - Card 3: Dalam Perawatan (Value: 185, Amber badge: Sedang Dikerjakan)
   - Card 4: Rusak Berat (Value: 85, Rose badge: Butuh Tindakan Segera)
3. Analytics Row (2-column layout):
   - Left Card (60% width): Vertical Bar Chart showing 'Distribusi Kategori Aset' (IT & Komputer, Laboratorium, Elektronik, Furnitur, Kendaraan)
   - Right Card (40% width): Donut Chart showing 'Proporsi Kondisi Kelayakan Aset' with clean right-aligned legend
4. Recent Activity Table (Full width card):
   - Header: 'Sirkulasi & Pemeliharaan Terkini' with 'Lihat Semua' link
   - Columns: Kode Aset (monospace), Nama Barang, Ruangan, Status Kelayakan (color-coded pill), Waktu Update, dan Aksi Detail
```

---

## Prompt 3: Halaman Data Master Inventaris (Dense Data Grid)

```text
Enterprise Master Asset Inventory Data Grid for Facility Management (SIM-Sarpras).

DESIGN SYSTEM (REQUIRED):
- Platform: Web, Desktop-first with horizontal scroll protection
- Theme: Clean Material Design with tabular information density
- Background: Slate 50 (#F8FAFC), Card: Pure White (#FFFFFF)
- Primary Accent: Indigo (#4F46E5), Hairline Border: Slate 200 (#E2E8F0)
- Typography: Plus Jakarta Sans for controls, JetBrains Mono for asset codes and dates

Page Structure:
1. Command Header Bar:
   - Page title 'Data Master Sarana & Prasarana' with subtitle 'Daftar seluruh aset terdaftar dan status fisiknya'
   - Right actions: Secondary button 'Export CSV' and Primary CTA '+ Tambah Aset Baru' (#4F46E5)
2. Filter & Search Toolbar (Single row card):
   - Search input (width 320px) with live search placeholder
   - Category dropdown filter (Semua Kategori, Komputer, Elektronik, Furnitur)
   - Location dropdown filter (Semua Gedung, Lab RPL, Ruang Guru, Aula)
   - Condition filter tabs (Semua, Baik, Perawatan, Rusak)
   - Reset Filter button
3. Master Data Table (Inside rounded card with overflow-x auto):
   - Sticky header row with sorting arrows on each column
   - Column 1: Checkbox multi-select
   - Column 2: Kode Inventaris (JetBrains Mono, e.g. AST-LAB-001)
   - Column 3: Nama Aset & Spesifikasi Singkat
   - Column 4: Kategori
   - Column 5: Lokasi / Ruangan Penempatan
   - Column 6: Status Kondisi (Full rounded pill badge with semantic color)
   - Column 7: Tanggal Perolehan
   - Column 8: Action icons cluster (Detail view, Edit form, Delete with confirm modal)
4. Table Footer Pagination:
   - Left: Information text 'Menampilkan 1 - 10 dari 248 data aset'
   - Right: Rows-per-page selector (10, 25, 50) and numbered page buttons (Previous, 1, 2, 3, Next)
```

---

## Prompt 4: Formulir Registrasi & Edit Aset (Two-Column Form)

```text
Two-Column Asset Registration and Technical Intake Form for Facility Management (SIM-Sarpras).

DESIGN SYSTEM (REQUIRED):
- Platform: Web, Desktop-first form layout
- Theme: Clean Material Design with visual field hierarchy
- Background: Slate 50 (#F8FAFC), Form Surface: Pure White (#FFFFFF)
- Accent: Indigo (#4F46E5), Danger: Rose (#EF4444) for validation errors
- Typography: Plus Jakarta Sans for inputs, JetBrains Mono for system generated codes

Page Structure:
1. Header: Breadcrumbs ('Data Master / Registrasi Aset') and title 'Tambah Sarpras Baru'
2. Left Column (60% width - Technical Metadata Fields):
   - Asset Identification Card: Nama Aset input with required asterisk, Kode Inventaris (auto-generated preview), Kategori dropdown
   - Location & Placement Card: Gedung dropdown, Ruangan dropdown, Nama Penanggung Jawab
   - Procurement Details: Tanggal Perolehan (Date picker), Nilai Pengadaan (Rupiah currency prefix), Sumber Dana (BOS/Yayasan)
   - Physical Condition Radio Group: Baik, Rusak Ringan, Rusak Berat
3. Right Column (40% width - Multimedia & Summary Preview):
   - Drag-and-drop Image Upload Zone with upload cloud icon, file type guidelines (JPG/PNG max 2MB)
   - Real-time Image Preview Box with 16:9 aspect ratio and delete photo button
   - Live Inventory Tag Preview Card showing mini QR code simulation and asset details
4. Sticky Form Action Footer Bar:
   - Cancel button (Outline white/slate)
   - Reset button
   - Primary Save button 'Simpan Data Aset' (#4F46E5) with checkmark icon
```

---

## Prompt 5: Halaman Laporan & Kartu Inventaris Ruangan (KIR Printable)

```text
Formal Asset Reporting and Room Inventory Card (KIR) Printable View (SIM-Sarpras).

DESIGN SYSTEM (REQUIRED):
- Platform: Web with dedicated @media print CSS optimization
- Theme: Clean Enterprise SaaS in screen view, Official Monochrome in print view
- Background: Slate 50 (#F8FAFC)
- Action Accent: Indigo (#4F46E5)

Page Structure:
1. Screen Control Bar (Hidden on print):
   - Ruangan / Unit selector dropdown (e.g. 'Laboratorium Komputer 1')
   - Date range picker for procurement period
   - Primary CTA button 'Cetak Dokumen KIR' (Triggers window.print with print icon)
   - Secondary button 'Download PDF'
2. Official Document Canvas (A4 Landscape aspect ratio):
   - Institutional Header: Official school letterhead styling (Kop Surat) with institution name, address, and document title 'KARTU INVENTARIS RUANGAN (KIR)'
   - Metadata Block: Nama Ruangan, Nomor Kode Ruangan, Nama Gedung, Penanggung Jawab Ruangan
   - Ledger Table: Nomor, Kode Barang, Nama Barang / Merk, Tahun Pengadaan, Jumlah Barang, Kondisi (Baik / Kurang Baik / Rusak Berat), Keterangan
   - Dual Signature Block at bottom:
     * Left side: Mengetahui, Kepala Sarana dan Prasarana
     * Right side: Pengelola / Penanggung Jawab Ruangan
     * Authentic signature space with printed names and NIP
```
