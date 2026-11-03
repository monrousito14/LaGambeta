'use strict';
/* ==========================================================
   CONFIGURACIÓN (edita aquí)
   ========================================================== */
// Número de WhatsApp en formato internacional, sin "+", espacios ni guiones. Ej: '56912345678'
const WHATSAPP_NUMBER = '56951685907';
const STORAGE_KEY = 'lagambeta-closet-v1';
const MAX_QTY = 10;

// Tipos de camiseta (la clave se usa en los precios de cada producto)
const TYPES = { estandar: 'Estándar', termosellada: 'Termosellada' };

// Textos comparativos por defecto. [EJEMPLO]: reemplázalos con información real.
// Cada producto puede traer su propio campo "compare" para sobrescribirlos.
const TYPE_COMPARE = {
  estandar: '[EJEMPLO] Texto de la camiseta Estándar. Reemplázalo con la descripción real.',
  termosellada: '[EJEMPLO] Texto de la camiseta Termosellada. Reemplázalo con la descripción real.'
};

// Tallas disponibles en la tienda (orden de aparición)
const SIZES = ['S', 'M', 'L', 'XL'];

// Categorías: una por liga y una para selecciones
const CATEGORIES = [
  { id: 'chile', label: 'Chile — Liga de Primera' },
  { id: 'argentina', label: 'Argentina — Liga Profesional' },
  { id: 'espana', label: 'España — LaLiga' },
  { id: 'inglaterra', label: 'Inglaterra — Premier League' },
  { id: 'italia', label: 'Italia — Serie A' },
  { id: 'alemania', label: 'Alemania — Bundesliga' },
  { id: 'francia', label: 'Francia — Ligue 1' },
  { id: 'selecciones', label: 'Selecciones nacionales' }
];

/* ==========================================================
   PRODUCTOS DE DEMOSTRACIÓN
   Para agregar uno: copia una línea P(...) y cambia los datos.
   P(id, equipo, país, categoría, temporada, modelo, precio Estándar, precio Termosellada, {extras})
   Fotos por defecto: assets/<id>-frente.jpg, -espalda.jpg y -detalle.jpg
   Extras opcionales: photos, desc, sizes, compare, types
   ========================================================== */
