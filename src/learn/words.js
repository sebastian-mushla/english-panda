import { TARGET } from '../state.js';
import { RIDDLES } from './words-i18n.js';
import { THEMES2, RAW2, SENTENCES2 } from './words2.js';
import { IRREGULAR, REGULAR, pastRegular } from './words3.js';
import * as CZ3 from './words3cz.js';
import * as CZ4 from './words4cz.js';
import { HU, HU_SENT } from './hu.js';
import { UK } from './uk.js';

// Банк слов A1. Формат строки: [en, emoji, ru, cz, загадка на простом английском, пример с пропуском ___].
export const THEMES = {
  greet: { ru: 'Приветствия', cz: 'Pozdravy', en: 'Greetings' },
  numbers: { ru: 'Числа', cz: 'Čísla', en: 'Numbers' },
  colors: { ru: 'Цвета', cz: 'Barvy', en: 'Colours' },
  family: { ru: 'Семья', cz: 'Rodina', en: 'Family' },
  animals: { ru: 'Животные', cz: 'Zvířata', en: 'Animals' },
  food: { ru: 'Еда', cz: 'Jídlo', en: 'Food' },
  body: { ru: 'Тело', cz: 'Tělo', en: 'Body' },
  nature: { ru: 'Природа', cz: 'Příroda', en: 'Nature' },
  home: { ru: 'Дом', cz: 'Domov', en: 'Home' },
};

