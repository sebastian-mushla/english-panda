// Глава 3 «Осень · B1» для изучающих чешский: глаголы, падежи, времена, письма, чат и пробный тест.
// Переводы — на родной язык ученика (ru / uk). Формат совпадает с words3.js, чтобы игры работали без изменений.

// Глаголы с особыми формами: [инфинитив, прошедшее (on), настоящее (já), ru, uk, emoji]
export const IRREGULAR = [
  ['být', 'byl', 'jsem', 'быть', 'бути', '🧍'], ['jít', 'šel', 'jdu', 'идти', 'йти', '🚶'], ['mít', 'měl', 'mám', 'иметь', 'мати', '🎒'],
  ['jíst', 'jedl', 'jím', 'есть', 'їсти', '🍴'], ['pít', 'pil', 'piju', 'пить', 'пити', '🥤'], ['psát', 'psal', 'píšu', 'писать', 'писати', '✍️'],
  ['číst', 'četl', 'čtu', 'читать', 'читати', '📖'], ['vzít', 'vzal', 'vezmu', 'взять', 'взяти', '🤲'], ['dát', 'dal', 'dám', 'дать', 'дати', '🎁'],
  ['přijít', 'přišel', 'přijdu', 'прийти', 'прийти', '🚪'], ['koupit', 'koupil', 'koupím', 'купить', 'купити', '🛍️'], ['vědět', 'věděl', 'vím', 'знать', 'знати', '🧠'],
  ['najít', 'našel', 'najdu', 'найти', 'знайти', '🔍'], ['říct', 'řekl', 'řeknu', 'сказать', 'сказати', '🗣️'], ['spát', 'spal', 'spím', 'спать', 'спати', '😴'],
  ['chtít', 'chtěl', 'chci', 'хотеть', 'хотіти', '🙏'], ['moct', 'mohl', 'můžu', 'мочь', 'могти', '💪'], ['jet', 'jel', 'jedu', 'ехать', 'їхати', '🚗'],
  ['vidět', 'viděl', 'vidím', 'видеть', 'бачити', '👀'], ['brát', 'bral', 'beru', 'брать', 'брати', '🧺'], ['nést', 'nesl', 'nesu', 'нести', 'нести', '📦'],
  ['umět', 'uměl', 'umím', 'уметь', 'вміти', '🎓'],
  ['začít', 'začal', 'začnu', 'начать', 'почати', '🏁'], ['zavřít', 'zavřel', 'zavřu', 'закрыть', 'зачинити', '🔒'], ['otevřít', 'otevřel', 'otevřu', 'открыть', 'відчинити', '📂'],
  ['plavat', 'plaval', 'plavu', 'плавать', 'плавати', '🏊'], ['spadnout', 'spadl', 'spadnu', 'упасть', 'впасти', '🍂'], ['zapomenout', 'zapomněl', 'zapomenu', 'забыть', 'забути', '❓'],
  ['poslat', 'poslal', 'pošlu', 'отправить', 'надіслати', '📨'], ['sedět', 'seděl', 'sedím', 'сидеть', 'сидіти', '🪑'], ['stát', 'stál', 'stojím', 'стоять', 'стояти', '🧍‍♂️'],
  ['rozumět', 'rozuměl', 'rozumím', 'понимать', 'розуміти', '💡'], ['nosit', 'nosil', 'nosím', 'носить', 'носити', '🧥'], ['vyhrát', 'vyhrál', 'vyhraju', 'победить', 'перемогти', '🏆'],
  ['pomoct', 'pomohl', 'pomůžu', 'помочь', 'допомогти', '🤝'], ['růst', 'rostl', 'rostu', 'расти', 'рости', '🌱'], ['péct', 'pekl', 'peču', 'печь', 'пекти', '🥧'],
  ['mýt', 'myl', 'myju', 'мыть', 'мити', '🧼'], ['žít', 'žil', 'žiju', 'жить', 'жити', '🏡'], ['běžet', 'běžel', 'běžím', 'бежать', 'бігти', '🏃'],
  ['ležet', 'ležel', 'ležím', 'лежать', 'лежати', '🛌'], ['hrát', 'hrál', 'hraju', 'играть', 'грати', '⚽'], ['pracovat', 'pracoval', 'pracuju', 'работать', 'працювати', '💼'],
  ['kupovat', 'kupoval', 'kupuju', 'покупать', 'купувати', '🛒'],
];

