@echo off
title SaranaPrasana Asset Management
color 0B
cls

echo =====================================================================
echo       SARANAPRASANA - SISTEM MANAJEMEN ASET KAMPUS (UAS WEB 2)
echo =====================================================================
echo.

echo [1/3] Menyiapkan Database PostgreSQL di Docker (Port 5435)...
docker start saranaprasana-postgres >nul 2>&1
if %errorlevel% equ 0 (
    echo       [OK] Database PostgreSQL Docker siap di 127.0.0.1:5435
) else (
    echo       [INFO] Docker container sedang berjalan atau Docker Desktop belum aktif.
)
echo.

echo [2/3] Memeriksa port server 5055...
netstat -ano | findstr ":5055" | findstr "LISTENING" >nul
if %errorlevel% equ 0 (
    echo       [OK] Server SaranaPrasana sudah aktif berjalan di port 5055.
    echo.
    echo [3/3] Membuka peramban browser ke http://localhost:5055...
    start http://localhost:5055/index.html
    echo.
    echo =====================================================================
    echo  URL Aplikasi    : http://localhost:5055/index.html
    echo  Kredensial Demo : admin / admin123
    echo =====================================================================
    echo  Aplikasi sudah aktif dan tab browser telah dibuka.
    echo =====================================================================
    echo.
    pause
    exit /b
)

echo [3/3] Membuka peramban browser ke http://localhost:5055...
start http://localhost:5055/index.html
echo.

echo Menjalankan server aplikasi SaranaPrasana di port 5055...
echo =====================================================================
echo  URL Aplikasi    : http://localhost:5055/index.html
echo  Kredensial Demo : admin / admin123
echo =====================================================================
echo  JANGAN TUTUP JENDELA INI SELAMA MENGGUNAKAN APLIKASI.
echo  Tekan Ctrl + C untuk keluar dan menghentikan server.
echo =====================================================================
echo.

cd /d "D:\Vscode\Sarpras"
node server.js
if %errorlevel% neq 0 (
    echo.
    echo Node.js tidak merespons, beralih ke server Python...
    python -m http.server 5055 --directory "D:\Vscode\Sarpras"
)

pause
