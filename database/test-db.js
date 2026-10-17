/**
 * Skrip Uji Koneksi Database PostgreSQL Docker v3.0.0
 * Container: saranaprasana-postgres (Port: 5435)
 * Database: saranaprasana
 * User: sarpras
 */

const { Client } = require('pg');

const client = new Client({
  host: '127.0.0.1',
  port: 5435,
  user: 'sarpras',
  password: 'sarpras_uas_2026',
  database: 'saranaprasana'
});

async function main() {
  console.log('Menghubungkan ke database PostgreSQL di Docker (127.0.0.1:5435)...');
  try {
    await client.connect();
    console.log('[OK] Koneksi berhasil terhubung!');

    // 1. Aset & Depresiasi
    const resAset = await client.query('SELECT id_aset, nama_aset, kondisi, status_operasional, nilai_perolehan, masa_manfaat FROM aset ORDER BY id_aset ASC;');
    console.log(`\n[1] Data Aset Aktif (${resAset.rows.length} unit):`);
    console.table(resAset.rows);

    // 2. Gudang Transit (Pre-Inventory)
    const resTransit = await client.query('SELECT id_transit, nama_barang, jumlah_unit, harga_satuan, status_qc FROM gudang_transit;');
    console.log(`[2] Gudang Transit / Pre-Inventory (${resTransit.rows.length} item):`);
    console.table(resTransit.rows);

    // 3. Peminjaman
    const resPinjam = await client.query('SELECT id_pinjam, id_aset, nama_peminjam, unit_peminjam, status FROM peminjaman;');
    console.log(`[3] Peminjaman Aset (${resPinjam.rows.length} transaksi):`);
    console.table(resPinjam.rows);

    // 4. Mutasi
    const resMutasi = await client.query('SELECT id_mutasi, id_aset, lokasi_asal, lokasi_tujuan, tanggal_mutasi FROM mutasi_aset;');
    console.log(`[4] Mutasi Antar-Ruang (${resMutasi.rows.length} mutasi):`);
    console.table(resMutasi.rows);

    // 5. Pemeliharaan Preventif
    const resPrev = await client.query('SELECT id_jadwal, id_aset, kegiatan, tanggal_jatuh_tempo, status FROM pemeliharaan_preventif;');
    console.log(`[5] Pemeliharaan Preventif (${resPrev.rows.length} jadwal):`);
    console.table(resPrev.rows);

    // 6. Penghapusan (Disposal)
    const resDisp = await client.query('SELECT id_penghapusan, id_aset, nama_aset, metode_penghapusan, nomor_sk, nilai_lelang FROM penghapusan_aset;');
    console.log(`[6] Penghapusan Aset / Disposal (${resDisp.rows.length} arsip):`);
    console.table(resDisp.rows);

    // 7. Pengguna
    const resUser = await client.query('SELECT id_pengguna, username, role, status FROM pengguna;');
    console.log(`[7] Akun Pengguna & RBAC (${resUser.rows.length} user):`);
    console.table(resUser.rows);

  } catch (err) {
    console.error('Gagal terhubung ke database:', err.message);
  } finally {
    await client.end();
  }
}

main();
