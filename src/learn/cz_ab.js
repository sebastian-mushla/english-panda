// Чешский A1–B1: грамматика по темам для изучающих чешский (родной ru / uk).
// Формат заданий — как в en_a1.js, виды с приставкой cz_, чтобы не путались с английскими.
const G = (kind, rows) => rows.map(([s, base, a, w, ru, uk]) => ({ kind, s, base, a, w, ru, uk }));
const T = (ru, uk) => ({ ru, uk });

export const GRAMMAR = [
  // ── A1 ──
  ...G('cz_byt', [
    ['Já ___ student.', 'být', 'jsem', ['jsi', 'je'], 'Я студент.', 'Я студент.'],
    ['Ty ___ můj kamarád.', 'být', 'jsi', ['jsem', 'jsou'], 'Ты мой друг.', 'Ти мій друг.'],
    ['Pavel ___ doma.', 'být', 'je', ['jsou', 'jsem'], 'Павел дома.', 'Павел удома.'],
    ['My ___ z Ukrajiny.', 'být', 'jsme', ['jste', 'jsou'], 'Мы из Украины.', 'Ми з України.'],
    ['Vy ___ učitelka?', 'být', 'jste', ['jsme', 'je'], 'Вы учительница?', 'Ви вчителька?'],
    ['Děti ___ ve škole.', 'být', 'jsou', ['je', 'jste'], 'Дети в школе.', 'Діти в школі.'],
    ['To ___ moje máma.', 'být', 'je', ['jsou', 'jsem'], 'Это моя мама.', 'Це моя мама.'],
    ['Já ___ unavený.', 'nebýt', 'nejsem', ['nejsi', 'není'], 'Я не устал.', 'Я не втомився.'],
    ['Petr ___ doma.', 'nebýt', 'není', ['nejsou', 'nejsem'], 'Петра нет дома.', 'Петра немає вдома.'],
  ]),
  ...G('cz_mit', [
    ['Já ___ psa.', 'mít', 'mám', ['máš', 'má'], 'У меня есть собака.', 'У мене є собака.'],
    ['Ty ___ sestru?', 'mít', 'máš', ['mám', 'mají'], 'У тебя есть сестра?', 'У тебе є сестра?'],
    ['Eva ___ nové auto.', 'mít', 'má', ['mají', 'mám'], 'У Евы новая машина.', 'У Єви нова машина.'],
    ['My ___ hlad.', 'mít', 'máme', ['máte', 'mají'], 'Мы голодны.', 'Ми голодні.'],
    ['Vy ___ čas?', 'mít', 'máte', ['máme', 'má'], 'У вас есть время?', 'У вас є час?'],
    ['Oni ___ velký dům.', 'mít', 'mají', ['má', 'máme'], 'У них большой дом.', 'У них великий будинок.'],
    ['Já ___ čas.', 'nemít', 'nemám', ['nemá', 'nemáš'], 'У меня нет времени.', 'У мене немає часу.'],
    ['Kolik ti ___ let?', 'být', 'je', ['má', 'jsi'], 'Сколько тебе лет?', 'Скільки тобі років?'],
  ]),
  ...G('cz_rod', [
    ['___ stůl je velký.', 'ten / ta / to', 'Ten', ['Ta', 'To'], 'Этот стол большой.', 'Цей стіл великий.'],
    ['___ kniha je nová.', 'ten / ta / to', 'Ta', ['Ten', 'To'], 'Эта книга новая.', 'Ця книжка нова.'],
    ['___ okno je otevřené.', 'ten / ta / to', 'To', ['Ten', 'Ta'], 'Это окно открыто.', 'Це вікно відчинене.'],
    ['___ žena je doktorka.', 'ten / ta / to', 'Ta', ['Ten', 'To'], 'Эта женщина врач.', 'Ця жінка лікарка.'],
    ['___ pes je hodný.', 'ten / ta / to', 'Ten', ['Ta', 'To'], 'Эта собака добрая.', 'Цей пес добрий.'],
    ['___ moře je modré.', 'ten / ta / to', 'To', ['Ta', 'Ten'], 'Это море синее.', 'Це море синє.'],
    ['___ kočka spí.', 'ten / ta / to', 'Ta', ['Ten', 'To'], 'Эта кошка спит.', 'Ця кішка спить.'],
    ['___ město je krásné.', 'ten / ta / to', 'To', ['Ten', 'Ta'], 'Этот город красивый.', 'Це місто гарне.'],
  ]),
  ...G('cz_konj', [
    ['Já ___ česky.', 'mluvit', 'mluvím', ['mluvíš', 'mluví'], 'Я говорю по-чешски.', 'Я говорю чеською.'],
    ['Co ___? (ty)', 'dělat', 'děláš', ['dělám', 'dělá'], 'Ты что делаешь?', 'Що ти робиш?'],
    ['Ona ___ knihu.', 'číst', 'čte', ['čtu', 'čtou'], 'Она читает книгу.', 'Вона читає книжку.'],
    ['My ___ v Praze.', 'bydlet', 'bydlíme', ['bydlím', 'bydlí'], 'Мы живём в Праге.', 'Ми живемо в Празі.'],
    ['Vy ___ anglicky?', 'mluvit', 'mluvíte', ['mluvíme', 'mluví'], 'Вы говорите по-английски?', 'Ви говорите англійською?'],
    ['Oni ___ fotbal.', 'hrát', 'hrají', ['hraje', 'hrajeme'], 'Они играют в футбол.', 'Вони грають у футбол.'],
    ['Já ___ v kanceláři.', 'pracovat', 'pracuju', ['pracuje', 'pracuješ'], 'Я работаю в офисе.', 'Я працюю в офісі.'],
    ['Co ___ Tomáš?', 'dělat', 'dělá', ['dělám', 'dělají'], 'Что делает Томаш?', 'Що робить Томаш?'],
    ['My ___ česky.', 'učit se', 'učíme se', ['učím se', 'učí se'], 'Мы учим чешский.', 'Ми вчимо чеську.'],
  ]),
  ...G('cz_akuz', [
    ['Mám rád ___.', 'káva', 'kávu', ['káva', 'kávě'], 'Я люблю кофе.', 'Я люблю каву.'],
    ['Vidím ___.', 'Eva', 'Evu', ['Eva', 'Evě'], 'Я вижу Еву.', 'Я бачу Єву.'],
    ['Čtu ___.', 'kniha', 'knihu', ['kniha', 'knize'], 'Я читаю книгу.', 'Я читаю книжку.'],
    ['Mám ___.', 'bratr', 'bratra', ['bratr', 'bratrovi'], 'У меня есть брат.', 'У мене є брат.'],
    ['Piju ___.', 'voda', 'vodu', ['voda', 'vody'], 'Я пью воду.', 'Я п\'ю воду.'],
    ['Hledám ___.', 'klíč', 'klíč', ['klíče', 'klíčem'], 'Я ищу ключ.', 'Я шукаю ключ.'],
    ['Máme ___.', 'kočka', 'kočku', ['kočka', 'kočce'], 'У нас есть кошка.', 'У нас є кішка.'],
    ['Znáš ___?', 'Petr', 'Petra', ['Petr', 'Petrovi'], 'Ты знаешь Петра?', 'Ти знаєш Петра?'],
  ]),
  ...G('cz_neg', [
    ['Já ___ maso.', 'jíst', 'nejím', ['jím', 'nejíš'], 'Я не ем мясо.', 'Я не їм м\'яса.'],
    ['On ___ anglicky.', 'mluvit', 'nemluví', ['mluví', 'nemluvím'], 'Он не говорит по-английски.', 'Він не говорить англійською.'],
    ['My ___ čas.', 'mít', 'nemáme', ['máme', 'nemají'], 'У нас нет времени.', 'У нас немає часу.'],
    ['Ty ___ kávu?', 'pít', 'nepiješ', ['piješ', 'nepiju'], 'Ты не пьёшь кофе?', 'Ти не п\'єш кави?'],
    ['Oni ___ v Brně.', 'bydlet', 'nebydlí', ['bydlí', 'nebydlím'], 'Они не живут в Брно.', 'Вони не живуть у Брно.'],
    ['Dnes ___.', 'pracovat', 'nepracuju', ['pracuju', 'nepracuje'], 'Сегодня я не работаю.', 'Сьогодні я не працюю.'],
    ['To ___ pravda.', 'být', 'není', ['je', 'nejsou'], 'Это неправда.', 'Це неправда.'],
    ['___ nikoho.', 'vidět', 'Nevidím', ['Vidím', 'Nevidí'], 'Я никого не вижу.', 'Я нікого не бачу.'],
  ]),
  ...G('cz_priv', [
    ['To je ___ pes. (já)', 'můj / moje', 'můj', ['moje', 'moji'], 'Это моя собака.', 'Це мій пес.'],
    ['To je ___ máma. (já)', 'můj / moje', 'moje', ['můj', 'mého'], 'Это моя мама.', 'Це моя мама.'],
    ['Kde je ___ taška? (ty)', 'tvůj / tvoje', 'tvoje', ['tvůj', 'tvého'], 'Где твоя сумка?', 'Де твоя сумка?'],
    ['To je ___ dům. (my)', 'náš / naše', 'náš', ['naše', 'našeho'], 'Это наш дом.', 'Це наш будинок.'],
    ['___ auto je červené. (on)', 'jeho / její', 'Jeho', ['Její', 'Jejich'], 'Его машина красная.', 'Його машина червона.'],
    ['___ kočka je malá. (ona)', 'jeho / její', 'Její', ['Jeho', 'Jejich'], 'Её кошка маленькая.', 'Її кішка маленька.'],
    ['To je ___ učitel. (vy)', 'váš / vaše', 'váš', ['vaše', 'vašeho'], 'Это ваш учитель.', 'Це ваш учитель.'],
    ['___ děti jsou doma. (oni)', 'jejich', 'Jejich', ['Jeho', 'Její'], 'Их дети дома.', 'Їхні діти вдома.'],
  ]),
  // ── A2 ──
  ...G('cz_minuly', [
    ['Včera jsem ___ v kině. (já, muž)', 'být', 'byl', ['byla', 'bylo'], 'Вчера я был в кино.', 'Учора я був у кіно.'],
    ['Eva ___ dopis.', 'psát', 'psala', ['psal', 'píše'], 'Ева писала письмо.', 'Єва писала листа.'],
    ['My jsme ___ pizzu.', 'jíst', 'jedli', ['jedl', 'jíme'], 'Мы ели пиццу.', 'Ми їли піцу.'],
    ['Petr ___ do Brna.', 'jet', 'jel', ['jela', 'jede'], 'Петр поехал в Брно.', 'Петр поїхав до Брно.'],
    ['Kde ___ byl? (ty)', 'být', 'jsi', ['jsem', 'je'], 'Где ты был?', 'Де ти був?'],
    ['Děti ___ na zahradě.', 'hrát si', 'si hrály', ['si hrál', 'si hrají'], 'Дети играли в саду.', 'Діти гралися в саду.'],
    ['Já jsem ___ maso. (muž)', 'nejíst', 'nejedl', ['nejedla', 'nejím'], 'Я не ел мясо.', 'Я не їв м\'яса.'],
    ['Ona ___ doma.', 'být', 'byla', ['byl', 'je'], 'Она была дома.', 'Вона була вдома.'],
  ]),
  ...G('cz_budouci', [
    ['Zítra ___ doma.', 'být', 'budu', ['jsem', 'byl'], 'Завтра я буду дома.', 'Завтра я буду вдома.'],
    ['Večer ___ číst.', 'my', 'budeme', ['budu', 'budou'], 'Вечером мы будем читать.', 'Увечері ми читатимемо.'],
    ['Co ___ dělat?', 'ty', 'budeš', ['budu', 'bude'], 'Что ты будешь делать?', 'Що ти робитимеш?'],
    ['Oni ___ pracovat.', 'oni', 'budou', ['bude', 'budeme'], 'Они будут работать.', 'Вони працюватимуть.'],
    ['Zítra ___ pršet.', 'to', 'bude', ['budu', 'budou'], 'Завтра будет дождь.', 'Завтра буде дощ.'],
    ['Zítra ___ do Prahy.', 'jet', 'pojedu', ['budu jet', 'jedu'], 'Завтра поеду в Прагу.', 'Завтра поїду до Праги.'],
    ['Pak ___ domů.', 'jít', 'půjdu', ['budu jít', 'šel'], 'Потом пойду домой.', 'Потім піду додому.'],
    ['Vy ___ tady bydlet?', 'vy', 'budete', ['budeme', 'bude'], 'Вы будете здесь жить?', 'Ви тут житимете?'],
  ]),
  ...G('cz_lokal', [
    ['Bydlím v ___.', 'Praha', 'Praze', ['Praha', 'Prahu'], 'Я живу в Праге.', 'Я живу в Празі.'],
    ['Kniha je na ___.', 'stůl', 'stole', ['stůl', 'stolu'], 'Книга на столе.', 'Книжка на столі.'],
    ['Pracuju v ___.', 'banka', 'bance', ['banka', 'banku'], 'Я работаю в банке.', 'Я працюю в банку.'],
    ['Jsme ve ___.', 'škola', 'škole', ['škola', 'školu'], 'Мы в школе.', 'Ми в школі.'],
    ['Sedím v ___.', 'auto', 'autě', ['auto', 'auta'], 'Я сижу в машине.', 'Я сиджу в машині.'],
    ['Byl jsem na ___.', 'pošta', 'poště', ['pošta', 'poštu'], 'Я был на почте.', 'Я був на пошті.'],
    ['Mluvíme o ___.', 'film', 'filmu', ['film', 'filmem'], 'Мы говорим о фильме.', 'Ми говоримо про фільм.'],
    ['Jsem v ___.', 'práce', 'práci', ['práce', 'prácí'], 'Я на работе.', 'Я на роботі.'],
  ]),
  ...G('cz_plural', [
    ['Mám dva ___.', 'pes', 'psy', ['pesy', 'psi'], 'У меня две собаки.', 'У мене два собаки.'],
    ['Tři ___ jsou na stole.', 'kniha', 'knihy', ['knihe', 'kniha'], 'Три книги на столе.', 'Три книжки на столі.'],
    ['Ty ___ jsou nová.', 'auto', 'auta', ['auty', 'auto'], 'Эти машины новые.', 'Ці машини нові.'],
    ['Naše ___ jsou malé.', 'dítě', 'děti', ['dítěte', 'dítě'], 'Наши дети маленькие.', 'Наші діти маленькі.'],
    ['Ty ___ jsou krásné.', 'žena', 'ženy', ['žene', 'žena'], 'Эти женщины красивые.', 'Ці жінки гарні.'],
    ['Ti ___ jsou z Brna.', 'student', 'studenti', ['studenty', 'student'], 'Эти студенты из Брно.', 'Ці студенти з Брно.'],
    ['Mám ráda ___.', 'kočka', 'kočky', ['kočke', 'kočku'], 'Я люблю кошек.', 'Я люблю кішок.'],
    ['Ta ___ jsou velká.', 'okno', 'okna', ['okny', 'okno'], 'Эти окна большие.', 'Ці вікна великі.'],
  ]),
  ...G('cz_adj', [
    ['To je ___ dům.', 'nový', 'nový', ['nová', 'nové'], 'Это новый дом.', 'Це новий будинок.'],
    ['To je ___ kniha.', 'nový', 'nová', ['nový', 'nové'], 'Это новая книга.', 'Це нова книжка.'],
    ['To je ___ auto.', 'nový', 'nové', ['nová', 'nový'], 'Это новая машина.', 'Це нова машина.'],
    ['Mám ___ kočku.', 'černý', 'černou', ['černá', 'černý'], 'У меня чёрная кошка.', 'У мене чорна кішка.'],
    ['To je ___ moře.', 'modrý', 'modré', ['modrá', 'modrý'], 'Это синее море.', 'Це синє море.'],
    ['Je to ___ žena.', 'mladý', 'mladá', ['mladý', 'mladé'], 'Это молодая женщина.', 'Це молода жінка.'],
    ['To je ___ bunda.', 'cizí', 'cizí', ['ciza', 'cizá'], 'Это чужая куртка.', 'Це чужа куртка.'],
    ['Piju ___ kávu.', 'horký', 'horkou', ['horká', 'horký'], 'Я пью горячий кофе.', 'Я п\'ю гарячу каву.'],
  ]),
  ...G('cz_imper', [
    ['___ to! (ty, dělat)', 'dělat', 'Dělej', ['Dělá', 'Dělat'], 'Делай это!', 'Роби це!'],
    ['___ sem! (ty, jít)', 'jít', 'Pojď', ['Jdi', 'Jde'], 'Иди сюда!', 'Іди сюди!'],
    ['___ pomalu! (ty, mluvit)', 'mluvit', 'Mluv', ['Mluví', 'Mluvit'], 'Говори медленно!', 'Говори повільно!'],
    ['___ si! (vy, sednout)', 'sednout', 'Sedněte', ['Sedni', 'Sedne'], 'Садитесь!', 'Сідайте!'],
    ['___ tu knihu! (ty, číst)', 'číst', 'Čti', ['Čte', 'Čteš'], 'Читай книгу!', 'Читай книжку!'],
    ['___ pozor! (ty, dát)', 'dát', 'Dej', ['Dá', 'Dát'], 'Осторожно!', 'Обережно!'],
    ['___ tady! (vy, počkat)', 'počkat', 'Počkejte', ['Počkej', 'Počká'], 'Подождите здесь!', 'Зачекайте тут!'],
    ['___ to! (ty, nedělat)', 'nedělat', 'Nedělej', ['Neudělej', 'Nedělá'], 'Не делай этого!', 'Не роби цього!'],
  ]),
  ...G('cz_pohyb', [
    ['Teď ___ do školy pěšky.', 'jít / jet', 'jdu', ['jedu', 'chodím'], 'Сейчас я иду в школу пешком.', 'Зараз я йду до школи пішки.'],
    ['Zítra ___ autem do Brna.', 'jít / jet', 'jedu', ['jdu', 'jezdím'], 'Завтра я еду на машине в Брно.', 'Завтра я їду машиною до Брно.'],
    ['Každý den ___ do práce pěšky.', 'chodit / jezdit', 'chodím', ['jezdím', 'jdu'], 'Каждый день я хожу на работу пешком.', 'Щодня я ходжу на роботу пішки.'],
    ['Často ___ vlakem.', 'chodit / jezdit', 'jezdíme', ['chodíme', 'jedeme'], 'Мы часто ездим на поезде.', 'Ми часто їздимо потягом.'],
    ['Kam ___? (ty, teď, pěšky)', 'jít', 'jdeš', ['jedeš', 'chodíš'], 'Куда ты идёшь?', 'Куди ти йдеш?'],
    ['Ona ___ do kina každý pátek.', 'chodit', 'chodí', ['jde', 'jezdí'], 'Она ходит в кино каждую пятницу.', 'Вона ходить у кіно щоп\'ятниці.'],
    ['Autobus ___ každých deset minut.', 'jezdit', 'jezdí', ['jede', 'chodí'], 'Автобус ходит каждые десять минут.', 'Автобус ходить кожні десять хвилин.'],
    ['Právě ___ na kole. (my)', 'jet', 'jedeme', ['jezdíme', 'jdeme'], 'Мы как раз едем на велосипеде.', 'Ми якраз їдемо на велосипеді.'],
  ]),
  // ── B1 ──
  ...G('cz_modal', [
    ['___ jít domů. (já, nutnost)', 'muset', 'Musím', ['Můžu', 'Chci'], 'Мне нужно идти домой.', 'Мені треба йти додому.'],
    ['___ ti pomoct? (já, nabídka)', 'moct', 'Můžu', ['Musím', 'Smím'], 'Могу тебе помочь?', 'Можу тобі допомогти?'],
    ['Tady se ___ kouřit.', 'smět', 'nesmí', ['nemusí', 'nemůže'], 'Здесь нельзя курить.', 'Тут не можна курити.'],
    ['___ kávu? (ty, chtít)', 'chtít', 'Chceš', ['Chci', 'Chce'], 'Хочешь кофе?', 'Хочеш кави?'],
    ['Zítra ___ do školy. (ty, není nutné)', 'muset', 'nemusíš', ['nesmíš', 'nemůžeš'], 'Завтра тебе не нужно в школу.', 'Завтра тобі не треба до школи.'],
    ['Oni ___ přijít. (nemají čas)', 'moct', 'nemůžou', ['nemusí', 'nesmí'], 'Они не могут прийти.', 'Вони не можуть прийти.'],
    ['My ___ jet k moři.', 'chtít', 'chceme', ['chce', 'chtějí'], 'Мы хотим поехать на море.', 'Ми хочемо поїхати на море.'],
    ['___ dál? (já, formálně)', 'smět', 'Smím', ['Musím', 'Chci'], 'Можно войти?', 'Можна увійти?'],
  ]),
  ...G('cz_kdyby', [
    ['Kdybych měl čas, ___ ti.', 'pomoct', 'pomohl bych', ['pomohu', 'pomohl jsem'], 'Если бы у меня было время, я бы тебе помог.', 'Якби я мав час, я б тобі допоміг.'],
    ['Kdyby ___ hezky, šli bychom ven.', 'být', 'bylo', ['je', 'bude'], 'Если бы была хорошая погода, мы бы пошли гулять.', 'Якби була гарна погода, ми б пішли гуляти.'],
    ['___ si kávu. (já, zdvořile)', 'dát si', 'Dal bych', ['Dám', 'Dal jsem'], 'Я бы выпил кофе.', 'Я б випив кави.'],
    ['Co ___ dělal? (ty)', 'být', 'bys', ['bych', 'by'], 'Что бы ты делал?', 'Що б ти робив?'],
    ['My ___ jeli k moři.', 'být', 'bychom', ['by', 'bych'], 'Мы бы поехали на море.', 'Ми б поїхали на море.'],
    ['Učím se, ___ udělal zkoušku.', 'aby', 'abych', ['kdybych', 'abys'], 'Я учусь, чтобы сдать экзамен.', 'Я вчуся, щоб скласти іспит.'],
    ['Řekl mi, ___ přišel.', 'aby', 'abych', ['kdybych', 'že'], 'Он сказал мне прийти.', 'Він сказав мені прийти.'],
    ['Oni ___ to věděli.', 'být', 'by', ['bych', 'bychom'], 'Они бы это знали.', 'Вони б це знали.'],
  ]),
  ...G('cz_cmp', [
    ['Petr je ___ než Pavel.', 'velký', 'větší', ['velkější', 'největší'], 'Петр больше Павла.', 'Петр більший за Павла.'],
    ['To je ___ den v roce.', 'krásný', 'nejkrásnější', ['krásnější', 'nejkrásný'], 'Это самый красивый день в году.', 'Це найгарніший день у році.'],
    ['Vlak je ___ než autobus.', 'rychlý', 'rychlejší', ['rychlý', 'nejrychlejší'], 'Поезд быстрее автобуса.', 'Потяг швидший за автобус.'],
    ['Dnes je ___ než včera.', 'dobrý', 'lepší', ['dobřejší', 'nejlepší'], 'Сегодня лучше, чем вчера.', 'Сьогодні краще, ніж учора.'],
    ['Je to ___ film.', 'špatný', 'nejhorší', ['nejšpatnější', 'horší'], 'Это худший фильм.', 'Це найгірший фільм.'],
    ['Eva je ___ než já.', 'mladý', 'mladší', ['mladější', 'nejmladší'], 'Ева моложе меня.', 'Єва молодша за мене.'],
    ['Mluv ___, prosím.', 'pomalu', 'pomaleji', ['pomalejší', 'nejpomaleji'], 'Говори, пожалуйста, медленнее.', 'Говори, будь ласка, повільніше.'],
    ['Tahle kniha je ___.', 'malý', 'menší', ['malejší', 'nejmalý'], 'Эта книга меньше.', 'Ця книжка менша.'],
  ]),
];

