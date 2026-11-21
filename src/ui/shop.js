// Лавка тётушки Бао: наряды для панды и улучшения за монеты.
import { state, save, addCoins, emit, upg } from '../state.js';
import { t, L } from '../i18n.js';
import { board, toast } from './modal.js';
import { pandaSVG } from '../world/panda.js';
import { sfx } from '../audio.js';
import { checkAch } from '../progress.js';

const ITEMS = [
  ['hat', 'none', 0, { ru: 'Без шляпы', cz: 'Bez pokrývky' }],
  ['hat', 'straw', 40, { ru: 'Соломенная шляпа', cz: 'Slaměný klobouk' }],
  ['hat', 'band', 50, { ru: 'Повязка ученика', cz: 'Čelenka žáka' }],
  ['hat', 'scholar', 90, { ru: 'Шапка учёного', cz: 'Čepice učence' }],
  ['hat', 'lotus', 120, { ru: 'Лотосовая корона', cz: 'Lotosová koruna' }],
  ['hat', 'fox', 150, { ru: 'Маска лиса', cz: 'Liščí maska' }],
  ['robe', 'none', 0, { ru: 'Без одежды', cz: 'Bez oděvu' }],
  ['robe', 'jade', 60, { ru: 'Нефритовый халат', cz: 'Nefritový plášť' }],
  ['robe', 'red', 70, { ru: 'Праздничный красный', cz: 'Sváteční červený' }],
  ['robe', 'monk', 80, { ru: 'Одеяние монаха', cz: 'Mnišské roucho' }],
  ['robe', 'night', 140, { ru: 'Звёздная ночь', cz: 'Hvězdná noc' }],
  ['robe', 'gold', 200, { ru: 'Золотой императорский', cz: 'Zlatý císařský' }],
  ['item', 'none', 0, { ru: 'Пустые лапы', cz: 'Prázdné tlapky' }],
  ['item', 'staff', 50, { ru: 'Бамбуковый посох', cz: 'Bambusová hůl' }],
  ['item', 'scroll', 60, { ru: 'Свиток знаний', cz: 'Svitek vědění' }],
  ['item', 'fan', 70, { ru: 'Веер', cz: 'Vějíř' }],
  ['item', 'lantern', 90, { ru: 'Ручной фонарик', cz: 'Ruční lucernička' }],
  ['item', 'umbrella', 120, { ru: 'Бумажный зонтик', cz: 'Papírový deštník' }],
];

export const UPGRADES = [
  { id: 'teapot', icon: '🫖', prices: [50, 100, 180], name: { ru: 'Чайник мудрости', cz: 'Konvice moudrosti' }, text: { ru: 'Подсказки дешевле на 15% за каждый уровень.', cz: 'Nápovědy jsou o 15 % levnější za každou úroveň.' } },
  { id: 'lantern', icon: '🏮', prices: [80, 160], name: { ru: 'Запасной фонарь', cz: 'Náhradní lucerna' }, text: { ru: '+1 фонарь (жизнь) в дуэли с духом.', cz: '+1 lucerna (život) v souboji s duchem.' } },
  { id: 'coin', icon: '🪙', prices: [60, 120, 200], name: { ru: 'Счастливая монетка', cz: 'Šťastná mince' }, text: { ru: '+10% монет за уровни.', cz: '+10 % mincí za úrovně.' } },
  { id: 'shield', icon: '🛡️', prices: [150], name: { ru: 'Нефритовый щит', cz: 'Nefritový štít' }, text: { ru: 'Первая ошибка в дуэли не гасит фонарь.', cz: 'První chyba v souboji nezhasne lucernu.' } },
];

export function openShop(tab = 'skins') {
  board({
    title: t('npc.shop'), icon: '🏮', active: tab, cls: 'shop',
    tabs: [{ id: 'skins', label: t('tab.skins') }, { id: 'upgrades', label: t('tab.upgrades') }],
    render(id, panel) { (id === 'skins' ? skins : upgrades)(panel); },
  });
}

