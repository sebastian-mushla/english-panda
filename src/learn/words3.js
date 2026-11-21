// Глава 3 «Осень · B1»: грамматика английского. Только для изучающих английский.
// Переводы — на родной язык ученика (ru / cz).

// Неправильные глаголы: [V1, V2, V3, ru, cz, emoji]
export const IRREGULAR = [
  ['be', 'was/were', 'been', 'быть', 'být', '🧍'], ['go', 'went', 'gone', 'идти', 'jít', '🚶'], ['see', 'saw', 'seen', 'видеть', 'vidět', '👀'],
  ['eat', 'ate', 'eaten', 'есть', 'jíst', '🍴'], ['drink', 'drank', 'drunk', 'пить', 'pít', '🥤'], ['write', 'wrote', 'written', 'писать', 'psát', '✍️'],
  ['read', 'read', 'read', 'читать', 'číst', '📖'], ['take', 'took', 'taken', 'брать', 'vzít', '🤲'], ['give', 'gave', 'given', 'давать', 'dát', '🎁'],
  ['come', 'came', 'come', 'приходить', 'přijít', '🏃'], ['buy', 'bought', 'bought', 'покупать', 'koupit', '🛍️'], ['make', 'made', 'made', 'делать', 'udělat', '🛠️'],
  ['know', 'knew', 'known', 'знать', 'vědět', '🧠'], ['think', 'thought', 'thought', 'думать', 'myslet', '💭'], ['find', 'found', 'found', 'находить', 'najít', '🔍'],
  ['tell', 'told', 'told', 'рассказывать', 'říct', '🗣️'], ['speak', 'spoke', 'spoken', 'говорить', 'mluvit', '💬'], ['swim', 'swam', 'swum', 'плавать', 'plavat', '🏊'],
  ['run', 'ran', 'run', 'бегать', 'běhat', '🏃'], ['sleep', 'slept', 'slept', 'спать', 'spát', '😴'], ['sing', 'sang', 'sung', 'петь', 'zpívat', '🎤'],
  ['begin', 'began', 'begun', 'начинать', 'začít', '🏁'], ['break', 'broke', 'broken', 'ломать', 'rozbít', '💔'], ['bring', 'brought', 'brought', 'приносить', 'přinést', '📦'],
  ['build', 'built', 'built', 'строить', 'stavět', '🏗️'], ['choose', 'chose', 'chosen', 'выбирать', 'vybrat', '☝️'], ['drive', 'drove', 'driven', 'водить', 'řídit', '🚗'],
  ['fall', 'fell', 'fallen', 'падать', 'padat', '🍂'], ['feel', 'felt', 'felt', 'чувствовать', 'cítit', '❤️'], ['fly', 'flew', 'flown', 'летать', 'létat', '🕊️'],
  ['forget', 'forgot', 'forgotten', 'забывать', 'zapomenout', '❓'], ['get', 'got', 'got', 'получать', 'dostat', '📬'], ['have', 'had', 'had', 'иметь', 'mít', '🎒'],
  ['hear', 'heard', 'heard', 'слышать', 'slyšet', '👂'], ['leave', 'left', 'left', 'уходить', 'odejít', '🚪'], ['lose', 'lost', 'lost', 'терять', 'ztratit', '🔎'],
  ['meet', 'met', 'met', 'встречать', 'potkat', '🤝'], ['pay', 'paid', 'paid', 'платить', 'platit', '💳'], ['send', 'sent', 'sent', 'отправлять', 'poslat', '📨'],
  ['sit', 'sat', 'sat', 'сидеть', 'sedět', '🪑'], ['stand', 'stood', 'stood', 'стоять', 'stát', '🧍'], ['teach', 'taught', 'taught', 'учить', 'učit', '👩‍🏫'],
  ['understand', 'understood', 'understood', 'понимать', 'rozumět', '💡'], ['wear', 'wore', 'worn', 'носить', 'nosit', '🧥'], ['win', 'won', 'won', 'побеждать', 'vyhrát', '🏆'],
];

