// Main JS (assets/js/main.js)
// - Theme toggle (persist in localStorage, respect system preference)
// - Mobile nav toggle
// - Project modal open/close
// - Contact form basic mailto fallback
(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const projectButtons = document.querySelectorAll('.project-card button[data-project]');
  const yearEl = document.getElementById('year');
  const contactForm = document.getElementById('contact-form');

  // Set year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme handling
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = stored ? stored : (prefersDark ? 'dark' : 'light');

  function applyTheme(t) {
    if (t === 'dark') {
      root.setAttribute('data-theme', 'dark');
      themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      root.removeAttribute('data-theme');
      themeToggle.setAttribute('aria-pressed', 'false');
    }
  }

  applyTheme(initialTheme);

  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
    // announce to assistive tech (simple)
    themeToggle.setAttribute('aria-label', `Toggle ${next === 'dark' ? 'dark' : 'light'} mode`);
  });

  // Mobile nav toggle
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      navToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('nav-open');
      nav.setAttribute('aria-hidden', 'true');
    } else {
      navToggle.setAttribute('aria-expanded', 'true');
      nav.classList.add('nav-open');
      nav.setAttribute('aria-hidden', 'false');
    }
  });

  // Close nav when a link is clicked (mobile)
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    nav.setAttribute('aria-hidden', 'true');
  }));

  // Project modal functions
  function openModal(data) {
    modal.setAttribute('aria-hidden', 'false');
    document.getElementById('project-modal-title').textContent = data.title || 'Project';
    document.getElementById('project-modal-desc').textContent = data.desc || '';
    const live = document.getElementById('project-modal-live');
    const code = document.getElementById('project-modal-code');
    if (data.live) { live.href = data.live; live.style.display = 'inline-block'; } else { live.style.display = 'none'; }
    if (data.code) { code.href = data.code; code.style.display = 'inline-block'; } else { code.style.display = 'none'; }
    // trap focus (simple)
    modal.querySelector('.modal-close').focus();
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal(); });

  projectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      let data;
      try {
        data = JSON.parse(btn.getAttribute('data-project'));
      } catch (err) {
        data = { title: 'Project', desc: 'Details unavailable' };
      }
      openModal(data);
    });
  });

  // Basic contact form handling: constructs a mailto if no server is set up
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = encodeURIComponent(contactForm.name.value.trim());
    const email = encodeURIComponent(contactForm.email.value.trim());
    const message = encodeURIComponent(contactForm.message.value.trim());
    // Replace "your-email@example.com" with your address in index.html or change the flow to a server endpoint
    const to = 'your-email@example.com';
    const subject = encodeURIComponent(`Website message from ${name || email}`);
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();