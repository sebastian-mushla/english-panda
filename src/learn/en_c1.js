// Английский C1: грамматика по темам. Формат заданий и уроков — как в en_a1.js.
const G = (kind, rows) => rows.map(([s, base, a, w, ru, uk, cz]) => ({ kind, s, base, a, w, ru, uk, cz }));
const T = (ru, uk, cz) => ({ ru, uk, cz });

export const GRAMMAR = [
  ...G('inversion', [
    ['Never ___ I seen such a view.', 'have', 'have', ['I have', 'did'], 'Никогда я не видел такого вида.', 'Ніколи я не бачив такого краєвиду.', 'Nikdy jsem neviděl takový výhled.'],
    ['Not only ___ she sing, but she also dances.', 'do', 'does', ['she does', 'is'], 'Она не только поёт, но и танцует.', 'Вона не тільки співає, а й танцює.', 'Nejen že zpívá, ale i tančí.'],
    ['Rarely ___ we go out these days.', 'do', 'do', ['we do', 'are'], 'В последнее время мы редко выходим.', 'Останнім часом ми рідко виходимо.', 'V poslední době chodíme ven zřídka.'],
    ['Hardly ___ I arrived when it started to rain.', 'have', 'had', ['I had', 'have'], 'Едва я пришёл, как пошёл дождь.', 'Щойно я прийшов, як пішов дощ.', 'Sotva jsem dorazil, začalo pršet.'],
    ['Only then ___ I understand the problem.', 'do', 'did', ['I did', 'was'], 'Только тогда я понял проблему.', 'Тільки тоді я зрозумів проблему.', 'Teprve tehdy jsem pochopil problém.'],
    ['Under no circumstances ___ you open this door.', 'should', 'should', ['you should', 'must not'], 'Ни при каких обстоятельствах не открывай эту дверь.', 'За жодних обставин не відчиняй ці двері.', 'Za žádných okolností neotvírej tyto dveře.'],
    ['Little ___ he know what was waiting for him.', 'do', 'did', ['he did', 'does'], 'Он и не подозревал, что его ждёт.', 'Він і не здогадувався, що на нього чекає.', 'Netušil, co ho čeká.'],
    ['No sooner ___ we left than the phone rang.', 'have', 'had', ['we had', 'did'], 'Не успели мы уйти, как зазвонил телефон.', 'Не встигли ми піти, як задзвонив телефон.', 'Sotva jsme odešli, zazvonil telefon.'],
  ]),
  ...G('cleft', [
    ['It was Tom ___ broke the window.', 'who / what', 'who', ['what', 'which'], 'Это Том разбил окно.', 'Це Том розбив вікно.', 'Byl to Tom, kdo rozbil okno.'],
    ['___ I need is a long holiday.', 'What / That', 'What', ['That', 'Which'], 'Что мне нужно, так это долгий отпуск.', 'Що мені потрібно, так це довга відпустка.', 'Co potřebuju, je dlouhá dovolená.'],
    ['It is the price ___ worries me.', 'that / what', 'that', ['what', 'who'], 'Меня беспокоит именно цена.', 'Мене непокоїть саме ціна.', 'Znepokojuje mě právě cena.'],
    ['___ she did was call the police.', 'What / All', 'What', ['That', 'Which'], 'Она позвонила в полицию — вот что она сделала.', 'Вона подзвонила в поліцію — ось що вона зробила.', 'Udělala to, že zavolala policii.'],
    ['It was in 2010 ___ we first met.', 'that / when', 'that', ['what', 'which'], 'Именно в 2010 году мы впервые встретились.', 'Саме у 2010 році ми вперше зустрілися.', 'Bylo to v roce 2010, kdy jsme se poprvé setkali.'],
    ['The reason ___ I came is to apologise.', 'why / what', 'why', ['what', 'which'], 'Я пришёл затем, чтобы извиниться.', 'Я прийшов для того, щоб вибачитися.', 'Důvod, proč jsem přišel, je omluvit se.'],
    ['All I want ___ some peace and quiet.', 'be', 'is', ['are', 'be'], 'Всё, чего я хочу, — немного тишины.', 'Усе, чого я хочу, — трохи тиші.', 'Jediné, co chci, je klid.'],
    ['It wasn\'t until midnight ___ he came home.', 'that / when', 'that', ['what', 'than'], 'Он пришёл домой только в полночь.', 'Він прийшов додому лише опівночі.', 'Domů přišel až o půlnoci.'],
  ]),
  ...G('subj', [
    ['I suggest that he ___ a doctor.', 'see', 'see', ['sees', 'saw'], 'Я предлагаю ему сходить к врачу.', 'Я пропоную йому сходити до лікаря.', 'Navrhuji, aby šel k lékaři.'],
    ['It is essential that she ___ on time.', 'be', 'be', ['is', 'was'], 'Крайне важно, чтобы она была вовремя.', 'Вкрай важливо, щоб вона була вчасно.', 'Je nezbytné, aby přišla včas.'],
    ['They insisted that he ___ the fine.', 'pay', 'pay', ['pays', 'paid'], 'Они настояли, чтобы он заплатил штраф.', 'Вони наполягли, щоб він сплатив штраф.', 'Trvali na tom, aby zaplatil pokutu.'],
    ['The doctor recommended that I ___ more.', 'rest', 'rest', ['rested', 'rests'], 'Врач рекомендовал мне больше отдыхать.', 'Лікар порадив мені більше відпочивати.', 'Lékař mi doporučil víc odpočívat.'],
    ['If I ___ you, I would accept.', 'be', 'were', ['was', 'am'], 'На твоём месте я бы согласился.', 'На твоєму місці я б погодився.', 'Na tvém místě bych to přijal.'],
    ['It\'s vital that everyone ___ informed.', 'be', 'be', ['is', 'are'], 'Жизненно важно, чтобы все были в курсе.', 'Життєво важливо, щоб усі були в курсі.', 'Je zásadní, aby byl každý informován.'],
    ['She demanded that the report ___ rewritten.', 'be', 'be', ['is', 'was'], 'Она потребовала переписать отчёт.', 'Вона вимагала переписати звіт.', 'Požadovala, aby byla zpráva přepsána.'],
    ['I wish it ___ Friday already.', 'be', 'were', ['is', 'be'], 'Хотел бы я, чтобы уже была пятница.', 'Хотів би я, щоб уже була п\'ятниця.', 'Kéž by už byl pátek.'],
  ]),
  ...G('modalPast', [
    ['You ___ told me! I would have helped.', 'should have', 'should have', ['must have', 'should'], 'Тебе надо было мне сказать! Я бы помог.', 'Тобі треба було мені сказати! Я б допоміг.', 'Měl jsi mi to říct! Pomohl bych.'],
    ['You ___ have bought milk. We had some.', 'needn\'t', 'needn\'t', ['mustn\'t', 'couldn\'t'], 'Не нужно было покупать молоко. Оно у нас было.', 'Не треба було купувати молоко. Воно в нас було.', 'Nemusel jsi kupovat mléko. Měli jsme ho.'],
    ['He ___ have won, but he gave up.', 'could', 'could', ['must', 'should'], 'Он мог бы выиграть, но сдался.', 'Він міг би виграти, але здався.', 'Mohl vyhrát, ale vzdal to.'],
    ['I ___ have left my phone at home. It\'s not here.', 'must', 'must', ['should', 'needn\'t'], 'Я, должно быть, оставил телефон дома.', 'Я, мабуть, залишив телефон удома.', 'Asi jsem nechal telefon doma.'],
    ['We ___ have taken a taxi — we were late.', 'should', 'should', ['must', 'could not'], 'Надо было взять такси — мы опоздали.', 'Треба було взяти таксі — ми запізнилися.', 'Měli jsme jet taxíkem — přišli jsme pozdě.'],
    ['She ___ have known — nobody told her.', 'can\'t', 'can\'t', ['must', 'should'], 'Она не могла знать — ей никто не сказал.', 'Вона не могла знати — їй ніхто не сказав.', 'Nemohla to vědět — nikdo jí to neřekl.'],
    ['You shouldn\'t ___ eaten so much.', 'have', 'have', ['has', 'had'], 'Не надо было так много есть.', 'Не треба було стільки їсти.', 'Neměl jsi toho tolik sníst.'],
    ['They ___ have warned us, but they didn\'t.', 'might', 'might', ['must', 'needn\'t'], 'Они могли бы нас предупредить, но не сделали этого.', 'Вони могли б нас попередити, але не зробили цього.', 'Mohli nás varovat, ale neudělali to.'],
  ]),
  ...G('rather', [
    ['I\'d rather you ___ smoke here.', 'not', 'didn\'t', ['don\'t', 'not'], 'Я бы предпочёл, чтобы ты здесь не курил.', 'Я б волів, щоб ти тут не курив.', 'Byl bych radši, kdybys tu nekouřil.'],
    ['It\'s high time we ___ home.', 'go', 'went', ['go', 'going'], 'Нам давно пора домой.', 'Нам давно час додому.', 'Je nejvyšší čas jít domů.'],
    ['You\'d better ___ now.', 'leave', 'leave', ['to leave', 'left'], 'Тебе лучше уйти сейчас.', 'Тобі краще піти зараз.', 'Radši teď odejdi.'],
    ['I\'d rather ___ at home tonight.', 'stay', 'stay', ['to stay', 'stayed'], 'Я бы лучше остался дома сегодня.', 'Я б краще залишився вдома сьогодні.', 'Dnes bych radši zůstal doma.'],
    ['It\'s time you ___ a job.', 'get', 'got', ['get', 'getting'], 'Тебе пора найти работу.', 'Тобі час знайти роботу.', 'Je čas, aby sis našel práci.'],
    ['She\'d rather we ___ her earlier.', 'tell', 'had told', ['told', 'tell'], 'Она бы предпочла, чтобы мы сказали ей раньше.', 'Вона воліла б, щоб ми сказали їй раніше.', 'Byla by radši, kdybychom jí to řekli dřív.'],
    ['You\'d better not ___ late again.', 'be', 'be', ['to be', 'being'], 'Тебе лучше больше не опаздывать.', 'Тобі краще більше не запізнюватися.', 'Radši už nechoď pozdě.'],
    ['I would sooner walk ___ take the bus.', 'than', 'than', ['then', 'that'], 'Я лучше пройдусь пешком, чем поеду на автобусе.', 'Я краще пройдуся пішки, ніж поїду автобусом.', 'Radši půjdu pěšky, než abych jel autobusem.'],
  ]),
  ...G('partCl', [
    ['___ finished the work, she went home.', 'have', 'Having', ['Have', 'Had'], 'Закончив работу, она пошла домой.', 'Закінчивши роботу, вона пішла додому.', 'Když dokončila práci, šla domů.'],
    ['___ in 1890, the bridge is still strong.', 'build', 'Built', ['Building', 'Build'], 'Построенный в 1890 году, мост всё ещё крепок.', 'Збудований у 1890 році, міст досі міцний.', 'Most postavený v roce 1890 je stále pevný.'],
    ['Not ___ what to say, he kept quiet.', 'know', 'knowing', ['known', 'know'], 'Не зная, что сказать, он молчал.', 'Не знаючи, що сказати, він мовчав.', 'Nevěděl, co říct, a tak mlčel.'],
    ['The man ___ next to me was a pilot.', 'sit', 'sitting', ['sat', 'sits'], 'Мужчина, сидевший рядом со мной, был пилотом.', 'Чоловік, який сидів поруч зі мною, був пілотом.', 'Muž, který seděl vedle mě, byl pilot.'],
    ['___ by the noise, the baby started crying.', 'wake', 'Woken', ['Waking', 'Woke'], 'Разбуженный шумом, малыш заплакал.', 'Розбуджений шумом, малюк заплакав.', 'Miminko, probuzené hlukem, začalo plakat.'],
    ['___ the door, I saw a strange light.', 'open', 'Opening', ['Opened', 'Open'], 'Открыв дверь, я увидел странный свет.', 'Відчинивши двері, я побачив дивне світло.', 'Když jsem otevřel dveře, uviděl jsem zvláštní světlo.'],
    ['The books ___ on the shelf are mine.', 'leave', 'left', ['leaving', 'leaved'], 'Книги, оставленные на полке, — мои.', 'Книжки, залишені на полиці, — мої.', 'Knihy, které zůstaly na polici, jsou moje.'],
    ['___ been warned, we were careful.', 'have', 'Having', ['Had', 'Have'], 'Будучи предупреждёнными, мы были осторожны.', 'Будучи попередженими, ми були обережні.', 'Protože nás varovali, byli jsme opatrní.'],
  ]),
  ...G('linkersC1', [
    ['___ you pay on time, there is no fee.', 'Provided / Unless', 'Provided', ['Unless', 'Whereas'], 'При условии, что ты платишь вовремя, комиссии нет.', 'За умови, що ти платиш вчасно, комісії немає.', 'Pokud platíš včas, žádný poplatek není.'],
    ['He is tall, ___ his brother is short.', 'whereas / unless', 'whereas', ['unless', 'hence'], 'Он высокий, тогда как его брат низкий.', 'Він високий, тоді як його брат низький.', 'On je vysoký, kdežto jeho bratr malý.'],
    ['___ the bad weather, the event went ahead.', 'Notwithstanding / Whereas', 'Notwithstanding', ['Whereas', 'Provided'], 'Несмотря на плохую погоду, мероприятие состоялось.', 'Попри погану погоду, захід відбувся.', 'Navzdory špatnému počasí se akce konala.'],
    ['The data was wrong; ___, the results are invalid.', 'hence / whereas', 'hence', ['whereas', 'unless'], 'Данные неверны; следовательно, результаты недействительны.', 'Дані хибні; отже, результати недійсні.', 'Data byla chybná, a proto jsou výsledky neplatné.'],
    ['Take an umbrella ___ it rains.', 'in case / unless', 'in case', ['unless', 'whereas'], 'Возьми зонт на случай дождя.', 'Візьми парасольку на випадок дощу.', 'Vezmi si deštník pro případ, že bude pršet.'],
    ['We won\'t go ___ the weather improves.', 'unless / provided', 'unless', ['provided', 'whereas'], 'Мы не пойдём, если погода не улучшится.', 'Ми не підемо, якщо погода не покращиться.', 'Nepůjdeme, pokud se počasí nezlepší.'],
    ['___ I understand your point, I disagree.', 'While / Hence', 'While', ['Hence', 'Unless'], 'Хотя я понимаю твою точку зрения, я не согласен.', 'Хоча я розумію твою думку, я не згоден.', 'I když chápu tvůj názor, nesouhlasím.'],
    ['The plan failed, ___ to lack of money.', 'owing / despite', 'owing', ['despite', 'whereas'], 'План провалился из-за нехватки денег.', 'План провалився через брак грошей.', 'Plán selhal kvůli nedostatku peněz.'],
  ]),
];

