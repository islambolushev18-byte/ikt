/* Рынок ИКТ Кыргызстана — демонстрационная информационная система.
   Все данные ДЕМОНСТРАТИВНЫЕ (не подтверждены официальной статистикой). */
'use strict';

const STORAGE_KEY = 'ict_kg_market_v1';
const CATEGORIES = ['Разработка ПО', 'Телекоммуникации', 'Финтех', 'Аутсорсинг', 'Образование', 'Кибербезопасность', 'Облачные услуги', 'Электронная коммерция'];
const CITIES = ['Бишкек', 'Ош', 'Джалал-Абад', 'Каракол', 'Нарын', 'Токмок', 'Талас', 'Баткен'];
const TYPES = ['IT-услуга', 'Программное обеспечение', 'Цифровой продукт'];
const PALETTE = ['#14a37f', '#1b6ca8', '#0a2f44', '#5cc9a7', '#4a9fd4', '#0d7d62', '#8fd3c3', '#7fb2d9'];

/* ---------- Тестовые (демонстрационные) данные ---------- */
const DEFAULTS = {
  companies: [
    { id: 1, name: 'Ала-Тоо Софт', category: 'Разработка ПО', city: 'Бишкек', employees: 120, founded: 2012, revenue: 310, site: 'alatoosoft.example', email: 'info@alatoosoft.example', phone: '+996 312 00-00-01', desc: 'Заказная разработка и сопровождение корпоративных систем.' },
    { id: 2, name: 'Ысык-Көл Телеком', category: 'Телекоммуникации', city: 'Каракол', employees: 340, founded: 2005, revenue: 920, site: 'issykkoltel.example', email: 'office@issykkoltel.example', phone: '+996 3922 0-00-02', desc: 'Широкополосный доступ и связь в регионах.' },
    { id: 3, name: 'Манас Лаб', category: 'Финтех', city: 'Бишкек', employees: 75, founded: 2018, revenue: 205, site: 'manaslab.example', email: 'hello@manaslab.example', phone: '+996 555 00-00-03', desc: 'Платёжные сервисы и мобильные кошельки.' },
    { id: 4, name: 'Тянь-Шань Cloud', category: 'Облачные услуги', city: 'Бишкек', employees: 48, founded: 2016, revenue: 150, site: 'tiancloud.example', email: 'sales@tiancloud.example', phone: '+996 700 00-00-04', desc: 'Хостинг, облачные серверы и резервное копирование.' },
    { id: 5, name: 'Ош Тех', category: 'Аутсорсинг', city: 'Ош', employees: 90, founded: 2015, revenue: 175, site: 'oshtech.example', email: 'team@oshtech.example', phone: '+996 3222 0-00-05', desc: 'ИТ-аутсорсинг для компаний Центральной Азии.' },
    { id: 6, name: 'Нарын Нет', category: 'Телекоммуникации', city: 'Нарын', employees: 60, founded: 2010, revenue: 98, site: 'narynnet.example', email: 'info@narynnet.example', phone: '+996 3522 0-00-06', desc: 'Местный интернет-провайдер.' },
    { id: 7, name: 'Алатау Кибер', category: 'Кибербезопасность', city: 'Бишкек', employees: 32, founded: 2019, revenue: 88, site: 'alatau-cyber.example', email: 'secure@alatau-cyber.example', phone: '+996 770 00-00-07', desc: 'Аудит безопасности и защита инфраструктуры.' },
    { id: 8, name: 'Чуй Академия', category: 'Образование', city: 'Токмок', employees: 28, founded: 2017, revenue: 41, site: 'chuyacademy.example', email: 'learn@chuyacademy.example', phone: '+996 500 00-00-08', desc: 'Курсы программирования и цифровых навыков.' },
    { id: 9, name: 'Джалал-Абад Диджитал', category: 'Электронная коммерция', city: 'Джалал-Абад', employees: 55, founded: 2020, revenue: 120, site: 'jadigital.example', email: 'shop@jadigital.example', phone: '+996 3722 0-00-09', desc: 'Маркетплейс местных производителей.' },
    { id: 10, name: 'Сары-Челек Pay', category: 'Финтех', city: 'Бишкек', employees: 40, founded: 2021, revenue: 72, site: 'sarypay.example', email: 'pay@sarypay.example', phone: '+996 709 00-00-10', desc: 'Онлайн-эквайринг для малого бизнеса.' }
  ],
  services: [
    { id: 1, name: 'Разработка мобильного приложения', type: 'IT-услуга', company: 'Ала-Тоо Софт', direction: 'Разработка ПО', price: 450000 },
    { id: 2, name: 'Облачный сервер (VPS), в месяц', type: 'IT-услуга', company: 'Тянь-Шань Cloud', direction: 'Облачные услуги', price: 1800 },
    { id: 3, name: 'Домашний интернет 100 Мбит/с, в месяц', type: 'IT-услуга', company: 'Ысык-Көл Телеком', direction: 'Телекоммуникации', price: 600 },
    { id: 4, name: 'Платёжный шлюз для интернет-магазина', type: 'Программное обеспечение', company: 'Манас Лаб', direction: 'Финтех', price: 25000 },
    { id: 5, name: 'Аудит информационной безопасности', type: 'IT-услуга', company: 'Алатау Кибер', direction: 'Кибербезопасность', price: 180000 },
    { id: 6, name: 'CRM-система «Ала-Тоо CRM»', type: 'Программное обеспечение', company: 'Ала-Тоо Софт', direction: 'Разработка ПО', price: 9500 },
    { id: 7, name: 'Онлайн-курс «Python с нуля»', type: 'Цифровой продукт', company: 'Чуй Академия', direction: 'Образование', price: 7900 },
    { id: 8, name: 'Выделенная команда разработчиков, в месяц', type: 'IT-услуга', company: 'Ош Тех', direction: 'Аутсорсинг', price: 320000 },
    { id: 9, name: 'Торговая площадка: тариф «Магазин»', type: 'Цифровой продукт', company: 'Джалал-Абад Диджитал', direction: 'Электронная коммерция', price: 3000 },
    { id: 10, name: 'Эквайринг для малого бизнеса, комиссия за подключение', type: 'Программное обеспечение', company: 'Сары-Челек Pay', direction: 'Финтех', price: 5000 }
  ],
  stats: [
    { year: 2019, revenue: 21.4, internet: 38.0, mobile: 120.0, export: 18.0, gdp: 2.6 },
    { year: 2020, revenue: 23.0, internet: 43.0, mobile: 124.0, export: 22.0, gdp: 2.9 },
    { year: 2021, revenue: 27.5, internet: 48.5, mobile: 127.0, export: 31.0, gdp: 3.1 },
    { year: 2022, revenue: 34.2, internet: 54.0, mobile: 131.0, export: 45.0, gdp: 3.6 },
    { year: 2023, revenue: 41.0, internet: 59.0, mobile: 133.0, export: 58.0, gdp: 4.0 },
    { year: 2024, revenue: 47.8, internet: 63.5, mobile: 135.0, export: 70.0, gdp: 4.3 }
  ]
};

