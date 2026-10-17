/**
 * SaranaPrasana Asset Management
 * Enterprise Dynamic Reactive Store Engine
 * Multi-Entity Reactive Architecture: Assets, Categories, Locations, Maintenance Tickets, Users, Roles & Settings
 * v2.4.0 (Full RBAC & Document Engine)
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

  // 2. INITIAL SEED ASSETS (Sync with PostgreSQL Docker 127.0.0.1:5435)
  const INITIAL_ASSETS = [
    {
      id: "A-001",
      nama: "Laptop Lenovo ThinkPad",
      kategori: "Komputer",
      lokasi: "Ruang 101",
      gedung: "Gedung A",
      kondisi: "Baik",
      tanggal: "2023-01-12",
      tgl: "2023-01-12",
      nilai: 14500000,
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
      tanggal: "2023-02-15",
      tgl: "2023-02-15",
      nilai: 4800000,
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
      tanggal: "2023-03-20",
      tgl: "2023-03-20",
      nilai: 18500000,
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
      tanggal: "2023-04-10",
      tgl: "2023-04-10",
      nilai: 5200000,
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
      tanggal: "2023-05-05",
      tgl: "2023-05-05",
      nilai: 2100000,
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
      tanggal: "2023-06-18",
      tgl: "2023-06-18",
      nilai: 8500000,
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
      tanggal: "2023-07-22",
      tgl: "2023-07-22",
      nilai: 3200000,
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
      tanggal: "2023-08-14",
      tgl: "2023-08-14",
      nilai: 11500000,
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
      tanggal: "2023-09-01",
      tgl: "2023-09-01",
      nilai: 1400000,
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
      tanggal: "2023-10-08",
      tgl: "2023-10-08",
      nilai: 7800000,
      supplier: "PT Visual Media Partner",
      keterangan: "Servis lensa optik dan pembersihan filter"
    }
  ];

  // 3. INITIAL CATEGORIES
  const INITIAL_CATEGORIES = [
    { kode: "KOMP", nama: "Komputer", deskripsi: "Perangkat pemrosesan data, server, dan PC kerja", status: "Aktif" },
    { kode: "ELK", nama: "Elektronik", deskripsi: "Peralatan audio visual, pendingin, dan proyektor", status: "Aktif" },
    { kode: "KDR", nama: "Kendaraan", deskripsi: "Kendaraan dinas roda dua dan operasional kampus", status: "Aktif" },
    { kode: "FUR", nama: "Furniture", deskripsi: "Meja kerja, kursi ergonomis, lemari berkas, rak arsip", status: "Aktif" },
    { kode: "SAR", nama: "Sarana Umum", deskripsi: "Alat pemadam api ringan, genset, instalasi air", status: "Aktif" }
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

  // 5. INITIAL MAINTENANCE TICKETS
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

  // 6. INITIAL USERS & ROLE MANAGEMENT
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

  // 7. INITIAL INSTITUTION SETTINGS
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

  // --- ASSETS REPOSITORY ---
  function getStoredAssets() {
    const data = localStorage.getItem(STORAGE_KEY_ASSETS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_ASSETS, JSON.stringify(INITIAL_ASSETS));
      return [...INITIAL_ASSETS];
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.setItem(STORAGE_KEY_ASSETS, JSON.stringify(INITIAL_ASSETS));
      return [...INITIAL_ASSETS];
    }
  }

  function saveAssets(assets) {
    localStorage.setItem(STORAGE_KEY_ASSETS, JSON.stringify(assets));
  }

  function addAsset(newAsset) {
    const assets = getStoredAssets();
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

  // --- CATEGORIES REPOSITORY ---
  function getCategories() {
    const data = localStorage.getItem(STORAGE_KEY_CATEGORIES);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
      return [...INITIAL_CATEGORIES];
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
      return [...INITIAL_CATEGORIES];
    }
  }

  function saveCategories(categories) {
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
  }

  function addCategory(cat) {
    const categories = getCategories();
    categories.push(cat);
    saveCategories(categories);
    return cat;
  }

  function deleteCategory(kode) {
    const categories = getCategories();
    const filtered = categories.filter(c => c.kode !== kode);
    saveCategories(filtered);
    return true;
  }

  // --- LOCATIONS REPOSITORY ---
  function getLocations() {
    const data = localStorage.getItem(STORAGE_KEY_LOCATIONS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_LOCATIONS, JSON.stringify(INITIAL_LOCATIONS));
      return [...INITIAL_LOCATIONS];
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.setItem(STORAGE_KEY_LOCATIONS, JSON.stringify(INITIAL_LOCATIONS));
      return [...INITIAL_LOCATIONS];
    }
  }

  function saveLocations(locations) {
    localStorage.setItem(STORAGE_KEY_LOCATIONS, JSON.stringify(locations));
  }

  function addLocation(loc) {
    const locations = getLocations();
    locations.push(loc);
    saveLocations(locations);
    return loc;
  }

  // --- MAINTENANCE TICKETS REPOSITORY ---
  function getMaintenanceTickets() {
    const data = localStorage.getItem(STORAGE_KEY_TICKETS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_TICKETS, JSON.stringify(INITIAL_TICKETS));
      return [...INITIAL_TICKETS];
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.setItem(STORAGE_KEY_TICKETS, JSON.stringify(INITIAL_TICKETS));
      return [...INITIAL_TICKETS];
    }
  }

  function saveMaintenanceTickets(tickets) {
    localStorage.setItem(STORAGE_KEY_TICKETS, JSON.stringify(tickets));
  }

  function addMaintenanceTicket(ticket) {
    const tickets = getMaintenanceTickets();
    tickets.unshift(ticket);
    saveMaintenanceTickets(tickets);

    if (ticket.id_aset) {
      updateAsset(ticket.id_aset, { kondisi: 'Dalam Perawatan' });
    }
    return ticket;
  }

  function completeMaintenanceTicket(ticketId) {
    const tickets = getMaintenanceTickets();
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
      ticket.status = 'Selesai Servis';
      saveMaintenanceTickets(tickets);

      if (ticket.id_aset) {
        updateAsset(ticket.id_aset, { kondisi: 'Baik' });
      }
      return ticket;
    }
    return null;
  }

  function deleteMaintenanceTicket(ticketId) {
    const tickets = getMaintenanceTickets();
    const filtered = tickets.filter(t => t.id !== ticketId);
    saveMaintenanceTickets(filtered);
    return true;
  }

  // --- USERS & AUTHENTICATION REPOSITORY ---
  function getUsers() {
    const data = localStorage.getItem(STORAGE_KEY_USERS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(INITIAL_USERS));
      return [...INITIAL_USERS];
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(INITIAL_USERS));
      return [...INITIAL_USERS];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  }

  function addUser(user) {
    const users = getUsers();
    users.push(user);
    saveUsers(users);
    return user;
  }

  function updateUser(id, fields) {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...fields };
      saveUsers(users);
      return users[idx];
    }
    return null;
  }

  function deleteUser(id) {
    const users = getUsers();
    // Prevent deleting primary super admin
    if (id === 'USR-001') return false;
    const filtered = users.filter(u => u.id !== id);
    saveUsers(filtered);
    return true;
  }

  function getUserById(id) {
    const users = getUsers();
    return users.find(u => u.id === id) || null;
  }

  function authenticate(username, password) {
    const users = getUsers();
    const found = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
    if (found && found.status === 'Aktif') {
      return found;
    }
    return null;
  }

  function getCurrentUser() {
    const data = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        // fallback
      }
    }
    const defaultUser = INITIAL_USERS[0];
    localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(defaultUser));
    return defaultUser;
  }

  function setCurrentUser(user) {
    localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    window.location.href = '../index.html';
  }

  // --- SETTINGS REPOSITORY ---
  function getSettings() {
    const data = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(INITIAL_SETTINGS));
      return { ...INITIAL_SETTINGS };
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(INITIAL_SETTINGS));
      return { ...INITIAL_SETTINGS };
    }
  }

  function saveSettings(settings) {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    return settings;
  }

  // --- RESET ALL DATA TO SEED ---
  function resetMockData() {
    localStorage.setItem(STORAGE_KEY_ASSETS, JSON.stringify(INITIAL_ASSETS));
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    localStorage.setItem(STORAGE_KEY_LOCATIONS, JSON.stringify(INITIAL_LOCATIONS));
    localStorage.setItem(STORAGE_KEY_TICKETS, JSON.stringify(INITIAL_TICKETS));
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(INITIAL_USERS));
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(INITIAL_SETTINGS));
    return {
      assets: [...INITIAL_ASSETS],
      categories: [...INITIAL_CATEGORIES],
      locations: [...INITIAL_LOCATIONS],
      tickets: [...INITIAL_TICKETS],
      users: [...INITIAL_USERS],
      settings: { ...INITIAL_SETTINGS }
    };
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
