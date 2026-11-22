// Венгерские слова для словарных тем words_ext: id (en) → [слово, пример с пропуском ___ в словарной форме].
const N = (w) => [w, 'Ez egy ___.'];       // существительное
const V = (w) => [w, 'Szeretnék ___.'];     // глагол (инфинитив)
const A = (w) => [w, 'Ez nagyon ___.'];     // прилагательное
export const HU_EXT = {
  // school
  book: ['könyv', 'Olvasok egy ___et.'.replace('___et', '___')], pen: N('toll'), pencil: N('ceruza'), teacher: ['tanár', 'A ___ kedves.'],
  student: ['diák', 'Jó ___ vagyok.'], desk: ['pad', 'Új a ___.'], lesson: ['óra', 'Az ___ kilenckor kezdődik.'],
  homework: ['házi feladat', 'Kész a ___.'], bag: ['táska', 'Nehéz a ___.'], classroom: ['osztályterem', 'Nagy az ___.'],
  // days
  Monday: ['hétfő', 'Ma ___ van.'], Tuesday: ['kedd', 'Ma ___ van.'], Wednesday: ['szerda', 'Ma ___ van.'], Thursday: ['csütörtök', 'Ma ___ van.'],
  Friday: ['péntek', 'Ma ___ van.'], Saturday: ['szombat', 'Ma ___ van.'], Sunday: ['vasárnap', 'Ma ___ van.'], weekend: ['hétvége', 'Jó ___t!'.replace('___t', '___')],
  month: ['hónap', 'Ez a ___ hideg.'], year: ['év', 'Boldog új ___et!'.replace('___et', '___')],
  // rooms
  kitchen: ['konyha', 'Nagy a ___.'], bedroom: ['hálószoba', 'Kék a ___.'], bathroom: ['fürdőszoba', 'Fent van a ___.'],
  'living room': ['nappali', 'Nagy a ___.'], sofa: ['kanapé', 'Puha a ___.'], chair: ['szék', 'Ez a ___ fából van.'], lamp: ['lámpa', 'Ég a ___.'],
  mirror: ['tükör', 'Tiszta a ___.'], fridge: ['hűtő', 'Tele van a ___.'], stairs: ['lépcső', 'Hosszú a ___.'],
  // fruit
  banana: ['banán', 'Sárga a ___.'], 'orange juice': ['narancslé', 'Édes a ___.'], grapes: ['szőlő', 'Édes a ___.'], strawberry: ['eper', 'Piros az ___.'],
  lemon: ['citrom', 'Savanyú a ___.'], potato: ['krumpli', 'Nagy a ___.'], tomato: ['paradicsom', 'Piros a ___.'], carrot: ['répa', 'Narancssárga a ___.'],
  onion: ['hagyma', 'Csíp a ___.'], cucumber: ['uborka', 'Zöld az ___.'],
  // shopping
  price: ['ár', 'Mennyi az ___?'], cheap: A('olcsó'), expensive: A('drága'), buy: V('vásárolni'), sell: V('eladni'), pay: ['fizetni', 'Kártyával szeretnék ___.'],
  receipt: ['blokk', 'Itt a ___.'], size: ['méret', 'Milyen ___?'], customer: ['vásárló', 'A ___ vár.'], sale: ['akció', 'Ma ___ van.'],
  // health
  doctor: ['orvos', 'Az ___ kedves.'], medicine: ['gyógyszer', 'Ez a ___ segít.'], headache: ['fejfájás', 'Erős a ___.'], fever: ['láz', 'Magas a ___.'],
  cough: ['köhögés', 'Csúnya a ___.'], ill: ['beteg', 'Ma ___ vagyok.'], healthy: ['egészséges', 'A gyümölcs ___.'], pharmacy: ['gyógyszertár', 'Zárva a ___.'],
  pain: ['fájdalom', 'Elmúlt a ___.'], rest: ['pihenni', 'Most ___ kell.'],
  // sport
  football: ['foci', 'Szeretem a ___t.'.replace('___t', '___')], team: ['csapat', 'Nyert a ___!'], win: ['nyerni', 'Szeretnénk ___.'], lose: ['veszíteni', 'Nem akarok ___.'],
  ball: ['labda', 'Kerek a ___.'], swimming: ['úszás', 'Egészséges az ___.'], match: ['meccs', 'Hatkor kezdődik a ___.'], coach: ['edző', 'Kiabál az ___.'],
  score: ['eredmény', 'Mi az ___?'], bike: ['bicikli', 'Új a ___.'],
  // kitchen
  knife: ['kés', 'Éles a ___.'], fork: ['villa', 'Tiszta a ___.'], spoon: ['kanál', 'Kicsi a ___.'], plate: ['tányér', 'Fehér a ___.'], pan: ['serpenyő', 'Forró a ___.'],
  oven: ['sütő', 'Meleg a ___.'], cook: ['főzni', 'Szeretek ___.'], boil: ['forralni', 'Vizet kell ___.'], recipe: ['recept', 'Egyszerű a ___.'], salt: ['só', 'Fehér a ___.'],
  // feelings
  angry: ['dühös', 'Apa ___.'], tired: ['fáradt', '___ vagyok.'], scared: ['ijedt', 'A macska ___.'], bored: ['unatkozó', 'Ő egy ___ gyerek.'],
  proud: ['büszke', '___ vagyok rád.'], surprised: ['meglepett', 'Nagyon ___ volt.'], worried: ['aggódó', 'Anya ___.'], excited: ['izgatott', 'A gyerekek ___ak.'.replace('___ak', '___')],
  lonely: ['magányos', '___ vagyok.'], calm: ['nyugodt', 'Maradj ___!'],
  // transport
  train: ['vonat', 'Késik a ___.'], plane: ['repülő', 'Magasan repül a ___.'], ticket: ['jegy', 'Drága a ___.'], station: ['pályaudvar', 'Nagy a ___.'],
  airport: ['repülőtér', 'Messze van a ___.'], tram: ['villamos', 'Gyors a ___.'], taxi: ['taxi', 'Vár a ___.'], ship: ['hajó', 'A ___ a kikötőben van.'],
  'bus stop': ['megálló', 'Közel van a ___.'], luggage: ['csomag', 'Nehéz a ___.'],
  // work
  job: ['munka', 'Jó ez a ___.'], boss: ['főnök', 'Szigorú a ___.'], colleague: ['kolléga', 'Kedves a ___.'], salary: ['fizetés', 'Alacsony a ___.'],
  interview: ['állásinterjú', 'Holnap lesz az ___.'], meeting: ['megbeszélés', 'Tízkor van a ___.'], office: ['iroda', 'Modern az ___.'],
  skill: ['készség', 'Hasznos ez a ___.'], experience: ['tapasztalat', 'Értékes a ___.'], deadline: ['határidő', 'Pénteken van a ___.'],
  // environment
  pollution: ['szennyezés', 'Nagy probléma a ___.'], recycle: ['újrahasznosítani', 'Kell ___.'], climate: ['éghajlat', 'Változik az ___.'],
  forest: ['erdő', 'Mély az ___.'], waste: ['hulladék', 'Büdös a ___.'], energy: ['energia', 'Drága az ___.'], solar: ['napelemes', 'A tetőn ___ panel van.'],
  flood: ['árvíz', 'Az ___ házakat rombolt.'], protect: ['védeni', 'A természetet kell ___.'], species: ['faj', 'Ritka ez a ___.'],
  // media
  news: ['hírek', 'Szomorúak a ___.'], screen: ['képernyő', 'Törött a ___.'], password: ['jelszó', 'Titkos a ___.'], download: ['letölteni', 'Szeretném ___.'],
  website: ['honlap', 'Új a ___.'], message: ['üzenet', 'Rövid az ___.'], camera: ['fényképezőgép', 'Drága a ___.'], advert: ['reklám', 'Vicces a ___.'],
  channel: ['csatorna', 'Unalmas a ___.'], battery: ['akkumulátor', 'Gyenge az ___.'],
  // money
  bill: ['számla', 'Magas a ___.'], coin: ['érme', 'Régi az ___.'], cash: ['készpénz', 'Elég a ___.'], save: ['spórolni', 'Kell ___.'], spend: ['költeni', 'Nem akarok ___.'],
  loan: ['hitel', 'Nagy a ___.'], rent: ['bérleti díj', 'Magas a ___.'], tax: ['adó', 'Alacsony az ___.'], earn: ['keresni', 'Többet szeretnék ___.'], budget: ['költségvetés', 'Kicsi a ___.'],
  // people
  friendship: ['barátság', 'Erős a ___.'], neighbour: ['szomszéd', 'Hangos a ___.'], wedding: ['esküvő', 'Júniusban lesz az ___.'], trust: ['bízni', 'Szeretnék ___ benned.'],
  argue: ['veszekedni', 'Nem akarok ___.'], partner: ['partner', 'Itt van a ___.'], relative: ['rokon', 'Ő egy ___.'], guest: ['vendég', 'Megjött a ___.'],
  apologise: ['bocsánatot kérni', 'Kell ___.'], respect: ['tisztelet', 'Fontos a ___.'],
  // study
  exam: ['vizsga', 'Holnap lesz a ___.'], university: ['egyetem', 'Régi az ___.'], subject: ['tantárgy', 'Nehéz ez a ___.'], grade: ['jegy', 'Jó a ___.'],
  library: ['könyvtár', 'Csendes a ___.'], dictionary: ['szótár', 'Vastag a ___.'], mistake: ['hiba', 'Kicsi a ___.'], practise: ['gyakorolni', 'Kell ___.'],
  degree: ['diploma', 'Értékes a ___.'], revise: ['ismételni', 'Kell ___.'],
  // society
  government: ['kormány', 'A ___ döntött.'], election: ['választás', 'Májusban lesz a ___.'], citizen: ['állampolgár', 'Minden ___ szavazhat.'],
  poverty: ['szegénység', 'Nagy probléma a ___.'], equality: ['egyenlőség', 'Fontos az ___.'], crime: ['bűnözés', 'Csökken a ___.'],
  charity: ['jótékonyság', 'Segít a ___.'], immigrant: ['bevándorló', 'A ___ dolgozik.'], population: ['lakosság', 'Nő a ___.'], protest: ['tüntetés', 'Békés volt a ___.'],
  // science
  research: ['kutatás', 'Fontos a ___.'], experiment: ['kísérlet', 'Sikertelen volt a ___.'], scientist: ['tudós', 'A ___ megtalálta.'], evidence: ['bizonyíték', 'Nincs ___.'],
  theory: ['elmélet', 'Érdekes az ___.'], discovery: ['felfedezés', 'Nagy ez a ___.'], data: ['adat', 'Új ez az ___.'], measure: ['mérni', 'Kell ___.'],
  planet: ['bolygó', 'Messze van a ___.'], invention: ['találmány', 'Nagy ___ a telefon.'],
  // law
  court: ['bíróság', 'A ___ döntött.'], judge: ['bíró', 'Szigorú a ___.'], lawyer: ['ügyvéd', 'Segített az ___.'], guilty: ['bűnös', 'Ő ___.'], innocent: ['ártatlan', 'Ő ___.'],
  witness: ['tanú', 'A ___ látta.'], rule: ['szabály', 'Érvényes a ___.'], fine: ['bírság', 'Magas a ___.'], police: ['rendőrség', 'Megjött a ___.'], contract: ['szerződés', 'Érvényes a ___.'],
  // business
  company: ['cég', 'Nő a ___.'], profit: ['nyereség', 'Magas a ___.'], market: ['piac', 'Változik a ___.'], product: ['termék', 'Új a ___.'], invest: ['befektetni', 'Szeretnénk ___.'],
  manager: ['menedzser', 'Itt van a ___.'], employee: ['alkalmazott', 'Minden ___ bónuszt kapott.'], competition: ['verseny', 'Erős a ___.'], brand: ['márka', 'Híres a ___.'],
  'customer service': ['ügyfélszolgálat', 'Gyors az ___.'],
  // arts
  painting: ['festmény', 'Szép a ___.'], artist: ['művész', 'A ___ fest.'], exhibition: ['kiállítás', 'Nyitva van a ___.'], novel: ['regény', 'Hosszú a ___.'],
  poem: ['vers', 'Rövid a ___.'], stage: ['színpad', 'Nagy a ___.'], audience: ['közönség', 'Tapsol a ___.'], sculpture: ['szobor', 'Régi a ___.'],
  concert: ['koncert', 'Jó volt a ___.'], director: ['rendező', 'Híres a ___.'],
  // ideas
  opinion: ['vélemény', 'Érdekes a ___.'], agree: ['egyetérteni', 'Szeretnék ___.'], disagree: ['nem érteni egyet', 'Kell ___.'], advantage: ['előny', 'Világos az ___.'],
  disadvantage: ['hátrány', 'Az ár a ___.'], solution: ['megoldás', 'Egyszerű a ___.'], argument: ['érv', 'Erős az ___.'], belief: ['meggyőződés', 'Erős a ___.'],
  doubt: ['kétség', 'Maradt egy ___.'], consider: ['megfontolni', 'Kérlek, ___.'],
  // mind
  anxiety: ['szorongás', 'Erős a ___.'], confidence: ['önbizalom', 'Hiányzik az ___.'], memory: ['memória', 'Jó a ___.'], motivation: ['motiváció', 'Gyenge a ___.'],
  habit: ['szokás', 'Rossz ___.'], behaviour: ['viselkedés', 'Furcsa volt a ___.'], instinct: ['ösztön', 'Nem hazudik az ___.'], stress: ['stressz', 'Nagy a ___.'],
  'self-esteem': ['önértékelés', 'Nő az ___.'], empathy: ['empátia', 'Fontos az ___.'],
  // speech
  persuade: ['meggyőzni', 'Kell ___.'], claim: ['állítani', 'Mást szeretnék ___.'], emphasise: ['hangsúlyozni', 'Szeretném ___.'], negotiate: ['tárgyalni', 'Kell ___.'],
  rumour: ['pletyka', 'Ez csak ___.'], criticism: ['kritika', 'Kemény volt a ___.'], statement: ['nyilatkozat', 'Rövid volt a ___.'], misunderstanding: ['félreértés', 'Ez ___ volt.'],
  compromise: ['kompromisszum', 'Igazságos a ___.'], hint: ['célzás', 'Világos volt a ___.'],
  // academic
  analyse: ['elemezni', 'Kell ___.'], hypothesis: ['hipotézis', 'Beigazolódott a ___.'], significant: ['jelentős', 'A különbség ___.'], approach: ['megközelítés', 'Új a ___.'],
  assess: ['értékelni', 'Kell ___.'], conclusion: ['következtetés', 'Világos a ___.'], framework: ['keret', 'Szilárd a ___.'], principle: ['elv', 'Érvényes az ___.'],
  survey: ['felmérés', 'A ___ változást mutat.'], source: ['forrás', 'Megbízható a ___.'],
  // world
  inequality: ['egyenlőtlenség', 'Nő az ___.'], refugee: ['menekült', 'A ___ otthont talált.'], drought: ['aszály', 'Az ___ tönkretette a termést.'],
  famine: ['éhínség', 'Szörnyű volt az ___.'], conflict: ['konfliktus', 'Évekig tartott a ___.'], corruption: ['korrupció', 'Árt a ___.'],
  sustainable: ['fenntartható', 'A fejlődés ___.'], emission: ['kibocsátás', 'Magas a ___.'], vaccine: ['vakcina', 'Működik a ___.'], peace: ['béke', 'Törékeny a ___.'],
};
