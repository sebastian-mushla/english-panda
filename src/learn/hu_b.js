// Венгерский B1–C1: грамматика по темам. Формат — как в hu_ab.js.
const G = (kind, rows) => rows.map(([s, base, a, w, ru, uk, cz]) => ({ kind, s, base, a, w, ru, uk, cz }));
const T = (ru, uk, cz) => ({ ru, uk, cz });

export const GRAMMAR = [
  // ── B1 ──
  ...G('hu_def', [
    ['Látok egy házat. — Látom ___ házat.', 'a', 'a', ['egy', 'az'], 'Вижу какой-то дом. — Вижу (этот) дом.', 'Бачу якийсь будинок. — Бачу (цей) будинок.', 'Vidím nějaký dům. — Vidím ten dům.'],
    ['___ a filmet. (én, néz)', 'néz', 'Nézem', ['Nézek', 'Nézi'], 'Я смотрю (этот) фильм.', 'Я дивлюся (цей) фільм.', 'Dívám se na ten film.'],
    ['___ a könyvet? (te, olvas)', 'olvas', 'Olvasod', ['Olvasol', 'Olvassa'], 'Ты читаешь (эту) книгу?', 'Ти читаєш (цю) книжку?', 'Čteš tu knihu?'],
    ['Anna ___ a levelet. (ír)', 'ír', 'írja', ['ír', 'írom'], 'Анна пишет (это) письмо.', 'Анна пише (цього) листа.', 'Anna píše ten dopis.'],
    ['Mi ___ a választ. (tud)', 'tud', 'tudjuk', ['tudunk', 'tudják'], 'Мы знаем ответ.', 'Ми знаємо відповідь.', 'Známe odpověď.'],
    ['Ők ___ Pétert. (ismer)', 'ismer', 'ismerik', ['ismernek', 'ismeri'], 'Они знают Петера.', 'Вони знають Петра.', 'Znají Petra.'],
    ['Én ___ egy kávét. (kér)', 'kér', 'kérek', ['kérem', 'kéri'], 'Мне кофе (какой-нибудь).', 'Мені кави (якоїсь).', 'Dám si kávu.'],
    ['___ téged. (én, szeret)', 'szeret', 'Szeretlek', ['Szeretem', 'Szeretek'], 'Я люблю тебя.', 'Я кохаю тебе.', 'Miluju tě.'],
  ]),
  ...G('hu_pref', [
    ['Már ___ a házi feladatot. (meg-csinál, én, múlt)', 'megcsinál', 'megcsináltam', ['csináltam meg', 'megcsinálom'], 'Я уже сделал домашку.', 'Я вже зробив домашнє.', 'Už jsem udělal úkol.'],
    ['Nem csináltam ___ a feladatot.', 'meg', 'meg', ['el', 'ki'], 'Я не сделал задание (при отрицании приставка отходит).', 'Я не зробив завдання (при запереченні префікс відходить).', 'Neudělal jsem úkol.'],
    ['Péter ___ a boltba. (be-megy)', 'bemegy', 'bemegy', ['megy be', 'megybe'], 'Петер заходит в магазин.', 'Петер заходить у магазин.', 'Petr jde do obchodu.'],
    ['Mikor mész ___? (el)', 'el', 'el', ['meg', 'be'], 'Когда ты уходишь?', 'Коли ти йдеш?', 'Kdy odcházíš?'],
    ['___ az ablakot! (ki-nyit, te)', 'kinyit', 'Nyisd ki', ['Kinyisd', 'Nyitsd'], 'Открой окно!', 'Відчини вікно!', 'Otevři okno!'],
    ['Anna ___ a levelet. (el-olvas, múlt)', 'elolvas', 'elolvasta', ['olvasta el', 'elolvasott'], 'Анна прочитала письмо.', 'Анна прочитала листа.', 'Anna přečetla dopis.'],
    ['Péter jött ___, nem Anna. (fókusz: be)', 'be', 'be', ['el', 'ki'], 'Вошёл Петер, а не Анна.', 'Увійшов Петер, а не Анна.', 'Vešel Petr, ne Anna.'],
    ['Holnap ___ hozzánk. (át-jön)', 'átjön', 'átjön', ['jön át', 'átjött'], 'Завтра он зайдёт к нам.', 'Завтра він зайде до нас.', 'Zítra k nám přijde.'],
  ]),
  ...G('hu_hat', [
    ['___ bejönni? (én, -hat)', 'bejön', 'Bejöhetek', ['Bejövök', 'Bejöhet'], 'Можно войти?', 'Можна увійти?', 'Můžu dál?'],
    ['Itt nem ___ dohányozni.', 'lehet', 'lehet', ['kell', 'szabad lesz'], 'Здесь нельзя курить.', 'Тут не можна курити.', 'Tady se nesmí kouřit.'],
    ['Holnap ___ moziba. (mi, megy)', 'megy', 'mehetünk', ['megyünk', 'mehetek'], 'Завтра мы можем пойти в кино.', 'Завтра ми можемо піти в кіно.', 'Zítra můžeme jít do kina.'],
    ['___ egy kérdést? (én, kérdez)', 'kérdez', 'Kérdezhetek', ['Kérdezek', 'Kérdezhet'], 'Можно задать вопрос?', 'Можна запитати?', 'Můžu se zeptat?'],
    ['Ezt ___ megenni. (te, -hat)', 'eszik', 'megeheted', ['megeszed', 'megehetem'], 'Это ты можешь съесть.', 'Це ти можеш з\'їсти.', 'Tohle můžeš sníst.'],
    ['Nem ___ úszni. (ő, tud)', 'tud', 'tud', ['hat', 'lehet'], 'Он не умеет плавать.', 'Він не вміє плавати.', 'Neumí plavat.'],
    ['Lehet, hogy ___. (esik)', 'esik', 'esik', ['eshet esik', 'esni'], 'Возможно, пойдёт дождь.', 'Можливо, піде дощ.', 'Možná bude pršet.'],
    ['___ telefonálni? (én, -het)', 'telefonál', 'Telefonálhatok', ['Telefonálok', 'Telefonálhat'], 'Можно позвонить?', 'Можна зателефонувати?', 'Můžu si zavolat?'],
  ]),
  ...G('hu_cond', [
    ['___ egy kávét. (én, kér, вежливо)', 'kér', 'Kérnék', ['Kérek', 'Kérne'], 'Я бы попросил кофе.', 'Я б попросив кави.', 'Dal bych si kávu.'],
    ['Ha gazdag lennék, ___. (utazik)', 'utazik', 'utaznék', ['utazok', 'utazna'], 'Если бы я был богат, путешествовал бы.', 'Якби я був багатий, подорожував би.', 'Kdybych byl bohatý, cestoval bych.'],
    ['Ha lenne időm, ___. (segít)', 'segít', 'segítenék', ['segítek', 'segítene'], 'Если бы было время, я бы помог.', 'Якби був час, я б допоміг.', 'Kdybych měl čas, pomohl bych.'],
    ['___ moziba? (te, jön)', 'jön', 'Jönnél', ['Jössz', 'Jönne'], 'Пошёл бы ты в кино?', 'Пішов би ти в кіно?', 'Šel bys do kina?'],
    ['Ha ___ kedvem, sétálnék. (van)', 'van', 'lenne', ['van', 'volt'], 'Если бы было настроение, погулял бы.', 'Якби був настрій, погуляв би.', 'Kdybych měl chuť, šel bych na procházku.'],
    ['Mi ___ egy nagyobb lakást. (szeret)', 'szeret', 'szeretnénk', ['szeretünk', 'szeretnék'], 'Мы бы хотели квартиру побольше.', 'Ми б хотіли більшу квартиру.', 'Chtěli bychom větší byt.'],
    ['Ők ___, ha tudnák. (segít)', 'segít', 'segítenének', ['segítenek', 'segítene'], 'Они бы помогли, если бы знали.', 'Вони б допомогли, якби знали.', 'Pomohli by, kdyby věděli.'],
    ['Ha esne, otthon ___. (marad, én)', 'marad', 'maradnék', ['maradok', 'maradna'], 'Если бы шёл дождь, я бы остался дома.', 'Якби йшов дощ, я б залишився вдома.', 'Kdyby pršelo, zůstal bych doma.'],
  ]),
  ...G('hu_imp', [
    ['___ ide! (jön, te)', 'jön', 'Gyere', ['Jössz', 'Jöjjek'], 'Иди сюда!', 'Іди сюди!', 'Pojď sem!'],
    ['___ lassabban! (beszél, te)', 'beszél', 'Beszélj', ['Beszélsz', 'Beszéljen'], 'Говори медленнее!', 'Говори повільніше!', 'Mluv pomaleji!'],
    ['___ le! (ül, Ön)', 'ül', 'Üljön', ['Ülj', 'Ül'], 'Садитесь!', 'Сідайте!', 'Posaďte se!'],
    ['___ el a könyvet! (olvas, te)', 'olvas', 'Olvasd', ['Olvass', 'Olvasod'], 'Прочитай книгу!', 'Прочитай книжку!', 'Přečti tu knihu!'],
    ['Azt akarom, hogy ___. (te, tanul)', 'tanul', 'tanulj', ['tanulsz', 'tanulni'], 'Я хочу, чтобы ты учился.', 'Я хочу, щоб ти вчився.', 'Chci, abys se učil.'],
    ['Ne ___ ! (megy, te)', 'megy', 'menj', ['mész', 'menni'], 'Не уходи!', 'Не йди!', 'Nechoď!'],
    ['___ el! (mi, indul)', 'indul', 'Induljunk', ['Indulunk', 'Induljatok'], 'Давайте отправимся!', 'Давайте вирушимо!', 'Vyrazme!'],
    ['Mondd meg neki, hogy ___. (hív, ő engem)', 'hív', 'hívjon', ['hív', 'hívni'], 'Скажи ему, чтобы позвонил.', 'Скажи йому, щоб зателефонував.', 'Řekni mu, ať zavolá.'],
  ]),
  ...G('hu_kell', [
    ['Haza kell ___. (én, megy)', 'megy', 'mennem', ['menni', 'mennek'], 'Мне нужно домой.', 'Мені треба додому.', 'Musím jít domů.'],
    ['Tanulnod ___.', 'kell', 'kell', ['kellene van', 'kellek'], 'Тебе нужно учиться.', 'Тобі треба вчитися.', 'Musíš se učit.'],
    ['Péternek dolgoznia ___.', 'kell', 'kell', ['kellett van', 'kellenek'], 'Петеру нужно работать.', 'Петрові треба працювати.', 'Petr musí pracovat.'],
    ['Nem kell ___. (te, aggódik)', 'aggódik', 'aggódnod', ['aggódni', 'aggódsz'], 'Не нужно волноваться.', 'Не треба хвилюватися.', 'Nemusíš se bát.'],
    ['Szeretnék ___. (pihen)', 'pihen', 'pihenni', ['pihenek', 'pihennem'], 'Я хотел бы отдохнуть.', 'Я хотів би відпочити.', 'Chtěl bych si odpočinout.'],
    ['Tegnap korán kellett ___. (mi, kel)', 'kel', 'kelnünk', ['kelni', 'keltünk'], 'Вчера нам пришлось рано встать.', 'Учора нам довелося рано встати.', 'Včera jsme museli brzy vstávat.'],
    ['Nekik ___ kell. (vár)', 'vár', 'várniuk', ['várni', 'várnak'], 'Им нужно ждать.', 'Їм треба чекати.', 'Musí čekat.'],
    ['Tudsz ___? (úszik)', 'úszik', 'úszni', ['úszol', 'úsznod'], 'Ты умеешь плавать?', 'Ти вмієш плавати?', 'Umíš plavat?'],
  ]),
  // ── B2 ──
  ...G('hu_dat', [
    ['Adok egy könyvet Anná___.', '-nak / -nek', 'nak', ['nek', 'nál'], 'Я дам книгу Анне.', 'Я дам книжку Анні.', 'Dám knihu Anně.'],
    ['Péter___ segítek.', '-nak / -nek', 'nek', ['nak', 'hez'], 'Я помогаю Петеру.', 'Я допомагаю Петрові.', 'Pomáhám Petrovi.'],
    ['Telefonálok a főnököm___.', '-nak / -nek', 'nek', ['nak', 'től'], 'Я звоню начальнику.', 'Я телефоную начальнику.', 'Volám šéfovi.'],
    ['Ez a ház a barátom___ a háza.', '-nak / -nek', 'nak', ['nek', 'hoz'], 'Это дом моего друга.', 'Це будинок мого друга.', 'To je dům mého kamaráda.'],
    ['Írtam egy levelet a nagymamá___.', '-nak / -nek', 'nak', ['nek', 'ra'], 'Я написал письмо бабушке.', 'Я написав листа бабусі.', 'Napsal jsem dopis babičce.'],
    ['Örülök a hír___.', '-nak / -nek', 'nek', ['nak', 'ről'], 'Я рад новости.', 'Я радий новині.', 'Mám radost ze zprávy.'],
    ['Mit mondtál a tanár___?', '-nak / -nek', 'nak', ['nek', 'tól'], 'Что ты сказал учителю?', 'Що ти сказав учителю?', 'Co jsi řekl učiteli?'],
    ['A gyerek___ adtam egy almát.', '-nak / -nek', 'nek', ['nak', 'hez'], 'Я дал ребёнку яблоко.', 'Я дав дитині яблуко.', 'Dal jsem dítěti jablko.'],
  ]),
  ...G('hu_instr', [
    ['Busszal megyek. — Villamos___ megyek.', '-val / -vel', 'sal', ['val', 'vel'], 'Еду на трамвае (s + v → ss).', 'Їду трамваєм (s + v → ss).', 'Jedu tramvají.'],
    ['Kávét kérek tej___.', '-val / -vel', 'jel', ['vel', 'val'], 'Кофе с молоком (j + v → jj).', 'Каву з молоком (j + v → jj).', 'Kávu s mlékem.'],
    ['Péter___ beszéltem.', '-val / -vel', 'rel', ['vel', 'val'], 'Я говорил с Петером (r + v → rr).', 'Я говорив з Петром (r + v → rr).', 'Mluvil jsem s Petrem.'],
    ['Autó___ jöttem.', '-val / -vel', 'val', ['vel', 'tal'], 'Я приехал на машине.', 'Я приїхав машиною.', 'Přijel jsem autem.'],
    ['Anná___ vacsoráztam.', '-val / -vel', 'val', ['vel', 'nál'], 'Я ужинал с Анной.', 'Я вечеряв з Анною.', 'Večeřel jsem s Annou.'],
    ['Tollal írok. — Ceruzá___ írok.', '-val / -vel', 'val', ['vel', 'zal'], 'Пишу карандашом.', 'Пишу олівцем.', 'Píšu tužkou.'],
    ['Kés___ vágom.', '-val / -vel', 'sel', ['vel', 'sal'], 'Режу ножом (s + v → ss).', 'Ріжу ножем (s + v → ss).', 'Krájím nožem.'],
    ['A barátaim___ megyek.', '-val / -vel', 'mal', ['val', 'vel'], 'Иду с друзьями (m + v → mm).', 'Іду з друзями (m + v → mm).', 'Jdu s přáteli.'],
  ]),
  ...G('hu_part', [
    ['Az ___ gyerek nevet. (olvas)', 'olvas', 'olvasó', ['olvasott', 'olvas'], 'Читающий ребёнок смеётся.', 'Дитина, що читає, сміється.', 'Čtoucí dítě se směje.'],
    ['A ___ levél az asztalon van. (ír, kész)', 'ír', 'megírt', ['író', 'írás'], 'Написанное письмо на столе.', 'Написаний лист на столі.', 'Napsaný dopis je na stole.'],
    ['A ___ víz tiszta. (folyik)', 'folyik', 'folyó', ['folyt', 'folyik'], 'Текущая вода чистая.', 'Проточна вода чиста.', 'Tekoucí voda je čistá.'],
    ['Az ___ ablak hideg levegőt enged be. (kinyit)', 'kinyit', 'kinyitott', ['kinyitó', 'nyit'], 'Открытое окно впускает холодный воздух.', 'Відчинене вікно впускає холодне повітря.', 'Otevřené okno pouští studený vzduch.'],
    ['A ___ diák jutalmat kap. (tanul, jól)', 'tanul', 'tanuló', ['tanult', 'tanul'], 'Ученик, который хорошо учится, получит награду.', 'Учень, що добре вчиться, отримає нагороду.', 'Dobře se učící student dostane odměnu.'],
    ['Az ___ autó a garázsban van. (javít, már)', 'javít', 'megjavított', ['javító', 'javít'], 'Отремонтированная машина в гараже.', 'Відремонтована машина в гаражі.', 'Opravené auto je v garáži.'],
    ['Az ___ nő a húgom. (énekel)', 'énekel', 'éneklő', ['énekelt', 'énekel'], 'Поющая женщина — моя сестра.', 'Жінка, що співає, — моя сестра.', 'Zpívající žena je moje sestra.'],
    ['Szeretem a ___ krumplit. (süt)', 'süt', 'sült', ['sütő', 'süt'], 'Я люблю жареную картошку.', 'Я люблю смажену картоплю.', 'Mám rád pečené brambory.'],
  ]),
  ...G('hu_cmp', [
    ['Péter ___, mint Pál. (magas)', 'magas', 'magasabb', ['magasbb', 'legmagasabb'], 'Петер выше, чем Пал.', 'Петер вищий за Пала.', 'Petr je vyšší než Pavel.'],
    ['Ez a ___ nap. (szép)', 'szép', 'legszebb', ['szebb', 'legszépebb'], 'Это самый красивый день.', 'Це найгарніший день.', 'To je nejkrásnější den.'],
    ['A vonat ___, mint a busz. (gyors)', 'gyors', 'gyorsabb', ['gyorsbb', 'leggyorsabb'], 'Поезд быстрее автобуса.', 'Потяг швидший за автобус.', 'Vlak je rychlejší než autobus.'],
    ['Ma ___ van, mint tegnap. (jó)', 'jó', 'jobb', ['jóbb', 'legjobb'], 'Сегодня лучше, чем вчера.', 'Сьогодні краще, ніж учора.', 'Dnes je líp než včera.'],
    ['Ez a ___ könyv. (rossz)', 'rossz', 'legrosszabb', ['rosszabb', 'legrossz'], 'Это худшая книга.', 'Це найгірша книжка.', 'To je nejhorší kniha.'],
    ['Anna ___, mint én. (fiatal)', 'fiatal', 'fiatalabb', ['fiatalbb', 'legfiatalabb'], 'Анна моложе меня.', 'Анна молодша за мене.', 'Anna je mladší než já.'],
    ['Ez a ház ___. (nagy)', 'nagy', 'nagyobb', ['nagybb', 'nagyabb'], 'Этот дом больше.', 'Цей будинок більший.', 'Tenhle dům je větší.'],
    ['Ő a ___ a csapatban. (sok)', 'sok', 'legtöbb', ['több', 'legsokabb'], 'У него больше всего в команде.', 'У нього найбільше в команді.', 'Má nejvíc v týmu.'],
  ]),
  // ── C1 ──
  ...G('hu_caus', [
    ['___ a házat. (épít, ők, valakivel)', 'épít', 'Építtetik', ['Építik', 'Építenek'], 'Они строят дом (руками других).', 'Вони будують дім (руками інших).', 'Nechávají si postavit dům.'],
    ['___ az autót. (meg-javít, én, nechat)', 'javít', 'Megjavíttattam', ['Megjavítottam', 'Javítok'], 'Я отдал машину в ремонт.', 'Я віддав машину в ремонт.', 'Nechal jsem si opravit auto.'],
    ['A tanár ___ a diákokkal a szöveget. (olvas)', 'olvas', 'olvastatja', ['olvassa', 'olvas'], 'Учитель заставляет учеников читать текст.', 'Учитель змушує учнів читати текст.', 'Učitel nechává studenty číst text.'],
    ['A tanár ___ a feladatot a diákokkal. (megír)', 'megír', 'megíratja', ['megírja', 'ír'], 'Учитель велит ученикам написать задание.', 'Учитель доручає учням написати завдання.', 'Učitel nechá studenty napsat úkol.'],
    ['Anya ___ a gyerekkel a levest. (eszik)', 'eszik', 'eteti', ['eszi', 'eszik'], 'Мама кормит ребёнка супом.', 'Мама годує дитину супом.', 'Máma krmí dítě polévkou.'],
    ['A főnök ___ velem a jelentést. (ír)', 'ír', 'íratja', ['írja', 'ír'], 'Начальник заставляет меня писать отчёт.', 'Начальник змушує мене писати звіт.', 'Šéf mě nechává psát zprávu.'],
    ['___ egy új öltönyt. (varr, én)', 'varr', 'Varratok', ['Varrok', 'Varrom'], 'Я заказываю пошив костюма.', 'Я замовляю пошиття костюма.', 'Nechávám si ušít oblek.'],
    ['Kitakaríttattuk a lakást___.', '—', '', ['ot', 'at'], '', '', ''],
  ]).filter((g) => g.a),
  ...G('hu_va', [
    ['___ olvasok. (ül)', 'ül', 'Ülve', ['Ülő', 'Ülök'], 'Я читаю сидя.', 'Я читаю сидячи.', 'Čtu vsedě.'],
    ['Az ajtó nyit___ van.', '-va / -ve', 'va', ['ve', 'ó'], 'Дверь открыта.', 'Двері відчинені.', 'Dveře jsou otevřené.'],
    ['Sírva ___ haza. (jön, ő, múlt)', 'jön', 'jött', ['jön', 'jövő'], 'Он пришёл домой в слезах.', 'Він прийшов додому в сльозах.', 'Přišel domů s pláčem.'],
    ['A bolt zár___ van.', '-va / -ve', 'va', ['ve', 'ó'], 'Магазин закрыт.', 'Магазин зачинений.', 'Obchod je zavřený.'],
    ['Nevet___ mondta.', '-ve', 've', ['va', 'ő'], 'Он сказал смеясь.', 'Він сказав, сміючись.', 'Řekl to se smíchem.'],
    ['Látván a bajt, ___. (segít, ő, múlt)', 'segít', 'segített', ['segít', 'segítve'], 'Видя беду, он помог (книжное -ván).', 'Бачачи біду, він допоміг (книжне -ván).', 'Vida potíž, pomohl.'],
    ['A levél már meg van ___. (ír)', 'ír', 'írva', ['írt', 'író'], 'Письмо уже написано.', 'Лист уже написаний.', 'Dopis už je napsaný.'],
    ['Állva ___ a buszon. (utazik, mi, múlt)', 'utazik', 'utaztunk', ['utazunk', 'utazva'], 'Мы ехали в автобусе стоя.', 'Ми їхали автобусом стоячи.', 'Jeli jsme v autobuse vestoje.'],
  ]),
  ...G('hu_focus', [
    ['Tegnap PÉTER ___ el a könyvet. (vitt)', 'vitt', 'vitte', ['elvitte', 'vitt'], 'Вчера книгу унёс именно Петер.', 'Учора книжку забрав саме Петер.', 'Včera knihu odnesl právě Petr.'],
    ['Péter tegnap ___ a könyvet. (el-vitt)', 'elvitt', 'elvitte', ['vitte el', 'vitt'], 'Петер вчера унёс книгу (нейтрально).', 'Петер учора забрав книжку (нейтрально).', 'Petr včera odnesl knihu (neutrálně).'],
    ['Nem PÉTER, hanem ANNA ___ meg. (jött)', 'jött', 'jött', ['megjött', 'jön'], 'Пришла не Петер, а Анна.', 'Прийшла не Петер, а Анна.', 'Nepřišel Petr, ale Anna.'],
    ['Csak ___ tudom a választ. (én)', 'én', 'én', ['engem', 'nekem'], 'Только я знаю ответ.', 'Тільки я знаю відповідь.', 'Jen já znám odpověď.'],
    ['BUDAPESTRE ___ holnap. (utazom)', 'utazom', 'utazom', ['elutazom', 'utazni'], 'Именно в Будапешт я еду завтра.', 'Саме до Будапешта я їду завтра.', 'Zítra jedu právě do Budapešti.'],
    ['Ki ___ meg az ablakot? (törte)', 'törte', 'törte', ['megtörte', 'tört'], 'Кто разбил окно?', 'Хто розбив вікно?', 'Kdo rozbil okno?'],
    ['Mikor ___ haza? (érsz)', 'érsz', 'érsz', ['hazaérsz', 'érni'], 'Когда ты будешь дома?', 'Коли ти будеш удома?', 'Kdy dorazíš domů?'],
    ['Én is ___ a filmet. (megnéztem)', 'megnéztem', 'megnéztem', ['néztem meg', 'nézem'], 'Я тоже посмотрел фильм.', 'Я теж подивився фільм.', 'Taky jsem ten film viděl.'],
  ]),
  ...G('hu_conj2', [
    ['___ fáradt volt, tovább dolgozott.', 'Habár / Tehát', 'Habár', ['Tehát', 'Ugyanis'], 'Хотя он устал, работал дальше.', 'Хоча він утомився, працював далі.', 'Přestože byl unavený, pracoval dál.'],
    ['Esett, ___ otthon maradtunk.', 'tehát / habár', 'tehát', ['habár', 'noha'], 'Шёл дождь, поэтому мы остались дома.', 'Ішов дощ, тож ми залишилися вдома.', 'Pršelo, tedy jsme zůstali doma.'],
    ['Nem jöttem, ___ beteg voltam.', 'ugyanis / tehát', 'ugyanis', ['tehát', 'habár'], 'Я не пришёл, ведь я болел.', 'Я не прийшов, адже хворів.', 'Nepřišel jsem, totiž jsem byl nemocný.'],
    ['___ drága, megveszem.', 'Noha / Tehát', 'Noha', ['Tehát', 'Mert'], 'Хотя дорого, куплю.', 'Хоча дорого, куплю.', 'Ačkoli je to drahé, koupím to.'],
    ['Szeretném, ___ eljönnél.', 'ha / hogy', 'ha', ['hogy', 'mert'], 'Я был бы рад, если бы ты пришёл.', 'Я був би радий, якби ти прийшов.', 'Byl bych rád, kdybys přišel.'],
    ['Okos, ___ lusta.', 'azonban / tehát', 'azonban', ['tehát', 'ugyanis'], 'Он умный, однако ленивый.', 'Він розумний, проте лінивий.', 'Je chytrý, avšak líný.'],
    ['___ esik, hanem fúj a szél is.', 'nemcsak … hanem', 'Nemcsak', ['Sem', 'Vagy'], 'Не только идёт дождь, но и дует ветер.', 'Не тільки йде дощ, а й дме вітер.', 'Nejen prší, ale i fouká vítr.'],
    ['Elment, ___ köszönt volna.', 'anélkül, hogy', 'anélkül, hogy', ['mert', 'tehát'], 'Он ушёл, не попрощавшись.', 'Він пішов, не попрощавшись.', 'Odešel, aniž by pozdravil.'],
  ]),
  ...G('hu_pass', [
    ['Az ajtó ___. (kinyit → magától)', 'kinyílik', 'kinyílt', ['kinyitott', 'kinyit'], 'Дверь открылась (сама).', 'Двері відчинилися (самі).', 'Dveře se otevřely.'],
    ['A munka ___. (elkészít → magától)', 'elkészül', 'elkészült', ['elkészített', 'elkészít'], 'Работа готова (выполнена).', 'Робота готова (виконана).', 'Práce je hotová.'],
    ['A bolt kilenckor ___. (nyit → magától)', 'nyílik', 'nyílik', ['nyit', 'nyitják'], 'Магазин открывается в девять.', 'Магазин відчиняється о дев\'ятій.', 'Obchod se otevírá v devět.'],
    ['A váza ___. (eltör → magától)', 'eltörik', 'eltört', ['eltörte', 'eltör'], 'Ваза разбилась.', 'Ваза розбилася.', 'Váza se rozbila.'],
    ['Az autó ___. (javít → magától)', 'megjavul', 'megjavult', ['megjavította', 'javít'], 'Машина починилась.', 'Машина полагодилася.', 'Auto se spravilo.'],
    ['A levest ___. (az emberek eszik → általános alany)', 'eszik', 'megeszik', ['megeszi', 'evődik'], 'Суп съедают (люди вообще).', 'Суп з\'їдають (люди загалом).', 'Polévka se sní.'],
    ['A hó ___. (elolvad)', 'elolvad', 'elolvadt', ['elolvasztotta', 'olvad'], 'Снег растаял.', 'Сніг розтанув.', 'Sníh roztál.'],
    ['A ház ___ 1900-ban. (épít, книжно)', 'épül', 'épült', ['épített', 'épít'], 'Дом был построен в 1900 году.', 'Будинок збудовано в 1900 році.', 'Dům byl postaven v roce 1900.'],
  ]),
];