/* ---------- Состояние и localStorage ---------- */
let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      if (s && Array.isArray(s.companies) && Array.isArray(s.services) && Array.isArray(s.stats)) return s;
    }
  } catch (e) { console.warn('localStorage недоступен или повреждён:', e); }
  return JSON.parse(JSON.stringify(DEFAULTS));
}
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch (e) { toast('Не удалось сохранить данные в браузере'); }
}
const nextId = list => list.reduce((m, x) => Math.max(m, x.id || 0), 0) + 1;

/* ---------- Утилиты ---------- */
const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = n => Number(n).toLocaleString('ru-RU', { maximumFractionDigits: 1 });
const sum = (arr, f) => arr.reduce((a, x) => a + (Number(f(x)) || 0), 0);
function fillSelect(sel, items, allLabel) {
  sel.innerHTML = (allLabel ? `<option value="">${allLabel}</option>` : '') + items.map(i => `<option>${esc(i)}</option>`).join('');
}
let toastTimer;
function toast(msg) {
  const t = $('toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}
function toCSV(headers, rows, filename) {
  const cell = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const text = [headers, ...rows].map(r => r.map(cell).join(';')).join('\r\n');
  const blob = new Blob(['\uFEFF' + text], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast('Файл ' + filename + ' сохранён');
}
const charts = {};
function drawChart(id, config) {
  if (typeof Chart === 'undefined') return;
  if (charts[id]) charts[id].destroy();
  config.options = Object.assign({ responsive: true, maintainAspectRatio: false }, config.options || {});
  charts[id] = new Chart($(id), config);
}
const groupSum = (list, key, val) => {
  const m = {}; list.forEach(x => { m[x[key]] = (m[x[key]] || 0) + (Number(val(x)) || 0); }); return m;
};

/* ---------- Навигация ---------- */
const TITLES = { dashboard: 'Главная панель', companies: 'Каталог IT-компаний', services: 'IT-услуги, ПО и цифровые продукты', analytics: 'Аналитика рынка', stats: 'Статистика и динамика развития ИКТ', register: 'Регистрация IT-компании' };
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + name));
  document.querySelectorAll('.sidebar nav button').forEach(b => b.classList.toggle('active', b.dataset.view === name));
  $('viewTitle').textContent = TITLES[name];
  $('sidebar').classList.remove('open');
  if (name === 'dashboard') renderDashboard();
  if (name === 'companies') renderCompanies();
  if (name === 'services') renderServices();
  if (name === 'analytics') renderAnalytics();
  if (name === 'stats') renderStats();
  if (name === 'register' && !$('fId').value) $('formTitle').textContent = 'Регистрация IT-компании';
  window.scrollTo(0, 0);
}
document.querySelectorAll('.sidebar nav button').forEach(b => b.addEventListener('click', () => showView(b.dataset.view)));
$('burger').addEventListener('click', () => $('sidebar').classList.toggle('open'));

