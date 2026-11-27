(() => {
  const config = window.MSA_CONFIG || {};
  const menu = document.querySelector('.menu-toggle');
  const nav = document.getElementById('navigation');
  if (menu && nav) {
    const mobile = window.matchMedia('(max-width: 1000px)');
    const setMenu = (open) => { nav.hidden = mobile.matches && !open; menu.setAttribute('aria-expanded', String(mobile.matches && open)); };
    setMenu(false);
    menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
    mobile.addEventListener('change', () => setMenu(false));
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { setMenu(false); menu.focus(); } });
  }
  try {
    const url = new URL(config.calendlyUrl);
    if (url.protocol === 'https:' && (url.hostname === 'calendly.com' || url.hostname.endsWith('.calendly.com'))) {
      document.querySelectorAll('[data-booking]').forEach(link => { link.href = url.href; if (link.textContent.trim() === 'Request a consultation by text') link.textContent = 'Schedule a Consultation'; });
      document.querySelectorAll('[data-booking-note]').forEach(note => note.hidden = true);
    }
  } catch (_) { /* Booking links retain their working contact fallback. */ }
  if (typeof config.portraitPath === 'string' && config.portraitPath.trim()) {
    document.querySelectorAll('[data-portrait]').forEach(img => {
      img.addEventListener('load', () => { img.hidden = false; const fallback = img.parentElement.querySelector('.portrait-fallback'); if (fallback) fallback.hidden = true, fallback.style.display = 'none'; });
      img.src = config.portraitPath;
    });
  }
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
