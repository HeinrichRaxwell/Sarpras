/**
 * Skrip Uji Koneksi Database PostgreSQL Docker
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
    console.log('Koneksi berhasil terhubung!');

    const res = await client.query('SELECT id_aset, nama_aset, kondisi, nilai_perolehan FROM aset ORDER BY id_aset ASC;');
    console.log(`Ditemukan ${res.rows.length} data aset terdaftar:`);
    console.table(res.rows);

    const stats = await client.query('SELECT kondisi, COUNT(*) as jumlah FROM aset GROUP BY kondisi;');
    console.log('Rekapitulasi kondisi aset:');
    console.table(stats.rows);

  } catch (err) {
    console.error('Gagal terhubung ke database:', err.message);
  } finally {
    await client.end();
  }
}

main();