/* ---------- Главная панель ---------- */
function renderDashboard() {
  const c = state.companies, s = state.services, last = [...state.stats].sort((a, b) => a.year - b.year).slice(-1)[0];
  const avg = s.length ? sum(s, x => x.price) / s.length : 0;
  const kpis = [
    ['Компаний в каталоге', fmt(c.length), 'демо'],
    ['Сотрудников', fmt(sum(c, x => x.employees)), 'в каталоге'],
    ['Выручка компаний', fmt(sum(c, x => x.revenue)) + ' млн сом', 'демо'],
    ['Услуг и продуктов', fmt(s.length), 'в каталоге'],
    ['Средняя цена', fmt(avg) + ' сом', 'по каталогу'],
    ['Пользователи интернета', last ? fmt(last.internet) + '%' : '—', last ? last.year + ' (демо)' : '']
  ];
  $('kpiCards').innerHTML = kpis.map(k => `<div class="kpi"><span>${k[0]}</span><b>${k[1]}</b><small>${k[2]}</small></div>`).join('');
  const g = groupSum(c, 'category', () => 1);
  drawChart('chDashCats', { type: 'doughnut', data: { labels: Object.keys(g), datasets: [{ data: Object.values(g), backgroundColor: PALETTE }] }, options: { plugins: { legend: { position: 'right' } } } });
  const st = [...state.stats].sort((a, b) => a.year - b.year);
  drawChart('chDashRev', { type: 'line', data: { labels: st.map(x => x.year), datasets: [{ label: 'Выручка, млрд сом', data: st.map(x => x.revenue), borderColor: '#14a37f', backgroundColor: 'rgba(20,163,127,.18)', fill: true, tension: .3 }] } });
}

