// =============================================
// Hydratation multi-page depuis content.json
// =============================================
// Chaque page définit `window.PAGE_KEY` ('duo' | 'catherine' | 'dominique')
// Le script lit cette clé pour cibler la bonne section du content.json.
// =============================================

(async function init() {
  let data;
  try {
    const res = await fetch('content.json?v=' + Date.now(), { cache: 'no-store' });
    data = await res.json();
  } catch (err) {
    console.error('Impossible de charger content.json', err);
    return;
  }

  const pageKey = window.PAGE_KEY;
  if (!pageKey || !data[pageKey]) {
    console.error('PAGE_KEY manquant ou inconnu :', pageKey);
    return;
  }

  const pageData = { ...data[pageKey], footer: data.footer };
  hydrateDataKeys(pageData);

  if (pageKey === 'duo') {
    renderSeminaires(pageData.seminaires);
    renderDuoCards(pageData.duo_presentation);
    renderDuoContact(pageData.contact);
    setupContactForm(pageData.contact);
  }

  if (pageKey === 'catherine') {
    renderPrestations(pageData.massages, 'massages-grid');
    renderAteliers(pageData.ateliers, 'ateliers-grid');
    renderFormations(pageData.formations, 'formations-grid');
    renderSoloContact(pageData.contact);
    setupContactForm(pageData.contact);
    setupModals({
      ...indexById(pageData.massages.items),
      ...indexById(pageData.ateliers.items),
    });
    setupImageModal();
  }

  if (pageKey === 'dominique') {
    renderSoins(pageData.soins, 'soins-grid');
    renderSoloContact(pageData.contact);
    setupContactForm(pageData.contact);
    setupModals(indexById(pageData.soins.items));
  }

  setupNav();
  observeFadeIns();
})();

// =============================================
// Helpers
// =============================================
function getPath(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
}

function indexById(items) {
  return Object.fromEntries(items.map(i => [i.id, i]));
}

function hydrateDataKeys(data) {
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.dataset.key;
    const value = getPath(data, key);
    if (value == null) return;

    const attr = el.dataset.attr;
    const isHtml = el.hasAttribute('data-html');
    const list = el.dataset.list;
    const prefix = el.dataset.prefix || '';

    if (attr) { el.setAttribute(attr, value); return; }
    if (list && Array.isArray(value)) {
      el.innerHTML = '';
      value.forEach(item => {
        const node = document.createElement(list);
        if (isHtml) node.innerHTML = item;
        else node.textContent = item;
        el.appendChild(node);
      });
      return;
    }
    if (isHtml) { el.innerHTML = value; return; }
    el.textContent = prefix + value;
  });
}

// =============================================
// Renderers, accueil duo
// =============================================
function renderSeminaires(seminaires) {
  const grid = document.getElementById('seminaires-grid');
  if (!grid) return;
  grid.innerHTML = seminaires.items.map(s => `
    <article class="seminaire-card fade-in">
      <p class="seminaire-card-lieu">${escapeHtml(s.lieu)}</p>
      <h3>${escapeHtml(s.titre)}</h3>
      <p class="seminaire-card-soustitre">${escapeHtml(s.sous_titre || '')}</p>
      <div class="seminaire-meta">
        <span class="seminaire-meta-item"><span class="seminaire-meta-icon">📅</span>${escapeHtml(s.dates)}</span>
        <span class="seminaire-meta-item"><span class="seminaire-meta-icon">👥</span>${escapeHtml(s.places)}</span>
      </div>
      <p class="seminaire-programme-title">Au programme</p>
      <ul class="seminaire-programme">
        ${s.programme.map(p => `<li>${escapeHtml(p)}</li>`).join('')}
      </ul>
      <a href="${escapeAttr(s.calendly_url)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">${escapeHtml(s.cta)} →</a>
    </article>
  `).join('');
}

function renderDuoCards(duoPresentation) {
  const wrap = document.getElementById('duo-cards');
  if (!wrap) return;
  wrap.innerHTML = duoPresentation.cards.map(c => `
    <a href="${escapeAttr(c.lien)}" class="duo-card fade-in">
      <div class="duo-card-image-wrap">
        <img src="${escapeAttr(c.image)}" alt="${escapeAttr(c.nom)}" class="duo-card-image" loading="lazy" />
      </div>
      <div class="duo-card-body">
        <p class="duo-card-marque">${escapeHtml(c.marque)}</p>
        <h3 class="duo-card-nom">${escapeHtml(c.nom)}</h3>
        <p class="duo-card-tagline">${escapeHtml(c.tagline)}</p>
        <span class="btn btn-outline">Découvrir →</span>
      </div>
    </a>
  `).join('');
}

