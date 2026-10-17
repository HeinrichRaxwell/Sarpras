-- Skema Basis Data SaranaPrasana Asset Management v3.0.0
-- Enterprise Edition: Lifecycle, Depreciation, Logistics, Movement, & Security
-- Engine: PostgreSQL 16
-- Database: saranaprasana (Port: 5435)

DROP TABLE IF EXISTS penghapusan_aset CASCADE;
DROP TABLE IF EXISTS pemeliharaan_preventif CASCADE;
DROP TABLE IF EXISTS mutasi_aset CASCADE;
DROP TABLE IF EXISTS peminjaman CASCADE;
DROP TABLE IF EXISTS gudang_transit CASCADE;
DROP TABLE IF EXISTS transaksi CASCADE;
DROP TABLE IF EXISTS pengguna CASCADE;
DROP TABLE IF EXISTS aset CASCADE;
DROP TABLE IF EXISTS supplier CASCADE;
DROP TABLE IF EXISTS lokasi CASCADE;
DROP TABLE IF EXISTS kategori CASCADE;

-- 1. Tabel Kategori Aset
CREATE TABLE kategori (
    id_kategori VARCHAR(50) PRIMARY KEY,
    nama_kategori VARCHAR(100) NOT NULL,
    default_masa_manfaat INT DEFAULT 5,
    keterangan TEXT
);

-- 2. Tabel Lokasi Penempatan
CREATE TABLE lokasi (
    id_lokasi VARCHAR(50) PRIMARY KEY,
    nama_gedung VARCHAR(100) NOT NULL,
    nama_ruangan VARCHAR(100) NOT NULL,
    penanggung_jawab VARCHAR(150)
);

-- 3. Tabel Rekanan / Supplier
CREATE TABLE supplier (
    id_supplier VARCHAR(50) PRIMARY KEY,
    nama_supplier VARCHAR(150) NOT NULL,
    kontak VARCHAR(100)
);

-- 4. Tabel Data Master Aset (Enriched with Depreciation & Status)
CREATE TABLE aset (
    id_aset VARCHAR(50) PRIMARY KEY,
    nama_aset VARCHAR(150) NOT NULL,
    id_kategori VARCHAR(50) REFERENCES kategori(id_kategori) ON UPDATE CASCADE,
    id_lokasi VARCHAR(50) REFERENCES lokasi(id_lokasi) ON UPDATE CASCADE,
    id_supplier VARCHAR(50) REFERENCES supplier(id_supplier) ON UPDATE CASCADE,
    kondisi VARCHAR(50) NOT NULL CHECK (kondisi IN ('Baik', 'Dalam Perawatan', 'Rusak', 'Rusak Total (Afkir)', 'Dihapuskan')),
    status_operasional VARCHAR(50) NOT NULL DEFAULT 'Aktif' CHECK (status_operasional IN ('Aktif', 'Transit', 'Dipinjam', 'Dihapuskan')),
    tanggal_perolehan DATE NOT NULL,
    nilai_perolehan NUMERIC(15, 2) NOT NULL,
    masa_manfaat INT NOT NULL DEFAULT 5,
    nilai_residu NUMERIC(15, 2) NOT NULL DEFAULT 0,
    keterangan TEXT
);

-- 5. Tabel Gudang Transit (Pre-Inventory & Goods Receipt)
CREATE TABLE gudang_transit (
    id_transit VARCHAR(50) PRIMARY KEY,
    nama_barang VARCHAR(150) NOT NULL,
    kategori VARCHAR(100) NOT NULL,
    supplier VARCHAR(150) NOT NULL,
    nomor_surat_jalan VARCHAR(100),
    tanggal_terima DATE NOT NULL DEFAULT CURRENT_DATE,
    jumlah_unit INT NOT NULL DEFAULT 1,
    harga_satuan NUMERIC(15, 2) NOT NULL,
    status_qc VARCHAR(50) NOT NULL DEFAULT 'Perlu Pengecekan' CHECK (status_qc IN ('Lolos QC', 'Perlu Pengecekan', 'Retur')),
    catatan_qc TEXT
);

