// Входы в места больших тем прямо в ландшафте: дверь дома, пасть пещеры в скале, тоннель в горе,
// ступени вниз к фонтану, ворота храма, башня-библиотека. Поле 260×240, низ рисунка (y = 240) — земля у тропы.
// Проём входа (класс .door) светится, когда тема открыта, и закрыт решёткой, когда закрыта.
export const ENTRANCE = {
  house: `<path d="M18,240 V120 H242 V240Z" fill="#8a5a32"/><path d="M18,120 H242 V240 H18Z" fill="url(#entWood)"/>
    <path d="M0,128 Q30,112 40,70 L220,70 Q230,112 260,128 Q130,146 0,128Z" fill="#3a2a22"/><path d="M40,70 Q130,40 220,70" stroke="#2a1c16" stroke-width="8" fill="none"/>
    <path d="M6,124 Q130,150 254,124" stroke="#d6dde2" stroke-width="7" fill="none" opacity=".75"/>
    <rect x="30" y="150" width="46" height="40" rx="3" fill="#ffd98a" opacity=".85"/><path d="M53,150 V190 M30,170 H76" stroke="#5a3820" stroke-width="4"/>
    <rect x="184" y="150" width="46" height="40" rx="3" fill="#ffd98a" opacity=".85"/><path d="M207,150 V190 M184,170 H230" stroke="#5a3820" stroke-width="4"/>
    <path class="door" d="M100,240 V160 Q130,138 160,160 V240Z"/><path d="M100,240 V160 Q130,138 160,160 V240" stroke="#3a2412" stroke-width="6" fill="none"/>
    <rect x="96" y="104" width="68" height="26" rx="3" fill="#efdcb0" stroke="#8a3a22" stroke-width="3"/><text x="130" y="124" text-anchor="middle" font-size="20" fill="#8a3a22" font-family="serif">師</text>
    <circle cx="86" cy="148" r="9" fill="#d8402e"/><circle cx="174" cy="148" r="9" fill="#d8402e"/>`,
  cave: `<path d="M0,240 Q10,150 60,110 Q100,60 150,70 Q220,80 245,150 Q258,200 260,240Z" fill="url(#entRock)"/>
    <path d="M30,240 Q40,180 70,150 M210,240 Q215,190 200,160" stroke="#3a4048" stroke-width="5" fill="none" opacity=".6"/>
    <path d="M60,112 Q90,96 120,108 M150,74 Q190,84 214,110" stroke="#e8eef2" stroke-width="8" fill="none" opacity=".7"/>
    <path class="door" d="M78,240 Q76,170 130,150 Q184,170 182,240Z"/>
    <path d="M96,166 l6,16 l6,-14 l6,18 l6,-16 l6,14 l6,-18 l6,16 l6,-14 l6,14 l6,-16" stroke="#3a4048" stroke-width="6" fill="none"/>
    <path d="M78,240 Q76,170 130,150 Q184,170 182,240" stroke="#2a2e34" stroke-width="7" fill="none"/>
    <circle cx="40" cy="226" r="8" fill="#5ad0e0" opacity=".8"/><circle cx="222" cy="230" r="6" fill="#5ad0e0" opacity=".8"/>`,
  mountain: `<path d="M0,240 L70,60 L110,100 L150,20 L260,240Z" fill="url(#entRock)"/><path d="M150,20 L176,74 L160,66 L146,82 L132,58Z" fill="#f2f6fa"/>
    <path d="M70,60 L86,98 L74,92 L62,104Z" fill="#f2f6fa"/>
    <path d="M84,240 V176 Q84,140 130,140 Q176,140 176,176 V240Z" fill="#6a5a48"/>
    <path class="door" d="M96,240 V178 Q96,152 130,152 Q164,152 164,178 V240Z"/>
    ${[96, 113, 130, 147, 164].map((x, i) => `<rect x="${x - 8}" y="${136 + Math.abs(i - 2) * 6}" width="14" height="14" fill="#7a6a56" stroke="#4a3e30" stroke-width="2"/>`).join('')}
    <rect x="62" y="178" width="6" height="40" fill="#5a3a1e"/><circle cx="65" cy="172" r="8" fill="#ffb347"/><rect x="192" y="178" width="6" height="40" fill="#5a3a1e"/><circle cx="195" cy="172" r="8" fill="#ffb347"/>`,
  fountain: `<ellipse cx="130" cy="222" rx="126" ry="18" fill="#8a9a8a"/><path d="M10,222 Q130,250 250,222 V240 H10Z" fill="#6a7a6a"/>
    ${[0, 1, 2, 3].map((i) => `<rect x="${78 + i * 8}" y="${170 + i * 14}" width="${104 - i * 16}" height="12" rx="2" fill="${['#d6d0c0', '#c8c2b2', '#bab4a4', '#aca696'][i]}"/>`).join('')}
    <path class="door" d="M96,170 V132 Q130,108 164,132 V170Z"/><path d="M90,172 V130 Q130,98 170,130 V172" stroke="#c8c2b2" stroke-width="10" fill="none"/>
    <ellipse cx="130" cy="96" rx="34" ry="9" fill="#cfd8dc"/><rect x="124" y="70" width="12" height="28" fill="#cfd8dc"/>
    <path d="M130,70 Q112,40 100,90 M130,70 Q148,40 160,90 M130,70 V36" stroke="#9fe0f6" stroke-width="4" fill="none"/>
    <circle cx="36" cy="204" r="18" fill="#e88aa8" opacity=".85"/><circle cx="226" cy="204" r="18" fill="#e88aa8" opacity=".85"/>`,
  temple: `<rect x="34" y="96" width="18" height="144" fill="#a3301e"/><rect x="208" y="96" width="18" height="144" fill="#a3301e"/>
    <path d="M6,96 Q130,66 254,96 V112 H6Z" fill="#2a2a2a"/><rect x="20" y="118" width="220" height="12" fill="#a3301e"/>
    <path class="door" d="M60,240 V136 H200 V240Z"/><rect x="100" y="84" width="60" height="24" fill="#efdcb0" stroke="#8a3a22" stroke-width="3"/><text x="130" y="103" text-anchor="middle" font-size="18" fill="#8a3a22" font-family="serif">道</text>
    <rect x="24" y="226" width="212" height="14" fill="#8a8678"/>`,
  library: `<rect x="70" y="40" width="120" height="200" fill="#7a5a3a"/><path d="M58,46 L130,0 L202,46Z" fill="#3a2a22"/>
    ${[70, 110].map((y) => `<rect x="86" y="${y}" width="22" height="28" fill="#ffd98a" opacity=".85"/><rect x="152" y="${y}" width="22" height="28" fill="#ffd98a" opacity=".85"/>`).join('')}
    <path class="door" d="M108,240 V176 Q130,156 152,176 V240Z"/><rect x="104" y="150" width="52" height="18" fill="#efdcb0" stroke="#8a3a22" stroke-width="2"/><text x="130" y="164" text-anchor="middle" font-size="14" fill="#8a3a22" font-family="serif">書</text>`,
};

// Общие градиенты рисунков входов
export const ENTRANCE_DEFS = `<defs>
  <linearGradient id="entWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a683c"/><stop offset="1" stop-color="#6a4226"/></linearGradient>
  <linearGradient id="entRock" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9aa4a8"/><stop offset=".6" stop-color="#6c767c"/><stop offset="1" stop-color="#4a5258"/></linearGradient>
</defs>`;
