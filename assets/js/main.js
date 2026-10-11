/**
 * SaranaPrasana Asset Management
 * Client-Side Core UI Controller & Clean Multi-Page Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initSidebarController();
  initSearchKeyboardShortcut();
  initModalListeners();
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
  const themeIconContainer = document.getElementById('themeToggleIconContainer');
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeIconContainer) {
      themeIconContainer.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    }
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (themeIconContainer) {
      themeIconContainer.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
    }
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
    if (toggleIcon) toggleIcon.style.transform = 'rotate(180deg)';
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
          toggleIcon.style.transform = collapsedNow ? 'rotate(180deg)' : 'rotate(0deg)';
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
 * 3. ACCORDION MENUS
 */
function toggleAccordion(id) {
  const item = document.getElementById(id);
  if (item) {
    item.classList.toggle('open');
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
}

/**
 * 5. MODAL DIALOGS
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

/**
 * 6. TOAST NOTIFICATIONS
 */
function showToast(msg) {
  const toast = document.getElementById('appToast');
  const msgEl = document.getElementById('toastMessage');
  if (toast && msgEl) {
    msgEl.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
}

// Expose globally
window.openModal = openModal;
window.closeModal = closeModal;
window.toggleAccordion = toggleAccordion;
window.showToast = showToast;