-- 6. Tabel Peminjaman Aset (Loan & Custody Tracking)
CREATE TABLE peminjaman (
    id_pinjam VARCHAR(50) PRIMARY KEY,
    id_aset VARCHAR(50) REFERENCES aset(id_aset) ON UPDATE CASCADE,
    nama_peminjam VARCHAR(150) NOT NULL,
    identitas_peminjam VARCHAR(100) NOT NULL,
    unit_peminjam VARCHAR(150) NOT NULL,
    tanggal_pinjam DATE NOT NULL DEFAULT CURRENT_DATE,
    tanggal_rencana_kembali DATE NOT NULL,
    tanggal_realisasi_kembali DATE,
    keperluan TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Dipinjam' CHECK (status IN ('Dipinjam', 'Sudah Kembali'))
);

-- 7. Tabel Mutasi Aset (Location & Custody Transfer)
CREATE TABLE mutasi_aset (
    id_mutasi VARCHAR(50) PRIMARY KEY,
    id_aset VARCHAR(50) REFERENCES aset(id_aset) ON UPDATE CASCADE,
    lokasi_asal VARCHAR(150) NOT NULL,
    lokasi_tujuan VARCHAR(150) NOT NULL,
    pj_asal VARCHAR(150) NOT NULL,
    pj_tujuan VARCHAR(150) NOT NULL,
    tanggal_mutasi DATE NOT NULL DEFAULT CURRENT_DATE,
    alasan_mutasi TEXT NOT NULL
);

-- 8. Tabel Pemeliharaan Preventif (Schedules & Reminders)
CREATE TABLE pemeliharaan_preventif (
    id_jadwal VARCHAR(50) PRIMARY KEY,
    id_aset VARCHAR(50) REFERENCES aset(id_aset) ON UPDATE CASCADE,
    kegiatan VARCHAR(200) NOT NULL,
    frekuensi_hari INT NOT NULL DEFAULT 90,
    tanggal_terakhir DATE,
    tanggal_jatuh_tempo DATE NOT NULL,
    vendor VARCHAR(150),
    status VARCHAR(50) NOT NULL DEFAULT 'Jadwal Aktif'
);

-- 9. Tabel Penghapusan Aset (Disposal, Auction, Write-Off)
CREATE TABLE penghapusan_aset (
    id_penghapusan VARCHAR(50) PRIMARY KEY,
    id_aset VARCHAR(50) NOT NULL,
    nama_aset VARCHAR(150) NOT NULL,
    nilai_perolehan_awal NUMERIC(15, 2) NOT NULL,
    nilai_buku_akhir NUMERIC(15, 2) NOT NULL DEFAULT 0,
    metode_penghapusan VARCHAR(50) NOT NULL CHECK (metode_penghapusan IN ('Lelang Umum', 'Hibah Sosial', 'Kanibalisasi Suku Cadang', 'Pemusnahan Fisik (Scrap)')),
    nomor_sk VARCHAR(100) NOT NULL,
    tanggal_penghapusan DATE NOT NULL DEFAULT CURRENT_DATE,
    nilai_lelang NUMERIC(15, 2) DEFAULT 0,
    keterangan TEXT
);

-- 10. Tabel Pengguna (RBAC Security)
CREATE TABLE pengguna (
    id_pengguna VARCHAR(50) PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nama_lengkap VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('Super Admin', 'Staf Sarpras', 'Pimpinan')),
    status VARCHAR(50) NOT NULL DEFAULT 'Aktif' CHECK (status IN ('Aktif', 'Nonaktif')),
    tanggal_dibuat DATE NOT NULL DEFAULT CURRENT_DATE
);

-- SEED DATA
INSERT INTO kategori (id_kategori, nama_kategori, default_masa_manfaat, keterangan) VALUES
('KOMP', 'Komputer', 4, 'Perangkat keras pemrosesan data, server, dan workstation'),
('ELK', 'Elektronik', 5, 'Peralatan audio visual, pendingin udara, dan display'),
('KDR', 'Kendaraan', 8, 'Kendaraan dinas operasional kampus dan kurir'),
('FUR', 'Furniture', 8, 'Meja kerja, kursi ergonomis, lemari berkas, dan partisi'),
('SAR', 'Sarana Umum', 10, 'Alat pemadam api ringan, genset, dan kelengkapan umum');