// Пустые строки-заглушки отбрасываем (см. filter выше)
export const LESSONS = {
  hu_def: {
    title: T('Определённое спряжение: látom', 'Означена дієвідміна: látom', 'Určité časování: látom'),
    pts: {
      ru: ['Если объект определённый (с a/az, имя, «его», «это») — глагол в определённом спряжении: látom a házat.', 'látom, látod, látja, látjuk, látjátok, látják.', 'Неопределённый объект (egy, без объекта) — обычное: látok egy házat. «Я — тебя»: -lak/-lek (szeretlek).'],
      uk: ['Якщо об\'єкт означений (з a/az, ім\'я, «його», «це») — дієслово в означеній дієвідміні: látom a házat.', 'látom, látod, látja, látjuk, látjátok, látják.', 'Неозначений об\'єкт (egy, без об\'єкта) — звичайна: látok egy házat. «Я — тебе»: -lak/-lek (szeretlek).'],
      cz: ['Je-li předmět určitý (s a/az, jméno, „to“) — sloveso v určitém časování: látom a házat.', 'látom, látod, látja, látjuk, látjátok, látják.', 'Neurčitý předmět (egy, bez předmětu) — běžné: látok egy házat. „Já — tebe“: -lak/-lek (szeretlek).'],
    },
    ex: [['egy házat', 'látok'], ['a házat', 'látom'], ['téged', 'szeretlek']],
  },
  hu_pref: {
    title: T('Приставки: meg-, el-, be-, ki-', 'Префікси: meg-, el-, be-, ki-', 'Předpony: meg-, el-, be-, ki-'),
    pts: {
      ru: ['Приставка делает действие завершённым или задаёт направление: csinál → megcsinál, megy → bemegy.', 'При отрицании, вопросе с вопросительным словом и фокусе приставка уходит за глагол: Nem csináltam meg.', 'В повелительном тоже: Nyisd ki!'],
      uk: ['Префікс робить дію завершеною або задає напрямок: csinál → megcsinál, megy → bemegy.', 'При запереченні, питанні з питальним словом і фокусі префікс іде за дієслово: Nem csináltam meg.', 'У наказовому теж: Nyisd ki!'],
      cz: ['Předpona dělá děj dokonaný nebo udává směr: csinál → megcsinál, megy → bemegy.', 'Při záporu, otázce s tázacím slovem a fokusu jde předpona za sloveso: Nem csináltam meg.', 'Také v rozkazovacím způsobu: Nyisd ki!'],
    },
    ex: [['megcsináltam', 'nem csináltam meg'], ['bemegy', 'mikor mész be?'], ['kinyit', 'nyisd ki!']],
  },
  hu_hat: {
    title: T('Возможность: -hat / -het', 'Можливість: -hat / -het', 'Možnost: -hat / -het'),
    pts: {
      ru: ['-hat/-het + окончание = «можно, разрешено»: mehetek, bejöhetek?', 'lehet — «можно / возможно»: Itt nem lehet dohányozni.', 'Умение — tud + инфинитив: tud úszni.'],
      uk: ['-hat/-het + закінчення = «можна, дозволено»: mehetek, bejöhetek?', 'lehet — «можна / можливо»: Itt nem lehet dohányozni.', 'Уміння — tud + інфінітив: tud úszni.'],
      cz: ['-hat/-het + koncovka = „smím, mohu“: mehetek, bejöhetek?', 'lehet — „lze / možná“: Itt nem lehet dohányozni.', 'Schopnost — tud + infinitiv: tud úszni.'],
    },
    ex: [['megy', 'mehetek'], ['jön', 'jöhetek'], ['kérdez', 'kérdezhetek']],
  },
  hu_cond: {
    title: T('Условное: -na / -ne', 'Умовний: -na / -ne', 'Podmiňovací: -na / -ne'),
    pts: {
      ru: ['-na/-ne + окончание: kérnék, kérnél, kérne, kérnénk, kérnétek, kérnének.', 'ha + условное → условное: Ha gazdag lennék, utaznék.', 'van → lenne. Вежливо: Kérnék egy kávét.'],
      uk: ['-na/-ne + закінчення: kérnék, kérnél, kérne, kérnénk, kérnétek, kérnének.', 'ha + умовний → умовний: Ha gazdag lennék, utaznék.', 'van → lenne. Ввічливо: Kérnék egy kávét.'],
      cz: ['-na/-ne + koncovka: kérnék, kérnél, kérne, kérnénk, kérnétek, kérnének.', 'ha + podmiňovací → podmiňovací: Ha gazdag lennék, utaznék.', 'van → lenne. Zdvořile: Kérnék egy kávét.'],
    },
    ex: [['én', 'kérnék'], ['te', 'kérnél'], ['ő', 'kérne'], ['van', 'lenne']],
  },
  hu_imp: {
    title: T('Повелительное и «чтобы»: -j', 'Наказовий і «щоб»: -j', 'Rozkazovací a „aby“: -j'),
    pts: {
      ru: ['Знак -j: beszélj!, tanulj!, olvasd!; вежливо (Ön) — üljön!', 'После hogy («чтобы») — тот же вид: Azt akarom, hogy tanulj.', 'Особые: jön → gyere / jöjj, megy → menj. Запрет: ne + -j: Ne menj!'],
      uk: ['Знак -j: beszélj!, tanulj!, olvasd!; ввічливо (Ön) — üljön!', 'Після hogy («щоб») — та сама форма: Azt akarom, hogy tanulj.', 'Особливі: jön → gyere / jöjj, megy → menj. Заборона: ne + -j: Ne menj!'],
      cz: ['Znak -j: beszélj!, tanulj!, olvasd!; zdvořile (Ön) — üljön!', 'Po hogy („aby“) — stejný tvar: Azt akarom, hogy tanulj.', 'Zvláštní: jön → gyere / jöjj, megy → menj. Zákaz: ne + -j: Ne menj!'],
    },
    ex: [['beszél', 'beszélj!'], ['tanul', 'tanulj!'], ['jön', 'gyere!'], ['megy', 'menj!']],
  },
  hu_kell: {
    title: T('kell + личный инфинитив', 'kell + особовий інфінітив', 'kell + osobní infinitiv'),
    pts: {
      ru: ['«Мне нужно идти» — mennem kell: инфинитив получает личное окончание.', 'mennem, menned, mennie, mennünk, mennetek, menniük.', 'Без лица — обычный инфинитив: Szeretnék pihenni. Tudsz úszni?'],
      uk: ['«Мені треба йти» — mennem kell: інфінітив отримує особове закінчення.', 'mennem, menned, mennie, mennünk, mennetek, menniük.', 'Без особи — звичайний інфінітив: Szeretnék pihenni. Tudsz úszni?'],
      cz: ['„Musím jít“ — mennem kell: infinitiv dostane osobní koncovku.', 'mennem, menned, mennie, mennünk, mennetek, menniük.', 'Bez osoby — obyčejný infinitiv: Szeretnék pihenni. Tudsz úszni?'],
    },
    ex: [['én', 'mennem kell'], ['te', 'menned kell'], ['ő', 'mennie kell'], ['mi', 'mennünk kell']],
  },
  hu_dat: {
    title: T('Дательный: -nak / -nek', 'Давальний: -nak / -nek', 'Dativ: -nak / -nek'),
    pts: {
      ru: ['Кому? -nak/-nek: Annának, Péternek.', 'Глаголы: ad (дать), segít (помочь), telefonál, ír, mond, örül (радоваться чему).', 'Владелец во фразе «чей»: a barátomnak a háza.'],
      uk: ['Кому? -nak/-nek: Annának, Péternek.', 'Дієслова: ad (дати), segít (допомогти), telefonál, ír, mond, örül (радіти чому).', 'Власник у фразі «чий»: a barátomnak a háza.'],
      cz: ['Komu? -nak/-nek: Annának, Péternek.', 'Slovesa: ad (dát), segít (pomoci), telefonál, ír, mond, örül (mít radost z).', 'Vlastník ve vazbě „čí“: a barátomnak a háza.'],
    },
    ex: [['Anna', 'Annának'], ['Péter', 'Péternek'], ['gyerek', 'gyereknek']],
  },
  hu_instr: {
    title: T('Творительный: -val / -vel', 'Орудний: -val / -vel', 'Instrumentál: -val / -vel'),
    pts: {
      ru: ['С кем? Чем? -val/-vel: autóval, Annával.', 'После согласной v уподобляется ей: busz → busszal, tej → tejjel, Péter → Péterrel.', 'После гласной a/e удлиняется: ceruza → ceruzával.'],
      uk: ['З ким? Чим? -val/-vel: autóval, Annával.', 'Після приголосної v уподібнюється: busz → busszal, tej → tejjel, Péter → Péterrel.', 'Після голосної a/e подовжується: ceruza → ceruzával.'],
      cz: ['S kým? Čím? -val/-vel: autóval, Annával.', 'Po souhlásce se v připodobní: busz → busszal, tej → tejjel, Péter → Péterrel.', 'Po samohlásce se a/e prodlouží: ceruza → ceruzával.'],
    },
    ex: [['autó', 'autóval'], ['busz', 'busszal'], ['Péter', 'Péterrel'], ['tej', 'tejjel']],
  },
  hu_part: {
    title: T('Причастия: -ó/-ő и -t/-tt', 'Дієприкметники: -ó/-ő і -t/-tt', 'Příčestí: -ó/-ő a -t/-tt'),
    pts: {
      ru: ['-ó/-ő — «делающий» (сейчас): olvasó gyerek, folyó víz.', '-t/-tt — «сделанный»: megírt levél, sült krumpli.', 'Стоят перед существительным и не меняются.'],
      uk: ['-ó/-ő — «що робить» (зараз): olvasó gyerek, folyó víz.', '-t/-tt — «зроблений»: megírt levél, sült krumpli.', 'Стоять перед іменником і не змінюються.'],
      cz: ['-ó/-ő — „dělající“ (teď): olvasó gyerek, folyó víz.', '-t/-tt — „udělaný“: megírt levél, sült krumpli.', 'Stojí před podstatným jménem a nemění se.'],
    },
    ex: [['olvas', 'olvasó'], ['folyik', 'folyó'], ['megír', 'megírt'], ['süt', 'sült']],
  },
  hu_cmp: {
    title: T('Сравнение: -bb, leg-', 'Порівняння: -bb, leg-', 'Stupňování: -bb, leg-'),
    pts: {
      ru: ['Сравнительная: -bb (с соединительной гласной): magasabb, szebb, gyorsabb. «чем» — mint.', 'Превосходная: leg- + -bb: legszebb, leggyorsabb.', 'Особые: jó → jobb, sok → több, szép → szebb.'],
      uk: ['Вищий ступінь: -bb (зі сполучною голосною): magasabb, szebb, gyorsabb. «ніж» — mint.', 'Найвищий: leg- + -bb: legszebb, leggyorsabb.', 'Особливі: jó → jobb, sok → több, szép → szebb.'],
      cz: ['2. stupeň: -bb (se spojovací samohláskou): magasabb, szebb, gyorsabb. „než“ — mint.', '3. stupeň: leg- + -bb: legszebb, leggyorsabb.', 'Zvláštní: jó → jobb, sok → több, szép → szebb.'],
    },
    ex: [['magas', 'magasabb', 'legmagasabb'], ['szép', 'szebb', 'legszebb'], ['jó', 'jobb', 'legjobb']],
  },
  hu_caus: {
    title: T('Каузатив: -at / -tat', 'Каузатив: -at / -tat', 'Kauzativ: -at / -tat'),
    pts: {
      ru: ['«Заставить / поручить сделать»: -at/-et (после согласной+t) или -tat/-tet: épít → építtet, ír → írat, olvas → olvastat.', 'Megjavíttattam az autót — я отдал машину в ремонт.', 'Кто исполняет — с -val/-vel: a diákokkal olvastatja.'],
      uk: ['«Змусити / доручити зробити»: -at/-et або -tat/-tet: épít → építtet, ír → írat, olvas → olvastat.', 'Megjavíttattam az autót — я віддав машину в ремонт.', 'Хто виконує — з -val/-vel: a diákokkal olvastatja.'],
      cz: ['„Nechat udělat“: -at/-et nebo -tat/-tet: épít → építtet, ír → írat, olvas → olvastat.', 'Megjavíttattam az autót — nechal jsem si opravit auto.', 'Kdo to dělá — s -val/-vel: a diákokkal olvastatja.'],
    },
    ex: [['épít', 'építtet'], ['ír', 'írat'], ['olvas', 'olvastat'], ['eszik', 'etet']],
  },
  hu_va: {
    title: T('Деепричастие: -va / -ve, -ván', 'Дієприслівник: -va / -ve, -ván', 'Přechodník: -va / -ve, -ván'),
    pts: {
      ru: ['-va/-ve — как? в каком состоянии: ülve (сидя), nevetve (смеясь).', 'С van — состояние: nyitva van (открыто), zárva van (закрыто), meg van írva.', '-ván/-vén — книжное «сделав, видя»: Látván a bajt…'],
      uk: ['-va/-ve — як? у якому стані: ülve (сидячи), nevetve (сміючись).', 'З van — стан: nyitva van (відчинено), zárva van (зачинено), meg van írva.', '-ván/-vén — книжне «зробивши, бачачи»: Látván a bajt…'],
      cz: ['-va/-ve — jak? v jakém stavu: ülve (vsedě), nevetve (se smíchem).', 'S van — stav: nyitva van (otevřeno), zárva van (zavřeno), meg van írva.', '-ván/-vén — knižní „vida, udělav“: Látván a bajt…'],
    },
    ex: [['ül', 'ülve'], ['nevet', 'nevetve'], ['nyit', 'nyitva van'], ['lát', 'látván']],
  },
  hu_focus: {
    title: T('Порядок слов и фокус', 'Порядок слів і фокус', 'Slovosled a fokus'),
    pts: {
      ru: ['Самое важное слово (фокус) стоит прямо перед глаголом: PÉTER vitte el (именно Петер).', 'Если перед глаголом фокус, вопросительное слово или nem — приставка уходит за глагол: Ki törte meg?', 'Нейтральная фраза: приставка на месте: Péter tegnap elvitte.'],
      uk: ['Найважливіше слово (фокус) стоїть просто перед дієсловом: PÉTER vitte el (саме Петер).', 'Якщо перед дієсловом фокус, питальне слово або nem — префікс іде за дієслово: Ki törte meg?', 'Нейтральна фраза: префікс на місці: Péter tegnap elvitte.'],
      cz: ['Nejdůležitější slovo (fokus) stojí přímo před slovesem: PÉTER vitte el (právě Petr).', 'Je-li před slovesem fokus, tázací slovo nebo nem — předpona jde za sloveso: Ki törte meg?', 'Neutrální věta: předpona zůstává: Péter tegnap elvitte.'],
    },
    ex: [['neutrální', 'Péter elvitte'], ['fokus', 'PÉTER vitte el'], ['otázka', 'Ki törte meg?']],
  },
  hu_conj2: {
    title: T('Союзы C1: habár, tehát, ugyanis', 'Сполучники C1: habár, tehát, ugyanis', 'Spojky C1: habár, tehát, ugyanis'),
    pts: {
      ru: ['habár / noha — хотя; azonban — однако; tehát — следовательно.', 'ugyanis — ведь, дело в том, что (объяснение).', 'nemcsak … hanem — не только … но и; anélkül, hogy — не делая.'],
      uk: ['habár / noha — хоча; azonban — проте; tehát — отже.', 'ugyanis — адже, річ у тім, що (пояснення).', 'nemcsak … hanem — не тільки … а й; anélkül, hogy — не роблячи.'],
      cz: ['habár / noha — ačkoli; azonban — avšak; tehát — tedy.', 'ugyanis — totiž (vysvětlení).', 'nemcsak … hanem — nejen … ale i; anélkül, hogy — aniž.'],
    },
    ex: [['habár / noha', 'хотя / хоча / ačkoli'], ['tehát', 'поэтому / тож / tedy'], ['ugyanis', 'ведь / адже / totiž']],
  },
  hu_pass: {
    title: T('«Само сделалось»: -ódik, -ul, -ik', '«Саме зробилося»: -ódik, -ul, -ik', '„Udělalo se samo“: -ódik, -ul, -ik'),
    pts: {
      ru: ['Пассива как в русском почти нет: вместо него — глагол «само»: kinyit (открыть) → kinyílik (открыться).', 'elkészít → elkészül, javít → megjavul, épít → épül (книжно: Az ház 1900-ban épült).', 'Или 3-е лицо мн. ч. без подлежащего: Itt magyarul beszélnek.'],
      uk: ['Пасиву, як в українській, майже немає: замість нього — дієслово «саме»: kinyit (відчинити) → kinyílik (відчинитися).', 'elkészít → elkészül, javít → megjavul, épít → épül (книжно: A ház 1900-ban épült).', 'Або 3-я особа мн. без підмета: Itt magyarul beszélnek.'],
      cz: ['Trpný rod jako v češtině skoro není: místo něj sloveso „samo“: kinyit (otevřít) → kinyílik (otevřít se).', 'elkészít → elkészül, javít → megjavul, épít → épül (knižně: A ház 1900-ban épült).', 'Nebo 3. os. mn. č. bez podmětu: Itt magyarul beszélnek.'],
    },
    ex: [['kinyit', 'kinyílik'], ['elkészít', 'elkészül'], ['javít', 'megjavul'], ['épít', 'épül']],
  },
};

export const MOBS = [
  ['g_hu_def', '🎯', '#8a3a22', 'Меткий стрелок', 'Влучний стрілець', 'Přesný střelec'],
  ['g_hu_pref', '🧩', '#c8702e', 'Дух-пазл', 'Дух-пазл', 'Duch skládačka'],
  ['g_hu_mod', '🦉', '#5a4a8a', 'Мудрая сова', 'Мудра сова', 'Moudrá sova'],
  ['g_hu_dat', '🎁', '#d8402e', 'Дух подарков', 'Дух подарунків', 'Duch dárků'],
  ['g_hu_part', '🧵', '#8a6a3a', 'Ткач', 'Ткач', 'Tkadlec'],
  ['g_hu_cmp', '🏆', '#d9a43a', 'Чемпион', 'Чемпіон', 'Šampion'],
  ['g_hu_c1', '🐉', '#2f8a6a', 'Нефритовый дракон', 'Нефритовий дракон', 'Nefritový drak'],
  ['g_hu_style', '📜', '#5a3a22', 'Писарь', 'Писар', 'Písař'],
];