// =============================================
// Renderers, Catherine & Dominique : prestations / soins
// =============================================
function renderPrestations(section, gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = section.items.map(item => `
    <article class="prestation-card fade-in" data-modal="${escapeAttr(item.id)}">
      <img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.title)}" class="prestation-card-image" loading="lazy" />
      <div class="prestation-card-body">
        <div class="prestation-card-header">
          <h3>${escapeHtml(item.title)}</h3>
          <span class="prestation-card-tarif">${escapeHtml(item.tarif)}</span>
        </div>
        <p class="prestation-card-desc">${escapeHtml(item.description)}</p>
        <span class="prestation-card-more">En savoir plus →</span>
      </div>
    </article>
  `).join('');
}

function renderSoins(section, gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = section.items.map(item => `
    <article class="prestation-card fade-in" data-modal="${escapeAttr(item.id)}">
      <div class="prestation-card-image" style="background: linear-gradient(135deg, var(--clr-accent-soft), var(--clr-bg-alt)); display:flex; align-items:center; justify-content:center; padding:1.5rem; text-align:center;">
        <span style="font-family: var(--ff-script); color: var(--clr-accent-dark); font-size: 2.2rem; line-height: 1.1;">${escapeHtml(item.title.split(',')[0])}</span>
      </div>
      <div class="prestation-card-body">
        <div class="prestation-card-header">
          <h3>${escapeHtml(item.title)}</h3>
          <span class="prestation-card-tarif">${escapeHtml(item.tarif)}</span>
        </div>
        ${item.sous_titre ? `<p class="prestation-card-sous-titre">${escapeHtml(item.sous_titre)}</p>` : ''}
        <p class="prestation-card-duree">⏱ ${escapeHtml(item.duree)}</p>
        <p class="prestation-card-desc">${escapeHtml(item.description)}</p>
        <span class="prestation-card-more">En savoir plus →</span>
      </div>
    </article>
  `).join('');
}

function renderAteliers(section, gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = section.items.map(item => `
    <article class="prestation-card is-atelier fade-in" data-modal="${escapeAttr(item.id)}">
      <div class="prestation-card-image">${escapeHtml(item.vignette_text || item.title)}</div>
      <div class="prestation-card-body">
        <div class="prestation-card-header">
          <h3>${escapeHtml(item.title)}</h3>
          <span class="prestation-card-tarif">${escapeHtml(item.tarif)}</span>
        </div>
        <p class="prestation-card-duree">⏱ ${escapeHtml(item.duree)}</p>
        <p class="prestation-card-desc">${escapeHtml(item.description)}</p>
        <span class="prestation-card-more">En savoir plus →</span>
      </div>
    </article>
  `).join('');
}

function renderFormations(section, gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = section.items.map(item => `
    <article class="formation-card fade-in" data-image-modal="${escapeAttr(item.image)}" data-image-alt="${escapeAttr(item.title)}" tabindex="0" role="button" aria-label="Voir le détail : ${escapeAttr(item.title)}">
      <img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.title)}" class="formation-card-image" loading="lazy" />
      <div class="formation-card-body">
        <h3>${escapeHtml(item.title)}</h3>
        <div class="formation-card-meta">
          <span>${escapeHtml(item.duree)}</span>
          <span class="formation-card-tarif">${escapeHtml(item.tarif)}</span>
        </div>
        ${item.extras ? `<p class="formation-card-extras">${escapeHtml(item.extras)}</p>` : ''}
      </div>
    </article>
  `).join('');
}

