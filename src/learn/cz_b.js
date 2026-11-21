// Чешский B1–B2: падежи (2, 3, 7, множественное), числительные, пассив, který, порядок слов, союзы.
// Формат — как в cz_ab.js.
const G = (kind, rows) => rows.map(([s, base, a, w, ru, uk]) => ({ kind, s, base, a, w, ru, uk }));
const T = (ru, uk) => ({ ru, uk });

export const GRAMMAR = [
  // ── B1: падежи ──
  ...G('cz_gen', [
    ['Jdu do ___.', 'škola', 'školy', ['škole', 'školu'], 'Я иду в школу.', 'Я йду до школи.'],
    ['Jsem z ___.', 'Ukrajina', 'Ukrajiny', ['Ukrajině', 'Ukrajinu'], 'Я из Украины.', 'Я з України.'],
    ['Nemám ___.', 'čas', 'čas', ['času', 'časem'], 'У меня нет времени.', 'У мене немає часу.'],
    ['Šálek ___, prosím.', 'káva', 'kávy', ['kávu', 'kávě'], 'Чашку кофе, пожалуйста.', 'Чашку кави, будь ласка.'],
    ['Bydlím u ___.', 'kamarád', 'kamaráda', ['kamarádovi', 'kamarádem'], 'Я живу у друга.', 'Я живу в друга.'],
    ['Kniha ___ je na stole.', 'Petr', 'Petra', ['Petrovi', 'Petr'], 'Книга Петра на столе.', 'Книжка Петра на столі.'],
    ['Bez ___ nejdu.', 'máma', 'mámy', ['mámě', 'mámu'], 'Без мамы я не пойду.', 'Без мами я не піду.'],
    ['Půjdeme do ___.', 'kino', 'kina', ['kinu', 'kině'], 'Мы пойдём в кино.', 'Ми підемо в кіно.'],
  ]),
  ...G('cz_dat', [
    ['Dám to ___.', 'máma', 'mámě', ['mámu', 'mámy'], 'Я дам это маме.', 'Я дам це мамі.'],
    ['Zavolám ___.', 'Petr', 'Petrovi', ['Petra', 'Petrem'], 'Я позвоню Петру.', 'Я подзвоню Петрові.'],
    ['Jdu k ___.', 'doktor', 'doktorovi', ['doktora', 'doktorem'], 'Я иду к врачу.', 'Я йду до лікаря.'],
    ['Pomůžu ___.', 'sestra', 'sestře', ['sestru', 'sestry'], 'Я помогу сестре.', 'Я допоможу сестрі.'],
    ['Je ___ zima.', 'já', 'mi', ['mě', 'mnou'], 'Мне холодно.', 'Мені холодно.'],
    ['Děkuju ___.', 'ty', 'ti', ['tě', 'tebou'], 'Спасибо тебе.', 'Дякую тобі.'],
    ['Napíšu ___ dopis.', 'babička', 'babičce', ['babičku', 'babičky'], 'Я напишу бабушке письмо.', 'Я напишу бабусі листа.'],
    ['Kvůli ___ jsme zůstali doma.', 'déšť', 'dešti', ['deště', 'deštěm'], 'Из-за дождя мы остались дома.', 'Через дощ ми залишилися вдома.'],
  ]),
  ...G('cz_instr', [
    ['Jedu ___.', 'vlak', 'vlakem', ['vlaku', 'vlak'], 'Я еду на поезде.', 'Я їду потягом.'],
    ['Jdu ven s ___.', 'pes', 'psem', ['psa', 'psovi'], 'Я иду гулять с собакой.', 'Я йду гуляти з собакою.'],
    ['Píšu ___.', 'tužka', 'tužkou', ['tužku', 'tužce'], 'Я пишу карандашом.', 'Я пишу олівцем.'],
    ['Mluvím s ___.', 'Eva', 'Evou', ['Evu', 'Evě'], 'Я разговариваю с Евой.', 'Я розмовляю з Євою.'],
    ['Chci být ___.', 'lékař', 'lékařem', ['lékař', 'lékaře'], 'Я хочу быть врачом.', 'Я хочу бути лікарем.'],
    ['Kočka je pod ___.', 'stůl', 'stolem', ['stolu', 'stole'], 'Кошка под столом.', 'Кішка під столом.'],
    ['Čaj s ___, prosím.', 'citron', 'citronem', ['citronu', 'citron'], 'Чай с лимоном, пожалуйста.', 'Чай з лимоном, будь ласка.'],
    ['Před ___ je park.', 'dům', 'domem', ['domu', 'dům'], 'Перед домом парк.', 'Перед будинком парк.'],
  ]),
  ...G('cz_num', [
    ['Mám dvě ___.', 'sestra', 'sestry', ['sester', 'sestra'], 'У меня две сестры.', 'У мене дві сестри.'],
    ['Mám pět ___.', 'sestra', 'sester', ['sestry', 'sestra'], 'У меня пять сестёр.', 'У мене п\'ять сестер.'],
    ['Stojí to tři ___.', 'koruna', 'koruny', ['korun', 'korunu'], 'Это стоит три кроны.', 'Це коштує три крони.'],
    ['Stojí to sto ___.', 'koruna', 'korun', ['koruny', 'koruna'], 'Это стоит сто крон.', 'Це коштує сто крон.'],
    ['Jsou tu čtyři ___.', 'auto', 'auta', ['aut', 'auto'], 'Здесь четыре машины.', 'Тут чотири машини.'],
    ['Čekám už deset ___.', 'minuta', 'minut', ['minuty', 'minutu'], 'Я жду уже десять минут.', 'Я чекаю вже десять хвилин.'],
    ['Mám ___ bratry.', 'dva / dvě', 'dva', ['dvě', 'dvou'], 'У меня два брата.', 'У мене два брати.'],
    ['Mám ___ kočky.', 'dva / dvě', 'dvě', ['dva', 'dvou'], 'У меня две кошки.', 'У мене дві кішки.'],
  ]),
  // ── B2 ──
  ...G('cz_pass', [
    ['Ten dům ___ postaven v roce 1900.', 'být', 'byl', ['je', 'bude'], 'Этот дом был построен в 1900 году.', 'Цей будинок був збудований у 1900 році.'],
    ['Dopis byl ___ včera.', 'napsat', 'napsán', ['napsal', 'napsaný'], 'Письмо было написано вчера.', 'Лист був написаний учора.'],
    ['Tady ___ mluví česky.', 'se', 'se', ['si', 'je'], 'Здесь говорят по-чешски.', 'Тут говорять чеською.'],
    ['Obchod je ___.', 'zavřít', 'zavřený', ['zavřel', 'zavřen se'], 'Магазин закрыт.', 'Магазин зачинений.'],
    ['Okna byla ___.', 'umýt', 'umyta', ['umyl', 'umyté se'], 'Окна были вымыты.', 'Вікна були вимиті.'],
    ['V Česku ___ pije hodně piva.', 'se', 'se', ['si', 'je'], 'В Чехии пьют много пива.', 'У Чехії п\'ють багато пива.'],
    ['Zloděj byl ___ policií.', 'chytit', 'chycen', ['chytil', 'chycena'], 'Вор был пойман полицией.', 'Злодія впіймала поліція.'],
    ['Kniha byla ___ do češtiny.', 'přeložit', 'přeložena', ['přeložen', 'přeložila'], 'Книга была переведена на чешский.', 'Книжку було перекладено чеською.'],
  ]),
  ...G('cz_ktery', [
    ['To je muž, ___ bydlí vedle.', 'který', 'který', ['která', 'které'], 'Это мужчина, который живёт по соседству.', 'Це чоловік, який живе поруч.'],
    ['To je žena, ___ zpívá.', 'který', 'která', ['který', 'kterou'], 'Это женщина, которая поёт.', 'Це жінка, яка співає.'],
    ['To je auto, ___ jsem koupil.', 'který', 'které', ['který', 'která'], 'Это машина, которую я купил.', 'Це машина, яку я купив.'],
    ['Znám holku, ___ máš rád.', 'který', 'kterou', ['která', 'kterého'], 'Я знаю девушку, которую ты любишь.', 'Я знаю дівчину, яку ти любиш.'],
    ['To je kamarád, ___ jsem psal.', 'který', 'kterému', ['který', 'kterého'], 'Это друг, которому я писал.', 'Це друг, якому я писав.'],
    ['Dům, v ___ bydlím, je starý.', 'který', 'kterém', ['který', 'kterého'], 'Дом, в котором я живу, старый.', 'Будинок, у якому я живу, старий.'],
    ['Lidé, ___ tu pracují, jsou milí.', 'který', 'kteří', ['které', 'který'], 'Люди, которые здесь работают, милые.', 'Люди, які тут працюють, милі.'],
    ['Pero, ___ píšu, je modré.', 'který', 'kterým', ['které', 'kterou'], 'Ручка, которой я пишу, синяя.', 'Ручка, якою я пишу, синя.'],
  ]),
  ...G('cz_plcase', [
    ['Bydlím ve ___ městech.', 'velký', 'velkých', ['velkými', 'velké'], 'Я живу в больших городах.', 'Я живу у великих містах.'],
    ['Mluvím s ___.', 'kamarádi', 'kamarády', ['kamarádech', 'kamarádům'], 'Я разговариваю с друзьями.', 'Я розмовляю з друзями.'],
    ['Dám to ___.', 'děti', 'dětem', ['dětmi', 'dětí'], 'Я дам это детям.', 'Я дам це дітям.'],
    ['Nemám rád ___.', 'pavouci', 'pavouky', ['pavoucích', 'pavoukům'], 'Я не люблю пауков.', 'Я не люблю павуків.'],
    ['Je tu hodně ___.', 'lidé', 'lidí', ['lidem', 'lidmi'], 'Здесь много людей.', 'Тут багато людей.'],
    ['Mluvili jsme o ___.', 'knihy', 'knihách', ['knihami', 'knih'], 'Мы говорили о книгах.', 'Ми говорили про книжки.'],
    ['Jezdím ___.', 'tramvaje', 'tramvajemi', ['tramvají', 'tramvajích'], 'Я езжу на трамваях.', 'Я їжджу трамваями.'],
    ['Pět ___ stojí sto korun.', 'jablka', 'jablek', ['jablka', 'jablkům'], 'Пять яблок стоят сто крон.', 'П\'ять яблук коштують сто крон.'],
  ]),
  ...G('cz_enkl', [
    ['Včera ___ byl v kině.', 'jsem', 'jsem', ['byl jsem', 'jsme'], 'Вчера я был в кино.', 'Учора я був у кіно.'],
    ['Jmenuju ___ Eva.', 'se', 'se', ['si', 'mi'], 'Меня зовут Ева.', 'Мене звати Єва.'],
    ['Dal ___ to včera. (on, mně)', 'mi', 'mi', ['mě', 'jsem'], 'Он дал мне это вчера.', 'Він дав мені це вчора.'],
    ['Kde ___ byl? (ty)', 'jsi', 'jsi', ['si', 'jsem'], 'Где ты был?', 'Де ти був?'],
    ['Zítra ___ to řeknu. (já, tobě)', 'ti', 'ti', ['tě', 'si'], 'Завтра я тебе скажу.', 'Завтра я тобі скажу.'],
    ['Koupil jsem ___ nové boty.', 'si', 'si', ['se', 'mi'], 'Я купил себе новые ботинки.', 'Я купив собі нові черевики.'],
    ['Ráno ___ ho viděla. (já)', 'jsem', 'jsem', ['jsi', 'se'], 'Утром я его видела.', 'Уранці я його бачила.'],
    ['Proč ___ směješ?', 'se / si', 'se', ['si', 'jsi'], 'Почему ты смеёшься?', 'Чому ти смієшся?'],
  ]),
  ...G('cz_conj', [
    ['Zůstal jsem doma, ___ jsem byl nemocný.', 'protože / ale', 'protože', ['ale', 'i když'], 'Я остался дома, потому что был болен.', 'Я залишився вдома, бо був хворий.'],
    ['___ pršelo, šli jsme ven.', 'Přestože / Protože', 'Přestože', ['Protože', 'Aby'], 'Хотя шёл дождь, мы пошли гулять.', 'Хоча йшов дощ, ми пішли гуляти.'],
    ['Učím se, ___ udělal zkoušku.', 'aby / že', 'abych', ['že', 'protože'], 'Я учусь, чтобы сдать экзамен.', 'Я вчуся, щоб скласти іспит.'],
    ['Myslím, ___ má pravdu.', 'že / aby', 'že', ['aby', 'jestli'], 'Я думаю, что он прав.', 'Я думаю, що він має рацію.'],
    ['Nevím, ___ přijde.', 'jestli / že', 'jestli', ['že', 'aby'], 'Я не знаю, придёт ли он.', 'Я не знаю, чи він прийде.'],
    ['___ vařím, poslouchám hudbu.', 'Zatímco / Protože', 'Zatímco', ['Protože', 'Ačkoli'], 'Пока я готовлю, слушаю музыку.', 'Поки я готую, слухаю музику.'],
    ['Byl unavený, ___ šel spát.', 'proto / protože', 'proto', ['protože', 'přestože'], 'Он устал, поэтому лёг спать.', 'Він утомився, тому ліг спати.'],
    ['___ budeš mít čas, zavolej.', 'Až / Aby', 'Až', ['Aby', 'Že'], 'Когда будет время, позвони.', 'Коли матимеш час, подзвони.'],
  ]),
];

