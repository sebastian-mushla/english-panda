// Духи уровней: имя, описание, сила (hp) и рисунок в SVG (поле 100×100).
// Дух-эмодзи: цветной круг с картинкой
function em(e, color, ru, uk, cz, tru, tuk, tcz) {
  return { hp: 6, reward: 15, name: { ru, uk, cz }, text: { ru: tru, uk: tuk, cz: tcz },
    svg: `<circle cx="50" cy="52" r="40" fill="${color}"/><circle cx="50" cy="52" r="40" fill="#fff" opacity=".12"/><text x="50" y="68" font-size="46" text-anchor="middle">${e}</text>` };
}

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

// Духи главы 2 «Лето»
Object.assign(MOBS, {
  cicada: {
    hp: 6, reward: 16,
    name: { ru: 'Цикада-певунья', cz: 'Zpěvavá cikáda' },
    text: { ru: 'Всё лето поёт, бегает и плавает в росе. Знает все слова-действия.', cz: 'Celé léto zpívá, běhá a plave v rose. Zná všechna slova o činnostech.' },
    svg: `<ellipse cx="50" cy="58" rx="16" ry="26" fill="#5a7a3a"/><ellipse cx="50" cy="58" rx="9" ry="20" fill="#7fa04a"/>
      <path d="M36,44 Q10,40 8,70 Q26,60 40,62Z M64,44 Q90,40 92,70 Q74,60 60,62Z" fill="#cfeedd" opacity=".75" stroke="#7aa0a0" stroke-width="1.5"/>
      <circle cx="50" cy="30" r="12" fill="#4a6a2a"/><circle cx="43" cy="28" r="4" fill="#f2c14e"/><circle cx="57" cy="28" r="4" fill="#f2c14e"/>
      <circle cx="43" cy="28" r="1.8" fill="#111"/><circle cx="57" cy="28" r="1.8" fill="#111"/>
      <path d="M72,18 q6,-4 10,0 M76,10 q6,-4 10,0" stroke="#3f9b6e" stroke-width="2.5" fill="none"/><text x="78" y="26" font-size="12" fill="#3f9b6e">♪</text>`,
  },
  silkworm: {
    hp: 6, reward: 16,
    name: { ru: 'Шелкопряд-портной', cz: 'Bourec krejčí' },
    text: { ru: 'Прядёт шёлк и шьёт пандам шляпы, шарфы и платья. Не терпит дырявых носков.', cz: 'Přede hedvábí a šije pandám klobouky, šály a šaty. Nesnáší děravé ponožky.' },
    svg: `<path d="M12,70 Q30,40 50,62 Q70,84 90,54" stroke="#f4a6c0" stroke-width="3" fill="none" stroke-dasharray="4 3"/>
      <g fill="#f4f1ea" stroke="#c9b48a" stroke-width="2"><circle cx="30" cy="66" r="10"/><circle cx="44" cy="62" r="11"/><circle cx="58" cy="60" r="11"/><circle cx="72" cy="56" r="12"/></g>
      <circle cx="76" cy="52" r="2.4" fill="#2a1d14"/><path d="M80,58 q4,2 6,0" stroke="#2a1d14" stroke-width="1.6" fill="none"/>
      <path d="M60,30 l10,10 l-14,4z" fill="#c23a2b"/><rect x="20" y="22" width="22" height="16" rx="3" fill="#2f5bb0"/><path d="M22,26 h18 M22,32 h18" stroke="#fff" stroke-width="1.5"/>`,
  },
  thunder: {
    hp: 6, reward: 16,
    name: { ru: 'Громовой барабанщик', cz: 'Hromový bubeník' },
    text: { ru: 'Сидит на туче и бьёт в барабаны. После его грозы всегда выходит радуга.', cz: 'Sedí na mraku a bubnuje. Po jeho bouřce vždycky vyjde duha.' },
    svg: `<g fill="#c9d4e4"><circle cx="34" cy="62" r="16"/><circle cx="52" cy="54" r="20"/><circle cx="70" cy="62" r="16"/><rect x="20" y="60" width="64" height="18" rx="9"/></g>
      <circle cx="44" cy="58" r="3" fill="#2a3a5a"/><circle cx="60" cy="58" r="3" fill="#2a3a5a"/><path d="M46,68 q6,5 12,0" stroke="#2a3a5a" stroke-width="2.5" fill="none"/>
      <circle cx="18" cy="38" r="10" fill="#c23a2b" stroke="#7a1d14" stroke-width="2"/><circle cx="86" cy="38" r="10" fill="#c23a2b" stroke="#7a1d14" stroke-width="2"/>
      <path d="M50,80 l-6,10 h6 l-4,10 l12,-14 h-6 l4,-6z" fill="#f2c14e"/>`,
  },
  snail: {
    hp: 6, reward: 16,
    name: { ru: 'Часовая улитка', cz: 'Hodinový šnek' },
    text: { ru: 'Носит на спине часы и никогда не опаздывает. Правда, и не спешит.', cz: 'Nosí na zádech hodiny a nikdy nechodí pozdě. Ale ani nespěchá.' },
    svg: `<path d="M10,80 Q30,70 62,78 L84,78 Q92,78 90,70 Q86,60 78,62" fill="#c9a46a" stroke="#8a6a32" stroke-width="2"/>
      <circle cx="44" cy="54" r="24" fill="#f2c14e" stroke="#8a6014" stroke-width="3"/><circle cx="44" cy="54" r="18" fill="#fff8dc"/>
      <path d="M44,54 V42 M44,54 L53,58" stroke="#2a1d14" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M80,62 L76,46 M86,64 L88,48" stroke="#8a6a32" stroke-width="2"/><circle cx="76" cy="45" r="3" fill="#2a1d14"/><circle cx="88" cy="47" r="3" fill="#2a1d14"/>`,
  },
  cricket: {
    hp: 6, reward: 18,
    name: { ru: 'Сверчок-фонарщик', cz: 'Cvrček lampář' },
    text: { ru: 'Каждый вечер зажигает фонари на улицах, у моста и у рынка.', cz: 'Každý večer rozsvěcí lampy v ulicích, u mostu i u trhu.' },
    svg: `<ellipse cx="44" cy="62" rx="24" ry="14" fill="#5a3a1e"/><circle cx="22" cy="54" r="10" fill="#6a4424"/><circle cx="18" cy="52" r="2.5" fill="#f2c14e"/>
      <path d="M14,46 Q4,24 18,12 M20,44 Q16,22 32,12" stroke="#5a3a1e" stroke-width="2" fill="none"/>
      <path d="M40,72 L30,90 M54,72 L66,90 M60,60 L80,44" stroke="#5a3a1e" stroke-width="3"/>
      <path d="M80,44 v-4" stroke="#3a2a1a" stroke-width="2"/><ellipse cx="80" cy="34" rx="9" ry="10" fill="#d8402e" stroke="#7a1d14" stroke-width="2"/><ellipse cx="80" cy="34" rx="4" ry="6" fill="#ffb347"/>`,
  },
  twin: {
    hp: 6, reward: 18,
    name: { ru: 'Дух-близнец Инь-Ян', cz: 'Dvojčecí duch jin-jang' },
    text: { ru: 'Одна половина большая и весёлая, другая маленькая и грустная. Вместе они знают все противоположности.', cz: 'Jedna polovina je velká a veselá, druhá malá a smutná. Spolu znají všechny protiklady.' },
    svg: `<circle cx="50" cy="50" r="38" fill="#f4f1ea" stroke="#2a2a2a" stroke-width="3"/>
      <path d="M50,12 A38,38 0 0 1 50,88 A19,19 0 0 1 50,50 A19,19 0 0 0 50,12Z" fill="#1d1d24"/>
      <circle cx="50" cy="31" r="6" fill="#1d1d24"/><circle cx="50" cy="69" r="6" fill="#f4f1ea"/>
      <path d="M38,40 q4,4 8,0" stroke="#1d1d24" stroke-width="2" fill="none"/><path d="M54,62 q4,-4 8,0" stroke="#f4f1ea" stroke-width="2" fill="none"/>`,
  },
  squirrel: {
    hp: 7, reward: 18,
    name: { ru: 'Белка-мастерица', cz: 'Veverka řemeslnice' },
    text: { ru: 'Сегодня она повар, завтра — водитель, послезавтра — пилот. Перепробовала все профессии.', cz: 'Dnes je kuchařka, zítra řidička, pozítří pilotka. Vyzkoušela všechna povolání.' },
    svg: `<path d="M64,84 Q100,70 86,30 Q78,14 66,26 Q84,40 70,66Z" fill="#c8642a"/>
      <ellipse cx="46" cy="66" rx="20" ry="20" fill="#d9783a"/><ellipse cx="46" cy="70" rx="11" ry="13" fill="#f4dcb4"/>
      <circle cx="42" cy="40" r="16" fill="#d9783a"/><path d="M30,30 l-2,-12 l8,6z M48,26 l6,-10 l2,12z" fill="#c8642a"/>
      <circle cx="37" cy="40" r="2.6" fill="#111"/><circle cx="49" cy="40" r="2.6" fill="#111"/><circle cx="43" cy="46" r="2" fill="#5a2a14"/>
      <rect x="30" y="18" width="26" height="10" rx="5" fill="#fff" stroke="#ccc"/><rect x="36" y="10" width="14" height="10" rx="5" fill="#fff" stroke="#ccc"/>`,
  },
  kitedragon: {
    hp: 7, reward: 18,
    name: { ru: 'Воздушный змей-дракон', cz: 'Drak z draka' },
    text: { ru: 'Когда-то был обычным воздушным змеем. Теперь играет в футбол, танцует и бренчит на гитаре.', cz: 'Kdysi to byl obyčejný papírový drak. Teď hraje fotbal, tančí a brnká na kytaru.' },
    svg: `<path d="M50,10 L80,44 L50,78 L20,44Z" fill="#e2412b" stroke="#7a1d14" stroke-width="2.5"/><path d="M50,10 V78 M20,44 H80" stroke="#f2c14e" stroke-width="2"/>
      <circle cx="42" cy="38" r="3" fill="#111"/><circle cx="58" cy="38" r="3" fill="#111"/><path d="M42,52 q8,6 16,0" stroke="#111" stroke-width="2.5" fill="none"/>
      <path d="M50,78 q-10,8 0,14 q10,6 -2,12" stroke="#2f5bb0" stroke-width="2.5" fill="none"/><path d="M46,86 l-6,-2 M54,92 l6,-2" stroke="#f2c14e" stroke-width="3"/>`,
  },
  firefly: {
    hp: 7, reward: 20,
    name: { ru: 'Светлячок-путеводитель', cz: 'Světluška průvodkyně' },
    text: { ru: 'Освещает дорогу путникам: поездам, лодкам и даже самолётам. Всегда знает, где твой билет.', cz: 'Svítí na cestu poutníkům: vlakům, loďkám i letadlům. Vždycky ví, kde máš lístek.' },
    svg: `<circle cx="50" cy="64" r="24" fill="#ffd27a" opacity=".35"/><ellipse cx="50" cy="66" rx="12" ry="16" fill="#f6e27a"/>
      <ellipse cx="50" cy="46" rx="11" ry="10" fill="#3a3a2a"/><circle cx="46" cy="44" r="2.2" fill="#fff"/><circle cx="54" cy="44" r="2.2" fill="#fff"/>
      <path d="M40,52 Q20,40 24,60 Q34,58 42,56Z M60,52 Q80,40 76,60 Q66,58 58,56Z" fill="#d9f0ff" opacity=".8"/>
      <path d="M44,38 Q40,26 34,24 M56,38 Q60,26 66,24" stroke="#3a3a2a" stroke-width="2" fill="none"/>
      <rect x="68" y="72" width="22" height="14" rx="2" fill="#efdcb0" stroke="#8a6a32"/><path d="M72,76 h14 M72,81 h10" stroke="#8a6a32" stroke-width="1.5"/>`,
  },
  phoenix: {
    hp: 10, reward: 40,
    name: { ru: 'Бронзовый феникс Врат лета', cz: 'Bronzový fénix Brány léta' },
    text: { ru: 'Сторожит Врата лета. Пропускает только тех, кто помнит все слова лета.', cz: 'Hlídá Bránu léta. Pustí jen ty, kdo si pamatují všechna slova léta.' },
    svg: `<path d="M50,40 Q20,10 8,30 Q22,32 30,48 Q14,52 12,66 Q30,58 40,62Z" fill="#e07a1f"/>
      <path d="M50,40 Q80,10 92,30 Q78,32 70,48 Q86,52 88,66 Q70,58 60,62Z" fill="#e07a1f"/>
      <ellipse cx="50" cy="58" rx="13" ry="18" fill="#c8592a"/><circle cx="50" cy="34" r="10" fill="#d9a43a"/>
      <path d="M50,24 q-4,-10 0,-16 q4,6 0,16 M44,26 q-8,-6 -8,-12 M56,26 q8,-6 8,-12" stroke="#f2c14e" stroke-width="3" fill="none"/>
      <circle cx="47" cy="33" r="2" fill="#111"/><circle cx="53" cy="33" r="2" fill="#111"/><path d="M50,37 l-3,4 h6z" fill="#8a2a1f"/>
      <path d="M44,74 q-6,14 -2,24 M50,76 q0,14 0,24 M56,74 q6,14 2,24" stroke="#c23a2b" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  },
});

// Духи главы 3 «Осень»
Object.assign(MOBS, {
  maple: { hp: 7, reward: 22, name: { ru: 'Кленовый дух', cz: 'Javorový duch' },
    text: { ru: 'Каждое утро повторяет: «I go, he goes, she goes». Обижается, если забыть -s.', cz: 'Každé ráno opakuje: „I go, he goes, she goes“. Urazí se, když zapomeneš -s.' },
    svg: `<path d="M50,8 L58,30 L80,24 L68,44 L90,52 L68,58 L74,80 L54,68 L50,92 L46,68 L26,80 L32,58 L10,52 L32,44 L20,24 L42,30Z" fill="#d9542a" stroke="#8a2a12" stroke-width="2"/><circle cx="42" cy="50" r="3" fill="#2a1408"/><circle cx="58" cy="50" r="3" fill="#2a1408"/><path d="M44,60 q6,5 12,0" stroke="#2a1408" stroke-width="2.5" fill="none"/>` },
  scarecrow: { hp: 7, reward: 22, name: { ru: 'Пугало-летописец', cz: 'Strašák kronikář' },
    text: { ru: 'Записывает всё, что было вчера: worked, played, stopped. Помнит каждое -ed.', cz: 'Zapisuje všechno, co bylo včera: worked, played, stopped. Pamatuje si každé -ed.' },
    svg: `<path d="M50,30 V96 M18,50 H82" stroke="#8a6a32" stroke-width="6"/><circle cx="50" cy="28" r="15" fill="#e8d7a8"/><path d="M28,20 L50,0 L72,20Z" fill="#d9b66b" stroke="#8a6a32" stroke-width="2"/><path d="M34,44 h32 l-6,34 h-20z" fill="#c23a2b"/><circle cx="44" cy="27" r="2.5" fill="#222"/><circle cx="56" cy="27" r="2.5" fill="#222"/><path d="M44,34 l3,2 l3,-2 l3,2 l3,-2" stroke="#222" stroke-width="1.5" fill="none"/>` },
  owl: { hp: 7, reward: 24, name: { ru: 'Сова неправильных глаголов', cz: 'Sova nepravidelných sloves' },
    text: { ru: 'Знает наизусть go–went–gone и ещё сорок глаголов. Ухает: «went, went!»', cz: 'Zná nazpaměť go–went–gone a dalších čtyřicet sloves. Houká: „went, went!“' },
    svg: `<ellipse cx="50" cy="58" rx="28" ry="32" fill="#8a5a32"/><ellipse cx="50" cy="66" rx="17" ry="20" fill="#e8c890"/><path d="M24,34 L32,18 L40,32Z M60,32 L68,18 L76,34Z" fill="#6a4224"/><circle cx="39" cy="44" r="10" fill="#fff"/><circle cx="61" cy="44" r="10" fill="#fff"/><circle cx="39" cy="44" r="5" fill="#2a1408"/><circle cx="61" cy="44" r="5" fill="#2a1408"/><path d="M46,52 L50,60 L54,52Z" fill="#f2c14e"/>` },
  boar: { hp: 8, reward: 24, name: { ru: 'Каштановый кабан', cz: 'Kaštanový kanec' },
    text: { ru: 'Бегает по лабиринтам и роняет то taken, то took. Лови правильную форму!', cz: 'Pobíhá po bludištích a ztrácí jednou taken, jindy took. Chyť správný tvar!' },
    svg: `<ellipse cx="52" cy="60" rx="34" ry="22" fill="#6a4224"/><ellipse cx="24" cy="56" rx="14" ry="12" fill="#7a5030"/><ellipse cx="14" cy="58" rx="6" ry="5" fill="#e8a8a0"/><path d="M20,64 q-6,6 -4,10 M28,64 q4,8 2,12" stroke="#fff" stroke-width="3" fill="none"/><circle cx="26" cy="50" r="2.5" fill="#111"/><path d="M36,78 v12 M62,80 v12 M76,76 v12" stroke="#4a2a14" stroke-width="6"/><path d="M40,40 l4,-10 l4,10 M52,40 l4,-10 l4,10" stroke="#4a2a14" stroke-width="3" fill="none"/>` },
  mooncake: { hp: 8, reward: 24, name: { ru: 'Лунный пряник', cz: 'Měsíční koláček' },
    text: { ru: 'Предсказывает будущее: «It will rain. I am going to win». Всегда немного в будущем.', cz: 'Věští budoucnost: „It will rain. I am going to win.“ Vždycky je trochu v budoucnosti.' },
    svg: `<circle cx="50" cy="52" r="34" fill="#d9a04a" stroke="#8a5a12" stroke-width="3"/><circle cx="50" cy="52" r="24" fill="none" stroke="#8a5a12" stroke-width="2" stroke-dasharray="6 4"/><text x="50" y="60" font-size="22" text-anchor="middle" fill="#8a5a12">月</text><circle cx="40" cy="44" r="2.5" fill="#3a2008"/><circle cx="60" cy="44" r="2.5" fill="#3a2008"/>` },
  ferry: { hp: 8, reward: 26, name: { ru: 'Паромщик-цапля', cz: 'Volavka převozník' },
    text: { ru: 'Перевозит слова in, on, at через реку и никогда не путает the и a.', cz: 'Převáží slova in, on, at přes řeku a nikdy nesplete the a a.' },
    svg: `<path d="M10,76 Q50,92 90,76 L84,70 H16Z" fill="#8a5a32"/><path d="M58,70 V30 Q58,18 70,16" stroke="#cfd8dc" stroke-width="5" fill="none"/><ellipse cx="52" cy="58" rx="16" ry="11" fill="#cfd8dc"/><circle cx="72" cy="16" r="6" fill="#cfd8dc"/><path d="M78,16 l12,2 l-12,2z" fill="#f2c14e"/><path d="M30,70 V40" stroke="#5a3a1a" stroke-width="3"/>` },
  chestnut: { hp: 8, reward: 26, name: { ru: 'Каштан-задира', cz: 'Kaštan rváč' },
    text: { ru: 'Любит сравнивать: «Я больше! Я быстрее! Я самый лучший!»', cz: 'Rád porovnává: „Jsem větší! Jsem rychlejší! Jsem nejlepší!“' },
    svg: `<path d="M50,14 Q88,30 82,66 Q74,92 50,92 Q26,92 18,66 Q12,30 50,14Z" fill="#7a3a1a"/><path d="M28,30 Q50,20 72,30" stroke="#e8c890" stroke-width="5" fill="none"/><circle cx="40" cy="54" r="4" fill="#fff"/><circle cx="60" cy="54" r="4" fill="#fff"/><circle cx="40" cy="55" r="2" fill="#111"/><circle cx="60" cy="55" r="2" fill="#111"/><path d="M34,46 l10,4 M66,46 l-10,4" stroke="#111" stroke-width="2.5"/><path d="M42,70 q8,-6 16,0" stroke="#111" stroke-width="2.5" fill="none"/>` },
  inkbrush: { hp: 9, reward: 28, name: { ru: 'Кисть-письмоводитель', cz: 'Štětec písař' },
    text: { ru: 'Пишет письма друзьям и отелям. Знает, когда писать «Hi», а когда «Dear Sir».', cz: 'Píše dopisy kamarádům i hotelům. Ví, kdy napsat „Hi“ a kdy „Dear Sir“.' },
    svg: `<rect x="44" y="10" width="12" height="54" rx="4" fill="#8a3a22"/><path d="M42,62 h16 l-2,10 Q50,96 44,72Z" fill="#1d1d24"/><rect x="18" y="58" width="30" height="22" rx="2" fill="#efdcb0" stroke="#8a6a32"/><path d="M22,64 h22 M22,70 h16" stroke="#1d1d24" stroke-width="2"/><circle cx="46" cy="30" r="2" fill="#fff"/><circle cx="54" cy="30" r="2" fill="#fff"/>` },
  lanternfox: { hp: 9, reward: 28, name: { ru: 'Лис с фонарём', cz: 'Liška s lucernou' },
    text: { ru: 'Болтает в чате со всеми гостями долины. Отвечает быстро и всегда вежливо.', cz: 'Chatuje se všemi hosty údolí. Odpovídá rychle a vždycky zdvořile.' },
    svg: `<path d="M30,44 L22,18 L40,32 M70,44 L78,18 L60,32" fill="#e8913c"/><ellipse cx="50" cy="56" rx="26" ry="22" fill="#e8913c"/><path d="M34,60 Q50,78 66,60 Q50,70 34,60Z" fill="#fff"/><circle cx="40" cy="50" r="3" fill="#111"/><circle cx="60" cy="50" r="3" fill="#111"/><path d="M80,62 v8" stroke="#3a2a1a" stroke-width="2"/><ellipse cx="80" cy="80" rx="9" ry="11" fill="#d8402e"/><ellipse cx="80" cy="80" rx="4" ry="6" fill="#ffd27a"/>` },
  qilin: { hp: 12, reward: 50, name: { ru: 'Цилинь Врат осени', cz: 'Čchi-lin Brány podzimu' },
    text: { ru: 'Мудрый страж уровня B1. Пропускает дальше только тех, кто сдал пробный тест.', cz: 'Moudrý strážce úrovně B1. Pustí dál jen ty, kdo složili zkušební test.' },
    svg: `<path d="M24,70 Q20,40 44,34 L66,30 Q86,30 84,50 Q82,70 66,72Z" fill="#3f9b6e" stroke="#1d5a3a" stroke-width="2.5"/><circle cx="74" cy="34" r="14" fill="#4fb07e"/><path d="M70,20 l-4,-14 M80,20 l6,-12" stroke="#f2c14e" stroke-width="3"/><circle cx="78" cy="32" r="2.5" fill="#111"/><path d="M30,72 v20 M44,72 v20 M58,72 v20 M70,72 v20" stroke="#1d5a3a" stroke-width="5"/><path d="M24,56 q-14,-10 -10,-24" stroke="#f2c14e" stroke-width="5" fill="none"/><g fill="#f2c14e"><circle cx="40" cy="50" r="3"/><circle cx="52" cy="46" r="3"/><circle cx="62" cy="54" r="3"/></g>` },
  // Глава 4 «Зима · B2» (чешский)
  snowhare: { hp: 9, reward: 30, name: { ru: 'Снежный заяц', uk: 'Сніжний заєць', cz: 'Sněžný zajíc' },
    text: { ru: 'Всё делает парами: сначала бежит (běží), потом прибегает (přiběhne). Путает виды — сразу тает.', uk: 'Усе робить парами: спершу біжить (běží), потім прибігає (přiběhne). Плутає види — одразу тане.', cz: 'Všechno dělá v párech: nejdřív běží, pak přiběhne. Když splete vid, roztaje.' },
    svg: `<path d="M38,40 Q30,6 40,8 Q48,12 46,40 M60,40 Q62,6 70,8 Q78,14 66,42" fill="#f4f8fc" stroke="#a8bccc" stroke-width="2"/><ellipse cx="52" cy="62" rx="28" ry="24" fill="#f4f8fc" stroke="#a8bccc" stroke-width="2"/><circle cx="43" cy="56" r="3" fill="#2a2a3a"/><circle cx="61" cy="56" r="3" fill="#2a2a3a"/><path d="M48,64 Q52,68 56,64" stroke="#c86a8a" stroke-width="2.5" fill="none"/><circle cx="52" cy="62" r="2" fill="#e88aa8"/>` },
  icecarp: { hp: 9, reward: 30, name: { ru: 'Ледяной карп', uk: 'Крижаний короп', cz: 'Ledový kapr' },
    text: { ru: 'Зимует подо льдом и шепчет падежи: kapr, kapra, kaprovi… На седьмом засыпает до весны.', uk: 'Зимує під кригою й шепоче відмінки: kapr, kapra, kaprovi… На сьомому засинає до весни.', cz: 'Zimuje pod ledem a šeptá pády: kapr, kapra, kaprovi… U sedmého usne až do jara.' },
    svg: `<path d="M14,52 Q40,22 70,40 L90,26 L86,52 L90,76 L70,62 Q40,82 14,52Z" fill="#8cc4dc" stroke="#3a7a9a" stroke-width="2.5"/><circle cx="30" cy="48" r="4" fill="#123"/><path d="M44,40 q6,12 0,24 M54,40 q6,12 0,24" stroke="#cfeaf6" stroke-width="3" fill="none"/><path d="M6,86 H94" stroke="#cfe6f0" stroke-width="6"/>` },
  frostbrush: { hp: 9, reward: 30, name: { ru: 'Морозная кисть', uk: 'Морозний пензель', cz: 'Mrazivý štětec' },
    text: { ru: 'Рисует на окнах háčky и čárky. Если поставить кружок не туда, узор трескается.', uk: 'Малює на вікнах háčky й čárky. Якщо поставити кружечок не туди, візерунок тріскається.', cz: 'Kreslí na okna háčky a čárky. Když dáš kroužek na špatné místo, vzor praskne.' },
    svg: `<rect x="44" y="8" width="12" height="52" rx="4" fill="#5a7a9a"/><path d="M42,58 h16 l-2,10 Q50,92 44,68Z" fill="#dff2ff"/><path d="M18,30 l8,8 l-8,8 M82,30 l-8,8 l8,8 M30,82 q20,-10 40,0" stroke="#bfe4f6" stroke-width="4" fill="none"/><text x="70" y="24" font-size="22" fill="#fff">ř</text>` },
  mirrorcat: { hp: 10, reward: 32, name: { ru: 'Кошка-зеркало', uk: 'Кішка-дзеркало', cz: 'Zrcadlová kočka' },
    text: { ru: 'Всё время смотрится в лёд: myje se, češe se, dívá se. А себе покупает только рыбу: koupí si rybu.', uk: 'Весь час дивиться в кригу: myje se, češe se, dívá se. А собі купує лише рибу: koupí si rybu.', cz: 'Pořád se dívá do ledu: myje se, češe se, dívá se. A koupí si jen rybu.' },
    svg: `<path d="M30,40 L26,16 L42,30 M70,40 L74,16 L58,30" fill="#c8d4e0"/><ellipse cx="50" cy="56" rx="26" ry="24" fill="#c8d4e0" stroke="#7a8aa0" stroke-width="2"/><ellipse cx="41" cy="52" rx="4" ry="6" fill="#4ab0d8"/><ellipse cx="59" cy="52" rx="4" ry="6" fill="#4ab0d8"/><path d="M44,66 Q50,70 56,66" stroke="#5a5a6a" stroke-width="2.5" fill="none"/><rect x="8" y="80" width="84" height="10" rx="5" fill="#dff2ff"/>` },
  sealclerk: { hp: 10, reward: 32, name: { ru: 'Тюлень-чиновник', uk: 'Тюлень-чиновник', cz: 'Tuleň úředník' },
    text: { ru: 'Сидит в ледяном úřadu и ставит печати. Принимает žádost только на «Вы»: «Dobrý den, prosím vás…»', uk: 'Сидить у крижаному úřadu й ставить печатки. Приймає žádost лише на «Ви»: «Dobrý den, prosím vás…»', cz: 'Sedí na ledovém úřadě a razítkuje. Žádost přijme jen vykáním: „Dobrý den, prosím vás…“' },
    svg: `<ellipse cx="50" cy="62" rx="32" ry="24" fill="#8a9aa8"/><circle cx="50" cy="38" r="18" fill="#9aaab8"/><circle cx="43" cy="36" r="3" fill="#111"/><circle cx="57" cy="36" r="3" fill="#111"/><path d="M40,44 q10,6 20,0" stroke="#333" stroke-width="2" fill="none"/><rect x="34" y="16" width="32" height="8" rx="2" fill="#2a2a3a"/><rect x="62" y="56" width="22" height="16" rx="2" fill="#c8402e"/>` },
  yeti: { hp: 10, reward: 34, name: { ru: 'Горный йети', uk: 'Гірський єті', cz: 'Horský yetti' },
    text: { ru: 'Сто лет строил (stavěl) хижину и наконец построил (postavil). Уважает только тех, кто чувствует разницу.', uk: 'Сто років будував (stavěl) хатину й нарешті збудував (postavil). Поважає лише тих, хто відчуває різницю.', cz: 'Sto let stavěl chatu a konečně ji postavil. Váží si jen těch, kdo cítí rozdíl.' },
    svg: `<path d="M20,90 Q14,40 50,22 Q86,40 80,90Z" fill="#eef4f8" stroke="#a8bccc" stroke-width="2.5"/><ellipse cx="50" cy="48" rx="18" ry="14" fill="#8aa0b4"/><circle cx="43" cy="46" r="3" fill="#111"/><circle cx="57" cy="46" r="3" fill="#111"/><path d="M42,56 h16" stroke="#111" stroke-width="3"/><path d="M14,60 l-8,10 M86,60 l8,10" stroke="#a8bccc" stroke-width="6"/>` },
  snowlion: { hp: 11, reward: 36, name: { ru: 'Снежный лев', uk: 'Сніжний лев', cz: 'Sněžný lev' },
    text: { ru: 'Рычит во всех падежах: lev, lva, lvovi, lva, lve!, o lvovi, s lvem. Звательный — его любимый.', uk: 'Гарчить в усіх відмінках: lev, lva, lvovi, lva, lve!, o lvovi, s lvem. Кличний — його улюблений.', cz: 'Řve ve všech pádech: lev, lva, lvovi, lva, lve!, o lvovi, s lvem. Nejraději má pátý pád.' },
    svg: `<circle cx="50" cy="50" r="34" fill="#f4f8fc" stroke="#b8c8d8" stroke-width="3"/><circle cx="50" cy="54" r="20" fill="#dfe8f0"/><circle cx="43" cy="50" r="3" fill="#123"/><circle cx="57" cy="50" r="3" fill="#123"/><path d="M44,62 Q50,68 56,62" stroke="#123" stroke-width="2.5" fill="none"/><circle cx="50" cy="57" r="2.5" fill="#c86a8a"/>` },
  icicle: { hp: 11, reward: 36, name: { ru: 'Сосулька-учительница', uk: 'Бурулька-вчителька', cz: 'Rampouch učitelka' },
    text: { ru: 'Капает точно на ошибку: «dům с кружком, úkol с чёрточкой!» Весной уходит на пенсию.', uk: 'Капає точно на помилку: «dům із кружечком, úkol із рисочкою!» Навесні йде на пенсію.', cz: 'Kape přesně na chybu: „dům s kroužkem, úkol s čárkou!“ Na jaře jde do důchodu.' },
    svg: `<path d="M30,10 h40 L56,90 Q50,98 44,90Z" fill="#cfeefc" stroke="#7ab8d8" stroke-width="2.5"/><circle cx="44" cy="30" r="3" fill="#123"/><circle cx="56" cy="30" r="3" fill="#123"/><path d="M45,40 Q50,44 55,40" stroke="#123" stroke-width="2" fill="none"/><rect x="36" y="22" width="28" height="6" rx="3" fill="none" stroke="#3a5a7a" stroke-width="2"/>` },
  teacrane: { hp: 11, reward: 38, name: { ru: 'Журавль-секретарь', uk: 'Журавель-секретар', cz: 'Jeřáb sekretář' },
    text: { ru: 'Пишет письма в úřad и всегда начинает «Vážený pane». Друзьям — «Ahoj», но только после работы.', uk: 'Пише листи в úřad і завжди починає «Vážený pane». Друзям — «Ahoj», але лише після роботи.', cz: 'Píše dopisy na úřad a vždy začíná „Vážený pane“. Kamarádům píše „Ahoj“, ale až po práci.' },
    svg: `<path d="M30,86 L40,60 M48,86 L44,62" stroke="#3a3a3a" stroke-width="3"/><ellipse cx="44" cy="54" rx="24" ry="14" fill="#f4f6f8"/><path d="M58,50 Q66,30 62,16" stroke="#f4f6f8" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="62" cy="14" r="7" fill="#f4f6f8"/><circle cx="62" cy="9" r="3.5" fill="#d8402e"/><path d="M68,14 L86,18 L68,17Z" fill="#d9a43a"/><rect x="18" y="60" width="22" height="16" rx="2" fill="#efdcb0" stroke="#8a6a32" stroke-width="2"/>` },
  icedragon: { hp: 14, reward: 60, name: { ru: 'Ледяной дракон Врат зимы', uk: 'Крижаний дракон Брами зими', cz: 'Ledový drak Brány zimy' },
    text: { ru: 'Страж уровня B2. Говорит только по-чешски, на «Вы» и без единой ошибки в падежах.', uk: 'Вартовий рівня B2. Говорить лише чеською, на «Ви» й без жодної помилки у відмінках.', cz: 'Strážce úrovně B2. Mluví jen česky, vyká a nikdy se nesplete v pádech.' },
    svg: `<path d="M12,70 Q30,30 56,36 Q80,40 88,22 Q90,50 70,58 Q50,66 40,80 Q30,90 12,70Z" fill="#9fd4ec" stroke="#3a7aa0" stroke-width="2.5"/><circle cx="78" cy="28" r="3" fill="#123"/><path d="M84,16 l6,-10 M76,16 l-2,-10" stroke="#dff2ff" stroke-width="3"/><path d="M30,56 l-4,-10 M42,50 l-2,-10 M54,48 l0,-10" stroke="#dff2ff" stroke-width="3"/>` },
  // Духи тем грамматики A1 (английский): простой рисунок — эмодзи на цветном круге
  g_be: em('🪞', '#8a6ad0', 'Зеркальный дух', 'Дзеркальний дух', 'Zrcadlový duch', 'Всё время говорит о себе: I am, you are, he is. Без to be молчит.', 'Весь час говорить про себе: I am, you are, he is. Без to be мовчить.', 'Pořád mluví o sobě: I am, you are, he is. Bez to be mlčí.'),
  g_poss: em('🐦‍⬛', '#3a3a4a', 'Сорока-хозяйка', 'Сорока-господиня', 'Straka hospodyně', 'Всё называет своим: my ring, my spoon. Чужое отдаёт, только если скажешь «your».', 'Усе називає своїм: my ring, my spoon. Чуже віддає, лише якщо скажеш «your».', 'Všechno nazývá svým: my ring, my spoon. Cizí vrátí, jen když řekneš „your“.'),
  g_plural: em('🐜', '#a0522d', 'Муравей-множитель', 'Мураха-множник', 'Mravenec násobilka', 'Один муравей — ant, а вместе они ants. Особенно гордится словом children.', 'Одна мураха — ant, а разом вони ants. Особливо пишається словом children.', 'Jeden mravenec je ant, spolu jsou ants. Nejvíc je hrdý na slovo children.'),
  g_have: em('🐹', '#d9a43a', 'Хомяк-запасливый', 'Хом\'як-запасливий', 'Křeček zásobář', 'Have got — его любимые слова. В щёках у него has got всё на свете.', 'Have got — його улюблені слова. У щоках у нього has got усе на світі.', 'Have got jsou jeho oblíbená slova. Ve tvářích has got všechno na světě.'),
  g_there: em('🧭', '#2f6a8a', 'Дух-указатель', 'Дух-покажчик', 'Duch ukazatel', 'Знает, где что лежит: there is a key, there are two maps.', 'Знає, де що лежить: there is a key, there are two maps.', 'Ví, kde co leží: there is a key, there are two maps.'),
  g_can: em('🦘', '#c8702e', 'Кенгуру-умелец', 'Кенгуру-вмілець', 'Klokan šikula', 'I can jump, I can run! Только can to не говорит никогда.', 'I can jump, I can run! Лише can to не каже ніколи.', 'I can jump, I can run! Jen can to neřekne nikdy.'),
  g_ps: em('⏰', '#4a7a5a', 'Сверчок-распорядок', 'Цвіркун-розпорядок', 'Cvrček rozvrh', 'Каждый день одно и то же: he gets up, she drinks tea. Не простит забытое -s.', 'Щодня одне й те саме: he gets up, she drinks tea. Не пробачить забуте -s.', 'Každý den totéž: he gets up, she drinks tea. Neodpustí zapomenuté -s.'),
  g_prep: em('📦', '#8a6a3a', 'Кот в коробке', 'Кіт у коробці', 'Kocour v krabici', 'То in the box, то on the box, то under the box. Найди его!', 'То in the box, то on the box, то under the box. Знайди його!', 'Jednou in the box, pak on the box, pak under the box. Najdi ho!'),
  g_wh: em('🦉', '#5a4a8a', 'Сова-почемучка', 'Сова-чомучка', 'Sova zvědavka', 'What? Where? Why? Задаёт вопросы до самого утра.', 'What? Where? Why? Ставить питання до самого ранку.', 'What? Where? Why? Ptá se až do rána.'),
});

// Духи тем A2–B2 и чешской грамматики: эмодзи на цветном круге, общий текст
import { MOBS as M_A2 } from './en_a2.js';
import { MOBS as M_B1 } from './en_b1.js';
import { MOBS as M_B2 } from './en_b2.js';
import { MOBS as M_CZ } from './cz_ab.js';
import { MOBS as M_CZB } from './cz_b.js';
import { EXT_THEMES, EXT_RAW } from './words_ext.js';
for (const [id, e, c, ru, uk, cz] of [...M_A2, ...M_B1, ...M_B2, ...M_CZ, ...M_CZB]) {
  MOBS[id] = em(e, c, ru, uk, cz || ru, 'Хранитель темы. Отпустит, только если ты знаешь правило.', 'Хранитель теми. Відпустить, лише якщо ти знаєш правило.', 'Strážce tématu. Pustí tě, jen když znáš pravidlo.');
}

// Духи словарных тем: эмодзи первого слова темы
const W_COL = ['#5a8a5a', '#c8702e', '#2f6a8a', '#8a4a8a', '#a3301e', '#6a7a3a'];
Object.keys(EXT_THEMES).forEach((th, i) => {
  const n = EXT_THEMES[th].name;
  MOBS['w_' + th] = em([...EXT_RAW[th][0][1]][0], W_COL[i % W_COL.length], 'Дух темы «' + n.ru + '»', 'Дух теми «' + n.uk + '»', 'Duch tématu „' + n.cz + '“',
    'Отпустит, если знаешь слова этой темы.', 'Відпустить, якщо знаєш слова цієї теми.', 'Pustí tě, když znáš slova tohoto tématu.');
});

export const mobSVG = (id, cls = '') => `<svg class="mob ${cls}" viewBox="0 0 100 100" aria-hidden="true">${MOBS[id].svg}</svg>`;
