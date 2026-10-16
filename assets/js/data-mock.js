/**
 * SaranaPrasana Asset Management
 * Master Dynamic Data Store & Persistence Layer (localStorage)
 * Multi-Entity Reactive Architecture: Assets, Categories, Locations, Maintenance Tickets
 */

const STORAGE_KEY_ASSETS = 'sarpras_assets_v2';
const STORAGE_KEY_CATEGORIES = 'sarpras_categories_v2';
const STORAGE_KEY_LOCATIONS = 'sarpras_locations_v2';
const STORAGE_KEY_TICKETS = 'sarpras_tickets_v2';

const INITIAL_ASSETS = [
  {
    id: "A-001",
    nama: "Laptop Lenovo ThinkPad",
    kategori: "Komputer",
    lokasi: "Gedung A - Ruang 101",
    gedung: "Gedung A",
    kondisi: "Baik",
    tanggal: "12 Jan 2023",
    rawDate: "2023-01-12",
    supplier: "PT Lenovo Indonesia",
    nilai: 14500000,
    keterangan: "Laptop operasional staf akademik"
  },
  {
    id: "A-002",
    nama: "Printer HP LaserJet",
    kategori: "Elektronik",
    lokasi: "Gedung B - Ruang 201",
    gedung: "Gedung B",
    kondisi: "Baik",
    tanggal: "05 Mar 2022",
    rawDate: "2022-03-05",
    supplier: "CV Mitra Mandiri",
    nilai: 4800000,
    keterangan: "Printer cetak dokumen tata usaha"
  },
  {
    id: "A-003",
    nama: "Motor Honda Beat",
    kategori: "Kendaraan",
    lokasi: "Luar Gedung",
    gedung: "Luar Gedung",
    kondisi: "Dalam Perawatan",
    tanggal: "20 Jun 2021",
    rawDate: "2021-06-20",
    supplier: "Dealer Honda Astra",
    nilai: 18500000,
    keterangan: "Kendaraan operasional kurir kampus"
  },
  {
    id: "A-004",
    nama: "AC Split 1 PK",
    kategori: "Elektronik",
    lokasi: "Gedung A - Ruang 102",
    gedung: "Gedung A",
    kondisi: "Baik",
    tanggal: "15 Sep 2023",
    rawDate: "2023-09-15",
    supplier: "Daikin Official Store",
    nilai: 5200000,
    keterangan: "Pendingin ruang dosen"
  },
  {
    id: "A-005",
    nama: "Meja Kerja",
    kategori: "Furniture",
    lokasi: "Gedung C - Ruang 301",
    gedung: "Gedung C",
    kondisi: "Baik",
    tanggal: "10 Feb 2020",
    rawDate: "2020-02-10",
    supplier: "Informa Furnishing",
    nilai: 2100000,
    keterangan: "Meja kerja staf administrasi"
  },
  {
    id: "A-006",
    nama: "Komputer PC",
    kategori: "Komputer",
    lokasi: "Gedung B - Ruang 202",
    gedung: "Gedung B",
    kondisi: "Rusak",
    tanggal: "18 Jul 2019",
    rawDate: "2019-07-18",
    supplier: "PT Sentra Komputindo",
    nilai: 8500000,
    keterangan: "PC laboratorium kendala power supply"
  },
  {
    id: "A-007",
    nama: "Printer Canon",
    kategori: "Elektronik",
    lokasi: "Gedung A - Ruang 103",
    gedung: "Gedung A",
    kondisi: "Baik",
    tanggal: "01 Des 2022",
    rawDate: "2022-12-01",
    supplier: "CV Mitra Mandiri",
    nilai: 3200000,
    keterangan: "Printer warna ruang perpustakaan"
  },
  {
    id: "A-008",
    nama: "Laptop Asus",
    kategori: "Komputer",
    lokasi: "Gedung B - Ruang 302",
    gedung: "Gedung B",
    kondisi: "Baik",
    tanggal: "22 Apr 2023",
    rawDate: "2023-04-22",
    supplier: "Asus Service Partner",
    nilai: 11500000,
    keterangan: "Laptop riset mahasiswa dan dosen"
  },
  {
    id: "A-009",
    nama: "Kursi Kantor",
    kategori: "Furniture",
    lokasi: "Gedung A - Ruang 101",
    gedung: "Gedung A",
    kondisi: "Baik",
    tanggal: "11 Nov 2021",
    rawDate: "2021-11-11",
    supplier: "Informa Furnishing",
    nilai: 1400000,
    keterangan: "Kursi kerja ergonomis staf"
  },
  {
    id: "A-010",
    nama: "Proyektor Epson",
    kategori: "Elektronik",
    lokasi: "Gedung B - Ruang 203",
    gedung: "Gedung B",
    kondisi: "Dalam Perawatan",
    tanggal: "09 Sep 2022",
    rawDate: "2022-09-09",
    supplier: "PT Visual Media",
    nilai: 7800000,
    keterangan: "Proyektor ruang seminar pembersihan lensa"
  }
];