// =============================================
// Modals
// =============================================
function setupModals(byId) {
  const overlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.querySelector('.modal-close');
  if (!overlay || !modalBody) return;

  const modalBox = overlay.querySelector('.modal-box');

  document.addEventListener('click', e => {
    const card = e.target.closest('[data-modal]');
    if (!card) return;
    const item = byId[card.dataset.modal];
    if (!item) return;
    modalBody.innerHTML = renderModalContent(item);
    modalBox?.classList.remove('is-image-only');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  modalClose?.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

// Modal image-only (utilisé pour les flyers de formation)
function setupImageModal() {
  const overlay = document.getElementById('modal-overlay');
  const modalBox = overlay?.querySelector('.modal-box');
  const modalBody = document.getElementById('modal-body');
  if (!overlay || !modalBody || !modalBox) return;

  document.addEventListener('click', e => {
    const card = e.target.closest('[data-image-modal]');
    if (!card) return;
    const src = card.dataset.imageModal;
    const alt = card.dataset.imageAlt || '';
    modalBody.innerHTML = `<img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}" class="modal-image-fullsize" />`;
    modalBox.classList.add('is-image-only');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = document.activeElement?.closest('[data-image-modal]');
    if (!card) return;
    e.preventDefault();
    card.click();
  });

  // Nettoyage du flag is-image-only à la fermeture
  const reset = () => modalBox.classList.remove('is-image-only');
  overlay.addEventListener('transitionend', () => { if (!overlay.classList.contains('open')) reset(); });
  document.querySelector('.modal-close')?.addEventListener('click', reset);
  overlay.addEventListener('click', e => { if (e.target === overlay) reset(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') reset(); });
}

function renderModalContent(item) {
  const parts = [];
  // Image principale (jpg) ou pas (atelier/soin)
  if (item.image && /\.(jpg|jpeg|png|webp)$/i.test(item.image)) {
    parts.push(`<img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.title)}" class="modal-image" />`);
  }
  parts.push(`<h2>${escapeHtml(item.title)}</h2>`);
  if (item.sous_titre) parts.push(`<p class="modal-subtitle">${escapeHtml(item.sous_titre)}</p>`);

  parts.push(`<div class="modal-meta">`);
  if (item.duree) parts.push(`<span class="modal-meta-pill">⏱ ${escapeHtml(item.duree)}</span>`);
  if (item.tarif) parts.push(`<span class="modal-meta-pill">${escapeHtml(item.tarif)}</span>`);
  parts.push(`</div>`);

  if (item.long_description) parts.push(`<p>${escapeHtml(item.long_description)}</p>`);
  else if (item.description) parts.push(`<p>${escapeHtml(item.description)}</p>`);

  if (item.indications && item.indications.length) {
    parts.push(`<div class="modal-indications">
      <p class="modal-indications-title">Indications</p>
      <ul>${item.indications.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>
    </div>`);
  }

  parts.push(`<div class="modal-actions">`);
  parts.push(`<a href="#rdv" class="btn btn-primary modal-link">Réserver →</a>`);
  if (item.pdf_url) {
    parts.push(`<a href="${escapeAttr(item.pdf_url)}" target="_blank" rel="noopener" class="btn btn-outline">Télécharger la fiche PDF</a>`);
  }
  parts.push(`</div>`);

  return parts.join('');
}

// =============================================
// Contact details (rendu dynamique)
// =============================================
function renderDuoContact(contact) {
  const ul = document.getElementById('contact-details');
  if (!ul || !contact) return;
  ul.innerHTML = `
    <li><span class="contact-icon">✉</span><span><strong>Catherine</strong><br /><a href="mailto:${escapeAttr(contact.email_catherine)}">${escapeHtml(contact.email_catherine)}</a></span></li>
    <li><span class="contact-icon">✉</span><span><strong>Dominique</strong><br /><a href="mailto:${escapeAttr(contact.email_dominique)}">${escapeHtml(contact.email_dominique)}</a></span></li>
    <li><span class="contact-icon">☎</span><span><strong>Catherine</strong><br /><a href="tel:${escapeAttr(contact.phone_catherine_link)}">${escapeHtml(contact.phone_catherine_display)}</a></span></li>
    <li><span class="contact-icon">☎</span><span><strong>Dominique</strong><br /><a href="tel:${escapeAttr(contact.phone_dominique_link)}">${escapeHtml(contact.phone_dominique_display)}</a></span></li>
  `;
}

function renderSoloContact(contact) {
  const ul = document.getElementById('contact-details');
  if (!ul || !contact) return;
  const parts = [
    `<li><span class="contact-icon">✉</span><a href="mailto:${escapeAttr(contact.email)}">${escapeHtml(contact.email)}</a></li>`,
    `<li><span class="contact-icon">☎</span><a href="tel:${escapeAttr(contact.phone_link)}">${escapeHtml(contact.phone_display)}</a></li>`,
  ];
  if (contact.address) {
    parts.push(`<li><span class="contact-icon">📍</span>${escapeHtml(contact.address).replace(/\n/g, '<br />')}</li>`);
  }
  ul.innerHTML = parts.join('');
}

// =============================================
// Contact form (Formspree)
// =============================================
function setupContactForm(contact) {
  const form = document.getElementById('contact-form');
  if (!form || !contact) return;
  const id = contact.formspree_id;
  if (id && id !== 'PLACEHOLDER_ID') {
    form.action = `https://formspree.io/f/${id}`;
  }
  form.addEventListener('submit', () => {
    if (!id || id === 'PLACEHOLDER_ID') {
      // Mode démo : empêcher l'envoi
      // (formulaire en attente de configuration Formspree)
    }
  });
}

// =============================================
// Nav, fade-in
// =============================================
function setupNav() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  toggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  const header = document.querySelector('.nav-header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 20px rgba(58, 48, 40, 0.10)'
      : 'none';
  }, { passive: true });
}

function observeFadeIns() {
  document.querySelectorAll('.fade-in').forEach(el => {
    new IntersectionObserver(([entry], obs) => {
      if (entry.isIntersecting) {
        el.classList.add('visible');
        obs.unobserve(el);
      }
    }, { threshold: 0.1 }).observe(el);
  });
}

// =============================================
// Escape utilities
// =============================================
function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function escapeAttr(s) { return escapeHtml(s); }