const allSizes = () => Object.fromEntries(SIZES.map(s => [s, ['estandar', 'termosellada']]));
function P(id, team, country, cat, season, model, std, thermo, extra = {}) {
  return {
    id, name: `${team} ${model}`, team, country, cat, season, model,
    desc: '[DEMO] Descripción de ejemplo. Reemplázala con la descripción real de la camiseta.',
    // ▼▼ FOTOS DE LA CAMISETA: la 1.ª es la del catálogo y la vista rápida; la 2.ª y 3.ª, miniaturas.
    //    Por defecto busca assets/<id>-frente.jpg, -espalda.jpg y -detalle.jpg (cambia las rutas aquí para todos).
    //    Para una camiseta puntual, agrega { photos: ['assets/mi-foto-1.jpg', 'assets/mi-foto-2.jpg'] } al final de su línea P(...).
    photos: [`assets/${id}-frente.jpg`, `assets/${id}-espalda.jpg`, `assets/${id}-detalle.jpg`],
    types: { estandar: std, termosellada: thermo },
    sizes: allSizes(), // { talla: [tipos ofrecidos] }. Quita un tipo o una talla para deshabilitarlo.
    compare: null,
    ...extra
  };
}
// ▼▼ AQUÍ VAN TUS CAMISETAS: una línea P(...) por producto. Sus fotos se conectan según el comentario de la función P de arriba. ▼▼
const PRODUCTS = [
  P('colo-colo-local', 'Colo-Colo', 'Chile', 'chile', '2026', 'Local', 19990, 25990, { photos : ['assets/camisetaColoColoLocal.png']}),

  P('colo-colo-visitante', 'Colo-Colo', 'Chile', 'chile', '2026', 'Visitante', 19990, 25990, { photos : ['assets/camisetaColoColoVisitante.png']}),  
  
  P('universidad-de-chile-local', 'Universidad de Chile', 'Chile', 'chile', '2026', 'Local', 19990, 25990, { photos : ['assets/camisetaUChileLocal.png']}),
  
  P('universidad-de-chile-visitante', 'Universidad de Chile', 'Chile', 'chile', '2026', 'Visitante', 19990, 25990, { photos : ['assets/camisetaUChileVisitante.png']}),

  P('universidad-catolica-local', 'Universidad Catolica', 'Chile', 'chile', '2026', 'Local', 19990, 25990, { photos : ['assets/camisetaUCLocal.png']}),

  P('universidad-catolica-visitante', 'Universidad Catolica', 'Chile', 'chile', '2026', 'Visitante', 19990, 25990, { photos : ['assets/camisetaUCVisitante.png']}),

  P('river-plate-local', 'River Plate', 'Argentina', 'argentina', '2026/27', 'Local', 19990, 25990, { photos : ['assets/camisetaRiverPlateLocal.png']}),

  P('river-plate-visitante', 'River Plate', 'Argentina', 'argentina', '2026/27', 'Visitante', 19990, 25990, { photos : ['assets/camisetaRiverPlateVisitante.png']}),
  
  P('boca-juniors-local', 'Boca Juniors', 'Argentina', 'argentina', '2026/27', 'Local', 19990, 25990, { photos : ['assets/camisetaBocaJrLocal.png']}),
  
  P('boca-juniors-visitante', 'Boca Juniors', 'Argentina', 'argentina', '2026/27', 'Visitante', 19990, 25990, { photos : ['assets/camisetaBocaJrVisitante.png']}),

  P('barcelona-local', 'Barcelona', 'España', 'espana', '2026/27', 'Local', 19990, 25990,
    { photos : ['assets/camisetaBarcelonaLocal.png']}),

  P('barcelona-visitante', 'Barcelona', 'España', 'espana', '2026/27', 'Visitante', 19990, 25990, { photos : ['assets/camisetaBarcelonaVisitante.png']}),
  
  P('real-madrid-local', 'Real Madrid', 'España', 'espana', '2026/27', 'Local', 19990, 25990, { photos : ['assets/camisetaRealMadridLocal.png']}),

  P('real-madrid-visitante', 'Real Madrid', 'España', 'espana', '2026/27', 'Visitante', 19990, 25990, { photos : ['assets/camisetaRealMadridVisitante.png']}),
  
  P('manchester-city-local', 'Manchester City', 'Inglaterra', 'inglaterra', '2026/27', 'Local', 19990, 25990, { photos : ['assets/camisetaManCityLocal.png']}),

  P('manchester-city-visitante', 'Manchester City', 'Inglaterra', 'inglaterra', '2026/27','Visitante', 19990, 25990, { photos : ['assets/camisetaManCityVisitante.png']}),

  
  P('juventus-local', 'Juventus', 'Italia', 'italia', '2026/27', 'Local', 19990, 25990, { photos : ['assets/camisetaJuventusLocal.png']}),

  P('juventus-visitante', 'Juventus', 'Italia', 'italia', '2026/27', 'Visitante', 19990, 25990, { photos : ['assets/camisetaJuventusVisitante.png']}),
  
  P('bayern-munich-local', 'Bayern Múnich', 'Alemania', 'alemania', '2026/27', 'Local', 19990, 25990, { photos : ['assets/camisetaBayernLocal.png']}),

  P('bayern-munich-visitante', 'Bayern Múnich', 'Alemania', 'alemania', '2026/27', 'Visitante', 19990, 25990, { photos : ['assets/camisetaBayernVisitante.png']}),

  
  P('psg-local', 'París Saint-Germain', 'Francia', 'francia', '2026/27', 'Local', 19990, 25990, { photos : ['assets/camisetaPsgLocal.png']}),

  P('psg-visitante', 'París Saint-Germain', 'Francia', 'francia', '2026/27', 'Visitante', 19990, 25990, { photos : ['assets/camisetaPsgVisitante.png']}),
  
  P('chile-seleccion-local', 'Selección de Chile', 'Chile', 'selecciones', '2026', 'Local', 19990, 25990, { photos : ['assets/camisetaChileLocal.png']}),

  P('chile-seleccion-visitante', 'Selección de Chile', 'Chile', 'selecciones', '2026', 'Visitante', 19990, 25990, { photos : ['assets/camisetaChileVisitante.png']}),
  
  P('argentina-seleccion-local', 'Selección de Argentina', 'Argentina', 'selecciones', '2026', 'Local', 19990, 25990, { photos : ['assets/camisetaArgLocal.png']}),

  P('argentina-seleccion-visitante', 'Selección de Argentina', 'Argentina', 'selecciones', '2026', 'Visitante', 19990, 25990, { photos : ['assets/camisetaArgVisitante.png']}),
  
  P('brasil-seleccion-local', 'Selección de Brasil', 'Brasil', 'selecciones', '2026', 'Local', 19990, 25990, { photos : ['assets/camisetaBrasilLocal.png']}),

  P('brasil-seleccion-visita', 'Selección de Brasil', 'Brasil', 'selecciones', '2026', 'Visita', 19990, 25990, { photos : ['assets/camisetaBrasilVisitante.png']})
];