// Правильные глаголы на -at (dělat → dělal → dělám): [инфинитив, ru, uk, emoji]
export const REGULAR = [
  ['dělat', 'делать', 'робити', '🛠️'], ['čekat', 'ждать', 'чекати', '⏳'], ['hledat', 'искать', 'шукати', '🔎'], ['poslouchat', 'слушать', 'слухати', '🎧'],
  ['odpovídat', 'отвечать', 'відповідати', '✅'], ['znát', 'знать (кого-то)', 'знати (когось)', '🤝'], ['volat', 'звонить', 'дзвонити', '📞'],
  ['snídat', 'завтракать', 'снідати', '🥐'], ['obědvat', 'обедать', 'обідати', '🍲'], ['zpívat', 'петь', 'співати', '🎤'], ['potkat', 'встретить', 'зустріти', '👋'],
  ['vstávat', 'вставать', 'вставати', '⏰'], ['mávat', 'махать', 'махати', '🙋'], ['létat', 'летать', 'літати', '🕊️'], ['chytat', 'ловить', 'ловити', '🎣'],
  ['zavírat', 'закрывать', 'закривати', '🚪'], ['dávat', 'давать', 'давати', '🎁'], ['prodávat', 'продавать', 'продавати', '🏪'], ['spěchat', 'спешить', 'поспішати', '💨'],
  ['trhat', 'рвать', 'рвати', '🌼'],
];
export const pastRegular = (v) => v.replace(/t$/, 'l');
export const presentRegular = (v) => v.replace(/t$/, 'm');