export const LESSONS = {
  cz_gen: {
    title: T('2. падеж: кого? чего? (do školy, bez mámy)', '2. відмінок: кого? чого? (do školy, bez mámy)'),
    pts: {
      ru: ['После do, z, u, bez, od, kolem — 2. pád. Также «чей»: kniha Petra; и «сколько»: šálek kávy.', 'Женский род -a → -y: škola → do školy. Средний -o → -a: kino → do kina.', 'Мужской живой → -a: kamarád → u kamaráda. Неживой → -u: z obchodu (но čas → času; после ne-: nemám čas).'],
      uk: ['Після do, z, u, bez, od, kolem — 2. pád. Також «чий»: kniha Petra; і «скільки»: šálek kávy.', 'Жіночий рід -a → -y: škola → do školy. Середній -o → -a: kino → do kina.', 'Чоловічий живий → -a: kamarád → u kamaráda. Неживий → -u: z obchodu (але čas → času; після ne-: nemám čas).'],
    },
    ex: [['škola', 'do školy'], ['kino', 'do kina'], ['kamarád', 'u kamaráda'], ['máma', 'bez mámy']],
  },
  cz_dat: {
    title: T('3. падеж: кому? (dám mámě)', '3. відмінок: кому? (dám mámě)'),
    pts: {
      ru: ['Кому даю, звоню, помогаю, пишу; после k, kvůli, díky — 3. pád.', 'Женский -a → -e / -ě: máma → mámě, sestra → sestře, babička → babičce.', 'Мужской живой → -ovi: Petr → Petrovi. Местоимения: mi, ti, mu, jí, nám, vám, jim.'],
      uk: ['Кому даю, дзвоню, допомагаю, пишу; після k, kvůli, díky — 3. pád.', 'Жіночий -a → -e / -ě: máma → mámě, sestra → sestře, babička → babičce.', 'Чоловічий живий → -ovi: Petr → Petrovi. Займенники: mi, ti, mu, jí, nám, vám, jim.'],
    },
    ex: [['máma', 'mámě'], ['sestra', 'sestře'], ['Petr', 'Petrovi'], ['já / ty', 'mi / ti']],
  },
  cz_instr: {
    title: T('7. падеж: чем? с кем? (vlakem, s Evou)', '7. відмінок: чим? з ким? (vlakem, s Evou)'),
    pts: {
      ru: ['Чем (инструмент, транспорт), с кем; после s, před, pod, nad, za, mezi — 7. pád.', 'Женский -a → -ou: Eva → s Evou, tužka → tužkou.', 'Мужской и средний → -em: vlak → vlakem, pes → psem, auto → autem. Профессия: být lékařem.'],
      uk: ['Чим (інструмент, транспорт), з ким; після s, před, pod, nad, za, mezi — 7. pád.', 'Жіночий -a → -ou: Eva → s Evou, tužka → tužkou.', 'Чоловічий і середній → -em: vlak → vlakem, pes → psem, auto → autem. Професія: být lékařem.'],
    },
    ex: [['vlak', 'vlakem'], ['Eva', 's Evou'], ['stůl', 'pod stolem'], ['lékař', 'být lékařem']],
  },
  cz_num: {
    title: T('Числа и падежи: dvě sestry, pět sester', 'Числа й відмінки: dvě sestry, pět sester'),
    pts: {
      ru: ['1 — обычная форма: jedna sestra. 2, 3, 4 — множественное число: dvě sestry, tři koruny.', 'От 5 и дальше (и hodně, málo) — 2. падеж множественного: pět sester, sto korun, deset minut.', 'dva — мужской род (dva bratři), dvě — женский и средний (dvě kočky, dvě auta).'],
      uk: ['1 — звичайна форма: jedna sestra. 2, 3, 4 — множина: dvě sestry, tři koruny.', 'Від 5 і далі (і hodně, málo) — 2. відмінок множини: pět sester, sto korun, deset minut.', 'dva — чоловічий рід (dva bratři), dvě — жіночий і середній (dvě kočky, dvě auta).'],
    },
    ex: [['1', 'jedna koruna'], ['2–4', 'dvě koruny'], ['5+', 'pět korun'], ['dva / dvě', 'dva bratři / dvě sestry']],
  },
  cz_pass: {
    title: T('Пассив: je napsán, píše se', 'Пасив: je napsán, píše se'),
    pts: {
      ru: ['být + краткое причастие: Dopis byl napsán. Род: napsán (м.), napsána (ж.), napsáno (ср.).', 'Чаще в речи — через se: Tady se mluví česky (здесь говорят по-чешски).', 'Состояние — полное прилагательное: Obchod je zavřený.'],
      uk: ['být + короткий дієприкметник: Dopis byl napsán. Рід: napsán (ч.), napsána (ж.), napsáno (с.).', 'Частіше в мовленні — через se: Tady se mluví česky (тут говорять чеською).', 'Стан — повний прикметник: Obchod je zavřený.'],
    },
    ex: [['napsat', 'byl napsán'], ['postavit', 'byl postaven'], ['mluvit', 'mluví se'], ['zavřít', 'je zavřený']],
  },
  cz_ktery: {
    title: T('který — «который» во всех формах', 'který — «який» в усіх формах'),
    pts: {
      ru: ['který изменяется как прилагательное: род берёт от слова, падеж — от своей части предложения.', 'muž, který… / žena, která… / auto, které… / lidé, kteří…', 'Падеж: žena, kterou mám rád (4.), kamarád, kterému píšu (3.), dům, v kterém bydlím (6.).'],
      uk: ['který змінюється як прикметник: рід бере від слова, відмінок — від своєї частини речення.', 'muž, který… / žena, která… / auto, které… / lidé, kteří…', 'Відмінок: žena, kterou mám rád (4.), kamarád, kterému píšu (3.), dům, v kterém bydlím (6.).'],
    },
    ex: [['ten', 'který'], ['ta', 'která / kterou'], ['to', 'které'], ['oni', 'kteří'], ['3. / 6. / 7. pád', 'kterému / kterém / kterým']],
  },
  cz_plcase: {
    title: T('Падежи во множественном числе', 'Відмінки в множині'),
    pts: {
      ru: ['2. pád: -ů / без окончания / -í: hodně lidí, pět jablek. 3. pád: -ům / -ám / -em: dětem.', '6. pád: -ech / -ách / -ích: o knihách, ve městech. 7. pád: -y / -ami / -emi / -mi: s kamarády.', 'Прилагательные: velkých (2., 6.), velkým (3.), velkými (7.).'],
      uk: ['2. pád: -ů / без закінчення / -í: hodně lidí, pět jablek. 3. pád: -ům / -ám / -em: dětem.', '6. pád: -ech / -ách / -ích: o knihách, ve městech. 7. pád: -y / -ami / -emi / -mi: s kamarády.', 'Прикметники: velkých (2., 6.), velkým (3.), velkými (7.).'],
    },
    ex: [['2. pád', 'lidí, jablek, korun'], ['3. pád', 'dětem, kamarádům'], ['6. pád', 'o knihách, ve městech'], ['7. pád', 's kamarády, tramvajemi']],
  },
  cz_enkl: {
    title: T('Порядок слов: jsem, se, mi — на второе место', 'Порядок слів: jsem, se, mi — на друге місце'),
    pts: {
      ru: ['Короткие слова jsem, jsi, se, si, mi, ti, ho, mu стоят на втором месте в предложении.', 'Včera jsem byl… (не Včera byl jsem). Jmenuju se… Dal mi to.', 'Порядок внутри: jsem/jsi → se/si → mi/ti → ho/to: Koupil jsem si ho.'],
      uk: ['Короткі слова jsem, jsi, se, si, mi, ti, ho, mu стоять на другому місці в реченні.', 'Včera jsem byl… (не Včera byl jsem). Jmenuju se… Dal mi to.', 'Порядок усередині: jsem/jsi → se/si → mi/ti → ho/to: Koupil jsem si ho.'],
    },
    ex: [['1. Včera', '2. jsem · byl v kině'], ['1. Jmenuju', '2. se · Eva'], ['pořadí', 'jsem → se/si → mi → ho']],
  },
  cz_conj: {
    title: T('Союзы: protože, přestože, aby, jestli, až', 'Сполучники: protože, přestože, aby, jestli, až'),
    pts: {
      ru: ['protože — потому что, proto — поэтому, přestože / ačkoli / i když — хотя.', 'že — что, jestli — ли («не знаю, придёт ли»), aby + bych/bys… — чтобы.', 'zatímco — пока, тогда как; až — когда (о будущем): Až budeš mít čas…'],
      uk: ['protože — тому що, proto — тому, přestože / ačkoli / i když — хоча.', 'že — що, jestli — чи («не знаю, чи прийде»), aby + bych/bys… — щоб.', 'zatímco — поки, тоді як; až — коли (про майбутнє): Až budeš mít čas…'],
    },
    ex: { ru: [['protože', 'потому что'], ['proto', 'поэтому'], ['přestože', 'хотя'], ['že', 'что'], ['jestli', 'ли'], ['aby', 'чтобы'], ['až', 'когда (будущее)']], uk: [['protože', 'тому що'], ['proto', 'тому'], ['přestože', 'хоча'], ['že', 'що'], ['jestli', 'чи'], ['aby', 'щоб'], ['až', 'коли (майбутнє)']] },
  },
};

export const MOBS = [
  ['g_cz_pady', '🦇', '#3a2c78', 'Пещерный страж падежей', 'Печерний вартовий відмінків'],
  ['g_cz_num', '🧮', '#8a6a3a', 'Счётчик', 'Лічильник'],
  ['g_cz_pass', '🏛️', '#6a6a6a', 'Каменный писарь', 'Кам\'яний писар'],
  ['g_cz_ktery', '🔗', '#4a7a8a', 'Цепной дух', 'Ланцюговий дух'],
  ['g_cz_plcase', '🐝', '#d9a43a', 'Рой', 'Рій'],
  ['g_cz_enkl', '🚂', '#a3301e', 'Поезд слов', 'Потяг слів'],
  ['g_cz_conj', '🌉', '#7a5a3a', 'Дух мостиков', 'Дух місточків'],
];