/* ==========================================================
   UTILIDADES
   ========================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
const fmt = n => money.format(n);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const byId = id => PRODUCTS.find(p => p.id === id);
const catOf = id => CATEGORIES.find(c => c.id === id) || { id, label: id };
const minPrice = p => Math.min(...Object.values(p.types));
const offered = (p, size) => (p.sizes[size] || []).filter(t => p.types[t] != null && TYPES[t]);
const valid = (p, size, type) => offered(p, size).includes(type);
const sizesOf = p => SIZES.filter(s => offered(p, s).length);
const typesOf = p => Object.keys(TYPES).filter(t => p.types[t] != null);
const clampQty = n => Math.min(MAX_QTY, Math.max(1, parseInt(n, 10) || 1));
const PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="#f4f4f4"/><path d="M130 110l60 30 20-10 20 10 60-30 60 50-40 60-30-15v215H140V205l-30 15-40-60z" fill="#e2e2e2" stroke="#9a9a9a" stroke-width="4" transform="translate(-20 20)"/><text x="200" y="450" font-family="sans-serif" font-size="20" fill="#595959" text-anchor="middle">Imagen no disponible</text></svg>');
document.addEventListener('error', e => {
  const t = e.target;
  if (t.tagName === 'IMG' && !t.dataset.fb) { t.dataset.fb = '1'; t.src = PLACEHOLDER; }
}, true);
const PHOTO_LABELS = ['Frente', 'Espalda', 'Detalle'];

/* ==========================================================
   ESTADO
   ========================================================== */
const view = { q: '', cat: '', sort: 'name-asc' };
let cart = loadCart();
const main = $('#main'), drawer = $('#drawer'), modal = $('#modal'), overlay = $('#overlay'), toastEl = $('#toast');

function loadCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(raw)) return [];
    const out = [];
    raw.forEach(it => {
      const p = it && byId(it.pid);
      if (!p || !valid(p, it.size, it.type)) return;
      const ex = out.find(o => o.pid === it.pid && o.size === it.size && o.type === it.type);
      if (ex) ex.qty = clampQty(ex.qty + clampQty(it.qty));
      else out.push({ pid: it.pid, size: it.size, type: it.type, qty: clampQty(it.qty) });
    });
    return out;
  } catch (e) { return []; }
}
function saveCart() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (e) { /* almacenamiento no disponible */ } }
const totalUnits = () => cart.reduce((n, i) => n + i.qty, 0);
const unitPrice = i => byId(i.pid).types[i.type];
const totalPrice = () => cart.reduce((n, i) => n + unitPrice(i) * i.qty, 0);

function addToCart(pid, size, type, qty) {
  const ex = cart.find(i => i.pid === pid && i.size === size && i.type === type);
  if (ex) ex.qty = clampQty(ex.qty + qty); else cart.push({ pid, size, type, qty: clampQty(qty) });
  cartChanged();
}
// Cambia talla/tipo de un artículo; si coincide con otro, fusiona cantidades
function editItem(i, size, type) {
  const it = cart[i], p = byId(it.pid);
  if (!valid(p, size, type)) { const t = offered(p, size)[0]; if (!t) return; type = t; }
  it.size = size; it.type = type;
  const j = cart.findIndex((o, k) => k !== i && o.pid === it.pid && o.size === size && o.type === type);
  if (j >= 0) { cart[j].qty = clampQty(cart[j].qty + it.qty); cart.splice(i, 1); }
  cartChanged();
}
function cartChanged() {
  saveCart();
  const n = totalUnits(), c = $('#count');
  c.textContent = n; c.setAttribute('aria-label', `${n} ${n === 1 ? 'unidad' : 'unidades'}`);
  if (!drawer.hidden) renderDrawer();
}