export const LESSONS = {
  cz_byt: {
    title: T('být — «быть» (jsem, jsi, je)', 'být — «бути» (jsem, jsi, je)'),
    pts: {
      ru: ['В чешском «быть» всегда говорится: Já jsem student — Я (есть) студент.', 'já jsem, ty jsi, on/ona je, my jsme, vy jste, oni jsou.', '«Не»: nejsem, nejsi, není, nejsme, nejste, nejsou.'],
      uk: ['У чеській «бути» завжди кажуть: Já jsem student — Я (є) студент.', 'já jsem, ty jsi, on/ona je, my jsme, vy jste, oni jsou.', '«Не»: nejsem, nejsi, není, nejsme, nejste, nejsou.'],
    },
    ex: [['já', 'jsem'], ['ty', 'jsi'], ['on / ona / to', 'je'], ['my', 'jsme'], ['vy', 'jste'], ['oni', 'jsou']],
  },
  cz_mit: {
    title: T('mít — «иметь» (mám, máš, má)', 'mít — «мати» (mám, máš, má)'),
    pts: {
      ru: ['«У меня есть» по-чешски — Mám: Mám psa (у меня есть собака).', 'já mám, ty máš, on má, my máme, vy máte, oni mají. «Нет»: nemám.', 'Выражения: mít hlad (хотеть есть), mít čas, mít rád (любить). Возраст — через být: Je mi deset let.'],
      uk: ['«У мене є» чеською — Mám: Mám psa (у мене є собака).', 'já mám, ty máš, on má, my máme, vy máte, oni mají. «Немає»: nemám.', 'Вирази: mít hlad (хотіти їсти), mít čas, mít rád (любити). Вік — через být: Je mi deset let.'],
    },
    ex: [['já', 'mám'], ['ty', 'máš'], ['on / ona', 'má'], ['my', 'máme'], ['vy', 'máte'], ['oni', 'mají']],
  },
  cz_rod: {
    title: T('Род: ten, ta, to', 'Рід: ten, ta, to'),
    pts: {
      ru: ['У каждого слова свой род. Слово «этот»: ten (м.), ta (ж.), to (ср.).', 'Обычно: согласная в конце → ten (stůl, pes); -a → ta (kniha, žena); -o, -e, -í → to (okno, moře).', 'Род бывает не как в русском: ta kočka, to moře, ten den.'],
      uk: ['Кожне слово має свій рід. Слово «цей»: ten (ч.), ta (ж.), to (с.).', 'Зазвичай: приголосна в кінці → ten (stůl, pes); -a → ta (kniha, žena); -o, -e, -í → to (okno, moře).', 'Рід буває не як в українській: ten pes, to moře, ta kočka.'],
    },
    ex: [['ten', 'stůl, pes, den'], ['ta', 'kniha, žena, kočka'], ['to', 'okno, moře, město']],
  },
  cz_konj: {
    title: T('Спряжение: -ám, -ím, -u', 'Дієвідміна: -ám, -ím, -u'),
    pts: {
      ru: ['Окончание глагола показывает, кто делает, поэтому «я, ты» часто не говорят.', 'dělat: dělám, děláš, dělá, děláme, děláte, dělají. mluvit: mluvím, mluvíš, mluví, mluvíme, mluvíte, mluví.', 'číst: čtu, čteš, čte, čteme, čtete, čtou. pracovat: pracuju, pracuješ, pracuje.'],
      uk: ['Закінчення дієслова показує, хто робить, тому «я, ти» часто не кажуть.', 'dělat: dělám, děláš, dělá, děláme, děláte, dělají. mluvit: mluvím, mluvíš, mluví, mluvíme, mluvíte, mluví.', 'číst: čtu, čteš, čte, čteme, čtete, čtou. pracovat: pracuju, pracuješ, pracuje.'],
    },
    ex: [['dělat', 'dělám · děláš · dělá · děláme · děláte · dělají'], ['mluvit', 'mluvím · mluvíš · mluví · mluvíme · mluvíte · mluví'], ['číst', 'čtu · čteš · čte · čteme · čtete · čtou']],
  },
  cz_akuz: {
    title: T('4. падеж: кого? что? (vidím Evu)', '4. відмінок: кого? що? (vidím Evu)'),
    pts: {
      ru: ['После глаголов «вижу, люблю, имею, читаю…» слово меняется — это 4. pád.', 'Женский род: -a → -u: káva → kávu, Eva → Evu.', 'Живой мужской: + -a: bratr → bratra, Petr → Petra. Неживой мужской и средний не меняются: klíč, auto.'],
      uk: ['Після дієслів «бачу, люблю, маю, читаю…» слово змінюється — це 4. pád.', 'Жіночий рід: -a → -u: káva → kávu, Eva → Evu.', 'Живий чоловічий: + -a: bratr → bratra, Petr → Petra. Неживий чоловічий і середній не змінюються: klíč, auto.'],
    },
    ex: [['káva', 'kávu'], ['kniha', 'knihu'], ['bratr', 'bratra'], ['klíč', 'klíč'], ['auto', 'auto']],
  },
  cz_neg: {
    title: T('«Не»: ne- пишется слитно', '«Не»: ne- пишеться разом'),
    pts: {
      ru: ['Отрицание приклеивается к глаголу: mluvím → nemluvím, mám → nemám.', 'je → není (исключение).', 'Двойное отрицание — норма: Nevidím nikoho (не вижу никого).'],
      uk: ['Заперечення приліплюється до дієслова: mluvím → nemluvím, mám → nemám.', 'je → není (виняток).', 'Подвійне заперечення — норма: Nevidím nikoho (не бачу нікого).'],
    },
    ex: [['mám', 'nemám'], ['jím', 'nejím'], ['je', 'není'], ['vidím', 'nevidím']],
  },
  cz_priv: {
    title: T('Мой, твой: můj, tvůj, náš', 'Мій, твій: můj, tvůj, náš'),
    pts: {
      ru: ['Меняются по роду: můj pes (м.), moje máma (ж.), moje auto (ср.).', 'tvůj / tvoje, náš / naše, váš / vaše — так же.', 'jeho (его), její (её), jejich (их) — не меняются по роду.'],
      uk: ['Змінюються за родом: můj pes (ч.), moje máma (ж.), moje auto (с.).', 'tvůj / tvoje, náš / naše, váš / vaše — так само.', 'jeho (його), její (її), jejich (їхній) — не змінюються за родом.'],
    },
    ex: [['já', 'můj / moje'], ['ty', 'tvůj / tvoje'], ['on', 'jeho'], ['ona', 'její'], ['my', 'náš / naše'], ['vy', 'váš / vaše'], ['oni', 'jejich']],
  },
  cz_minuly: {
    title: T('Прошедшее время: byl jsem', 'Минулий час: byl jsem'),
    pts: {
      ru: ['Глагол на -l + jsem / jsi (для я и ты): byl jsem, dělal jsi. Для он/она — без jsem: Petr byl.', 'Род: on byl, ona byla, ono bylo, oni byli, ony byly.', 'Частые: jíst → jedl, jet → jel, psát → psal, jít → šel. «Не»: nebyl jsem.'],
      uk: ['Дієслово на -l + jsem / jsi (для я і ти): byl jsem, dělal jsi. Для він/вона — без jsem: Petr byl.', 'Рід: on byl, ona byla, ono bylo, oni byli, ony byly.', 'Часті: jíst → jedl, jet → jel, psát → psal, jít → šel. «Не»: nebyl jsem.'],
    },
    ex: [['já (muž / žena)', 'byl / byla jsem'], ['ty', 'byl jsi'], ['on / ona', 'byl / byla'], ['my', 'byli jsme'], ['oni', 'byli']],
  },
  cz_budouci: {
    title: T('Будущее время: budu + глагол', 'Майбутній час: budu + дієслово'),
    pts: {
      ru: ['budu, budeš, bude, budeme, budete, budou + неопределённая форма: budu číst.', 'Глаголы движения — с приставкой по-: půjdu, pojedu (не budu jít).', 'Совершенный вид уже означает будущее: udělám (я сделаю).'],
      uk: ['budu, budeš, bude, budeme, budete, budou + неозначена форма: budu číst.', 'Дієслова руху — з префіксом по-: půjdu, pojedu (не budu jít).', 'Доконаний вид уже означає майбутнє: udělám (я зроблю).'],
    },
    ex: [['já', 'budu číst'], ['ty', 'budeš'], ['on', 'bude'], ['my', 'budeme'], ['vy', 'budete'], ['oni', 'budou'], ['jít / jet', 'půjdu / pojedu']],
  },
  cz_lokal: {
    title: T('6. падеж: где? (v Praze, na stole)', '6. відмінок: де? (v Praze, na stole)'),
    pts: {
      ru: ['После v / na (где?) и o (о чём?) — 6. pád.', 'Обычно -e / -ě: Praha → v Praze, škola → ve škole, auto → v autě, stůl → na stole.', 'Иногда -u: o filmu, v parku. -e → -i: práce → v práci.'],
      uk: ['Після v / na (де?) і o (про що?) — 6. pád.', 'Зазвичай -e / -ě: Praha → v Praze, škola → ve škole, auto → v autě, stůl → na stole.', 'Іноді -u: o filmu, v parku. -e → -i: práce → v práci.'],
    },
    ex: [['Praha', 'v Praze'], ['škola', 've škole'], ['stůl', 'na stole'], ['film', 'o filmu'], ['práce', 'v práci']],
  },
  cz_plural: {
    title: T('Множественное число', 'Множина'),
    pts: {
      ru: ['Женский род -a → -y: kniha → knihy, žena → ženy. Средний -o → -a: auto → auta.', 'Мужской неживой → -y: stůl → stoly. Мужской живой → -i: student → studenti.', 'Особые: pes → psi / psy, dítě → děti, člověk → lidé.'],
      uk: ['Жіночий рід -a → -y: kniha → knihy, žena → ženy. Середній -o → -a: auto → auta.', 'Чоловічий неживий → -y: stůl → stoly. Чоловічий живий → -i: student → studenti.', 'Особливі: pes → psi / psy, dítě → děti, člověk → lidé.'],
    },
    ex: [['kniha', 'knihy'], ['auto', 'auta'], ['stůl', 'stoly'], ['student', 'studenti'], ['dítě', 'děti']],
  },
  cz_adj: {
    title: T('Прилагательные: nový, nová, nové', 'Прикметники: nový, nová, nové'),
    pts: {
      ru: ['Прилагательное берёт род слова: nový dům, nová kniha, nové auto.', 'В 4. падеже ж. р.: -á → -ou: Mám novou knihu.', 'Мягкие на -í не меняются по роду: cizí dům, cizí kniha, cizí auto.'],
      uk: ['Прикметник бере рід слова: nový dům, nová kniha, nové auto.', 'У 4. відмінку ж. р.: -á → -ou: Mám novou knihu.', 'М\'які на -í не змінюються за родом: cizí dům, cizí kniha, cizí auto.'],
    },
    ex: [['ten', 'nový dům'], ['ta', 'nová kniha'], ['to', 'nové auto'], ['4. pád (ta)', 'novou knihu'], ['-í', 'cizí']],
  },
  cz_imper: {
    title: T('Повелительное: Dělej! Pojď!', 'Наказовий спосіб: Dělej! Pojď!'),
    pts: {
      ru: ['Для ты: dělat → dělej, mluvit → mluv, číst → čti, dát → dej.', 'Для вы (и вежливо): + -te: dělejte, mluvte, počkejte.', 'Особые: jít → pojď / jdi, být → buď. «Не делай» — nedělej.'],
      uk: ['Для ти: dělat → dělej, mluvit → mluv, číst → čti, dát → dej.', 'Для ви (і ввічливо): + -te: dělejte, mluvte, počkejte.', 'Особливі: jít → pojď / jdi, být → buď. «Не роби» — nedělej.'],
    },
    ex: [['dělat', 'dělej / dělejte'], ['mluvit', 'mluv / mluvte'], ['číst', 'čti / čtěte'], ['jít', 'pojď / pojďte']],
  },
  cz_pohyb: {
    title: T('jít, jet, chodit, jezdit', 'jít, jet, chodit, jezdit'),
    pts: {
      ru: ['jít / chodit — пешком, jet / jezdit — на транспорте.', 'jdu / jedu — сейчас, один раз. chodím / jezdím — регулярно, часто.', 'jít: jdu, jdeš, jde… jet: jedu, jedeš, jede…'],
      uk: ['jít / chodit — пішки, jet / jezdit — транспортом.', 'jdu / jedu — зараз, один раз. chodím / jezdím — регулярно, часто.', 'jít: jdu, jdeš, jde… jet: jedu, jedeš, jede…'],
    },
    ex: [['pěšky, teď', 'jdu'], ['pěšky, často', 'chodím'], ['autem, teď', 'jedu'], ['autem, často', 'jezdím']],
  },
  cz_modal: {
    title: T('muset, moct, smět, chtít', 'muset, moct, smět, chtít'),
    pts: {
      ru: ['muset — должен (musím). nemusím — не нужно.', 'moct — могу (můžu). smět — разрешено (smím); nesmí — нельзя.', 'chtít — хотеть: chci, chceš, chce, chceme, chcete, chtějí.'],
      uk: ['muset — мушу (musím). nemusím — не треба.', 'moct — можу (můžu). smět — дозволено (smím); nesmí — не можна.', 'chtít — хотіти: chci, chceš, chce, chceme, chcete, chtějí.'],
    },
    ex: [['musím', 'nemusím'], ['můžu', 'nemůžu'], ['smím', 'nesmím'], ['chci', 'nechci']],
  },
  cz_kdyby: {
    title: T('Условное: bych, bys, by; kdyby, aby', 'Умовний спосіб: bych, bys, by; kdyby, aby'),
    pts: {
      ru: ['«бы» = -l форма + bych / bys / by / bychom / byste / by: pomohl bych.', 'kdyby — «если бы»: Kdybych měl čas… Kdyby bylo hezky…', 'aby — «чтобы»: Učím se, abych udělal zkoušku. Вежливо: Dal bych si kávu.'],
      uk: ['«б» = -l форма + bych / bys / by / bychom / byste / by: pomohl bych.', 'kdyby — «якби»: Kdybych měl čas… Kdyby bylo hezky…', 'aby — «щоб»: Učím se, abych udělal zkoušku. Ввічливо: Dal bych si kávu.'],
    },
    ex: [['já', 'bych'], ['ty', 'bys'], ['on', 'by'], ['my', 'bychom'], ['vy', 'byste'], ['oni', 'by']],
  },
  cz_cmp: {
    title: T('Сравнение: větší, nejlepší', 'Порівняння: větší, nejlepší'),
    pts: {
      ru: ['Сравнительная: -ejší / -ější или -ší: rychlý → rychlejší, mladý → mladší.', 'Превосходная: nej- + сравнительная: nejrychlejší.', 'Особые: dobrý → lepší, špatný → horší, velký → větší, malý → menší. «чем» = než.'],
      uk: ['Вищий ступінь: -ejší / -ější або -ší: rychlý → rychlejší, mladý → mladší.', 'Найвищий: nej- + вищий: nejrychlejší.', 'Особливі: dobrý → lepší, špatný → horší, velký → větší, malý → menší. «ніж» = než.'],
    },
    ex: [['rychlý', 'rychlejší', 'nejrychlejší'], ['dobrý', 'lepší', 'nejlepší'], ['velký', 'větší', 'největší'], ['malý', 'menší', 'nejmenší']],
  },
};

