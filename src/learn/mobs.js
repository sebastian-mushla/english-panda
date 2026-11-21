// Духи уровней: имя, описание, сила (hp) и рисунок в SVG (поле 100×100).
export const MOBS = {
  crane: {
    hp: 5, reward: 10,
    name: { ru: 'Туманный журавль', cz: 'Mlžný jeřáb' },
    text: { ru: 'Живёт в утреннем тумане и здоровается со всеми подряд. Обижается, если ему не ответить «hello».', cz: 'Žije v ranní mlze a zdraví každého. Urazí se, když mu neodpovíš „hello“.' },
    svg: `<path d="M30,86 L40,60 M48,86 L44,62" stroke="#3a3a3a" stroke-width="3"/>
      <ellipse cx="44" cy="54" rx="24" ry="14" fill="#f4f6f8"/><path d="M22,50 Q10,40 18,30 Q30,44 40,46Z" fill="#2b2b33"/>
      <path d="M58,50 Q66,30 62,16" stroke="#f4f6f8" stroke-width="8" fill="none" stroke-linecap="round"/>
      <circle cx="62" cy="14" r="7" fill="#f4f6f8"/><circle cx="62" cy="9" r="3.5" fill="#d8402e"/>
      <path d="M68,14 L86,18 L68,17Z" fill="#d9a43a"/><circle cx="64" cy="13" r="1.4" fill="#111"/>
      <path d="M8,74 Q30,66 50,74 T92,74" stroke="#cfe6e6" stroke-width="5" fill="none" opacity=".8"/>`,
  },
  lantern: {
    hp: 5, reward: 10,
    name: { ru: 'Бумажный фонарик', cz: 'Papírová lucernička' },
    text: { ru: 'Считает всё вокруг: ступеньки, звёзды, друзей. После десяти сбивается и начинает сначала.', cz: 'Počítá všechno kolem: schody, hvězdy, kamarády. Po desítce se splete a začne znovu.' },
    svg: `<path d="M50,6 V16" stroke="#3a2a1a" stroke-width="3"/><rect x="38" y="14" width="24" height="7" fill="#d9a43a"/>
      <ellipse cx="50" cy="50" rx="32" ry="30" fill="#d8402e" stroke="#7a1d14" stroke-width="3"/>
      <path d="M50,20 V80 M34,24 Q24,50 34,76 M66,24 Q76,50 66,76" stroke="#7a1d14" stroke-width="2" fill="none"/>
      <ellipse cx="50" cy="50" rx="18" ry="22" fill="#ffb347" opacity=".45"/>
      <circle cx="41" cy="46" r="3.5" fill="#2a1414"/><circle cx="59" cy="46" r="3.5" fill="#2a1414"/>
      <path d="M43,58 Q50,64 57,58" stroke="#2a1414" stroke-width="2.5" fill="none"/>
      <rect x="38" y="79" width="24" height="7" fill="#d9a43a"/><path d="M50,86 V98" stroke="#f2c14e" stroke-width="4"/>`,
  },
  fox: {
    hp: 5, reward: 12,
    name: { ru: 'Чернильный лис', cz: 'Inkoustová liška' },
    text: { ru: 'Рисует хвостом всеми цветами радуги, но сам чёрный, как тушь.', cz: 'Ocasem maluje všemi barvami duhy, ale sám je černý jako tuš.' },
    svg: `<path d="M64,70 Q96,64 92,30 Q84,52 66,56Z" fill="#1d1d24"/>
      <circle cx="90" cy="28" r="5" fill="#e2412b"/><circle cx="84" cy="44" r="4" fill="#f2c14e"/><circle cx="76" cy="58" r="4" fill="#3f9b6e"/>
      <ellipse cx="48" cy="68" rx="22" ry="18" fill="#1d1d24"/>
      <path d="M26,40 L22,14 L38,30Z M58,30 L74,14 L70,40Z" fill="#1d1d24"/>
      <path d="M24,38 Q48,20 72,38 Q66,62 48,66 Q30,62 24,38Z" fill="#26262e"/>
      <path d="M36,52 Q48,66 60,52 Q48,72 36,52Z" fill="#efdcb0"/>
      <ellipse cx="38" cy="42" rx="4" ry="3" fill="#f2c14e"/><ellipse cx="58" cy="42" rx="4" ry="3" fill="#f2c14e"/>
      <circle cx="48" cy="58" r="3" fill="#111"/>`,
  },
  turtle: {
    hp: 5, reward: 12,
    name: { ru: 'Моховая черепаха', cz: 'Mechová želva' },
    text: { ru: 'Помнит всех бабушек и дедушек долины. На панцире у неё растёт маленькое дерево.', cz: 'Pamatuje si všechny babičky a dědečky v údolí. Na krunýři jí roste malý strom.' },
    svg: `<ellipse cx="22" cy="68" rx="12" ry="9" fill="#7a9a5a"/><circle cx="18" cy="66" r="1.8" fill="#111"/>
      <ellipse cx="34" cy="84" rx="8" ry="6" fill="#7a9a5a"/><ellipse cx="72" cy="84" rx="8" ry="6" fill="#7a9a5a"/>
      <path d="M26,78 Q30,42 54,42 Q80,42 84,78Z" fill="#5d7f4a" stroke="#3a5a2a" stroke-width="2.5"/>
      <path d="M40,60 L54,52 L68,60 L64,74 L44,74Z" fill="none" stroke="#3a5a2a" stroke-width="2"/>
      <path d="M56,44 Q54,30 58,20" stroke="#6b4a2a" stroke-width="3" fill="none"/>
      <ellipse cx="52" cy="22" rx="10" ry="5" fill="#6fbf5a"/><ellipse cx="64" cy="18" rx="9" ry="5" fill="#3f9b54"/><circle cx="60" cy="16" r="2.5" fill="#f4a6c0"/>`,
  },
  mantis: {
    hp: 5, reward: 12,
    name: { ru: 'Бамбуковый богомол', cz: 'Bambusová kudlanka' },
    text: { ru: 'Знает всех зверей рощи по именам и каждое утро устраивает им перекличку.', cz: 'Zná všechna zvířata v háji jménem a každé ráno je kontroluje podle seznamu.' },
    svg: `<path d="M50,92 L46,60 M60,92 L56,62 M40,92 L50,62" stroke="#4b7d43" stroke-width="3"/>
      <ellipse cx="54" cy="60" rx="10" ry="22" fill="#6fbf5a" transform="rotate(-12 54 60)"/>
      <path d="M48,40 Q30,30 26,48 Q32,40 40,44 M58,40 Q76,28 80,46 Q72,38 64,44" stroke="#4b7d43" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M44,22 L64,22 L54,40Z" fill="#7fb069"/>
      <circle cx="44" cy="22" r="6" fill="#f2c14e" stroke="#4b7d43" stroke-width="2"/><circle cx="64" cy="22" r="6" fill="#f2c14e" stroke="#4b7d43" stroke-width="2"/>
      <circle cx="44" cy="22" r="2.4" fill="#111"/><circle cx="64" cy="22" r="2.4" fill="#111"/>
      <path d="M48,16 Q40,4 30,6 M60,16 Q68,4 78,6" stroke="#4b7d43" stroke-width="2" fill="none"/>`,
  },
  dumpling: {
    hp: 6, reward: 14,
    name: { ru: 'Пельменный бесёнок', cz: 'Knedlíčkový skřítek' },
    text: { ru: 'Выпрыгивает из пароварки и требует, чтобы еду называли правильно. Иначе остывает от обиды.', cz: 'Vyskakuje z pařáku a chce, aby se jídlo jmenovalo správně. Jinak uraženě vychladne.' },
    svg: `<path d="M38,22 q-6,-10 2,-16 M52,18 q-6,-10 2,-16 M66,22 q-6,-10 2,-16" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>
      <ellipse cx="50" cy="84" rx="40" ry="8" fill="#b88a3e"/><rect x="12" y="74" width="76" height="10" fill="#d9b66b"/>
      <path d="M18,74 Q14,40 50,30 Q86,40 82,74Z" fill="#f7f1e3" stroke="#c9b48a" stroke-width="2"/>
      <path d="M40,34 Q50,22 60,34 M44,32 L50,40 L56,32" stroke="#c9b48a" stroke-width="2" fill="none"/>
      <ellipse cx="40" cy="56" rx="3.5" ry="4.5" fill="#2a1d14"/><ellipse cx="60" cy="56" rx="3.5" ry="4.5" fill="#2a1d14"/>
      <path d="M44,64 Q50,70 56,64" stroke="#2a1d14" stroke-width="2.5" fill="none"/>
      <circle cx="32" cy="62" r="5" fill="#f4a6a6" opacity=".6"/><circle cx="68" cy="62" r="5" fill="#f4a6a6" opacity=".6"/>`,
  },
  hare: {
    hp: 6, reward: 14,
    name: { ru: 'Лунный заяц', cz: 'Měsíční zajíc' },
    text: { ru: 'По ночам толчёт в ступке лунный порошок. Точно знает, где у кого нос, а где уши.', cz: 'V noci tluče v hmoždíři měsíční prášek. Přesně ví, kdo má kde nos a kde uši.' },
    svg: `<circle cx="70" cy="26" r="20" fill="#f4e7b0" opacity=".9"/>
      <ellipse cx="40" cy="70" rx="20" ry="18" fill="#f4f6f8"/>
      <ellipse cx="34" cy="20" rx="6" ry="18" fill="#f4f6f8" transform="rotate(-10 34 20)"/><ellipse cx="48" cy="20" rx="6" ry="18" fill="#f4f6f8" transform="rotate(10 48 20)"/>
      <ellipse cx="34" cy="20" rx="2.5" ry="12" fill="#f4a6c0" transform="rotate(-10 34 20)"/><ellipse cx="48" cy="20" rx="2.5" ry="12" fill="#f4a6c0" transform="rotate(10 48 20)"/>
      <circle cx="41" cy="46" r="14" fill="#f4f6f8"/><circle cx="36" cy="44" r="2.2" fill="#c23a2b"/><circle cx="46" cy="44" r="2.2" fill="#c23a2b"/>
      <path d="M62,90 h22 l-4,-18 h-14Z" fill="#8a6a4a"/><path d="M58,60 L76,78" stroke="#c9a46a" stroke-width="5" stroke-linecap="round"/>`,
  },
  koi: {
    hp: 6, reward: 14,
    name: { ru: 'Речной карп', cz: 'Říční kapr' },
    text: { ru: 'Сто лет плыл вверх по водопаду и выучил все слова о природе. Мечтает стать драконом.', cz: 'Sto let plaval proti vodopádu a naučil se všechna slova o přírodě. Sní o tom, že bude drakem.' },
    svg: `<path d="M8,60 Q30,80 50,74" stroke="#7fd0e0" stroke-width="4" fill="none" opacity=".7"/>
      <path d="M24,52 Q44,26 72,40 Q84,46 86,54 Q78,66 60,68 Q36,70 24,52Z" fill="#f08a3c" stroke="#b5501a" stroke-width="2"/>
      <path d="M24,52 L8,40 L12,56 L6,70Z" fill="#f08a3c" stroke="#b5501a" stroke-width="2"/>
      <path d="M44,36 Q50,46 62,42 Q58,52 46,52Z" fill="#fff"/><circle cx="72" cy="48" r="3" fill="#111"/>
      <path d="M50,66 L46,80 L58,70Z" fill="#f2b24a"/><path d="M84,56 q6,4 10,2" stroke="#b5501a" stroke-width="2" fill="none"/>`,
  },
  dragon: {
    hp: 6, reward: 16,
    name: { ru: 'Чайный дракончик', cz: 'Čajový dráček' },
    text: { ru: 'Живёт в чайнике и охраняет каждую чашку и каждый стул в доме.', cz: 'Bydlí v konvici a hlídá každý hrnek a každou židli v domě.' },
    svg: `<path d="M20,84 q-6,-30 30,-32 q36,2 30,32Z" fill="#f4f1ea" stroke="#2f5bb0" stroke-width="2.5"/>
      <path d="M24,70 q26,-12 52,0" stroke="#2f5bb0" stroke-width="3" fill="none"/>
      <path d="M50,52 Q40,30 54,22 Q70,16 72,30 Q74,40 64,40" stroke="#3f9b6e" stroke-width="9" fill="none" stroke-linecap="round"/>
      <circle cx="66" cy="22" r="10" fill="#3f9b6e"/><path d="M60,13 l-4,-9 l8,6 M70,12 l4,-9 l-1,10" stroke="#f2c14e" stroke-width="3" fill="none"/>
      <circle cx="69" cy="20" r="2.2" fill="#111"/><path d="M74,26 q8,0 12,6" stroke="#3f9b6e" stroke-width="2" fill="none"/>
      <path d="M44,44 l-6,-4 l2,8 M48,36 l-7,-2 l4,7" fill="#2f7a55"/>`,
  },
  lion: {
    hp: 9, reward: 30,
    name: { ru: 'Каменный лев Врат', cz: 'Kamenný lev brány' },
    text: { ru: 'Пропускает дальше только тех, кто помнит все слова весны. Строгий, но справедливый.', cz: 'Pustí dál jen toho, kdo si pamatuje všechna slova jara. Přísný, ale spravedlivý.' },
    svg: `<rect x="16" y="78" width="68" height="16" rx="3" fill="#8a8f96"/>
      <path d="M26,78 Q22,40 50,34 Q78,40 74,78Z" fill="#a9aeb5"/>
      <circle cx="50" cy="36" r="26" fill="#8a8f96"/>
      <g fill="#7a7f86"><circle cx="30" cy="22" r="8"/><circle cx="50" cy="14" r="8"/><circle cx="70" cy="22" r="8"/><circle cx="26" cy="40" r="7"/><circle cx="74" cy="40" r="7"/></g>
      <circle cx="50" cy="40" r="17" fill="#b9bec5"/>
      <circle cx="43" cy="36" r="3" fill="#2a2a2a"/><circle cx="57" cy="36" r="3" fill="#2a2a2a"/>
      <path d="M42,48 Q50,54 58,48" stroke="#2a2a2a" stroke-width="2.5" fill="none"/>
      <circle cx="68" cy="72" r="9" fill="#c23a2b" stroke="#7a1d14" stroke-width="2"/>`,
  },
};

export const mobSVG = (id, cls = '') => `<svg class="mob ${cls}" viewBox="0 0 100 100" aria-hidden="true">${MOBS[id].svg}</svg>`;