/* ==========================================================
   PANELES (clóset y vista rápida): foco, Escape, teclado
   ========================================================== */
let active = null, opener = null;
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';
function openPanel(el, from) {
  if (active) closePanel(false);
  opener = from || document.activeElement;
  active = el; el.hidden = false; overlay.hidden = false; document.body.classList.add('lock');
  const f = $$(FOCUSABLE, el)[0]; (f || el).focus();
}
function closePanel(restore = true) {
  if (!active) return;
  active.hidden = true; overlay.hidden = true; document.body.classList.remove('lock');
  active = null;
  if (restore && opener && document.contains(opener)) opener.focus();
}
overlay.addEventListener('click', () => closePanel());
document.addEventListener('keydown', e => {
  if (!active) return;
  if (e.key === 'Escape') { e.preventDefault(); closePanel(); return; }
  if (e.key === 'Tab') {
    const f = $$(FOCUSABLE, active).filter(x => x.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

let toastTimer;
function toast(msg, withLink) {
  toastEl.innerHTML = `<span>${esc(msg)}</span>` + (withLink ? '<button type="button" id="toastOpen">Ver Mi clóset</button>' : '');
  toastEl.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove('show'), 4500);
  const b = $('#toastOpen'); if (b) b.onclick = () => { toastEl.classList.remove('show'); openCloset(b); };
}

/* ==========================================================
   SELECTOR DE OPCIONES (usado en vista individual y vista rápida)
   ========================================================== */
function mountOptions(root, p, uid, onAdd) {
  const sel = { size: null, type: null, qty: 1 };
  const sizes = sizesOf(p), types = typesOf(p), cmp = { ...TYPE_COMPARE, ...(p.compare || {}) };
  const diffText = t => {
    if (t === 'estandar' || p.types.estandar == null) return t === 'estandar' ? 'Precio base' : '';
    const d = p.types[t] - p.types.estandar;
    return d === 0 ? 'Mismo precio que Estándar' : `${d > 0 ? '+' : '−'}${fmt(Math.abs(d))} respecto a Estándar`;
  };
  root.innerHTML = `
    <fieldset class="opt"><legend>Talla <span class="req">obligatoria</span></legend>
      <div class="chips">${sizes.map(s => `<label class="chip"><input type="radio" name="${uid}-size" value="${s}"><span>${s}</span></label>`).join('')}</div></fieldset>
    <fieldset class="opt"><legend>Tipo <span class="req">obligatorio</span></legend>
      <div class="types">${types.map(t => `<label class="typecard"><input type="radio" name="${uid}-type" value="${t}"><span><b>${TYPES[t]}</b><em>${fmt(p.types[t])}</em><small>${esc(diffText(t))}</small></span></label>`).join('')}</div></fieldset>
    <div class="compare">${types.map(t => `<div><h4>${TYPES[t]}</h4><p>${esc(cmp[t] || '')}</p></div>`).join('')}</div>
    <div class="qtyrow"><label for="${uid}-qty">Cantidad</label>
      <div class="stepper"><button type="button" data-q="-1" aria-label="Disminuir cantidad">−</button>
      <input id="${uid}-qty" type="number" min="1" max="${MAX_QTY}" value="1" inputmode="numeric">
      <button type="button" data-q="1" aria-label="Aumentar cantidad">+</button></div></div>
    <p class="sum" aria-live="polite"></p>
    <p class="err" role="alert"></p>
    <button class="btn dark big" type="button" data-add>Agregar a mi clóset</button>`;
  const qty = $(`#${uid}-qty`, root), sum = $('.sum', root), err = $('.err', root);
  function refresh() {
    $$('input[name$="-type"]', root).forEach(r => {
      const bad = sel.size && !valid(p, sel.size, r.value);
      r.disabled = !!bad;
      r.parentElement.title = bad ? `No disponible en talla ${sel.size}` : '';
      if (bad && r.checked) { r.checked = false; sel.type = null; }
    });
    $$('input[name$="-size"]', root).forEach(r => {
      const bad = sel.type && !valid(p, r.value, sel.type);
      r.disabled = !!bad;
      r.parentElement.title = bad ? `No disponible en tipo ${TYPES[sel.type]}` : '';
    });
    $('[data-q="-1"]', root).disabled = sel.qty <= 1;
    $('[data-q="1"]', root).disabled = sel.qty >= MAX_QTY;
    sum.innerHTML = sel.type
      ? `Precio unitario: <b>${fmt(p.types[sel.type])}</b><br>Importe por ${sel.qty} ${sel.qty === 1 ? 'unidad' : 'unidades'}: <b>${fmt(p.types[sel.type] * sel.qty)}</b>`
      : `Desde <b>${fmt(minPrice(p))}</b>. Elige talla y tipo para ver el importe.`;
  }
  root.addEventListener('change', e => {
    const t = e.target;
    if (t.name === `${uid}-size`) sel.size = t.value;
    else if (t.name === `${uid}-type`) sel.type = t.value;
    else if (t === qty) { sel.qty = clampQty(qty.value); qty.value = sel.qty; }
    err.textContent = ''; refresh();
  });
  root.addEventListener('click', e => {
    const q = e.target.closest('[data-q]');
    if (q) { sel.qty = clampQty(sel.qty + +q.dataset.q); qty.value = sel.qty; refresh(); return; }
    if (!e.target.closest('[data-add]')) return;
    if (!sel.size) { err.textContent = 'Elige una talla.'; return; }
    if (!sel.type) { err.textContent = 'Elige el tipo: Estándar o Termosellada.'; return; }
    if (!valid(p, sel.size, sel.type)) { err.textContent = 'Esa combinación no está disponible.'; return; }
    addToCart(p.id, sel.size, sel.type, sel.qty);
    toast(`${p.name} (${sel.size}, ${TYPES[sel.type]}) agregada a Mi clóset`, true);
    if (onAdd) onAdd();
  });
  refresh();
}

/* ==========================================================
   VISTAS
   ========================================================== */
function catalogView() {
  main.innerHTML = `
    <section class="hero" aria-labelledby="heroTitle">
      <svg viewBox="0 0 400 300" fill="none" stroke="#fff" stroke-width="3" aria-hidden="true"><rect x="4" y="4" width="392" height="292"/><path d="M200 4v292"/><circle cx="200" cy="150" r="50"/><circle cx="200" cy="150" r="4" fill="#fff"/><rect x="4" y="75" width="70" height="150"/><rect x="326" y="75" width="70" height="150"/><rect x="4" y="115" width="26" height="70"/><rect x="370" y="115" width="26" height="70"/></svg>
      <div class="wrap"><h1 id="heroTitle">Camisetas de fútbol, Ligas y selecciones.</h1>
      <p>Elige talla y tipo, arma Mi clóset y consulta la disponibilidad por WhatsApp.</p></div>
    </section>
    <section class="wrap catalog" aria-label="Catálogo">
      <div class="toolbar">
        <div class="chips-row" role="group" aria-label="Filtrar por categoría">
          <button type="button" class="pill-btn" data-cat="">Todo</button>
          ${CATEGORIES.map(c => `<button type="button" class="pill-btn" data-cat="${c.id}">${esc(c.label)}</button>`).join('')}
        </div>
        <div class="tools">
          <label for="sort">Ordenar</label>
          <select id="sort">
            <option value="name-asc">Nombre (A a Z)</option><option value="name-desc">Nombre (Z a A)</option>
            <option value="price-asc">Precio (menor a mayor)</option><option value="price-desc">Precio (mayor a menor)</option>
          </select>
          <button type="button" class="linkbtn" id="clearBtn">Limpiar filtros</button>
        </div>
      </div>
      <p class="result-count" id="resultCount" aria-live="polite"></p>
      <div class="grid" id="grid"></div>
    </section>`;
  $('#sort').value = view.sort;
  updateGrid();
}
function results() {
  const words = norm(view.q).split(/\s+/).filter(Boolean);
  const list = PRODUCTS.filter(p => {
    if (view.cat && p.cat !== view.cat) return false;
    const hay = norm([p.name, p.team, p.country, p.season, p.model, catOf(p.cat).label].join(' '));
    return words.every(w => hay.includes(w));
  });
  const [k, d] = view.sort.split('-'), s = d === 'desc' ? -1 : 1;
  list.sort((a, b) => k === 'price' ? (minPrice(a) - minPrice(b)) * s : a.name.localeCompare(b.name, 'es') * s);
  return list;
}
function cardHTML(p) {
  return `<article class="card">
    <a class="shot" href="#producto/${p.id}" tabindex="-1" aria-hidden="true"><img src="${esc(p.photos[0])}" alt="" loading="lazy"></a>
    <div class="info">
      <p class="tag">${esc(catOf(p.cat).label)}</p>
      <h3>${esc(p.team)}</h3>
      <p class="meta"><span>Temporada ${esc(p.season)}</span><span class="badge">${esc(p.model)}</span>${p.cat === 'selecciones' ? `<span class="badge">${esc(p.country)}</span>` : ''}</p>
      <p class="price"><small>Desde</small> ${fmt(minPrice(p))}</p>
      <div class="actions"><a class="btn dark" href="#producto/${p.id}" aria-label="Ver camiseta ${esc(p.name)}">Ver camiseta</a>
      <button class="btn" type="button" data-quick="${p.id}" aria-label="Vista rápida de ${esc(p.name)}">Vista rápida</button></div>
    </div></article>`;
}
function updateGrid() {
  const list = results(), grid = $('#grid');
  if (!grid) return;
  $$('.pill-btn').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.cat === view.cat)));
  $('#resultCount').textContent = `${list.length} ${list.length === 1 ? 'camiseta' : 'camisetas'}`;
  grid.innerHTML = list.length ? list.map(cardHTML).join('') :
    `<div class="empty"><h2>No encontramos camisetas</h2><p>Prueba con otro equipo, otra temporada o quita algún filtro.</p><button class="btn dark" type="button" data-clear>Limpiar filtros</button></div>`;
  
}
function clearFilters() { view.q = ''; view.cat = ''; view.sort = 'name-asc'; $('#q').value = ''; const s = $('#sort'); if (s) s.value = view.sort; updateGrid(); }