export const MOBS = [
  ['g_cz_byt', '🏠', '#8a5a3a', 'Домовой', 'Домовик'],
  ['g_cz_rod', '👪', '#c8702e', 'Семейный дух', 'Родинний дух'],
  ['g_cz_konj', '🎶', '#5a7aa8', 'Певчий дрозд', 'Співочий дрізд'],
  ['g_cz_akuz', '🎯', '#d8402e', 'Лучник', 'Лучник'],
  ['g_cz_neg', '🙅', '#6a6a6a', 'Дух-отказник', 'Дух-відмовник'],
  ['g_cz_priv', '🔑', '#d9a43a', 'Ключник', 'Ключник'],
  ['g_cz_time', '🏔️', '#6a7a8a', 'Горный летописец', 'Гірський літописець'],
  ['g_cz_lokal', '🗺️', '#4a7a5a', 'Картограф', 'Картограф'],
  ['g_cz_plural', '🐑', '#c8c2b2', 'Отара', 'Отара'],
  ['g_cz_adj', '🎨', '#8a4a8a', 'Художник', 'Художник'],
  ['g_cz_imper', '📯', '#a3301e', 'Горнист', 'Горніст'],
  ['g_cz_pohyb', '🚲', '#2f6a8a', 'Велосипедист', 'Велосипедист'],
  ['g_cz_modal', '🦉', '#5a4a8a', 'Мудрая сова', 'Мудра сова'],
  ['g_cz_cmp', '🏆', '#d9a43a', 'Чемпион', 'Чемпіон'],
];