// Правильные глаголы: [V1, ru, cz, emoji] — прошедшее время по правилу -ed
export const REGULAR = [
  ['play', 'играть', 'hrát', '⚽'], ['work', 'работать', 'pracovat', '💼'], ['watch', 'смотреть', 'dívat se', '📺'], ['listen', 'слушать', 'poslouchat', '🎧'],
  ['cook', 'готовить', 'vařit', '🍳'], ['clean', 'убирать', 'uklízet', '🧹'], ['walk', 'гулять', 'chodit', '🚶'], ['visit', 'навещать', 'navštívit', '🏠'],
  ['help', 'помогать', 'pomáhat', '🤲'], ['open', 'открывать', 'otevřít', '📂'], ['close', 'закрывать', 'zavřít', '🔒'], ['want', 'хотеть', 'chtít', '🙏'],
  ['live', 'жить', 'bydlet', '🏡'], ['like', 'нравиться', 'mít rád', '👍'], ['stop', 'останавливаться', 'zastavit', '🛑'], ['study', 'учиться', 'studovat', '📚'],
  ['travel', 'путешествовать', 'cestovat', '🧳'], ['arrive', 'прибывать', 'přijet', '🛬'], ['wait', 'ждать', 'čekat', '⏳'], ['answer', 'отвечать', 'odpovědět', '✅'],
];

// Правило -ed: stop → stopped, study → studied, live → lived, travel → travelled
export function pastRegular(v) {
  if (/e$/.test(v)) return v + 'd';
  if (/[^aeiou]y$/.test(v)) return v.slice(0, -1) + 'ied';
  if (v === 'travel') return 'travelled';
  if (/^[^aeiou]*[aeiou][^aeiouwxy]$/.test(v)) return v + v.slice(-1) + 'ed';
  return v + 'ed';
}

