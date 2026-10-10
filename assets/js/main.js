/**
 * SIM-SARPRAS (Sistem Manajemen Sarana dan Prasarana)
 * Client-Side Core UI Controller & Event Handlers
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

  // Restore desktop collapsed preference
  const isCollapsed = localStorage.getItem('sarpras_sidebar_collapsed') === 'true';
  if (window.innerWidth > 1024 && isCollapsed) {
    document.body.classList.add('sidebar-collapsed');
    if (toggleIcon) toggleIcon.textContent = 'chevron_right';
  }

  if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        // Mobile drawer toggle
        document.body.classList.toggle('sidebar-mobile-open');
      } else {
        // Desktop collapse toggle
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

  // Auto handle resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      document.body.classList.remove('sidebar-mobile-open');
    }
  });
}

/**
 * 3. GLOBAL SEARCH KEYBOARD SHORTCUT (Ctrl + K / Cmd + K)
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
 * 4. MODAL DIALOG CONTROLLER (Accessibility & Escape Key)
 */
function initModalListeners() {
  // Close modal when clicking backdrop
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });

  // Close modal on Escape key
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

// Attach modal helpers to window for inline onclick accessibility
window.openModal = openModal;
window.closeModal = closeModal;