/* ---------- Компании: каталог ---------- */
function initFilters() {
  fillSelect($('cCat'), CATEGORIES, 'Все направления');
  fillSelect($('cCity'), CITIES, 'Все города');
  fillSelect($('sType'), TYPES, 'Все типы');
  fillSelect($('sDir'), CATEGORIES, 'Все направления');
  fillSelect($('fCat'), CATEGORIES);
  fillSelect($('fCity'), CITIES);
  fillSelect($('sTypeF'), TYPES);
  fillSelect($('sDirF'), CATEGORIES);
}
function renderCompanies() {
  const q = $('cSearch').value.trim().toLowerCase(), cat = $('cCat').value, city = $('cCity').value, sort = $('cSort').value;
  let list = state.companies.filter(c =>
    (!cat || c.category === cat) && (!city || c.city === city) &&
    (!q || [c.name, c.city, c.category, c.desc].join(' ').toLowerCase().includes(q)));
  list.sort((a, b) => sort === 'name' ? a.name.localeCompare(b.name, 'ru') : sort === 'founded' ? a.founded - b.founded : b[sort] - a[sort]);
  $('cBody').innerHTML = list.length ? list.map(c => `
    <tr><td><b>${esc(c.name)}</b><small>${esc(c.desc)}</small></td>
    <td><span class="tag">${esc(c.category)}</span></td><td>${esc(c.city)}</td>
    <td class="num">${fmt(c.employees)}</td><td>${esc(c.founded)}</td><td class="num">${fmt(c.revenue || 0)}</td>
    <td><small>${esc(c.site)}</small><small>${esc(c.email)}</small><small>${esc(c.phone)}</small></td>
    <td class="actions"><button class="btn ghost small" data-edit="${c.id}">Изменить</button><button class="btn danger small" data-del="${c.id}">Удалить</button></td></tr>`).join('')
    : '<tr><td colspan="8" class="empty">Ничего не найдено. Измените условия поиска или добавьте компанию.</td></tr>';
  $('cCount').textContent = `Показано ${list.length} из ${state.companies.length}`;
}
['cSearch', 'cCat', 'cCity', 'cSort'].forEach(id => $(id).addEventListener('input', renderCompanies));
$('cAdd').addEventListener('click', () => { resetForm(); showView('register'); });
$('cBody').addEventListener('click', e => {
  const ed = e.target.dataset.edit, del = e.target.dataset.del;
  if (ed) editCompany(+ed);
  if (del && confirm('Удалить компанию? Связанные услуги останутся в каталоге.')) {
    state.companies = state.companies.filter(c => c.id !== +del);
    saveState(); renderCompanies(); toast('Компания удалена');
  }
});
$('cExport').addEventListener('click', () => toCSV(
  ['ID', 'Название', 'Направление', 'Город', 'Сотрудники', 'Год основания', 'Выручка, млн сом', 'Сайт', 'Email', 'Телефон', 'Описание'],
  state.companies.map(c => [c.id, c.name, c.category, c.city, c.employees, c.founded, c.revenue, c.site, c.email, c.phone, c.desc]), 'companies.csv'));

