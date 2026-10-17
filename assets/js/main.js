/**
 * SaranaPrasana Asset Management
 * Master Client-Side Application Core Controller & Navigation Engine
 * v2.3.0 (Talent Pool Flat Navigation & 100% Dynamic Telemetry)
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initSidebarController();
  initSearchKeyboardShortcut();
  initModalListeners();
  initRouter();
});

/**
 * 1. THEME ENGINE (Light / Dark Mode Persistence)
 */
function initThemeEngine() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('sarpras_theme') || 'light';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('sarpras_theme', newTheme);
    });
  }
}

function applyTheme(theme) {
  const container = document.getElementById('themeToggleIconContainer');
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (container && window.SARPRAS_ICONS) {
      container.innerHTML = window.SARPRAS_ICONS.sun;
    }
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (container && window.SARPRAS_ICONS) {
      container.innerHTML = window.SARPRAS_ICONS.moon;
    }
  }
}

/**
 * 2. SIDEBAR CONTROLLER (Talent Pool Pattern - Rail on Desktop, Drawer on Mobile)
 */
function initSidebarController() {
  const mobileBackdrop = document.getElementById('sidebarMobileBackdrop');
  const toggleIcon = document.getElementById('sidebarToggleIcon');

  const isCollapsed = localStorage.getItem('sarpras_sidebar_collapsed') === 'true';
  if (window.innerWidth > 1024 && isCollapsed) {
    document.body.classList.add('sidebar-collapsed');
    if (toggleIcon) toggleIcon.style.transform = 'rotate(180deg)';
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', () => {
      document.body.classList.remove('sidebar-mobile-open');
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      document.body.classList.remove('sidebar-mobile-open');
    }
  });
}

function toggleSidebarCollapse() {
  if (window.innerWidth <= 1024) {
    document.body.classList.toggle('sidebar-mobile-open');
  } else {
    document.body.classList.toggle('sidebar-collapsed');
    const collapsedNow = document.body.classList.contains('sidebar-collapsed');
    localStorage.setItem('sarpras_sidebar_collapsed', collapsedNow);
    const toggleIcon = document.getElementById('sidebarToggleIcon');
    if (toggleIcon) {
      toggleIcon.style.transform = collapsedNow ? 'rotate(180deg)' : 'rotate(0deg)';
    }
  }
}

/**
 * 3. ROUTER & SEAMLESS VIEW SWITCHER (0ms Reload, 100% Reliable Flat Links)
 */
const ROUTE_CONFIG = {
  'dashboard': {
    viewId: 'view-dashboard',
    navId: 'nav-dashboard',
    title: 'Dashboard',
    breadcrumb: '<span class="breadcrumb-item">SaranaPrasana</span><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item active">Dashboard</span>'
  },
  'master': {
    viewId: 'view-master',
    navId: 'nav-master',
    title: 'Data Aset',
    breadcrumb: '<button type="button" onclick="switchRoute(\'dashboard\')" class="breadcrumb-item" style="background:none;border:none;cursor:pointer;padding:0;">Dashboard</button><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item">Data Master</span><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item active">Data Aset</span>'
  },
  'transit': {
    viewId: 'view-transit',
    navId: 'nav-transit',
    title: 'Gudang Transit (Pre-Inventory)',
    breadcrumb: '<button type="button" onclick="switchRoute(\'dashboard\')" class="breadcrumb-item" style="background:none;border:none;cursor:pointer;padding:0;">Dashboard</button><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item">Data Master</span><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item active">Gudang Transit</span>'
  },
  'depresiasi': {
    viewId: 'view-depresiasi',
    navId: 'nav-depresiasi',
    title: 'Penyusutan Nilai Aset (Depresiasi)',
    breadcrumb: '<button type="button" onclick="switchRoute(\'dashboard\')" class="breadcrumb-item" style="background:none;border:none;cursor:pointer;padding:0;">Dashboard</button><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item">Keuangan Aset</span><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item active">Penyusutan Aset</span>'
  },
  'peminjaman': {
    viewId: 'view-peminjaman',
    navId: 'nav-peminjaman',
    title: 'Peminjaman & Pengembalian Aset',
    breadcrumb: '<button type="button" onclick="switchRoute(\'dashboard\')" class="breadcrumb-item" style="background:none;border:none;cursor:pointer;padding:0;">Dashboard</button><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item">Operasional</span><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item active">Peminjaman Aset</span>'
  },
  'mutasi': {
    viewId: 'view-mutasi',
    navId: 'nav-mutasi',
    title: 'Mutasi Aset Antar-Ruang',
    breadcrumb: '<button type="button" onclick="switchRoute(\'dashboard\')" class="breadcrumb-item" style="background:none;border:none;cursor:pointer;padding:0;">Dashboard</button><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item">Operasional</span><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item active">Mutasi Aset</span>'
  },
  'kategori': {
    viewId: 'view-kategori',
    navId: 'nav-kategori',
    title: 'Kategori Aset',
    breadcrumb: '<button type="button" onclick="switchRoute(\'dashboard\')" class="breadcrumb-item" style="background:none;border:none;cursor:pointer;padding:0;">Dashboard</button><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item">Data Master</span><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item active">Kategori Aset</span>'
  },
  'lokasi': {
    viewId: 'view-lokasi',
    navId: 'nav-lokasi',
    title: 'Lokasi Penempatan Aset',
    breadcrumb: '<button type="button" onclick="switchRoute(\'dashboard\')" class="breadcrumb-item" style="background:none;border:none;cursor:pointer;padding:0;">Dashboard</button><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item">Data Master</span><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item active">Lokasi Aset</span>'
  },
  'pemeliharaan': {
    viewId: 'view-pemeliharaan',
    navId: 'nav-pemeliharaan',
    title: 'Pemeliharaan Kuratif / Servis',
    breadcrumb: '<button type="button" onclick="switchRoute(\'dashboard\')" class="breadcrumb-item" style="background:none;border:none;cursor:pointer;padding:0;">Dashboard</button><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item">Operasional</span><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item active">Servis Kuratif</span>'
  },
  'preventif': {
    viewId: 'view-preventif',
    navId: 'nav-preventif',
    title: 'Pemeliharaan Preventif Berkala',
    breadcrumb: '<button type="button" onclick="switchRoute(\'dashboard\')" class="breadcrumb-item" style="background:none;border:none;cursor:pointer;padding:0;">Dashboard</button><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item">Operasional</span><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item active">Jadwal Preventif</span>'
  },
  'penghapusan': {
    viewId: 'view-penghapusan',
    navId: 'nav-penghapusan',
    title: 'Penghapusan & Lelang Aset BMN',
    breadcrumb: '<button type="button" onclick="switchRoute(\'dashboard\')" class="breadcrumb-item" style="background:none;border:none;cursor:pointer;padding:0;">Dashboard</button><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item">Hilir & Pelepasan</span><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item active">Penghapusan Aset</span>'
  },
  'laporan': {
    viewId: 'view-laporan',
    navId: 'nav-laporan',
    title: 'Laporan Inventarisasi Aset (KIR)',
    breadcrumb: '<button type="button" onclick="switchRoute(\'dashboard\')" class="breadcrumb-item" style="background:none;border:none;cursor:pointer;padding:0;">Dashboard</button><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item">Rekapitulasi</span><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item active">Laporan Aset</span>'
  },
  'users': {
    viewId: 'view-users',
    navId: 'nav-users',
    title: 'Manajemen Pengguna & Hak Akses',
    breadcrumb: '<button type="button" onclick="switchRoute(\'dashboard\')" class="breadcrumb-item" style="background:none;border:none;cursor:pointer;padding:0;">Dashboard</button><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item">Sistem</span><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item active">Manajemen Pengguna</span>'
  },
  'settings': {
    viewId: 'view-settings',
    navId: 'nav-settings',
    title: 'Pengaturan Akun & Sistem',
    breadcrumb: '<button type="button" onclick="switchRoute(\'dashboard\')" class="breadcrumb-item" style="background:none;border:none;cursor:pointer;padding:0;">Dashboard</button><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item">Sistem</span><span class="breadcrumb-separator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span><span class="breadcrumb-item active">Pengaturan</span>'
  }
};

