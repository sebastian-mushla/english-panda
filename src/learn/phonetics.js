// Транскрипция для словаря. Английский — IPA (британское произношение); русский — слово с ударением.
// Чешское ударение всегда на первом слоге, поэтому для чешского показываем только подсказку о долгих гласных (они уже видны по čárka).
export const IPA = {
  hello: 'həˈləʊ', goodbye: 'ɡʊdˈbaɪ', please: 'pliːz', 'thank you': 'ˈθæŋk juː', yes: 'jes', no: 'nəʊ', sorry: 'ˈsɒri', 'good night': 'ɡʊd ˈnaɪt',
  one: 'wʌn', two: 'tuː', three: 'θriː', four: 'fɔː', five: 'faɪv', six: 'sɪks', seven: 'ˈsevn', eight: 'eɪt', nine: 'naɪn', ten: 'ten',
  red: 'red', blue: 'bluː', green: 'ɡriːn', yellow: 'ˈjeləʊ', black: 'blæk', white: 'waɪt', orange: 'ˈɒrɪndʒ', pink: 'pɪŋk',
  mother: 'ˈmʌðə', father: 'ˈfɑːðə', sister: 'ˈsɪstə', brother: 'ˈbrʌðə', baby: 'ˈbeɪbi', grandmother: 'ˈɡrænmʌðə', grandfather: 'ˈɡrænfɑːðə', family: 'ˈfæməli',
  cat: 'kæt', dog: 'dɒɡ', bird: 'bɜːd', fish: 'fɪʃ', panda: 'ˈpændə', monkey: 'ˈmʌŋki', tiger: 'ˈtaɪɡə', frog: 'frɒɡ',
  apple: 'ˈæpl', banana: 'bəˈnɑːnə', rice: 'raɪs', bread: 'bred', water: 'ˈwɔːtə', tea: 'tiː', milk: 'mɪlk', egg: 'eɡ',
  head: 'hed', eye: 'aɪ', ear: 'ɪə', nose: 'nəʊz', mouth: 'maʊθ', hand: 'hænd', leg: 'leɡ', hair: 'heə',
  tree: 'triː', flower: 'ˈflaʊə', river: 'ˈrɪvə', mountain: 'ˈmaʊntɪn', sun: 'sʌn', moon: 'muːn', rain: 'reɪn', snow: 'snəʊ',
  house: 'haʊs', door: 'dɔː', window: 'ˈwɪndəʊ', table: 'ˈteɪbl', chair: 'tʃeə', bed: 'bed', lamp: 'læmp', cup: 'kʌp',
  eat: 'iːt', drink: 'drɪŋk', sleep: 'sliːp', run: 'rʌn', swim: 'swɪm', read: 'riːd', write: 'raɪt', sing: 'sɪŋ',
  hat: 'hæt', shirt: 'ʃɜːt', dress: 'dres', shoes: 'ʃuːz', coat: 'kəʊt', scarf: 'skɑːf', socks: 'sɒks', trousers: 'ˈtraʊzəz',
  hot: 'hɒt', cold: 'kəʊld', warm: 'wɔːm', sunny: 'ˈsʌni', wind: 'wɪnd', cloud: 'klaʊd', storm: 'stɔːm', rainbow: 'ˈreɪnbəʊ',
  morning: 'ˈmɔːnɪŋ', evening: 'ˈiːvnɪŋ', night: 'naɪt', today: 'təˈdeɪ', tomorrow: 'təˈmɒrəʊ', week: 'wiːk', hour: 'ˈaʊə', minute: 'ˈmɪnɪt',
  school: 'skuːl', shop: 'ʃɒp', park: 'pɑːk', street: 'striːt', bank: 'bæŋk', hospital: 'ˈhɒspɪtl', market: 'ˈmɑːkɪt', bridge: 'brɪdʒ',
  big: 'bɪɡ', small: 'smɔːl', fast: 'fɑːst', slow: 'sləʊ', happy: 'ˈhæpi', sad: 'sæd', new: 'njuː', old: 'əʊld',
  teacher: 'ˈtiːtʃə', doctor: 'ˈdɒktə', cook: 'kʊk', farmer: 'ˈfɑːmə', driver: 'ˈdraɪvə', singer: 'ˈsɪŋə', pilot: 'ˈpaɪlət', nurse: 'nɜːs',
  football: 'ˈfʊtbɔːl', music: 'ˈmjuːzɪk', dance: 'dɑːns', game: 'ɡeɪm', film: 'fɪlm', kite: 'kaɪt', bike: 'baɪk', guitar: 'ɡɪˈtɑː',
  train: 'treɪn', bus: 'bʌs', plane: 'pleɪn', boat: 'bəʊt', map: 'mæp', ticket: 'ˈtɪkɪt', bag: 'bæɡ', road: 'rəʊd',
};