function productView(p) {
  const photos = p.photos.length ? p.photos : [''];
  const lab = i => PHOTO_LABELS[i] || `Foto ${i + 1}`;
  main.innerHTML = `<div class="wrap product">
    <a class="back" href="#catalogo">← Volver al catálogo</a>
    <div class="pgrid">
      <div class="gallery">
        <div class="main-img"><img id="mainImg" src="${esc(photos[0])}" alt="${esc(p.name)}, temporada ${esc(p.season)}: ${lab(0)}"></div>
        <div class="thumbs">${photos.map((ph, i) => `<button type="button" class="thumb" data-i="${i}" aria-pressed="${i === 0}" aria-label="Ver foto: ${lab(i)}"><img src="${esc(ph)}" alt=""></button>`).join('')}</div>
      </div>
      <div class="pinfo">
        <p class="tag">${esc(catOf(p.cat).label)}${p.cat === 'selecciones' ? ', ' + esc(p.country) : ''}</p>
        <h1>${esc(p.name)}</h1>
        <p class="meta"><span>${esc(p.team)}</span><span>Temporada ${esc(p.season)}</span><span class="badge">${esc(p.model)}</span></p>
        <p class="desc">${esc(p.desc)}</p>
        <div id="opts"></div>
      </div></div></div>`;
  $$('.thumb').forEach(b => b.onclick = () => {
    const i = +b.dataset.i, img = $('#mainImg');
    delete img.dataset.fb; img.src = photos[i]; img.alt = `${p.name}, temporada ${p.season}: ${lab(i)}`;
    $$('.thumb').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  });
  mountOptions($('#opts'), p, 'p');
  document.title = `${p.name} | LaGambeta`;
}
function notFoundView() {
  main.innerHTML = `<div class="wrap product"><div class="empty"><h1>No encontramos esa camiseta</h1><a class="btn dark" href="#catalogo">Volver al catálogo</a></div></div>`;
}