INSERT INTO lokasi (id_lokasi, nama_gedung, nama_ruangan, penanggung_jawab) VALUES
('LOK-001', 'Gedung A', 'Ruang 101', 'Ahmad Subarjo, S.Kom.'),
('LOK-002', 'Gedung A', 'Ruang Admin', 'Siti Rahma, A.Md.'),
('LOK-003', 'Gedung A', 'Ruang Dosen', 'Budi Santoso, M.Kom.'),
('LOK-004', 'Gedung A', 'Ruang Tata Usaha', 'Dewi Lestari, S.E.'),
('LOK-005', 'Gedung B', 'Lab Komputer 1', 'Hendra Wijaya, S.Kom.'),
('LOK-006', 'Gedung B', 'Lab Jaringan', 'Rian Hidayat, M.Kom.'),
('LOK-007', 'Gedung B', 'Ruang Rapat', 'Fitri Handayani, S.Pd.'),
('LOK-008', 'Gedung B', 'Auditorium Utama', 'Wahyu Pratama, M.Sn.'),
('LOK-009', 'Gedung C', 'Ruang Server', 'Fajar Nugraha, S.Kom.'),
('LOK-010', 'Luar Gedung', 'Area Parkir', 'Koordinator Keamanan');

INSERT INTO supplier (id_supplier, nama_supplier, kontak) VALUES
('SUP-001', 'PT Lenovo Indonesia', 'sales@lenovo.co.id'),
('SUP-002', 'PT Hewlett Packard Mitra', 'support@hp-mitra.com'),
('SUP-003', 'Dealer Honda Astra Motor', '021-88997766'),
('SUP-004', 'PT Daikin Aircon Pratama', 'service@daikin.co.id'),
('SUP-005', 'CV Kayu Jati Perkasa', '081234567890'),
('SUP-006', 'PT Dell Megatama', 'enterprise@dell.co.id'),
('SUP-007', 'PT Samafitro Canon', 'info@samafitro.co.id'),
('SUP-008', 'PT Asusindo Megah', 'cs@asusindo.co.id'),
('SUP-009', 'CV Ergonomis Indo', 'halo@ergonomis.co.id'),
('SUP-010', 'PT Visual Media Partner', 'proyektor@visualmedia.com');

INSERT INTO aset (id_aset, nama_aset, id_kategori, id_lokasi, id_supplier, kondisi, status_operasional, tanggal_perolehan, nilai_perolehan, masa_manfaat, nilai_residu, keterangan) VALUES
('A-001', 'Laptop Lenovo ThinkPad', 'KOMP', 'LOK-001', 'SUP-001', 'Baik', 'Aktif', '2023-01-12', 14500000.00, 4, 1450000.00, 'Laptop riset mahasiswa dan dosen'),
('A-002', 'Printer HP LaserJet', 'ELK', 'LOK-002', 'SUP-002', 'Baik', 'Aktif', '2023-02-15', 4800000.00, 5, 480000.00, 'Printer laser hitam putih operasional'),
('A-003', 'Motor Honda Beat', 'KDR', 'LOK-010', 'SUP-003', 'Dalam Perawatan', 'Aktif', '2023-03-20', 18500000.00, 8, 1850000.00, 'Operasional kurir antar fakultas'),
('A-004', 'AC Split 1 PK', 'ELK', 'LOK-005', 'SUP-004', 'Baik', 'Aktif', '2023-04-10', 5200000.00, 5, 520000.00, 'Pendingin ruang lab komputer utama'),
('A-005', 'Meja Kerja', 'FUR', 'LOK-003', 'SUP-005', 'Baik', 'Aktif', '2023-05-05', 2100000.00, 8, 210000.00, 'Meja kayu solid sekat kaca'),
('A-006', 'Komputer PC', 'KOMP', 'LOK-006', 'SUP-006', 'Rusak', 'Aktif', '2021-06-18', 8500000.00, 4, 850000.00, 'Motherboard konslet butuh ganti part'),
('A-007', 'Printer Canon', 'ELK', 'LOK-004', 'SUP-007', 'Baik', 'Aktif', '2023-07-22', 3200000.00, 5, 320000.00, 'Printer warna dokumen legalisir'),
('A-008', 'Laptop Asus', 'KOMP', 'LOK-009', 'SUP-008', 'Baik', 'Aktif', '2023-08-14', 11500000.00, 4, 1150000.00, 'Terminal remote monitor server'),
('A-009', 'Kursi Kantor', 'FUR', 'LOK-007', 'SUP-009', 'Baik', 'Aktif', '2020-09-01', 1400000.00, 8, 140000.00, 'Kursi putar hidrolik rapat senat'),
('A-010', 'Proyektor Epson', 'ELK', 'LOK-008', 'SUP-010', 'Dalam Perawatan', 'Aktif', '2023-10-08', 7800000.00, 5, 780000.00, 'Servis lensa optik dan pembersihan filter');