// Грамматика: предложение с пропуском, подсказка-основа (base), правильный ответ, перевод
// kind: present | past | future | article | prep | compare
export const GRAMMAR = [
  // Present Simple: he/she/it + -s
  { kind: 'present', s: 'She ___ to school every day.', base: 'go', a: 'goes', ru: 'Она каждый день ходит в школу.', cz: 'Každý den chodí do školy.' },
  { kind: 'present', s: 'My brother ___ football on Sundays.', base: 'play', a: 'plays', ru: 'Мой брат играет в футбол по воскресеньям.', cz: 'Můj bratr hraje v neděli fotbal.' },
  { kind: 'present', s: 'They ___ in a big house.', base: 'live', a: 'live', ru: 'Они живут в большом доме.', cz: 'Bydlí ve velkém domě.' },
  { kind: 'present', s: 'He ___ his homework after dinner.', base: 'do', a: 'does', ru: 'Он делает уроки после ужина.', cz: 'Dělá úkoly po večeři.' },
  { kind: 'present', s: 'The shop ___ at nine o\'clock.', base: 'open', a: 'opens', ru: 'Магазин открывается в девять.', cz: 'Obchod otevírá v devět.' },
  { kind: 'present', s: 'My mother ___ TV in the evening.', base: 'watch', a: 'watches', ru: 'Мама смотрит телевизор вечером.', cz: 'Máma se večer dívá na televizi.' },
  { kind: 'present', s: 'I ___ coffee in the morning.', base: 'drink', a: 'drink', ru: 'Я пью кофе утром.', cz: 'Ráno piju kávu.' },
  { kind: 'present', s: 'The baby ___ a lot.', base: 'cry', a: 'cries', ru: 'Малыш много плачет.', cz: 'Miminko hodně pláče.' },
  { kind: 'present', s: '___ you like tea?', base: 'do', a: 'Do', ru: 'Ты любишь чай?', cz: 'Máš rád čaj?' },
  { kind: 'present', s: 'She doesn\'t ___ meat.', base: 'eat', a: 'eat', ru: 'Она не ест мясо.', cz: 'Nejí maso.' },
  // Past Simple
  { kind: 'past', s: 'Yesterday I ___ to the park.', base: 'go', a: 'went', ru: 'Вчера я ходил в парк.', cz: 'Včera jsem šel do parku.' },
  { kind: 'past', s: 'We ___ a film last night.', base: 'watch', a: 'watched', ru: 'Вчера вечером мы смотрели фильм.', cz: 'Včera večer jsme se dívali na film.' },
  { kind: 'past', s: 'She ___ me a letter.', base: 'write', a: 'wrote', ru: 'Она написала мне письмо.', cz: 'Napsala mi dopis.' },
  { kind: 'past', s: 'They ___ to Prague in 2020.', base: 'travel', a: 'travelled', ru: 'Они ездили в Прагу в 2020 году.', cz: 'V roce 2020 cestovali do Prahy.' },
  { kind: 'past', s: 'I ___ a new bike last week.', base: 'buy', a: 'bought', ru: 'На прошлой неделе я купил новый велосипед.', cz: 'Minulý týden jsem si koupil nové kolo.' },
  { kind: 'past', s: 'The bus ___ at the station.', base: 'stop', a: 'stopped', ru: 'Автобус остановился у вокзала.', cz: 'Autobus zastavil na nádraží.' },
  { kind: 'past', s: 'He ___ his keys yesterday.', base: 'lose', a: 'lost', ru: 'Вчера он потерял ключи.', cz: 'Včera ztratil klíče.' },
  { kind: 'past', s: 'We ___ English at school.', base: 'study', a: 'studied', ru: 'Мы учили английский в школе.', cz: 'Ve škole jsme studovali angličtinu.' },
  { kind: 'past', s: 'Did you ___ my message?', base: 'get', a: 'get', ru: 'Ты получил моё сообщение?', cz: 'Dostal jsi mou zprávu?' },
  { kind: 'past', s: 'I ___ my friend at the station.', base: 'meet', a: 'met', ru: 'Я встретил друга на вокзале.', cz: 'Potkal jsem kamaráda na nádraží.' },
  // Future: will / going to
  { kind: 'future', s: 'Tomorrow it ___ rain.', base: 'will', a: 'will', ru: 'Завтра будет дождь.', cz: 'Zítra bude pršet.' },
  { kind: 'future', s: 'I am ___ to visit my grandma.', base: 'go', a: 'going', ru: 'Я собираюсь навестить бабушку.', cz: 'Chystám se navštívit babičku.' },
  { kind: 'future', s: 'She will ___ you tomorrow.', base: 'call', a: 'call', ru: 'Она позвонит тебе завтра.', cz: 'Zítra ti zavolá.' },
  { kind: 'future', s: 'We ___ going to travel in summer.', base: 'be', a: 'are', ru: 'Летом мы собираемся путешествовать.', cz: 'V létě budeme cestovat.' },
  { kind: 'future', s: 'I think he ___ win.', base: 'will', a: 'will', ru: 'Думаю, он победит.', cz: 'Myslím, že vyhraje.' },
  { kind: 'future', s: 'They won\'t ___ late.', base: 'be', a: 'be', ru: 'Они не опоздают.', cz: 'Nepřijdou pozdě.' },
  // Артикли и предлоги
  { kind: 'article', s: 'I have ___ apple.', base: 'a/an', a: 'an', ru: 'У меня есть яблоко.', cz: 'Mám jablko.' },
  { kind: 'article', s: 'She is ___ teacher.', base: 'a/an', a: 'a', ru: 'Она учитель.', cz: 'Je učitelka.' },
  { kind: 'article', s: '___ sun is very hot today.', base: 'a/the', a: 'The', ru: 'Солнце сегодня очень жаркое.', cz: 'Slunce dnes hodně pálí.' },
  { kind: 'article', s: 'I saw ___ elephant at the zoo.', base: 'a/an', a: 'an', ru: 'Я видел слона в зоопарке.', cz: 'V zoo jsem viděl slona.' },
  { kind: 'article', s: 'Can you close ___ door, please?', base: 'a/the', a: 'the', ru: 'Закрой, пожалуйста, дверь.', cz: 'Můžeš prosím zavřít dveře?' },
  { kind: 'prep', s: 'The cat is ___ the table.', base: 'in/on/at', a: 'on', ru: 'Кошка на столе.', cz: 'Kočka je na stole.' },
  { kind: 'prep', s: 'I was born ___ May.', base: 'in/on/at', a: 'in', ru: 'Я родился в мае.', cz: 'Narodil jsem se v květnu.' },
  { kind: 'prep', s: 'The lesson starts ___ eight o\'clock.', base: 'in/on/at', a: 'at', ru: 'Урок начинается в восемь.', cz: 'Hodina začíná v osm.' },
  { kind: 'prep', s: 'We meet ___ Monday.', base: 'in/on/at', a: 'on', ru: 'Встречаемся в понедельник.', cz: 'Sejdeme se v pondělí.' },
  { kind: 'prep', s: 'My keys are ___ my bag.', base: 'in/on/at', a: 'in', ru: 'Мои ключи в сумке.', cz: 'Klíče mám v tašce.' },
  { kind: 'prep', s: 'She is waiting ___ the bus stop.', base: 'in/on/at', a: 'at', ru: 'Она ждёт на остановке.', cz: 'Čeká na zastávce.' },
  // Степени сравнения
  { kind: 'compare', s: 'An elephant is ___ than a dog.', base: 'big', a: 'bigger', ru: 'Слон больше собаки.', cz: 'Slon je větší než pes.' },
  { kind: 'compare', s: 'This is the ___ day of the year.', base: 'hot', a: 'hottest', ru: 'Это самый жаркий день в году.', cz: 'To je nejteplejší den v roce.' },
  { kind: 'compare', s: 'My bag is ___ than yours.', base: 'heavy', a: 'heavier', ru: 'Моя сумка тяжелее твоей.', cz: 'Moje taška je těžší než tvoje.' },
  { kind: 'compare', s: 'She is the ___ student in the class.', base: 'good', a: 'best', ru: 'Она лучшая ученица в классе.', cz: 'Je nejlepší studentka ve třídě.' },
  { kind: 'compare', s: 'Today is ___ than yesterday.', base: 'bad', a: 'worse', ru: 'Сегодня хуже, чем вчера.', cz: 'Dnes je hůř než včera.' },
  { kind: 'compare', s: 'A train is ___ than a bus.', base: 'fast', a: 'faster', ru: 'Поезд быстрее автобуса.', cz: 'Vlak je rychlejší než autobus.' },
  { kind: 'compare', s: 'This film is ___ interesting than the book.', base: 'more/most', a: 'more', ru: 'Этот фильм интереснее книги.', cz: 'Tenhle film je zajímavější než kniha.' },
];

