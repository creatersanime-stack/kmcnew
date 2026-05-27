/* ============================================================
   KMC — Khare Surgical & Maternity Center
   Common JavaScript (script.js)
   ============================================================ */

/* ── Mobile Menu Toggle ── */
function toggleMobile() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}

/* ── Active nav link highlight ── */
(function () {
  const page = document.body.dataset.page || '';
  const link = document.getElementById('nav-' + page);
  if (link) link.classList.add('active');
})();

/* ── Services search & filter (services.html only) ── */
function filterServices(query) {
  const q = query.toLowerCase().trim();
  document.querySelectorAll('.svc-card').forEach(card => {
    const text = card.innerText.toLowerCase();
    const tags = (card.dataset.tags || '').toLowerCase();
    card.classList.toggle('hidden', q && !text.includes(q) && !tags.includes(q));
  });
}

function filterCat(cat, el) {
  // Update pill styling
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');

  document.querySelectorAll('.svc-card').forEach(card => {
    if (cat === 'all') {
      card.classList.remove('hidden');
    } else {
      const tags = (card.dataset.tags || '').toLowerCase();
      card.classList.toggle('hidden', !tags.includes(cat));
    }
  });

  // Show/hide category titles gracefully
  document.querySelectorAll('.services-cat-title').forEach(title => {
    if (cat === 'all') {
      title.style.display = '';
      return;
    }
    // Check if any visible sibling cards follow this title
    let next = title.nextElementSibling;
    let hasVisible = false;
    while (next && next.classList.contains('services-cards')) {
      if ([...next.querySelectorAll('.svc-card')].some(c => !c.classList.contains('hidden'))) {
        hasVisible = true;
      }
      next = next.nextElementSibling;
    }
    title.style.display = hasVisible ? '' : 'none';
  });
}

/* ── Appointment form submission ── */
function submitForm() {
  const toast = document.getElementById('successToast');
  if (!toast) return;
  toast.style.display = 'block';
  setTimeout(() => { toast.style.display = 'none'; }, 4000);
}

/* ── Smooth scroll to top on page load ── */
window.addEventListener('load', () => window.scrollTo(0, 0));