/* ---------- Форма регистрации / редактирования компании ---------- */
function resetForm() {
  $('cForm').reset(); $('fId').value = ''; $('fError').textContent = '';
  document.querySelectorAll('#cForm .invalid').forEach(x => x.classList.remove('invalid'));
  $('formTitle').textContent = 'Регистрация IT-компании'; $('fSubmit').textContent = 'Зарегистрировать';
}
function editCompany(id) {
  const c = state.companies.find(x => x.id === id); if (!c) return;
  resetForm(); showView('register');
  $('fId').value = c.id; $('fName').value = c.name; $('fCat').value = c.category; $('fCity').value = c.city;
  $('fYear').value = c.founded; $('fEmp').value = c.employees; $('fRev').value = c.revenue;
  $('fSite').value = c.site; $('fEmail').value = c.email; $('fPhone').value = c.phone; $('fDesc').value = c.desc;
  $('formTitle').textContent = 'Редактирование компании'; $('fSubmit').textContent = 'Сохранить изменения';
}
$('fCancel').addEventListener('click', resetForm);
$('cForm').addEventListener('submit', e => {
  e.preventDefault();
  const req = ['fName', 'fCat', 'fCity', 'fYear', 'fEmp'];
  let bad = req.filter(id => !$(id).value.trim());
  const emailOk = !$('fEmail').value || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test($('fEmail').value);
  if (!emailOk) bad.push('fEmail');
  const year = +$('fYear').value; if (year < 1991 || year > 2030) bad.push('fYear');
  if (+$('fEmp').value < 1) bad.push('fEmp');
  document.querySelectorAll('#cForm .invalid').forEach(x => x.classList.remove('invalid'));
  if (bad.length) {
    bad.forEach(id => $(id).classList.add('invalid'));
    $('fError').textContent = 'Проверьте выделенные поля: заполните обязательные и укажите корректные значения.'; return;
  }
  const rec = {
    name: $('fName').value.trim(), category: $('fCat').value, city: $('fCity').value, founded: year,
    employees: +$('fEmp').value, revenue: +$('fRev').value || 0, site: $('fSite').value.trim(),
    email: $('fEmail').value.trim(), phone: $('fPhone').value.trim(), desc: $('fDesc').value.trim()
  };
  const id = +$('fId').value;
  if (id) { Object.assign(state.companies.find(c => c.id === id), rec); toast('Изменения сохранены'); }
  else { state.companies.push({ id: nextId(state.companies), ...rec }); toast('Компания зарегистрирована'); }
  saveState(); resetForm(); showView('companies');
});

/* ---------- Услуги, ПО и цифровые продукты ---------- */
function renderServices() {
  const q = $('sSearch').value.trim().toLowerCase(), type = $('sType').value, dir = $('sDir').value;
  const list = state.services.filter(s => (!type || s.type === type) && (!dir || s.direction === dir) &&
    (!q || [s.name, s.company, s.direction].join(' ').toLowerCase().includes(q)));
  $('sBody').innerHTML = list.length ? list.map(s => `
    <tr><td><b>${esc(s.name)}</b></td><td><span class="tag blue">${esc(s.type)}</span></td><td>${esc(s.company)}</td>
    <td>${esc(s.direction)}</td><td class="num">${fmt(s.price)}</td>
    <td class="actions"><button class="btn ghost small" data-edit="${s.id}">Изменить</button><button class="btn danger small" data-del="${s.id}">Удалить</button></td></tr>`).join('')
    : '<tr><td colspan="6" class="empty">Записей нет. Нажмите «Добавить», чтобы создать первую.</td></tr>';
  $('sCount').textContent = `Показано ${list.length} из ${state.services.length}`;
}
['sSearch', 'sType', 'sDir'].forEach(id => $(id).addEventListener('input', renderServices));
function openServiceDialog(s) {
  const names = state.companies.map(c => c.name);
  if (s && !names.includes(s.company)) names.push(s.company);
  fillSelect($('sCompany'), names);
  $('sError').textContent = ''; $('sForm').reset();
  $('sId').value = s ? s.id : '';
  $('sDlgTitle').textContent = s ? 'Редактирование записи' : 'Новая запись';
  if (s) { $('sName').value = s.name; $('sTypeF').value = s.type; $('sCompany').value = s.company; $('sDirF').value = s.direction; $('sPrice').value = s.price; }
  $('sDialog').showModal();
}
$('sAdd').addEventListener('click', () => {
  if (!state.companies.length) { toast('Сначала зарегистрируйте хотя бы одну компанию'); return; }
  openServiceDialog(null);
});
$('sCancel').addEventListener('click', () => $('sDialog').close());
$('sBody').addEventListener('click', e => {
  const ed = e.target.dataset.edit, del = e.target.dataset.del;
  if (ed) openServiceDialog(state.services.find(s => s.id === +ed));
  if (del && confirm('Удалить запись?')) {
    state.services = state.services.filter(s => s.id !== +del);
    saveState(); renderServices(); toast('Запись удалена');
  }
});
$('sForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('sName').value.trim(), price = $('sPrice').value;
  if (!name || price === '' || +price < 0) { $('sError').textContent = 'Укажите название и цену (0 или больше).'; return; }
  const rec = { name, type: $('sTypeF').value, company: $('sCompany').value, direction: $('sDirF').value, price: +price };
  const id = +$('sId').value;
  if (id) Object.assign(state.services.find(s => s.id === id), rec);
  else state.services.push({ id: nextId(state.services), ...rec });
  saveState(); $('sDialog').close(); renderServices(); toast(id ? 'Изменения сохранены' : 'Запись добавлена');
});
$('sExport').addEventListener('click', () => toCSV(
  ['ID', 'Название', 'Тип', 'Компания', 'Направление', 'Цена, сом'],
  state.services.map(s => [s.id, s.name, s.type, s.company, s.direction, s.price]), 'services.csv'));

