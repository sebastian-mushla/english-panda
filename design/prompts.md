# Промпты Midjourney (v6/v7)

Общий хвост стиля (добавлять к каждому):
`, painterly digital illustration, gouache and watercolor texture, soft volumetric light, rich details, ancient Chinese fantasy, cozy and magical, game background art, no text, no characters --ar 16:9 --style raw --s 250`

Для единого стиля: сгенерируй первую картинку, потом добавляй `--sref <ссылка на неё>` ко всем остальным.

## Интерьеры (фон фаз, 16:9)
1. Пещера: `inside a mystical cave, glowing turquoise underground river, purple rock walls, hanging stalactites, glowing crystals, moss and vines, a warm golden doorway glowing in the distance, a winding stone path along the river`
2. Дом мастера: `interior of an old Chinese master's house, paper shoji windows with moonlight and bamboo shadows, shelves with scrolls and books, red paper lanterns, tatami floor, low tea table with teapot, warm candle light`
3. Тоннель в горе: `tunnel carved inside a mountain, torches on stone walls, carved Chinese reliefs, stone stairs going up, warm firelight and cool blue shadows`
4. Фонтан знаний: `hidden garden courtyard with an ancient stone fountain of glowing water, cherry blossoms, stone lanterns, koi pond, misty morning light`
5. Храм: `inside an ancient Chinese temple hall, red lacquered pillars, golden statues, incense smoke in light beams, hanging lanterns`
6. Библиотека: `ancient Chinese library tower interior, tall wooden shelves with scrolls, spiral staircase, floating dust in golden light, jade decorations`

## Входы на карте (прозрачный фон → потом убрать фон)
Хвост: `, isolated object, side view, centered, plain white background --ar 1:1 --style raw`
1. `mossy cave entrance in a rocky hill, ferns and hanging vines, dark deep opening with faint glow`
2. `small traditional Chinese master's house, tiled curved roof, glowing paper windows, red lanterns, stone steps`
3. `tunnel entrance in a snowy mountain cliff, wooden frame, torches`
4. `stone stairs going down to a hidden fountain, moss, glowing water below`
5. `red Chinese temple gate with golden sign`
6. `tall wooden library tower with glowing windows`

## Как сдать мне
- Интерьеры: 1600×900 или больше, формат WebP/JPG, до 300 КБ. Класть в `design/assets/interiors/` (cave.webp, house.webp…).
- Входы: PNG с прозрачным фоном (фон убрать в remove.bg). Класть в `design/assets/entrances/`.