const RAW = {
  greet: [
    ['hello', '👋', 'привет', 'ahoj', 'You say me when you meet a friend.', '___! How are you?'],
    ['goodbye', '🚶', 'до свидания', 'na shledanou', 'You say me when you go away.', '___, see you tomorrow!'],
    ['please', '🙏', 'пожалуйста', 'prosím', 'A magic word when you ask for something.', 'Can I have tea, ___?'],
    ['thank you', '💐', 'спасибо', 'děkuji', 'You say me when somebody helps you.', '___ for the nice gift!'],
    ['yes', '✅', 'да', 'ano', 'I am the opposite of "no".', '___, I like it!'],
    ['no', '❌', 'нет', 'ne', 'I am the opposite of "yes".', '___, thank you. I am not hungry.'],
    ['sorry', '😔', 'извини', 'promiň', 'You say me when you make a mistake.', 'I am ___, I broke your cup.'],
    ['good night', '😴', 'спокойной ночи', 'dobrou noc', 'You say me before you go to sleep.', '___, Mum! Sweet dreams.'],
  ],
  numbers: [
    ['one', '1️⃣', 'один', 'jedna', 'How many noses do you have?', 'I have ___ little brother.'],
    ['two', '2️⃣', 'два', 'dva', 'How many eyes do you have?', 'A bird has ___ legs.'],
    ['three', '3️⃣', 'три', 'tři', 'Two plus one.', 'A traffic light has ___ colours.'],
    ['four', '4️⃣', 'четыре', 'čtyři', 'How many legs does a cat have?', 'A table has ___ legs.'],
    ['five', '5️⃣', 'пять', 'pět', 'How many fingers are on one hand?', 'I have ___ fingers on my hand.'],
    ['six', '6️⃣', 'шесть', 'šest', 'Three plus three.', 'An insect has ___ legs.'],
    ['seven', '7️⃣', 'семь', 'sedm', 'How many days are in a week?', 'A week has ___ days.'],
    ['eight', '8️⃣', 'восемь', 'osm', 'How many legs does a spider have?', 'A spider has ___ legs.'],
    ['nine', '9️⃣', 'девять', 'devět', 'Ten minus one.', 'People say a cat has ___ lives.'],
    ['ten', '🔟', 'десять', 'deset', 'How many fingers are on two hands?', 'I have ___ toes.'],
  ],
  colors: [
    ['red', '🔴', 'красный', 'červený', 'Strawberries and fire trucks are this colour.', 'The lantern is ___.'],
    ['blue', '🔵', 'синий', 'modrý', 'The colour of the sky on a sunny day.', 'The sea is ___.'],
    ['green', '🟢', 'зелёный', 'zelený', 'The colour of grass and bamboo.', 'Bamboo is ___.'],
    ['yellow', '🟡', 'жёлтый', 'žlutý', 'The colour of bananas and the sun.', 'A banana is ___.'],
    ['black', '⚫', 'чёрный', 'černý', 'The colour of the night and panda ears.', 'Panda ears are ___.'],
    ['white', '⚪', 'белый', 'bílý', 'The colour of snow and milk.', 'Snow is ___.'],
    ['orange', '🟠', 'оранжевый', 'oranžový', 'A fruit and a colour have the same name.', 'Carrots are ___.'],
    ['pink', '🩷', 'розовый', 'růžový', 'The colour of cherry flowers in spring.', 'The flower is ___.'],
  ],
  family: [
    ['mother', '👩', 'мама', 'matka', 'She is your parent. She is a woman.', 'My ___ cooks rice for me.'],
    ['father', '👨', 'папа', 'otec', 'He is your parent. He is a man.', 'My ___ is very tall.'],
    ['sister', '👧', 'сестра', 'sestra', 'A girl with the same parents as you.', 'My ___ is ten years old.'],
    ['brother', '👦', 'брат', 'bratr', 'A boy with the same parents as you.', 'My little ___ likes cars.'],
    ['baby', '👶', 'малыш', 'miminko', 'A very small child. It cannot walk yet.', 'The ___ is sleeping.'],
    ['grandmother', '👵', 'бабушка', 'babička', "Your mother's mother.", 'My ___ tells me stories.'],
    ['grandfather', '👴', 'дедушка', 'dědeček', "Your father's father.", 'My ___ has a white beard.'],
    ['family', '👨‍👩‍👧', 'семья', 'rodina', 'Mother, father, sister, brother: all together.', 'I love my ___.'],
  ],
  animals: [
    ['cat', '🐱', 'кошка', 'kočka', 'I say "meow" and I like milk.', 'The ___ is sleeping on the bed.'],
    ['dog', '🐶', 'собака', 'pes', 'I say "woof" and I am your best friend.', 'My ___ likes to run.'],
    ['bird', '🐦', 'птица', 'pták', 'I have wings and I sing in the morning.', 'A ___ can fly.'],
    ['fish', '🐟', 'рыба', 'ryba', 'I live in water. I can swim, but I cannot walk.', 'The ___ swims in the river.'],
    ['panda', '🐼', 'панда', 'panda', 'I am black and white and I eat bamboo.', 'The ___ eats bamboo all day.'],
    ['monkey', '🐒', 'обезьяна', 'opice', 'I climb trees and I love bananas.', 'The ___ is in the tree.'],
    ['tiger', '🐯', 'тигр', 'tygr', 'A big orange cat with black stripes.', 'The ___ is very strong.'],
    ['frog', '🐸', 'лягушка', 'žába', 'I am green, I jump and I say "ribbit".', 'The ___ jumps into the pond.'],
  ],
  food: [
    ['apple', '🍎', 'яблоко', 'jablko', 'A red or green fruit. I grow on a tree.', 'I eat an ___ every day.'],
    ['banana', '🍌', 'банан', 'banán', 'A long yellow fruit. Monkeys love me.', 'The monkey eats a ___.'],
    ['rice', '🍚', 'рис', 'rýže', 'Small white grains. People eat me with chopsticks.', 'We eat ___ with chopsticks.'],
    ['bread', '🍞', 'хлеб', 'chléb', 'You make a sandwich with me.', 'I want ___ and butter.'],
    ['water', '💧', 'вода', 'voda', 'You drink me. Rivers and seas are full of me.', 'I drink ___ when I am thirsty.'],
    ['tea', '🍵', 'чай', 'čaj', 'A hot drink in a cup. Pandas drink me in the tea house.', 'Grandma makes green ___.'],
    ['milk', '🥛', 'молоко', 'mléko', 'A white drink from a cow.', 'The cat drinks ___.'],
    ['egg', '🥚', 'яйцо', 'vejce', 'A chicken gives me. I am white or brown.', 'I eat an ___ for breakfast.'],
  ],
  body: [
    ['head', '👤', 'голова', 'hlava', 'Your hat sits on me.', 'I wear a hat on my ___.'],
    ['eye', '👁️', 'глаз', 'oko', 'You see with me.', 'Close one ___ and look.'],
    ['ear', '👂', 'ухо', 'ucho', 'You hear with me.', 'A panda has a black ___.'],
    ['nose', '👃', 'нос', 'nos', 'You smell flowers with me.', 'My ___ is cold.'],
    ['mouth', '👄', 'рот', 'ústa', 'You eat and talk with me.', 'Open your ___, please.'],
    ['hand', '✋', 'рука', 'ruka', 'It has five fingers. You write with it.', 'Raise your ___!'],
    ['leg', '🦵', 'нога', 'noha', 'You walk and run with me.', 'My ___ hurts after the run.'],
    ['hair', '💇', 'волосы', 'vlasy', 'It grows on your head. You brush it.', 'Her ___ is long.'],
  ],
  nature: [
    ['tree', '🌳', 'дерево', 'strom', 'I am tall and green. Birds live in me.', 'A bird sits in the ___.'],
    ['flower', '🌸', 'цветок', 'květina', 'I am pretty and I smell nice. Bees visit me.', 'This ___ is pink.'],
    ['river', '🏞️', 'река', 'řeka', 'Water that runs to the sea.', 'Fish live in the ___.'],
    ['mountain', '⛰️', 'гора', 'hora', 'Very high land. Snow lives on my top.', 'We climb the ___.'],
    ['sun', '☀️', 'солнце', 'slunce', 'I am hot and bright in the sky in the day.', 'The ___ is hot today.'],
    ['moon', '🌙', 'луна', 'měsíc', 'I shine in the sky at night.', 'The ___ is round tonight.'],
    ['rain', '🌧️', 'дождь', 'déšť', 'Water that falls from clouds.', 'Take an umbrella, there is ___.'],
    ['snow', '❄️', 'снег', 'sníh', 'I am cold and white. I fall in winter.', 'Children play in the ___.'],
  ],
  home: [
    ['house', '🏠', 'дом', 'dům', 'People live in me.', 'My ___ has a red door.'],
    ['door', '🚪', 'дверь', 'dveře', 'You open me to go in.', 'Close the ___, please.'],
    ['window', '🪟', 'окно', 'okno', 'Glass in a wall. You look out of me.', 'Open the ___, it is hot.'],
    ['table', '🍽️', 'стол', 'stůl', 'You put plates and cups on me.', 'The cup is on the ___.'],
    ['chair', '🪑', 'стул', 'židle', 'You sit on me.', 'Sit on the ___, please.'],
    ['bed', '🛏️', 'кровать', 'postel', 'You sleep in me at night.', 'I go to ___ at nine.'],
    ['lamp', '💡', 'лампа', 'lampa', 'I give light in a dark room.', 'Turn on the ___, please.'],
    ['cup', '☕', 'чашка', 'hrnek', 'You drink tea from me.', 'A ___ of tea, please.'],
  ],
};