/* ---------- Аналитика ---------- */
function renderAnalytics() {
  const top = [...state.companies].sort((a, b) => b.revenue - a.revenue).slice(0, 8);
  drawChart('chTopRev', { type: 'bar', data: { labels: top.map(c => c.name), datasets: [{ label: 'Выручка, млн сом', data: top.map(c => c.revenue), backgroundColor: '#14a37f' }] }, options: { indexAxis: 'y', plugins: { legend: { display: false } } } });
  const city = groupSum(state.companies, 'city', c => c.employees);
  drawChart('chCity', { type: 'bar', data: { labels: Object.keys(city), datasets: [{ label: 'Сотрудники', data: Object.values(city), backgroundColor: '#1b6ca8' }] }, options: { plugins: { legend: { display: false } } } });
  const cnt = groupSum(state.services, 'type', () => 1), tot = groupSum(state.services, 'type', s => s.price);
  const types = Object.keys(tot);
  drawChart('chPrice', { type: 'bar', data: { labels: types, datasets: [{ label: 'Средняя цена, сом', data: types.map(t => Math.round(tot[t] / cnt[t])), backgroundColor: ['#14a37f', '#1b6ca8', '#0a2f44'] }] }, options: { plugins: { legend: { display: false } } } });
  const share = groupSum(state.companies, 'category', c => c.revenue);
  drawChart('chShare', { type: 'pie', data: { labels: Object.keys(share), datasets: [{ data: Object.values(share), backgroundColor: PALETTE }] }, options: { plugins: { legend: { position: 'right' } } } });
}