// Грамматика: s — предложение с пропуском, base — подсказка в скобках, a — ответ, w — неверные варианты
export const GRAMMAR = [
  // Настоящее время: спряжение
  { kind: 'present', s: 'Ona ___ každý den do školy.', base: 'chodit', a: 'chodí', w: ['chodím', 'chodíme'], ru: 'Она каждый день ходит в школу.', uk: 'Вона щодня ходить до школи.' },
  { kind: 'present', s: 'Můj bratr ___ v neděli fotbal.', base: 'hrát', a: 'hraje', w: ['hraju', 'hrajeme'], ru: 'Мой брат играет в футбол по воскресеньям.', uk: 'Мій брат грає у футбол щонеділі.' },
  { kind: 'present', s: 'Oni ___ ve velkém domě.', base: 'bydlet', a: 'bydlí', w: ['bydlím', 'bydlíš'], ru: 'Они живут в большом доме.', uk: 'Вони живуть у великому будинку.' },
  { kind: 'present', s: 'Já ___ ráno kávu.', base: 'pít', a: 'piju', w: ['pije', 'pijou'], ru: 'Я пью кофе утром.', uk: 'Я п\'ю каву вранці.' },
  { kind: 'present', s: 'My ___ česky.', base: 'mluvit', a: 'mluvíme', w: ['mluvím', 'mluví'], ru: 'Мы говорим по-чешски.', uk: 'Ми говоримо чеською.' },
  { kind: 'present', s: 'Ty ___ rád čaj?', base: 'mít', a: 'máš', w: ['mám', 'má'], ru: 'Ты любишь чай?', uk: 'Ти любиш чай?' },
  { kind: 'present', s: 'Obchod ___ v devět.', base: 'otevírat', a: 'otevírá', w: ['otevírám', 'otevíráme'], ru: 'Магазин открывается в девять.', uk: 'Магазин відчиняється о дев\'ятій.' },
  { kind: 'present', s: 'Vy ___ anglicky?', base: 'rozumět', a: 'rozumíte', w: ['rozumím', 'rozumí'], ru: 'Вы понимаете по-английски?', uk: 'Ви розумієте англійською?' },
  { kind: 'present', s: 'Já ___ domácí úkol.', base: 'dělat', a: 'dělám', w: ['dělá', 'dělají'], ru: 'Я делаю домашнее задание.', uk: 'Я роблю домашнє завдання.' },
  { kind: 'present', s: 'Děti ___ na zahradě.', base: 'hrát si', a: 'hrají', w: ['hraje', 'hraju'], ru: 'Дети играют в саду.', uk: 'Діти граються в саду.' },
  // Прошедшее время: форма на -l (+ jsem / jsme)
  { kind: 'past', s: 'Včera jsem ___ do parku.', base: 'jít', a: 'šel', w: ['jdu', 'půjdu'], ru: 'Вчера я ходил в парк.', uk: 'Учора я ходив у парк.' },
  { kind: 'past', s: 'Včera večer jsme se ___ na film.', base: 'dívat se', a: 'dívali', w: ['díváme', 'díval'], ru: 'Вчера вечером мы смотрели фильм.', uk: 'Учора ввечері ми дивилися фільм.' },
  { kind: 'past', s: 'Ona mi ___ dopis.', base: 'napsat', a: 'napsala', w: ['napsal', 'napíše'], ru: 'Она написала мне письмо.', uk: 'Вона написала мені листа.' },
  { kind: 'past', s: 'Minulý týden jsem si ___ nové kolo.', base: 'koupit', a: 'koupil', w: ['koupím', 'kupuju'], ru: 'На прошлой неделе я купил новый велосипед.', uk: 'Минулого тижня я купив новий велосипед.' },
  { kind: 'past', s: 'Autobus ___ na nádraží.', base: 'zastavit', a: 'zastavil', w: ['zastaví', 'zastavili'], ru: 'Автобус остановился у вокзала.', uk: 'Автобус зупинився біля вокзалу.' },
  { kind: 'past', s: 'Petr včera ___ klíče.', base: 'ztratit', a: 'ztratil', w: ['ztratí', 'ztrácím'], ru: 'Пётр вчера потерял ключи.', uk: 'Петро вчора загубив ключі.' },
  { kind: 'past', s: 'Ve škole jsme se ___ anglicky.', base: 'učit se', a: 'učili', w: ['učíme', 'učil'], ru: 'Мы учили английский в школе.', uk: 'Ми вчили англійську в школі.' },
  { kind: 'past', s: '___ jsi moji zprávu?', base: 'dostat', a: 'Dostal', w: ['Dostaneš', 'Dostávám'], ru: 'Ты получил моё сообщение?', uk: 'Ти отримав моє повідомлення?' },
  { kind: 'past', s: '___ jsem kamaráda na nádraží.', base: 'potkat', a: 'Potkal', w: ['Potkám', 'Potkáme'], ru: 'Я встретил друга на вокзале.', uk: 'Я зустрів друга на вокзалі.' },
  { kind: 'past', s: 'Máma včera ___ polévku.', base: 'uvařit', a: 'uvařila', w: ['uvaří', 'vařím'], ru: 'Мама вчера сварила суп.', uk: 'Мама вчора зварила суп.' },
  // Будущее время: budu + инфинитив или совершенный вид
  { kind: 'future', s: 'Zítra ___ pršet.', base: 'být', a: 'bude', w: ['byl', 'je'], ru: 'Завтра будет дождь.', uk: 'Завтра буде дощ.' },
  { kind: 'future', s: 'Zítra ___ babičce.', base: 'zavolat', a: 'zavolám', w: ['zavolal', 'zavolali'], ru: 'Завтра я позвоню бабушке.', uk: 'Завтра я зателефоную бабусі.' },
  { kind: 'future', s: 'V létě ___ cestovat.', base: 'být', a: 'budeme', w: ['byli', 'jsme'], ru: 'Летом мы будем путешествовать.', uk: 'Улітку ми подорожуватимемо.' },
  { kind: 'future', s: 'Myslím, že Petr ___.', base: 'vyhrát', a: 'vyhraje', w: ['vyhrál', 'vyhrávám'], ru: 'Думаю, Пётр победит.', uk: 'Думаю, Петро переможе.' },
  { kind: 'future', s: 'Zítra ___ do Prahy.', base: 'jet', a: 'pojedu', w: ['jel', 'jedeš'], ru: 'Завтра я поеду в Прагу.', uk: 'Завтра я поїду до Праги.' },
  { kind: 'future', s: 'Zítra se ___ učit.', base: 'být', a: 'budu', w: ['byl', 'jsem'], ru: 'Завтра я буду учиться.', uk: 'Завтра я вчитимуся.' },
  { kind: 'future', s: 'Příští rok si ___ nové auto.', base: 'koupit', a: 'koupíme', w: ['koupili', 'koupil'], ru: 'В следующем году мы купим новую машину.', uk: 'Наступного року ми купимо нову машину.' },
  // Винительный падеж (4. pád)
  { kind: 'article', s: 'Vidím ___.', base: 'máma', a: 'mámu', w: ['máma', 'mámě'], ru: 'Я вижу маму.', uk: 'Я бачу маму.' },
  { kind: 'article', s: 'Mám rád ___.', base: 'káva', a: 'kávu', w: ['káva', 'kávě'], ru: 'Я люблю кофе.', uk: 'Я люблю каву.' },
  { kind: 'article', s: 'Čtu ___.', base: 'kniha', a: 'knihu', w: ['kniha', 'knize'], ru: 'Я читаю книгу.', uk: 'Я читаю книжку.' },
  { kind: 'article', s: 'Hledám ___.', base: 'taška', a: 'tašku', w: ['taška', 'tašce'], ru: 'Я ищу сумку.', uk: 'Я шукаю сумку.' },
  { kind: 'article', s: 'Mám starší ___.', base: 'sestra', a: 'sestru', w: ['sestra', 'sestře'], ru: 'У меня есть старшая сестра.', uk: 'У мене є старша сестра.' },
  { kind: 'article', s: 'Piju ___.', base: 'voda', a: 'vodu', w: ['voda', 'vodě'], ru: 'Я пью воду.', uk: 'Я п\'ю воду.' },
  { kind: 'article', s: 'Znáš ___?', base: 'Petr', a: 'Petra', w: ['Petr', 'Petrovi'], ru: 'Ты знаешь Петра?', uk: 'Ти знаєш Петра?' },
  // Местный падеж (6. pád) и предлоги
  { kind: 'prep', s: 'Bydlím v ___.', base: 'Praha', a: 'Praze', w: ['Praha', 'Prahu'], ru: 'Я живу в Праге.', uk: 'Я живу в Празі.' },
  { kind: 'prep', s: 'Kočka je na ___.', base: 'stůl', a: 'stole', w: ['stůl', 'stolem'], ru: 'Кошка на столе.', uk: 'Кішка на столі.' },
  { kind: 'prep', s: 'Klíče jsou v ___.', base: 'taška', a: 'tašce', w: ['taška', 'tašku'], ru: 'Ключи в сумке.', uk: 'Ключі в сумці.' },
  { kind: 'prep', s: 'Čekám na ___.', base: 'zastávka', a: 'zastávce', w: ['zastávka', 'zastávkou'], ru: 'Я жду на остановке.', uk: 'Я чекаю на зупинці.' },
  { kind: 'prep', s: 'Narodil jsem se v ___.', base: 'květen', a: 'květnu', w: ['květen', 'květnem'], ru: 'Я родился в мае.', uk: 'Я народився в травні.' },
  { kind: 'prep', s: 'Jdu ___ školy.', base: 'do / na / v', a: 'do', w: ['na', 'v'], ru: 'Я иду в школу.', uk: 'Я йду до школи.' },
  { kind: 'prep', s: 'Čekám ___ nádraží.', base: 'do / na / v', a: 'na', w: ['do', 'v'], ru: 'Я жду на вокзале.', uk: 'Я чекаю на вокзалі.' },
  // Сравнение
  { kind: 'compare', s: 'Slon je ___ než pes.', base: 'velký', a: 'větší', w: ['velký', 'největší'], ru: 'Слон больше собаки.', uk: 'Слон більший за собаку.' },
  { kind: 'compare', s: 'To je ___ den v roce.', base: 'teplý', a: 'nejteplejší', w: ['teplejší', 'teplý'], ru: 'Это самый тёплый день в году.', uk: 'Це найтепліший день у році.' },
  { kind: 'compare', s: 'Moje taška je ___ než tvoje.', base: 'těžký', a: 'těžší', w: ['těžký', 'nejtěžší'], ru: 'Моя сумка тяжелее твоей.', uk: 'Моя сумка важча за твою.' },
  { kind: 'compare', s: 'Ona je ___ žákyně ve třídě.', base: 'dobrý', a: 'nejlepší', w: ['lepší', 'dobrá'], ru: 'Она лучшая ученица в классе.', uk: 'Вона найкраща учениця в класі.' },
  { kind: 'compare', s: 'Dnes je to ___ než včera.', base: 'špatný', a: 'horší', w: ['špatnější', 'nejhorší'], ru: 'Сегодня хуже, чем вчера.', uk: 'Сьогодні гірше, ніж учора.' },
  { kind: 'compare', s: 'Vlak je ___ než autobus.', base: 'rychlý', a: 'rychlejší', w: ['rychlý', 'nejrychlejší'], ru: 'Поезд быстрее автобуса.', uk: 'Потяг швидший за автобус.' },
  { kind: 'compare', s: 'Ten film je ___ než kniha.', base: 'zajímavý', a: 'zajímavější', w: ['zajímavý', 'nejzajímavější'], ru: 'Этот фильм интереснее книги.', uk: 'Цей фільм цікавіший за книжку.' },
];

