/**
 * SaranaPrasana Asset Management
 * Master Mock Data Store & Persistence Layer (localStorage)
 * 1:1 Berdasarkan Google Stitch Project ID 8744053701019094011
 */

const INITIAL_ASSETS = [
  {
    id: "AST-KOM-2024-0012",
    nama: 'Apple iMac 24" M3 16GB/512GB (Blue)',
    sn: "C02FM0TD00LK",
    spesifikasi: "Chip Apple M3 8-Core CPU / 10-Core GPU, Retina 4.5K",
    kategori: "Komputer",
    lokasi: "Gedung D - Lab Multimedia 02",
    detailLokasi: "Lantai 2, Meja Stasiun A-04",
    gedung: "Gedung D",
    kondisi: "Baik",
    nilai: 26500000,
    tanggal: "14 Jan 2024",
    garansi: "aktif (s/d Jan 2026)",
    garansiStatus: "valid",
    supplier: "PT Apple Indonesia",
    pic: "Irfan Hakim, S.Kom"
  },
  {
    id: "AST-ELK-2023-0185",
    nama: "Projector Epson EB-2250U 5000 Lumens",
    sn: "EPS-2250-8810",
    spesifikasi: "WUXGA Full HD, 3LCD Ceiling Mounted Projector",
    kategori: "Elektronik",
    lokasi: "Gedung A - Ruang Sidang Utama",
    detailLokasi: "Lantai 1, Plafon Tengah",
    gedung: "Gedung A",
    kondisi: "Pemeliharaan",
    nilai: 18200000,
    tanggal: "22 Agu 2023",
    garansi: "Perlu Servis",
    garansiStatus: "warning",
    supplier: "PT Visual Media",
    pic: "Budi Prasetyo, M.T."
  },
  {
    id: "AST-FUR-2022-0943",
    nama: "Kursi Kerja Herman Miller Mirra 2",
    sn: "HM-MR2-9912",
    spesifikasi: "Ergonomic Mesh Chair, Butterfly Back Graphite",
    kategori: "Furniture",
    lokasi: "Gedung Rektorat - R. Warek I",
    detailLokasi: "Lantai 4, Ruang Kerja Pimpinan",
    gedung: "Gedung Rektorat",
    kondisi: "Baik",
    nilai: 14800000,
    tanggal: "10 Mei 2022",
    garansi: "Selamat 12 Thn",
    garansiStatus: "valid",
    supplier: "PT Ergonomika Graha",
    pic: "Hj. Ratna Dewi"
  },
  {
    id: "AST-SRV-2021-0034",
    nama: "Server Dell PowerEdge R740 64GB Xeon",
    sn: "DELL-2XG-9201",
    spesifikasi: "2x Intel Xeon Gold 6230, 8x 1.2TB SAS 10K, PERC H730P",
    kategori: "Komputer",
    lokasi: "Ruang Server Lt. 2 (Data Center)",
    detailLokasi: "Rack System A-02 Unit 12-14",
    gedung: "Gedung A",
    kondisi: "Rusak",
    nilai: 88000000,
    tanggal: "05 Nov 2021",
    garansi: "Expired",
    garansiStatus: "expired",
    supplier: "PT Dell Technologies",
    pic: "Hendra Setiawan"
  },
  {
    id: "AST-LAB-2024-0066",
    nama: "Mikroskop Digital Olympus CX23",
    sn: "OLY-CX23-8882",
    spesifikasi: "Binocular USB Optical System with 4K HDMI Sensor Hook",
    kategori: "Laboratorium",
    lokasi: "Gedung B - Lab Biologi 101",
    detailLokasi: "Lantai 1, Lemari Instrumen 03",
    gedung: "Gedung B",
    kondisi: "Baik",
    nilai: 32400000,
    tanggal: "18 Feb 2024",
    garansi: "aktif (s/d Feb 2027)",
    garansiStatus: "valid",
    supplier: "CV Optika Saintika",
    pic: "Dra. Siti Rahma"
  },
  {
    id: "AST-KND-2020-0008",
    nama: "Toyota HiAce Commuter 2.5 M/T Silver",
    sn: "Plat: B 1002 UPA",
    spesifikasi: "16 Passenger Capacity, Mesin Diesel 2KD-FTV D-4D",
    kategori: "Kendaraan",
    lokasi: "Pool Kendaraan Operasional",
    detailLokasi: "Area Parkir Rektorat Timur",
    gedung: "Luar Gedung",
    kondisi: "Baik",
    nilai: 540000000,
    tanggal: "12 Mar 2020",
    garansi: "Servis Rutin",
    garansiStatus: "valid",
    supplier: "Dealer Toyota Astra",
    pic: "Sutarman"
  },
  {
    id: "AST-ELK-2022-0419",
    nama: "AC Split Daikin Inverter 2 PK FTKC50",
    sn: "DK-FTKC50-311",
    spesifikasi: "Freon R32, Intelligent Eye, Titanium Apatite Filter",
    kategori: "Elektronik",
    lokasi: "Gedung C - Ruang Dosen 304",
    detailLokasi: "Lantai 3, Dinding Samping Kiri",
    gedung: "Gedung C",
    kondisi: "Rusak",
    nilai: 11500000,
    tanggal: "20 Jun 2022",
    garansi: "Expired",
    garansiStatus: "expired",
    supplier: "Daikin Authorized Store",
    pic: "Irfan Hakim, S.Kom"
  },
  {
    id: "AST-KOM-2023-0102",
    nama: "Laptop Lenovo ThinkBook 14 G4",
    sn: "LNV-TB14-7721",
    spesifikasi: "Intel Core i5-1235U, 16GB DDR4, SSD 512GB, Win 11 Pro",
    kategori: "Komputer",
    lokasi: "Gedung B - Lab Komputer 3",
    detailLokasi: "Lantai 2, Meja Instruktur",
    gedung: "Gedung B",
    kondisi: "Baik",
    nilai: 14250000,
    tanggal: "14 Mar 2023",
    garansi: "aktif (s/d Mar 2026)",
    garansiStatus: "valid",
    supplier: "PT Lenovo Indonesia",
    pic: "Irfan Hakim, S.Kom"
  },
  {
    id: "AST-FUR-2021-0238",
    nama: "Meja Rapat Oval Konferensi Indachi",
    sn: "IDC-MR16-2021",
    spesifikasi: "Kapasitas 16 Orang, Finishing Kayu Mahoni, Cable Box",
    kategori: "Furniture",
    lokasi: "Gedung Rektorat - Ruang Rapat Senat",
    detailLokasi: "Lantai 2, Ruang Rapat Utama",
    gedung: "Gedung Rektorat",
    kondisi: "Baik",
    nilai: 16500000,
    tanggal: "18 Jun 2021",
    garansi: "Garansi Toko",
    garansiStatus: "valid",
    supplier: "Informa Furnishing",
    pic: "Hj. Ratna Dewi"
  },
  {
    id: "AST-ELK-2021-0089",
    nama: "UPS Prolink PRO903S-ES 3000VA Online",
    sn: "PRL-UPS3K-9011",
    spesifikasi: "Online Double-Conversion Tower UPS, LCD Display",
    kategori: "Elektronik",
    lokasi: "Ruang NOC - Gedung Rektorat Lt. 1",
    detailLokasi: "Lantai 1, Ruang Kontrol Jaringan",
    gedung: "Gedung Rektorat",
    kondisi: "Pemeliharaan",
    nilai: 12800000,
    tanggal: "12 Okt 2021",
    garansi: "Perlu Penggantian Aki",
    garansiStatus: "warning",
    supplier: "CV Powerindo Mandiri",
    pic: "Ahmad Zulkarnain, S.Kom"
  }
];

const STORAGE_KEY = "SARANAPRASANA_STITCH_8744_V1";

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