function openQuick(id, from) {
  const p = byId(id); if (!p) return;
  modal.innerHTML = `<button class="close" type="button" data-close aria-label="Cerrar vista rápida">✕</button>
    <div class="qgrid">
      <div class="main-img"><img src="${esc(p.photos[0])}" alt="${esc(p.name)}, temporada ${esc(p.season)}"></div>
      <div class="pinfo">
        <p class="tag">${esc(catOf(p.cat).label)}</p>
        <h2 id="modalTitle">${esc(p.name)}</h2>
        <p class="meta"><span>Temporada ${esc(p.season)}</span><span class="badge">${esc(p.model)}</span></p>
        <div id="qopts"></div>
        <a class="back" href="#producto/${p.id}">Ver página completa</a>
      </div></div>`;
  mountOptions($('#qopts', modal), p, 'q', () => closePanel());
  openPanel(modal, from);
}

/* ==========================================================
   MI CLÓSET
   ========================================================== */
function openCloset(from) { renderDrawer(); openPanel(drawer, from || $('#closetBtn')); }
function renderDrawer() {
  const focusKey = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.f : null;
  const n = totalUnits();
  const waOk = /^\d{8,15}$/.test(WHATSAPP_NUMBER);
  let body;
  if (!cart.length) {
    body = `<div class="cempty"><h3>Mi clóset está vacío</h3><p>Agrega camisetas desde el catálogo para armar tu consulta.</p><button class="btn dark" type="button" data-close>Ir al catálogo</button></div>`;
  } else {
    body = cart.map((it, i) => {
      const p = byId(it.pid);
      return `<div class="item"><div class="th"><img src="${esc(p.photos[0])}" alt="${esc(p.name)}"></div>
        <div><h3>${esc(p.name)}</h3><p class="sub">Temporada ${esc(p.season)}, ${esc(p.model)}</p>
        <div class="sel">
          <label>Talla<select data-edit="size" data-i="${i}" data-f="size-${i}">${sizesOf(p).map(s => `<option value="${s}"${s === it.size ? ' selected' : ''}>${s}</option>`).join('')}</select></label>
          <label>Tipo<select data-edit="type" data-i="${i}" data-f="type-${i}">${offered(p, it.size).map(t => `<option value="${t}"${t === it.type ? ' selected' : ''}>${TYPES[t]}</option>`).join('')}</select></label>
        </div>
        <p class="sub">Precio unitario: ${fmt(unitPrice(it))}</p>
        <div class="irow">
          <div class="stepper"><button type="button" data-act="dec" data-i="${i}" data-f="dec-${i}" aria-label="Disminuir cantidad de ${esc(p.name)}"${it.qty <= 1 ? ' disabled' : ''}>−</button>
          <input type="number" min="1" max="${MAX_QTY}" value="${it.qty}" data-act="qty" data-i="${i}" data-f="qty-${i}" aria-label="Cantidad de ${esc(p.name)}">
          <button type="button" data-act="inc" data-i="${i}" data-f="inc-${i}" aria-label="Aumentar cantidad de ${esc(p.name)}"${it.qty >= MAX_QTY ? ' disabled' : ''}>+</button></div>
          <span class="st">${fmt(unitPrice(it) * it.qty)}</span>
          <button class="rm" type="button" data-act="rm" data-i="${i}" aria-label="Eliminar ${esc(p.name)}">Eliminar</button>
        </div></div></div>`;
    }).join('');
  }
  drawer.innerHTML = `<div class="dh"><h2 id="drawerTitle">Mi clóset</h2><button class="close" type="button" data-close aria-label="Cerrar Mi clóset">✕</button></div>
    <div class="db">${body}</div>
    ${cart.length ? `<div class="df">
      <div class="line"><span>Total de unidades</span><strong>${n}</strong></div>
      <div class="line total"><span>Total estimado</span><span>${fmt(totalPrice())}</span></div>
      <p class="note">Disponibilidad por confirmar. Envío no incluido.</p>
      ${waOk ? '' : '<p class="warn" id="waWarn">Falta configurar el número de WhatsApp de la tienda (constante WHATSAPP_NUMBER en script.js).</p>'}
      <button class="btn dark big" type="button" data-act="wa">Consultar disponibilidad por WhatsApp</button>
      <button class="btn" type="button" data-close>Continuar explorando</button>
      <button class="linkbtn" type="button" data-act="clear">Vaciar Mi clóset</button></div>` : ''}`;
  if (focusKey) { const f = $(`[data-f="${focusKey}"]`, drawer); if (f) f.focus(); }
}
drawer.addEventListener('click', e => {
  if (e.target.closest('[data-close]')) { closePanel(); return; }
  const b = e.target.closest('[data-act]'); if (!b || b.tagName === 'INPUT') return;
  const i = +b.dataset.i;
  switch (b.dataset.act) {
    case 'inc': cart[i].qty = clampQty(cart[i].qty + 1); cartChanged(); break;
    case 'dec': cart[i].qty = clampQty(cart[i].qty - 1); cartChanged(); break;
    case 'rm': cart.splice(i, 1); cartChanged(); break;
    case 'clear': if (confirm('¿Vaciar Mi clóset? Se quitarán todas las camisetas.')) { cart = []; cartChanged(); } break;
    case 'wa': sendWhatsApp(); break;
  }
});
drawer.addEventListener('change', e => {
  const t = e.target, i = +t.dataset.i;
  if (t.dataset.act === 'qty') { cart[i].qty = clampQty(t.value); cartChanged(); }
  else if (t.dataset.edit === 'size') editItem(i, t.value, cart[i].type);
  else if (t.dataset.edit === 'type') editItem(i, cart[i].size, t.value);
});