// Длинные предложения: [en, ru, cz, uk]
export const LONG = [
  ['Yesterday I went to the market and bought some fresh fruit.', 'Вчера я сходил на рынок и купил свежих фруктов.', 'Včera jsem šel na trh a koupil čerstvé ovoce.', 'Учора я сходив на ринок і купив свіжих фруктів.'],
  ['If it rains tomorrow, we will stay at home and watch a film.', 'Если завтра будет дождь, мы останемся дома и посмотрим фильм.', 'Jestli zítra bude pršet, zůstaneme doma a podíváme se na film.', 'Якщо завтра буде дощ, ми залишимося вдома й подивимося фільм.'],
  ['My sister is older than me, but I am taller than her.', 'Моя сестра старше меня, но я выше неё.', 'Moje sestra je starší než já, ale já jsem vyšší než ona.', 'Моя сестра старша за мене, але я вищий за неї.'],
  ['We are going to visit our grandparents next weekend.', 'В следующие выходные мы навестим бабушку и дедушку.', 'Příští víkend navštívíme babičku a dědečka.', 'Наступних вихідних ми провідаємо бабусю й дідуся.'],
  ['I have never seen such a beautiful lake before.', 'Я никогда раньше не видел такого красивого озера.', 'Nikdy předtím jsem neviděl tak krásné jezero.', 'Я ніколи раніше не бачив такого гарного озера.'],
  ['Could you tell me where the nearest bus stop is?', 'Не подскажете, где ближайшая остановка?', 'Mohl byste mi říct, kde je nejbližší zastávka?', 'Не підкажете, де найближча зупинка?'],
  ['She usually drinks green tea because she does not like coffee.', 'Она обычно пьёт зелёный чай, потому что не любит кофе.', 'Obvykle pije zelený čaj, protože nemá ráda kávu.', 'Вона зазвичай п\'є зелений чай, бо не любить каву.'],
  ['When I was a child, I lived in a small village near the mountains.', 'Когда я был ребёнком, я жил в маленькой деревне у гор.', 'Když jsem byl dítě, bydlel jsem v malé vesnici u hor.', 'Коли я був дитиною, я жив у маленькому селі біля гір.'],
  ['I would like to book a room for two nights, please.', 'Я бы хотел забронировать номер на две ночи.', 'Chtěl bych si rezervovat pokoj na dvě noci, prosím.', 'Я хотів би забронювати номер на дві ночі.'],
  ['Thank you for your email, I will answer you tomorrow.', 'Спасибо за письмо, я отвечу тебе завтра.', 'Děkuji za e-mail, odpovím ti zítra.', 'Дякую за лист, я відповім тобі завтра.'],
  ['He was tired, so he went to bed early.', 'Он устал, поэтому рано лёг спать.', 'Byl unavený, tak šel brzy spát.', 'Він утомився, тому рано ліг спати.'],
  ['The museum is closed on Mondays, but it is open every other day.', 'Музей закрыт по понедельникам, но открыт во все остальные дни.', 'Muzeum je v pondělí zavřené, ale ostatní dny je otevřené.', 'Музей зачинений щопонеділка, але відчинений в усі інші дні.'],
];