function skins(panel) {
  let slot = 'hat', sel = state.equip.hat, preview = { ...state.equip };
  panel.innerHTML = `<div class="split"><div class="left"><div class="slots"></div><div class="medals"></div></div><div class="detail"></div></div>`;
  const slots = panel.querySelector('.slots'), medals = panel.querySelector('.medals'), detail = panel.querySelector('.detail');

  function renderSlots() {
    slots.innerHTML = ['hat', 'robe', 'item'].map((s) => `<button class="chip ${s === slot ? 'on' : ''}" data-s="${s}">${t('slot.' + s)}</button>`).join('');
    slots.querySelectorAll('.chip').forEach((b) => b.addEventListener('click', () => { slot = b.dataset.s; sel = state.equip[slot]; sfx('click'); renderSlots(); renderMedals(); renderDetail(); }));
  }
  function renderMedals() {
    medals.innerHTML = ITEMS.filter((i) => i[0] === slot).map(([s, id]) => {
      const look = { hat: 'none', robe: 'none', item: 'none', [s]: id };
      const owned = state.owned.includes(s + ':' + id);
      return `<button class="medal ${id === sel ? 'on' : ''} ${owned ? 'owned' : ''}" data-id="${id}">${pandaSVG(look)}${state.equip[s] === id ? '<i class="tick">✓</i>' : ''}</button>`;
    }).join('');
    medals.querySelectorAll('.medal').forEach((b) => b.addEventListener('click', () => { sel = b.dataset.id; sfx('click'); renderMedals(); renderDetail(); }));
  }
  function renderDetail() {
    const it = ITEMS.find((i) => i[0] === slot && i[1] === sel);
    const key = slot + ':' + sel, owned = state.owned.includes(key), worn = state.equip[slot] === sel;
    preview = { ...state.equip, [slot]: sel };
    detail.innerHTML = `<div class="card-head"><h3>${L(it[3])}</h3><span class="price">${owned ? '' : `<i class="coin"></i> ${it[2]}`}</span></div>
      <div class="big-medal panda-prev">${pandaSVG(preview)}</div>
      <div class="card-foot">${worn ? `<button class="btn small" disabled>${t('equipped')}</button>` : owned ? `<button class="btn jade small act">${t('equip')}</button>` : `<button class="btn red act" ${state.coins < it[2] ? 'disabled' : ''}>${t('buy')}</button>`}</div>`;
    detail.querySelector('.act')?.addEventListener('click', () => {
      if (!owned) {
        if (state.coins < it[2]) return;
        addCoins(-it[2]); state.owned.push(key); sfx('coin'); toast(`${t('bought')}: ${L(it[3])}`, '👘');
      } else sfx('click');
      state.equip[slot] = sel;
      save(); emit('equip'); checkAch();
      renderMedals(); renderDetail();
    });
  }
  renderSlots(); renderMedals(); renderDetail();
}

function upgrades(panel) {
  let sel = UPGRADES[0].id;
  panel.innerHTML = `<div class="split"><div class="medals"></div><div class="detail"></div></div>`;
  const medals = panel.querySelector('.medals'), detail = panel.querySelector('.detail');
  const dots = (u) => u.prices.map((_, i) => `<i class="${i < upg(u.id) ? 'on' : ''}"></i>`).join('');
  function render() {
    medals.innerHTML = UPGRADES.map((u) => `<button class="medal up ${u.id === sel ? 'on' : ''}" data-id="${u.id}"><span class="ico">${u.icon}</span><span class="dots">${dots(u)}</span></button>`).join('');
    medals.querySelectorAll('.medal').forEach((b) => b.addEventListener('click', () => { sel = b.dataset.id; sfx('click'); render(); }));
    const u = UPGRADES.find((x) => x.id === sel), lvl = upg(u.id), price = u.prices[lvl];
    detail.innerHTML = `<div class="card-head"><h3>${L(u.name)}</h3><span class="price">${price ? `<i class="coin"></i> ${price}` : ''}</span></div>
      <div class="big-medal"><span class="ico big">${u.icon}</span></div>
      <p class="note">${L(u.text)}</p>
      <div class="dots big">${dots(u)}</div>
      <div class="card-foot">${price ? `<button class="btn red act" ${state.coins < price ? 'disabled' : ''}>${t('upgrade')}</button>` : `<button class="btn small" disabled>${t('max')}</button>`}</div>`;
    detail.querySelector('.act')?.addEventListener('click', () => {
      if (state.coins < price) return;
      addCoins(-price); state.upgrades[u.id] = lvl + 1; save(); sfx('coin'); toast(`${L(u.name)} ${lvl + 1}/${u.prices.length}`, u.icon); render();
    });
  }
  render();
}
