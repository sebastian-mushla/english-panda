// Тексты интерфейса: русский и чешский. Задания в играх — на изучаемом языке ({tl} = «по-английски» и т. п.).
import { state, TARGET } from './state.js';
import { LANG_ADV, LANG_NAME } from './learn/lang.js';

const OFFICIAL = { en: 'Cambridge English, EF SET, Oxford Test of English', ru: 'ТРКИ / TORFL', cz: 'CCE — Certifikát z češtiny pro cizince' };

const S = {
  ru: {
    book: 'Книга духов', shop: 'Лавка', dict: 'Словарь', settings: 'Настройки',
    toCurrent: 'К уровню', sound: 'Звук', coins: 'Монеты', stars: 'Звёзды',
    chapter: 'Глава 1 · Весна · A1',
    'zone.bamboo': 'Бамбуковая роща', 'zone.falls': 'Водопад', 'zone.village': 'Деревня',
    'zone.tea': 'Чайный дом', 'zone.gate': 'Врата весны', 'zone.fog': 'Лето · A2',
    soon: 'скоро', fogText: 'Туман рассеется, когда пройдёшь Врата весны.',
    level: 'Уровень', start: 'Старт', locked: 'Закрыто', lockedText: 'Сначала пройди уровень {n}.',
    'star.done': 'Пройти уровень', 'star.perfect': 'Не больше 1 ошибки', 'star.nohint': 'Без подсказок',
    newWords: 'Новые слова', reviewWords: 'Повторение', spirit: 'Дух уровня', stages: 'Испытания',
    'g.intro': 'Знакомство', 'g.cards': 'Пары', 'g.type': 'Печать', 'g.gap': 'Вставь пропуск', 'g.rush': 'Скоропись', 'g.spell': 'Каллиграфия',
    'g.sudoku': 'Судоку слов', 'g.builder': 'Сборщик фраз', 'g.duel': 'Дуэль с духом',
    'gi.intro': 'Посмотри новые слова. Нажми на карточку: там перевод и пример.',
    'gi.cards': 'Открывай карточки и находи пары: слово и его значение.',
    'gi.type': 'Напечатай слово {tl} по памяти. Можно на своей клавиатуре, раскладка не важна.',
    'gi.gap': 'Впечатай слово, которого не хватает в предложении.',
    'gi.rush': 'Листья падают! Печатай слово {tl}, пока лист не коснулся земли.',
    'hint.mean': 'Перевод',
    'gi.spell': 'Собери слово из букв. Можно печатать на клавиатуре.',
    'gi.sudoku': 'В каждой строке, столбце и квадрате 2×2 каждое слово ровно один раз.',
    'gi.builder': 'Составь предложение {tl}. Нажимай слова по порядку.',
    'gi.duel': 'Дух загадывает значение. Брось нужную карту-слово!',
    ready: 'Я готов', check: 'Проверить', next: 'Дальше', retry: 'Ещё раз', toLobby: 'В долину',
    close: 'Закрыть', replay: 'Ещё раз', slow: 'Медленно', buy: 'Купить', equip: 'Надеть', equipped: 'Надето',
    upgrade: 'Улучшить', max: 'Максимум', print: 'Печать',
    hint: 'Подсказка', hintTitle: 'Свиток подсказки', 'hint.1': 'Загадка', 'hint.2': 'Пример', 'hint.3': 'Помощь',
    noCoins: 'Не хватает монет', hintNote: 'Подсказка стоит монет и снимает звезду «Без подсказок».',
    hintNothing: 'Тут подсказывать нечего.',
    win: 'Уровень пройден!', lose: 'Дух оказался сильнее', loseText: 'Слова, где ты ошибся, вернутся на повторение. Попробуй ещё раз!',
    mistakes: 'Ошибки', hintsUsed: 'Подсказки', reward: 'Награда', caught: 'Дух записан в Книгу!',
    wordsInDict: 'Слов в словаре', lives: 'Фонари',
    combo: 'Комбо ×{n}', crit: 'Крит!', askMeaning: 'Какое слово значит:',     askRiddle: 'Отгадай загадку:', askPic: 'Что на картинке?',
    'tab.spirits': 'Духи', 'tab.ach': 'Достижения', 'tab.certs': 'Свитки',
    beaten: 'Побеждён: {n}', unknownSpirit: 'Неизвестный дух', unknownText: 'Победи духа на уровне {n}, и он появится здесь.',
    'tab.skins': 'Наряды', 'tab.upgrades': 'Улучшения',
    'slot.hat': 'Шляпа', 'slot.robe': 'Одежда', 'slot.item': 'Предмет',
    search: 'Поиск…', allThemes: 'Все темы', dictEmpty: 'Слова появятся после первого уровня.',
    knowledge: 'Знание', reviewWeak: 'Повторить слабые слова', due: 'пора повторить', reviewTitle: 'Повторение',
    name: 'Имя ученика', language: 'Язык', season: 'Сезон', 'season.auto': 'По главе',
    'season.spring': 'Весна', 'season.summer': 'Лето', 'season.autumn': 'Осень', 'season.winter': 'Зима',
    dayTime: 'Время суток', 'time.scroll': 'По прокрутке', 'time.real': 'Как на часах',
    reset: 'Сбросить прогресс', resetConfirm: 'Удалить весь прогресс, монеты и наряды?',
    daily: 'Задание дня', 'daily.levels': 'Пройди 2 уровня', 'daily.right': 'Ответь правильно 25 раз',
    dailyDone: 'Задание дня выполнено!',
    achNew: 'Новое достижение', bought: 'Куплено', coinsPlus: '+{n} монет',
    welcome: 'Добро пожаловать в долину!',
    welcomeText: 'Здесь панды учат языкам. Крути колесо мыши или тяни мир пальцем вправо. Нажми на камень с номером, чтобы начать уровень.',
    yourName: 'Как тебя зовут? (для сертификатов)', go: 'Вперёд',
    certTitle: 'Свиток мастера', certConfirms: 'Настоящим подтверждается, что',
    certText: 'прошёл(-ла) главу «Весна» и освоил(-а) уровень A1 Starter. Язык: {tln}.',
    certNext: 'Следующая глава: Лето · A2',
    certOfficial: 'Когда дойдёшь до B1, игра предложит официальный тест: {off}.',
    noCerts: 'Пройди Врата весны (уровень 10), чтобы получить первый свиток.',
    newCert: 'Получен свиток мастера!',
    learnedWord: 'выучено', progress: 'Прогресс',
    'npc.shop': 'Лавка тётушки Бао', 'npc.book': 'Монах с Книгой духов', 'npc.dict': 'Учёный со словарём',
    level10: 'Врата', exam: 'Экзамен главы',
    'hint.act': 'Смотри на поле: подсказка уже там.', iSpeak: 'Я говорю на', iLearn: 'Хочу учить', learning: 'Учу', 'hint.pattern': 'Узор фразы', shieldSaved: 'Нефритовый щит спас фонарь!', reviewDone: 'Повторение окончено!',
  },
  cz: {
    book: 'Kniha duchů', shop: 'Obchůdek', dict: 'Slovník', settings: 'Nastavení',
    toCurrent: 'K úrovni', sound: 'Zvuk', coins: 'Mince', stars: 'Hvězdy',
    chapter: 'Kapitola 1 · Jaro · A1',
    'zone.bamboo': 'Bambusový háj', 'zone.falls': 'Vodopád', 'zone.village': 'Vesnice',
    'zone.tea': 'Čajovna', 'zone.gate': 'Brána jara', 'zone.fog': 'Léto · A2',
    soon: 'brzy', fogText: 'Mlha se rozplyne, až projdeš Bránou jara.',
    level: 'Úroveň', start: 'Start', locked: 'Zamčeno', lockedText: 'Nejdřív projdi úroveň {n}.',
    'star.done': 'Projít úroveň', 'star.perfect': 'Nejvýš 1 chyba', 'star.nohint': 'Bez nápověd',
    newWords: 'Nová slova', reviewWords: 'Opakování', spirit: 'Duch úrovně', stages: 'Zkoušky',
    'g.intro': 'Seznámení', 'g.cards': 'Dvojice', 'g.type': 'Psaní', 'g.gap': 'Doplň slovo', 'g.rush': 'Rychlopis', 'g.spell': 'Kaligrafie',
    'g.sudoku': 'Slovní sudoku', 'g.builder': 'Skládání vět', 'g.duel': 'Souboj s duchem',
    'gi.intro': 'Prohlédni si nová slova. Klepni na kartičku: je tam překlad a příklad.',
    'gi.cards': 'Otáčej kartičky a hledej dvojice: slovo a jeho význam.',
    'gi.type': 'Napiš slovo {tl} zpaměti. Můžeš na své klávesnici, na rozložení nezáleží.',
    'gi.gap': 'Napiš slovo, které ve větě chybí.',
    'gi.rush': 'Listy padají! Napiš slovo {tl}, než list dopadne na zem.',
    'hint.mean': 'Překlad',
    'gi.spell': 'Slož slovo z písmen. Můžeš psát i na klávesnici.',
    'gi.sudoku': 'V každém řádku, sloupci i čtverci 2×2 je každé slovo právě jednou.',
    'gi.builder': 'Slož větu {tl}. Klepej na slova popořadě.',
    'gi.duel': 'Duch zadá význam. Zahraj správnou kartu se slovem!',
    ready: 'Jdu na to', check: 'Zkontrolovat', next: 'Dál', retry: 'Znovu', toLobby: 'Do údolí',
    close: 'Zavřít', replay: 'Znovu', slow: 'Pomalu', buy: 'Koupit', equip: 'Obléct', equipped: 'Oblečeno',
    upgrade: 'Vylepšit', max: 'Maximum', print: 'Tisk',
    hint: 'Nápověda', hintTitle: 'Svitek nápovědy', 'hint.1': 'Hádanka', 'hint.2': 'Příklad', 'hint.3': 'Pomoc',
    noCoins: 'Nemáš dost mincí', hintNote: 'Nápověda stojí mince a bere hvězdu „Bez nápověd“.',
    hintNothing: 'Tady není co napovídat.',
    win: 'Úroveň splněna!', lose: 'Duch byl silnější', loseText: 'Slova, ve kterých jsi chyboval(a), půjdou znovu na opakování. Zkus to znovu!',
    mistakes: 'Chyby', hintsUsed: 'Nápovědy', reward: 'Odměna', caught: 'Duch zapsán do Knihy!',
    wordsInDict: 'Slov ve slovníku', lives: 'Lucerny',
    combo: 'Kombo ×{n}', crit: 'Kritický zásah!', askMeaning: 'Které slovo znamená:',     askRiddle: 'Uhodni hádanku:', askPic: 'Co je na obrázku?',
    'tab.spirits': 'Duchové', 'tab.ach': 'Úspěchy', 'tab.certs': 'Svitky',
    beaten: 'Poražen: {n}×', unknownSpirit: 'Neznámý duch', unknownText: 'Poraz ducha v úrovni {n} a objeví se tady.',
    'tab.skins': 'Oblečky', 'tab.upgrades': 'Vylepšení',
    'slot.hat': 'Pokrývka hlavy', 'slot.robe': 'Oděv', 'slot.item': 'Předmět',
    search: 'Hledat…', allThemes: 'Všechna témata', dictEmpty: 'Slova se objeví po první úrovni.',
    knowledge: 'Znalost', reviewWeak: 'Zopakovat slabá slova', due: 'čas zopakovat', reviewTitle: 'Opakování',
    name: 'Jméno žáka', language: 'Jazyk', season: 'Roční období', 'season.auto': 'Podle kapitoly',
    'season.spring': 'Jaro', 'season.summer': 'Léto', 'season.autumn': 'Podzim', 'season.winter': 'Zima',
    dayTime: 'Denní doba', 'time.scroll': 'Podle posunu', 'time.real': 'Podle hodin',
    reset: 'Smazat postup', resetConfirm: 'Smazat celý postup, mince i oblečky?',
    daily: 'Úkol dne', 'daily.levels': 'Projdi 2 úrovně', 'daily.right': 'Odpověz správně 25×',
    dailyDone: 'Úkol dne splněn!',
    achNew: 'Nový úspěch', bought: 'Koupeno', coinsPlus: '+{n} mincí',
    welcome: 'Vítej v údolí!',
    welcomeText: 'Tady pandy učí jazyky. Toč kolečkem myši nebo táhni svět prstem doprava. Klepni na kámen s číslem a začni úroveň.',
    yourName: 'Jak se jmenuješ? (pro certifikáty)', go: 'Jdeme na to',
    certTitle: 'Mistrovský svitek', certConfirms: 'Tímto se potvrzuje, že',
    certText: 'prošel(-la) kapitolou „Jaro“ a zvládl(a) úroveň A1 Starter. Jazyk: {tln}.',
    certNext: 'Další kapitola: Léto · A2',
    certOfficial: 'Až dojdeš na B1, hra ti nabídne oficiální test: {off}.',
    noCerts: 'Projdi Bránou jara (úroveň 10) a získáš první svitek.',
    newCert: 'Získal(a) jsi mistrovský svitek!',
    learnedWord: 'naučeno', progress: 'Postup',
    'npc.shop': 'Obchůdek tety Bao', 'npc.book': 'Mnich s Knihou duchů', 'npc.dict': 'Učenec se slovníkem',
    level10: 'Brána', exam: 'Zkouška kapitoly',
    'hint.act': 'Podívej se na hrací plochu: nápověda už tam je.', iSpeak: 'Mluvím', iLearn: 'Chci se učit', learning: 'Učím se', 'hint.pattern': 'Vzor věty', shieldSaved: 'Nefritový štít zachránil lucernu!', reviewDone: 'Opakování hotovo!',
  },
};

export function t(key, vars) {
  let s = S[state.lang]?.[key] ?? S.ru[key] ?? key;
  if (s.includes('{t')) s = s.replace('{tl}', LANG_ADV[TARGET][state.lang]).replace('{tln}', LANG_NAME[TARGET][state.lang]);
  if (s.includes('{off}')) s = s.replace('{off}', OFFICIAL[TARGET]);
  if (vars) for (const k in vars) s = s.replaceAll('{' + k + '}', vars[k]);
  return s;
}

// Объект {ru, cz} → текст на текущем языке
export const L = (o) => (o ? o[state.lang] ?? o.ru : '');

// Количество слов с правильным окончанием
export function nWords(n) {
  if (state.lang === 'cz') return n + ' ' + (n === 1 ? 'slovo' : n >= 2 && n <= 4 ? 'slova' : 'slov');
  const m10 = n % 10, m100 = n % 100;
  const w = m10 === 1 && m100 !== 11 ? 'слово' : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? 'слова' : 'слов';
  return n + ' ' + w;
}