// Письма: в каждой части одна правильная фраза для этого стиля
export const EMAILS = [
  {
    task: { ru: 'Напиши другу Томашу: поблагодари за подарок и позови в гости в субботу.', uk: 'Напиши другові Томашу: подякуй за подарунок і запроси в гості в суботу.' },
    to: 'tomas@seznam.cz', subject: 'Díky!', formal: false,
    parts: [
      { label: { ru: 'Приветствие', uk: 'Привітання' }, ok: 'Ahoj Tomáši,', bad: ['Vážený pane,', 'Vážená paní ředitelko,'] },
      { label: { ru: 'Благодарность', uk: 'Подяка' }, ok: 'Moc děkuju za skvělý dárek k narozeninám!', bad: ['Píšu, abych si stěžoval na vaše služby.', 'V příloze zasílám fakturu.'] },
      { label: { ru: 'Приглашение', uk: 'Запрошення' }, ok: 'Nechceš v sobotu přijít ke mně?', bad: ['Chtěl bych zrušit svou objednávku.', 'Schůzka se odkládá na neurčito.'] },
      { label: { ru: 'Завершение', uk: 'Завершення' }, ok: 'Dej vědět! Těším se na tebe.', bad: ['Těším se na Vaši odpověď ohledně vrácení peněz.', 'S úctou, vedení firmy.'] },
      { label: { ru: 'Подпись', uk: 'Підпис' }, ok: 'Měj se, Mei', bad: ['S pozdravem, zákaznický servis', 'S úctou, hotel'] },
    ],
  },
  {
    task: { ru: 'Напиши в отель: хочешь забронировать номер на две ночи и спрашиваешь про завтрак.', uk: 'Напиши в готель: хочеш забронювати номер на дві ночі й питаєш про сніданок.' },
    to: 'info@hotellotos.cz', subject: 'Rezervace pokoje', formal: true,
    parts: [
      { label: { ru: 'Приветствие', uk: 'Привітання' }, ok: 'Dobrý den,', bad: ['Čau lidi!', 'Ahoj kámo,'] },
      { label: { ru: 'Цель письма', uk: 'Мета листа' }, ok: 'chtěl bych si rezervovat dvoulůžkový pokoj na dvě noci od 12. do 14. října.', bad: ['jak se máš? Dlouho jsme se neviděli!', 'díky za super párty včera.'] },
      { label: { ru: 'Вопрос', uk: 'Питання' }, ok: 'Mohl byste mi prosím sdělit, zda je snídaně v ceně?', bad: ['Nechceš si pak zahrát fotbal?', 'Dejte mi hned snídani.'] },
      { label: { ru: 'Завершение', uk: 'Завершення' }, ok: 'Předem děkuji za odpověď.', bad: ['Čau!', 'Pa pa, mám tě rád!'] },
      { label: { ru: 'Подпись', uk: 'Підпис' }, ok: 'S pozdravem, Mei Chen', bad: ['Pusu, Mei', 'Čus, kámo'] },
    ],
  },
  {
    task: { ru: 'Напиши учителю: ты заболел и завтра не придёшь, спроси про домашнее задание.', uk: 'Напиши вчителеві: ти захворів і завтра не прийдеш, запитай про домашнє завдання.' },
    to: 'novak@skola.cz', subject: 'Zítřejší nepřítomnost', formal: true,
    parts: [
      { label: { ru: 'Приветствие', uk: 'Привітання' }, ok: 'Vážený pane učiteli,', bad: ['Čau učo!', 'Ahoj zlato,'] },
      { label: { ru: 'Причина', uk: 'Причина' }, ok: 'omlouvám se, ale jsem nemocný a zítra nemohu přijít do školy.', bad: ['vyhrál jsem v loterii a teď jsem bohatý.', 'vaše hodina byla nudná.'] },
      { label: { ru: 'Вопрос', uk: 'Питання' }, ok: 'Mohl byste mi prosím napsat, jaký je domácí úkol?', bad: ['Můžete za mě udělat úkol?', 'Kde je dnes večer párty?'] },
      { label: { ru: 'Завершение', uk: 'Завершення' }, ok: 'Děkuji za pochopení.', bad: ['To je mi fuk.', 'Už mi nepište.'] },
      { label: { ru: 'Подпись', uk: 'Підпис' }, ok: 'S pozdravem, Mei', bad: ['Líbám, Mei', 'Váš šéf'] },
    ],
  },
];