// Предложения для «Сборщика фраз»: [en, ru, cz]
export const SENTENCES = {
  greet: [
    ['Hello, my name is Mei.', 'Привет, меня зовут Мэй.', 'Ahoj, jmenuji se Mei.'],
    ['Thank you very much.', 'Большое спасибо.', 'Moc děkuji.'],
    ['Good night, see you tomorrow.', 'Спокойной ночи, увидимся завтра.', 'Dobrou noc, uvidíme se zítra.'],
  ],
  numbers: [
    ['I have two cats.', 'У меня две кошки.', 'Mám dvě kočky.'],
    ['A spider has eight legs.', 'У паука восемь ног.', 'Pavouk má osm nohou.'],
    ['She is ten years old.', 'Ей десять лет.', 'Je jí deset let.'],
  ],
  colors: [
    ['The lantern is red.', 'Фонарь красный.', 'Lucerna je červená.'],
    ['I like green tea.', 'Я люблю зелёный чай.', 'Mám rád zelený čaj.'],
    ['The sky is blue today.', 'Сегодня небо синее.', 'Dnes je nebe modré.'],
  ],
  family: [
    ['This is my mother.', 'Это моя мама.', 'To je moje maminka.'],
    ['My brother is tall.', 'Мой брат высокий.', 'Můj bratr je vysoký.'],
    ['I love my family.', 'Я люблю свою семью.', 'Miluji svou rodinu.'],
  ],
  animals: [
    ['The panda eats bamboo.', 'Панда ест бамбук.', 'Panda jí bambus.'],
    ['My dog can run fast.', 'Моя собака быстро бегает.', 'Můj pes umí rychle běhat.'],
    ['The frog is green.', 'Лягушка зелёная.', 'Žába je zelená.'],
  ],
  food: [
    ['I drink green tea.', 'Я пью зелёный чай.', 'Piju zelený čaj.'],
    ['The monkey eats a banana.', 'Обезьяна ест банан.', 'Opice jí banán.'],
    ['Can I have water, please?', 'Можно мне воды, пожалуйста?', 'Můžu dostat vodu, prosím?'],
  ],
  body: [
    ['I have two eyes.', 'У меня два глаза.', 'Mám dvě oči.'],
    ['Wash your hands, please.', 'Помой руки, пожалуйста.', 'Umyj si ruce, prosím.'],
    ['Her hair is long.', 'У неё длинные волосы.', 'Má dlouhé vlasy.'],
  ],
  nature: [
    ['The sun is hot today.', 'Сегодня солнце жаркое.', 'Slunce je dnes horké.'],
    ['Fish live in the river.', 'Рыбы живут в реке.', 'Ryby žijí v řece.'],
    ['Snow is white and cold.', 'Снег белый и холодный.', 'Sníh je bílý a studený.'],
  ],
  home: [
    ['The cup is on the table.', 'Чашка на столе.', 'Hrnek je na stole.'],
    ['Please close the door.', 'Пожалуйста, закрой дверь.', 'Zavři prosím dveře.'],
    ['My bed is in my room.', 'Моя кровать в моей комнате.', 'Moje postel je v mém pokoji.'],
  ],
};

