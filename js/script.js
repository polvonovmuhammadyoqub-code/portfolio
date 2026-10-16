const root = document.documentElement;

/* ---------- Qorong'i rejim ---------- */
function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  try { localStorage.setItem('theme', theme); } catch (e) {}
}
let savedTheme = null;
try { savedTheme = localStorage.getItem('theme'); } catch (e) {}
applyTheme(savedTheme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
document.getElementById('theme-toggle').addEventListener('click', () => {
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* ---------- Til almashtirish (uz / ru / en) ---------- */
function setLang(lang) {
  const dict = translations[lang];
  if (!dict) return;
  root.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const text = dict[el.dataset.i18n];
    if (text) el.textContent = text;
  });
  document.querySelectorAll('.lang button').forEach(b => {
    b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
  });
  try { localStorage.setItem('lang', lang); } catch (e) {}
}
document.querySelectorAll('.lang button').forEach(b => {
  b.addEventListener('click', () => setLang(b.dataset.lang));
});
let savedLang = null;
try { savedLang = localStorage.getItem('lang'); } catch (e) {}
setLang(savedLang || 'uz');

document.getElementById('year').textContent = new Date().getFullYear();