// Чат-квесты: type 'pick' — выбрать ответ, 'type' — вписать слово
export const CHATS = [
  {
    title: { ru: 'Отель «Лотос»', uk: 'Готель «Лотос»' }, who: 'Recepce 🏨',
    steps: [
      { npc: 'Dobrý večer! Vítejte v hotelu Lotos. Jak vám mohu pomoct?', type: 'pick', ok: 'Dobrý den, mám rezervaci na dvě noci.', bad: ['Jsem kočka.', 'Kde je pláž? Ahoj.'] },
      { npc: 'Samozřejmě. Jak se jmenujete?', type: 'type', tpl: 'Jmenuji ___ Mei Chen.', a: 'se' },
      { npc: 'Děkuji. Váš pokoj je ve třetím patře. Potřebujete pomoct se zavazadly?', type: 'pick', ok: 'Ano, prosím. Jsou moc těžká.', bad: ['Ne, jsem pilot.', 'Včera jsem šel do školy.'] },
      { npc: 'Snídaně je od sedmi do deseti. Chcete ráno budíček?', type: 'type', tpl: 'Ano, prosím, v ___ hodin.', a: 'sedm' },
      { npc: 'Výborně. Tady je váš klíč. Hezký pobyt!', type: 'pick', ok: 'Moc děkuji!', bad: ['Nemám rád klíče.', 'Jděte pryč.'] },
    ],
  },
  {
    title: { ru: 'Кафе «Бамбук»', uk: 'Кафе «Бамбук»' }, who: 'Kavárna Bambus ☕',
    steps: [
      { npc: 'Dobrý den! Máte vybráno?', type: 'pick', ok: 'Ano, dám si zelený čaj, prosím.', bad: ['Jsem připravený spát.', 'Ne, nesnáším kavárny.'] },
      { npc: 'Malý, nebo velký?', type: 'type', tpl: 'Ten ___, prosím. Mám velkou žízeň.', a: 'velký' },
      { npc: 'Dáte si něco k jídlu? Dnes máme čerstvé dorty.', type: 'pick', ok: 'Jaké dorty máte?', bad: ['Mám kočku.', 'Dorty jsou modré.'] },
      { npc: 'Čokoládový a jablečný. Jablečný je nejlepší.', type: 'type', tpl: 'Tak si ___ jablečný.', a: 'dám' },
      { npc: 'To je šest mincí, prosím.', type: 'pick', ok: 'Tady to je. Můžu platit kartou?', bad: ['Ne, díky, nashle.', 'Platil jsem včera.'] },
    ],
  },
  {
    title: { ru: 'Собеседование', uk: 'Співбесіда' }, who: 'Panda Tours 💼',
    steps: [
      { npc: 'Dobrý den! Děkujeme, že jste přišla. Můžete nám říct něco o sobě?', type: 'pick', ok: 'Samozřejmě. Jmenuji se Mei a ráda cestuji.', bad: ['Ne, nemůžu.', 'Jsem velký slon.'] },
      { npc: 'Proč chcete pracovat jako průvodkyně?', type: 'type', tpl: 'Protože ráda poznávám nové ___.', a: 'lidi' },
      { npc: 'Jakými jazyky mluvíte?', type: 'pick', ok: 'Mluvím česky, anglicky a trochu rusky.', bad: ['Mluvím pusou.', 'Nemám ráda otázky.'] },
      { npc: 'Výborně. Kdy můžete začít?', type: 'type', tpl: 'Můžu začít ___ pondělí.', a: 'v' },
      { npc: 'Skvělé. Ozveme se vám zítra.', type: 'pick', ok: 'Děkuji za váš čas. Na shledanou!', bad: ['Zítra nemám čas.', 'Kdo jste?'] },
    ],
  },
];