function whatsappMessage() {
  const lines = ['Hola, LaGambeta 👋', 'Quisiera consultar la disponibilidad de estas camisetas de mi clóset:', ''];
  cart.forEach((it, i) => {
    const p = byId(it.pid);
    lines.push(`${i + 1}. ${p.name}`, `Temporada/modelo: ${p.season} / ${p.model}`, `Talla: ${it.size}`, `Tipo: ${TYPES[it.type]}`,
      `Cantidad: ${it.qty}`, `Precio unitario: ${fmt(unitPrice(it))}`, `Subtotal: ${fmt(unitPrice(it) * it.qty)}`, '');
  });
  lines.push(`Total de unidades: ${totalUnits()}`, `Total estimado: ${fmt(totalPrice())}`, '', '¿Me confirman disponibilidad y opciones de entrega, por favor?');
  return lines.join('\n');
}
function sendWhatsApp() {
  if (!cart.length) return;
  if (!/^\d{8,15}$/.test(WHATSAPP_NUMBER)) {
    toast('Configura primero el número de WhatsApp en script.js.');
    const w = $('#waWarn'); if (w) w.scrollIntoView({ block: 'nearest' });
    return;
  }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage())}`, '_blank', 'noopener');
  // El clóset se conserva: abrir WhatsApp solo prepara la consulta.
}

/* ==========================================================
   NAVEGACIÓN Y RUTAS
   ========================================================== */
function route() {
  closePanel(false);
  const [r, id] = location.hash.slice(1).split('/');
  document.title = 'LaGambeta | Camisetas de fútbol';
  if (r === 'producto') { const p = byId(decodeURIComponent(id || '')); p ? productView(p) : notFoundView(); }
  else catalogView();
  
  window.scrollTo(0, 0);
  main.focus({ preventScroll: true });
}
function goCatalog() { if (location.hash !== '#catalogo') location.hash = '#catalogo'; else route(); }
const onCatalog = () => (location.hash.slice(1).split('/')[0] || 'catalogo') === 'catalogo';

$('#searchForm').addEventListener('submit', e => e.preventDefault());
$('#q').addEventListener('input', e => { view.q = e.target.value; onCatalog() ? updateGrid() : goCatalog(); });
$('#closetBtn').addEventListener('click', e => openCloset(e.currentTarget));
modal.addEventListener('click', e => { if (e.target.closest('[data-close]')) closePanel(); });
main.addEventListener('click', e => {
  const q = e.target.closest('[data-quick]'); if (q) { openQuick(q.dataset.quick, q); return; }
  const c = e.target.closest('.pill-btn'); if (c) { view.cat = c.dataset.cat; updateGrid(); return; }
  if (e.target.closest('#clearBtn,[data-clear]')) clearFilters();
});
main.addEventListener('change', e => { if (e.target.id === 'sort') { view.sort = e.target.value; updateGrid(); } });
window.addEventListener('hashchange', () => { route(); });

cartChanged();
route();