// Русские слова с ударением (знак ́ после ударной гласной). Ключ — английский id слова.
export const RU_STRESS = {
  hello: 'приве́т', goodbye: 'до свида́ния', please: 'пожа́луйста', 'thank you': 'спаси́бо', yes: 'да', no: 'нет', sorry: 'извини́', 'good night': 'споко́йной но́чи',
  one: 'оди́н', two: 'два', three: 'три', four: 'четы́ре', five: 'пять', six: 'шесть', seven: 'семь', eight: 'во́семь', nine: 'де́вять', ten: 'де́сять',
  red: 'кра́сный', blue: 'си́ний', green: 'зелёный', yellow: 'жёлтый', black: 'чёрный', white: 'бе́лый', orange: 'ора́нжевый', pink: 'ро́зовый',
  mother: 'ма́ма', father: 'па́па', sister: 'сестра́', brother: 'брат', baby: 'малы́ш', grandmother: 'ба́бушка', grandfather: 'де́душка', family: 'семья́',
  cat: 'ко́шка', dog: 'соба́ка', bird: 'пти́ца', fish: 'ры́ба', panda: 'па́нда', monkey: 'обезья́на', tiger: 'тигр', frog: 'лягу́шка',
  apple: 'я́блоко', banana: 'бана́н', rice: 'рис', bread: 'хлеб', water: 'вода́', tea: 'чай', milk: 'молоко́', egg: 'яйцо́',
  head: 'голова́', eye: 'глаз', ear: 'у́хо', nose: 'нос', mouth: 'рот', hand: 'рука́', leg: 'нога́', hair: 'во́лосы',
  tree: 'де́рево', flower: 'цвето́к', river: 'река́', mountain: 'гора́', sun: 'со́лнце', moon: 'луна́', rain: 'дождь', snow: 'снег',
  house: 'дом', door: 'дверь', window: 'окно́', table: 'стол', chair: 'стул', bed: 'крова́ть', lamp: 'ла́мпа', cup: 'ча́шка',
  eat: 'есть', drink: 'пить', sleep: 'спать', run: 'бе́гать', swim: 'пла́вать', read: 'чита́ть', write: 'писа́ть', sing: 'петь',
  hat: 'шля́па', shirt: 'руба́шка', dress: 'пла́тье', shoes: 'ту́фли', coat: 'пальто́', scarf: 'шарф', socks: 'носки́', trousers: 'брю́ки',
  hot: 'жа́ркий', cold: 'холо́дный', warm: 'тёплый', sunny: 'со́лнечный', wind: 'ве́тер', cloud: 'о́блако', storm: 'гроза́', rainbow: 'ра́дуга',
  morning: 'у́тро', evening: 'ве́чер', night: 'ночь', today: 'сего́дня', tomorrow: 'за́втра', week: 'неде́ля', hour: 'час', minute: 'мину́та',
  school: 'шко́ла', shop: 'магази́н', park: 'парк', street: 'у́лица', bank: 'банк', hospital: 'больни́ца', market: 'ры́нок', bridge: 'мост',
  big: 'большо́й', small: 'ма́ленький', fast: 'бы́стрый', slow: 'ме́дленный', happy: 'счастли́вый', sad: 'гру́стный', new: 'но́вый', old: 'ста́рый',
  teacher: 'учи́тель', doctor: 'врач', cook: 'по́вар', farmer: 'фе́рмер', driver: 'води́тель', singer: 'певе́ц', pilot: 'пило́т', nurse: 'медсестра́',
  football: 'футбо́л', music: 'му́зыка', dance: 'та́нец', game: 'игра́', film: 'фильм', kite: 'возду́шный змей', bike: 'велосипе́д', guitar: 'гита́ра',
  train: 'по́езд', bus: 'авто́бус', plane: 'самолёт', boat: 'ло́дка', map: 'ка́рта', ticket: 'биле́т', bag: 'су́мка', road: 'доро́га',
};