// Длинные предложения B1 для «Сборщика фраз»: [en, ru, cz]
export const LONG = [
  ['Yesterday I went to the market and bought some fresh fruit.', 'Вчера я сходил на рынок и купил свежих фруктов.', 'Včera jsem šel na trh a koupil čerstvé ovoce.'],
  ['If it rains tomorrow, we will stay at home and watch a film.', 'Если завтра будет дождь, мы останемся дома и посмотрим фильм.', 'Jestli zítra bude pršet, zůstaneme doma a podíváme se na film.'],
  ['My sister is older than me, but I am taller than her.', 'Моя сестра старше меня, но я выше неё.', 'Moje sestra je starší než já, ale já jsem vyšší než ona.'],
  ['We are going to visit our grandparents next weekend.', 'В следующие выходные мы собираемся навестить бабушку и дедушку.', 'Příští víkend se chystáme navštívit prarodiče.'],
  ['I have never seen such a beautiful lake before.', 'Я никогда раньше не видел такого красивого озера.', 'Nikdy předtím jsem neviděl tak krásné jezero.'],
  ['Could you tell me where the nearest bus stop is?', 'Не подскажете, где ближайшая остановка?', 'Mohl byste mi říct, kde je nejbližší zastávka?'],
  ['She usually drinks green tea because she does not like coffee.', 'Она обычно пьёт зелёный чай, потому что не любит кофе.', 'Obvykle pije zelený čaj, protože nemá ráda kávu.'],
  ['When I was a child, I lived in a small village near the mountains.', 'Когда я был ребёнком, я жил в маленькой деревне у гор.', 'Když jsem byl dítě, bydlel jsem v malé vesnici u hor.'],
  ['I would like to book a room for two nights, please.', 'Я бы хотел забронировать номер на две ночи.', 'Chtěl bych si rezervovat pokoj na dvě noci, prosím.'],
  ['Thank you for your email, I will answer you tomorrow.', 'Спасибо за письмо, я отвечу тебе завтра.', 'Děkuji za e-mail, odpovím ti zítra.'],
  ['He was tired, so he went to bed early.', 'Он устал, поэтому рано лёг спать.', 'Byl unavený, tak šel brzy spát.'],
  ['The museum is closed on Mondays, but it is open every other day.', 'Музей закрыт по понедельникам, но открыт во все остальные дни.', 'Muzeum je v pondělí zavřené, ale ostatní dny je otevřené.'],
];