const INITIAL_CATEGORIES = [
  { kode: "KAT-KOM", nama: "Komputer", deskripsi: "Perangkat TIK, Laptop, PC Workstation, dan Server", status: "Aktif" },
  { kode: "KAT-ELK", nama: "Elektronik", deskripsi: "Peralatan elektronik, pendingin ruangan, dan proyektor", status: "Aktif" },
  { kode: "KAT-KND", nama: "Kendaraan", deskripsi: "Kendaraan dinas operasional roda dua dan roda empat", status: "Aktif" },
  { kode: "KAT-FUR", nama: "Furniture", deskripsi: "Mebel, meja kerja, kursi kantor ergonomis, dan lemari arsip", status: "Aktif" },
  { kode: "KAT-ALAT", nama: "Peralatan Kantor", deskripsi: "Perlengkapan administrasi dan alat penunjang operasional", status: "Aktif" }
];

const INITIAL_LOCATIONS = [
  { id: "LOK-GEDA-101", gedung: "Gedung A", ruangan: "Gedung A - Ruang 101", pj: "Budi Santoso, S.Kom" },
  { id: "LOK-GEDA-102", gedung: "Gedung A", ruangan: "Gedung A - Ruang 102", pj: "Dr. Hendra Gunawan" },
  { id: "LOK-GEDA-103", gedung: "Gedung A", ruangan: "Gedung A - Ruang 103", pj: "Ir. Atang Susila" },
  { id: "LOK-GEDB-201", gedung: "Gedung B", ruangan: "Gedung B - Ruang 201", pj: "Siti Rahmawati, A.Md" },
  { id: "LOK-GEDB-202", gedung: "Gedung B", ruangan: "Gedung B - Ruang 202", pj: "Wahyu Pratama, M.T" },
  { id: "LOK-GEDB-203", gedung: "Gedung B", ruangan: "Gedung B - Ruang 203", pj: "Rian Hidayat, S.Kom" },
  { id: "LOK-GEDB-302", gedung: "Gedung B", ruangan: "Gedung B - Ruang 302", pj: "Dra. Nurul Aini" },
  { id: "LOK-GEDC-301", gedung: "Gedung C", ruangan: "Gedung C - Ruang 301", pj: "Bambang Pamungkas" },
  { id: "LOK-OUTDOOR", gedung: "Luar Gedung", ruangan: "Luar Gedung", pj: "Komandan Keamanan Kampus" }
];

const INITIAL_TICKETS = [
  {
    id: "TRX-MNT-001",
    id_aset: "A-003",
    nama_aset: "Motor Honda Beat",
    keluhan: "Servis rutin mesin dan ganti oli transmisi",
    vendor: "Dealer Honda Astra",
    tgl: "11 Okt 2025",
    biaya: 250000,
    status: "Dalam Perawatan"
  },
  {
    id: "TRX-MNT-002",
    id_aset: "A-010",
    nama_aset: "Proyektor Epson",
    keluhan: "Pembersihan lensa optik dan kalibrasi lampu",
    vendor: "PT Visual Media Partner",
    tgl: "09 Okt 2025",
    biaya: 450000,
    status: "Dalam Perawatan"
  },
  {
    id: "TRX-MNT-003",
    id_aset: "A-004",
    nama_aset: "AC Split 1 PK",
    keluhan: "Cuci filter evaporator dan isi freon R32",
    vendor: "Daikin Official Service",
    tgl: "04 Okt 2025",
    biaya: 350000,
    status: "Selesai Servis"
  }
];

// --- 1. ASSET DATA OPERATIONS ---
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
  return filtered;
}

function getAssetById(id) {
  const assets = getStoredAssets();
  return assets.find(a => a.id === id) || null;
}

// --- 2. CATEGORIES DYNAMIC OPERATIONS ---
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
  return categories;
}

function deleteCategory(kode) {
  const categories = getCategories();
  const filtered = categories.filter(c => c.kode !== kode);
  saveCategories(filtered);
  return filtered;
}

// --- 3. LOCATIONS DYNAMIC OPERATIONS ---
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
  return locations;
}

// --- 4. MAINTENANCE TICKETS OPERATIONS ---
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

  // Set asset condition to 'Dalam Perawatan'
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

    // Automatically restore the asset condition back to 'Baik'!
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
  return filtered;
}

// --- 5. RESET DATA ENGINE ---
function resetMockData() {
  localStorage.setItem(STORAGE_KEY_ASSETS, JSON.stringify(INITIAL_ASSETS));
  localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
  localStorage.setItem(STORAGE_KEY_LOCATIONS, JSON.stringify(INITIAL_LOCATIONS));
  localStorage.setItem(STORAGE_KEY_TICKETS, JSON.stringify(INITIAL_TICKETS));
  return {
    assets: [...INITIAL_ASSETS],
    categories: [...INITIAL_CATEGORIES],
    locations: [...INITIAL_LOCATIONS],
    tickets: [...INITIAL_TICKETS]
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
  resetMockData,
  formatRupiah
};