export const LESSONS = {
  inversion: {
    title: T('Инверсия: Never have I…', 'Інверсія: Never have I…', 'Inverze: Never have I…'),
    pts: {
      ru: ['После отрицательных и ограничительных слов в начале — порядок как в вопросе: Never have I seen…', 'Слова: Never, Rarely, Seldom, Hardly…when, No sooner…than, Not only, Only then, Little, Under no circumstances.', 'Нет вспомогательного глагола — берём do / does / did: Not only does she sing…'],
      uk: ['Після заперечних та обмежувальних слів на початку — порядок як у питанні: Never have I seen…', 'Слова: Never, Rarely, Seldom, Hardly…when, No sooner…than, Not only, Only then, Little, Under no circumstances.', 'Немає допоміжного дієслова — беремо do / does / did: Not only does she sing…'],
      cz: ['Po záporných a omezujících slovech na začátku je slovosled jako v otázce: Never have I seen…', 'Slova: Never, Rarely, Seldom, Hardly…when, No sooner…than, Not only, Only then, Little, Under no circumstances.', 'Bez pomocného slovesa použij do / does / did: Not only does she sing…'],
    },
    ex: [['I have never seen…', 'Never have I seen…'], ['She not only sings…', 'Not only does she sing…'], ['I had hardly arrived…', 'Hardly had I arrived…']],
  },
  cleft: {
    title: T('Выделение: It was… that / What I need is…', 'Виділення: It was… that / What I need is…', 'Zdůraznění: It was… that / What I need is…'),
    pts: {
      ru: ['Чтобы выделить часть фразы: It was Tom who broke it (а не кто-то другой).', 'What + подлежащее + глагол + is/was…: What I need is rest.', 'It wasn\'t until… that… — «только тогда»: It wasn\'t until midnight that he came.'],
      uk: ['Щоб виділити частину фрази: It was Tom who broke it (а не хтось інший).', 'What + підмет + дієслово + is/was…: What I need is rest.', 'It wasn\'t until… that… — «лише тоді»: It wasn\'t until midnight that he came.'],
      cz: ['Pro zdůraznění části věty: It was Tom who broke it (a ne někdo jiný).', 'What + podmět + sloveso + is/was…: What I need is rest.', 'It wasn\'t until… that… — „až tehdy“: It wasn\'t until midnight that he came.'],
    },
    ex: [['Tom broke it.', 'It was Tom who broke it.'], ['I need rest.', 'What I need is rest.']],
  },
  subj: {
    title: T('Сослагательное: suggest that he be', 'Умовний спосіб: suggest that he be', 'Konjunktiv: suggest that he be'),
    pts: {
      ru: ['После suggest, insist, recommend, demand и It\'s essential / vital that — глагол без -s и без времени: that he see, that she be.', 'В формальном стиле: It is important that everyone be informed.', 'were для всех лиц: If I were you…, I wish it were…'],
      uk: ['Після suggest, insist, recommend, demand та It\'s essential / vital that — дієслово без -s і без часу: that he see, that she be.', 'У формальному стилі: It is important that everyone be informed.', 'were для всіх осіб: If I were you…, I wish it were…'],
      cz: ['Po suggest, insist, recommend, demand a It\'s essential / vital that — sloveso bez -s a bez času: that he see, that she be.', 'Ve formálním stylu: It is important that everyone be informed.', 'were pro všechny osoby: If I were you…, I wish it were…'],
    },
    ex: [['suggest that he', 'see (not sees)'], ['essential that she', 'be (not is)'], ['If I', 'were']],
  },
  modalPast: {
    title: T('should have, needn\'t have, could have', 'should have, needn\'t have, could have', 'should have, needn\'t have, could have'),
    pts: {
      ru: ['should have + V3 — надо было (но не сделал). shouldn\'t have — не надо было (но сделал).', 'needn\'t have + V3 — сделал, но было не нужно. could have — мог бы, но не сделал.', 'must have / can\'t have — уверенная догадка о прошлом. might have — возможно.'],
      uk: ['should have + V3 — треба було (але не зробив). shouldn\'t have — не треба було (але зробив).', 'needn\'t have + V3 — зробив, але не було потреби. could have — міг би, але не зробив.', 'must have / can\'t have — упевнена здогадка про минуле. might have — можливо.'],
      cz: ['should have + V3 — měl jsi (ale neudělal). shouldn\'t have — neměl jsi (ale udělal).', 'needn\'t have + V3 — udělal, ale nemusel. could have — mohl, ale neudělal.', 'must have / can\'t have — jistý dohad o minulosti. might have — možná.'],
    },
    ex: [['should have told', 'надо было / треба було / měl jsi'], ['needn\'t have bought', 'зря / даремно / zbytečně'], ['could have won', 'мог бы / міг би / mohl']],
  },
  rather: {
    title: T('would rather, it\'s time, had better', 'would rather, it\'s time, had better', 'would rather, it\'s time, had better'),
    pts: {
      ru: ['I\'d rather + глагол — я бы лучше: I\'d rather stay. I\'d rather you + Past — я бы хотел, чтобы ты: I\'d rather you didn\'t smoke.', 'It\'s (high) time + Past — давно пора: It\'s time we went.', 'had better + глагол без to — лучше бы (совет-предупреждение): You\'d better leave.'],
      uk: ['I\'d rather + дієслово — я б краще: I\'d rather stay. I\'d rather you + Past — я б хотів, щоб ти: I\'d rather you didn\'t smoke.', 'It\'s (high) time + Past — давно час: It\'s time we went.', 'had better + дієслово без to — краще б (порада-попередження): You\'d better leave.'],
      cz: ['I\'d rather + sloveso — radši bych: I\'d rather stay. I\'d rather you + Past — byl bych radši, kdybys: I\'d rather you didn\'t smoke.', 'It\'s (high) time + Past — je nejvyšší čas: It\'s time we went.', 'had better + sloveso bez to — radši (rada-varování): You\'d better leave.'],
    },
    ex: [['I\'d rather stay', 'I\'d rather you stayed'], ['It\'s time we went', 'You\'d better go']],
  },
  partCl: {
    title: T('Причастные обороты: Having finished…, Built in…', 'Дієприслівникові звороти: Having finished…, Built in…', 'Příčestné vazby: Having finished…, Built in…'),
    pts: {
      ru: ['-ing — одновременно или причина: Opening the door, I saw… Not knowing what to say…', 'Having + V3 — сначала одно, потом другое: Having finished, she left.', 'V3 — пассивное значение: Built in 1890, the bridge… The books left on the shelf…'],
      uk: ['-ing — одночасно або причина: Opening the door, I saw… Not knowing what to say…', 'Having + V3 — спочатку одне, потім інше: Having finished, she left.', 'V3 — пасивне значення: Built in 1890, the bridge… The books left on the shelf…'],
      cz: ['-ing — současně nebo příčina: Opening the door, I saw… Not knowing what to say…', 'Having + V3 — nejdřív jedno, pak druhé: Having finished, she left.', 'V3 — trpný význam: Built in 1890, the bridge… The books left on the shelf…'],
    },
    ex: [['-ing', 'Opening the door, …'], ['Having + V3', 'Having finished, …'], ['V3', 'Built in 1890, …']],
  },
  linkersC1: {
    title: T('Связки C1: provided, whereas, hence', 'Зв\'язки C1: provided, whereas, hence', 'Spojky C1: provided, whereas, hence'),
    pts: {
      ru: ['provided (that) — при условии, что; unless — если не; in case — на случай, если.', 'whereas / while — тогда как; notwithstanding — несмотря на; owing to — из-за.', 'hence / thus — следовательно (формально).'],
      uk: ['provided (that) — за умови, що; unless — якщо не; in case — на випадок, якщо.', 'whereas / while — тоді як; notwithstanding — попри; owing to — через.', 'hence / thus — отже (формально).'],
      cz: ['provided (that) — pokud, za předpokladu; unless — pokud ne; in case — pro případ, že.', 'whereas / while — kdežto; notwithstanding — navzdory; owing to — kvůli.', 'hence / thus — a proto, tudíž (formálně).'],
    },
    ex: [['provided', 'unless', 'in case'], ['whereas', 'notwithstanding', 'owing to'], ['hence', 'thus', '']],
  },
};

export const MOBS = [
  ['g_inv', '🙃', '#5a4a8a', 'Перевёртыш', 'Перевертень', 'Převracák'],
  ['g_cleft', '🔦', '#d9a43a', 'Дух прожектора', 'Дух прожектора', 'Duch reflektoru'],
  ['g_subj', '👑', '#8a3a22', 'Строгий канцлер', 'Суворий канцлер', 'Přísný kancléř'],
  ['g_mpast', '🕰️', '#3a5a6a', 'Хранитель упущенного', 'Хранитель втраченого', 'Strážce promeškaného'],
  ['g_part', '🧵', '#8a6a3a', 'Ткач оборотов', 'Ткач зворотів', 'Tkadlec vazeb'],
  ['g_linkC1', '🌉', '#4a7a5a', 'Мостостроитель', 'Мостобудівник', 'Stavitel mostů'],
];