// Письма: ситуация и части письма; в каждой части одна правильная фраза для этого стиля
export const EMAILS = [
  {
    task: { ru: 'Напиши другу Тому: поблагодари за подарок и позови в гости в субботу.', cz: 'Napiš kamarádovi Tomovi: poděkuj za dárek a pozvi ho v sobotu na návštěvu.' },
    to: 'tom@mail.com', subject: 'Thank you!',
    parts: [
      { label: { ru: 'Приветствие', cz: 'Oslovení' }, ok: 'Hi Tom,', bad: ['Dear Sir or Madam,', 'To whom it may concern,'] },
      { label: { ru: 'Благодарность', cz: 'Poděkování' }, ok: 'Thank you so much for the great birthday present!', bad: ['I am writing to complain about your service.', 'Please find the invoice attached.'] },
      { label: { ru: 'Приглашение', cz: 'Pozvání' }, ok: 'Would you like to come to my place on Saturday?', bad: ['I would like to cancel my order.', 'The meeting is postponed until further notice.'] },
      { label: { ru: 'Завершение', cz: 'Závěr' }, ok: 'Let me know! Hope to see you soon.', bad: ['I look forward to your reply regarding the refund.', 'Kind regards from the management.'] },
      { label: { ru: 'Подпись', cz: 'Podpis' }, ok: 'Best wishes, Mei', bad: ['Yours faithfully, Customer Service', 'Sincerely, the Hotel'] },
    ],
  },
  {
    task: { ru: 'Напиши в отель: хочешь забронировать номер на две ночи и спрашиваешь про завтрак.', cz: 'Napiš do hotelu: chceš rezervovat pokoj na dvě noci a ptáš se na snídani.' },
    to: 'info@lotushotel.com', subject: 'Room booking',
    parts: [
      { label: { ru: 'Приветствие', cz: 'Oslovení' }, ok: 'Dear Sir or Madam,', bad: ['Hey guys!', 'Hi bro,'] },
      { label: { ru: 'Цель письма', cz: 'Účel dopisu' }, ok: 'I would like to book a double room for two nights from 12 to 14 October.', bad: ['What\'s up? Long time no see!', 'Thanks for the cool party yesterday.'] },
      { label: { ru: 'Вопрос', cz: 'Dotaz' }, ok: 'Could you tell me if breakfast is included in the price?', bad: ['Do you want to play football later?', 'Give me breakfast now.'] },
      { label: { ru: 'Завершение', cz: 'Závěr' }, ok: 'I look forward to hearing from you.', bad: ['See ya!', 'Bye bye, love you!'] },
      { label: { ru: 'Подпись', cz: 'Podpis' }, ok: 'Yours faithfully, Mei Chen', bad: ['XOXO, Mei', 'Cheers mate'] },
    ],
  },
  {
    task: { ru: 'Напиши учителю: ты заболел и завтра не придёшь, спроси про домашнее задание.', cz: 'Napiš učiteli: jsi nemocný, zítra nepřijdeš, zeptej se na domácí úkol.' },
    to: 'mr.li@school.com', subject: 'Absence tomorrow',
    parts: [
      { label: { ru: 'Приветствие', cz: 'Oslovení' }, ok: 'Dear Mr Li,', bad: ['Yo teacher!', 'Hi sweetie,'] },
      { label: { ru: 'Причина', cz: 'Důvod' }, ok: 'I am sorry, but I am ill and I cannot come to school tomorrow.', bad: ['I won the lottery and I am rich now.', 'Your lesson was boring.'] },
      { label: { ru: 'Вопрос', cz: 'Dotaz' }, ok: 'Could you please tell me what the homework is?', bad: ['Can you do my homework for me?', 'Where is the party tonight?'] },
      { label: { ru: 'Завершение', cz: 'Závěr' }, ok: 'Thank you for your understanding.', bad: ['Whatever.', 'Don\'t write back.'] },
      { label: { ru: 'Подпись', cz: 'Podpis' }, ok: 'Kind regards, Mei', bad: ['Love and kisses, Mei', 'Your boss'] },
    ],
  },
];