// Глава каждой темы: 1 — «Весна · A1», 2 — «Лето · A2»
export const CHAPTER = {};
for (const th of Object.keys(THEMES)) CHAPTER[th] = 1;
for (const th of Object.keys(THEMES2)) CHAPTER[th] = 2;
Object.assign(THEMES, THEMES2);
Object.assign(SENTENCES, SENTENCES2);

// en — неизменный id слова (ключ прогресса). t, riddle, ex — на изучаемом языке (TARGET).
export const WORDS = {};
export const BY_THEME = {};
export const BY_TARGET = {};
const TI = { en: 0, ru: 1, cz: 2 };
for (const [theme, rows] of Object.entries(RAW)) {
  BY_THEME[theme] = rows.map(([en, emoji, ru, cz, riddle, ex]) => {
    const tr = RIDDLES[en];
    const w = { en, emoji, ru, cz, theme, cefr: 'A1',
      t: { en, ru, cz, hu: HU[en]?.[0] }[TARGET],
      riddle: TARGET === 'ru' ? tr[0] : TARGET === 'cz' ? tr[2] : TARGET === 'hu' ? null : riddle,
      ex: TARGET === 'ru' ? tr[1] : TARGET === 'cz' ? tr[3] : TARGET === 'hu' ? HU[en][1] : ex };
    BY_TARGET[w.t.toLowerCase()] = w;
    return (WORDS[en] = w);
  });
}
for (const [theme, rows] of Object.entries(RAW2)) {
  BY_THEME[theme] = rows.map(([en, emoji, ru, cz, rEn, exEn, rRu, exRu, rCz, exCz]) => {
    const w = { en, emoji, ru, cz, theme, cefr: 'A2',
      t: { en, ru, cz, hu: HU[en]?.[0] }[TARGET],
      riddle: { en: rEn, ru: rRu, cz: rCz }[TARGET] ?? null,
      ex: { en: exEn, ru: exRu, cz: exCz, hu: HU[en]?.[1] }[TARGET] };
    BY_TARGET[w.t.toLowerCase()] = w;
    return (WORDS[en] = w);
  });
}
// Глава 3 «Осень · B1» — грамматика английского, есть только при изучении английского.
// Глаголы становятся словами главы: t — первая форма, v2/v3 — прошедшее время и причастие. Id с префиксом «v:», чтобы не совпасть с A2.
export const CH3_OPEN = TARGET === 'en' || TARGET === 'cz';
if (TARGET === 'en') {
  const add = (theme, name, list) => {
    THEMES[theme] = name;
    CHAPTER[theme] = 3;
    BY_THEME[theme] = list.map(([v1, v2, v3, ru, cz, emoji]) => {
      const w = { en: 'v:' + v1, emoji, ru, cz, theme, cefr: 'B1', t: v1, v2, v3,
        riddle: `Past: ${v2.split('/')[0]} · Participle: ${v3}`, ex: `I want to ___ today.` };
      BY_TARGET[v1] ||= w;
      return (WORDS[w.en] = w);
    });
  };
  add('irr1', { ru: 'Неправильные глаголы I', cz: 'Nepravidelná slovesa I', en: 'Irregular verbs I' }, IRREGULAR.slice(0, 23));
  add('irr2', { ru: 'Неправильные глаголы II', cz: 'Nepravidelná slovesa II', en: 'Irregular verbs II' }, IRREGULAR.slice(23));
  add('reg', { ru: 'Правильные глаголы', cz: 'Pravidelná slovesa', en: 'Regular verbs' }, REGULAR.map(([v, ru, cz, e]) => [v, pastRegular(v), pastRegular(v), ru, cz, e]));
}
// Чешская глава 3: t — инфинитив, v2 — прошедшее время (on), v3 — настоящее время (já)
if (TARGET === 'cz') {
  const add = (theme, name, list) => {
    THEMES[theme] = name;
    CHAPTER[theme] = 3;
    BY_THEME[theme] = list.map(([v1, v2, v3, ru, uk, emoji]) => {
      const w = { en: 'v:' + v1, emoji, ru, uk, cz: v1, theme, cefr: 'B1', t: v1, v2, v3,
        riddle: `Minulý čas: ${v2} · já: ${v3}`, ex: 'Dnes chci ___.' };
      BY_TARGET[v1] ||= w;
      return (WORDS[w.en] = w);
    });
  };
  add('irr1', { ru: 'Глаголы с особыми формами I', uk: 'Дієслова з особливими формами I', cz: 'Slovesa I', en: 'Czech verbs I' }, CZ3.IRREGULAR.slice(0, 22));
  add('irr2', { ru: 'Глаголы с особыми формами II', uk: 'Дієслова з особливими формами II', cz: 'Slovesa II', en: 'Czech verbs II' }, CZ3.IRREGULAR.slice(22));
  add('reg', { ru: 'Глаголы на -at', uk: 'Дієслова на -at', cz: 'Slovesa na -at', en: 'Verbs in -at' },
    CZ3.REGULAR.map(([v, ru, uk, e]) => [v, CZ3.pastRegular(v), CZ3.presentRegular(v), ru, uk, e]));
}
// Глава 4 «Зима · B2»: у английского — темы грамматики B2; у чешского ещё и слова:
// глаголы-пары видов, существительные с падежами, трудные буквы, se / si, официальная речь
export const CH4_OPEN = TARGET === 'cz' || TARGET === 'en';
if (TARGET === 'cz') {
  const add = (theme, name, list) => {
    THEMES[theme] = name;
    CHAPTER[theme] = 4;
    BY_THEME[theme] = list.map((w) => {
      Object.assign(w, { theme, cefr: 'B2', riddle: null, cz: w.t });
      BY_TARGET[w.t.toLowerCase()] ||= w;
      return (WORDS[w.en] = w);
    });
  };
  add('aspect', { ru: 'Виды глагола', uk: 'Види дієслова', cz: 'Vid sloves', en: 'Verb aspect' },
    CZ4.ASPECT.map(([a, b, ru, uk, emoji]) => ({ en: 'a:' + a, t: a, v2: b, ru, uk, emoji, ex: '___ → ' + b })));
  add('nouns', { ru: 'Семь падежей', uk: 'Сім відмінків', cz: 'Sedm pádů', en: 'Seven cases' },
    CZ4.NOUNS.map(([forms, ru, uk, emoji]) => ({ en: 'n:' + forms[0], t: forms[0], forms, ru, uk, emoji, ex: 'To je ___.' })));
  add('spell', { ru: 'Буквы ř, ě, ů, ú', uk: 'Літери ř, ě, ů, ú', cz: 'Písmena ř, ě, ů, ú', en: 'Czech letters' },
    CZ4.SPELL.map(([t, ru, uk, emoji]) => ({ en: 'sp:' + t, t, ru, uk, emoji, ex: '___' })));
  add('refl', { ru: 'Возвратные se / si', uk: 'Зворотні se / si', cz: 'Zvratná slovesa', en: 'Reflexive verbs' },
    CZ4.REFL.map(([t, ru, uk, emoji]) => ({ en: 'r:' + t, t, ru, uk, emoji, ex: '___' })));
  add('office', { ru: 'Официальная речь', uk: 'Офіційне мовлення', cz: 'Úřední čeština', en: 'Formal Czech' },
    CZ4.OFFICE.map(([t, ru, uk, emoji]) => ({ en: 'o:' + t, t, ru, uk, emoji, ex: 'To je ___.' })));
}
// Понятнее картинки: эмодзи, которые сами по себе не читались (банк, школа, «большой» = слон)
const EMOJI = {
  goodbye: '👋🚪', 'good night': '🌙😴', 'thank you': '🎁🙏', sorry: '🙇', sunny: '🌞', warm: '🌡️🙂',
  today: '📅👇', tomorrow: '📅➡️', week: '🗓️', hour: '🕐', school: '🏫🎒', shop: '🏪🛒', park: '🌳⛲',
  street: '🏘️🚦', bank: '🏦💰', hospital: '🏥🚑', market: '🧺🍎', fast: '🐆💨', new: '✨🎁', old: '🏚️',
  driver: '🚕🧑', nurse: '👩‍⚕️💉',
};
// Слова, которые по одной картинке не угадать: рядом с картинкой всегда показываем значение на родном языке
const VAGUE = new Set(['thank you', 'sorry', 'please', 'head', 'table', 'warm', 'sunny', 'today', 'tomorrow', 'week', 'hour', 'minute',
  'evening', 'night', 'morning', 'big', 'small', 'fast', 'slow', 'new', 'old', 'driver', 'nurse', 'cook', 'farmer', 'game', 'street',
  'bank', 'hospital', 'school', 'shop', 'market', 'park', 'road', 'family', 'baby', 'hair', 'cup', 'happy', 'sad', 'hot', 'cold']);
for (const w of Object.values(WORDS)) {
  if (EMOJI[w.en]) w.emoji = EMOJI[w.en];
  if (VAGUE.has(w.en) || w.en.startsWith('v:') || ['verbs', 'aspect', 'refl', 'office'].includes(w.theme)) w.vague = true;
}
export const themesOf = (ch) => Object.keys(THEMES).filter((th) => CHAPTER[th] === ch);
// Предложение темы: [на изучаемом языке, на родном]
// Венгерский берём из HU_SENT, украинский — из UK по русскому тексту
const inLang = (s, l) => (l === 'hu' ? HU_SENT[s[0]] : l === 'uk' ? s[3] ?? UK[s[1]] ?? s[1] : s[TI[l]]);
export const sentence = (s, native) => [inLang(s, TARGET), inLang(s, native)];