// Текст для пробного теста B1
export const READING = {
  text: 'Loni v létě jela Mei do malé vesnice v horách. Bydlela tam tři týdny u babičky a dědečka. Každé ráno pomáhala babičce na zahradě a odpoledne se chodila koupat do jezera. Jednou celý den pršelo, tak zůstala doma a četla dlouhou knihu o dracích. Než odjela, dal jí dědeček malou dřevěnou pandu. Mei říká, že to bylo nejlepší léto jejího života, a příští rok chce babičku a dědečka znovu navštívit.',
  q: [
    { q: 'Kam jela Mei loni v létě?', ok: 'Do vesnice v horách.', bad: ['Do velkého města.', 'K moři.'] },
    { q: 'Jak dlouho tam byla?', ok: 'Tři týdny.', bad: ['Tři dny.', 'Tři měsíce.'] },
    { q: 'Co dělala, když pršelo?', ok: 'Četla knihu.', bad: ['Šla se koupat.', 'Pracovala na zahradě.'] },
    { q: 'Co jí dal dědeček?', ok: 'Dřevěnou pandu.', bad: ['Knihu o dracích.', 'Nové kolo.'] },
    { q: 'Co chce udělat příští rok?', ok: 'Znovu navštívit babičku a dědečka.', bad: ['Koupit dům v horách.', 'Zůstat doma.'] },
  ],
};