// Чат-квесты: шаги диалога в мессенджере. type: 'pick' (выбрать ответ) или 'type' (вписать слово в ответ)
export const CHATS = [
  {
    title: { ru: 'Отель «Лотос»', cz: 'Hotel Lotos' }, who: 'Reception 🏨',
    steps: [
      { npc: 'Good evening! Welcome to the Lotus Hotel. How can I help you?', type: 'pick', ok: 'Hello, I have a reservation for two nights.', bad: ['I am a cat.', 'Where is the beach? Bye.'] },
      { npc: 'Of course. What is your name, please?', type: 'type', tpl: 'My ___ is Mei Chen.', a: 'name' },
      { npc: 'Thank you. Your room is on the third floor. Do you need help with your bags?', type: 'pick', ok: 'Yes, please. They are very heavy.', bad: ['No, I am a pilot.', 'Yesterday I went to school.'] },
      { npc: 'Breakfast is from 7 to 10. Would you like a wake-up call?', type: 'type', tpl: 'Yes, please, ___ 7 o\'clock.', a: 'at' },
      { npc: 'Perfect. Here is your key. Enjoy your stay!', type: 'pick', ok: 'Thank you very much!', bad: ['I don\'t like keys.', 'Go away.'] },
    ],
  },
  {
    title: { ru: 'Кафе «Бамбук»', cz: 'Kavárna Bambus' }, who: 'Bamboo Café ☕',
    steps: [
      { npc: 'Hi! Are you ready to order?', type: 'pick', ok: 'Yes, I would like a green tea, please.', bad: ['I am ready to sleep.', 'No, I hate cafés.'] },
      { npc: 'Small or large?', type: 'type', tpl: 'A ___ one, please. I am very thirsty.', a: 'large' },
      { npc: 'Anything to eat? We have fresh cakes today.', type: 'pick', ok: 'What kind of cakes do you have?', bad: ['I have a cat.', 'Cakes are blue.'] },
      { npc: 'Chocolate and apple. The apple cake is our best.', type: 'type', tpl: 'Then I will ___ the apple cake.', a: 'take' },
      { npc: 'That\'s 6 coins, please.', type: 'pick', ok: 'Here you are. Can I pay by card?', bad: ['No, thanks, goodbye.', 'I paid yesterday.'] },
    ],
  },
  {
    title: { ru: 'Собеседование', cz: 'Pohovor' }, who: 'Panda Tours 💼',
    steps: [
      { npc: 'Hello! Thank you for coming. Can you tell me about yourself?', type: 'pick', ok: 'Of course. My name is Mei and I love travelling.', bad: ['No, I can\'t.', 'I am a big elephant.'] },
      { npc: 'Why do you want to work as a tour guide?', type: 'type', tpl: 'Because I ___ meeting new people.', a: 'like' },
      { npc: 'Which languages do you speak?', type: 'pick', ok: 'I speak English, Czech and a little Russian.', bad: ['I speak with my mouth.', 'I don\'t like questions.'] },
      { npc: 'Have you ever worked with tourists before?', type: 'type', tpl: 'Yes, last summer I ___ in a hotel.', a: 'worked' },
      { npc: 'Great! When can you start?', type: 'pick', ok: 'I can start next Monday.', bad: ['Yesterday.', 'Never.'] },
    ],
  },
];

// Пробный тест B1: чтение с вопросами
export const READING = {
  text: 'Last summer Mei travelled to a small village in the mountains. She stayed with her grandparents for three weeks. Every morning she helped her grandmother in the garden, and in the afternoon she went swimming in the lake. One day it rained all day, so she stayed at home and read a long book about dragons. Before she left, her grandfather gave her a small wooden panda. Mei says it was the best summer of her life, and she is going to visit them again next year.',
  q: [
    { q: 'Where did Mei go last summer?', ok: 'To a village in the mountains.', bad: ['To a big city.', 'To the sea.'] },
    { q: 'How long did she stay there?', ok: 'Three weeks.', bad: ['Three days.', 'Three months.'] },
    { q: 'What did she do when it rained?', ok: 'She read a book.', bad: ['She went swimming.', 'She worked in the garden.'] },
    { q: 'What did her grandfather give her?', ok: 'A wooden panda.', bad: ['A book about dragons.', 'A new bike.'] },
    { q: 'What is she going to do next year?', ok: 'Visit her grandparents again.', bad: ['Buy a house in the mountains.', 'Stay at home.'] },
  ],
};