/* ---------- Статистика и динамика ---------- */
function renderStats() {
  const st = [...state.stats].sort((a, b) => a.year - b.year);
  $('stBody').innerHTML = st.length ? st.map(r => `
    <tr><td><b>${r.year}</b></td><td class="num">${fmt(r.revenue)}</td><td class="num">${fmt(r.internet)}</td>
    <td class="num">${fmt(r.mobile)}</td><td class="num">${fmt(r.export)}</td><td class="num">${fmt(r.gdp)}</td>
    <td class="actions"><button class="btn ghost small" data-edit="${r.year}">Изменить</button><button class="btn danger small" data-del="${r.year}">Удалить</button></td></tr>`).join('')
    : '<tr><td colspan="7" class="empty">Нет данных. Добавьте первый год.</td></tr>';
  if (st.length > 1) {
    const a = st[0], b = st[st.length - 1], cagr = (Math.pow(b.revenue / a.revenue, 1 / (b.year - a.year)) - 1) * 100;
    $('stGrowth').textContent = `Рост выручки ИКТ за ${a.year}–${b.year}: ×${(b.revenue / a.revenue).toFixed(2)}, среднегодовой темп ≈ ${cagr.toFixed(1)}% (демо-данные).`;
  } else $('stGrowth').textContent = '';
  drawChart('chNet', { type: 'line', data: { labels: st.map(r => r.year), datasets: [{ label: 'Интернет, %', data: st.map(r => r.internet), borderColor: '#1b6ca8', backgroundColor: 'rgba(27,108,168,.15)', fill: true, tension: .3 }] } });
  drawChart('chExp', { type: 'bar', data: { labels: st.map(r => r.year), datasets: [{ label: 'Экспорт ИТ, млн $', data: st.map(r => r.export), backgroundColor: '#14a37f' }] } });
}
function openStatDialog(year) {
  $('stForm').reset(); $('stError').textContent = '';
  const r = state.stats.find(x => x.year === year);
  $('stForm').dataset.edit = r ? r.year : '';
  $('stDlgTitle').textContent = r ? 'Редактирование: ' + r.year : 'Показатели за год';
  if (r) { $('stYear').value = r.year; $('stRev').value = r.revenue; $('stNet').value = r.internet; $('stMob').value = r.mobile; $('stExp').value = r.export; $('stGdp').value = r.gdp; }
  $('stDialog').showModal();
}
$('stAdd').addEventListener('click', () => openStatDialog(null));
$('stCancel').addEventListener('click', () => $('stDialog').close());
$('stBody').addEventListener('click', e => {
  const ed = e.target.dataset.edit, del = e.target.dataset.del;
  if (ed) openStatDialog(+ed);
  if (del && confirm('Удалить данные за ' + del + ' год?')) {
    state.stats = state.stats.filter(r => r.year !== +del); saveState(); renderStats(); toast('Запись удалена');
  }
});
$('stForm').addEventListener('submit', e => {
  e.preventDefault();
  const ids = ['stYear', 'stRev', 'stNet', 'stMob', 'stExp', 'stGdp'];
  if (ids.some(id => $(id).value === '')) { $('stError').textContent = 'Заполните все поля.'; return; }
  const rec = { year: +$('stYear').value, revenue: +$('stRev').value, internet: +$('stNet').value, mobile: +$('stMob').value, export: +$('stExp').value, gdp: +$('stGdp').value };
  const editing = $('stForm').dataset.edit ? +$('stForm').dataset.edit : null;
  if (state.stats.some(r => r.year === rec.year && r.year !== editing)) { $('stError').textContent = 'Данные за этот год уже есть — отредактируйте существующую запись.'; return; }
  if (editing) state.stats = state.stats.filter(r => r.year !== editing);
  state.stats.push(rec); saveState(); $('stDialog').close(); renderStats(); toast('Данные сохранены');
});
$('stExport').addEventListener('click', () => toCSV(
  ['Год', 'Выручка ИКТ, млрд сом', 'Интернет, %', 'Моб. связь на 100 жителей', 'Экспорт ИТ, млн $', 'Доля в ВВП, %'],
  [...state.stats].sort((a, b) => a.year - b.year).map(r => [r.year, r.revenue, r.internet, r.mobile, r.export, r.gdp]), 'ict_stats.csv'));

/* ---------- Сброс демо-данных ---------- */
$('resetBtn').addEventListener('click', () => {
  if (!confirm('Все изменения будут потеряны, данные вернутся к демонстрационным. Продолжить?')) return;
  state = JSON.parse(JSON.stringify(DEFAULTS)); saveState();
  resetForm(); showView('dashboard'); toast('Демо-данные восстановлены');
});

/* ---------- Запуск ---------- */
initFilters();
saveState();
showView('dashboard');
