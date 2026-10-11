-- Skema Basis Data SaranaPrasana Asset Management
-- Engine: PostgreSQL 16
-- Database: saranaprasana

DROP TABLE IF EXISTS transaksi CASCADE;
DROP TABLE IF EXISTS aset CASCADE;
DROP TABLE IF EXISTS supplier CASCADE;
DROP TABLE IF EXISTS lokasi CASCADE;
DROP TABLE IF EXISTS kategori CASCADE;

-- 1. Tabel Kategori Aset
CREATE TABLE kategori (
    id_kategori VARCHAR(50) PRIMARY KEY,
    nama_kategori VARCHAR(100) NOT NULL,
    keterangan TEXT
);

-- 2. Tabel Lokasi Penempatan
CREATE TABLE lokasi (
    id_lokasi VARCHAR(50) PRIMARY KEY,
    nama_gedung VARCHAR(100) NOT NULL,
    nama_ruangan VARCHAR(100) NOT NULL
);

-- 3. Tabel Rekanan / Supplier
CREATE TABLE supplier (
    id_supplier VARCHAR(50) PRIMARY KEY,
    nama_supplier VARCHAR(150) NOT NULL,
    kontak VARCHAR(100)
);

-- 4. Tabel Master Aset
CREATE TABLE aset (
    id_aset VARCHAR(50) PRIMARY KEY,
    nomor_inventaris VARCHAR(50) UNIQUE NOT NULL,
    nama_aset VARCHAR(200) NOT NULL,
    id_kategori VARCHAR(50) REFERENCES kategori(id_kategori) ON UPDATE CASCADE,
    id_lokasi VARCHAR(50) REFERENCES lokasi(id_lokasi) ON UPDATE CASCADE,
    id_supplier VARCHAR(50) REFERENCES supplier(id_supplier) ON UPDATE CASCADE,
    kondisi VARCHAR(50) NOT NULL CHECK (kondisi IN ('Baik', 'Dalam Perawatan', 'Rusak')),
    tanggal_perolehan DATE NOT NULL,
    nilai_perolehan NUMERIC(15, 2) NOT NULL DEFAULT 0,
    foto_url TEXT,
    keterangan TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabel Transaksi / Riwayat Aktivitas
CREATE TABLE transaksi (
    id_transaksi VARCHAR(50) PRIMARY KEY,
    jenis_transaksi VARCHAR(50) NOT NULL CHECK (jenis_transaksi IN ('Pengadaan', 'Pemeliharaan', 'Mutasi')),
    id_aset VARCHAR(50) REFERENCES aset(id_aset) ON UPDATE CASCADE ON DELETE CASCADE,
    tanggal_transaksi TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_petugas VARCHAR(100) NOT NULL,
    catatan TEXT
);

-- Seeding Data Master Aset Sesuai Showcase Foto (A-001 s/d A-010)
INSERT INTO kategori (id_kategori, nama_kategori, keterangan) VALUES
('KAT-KOM', 'Komputer', 'Perangkat TIK, Laptop, PC, dan Server'),
('KAT-ELK', 'Elektronik', 'Peralatan elektronik, pendingin, dan proyektor'),
('KAT-FUR', 'Furniture', 'Mebel, meja, kursi, dan lemari kerja'),
('KAT-KND', 'Kendaraan', 'Kendaraan dinas operasional roda dua dan empat');

INSERT INTO lokasi (id_lokasi, nama_gedung, nama_ruangan) VALUES
('LOK-GEDA-101', 'Gedung A', 'Ruang 101'),
('LOK-GEDA-102', 'Gedung A', 'Ruang 102'),
('LOK-GEDA-103', 'Gedung A', 'Ruang 103'),
('LOK-GEDB-201', 'Gedung B', 'Ruang 201'),
('LOK-GEDB-202', 'Gedung B', 'Ruang 202'),
('LOK-GEDB-203', 'Gedung B', 'Ruang 203'),
('LOK-GEDB-302', 'Gedung B', 'Ruang 302'),
('LOK-GEDC-301', 'Gedung C', 'Ruang 301'),
('LOK-OUTDOOR', 'Luar Gedung', 'Area Parkir & Lapangan');

INSERT INTO supplier (id_supplier, nama_supplier, kontak) VALUES
('SUP-LNV', 'PT Lenovo Indonesia', '021-50858888'),
('SUP-HP', 'CV Mitra Mandiri (HP Partner)', '021-3849921'),
('SUP-ASTRA', 'Dealer Honda Astra', '021-65300888'),
('SUP-DKN', 'Daikin Official Store', '021-29659000'),
('SUP-INF', 'Informa Furnishing', '021-5828282'),
('SUP-EPS', 'PT Visual Media (Epson)', '021-57991122');

INSERT INTO aset (id_aset, nomor_inventaris, nama_aset, id_kategori, id_lokasi, id_supplier, kondisi, tanggal_perolehan, nilai_perolehan, keterangan) VALUES
('A-001', 'A-001', 'Laptop Lenovo ThinkPad', 'KAT-KOM', 'LOK-GEDA-101', 'SUP-LNV', 'Baik', '2023-01-12', 14500000, 'Laptop operasional staf akademik'),
('A-002', 'A-002', 'Printer HP LaserJet', 'KAT-ELK', 'LOK-GEDB-201', 'SUP-HP', 'Baik', '2022-03-05', 4800000, 'Printer cetak dokumen tata usaha'),
('A-003', 'A-003', 'Motor Honda Beat', 'KAT-KND', 'LOK-OUTDOOR', 'SUP-ASTRA', 'Dalam Perawatan', '2021-06-20', 18500000, 'Kendaraan kurir kampus'),
('A-004', 'A-004', 'AC Split 1 PK', 'KAT-ELK', 'LOK-GEDA-102', 'SUP-DKN', 'Baik', '2023-09-15', 5200000, 'Pendingin ruang dosen'),
('A-005', 'A-005', 'Meja Kerja', 'KAT-FUR', 'LOK-GEDC-301', 'SUP-INF', 'Baik', '2020-02-10', 2100000, 'Meja kerja modular'),
('A-006', 'A-006', 'Komputer PC', 'KAT-KOM', 'LOK-GEDB-202', 'SUP-HP', 'Rusak', '2019-07-18', 8500000, 'Kerusakan motherboard'),
('A-007', 'A-007', 'Printer Canon', 'KAT-ELK', 'LOK-GEDA-103', 'SUP-HP', 'Baik', '2022-12-01', 3200000, 'Printer ink tank'),
('A-008', 'A-008', 'Laptop Asus', 'KAT-KOM', 'LOK-GEDB-302', 'SUP-LNV', 'Baik', '2023-04-22', 11500000, 'Laptop lab multimedia'),
('A-009', 'A-009', 'Kursi Kantor', 'KAT-FUR', 'LOK-GEDA-101', 'SUP-INF', 'Baik', '2021-11-11', 1400000, 'Kursi ergonomis'),
('A-010', 'A-010', 'Proyektor Epson', 'KAT-ELK', 'LOK-GEDB-203', 'SUP-EPS', 'Dalam Perawatan', '2022-09-09', 7800000, 'Penggantian lampu proyektor');

INSERT INTO transaksi (id_transaksi, jenis_transaksi, id_aset, tanggal_transaksi, user_petugas, catatan) VALUES
('TRX-001', 'Pengadaan', 'A-001', '2025-10-12 14:32:00', 'Admin', 'Pengadaan Laptop Lenovo ThinkPad'),
('TRX-002', 'Pemeliharaan', 'A-004', '2025-10-11 11:20:00', 'Admin', 'Pemeliharaan AC Ruang Rapat'),
('TRX-003', 'Mutasi', 'A-002', '2025-10-10 09:15:00', 'Admin', 'Aset Printer HP dipindahkan ke Lokasi B');
