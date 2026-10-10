/**
 * SaranaPrasana - Asset Management
 * Master Mock Data Store & Persistence Layer (localStorage)
 * Persis 1:1 sesuai Data Master & Dashboard Showcase
 */

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
    keterangan: "Aset operasional staf akademik"
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
    keterangan: "Meja kerja modular 1 biro"
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
    keterangan: "Kerusakan pada power supply dan motherboard"
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
    keterangan: "Printer color ink tank"
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
    keterangan: "Laptop lab multimedia"
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
    keterangan: "Kursi ergonomis staf"
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
    keterangan: "Lampu proyektor perlu penggantian berkala"
  }
];

const RECENT_ACTIVITIES = [
  {
    judul: "Pengadaan Laptop Lenovo ThinkPad",
    user: "Admin",
    waktu: "12 Okt 2025, 14:32",
    tipe: "Pengadaan",
    tipeClass: "badge-success"
  },
  {
    judul: "Pemeliharaan AC Ruang Rapat",
    user: "Admin",
    waktu: "11 Okt 2025, 11:20",
    tipe: "Pemeliharaan",
    tipeClass: "badge-primary"
  },
  {
    judul: "Aset Printer HP dipindahkan ke Lokasi B",
    user: "Admin",
    waktu: "10 Okt 2025, 09:15",
    tipe: "Mutasi",
    tipeClass: "badge-purple"
  }
];

const LOCATION_SUMMARY = [
  { nama: "Gedung A", jumlah: 98 },
  { nama: "Gedung B", jumlah: 76 },
  { nama: "Gedung C", jumlah: 42 },
  { nama: "Luar Gedung", jumlah: 32 }
];

const CATEGORY_STATS = {
  "Komputer": 60,
  "Kendaraan": 45,
  "Peralatan Kantor": 38,
  "Elektronik": 32,
  "Furniture": 18
};

const STORAGE_KEY = "SARANAPRASANA_ASSETS_V1";

function getStoredAssets() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ASSETS));
    return [...INITIAL_ASSETS];
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ASSETS));
    return [...INITIAL_ASSETS];
  }
}

function saveAssets(assets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
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

function resetMockData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ASSETS));
  return [...INITIAL_ASSETS];
}

function formatRupiah(number) {
  if (!number) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
}