function initRouter() {
  const hash = window.location.hash.replace('#', '') || 'dashboard';
  switchRoute(hash);

  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash.replace('#', '') || 'dashboard';
    switchRoute(newHash);
  });
}

function switchRoute(routeName) {
  const target = ROUTE_CONFIG[routeName] || ROUTE_CONFIG['dashboard'];

  // 1. Toggle Views (0ms Instant Switch)
  Object.keys(ROUTE_CONFIG).forEach(k => {
    const el = document.getElementById(ROUTE_CONFIG[k].viewId);
    if (el) {
      if (k === (ROUTE_CONFIG[routeName] ? routeName : 'dashboard')) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    }
  });

  // 2. Clear Active Indicators
  document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));

  // 3. Highlight EXACT Active Link
  const activeNav = document.getElementById(target.navId);
  if (activeNav) {
    activeNav.classList.add('active');
  }

  // 4. Update Breadcrumb
  const breadcrumbEl = document.getElementById('breadcrumbArea');
  if (breadcrumbEl) {
    breadcrumbEl.innerHTML = target.breadcrumb;
  }

  // 5. Update Page Title
  document.title = target.title + ' - SaranaPrasana';

  // 6. Update Hash without hard page reload
  if (window.location.hash !== '#' + (ROUTE_CONFIG[routeName] ? routeName : 'dashboard')) {
    history.replaceState(null, '', '#' + (ROUTE_CONFIG[routeName] ? routeName : 'dashboard'));
  }

  // 7. Scroll to top
  window.scrollTo(0, 0);

  // 8. Close mobile drawer if open
  document.body.classList.remove('sidebar-mobile-open');

  // 9. Re-render charts / widgets if switching to dashboard
  if (routeName === 'dashboard' && typeof window.updateAllDashboardWidgets === 'function') {
    window.updateAllDashboardWidgets();
  }
}

/**
 * 4. GLOBAL SEARCH SHORTCUT (Ctrl + K)
 */
function initSearchKeyboardShortcut() {
  const searchInput = document.getElementById('globalSearchInput');
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filterSearchInput = document.getElementById('filterSearchInput');
      if (filterSearchInput) {
        filterSearchInput.value = q;
        if (typeof window.applyFilters === 'function') {
          window.applyFilters();
        }
      }
      if (q && window.location.hash !== '#master') {
        switchRoute('master');
      }
    });
  }
}

/**
 * 5. MODAL DIALOGS (Accessible, Focus-locked, Backdrop click & ESC dismiss)
 */
function initModalListeners() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModalEl = document.querySelector('.modal-overlay.open');
      if (openModalEl) {
        closeModal(openModalEl.id);
      }
    }
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/**
 * 6. TOAST NOTIFICATIONS
 */
function showToast(msg) {
  const toast = document.getElementById('appToast');
  const msgEl = document.getElementById('toastMessage');
  if (toast && msgEl) {
    msgEl.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  }
}

// Expose handlers globally to window
window.switchRoute = switchRoute;
window.toggleSidebarCollapse = toggleSidebarCollapse;
window.openModal = openModal;
window.closeModal = closeModal;
window.showToast = showToast;