INSERT INTO gudang_transit (id_transit, nama_barang, kategori, supplier, nomor_surat_jalan, tanggal_terima, jumlah_unit, harga_satuan, status_qc, catatan_qc) VALUES
('TRN-001', 'Monitor LED Dell 24 Inci', 'Elektronik', 'PT Dell Megatama', 'SJ-DELL-2026-081', '2026-10-15', 5, 2350000.00, 'Lolos QC', 'Kemasan segel pabrik utuh, uji nyala panel tajam tanpa dead pixel.'),
('TRN-002', 'Router Cisco Gigabit Switch', 'Komputer', 'PT Mitra Jaringan Nusantara', 'SJ-CISCO-8821', '2026-10-16', 2, 6400000.00, 'Perlu Pengecekan', 'Menunggu teknisi lab jaringan untuk pengujian throughput.');

INSERT INTO peminjaman (id_pinjam, id_aset, nama_peminjam, identitas_peminjam, unit_peminjam, tanggal_pinjam, tanggal_rencana_kembali, keperluan, status) VALUES
('PINJAM-001', 'A-008', 'Rian Hidayat, M.Kom.', 'NIDN 0418098901', 'Prodi Teknik Informatika', '2026-10-14', '2026-10-21', 'Kegiatan Akreditasi Program Studi di Gedung Rektorat', 'Dipinjam');

INSERT INTO mutasi_aset (id_mutasi, id_aset, lokasi_asal, lokasi_tujuan, pj_asal, pj_tujuan, tanggal_mutasi, alasan_mutasi) VALUES
('MUT-001', 'A-004', 'Ruang Tata Usaha', 'Lab Komputer 1', 'Dewi Lestari', 'Hendra Wijaya', '2025-08-10', 'Optimalisasi pendingin perangkat komputer riset');

INSERT INTO pemeliharaan_preventif (id_jadwal, id_aset, kegiatan, frekuensi_hari, tanggal_terakhir, tanggal_jatuh_tempo, vendor, status) VALUES
('PM-001', 'A-004', 'Pembersihan filter, cuci evaporator, dan cek tekanan freon', 90, '2026-08-15', '2026-11-15', 'PT Daikin Aircon Pratama', 'Jadwal Aktif'),
('PM-002', 'A-003', 'Ganti oli mesin, oli gardan, dan servis rem', 90, '2026-07-20', '2026-10-20', 'Dealer Honda Astra Motor', 'Mendekati Jatuh Tempo');

INSERT INTO penghapusan_aset (id_penghapusan, id_aset, nama_aset, nilai_perolehan_awal, nilai_buku_akhir, metode_penghapusan, nomor_sk, tanggal_penghapusan, nilai_lelang, keterangan) VALUES
('DSP-001', 'A-000-HIST', 'Komputer Pentium 4 Dual Core', 6500000.00, 0.00, 'Lelang Umum', 'SK-REKTOR/BMN/2025/119', '2025-11-10', 350000.00, 'Usia ekonomis habis (susut 100%), part rusak dan tidak dapat diupgrade.');

INSERT INTO pengguna (id_pengguna, username, password, nama_lengkap, email, role, status, tanggal_dibuat) VALUES
('USR-001', 'admin', 'admin123', 'Super Administrator', 'admin@unpam.ac.id', 'Super Admin', 'Aktif', '2026-01-10'),
('USR-002', 'petugas', 'petugas123', 'Haidar Reyhan', 'haidar@unpam.ac.id', 'Staf Sarpras', 'Aktif', '2026-02-15'),
('USR-003', 'pimpinan', 'pimpinan123', 'Dr. Ir. Atang Susila, M.Eng.', 'atang@unpam.ac.id', 'Pimpinan', 'Aktif', '2026-03-01');
