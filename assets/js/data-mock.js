/**
 * SaranaPrasana Asset Management
 * Enterprise Dynamic Reactive Store Engine v3.0.0
 * Comprehensive Lifecycle:
 * 1. Pre-Inventory & Gudang Transit (QC & BAST)
 * 2. Active Assets & Straight-Line Depreciation Engine
 * 3. Peminjaman & Pengembalian Aset (Check-in/Check-out)
 * 4. Mutasi Aset Antar-Ruang (Location Transfers)
 * 5. Pemeliharaan Preventif (Schedules & Reminders)
 * 6. Pemeliharaan Kuratif / Servis Tiket
 * 7. Penghapusan & Pelepasan Aset (Disposal & Auctions)
 * 8. User Management (RBAC) & System Settings
 */

(function () {
  'use strict';

  // 1. STORAGE KEYS
  const STORAGE_KEY_ASSETS = 'sarpras_assets_v2';
  const STORAGE_KEY_CATEGORIES = 'sarpras_categories_v2';
  const STORAGE_KEY_LOCATIONS = 'sarpras_locations_v2';
  const STORAGE_KEY_TICKETS = 'sarpras_tickets_v2';
  const STORAGE_KEY_USERS = 'sarpras_users_v2';
  const STORAGE_KEY_CURRENT_USER = 'sarpras_current_user_v2';
  const STORAGE_KEY_SETTINGS = 'sarpras_settings_v2';
  const STORAGE_KEY_TRANSIT = 'sarpras_transit_v2';
  const STORAGE_KEY_LOANS = 'sarpras_loans_v2';
  const STORAGE_KEY_MUTATIONS = 'sarpras_mutations_v2';
  const STORAGE_KEY_DISPOSALS = 'sarpras_disposals_v2';
  const STORAGE_KEY_PREVENTIVE = 'sarpras_preventive_v2';

  // 2. INITIAL SEED ASSETS (Sync with PostgreSQL Docker 127.0.0.1:5435)
  const INITIAL_ASSETS = [
    {
      id: "A-001",
      nama: "Laptop Lenovo ThinkPad",
      kategori: "Komputer",
      lokasi: "Ruang 101",
      gedung: "Gedung A",
      kondisi: "Baik",
      status_operasional: "Aktif",
      tanggal: "2023-01-12",
      tgl: "2023-01-12",
      nilai: 14500000,
      masa_manfaat: 4,
      nilai_residu: 1450000,
      supplier: "PT Lenovo Indonesia",
      keterangan: "Laptop riset mahasiswa dan dosen"
    },
    {
      id: "A-002",
      nama: "Printer HP LaserJet",
      kategori: "Elektronik",
      lokasi: "Ruang Admin",
      gedung: "Gedung A",
      kondisi: "Baik",
      status_operasional: "Aktif",
      tanggal: "2023-02-15",
      tgl: "2023-02-15",
      nilai: 4800000,
      masa_manfaat: 5,
      nilai_residu: 480000,
      supplier: "PT Hewlett Packard Mitra",
      keterangan: "Printer laser hitam putih operasional"
    },
    {
      id: "A-003",
      nama: "Motor Honda Beat",
      kategori: "Kendaraan",
      lokasi: "Area Parkir",
      gedung: "Luar Gedung",
      kondisi: "Dalam Perawatan",
      status_operasional: "Aktif",
      tanggal: "2023-03-20",
      tgl: "2023-03-20",
      nilai: 18500000,
      masa_manfaat: 8,
      nilai_residu: 1850000,
      supplier: "Dealer Honda Astra Motor",
      keterangan: "Operasional kurir antar fakultas"
    },
    {
      id: "A-004",
      nama: "AC Split 1 PK",
      kategori: "Elektronik",
      lokasi: "Lab Komputer 1",
      gedung: "Gedung B",
      kondisi: "Baik",
      status_operasional: "Aktif",
      tanggal: "2023-04-10",
      tgl: "2023-04-10",
      nilai: 5200000,
      masa_manfaat: 5,
      nilai_residu: 520000,
      supplier: "PT Daikin Aircon Pratama",
      keterangan: "Pendingin ruang lab komputer utama"
    },
    {
      id: "A-005",
      nama: "Meja Kerja",
      kategori: "Furniture",
      lokasi: "Ruang Dosen",
      gedung: "Gedung A",
      kondisi: "Baik",
      status_operasional: "Aktif",
      tanggal: "2023-05-05",
      tgl: "2023-05-05",
      nilai: 2100000,
      masa_manfaat: 8,
      nilai_residu: 210000,
      supplier: "CV Kayu Jati Perkasa",
      keterangan: "Meja kayu solid sekat kaca"
    },
    {
      id: "A-006",
      nama: "Komputer PC",
      kategori: "Komputer",
      lokasi: "Lab Jaringan",
      gedung: "Gedung B",
      kondisi: "Rusak",
      status_operasional: "Aktif",
      tanggal: "2021-06-18",
      tgl: "2021-06-18",
      nilai: 8500000,
      masa_manfaat: 4,
      nilai_residu: 850000,
      supplier: "PT Dell Megatama",
      keterangan: "Motherboard konslet butuh ganti part"
    },
    {
      id: "A-007",
      nama: "Printer Canon",
      kategori: "Elektronik",
      lokasi: "Ruang Tata Usaha",
      gedung: "Gedung A",
      kondisi: "Baik",
      status_operasional: "Aktif",
      tanggal: "2023-07-22",
      tgl: "2023-07-22",
      nilai: 3200000,
      masa_manfaat: 5,
      nilai_residu: 320000,
      supplier: "PT Samafitro Canon",
      keterangan: "Printer warna dokumen legalisir"
    },
    {
      id: "A-008",
      nama: "Laptop Asus",
      kategori: "Komputer",
      lokasi: "Ruang Server",
      gedung: "Gedung C",
      kondisi: "Baik",
      status_operasional: "Aktif",
      tanggal: "2023-08-14",
      tgl: "2023-08-14",
      nilai: 11500000,
      masa_manfaat: 4,
      nilai_residu: 1150000,
      supplier: "PT Asusindo Megah",
      keterangan: "Terminal remote monitor server"
    },
    {
      id: "A-009",
      nama: "Kursi Kantor",
      kategori: "Furniture",
      lokasi: "Ruang Rapat",
      gedung: "Gedung B",
      kondisi: "Baik",
      status_operasional: "Aktif",
      tanggal: "2020-09-01",
      tgl: "2020-09-01",
      nilai: 1400000,
      masa_manfaat: 8,
      nilai_residu: 140000,
      supplier: "CV Ergonomis Indo",
      keterangan: "Kursi putar hidrolik rapat senat"
    },
    {
      id: "A-010",
      nama: "Proyektor Epson",
      kategori: "Elektronik",
      lokasi: "Auditorium Utama",
      gedung: "Gedung B",
      kondisi: "Dalam Perawatan",
      status_operasional: "Aktif",
      tanggal: "2023-10-08",
      tgl: "2023-10-08",
      nilai: 7800000,
      masa_manfaat: 5,
      nilai_residu: 780000,
      supplier: "PT Visual Media Partner",
      keterangan: "Servis lensa optik dan pembersihan filter"
    }
  ];

  // 3. INITIAL CATEGORIES
  const INITIAL_CATEGORIES = [
    { kode: "KOMP", nama: "Komputer", deskripsi: "Perangkat pemrosesan data, server, dan PC kerja", default_umur: 4, status: "Aktif" },
    { kode: "ELK", nama: "Elektronik", deskripsi: "Peralatan audio visual, pendingin, dan proyektor", default_umur: 5, status: "Aktif" },
    { kode: "KDR", nama: "Kendaraan", deskripsi: "Kendaraan dinas roda dua dan operasional kampus", default_umur: 8, status: "Aktif" },
    { kode: "FUR", nama: "Furniture", deskripsi: "Meja kerja, kursi ergonomis, lemari berkas, rak arsip", default_umur: 8, status: "Aktif" },
    { kode: "SAR", nama: "Sarana Umum", deskripsi: "Alat pemadam api ringan, genset, instalasi air", default_umur: 10, status: "Aktif" }
  ];

  // 4. INITIAL LOCATIONS
  const INITIAL_LOCATIONS = [
    { id: "LOK-GDA-01", gedung: "Gedung A", ruangan: "Ruang 101", pj: "Ahmad Subarjo" },
    { id: "LOK-GDA-02", gedung: "Gedung A", ruangan: "Ruang Admin", pj: "Siti Rahma" },
    { id: "LOK-GDA-03", gedung: "Gedung A", ruangan: "Ruang Dosen", pj: "Budi Santoso" },
    { id: "LOK-GDA-04", gedung: "Gedung A", ruangan: "Ruang Tata Usaha", pj: "Dewi Lestari" },
    { id: "LOK-GDB-01", gedung: "Gedung B", ruangan: "Lab Komputer 1", pj: "Hendra Wijaya" },
    { id: "LOK-GDB-02", gedung: "Gedung B", ruangan: "Lab Jaringan", pj: "Rian Hidayat" },
    { id: "LOK-GDB-03", gedung: "Gedung B", ruangan: "Ruang Rapat", pj: "Fitri Handayani" },
    { id: "LOK-GDB-04", gedung: "Gedung B", ruangan: "Auditorium Utama", pj: "Wahyu Pratama" },
    { id: "LOK-GDC-01", gedung: "Gedung C", ruangan: "Ruang Server", pj: "Fajar Nugraha" },
    { id: "LOK-OUT-01", gedung: "Luar Gedung", ruangan: "Area Parkir", pj: "Koordinator Keamanan" }
  ];

  // 5. INITIAL GUDANG TRANSIT (PRE-INVENTORY)
  const INITIAL_TRANSIT = [
    {
      id: "TRN-001",
      nama_barang: "Monitor LED Dell 24 Inci",
      kategori: "Elektronik",
      supplier: "PT Dell Megatama",
      nomor_surat_jalan: "SJ-DELL-2026-081",
      tgl_terima: "2026-10-15",
      jumlah_unit: 5,
      harga_satuan: 2350000,
      status_qc: "Lolos QC",
      catatan_qc: "Kemasan segel pabrik utuh, uji nyala panel tajam tanpa dead pixel."
    },
    {
      id: "TRN-002",
      nama_barang: "Router Cisco Gigabit Switch",
      kategori: "Komputer",
      supplier: "PT Mitra Jaringan Nusantara",
      nomor_surat_jalan: "SJ-CISCO-8821",
      tgl_terima: "2026-10-16",
      jumlah_unit: 2,
      harga_satuan: 6400000,
      status_qc: "Perlu Pengecekan",
      catatan_qc: "Menunggu teknisi lab jaringan untuk pengujian throughput bandwidth."
    }
  ];

  // 6. INITIAL PEMINJAMAN ASET (LOANS)
  const INITIAL_LOANS = [
    {
      id: "PINJAM-001",
      id_aset: "A-008",
      nama_aset: "Laptop Asus",
      nama_peminjam: "Rian Hidayat, M.Kom.",
      identitas_peminjam: "NIDN 0418098901",
      unit_peminjam: "Program Studi Teknik Informatika",
      tgl_pinjam: "2026-10-14",
      tgl_kembali_rencana: "2026-10-21",
      tgl_kembali_realisasi: null,
      keperluan: "Kegiatan Akreditasi Program Studi di Gedung Rektorat",
      status: "Dipinjam"
    }
  ];

  // 7. INITIAL MUTASI ASET (TRANSFERS)
  const INITIAL_MUTATIONS = [
    {
      id: "MUT-001",
      id_aset: "A-004",
      nama_aset: "AC Split 1 PK",
      lokasi_asal: "Ruang Tata Usaha",
      lokasi_tujuan: "Lab Komputer 1",
      pj_asal: "Dewi Lestari",
      pj_tujuan: "Hendra Wijaya",
      tgl_mutasi: "2025-08-10",
      alasan_mutasi: "Optimalisasi pendingin perangkat komputer riset mahasiswa"
    }
  ];

  // 8. INITIAL PREVENTIVE MAINTENANCE SCHEDULES
  const INITIAL_PREVENTIVE = [
    {
      id: "PM-001",
      id_aset: "A-004",
      nama_aset: "AC Split 1 PK",
      lokasi: "Lab Komputer 1",
      kegiatan: "Pembersihan filter, cuci evaporator, dan cek tekanan freon",
      frekuensi_hari: 90,
      tgl_terakhir: "2026-08-15",
      tgl_jatuh_tempo: "2026-11-15",
      vendor: "PT Daikin Aircon Pratama",
      status: "Jadwal Aktif"
    },
    {
      id: "PM-002",
      id_aset: "A-003",
      nama_aset: "Motor Honda Beat",
      lokasi: "Area Parkir",
      kegiatan: "Ganti oli mesin, oli gardan, dan servis rem",
      frekuensi_hari: 90,
      tgl_terakhir: "2026-07-20",
      tgl_jatuh_tempo: "2026-10-20",
      vendor: "Dealer Honda Astra Motor",
      status: "Mendekati Jatuh Tempo"
    }
  ];

  // 9. INITIAL DISPOSALS / PENGHAPUSAN ASET
  const INITIAL_DISPOSALS = [
    {
      id: "DSP-001",
      id_aset: "A-000-HIST",
      nama_aset: "Komputer Pentium 4 Dual Core",
      kategori: "Komputer",
      nilai_perolehan_awal: 6500000,
      nilai_buku_akhir: 0,
      metode_penghapusan: "Lelang Umum",
      nomor_sk: "SK-REKTOR/BMN/2025/119",
      tgl_penghapusan: "2025-11-10",
      nilai_lelang: 350000,
      keterangan: "Usia ekonomis habis (susut 100%), part rusak dan tidak dapat diupgrade."
    }
  ];

  // 10. INITIAL MAINTENANCE TICKETS
  const INITIAL_TICKETS = [
    {
      id: "TRX-MNT-001",
      id_aset: "A-003",
      nama_aset: "Motor Honda Beat",
      keluhan: "Servis rutin mesin dan ganti oli transmisi",
      vendor: "Dealer Honda Astra",
      tgl: "2025-10-11",
      biaya: 250000,
      status: "Dalam Perawatan"
    },
    {
      id: "TRX-MNT-002",
      id_aset: "A-010",
      nama_aset: "Proyektor Epson",
      keluhan: "Pembersihan lensa optik dan kalibrasi lampu",
      vendor: "PT Visual Media Partner",
      tgl: "2025-10-09",
      biaya: 450000,
      status: "Dalam Perawatan"
    },
    {
      id: "TRX-MNT-003",
      id_aset: "A-004",
      nama_aset: "AC Split 1 PK",
      keluhan: "Pembersihan filter dan penambahan freon R32",
      vendor: "CV Sejuk Abadi",
      tgl: "2025-09-28",
      biaya: 180000,
      status: "Selesai Servis"
    }
  ];

  // 11. INITIAL USERS
  const INITIAL_USERS = [
    {
      id: "USR-001",
      username: "admin",
      password: "admin123",
      nama: "Super Administrator",
      email: "admin@unpam.ac.id",
      role: "Super Admin",
      status: "Aktif",
      tgl_dibuat: "2026-01-10"
    },
    {
      id: "USR-002",
      username: "petugas",
      password: "petugas123",
      nama: "Haidar Reyhan",
      email: "haidar@unpam.ac.id",
      role: "Staf Sarpras",
      status: "Aktif",
      tgl_dibuat: "2026-02-15"
    },
    {
      id: "USR-003",
      username: "pimpinan",
      password: "pimpinan123",
      nama: "Dr. Ir. Atang Susila, M.Eng.",
      email: "atang@unpam.ac.id",
      role: "Pimpinan",
      status: "Aktif",
      tgl_dibuat: "2026-03-01"
    }
  ];

  // 12. INITIAL SETTINGS
  const INITIAL_SETTINGS = {
    instansi: "Universitas Pamulang - Fakultas Ilmu Komputer",
    unit: "Biro Administrasi Umum dan Sarana Prasarana",
    alamat: "Jl. Surya Kencana No. 1, Pamulang Barat, Kota Tangerang Selatan, Banten 15417",
    telepon: "(021) 7412566",
    email: "sarpras@unpam.ac.id",
    pj_nama: "Dr. Ir. Atang Susila, M.Eng.",
    pj_nip: "19750814 200212 1 002",
    pj_jabatan: "Kepala Biro Sarana & Prasarana",
    format_nup: "BMN-UNPAM-2026"
  };

  // Helper safe get
  function getCollection(key, initialData) {
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(initialData));
      return JSON.parse(JSON.stringify(initialData));
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.setItem(key, JSON.stringify(initialData));
      return JSON.parse(JSON.stringify(initialData));
    }
  }

  function saveCollection(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // --- 1. ASSET CRUD & DEPRECIATION CALCULATOR ---
  function getStoredAssets() {
    return getCollection(STORAGE_KEY_ASSETS, INITIAL_ASSETS);
  }

  function saveAssets(assets) {
    saveCollection(STORAGE_KEY_ASSETS, assets);
  }

  function addAsset(newAsset) {
    const assets = getStoredAssets();
    if (!newAsset.masa_manfaat) newAsset.masa_manfaat = 5;
    if (!newAsset.nilai_residu) newAsset.nilai_residu = Math.round((newAsset.nilai || 0) * 0.1);
    if (!newAsset.status_operasional) newAsset.status_operasional = "Aktif";
    assets.unshift(newAsset);
    saveAssets(assets);
    return newAsset;
  }

  function updateAsset(id, updatedFields) {
    const assets = getStoredAssets();
    const index = assets.findIndex(a => a.id === id);
    if (index !== -1) {
      assets[index] = { ...assets[index], ...updatedFields };
      saveAssets(assets);
      return assets[index];
    }
    return null;
  }

  function deleteAsset(id) {
    const assets = getStoredAssets();
    const filtered = assets.filter(a => a.id !== id);
    saveAssets(filtered);
    return true;
  }

  function getAssetById(id) {
    const assets = getStoredAssets();
    return assets.find(a => a.id === id) || null;
  }

  function parseSafeDate(dateStr) {
    if (!dateStr) return new Date(2023, 0, 1);
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return new Date(dateStr);
    }
    const parts = dateStr.trim().split(/\s+/);
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10) || 1;
      const monthNames = {
        'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'mei': 4, 'may': 4, 'jun': 5,
        'jul': 6, 'agu': 7, 'aug': 7, 'sep': 8, 'okt': 9, 'oct': 9, 'nov': 10, 'des': 11, 'dec': 11
      };
      const mKey = parts[1].toLowerCase().slice(0, 3);
      const month = monthNames[mKey] !== undefined ? monthNames[mKey] : 0;
      const year = parseInt(parts[2], 10) || 2023;
      return new Date(year, month, day);
    }
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? new Date(2023, 0, 1) : d;
  }

  /**
   * Straight-Line Depreciation Engine (PSAK 16 & SAP Standar Akuntansi Pemerintah)
   */
  function calculateAssetDepreciation(asset) {
    const hargaPerolehan = parseFloat(asset.nilai || 0);
    const masaManfaatTahun = parseInt(asset.masa_manfaat || 5, 10);
    const nilaiResidu = parseFloat(asset.nilai_residu || Math.round(hargaPerolehan * 0.1));

    const tglBeliStr = asset.tanggal || asset.tgl || "2023-01-01";
    const tglBeli = parseSafeDate(tglBeliStr);
    const tglSekarang = new Date();

    // Hitung selisih hari
    const diffTime = Math.max(0, tglSekarang - tglBeli);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const usiaTahunBerjalan = +(diffDays / 365.25).toFixed(2);

    // Penyusutan Garis Lurus
    const bebanPenyusutanTahunan = (hargaPerolehan - nilaiResidu) / masaManfaatTahun;
    const bebanPenyusutanHarian = bebanPenyusutanTahunan / 365.25;

    let akumulasiPenyusutan = bebanPenyusutanHarian * diffDays;
    const maxPenyusutan = hargaPerolehan - nilaiResidu;

    if (akumulasiPenyusutan > maxPenyusutan) {
      akumulasiPenyusutan = maxPenyusutan;
    }

    let nilaiBuku = hargaPerolehan - akumulasiPenyusutan;
    if (nilaiBuku < nilaiResidu) {
      nilaiBuku = nilaiResidu;
    }

    const sisaMasaTahun = Math.max(0, +(masaManfaatTahun - usiaTahunBerjalan).toFixed(1));
    const persenNilaiBuku = Math.max(0, Math.min(100, Math.round((nilaiBuku / (hargaPerolehan || 1)) * 100)));

    // Constraint Bisnis: Boleh dijual/lelang jika sisa nilai buku <= 10% ATAU kondisi Rusak Total
    const isHabisMasa = (persenNilaiBuku <= 10) || (usiaTahunBerjalan >= masaManfaatTahun);
    const isAfkir = (asset.kondisi === "Rusak Total (Afkir)" || asset.kondisi === "Rusak");
    const bolehDihapuskan = isHabisMasa || isAfkir;

    return {
      hargaPerolehan,
      masaManfaatTahun,
      nilaiResidu,
      usiaTahunBerjalan,
      sisaMasaTahun,
      penyusutanTahunan: Math.round(bebanPenyusutanTahunan),
      akumulasiPenyusutan: Math.round(akumulasiPenyusutan),
      nilaiBuku: Math.round(nilaiBuku),
      persenNilaiBuku,
      isHabisMasa,
      bolehDihapuskan,
      statusKelayakan: isHabisMasa ? "Siap Dihapuskan (Susut 100%)" : "Dalam Masa Manfaat Aktif"
    };
  }

  // --- 2. GUDANG TRANSIT (PRE-INVENTORY) ---
  function getTransitItems() {
    return getCollection(STORAGE_KEY_TRANSIT, INITIAL_TRANSIT);
  }

  function saveTransitItems(items) {
    saveCollection(STORAGE_KEY_TRANSIT, items);
  }

  function addTransitItem(item) {
    const items = getTransitItems();
    items.unshift(item);
    saveTransitItems(items);
    return item;
  }

  function deleteTransitItem(id) {
    const items = getTransitItems();
    const filtered = items.filter(i => i.id !== id);
    saveTransitItems(filtered);
    return true;
  }

  // Placement BAST: Convert transit item into Active Asset
  function placeTransitItemToRoom(transitId, placementData) {
    const items = getTransitItems();
    const item = items.find(i => i.id === transitId);
    if (!item) return null;

    const assets = getStoredAssets();
    const nextNum = assets.length + 1;
    const padNum = nextNum < 10 ? '00' + nextNum : (nextNum < 100 ? '0' + nextNum : nextNum);
    const assetId = 'A-' + padNum;

    const newAsset = {
      id: assetId,
      nama: item.nama_barang,
      kategori: item.kategori,
      lokasi: placementData.ruangan,
      gedung: placementData.gedung,
      kondisi: "Baik",
      status_operasional: "Aktif",
      tanggal: new Date().toISOString().slice(0, 10),
      tgl: new Date().toISOString().slice(0, 10),
      nilai: item.harga_satuan,
      masa_manfaat: placementData.masa_manfaat || 5,
      nilai_residu: Math.round(item.harga_satuan * 0.1),
      supplier: item.supplier,
      keterangan: `Penempatan dari Gudang Transit via BAST No: ${placementData.nomor_bast}. Diserahkan kepada PJ: ${placementData.pj}`
    };

    addAsset(newAsset);
    deleteTransitItem(transitId);
    return newAsset;
  }

  // --- 3. PEMINJAMAN ASET (LOANS) ---
  function getLoans() {
    return getCollection(STORAGE_KEY_LOANS, INITIAL_LOANS);
  }

  function saveLoans(loans) {
    saveCollection(STORAGE_KEY_LOANS, loans);
  }

  function addLoan(loan) {
    const loans = getLoans();
    loans.unshift(loan);
    saveLoans(loans);
    // Update asset status
    updateAsset(loan.id_aset, { status_operasional: "Dipinjam" });
    return loan;
  }

  function returnLoan(loanId) {
    const loans = getLoans();
    const loan = loans.find(l => l.id === loanId);
    if (loan) {
      loan.status = "Sudah Kembali";
      loan.tgl_kembali_realisasi = new Date().toISOString().slice(0, 10);
      saveLoans(loans);
      // Restore asset status
      updateAsset(loan.id_aset, { status_operasional: "Aktif" });
      return loan;
    }
    return null;
  }

  // --- 4. MUTASI ASET (TRANSFERS) ---
  function getMutations() {
    return getCollection(STORAGE_KEY_MUTATIONS, INITIAL_MUTATIONS);
  }

  function saveMutations(mutations) {
    saveCollection(STORAGE_KEY_MUTATIONS, mutations);
  }

  function addMutation(mutation) {
    const mutations = getMutations();
    mutations.unshift(mutation);
    saveMutations(mutations);
    // Update asset location in master
    updateAsset(mutation.id_aset, {
      lokasi: mutation.lokasi_tujuan,
      gedung: mutation.gedung_tujuan || "Gedung Utama"
    });
    return mutation;
  }

  // --- 5. PEMELIHARAAN PREVENTIF (SCHEDULES) ---
  function getPreventiveSchedules() {
    return getCollection(STORAGE_KEY_PREVENTIVE, INITIAL_PREVENTIVE);
  }

  function savePreventiveSchedules(schedules) {
    saveCollection(STORAGE_KEY_PREVENTIVE, schedules);
  }

  function addPreventiveSchedule(schedule) {
    const schedules = getPreventiveSchedules();
    schedules.unshift(schedule);
    savePreventiveSchedules(schedules);
    return schedule;
  }

  // --- 6. PENGHAPUSAN ASET (DISPOSAL) ---
  function getDisposals() {
    return getCollection(STORAGE_KEY_DISPOSALS, INITIAL_DISPOSALS);
  }

  function saveDisposals(disposals) {
    saveCollection(STORAGE_KEY_DISPOSALS, disposals);
  }

  function addDisposal(disposal) {
    const disposals = getDisposals();
    disposals.unshift(disposal);
    saveDisposals(disposals);
    // Mark asset as Dihapuskan or remove from active inventory
    updateAsset(disposal.id_aset, {
      status_operasional: "Dihapuskan",
      kondisi: "Dihapuskan"
    });
    return disposal;
  }

  // --- 7. CATEGORIES & LOCATIONS ---
  function getCategories() {
    return getCollection(STORAGE_KEY_CATEGORIES, INITIAL_CATEGORIES);
  }
  function saveCategories(c) { saveCollection(STORAGE_KEY_CATEGORIES, c); }
  function addCategory(cat) {
    const c = getCategories();
    c.push(cat);
    saveCategories(c);
    return cat;
  }
  function deleteCategory(kode) {
    const c = getCategories().filter(item => item.kode !== kode);
    saveCategories(c);
    return true;
  }

  function getLocations() {
    return getCollection(STORAGE_KEY_LOCATIONS, INITIAL_LOCATIONS);
  }
  function saveLocations(l) { saveCollection(STORAGE_KEY_LOCATIONS, l); }
  function addLocation(loc) {
    const l = getLocations();
    l.push(loc);
    saveLocations(l);
    return loc;
  }

  // --- 8. TIKET SERVIS ---
  function getMaintenanceTickets() {
    return getCollection(STORAGE_KEY_TICKETS, INITIAL_TICKETS);
  }
  function saveMaintenanceTickets(t) { saveCollection(STORAGE_KEY_TICKETS, t); }
  function addMaintenanceTicket(ticket) {
    const t = getMaintenanceTickets();
    t.unshift(ticket);
    saveMaintenanceTickets(t);
    if (ticket.id_aset) updateAsset(ticket.id_aset, { kondisi: "Dalam Perawatan" });
    return ticket;
  }
  function completeMaintenanceTicket(ticketId) {
    const t = getMaintenanceTickets();
    const ticket = t.find(item => item.id === ticketId);
    if (ticket) {
      ticket.status = "Selesai Servis";
      saveMaintenanceTickets(t);
      if (ticket.id_aset) updateAsset(ticket.id_aset, { kondisi: "Baik" });
      return ticket;
    }
    return null;
  }
  function deleteMaintenanceTicket(ticketId) {
    const t = getMaintenanceTickets().filter(item => item.id !== ticketId);
    saveMaintenanceTickets(t);
    return true;
  }

  // --- 9. USERS & RBAC ---
  function getUsers() {
    return getCollection(STORAGE_KEY_USERS, INITIAL_USERS);
  }
  function saveUsers(u) { saveCollection(STORAGE_KEY_USERS, u); }
  function addUser(user) {
    const u = getUsers();
    u.push(user);
    saveUsers(u);
    return user;
  }
  function updateUser(id, fields) {
    const u = getUsers();
    const idx = u.findIndex(item => item.id === id);
    if (idx !== -1) {
      u[idx] = { ...u[idx], ...fields };
      saveUsers(u);
      return u[idx];
    }
    return null;
  }
  function deleteUser(id) {
    if (id === 'USR-001') return false;
    const u = getUsers().filter(item => item.id !== id);
    saveUsers(u);
    return true;
  }
  function getUserById(id) {
    return getUsers().find(u => u.id === id) || null;
  }
  function getUserByIdentifier(identifier) {
    if (!identifier) return null;
    const query = identifier.trim().toLowerCase();
    return getUsers().find(u =>
      (u.username && u.username.toLowerCase() === query) ||
      (u.email && u.email.toLowerCase() === query)
    ) || null;
  }
  function authenticate(identifier, password) {
    if (!identifier || !password) return null;
    const query = identifier.trim().toLowerCase();
    return getUsers().find(u =>
      ((u.username && u.username.toLowerCase() === query) ||
       (u.email && u.email.toLowerCase() === query)) &&
      u.password === password &&
      u.status === "Aktif"
    ) || null;
  }
  function getCurrentUser() {
    const data = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
    if (data) {
      try { return JSON.parse(data); } catch (e) {}
    }
    const def = INITIAL_USERS[0];
    localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(def));
    return def;
  }
  function setCurrentUser(user) {
    localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
  }
  function logout() {
    localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    window.location.href = '../index.html';
  }

  // --- 10. SETTINGS ---
  function getSettings() {
    return getCollection(STORAGE_KEY_SETTINGS, INITIAL_SETTINGS);
  }
  function saveSettings(s) {
    saveCollection(STORAGE_KEY_SETTINGS, s);
    return s;
  }

  // --- 11. RESET ALL DATA TO SEED ---
  function resetMockData() {
    localStorage.setItem(STORAGE_KEY_ASSETS, JSON.stringify(INITIAL_ASSETS));
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    localStorage.setItem(STORAGE_KEY_LOCATIONS, JSON.stringify(INITIAL_LOCATIONS));
    localStorage.setItem(STORAGE_KEY_TICKETS, JSON.stringify(INITIAL_TICKETS));
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(INITIAL_USERS));
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(INITIAL_SETTINGS));
    localStorage.setItem(STORAGE_KEY_TRANSIT, JSON.stringify(INITIAL_TRANSIT));
    localStorage.setItem(STORAGE_KEY_LOANS, JSON.stringify(INITIAL_LOANS));
    localStorage.setItem(STORAGE_KEY_MUTATIONS, JSON.stringify(INITIAL_MUTATIONS));
    localStorage.setItem(STORAGE_KEY_PREVENTIVE, JSON.stringify(INITIAL_PREVENTIVE));
    localStorage.setItem(STORAGE_KEY_DISPOSALS, JSON.stringify(INITIAL_DISPOSALS));
    return true;
  }

  function formatRupiah(number) {
    if (!number) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(number);
  }

  // Expose Store to Window
  window.SarprasStore = {
    getStoredAssets,
    saveAssets,
    addAsset,
    updateAsset,
    deleteAsset,
    getAssetById,
    calculateAssetDepreciation,
    getTransitItems,
    saveTransitItems,
    addTransitItem,
    deleteTransitItem,
    placeTransitItemToRoom,
    getLoans,
    saveLoans,
    addLoan,
    returnLoan,
    getMutations,
    saveMutations,
    addMutation,
    getPreventiveSchedules,
    savePreventiveSchedules,
    addPreventiveSchedule,
    getDisposals,
    saveDisposals,
    addDisposal,
    getCategories,
    saveCategories,
    addCategory,
    deleteCategory,
    getLocations,
    saveLocations,
    addLocation,
    getMaintenanceTickets,
    saveMaintenanceTickets,
    addMaintenanceTicket,
    completeMaintenanceTicket,
    deleteMaintenanceTicket,
    getUsers,
    saveUsers,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
    getUserByIdentifier,
    authenticate,
    getCurrentUser,
    setCurrentUser,
    logout,
    getSettings,
    saveSettings,
    resetMockData,
    formatRupiah
  };

})();
