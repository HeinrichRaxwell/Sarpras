/**
 * SaranaPrasana Asset Management
 * Client-Side Core UI Controller & Seamless View Router
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initSidebarController();
  initSearchKeyboardShortcut();
  initModalListeners();
  initAccordionMenus();
  initViewRouter();
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
  const themeIcon = document.getElementById('themeToggleIcon');
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeIcon) themeIcon.textContent = 'light_mode';
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (themeIcon) themeIcon.textContent = 'dark_mode';
  }
}

/**
 * 2. SIDEBAR CONTROLLER (Desktop Rail & Mobile Drawer)
 */
function initSidebarController() {
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const mobileBackdrop = document.getElementById('sidebarMobileBackdrop');
  const toggleIcon = document.getElementById('sidebarToggleIcon');

  const isCollapsed = localStorage.getItem('sarpras_sidebar_collapsed') === 'true';
  if (window.innerWidth > 1024 && isCollapsed) {
    document.body.classList.add('sidebar-collapsed');
    if (toggleIcon) toggleIcon.textContent = 'chevron_right';
  }

  if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        document.body.classList.toggle('sidebar-mobile-open');
      } else {
        document.body.classList.toggle('sidebar-collapsed');
        const collapsedNow = document.body.classList.contains('sidebar-collapsed');
        localStorage.setItem('sarpras_sidebar_collapsed', collapsedNow);
        if (toggleIcon) {
          toggleIcon.textContent = collapsedNow ? 'chevron_right' : 'chevron_left';
        }
      }
    });
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

/**
 * 3. ACCORDION MENUS (Data Master & Transaksi)
 */
function initAccordionMenus() {
  const masterBtn = document.querySelector('#accordMaster .accordion-toggle-btn');
  if (masterBtn) {
    masterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('master');
    });
  }

  const transBtn = document.querySelector('#accordTrans .accordion-toggle-btn');
  if (transBtn) {
    transBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('form');
    });
  }
}

/**
 * 4. SEAMLESS SPA VIEW ROUTER (Instant Tab Switching Without Page Reload)
 */
function initViewRouter() {
  const hash = window.location.hash.replace('#', '');
  const path = window.location.pathname.toLowerCase();
  
  let defaultView = 'dashboard';
  if (path.includes('data-master')) defaultView = 'master';
  else if (path.includes('form')) defaultView = 'form';
  else if (path.includes('laporan')) defaultView = 'laporan';

  const initialView = hash || defaultView;
  activateView(initialView, false);

  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash.replace('#', '');
    if (newHash) activateView(newHash, false);
  });
}

function activateView(viewName, updateUrl = true) {
  const views = {
    'dashboard': document.getElementById('view-dashboard'),
    'master': document.getElementById('view-master'),
    'form': document.getElementById('view-form'),
    'laporan': document.getElementById('view-laporan')
  };

  const targetView = views[viewName];

  // If in a unified view page, switch instantly (0ms, zero reload)
  if (targetView) {
    Object.keys(views).forEach(k => {
      if (views[k]) {
        if (k === viewName) {
          views[k].classList.remove('hidden');
        } else {
          views[k].classList.add('hidden');
        }
      }
    });

    if (updateUrl) {
      history.replaceState(null, null, '#' + viewName);
    }
  }

  // Update Breadcrumbs
  const breadcrumbEl = document.getElementById('breadcrumbArea');
  if (breadcrumbEl) {
    if (viewName === 'dashboard') {
      breadcrumbEl.innerHTML = '<span class="breadcrumb-item">SaranaPrasana</span><span class="material-symbols-outlined breadcrumb-separator">chevron_right</span><span class="breadcrumb-item active">Dashboard</span>';
    } else if (viewName === 'master') {
      breadcrumbEl.innerHTML = '<span class="breadcrumb-item">Dashboard</span><span class="material-symbols-outlined breadcrumb-separator">chevron_right</span><span class="breadcrumb-item">Data Master</span><span class="material-symbols-outlined breadcrumb-separator">chevron_right</span><span class="breadcrumb-item active">Aset</span>';
    } else if (viewName === 'form') {
      breadcrumbEl.innerHTML = '<span class="breadcrumb-item">Dashboard</span><span class="material-symbols-outlined breadcrumb-separator">chevron_right</span><span class="breadcrumb-item">Transaksi</span><span class="material-symbols-outlined breadcrumb-separator">chevron_right</span><span class="breadcrumb-item active">Tambah Aset</span>';
    } else if (viewName === 'laporan') {
      breadcrumbEl.innerHTML = '<span class="breadcrumb-item">Dashboard</span><span class="material-symbols-outlined breadcrumb-separator">chevron_right</span><span class="breadcrumb-item">Laporan</span><span class="material-symbols-outlined breadcrumb-separator">chevron_right</span><span class="breadcrumb-item active">Laporan Aset</span>';
    }
  }

  // Update Sidebar Active Highlights (Zero Stuck States)
  updateSidebarActiveState(viewName);

  // Close mobile drawer if open
  document.body.classList.remove('sidebar-mobile-open');
}

function updateSidebarActiveState(viewName) {
  document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.sidebar-sub-link').forEach(el => el.classList.remove('active'));

  const accordMaster = document.getElementById('accordMaster');
  const accordTrans = document.getElementById('accordTrans');

  if (viewName === 'dashboard') {
    const navDash = document.getElementById('nav-dashboard');
    if (navDash) navDash.classList.add('active');
    if (accordMaster) accordMaster.classList.remove('open');
    if (accordTrans) accordTrans.classList.remove('open');
  } 
  else if (viewName === 'master') {
    const subAset = document.getElementById('sub-master-aset');
    if (subAset) subAset.classList.add('active');
    if (accordMaster) accordMaster.classList.add('open');
    if (accordTrans) accordTrans.classList.remove('open');
  } 
  else if (viewName === 'form') {
    const subPengadaan = document.getElementById('sub-trans-pengadaan');
    if (subPengadaan) subPengadaan.classList.add('active');
    if (accordTrans) accordTrans.classList.add('open');
    if (accordMaster) accordMaster.classList.remove('open');
  } 
  else if (viewName === 'laporan') {
    const navLaporan = document.getElementById('nav-laporan');
    if (navLaporan) navLaporan.classList.add('active');
    if (accordMaster) accordMaster.classList.remove('open');
    if (accordTrans) accordTrans.classList.remove('open');
  }
}

function navigateTo(viewName) {
  const targetEl = document.getElementById('view-' + viewName);
  if (targetEl) {
    activateView(viewName, true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const routes = {
      'dashboard': 'dashboard.html#dashboard',
      'master': 'dashboard.html#master',
      'form': 'dashboard.html#form',
      'laporan': 'dashboard.html#laporan'
    };
    if (routes[viewName]) {
      window.location.href = routes[viewName];
    }
  }
}

/**
 * 5. GLOBAL SEARCH SHORTCUT (Ctrl + K)
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
}

/**
 * 6. MODAL DIALOGS
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
      const openModal = document.querySelector('.modal-overlay.open');
      if (openModal) {
        closeModal(openModal.id);
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

// Expose globally
window.openModal = openModal;
window.closeModal = closeModal;
window.navigateTo = navigateTo;
window.activateView = activateView;
