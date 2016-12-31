import User from './models/user';
import Word from './models/word';
import wordlist from './resource/n1';

export default function () {
  var awww=[{"kanji":"嗚呼","kana":"ああ","meaning":"Ah!, Oh!, Alas!"},{"kanji":"運送","kana":"うんそう","meaning":"shipping, marine transportation"},{"kanji":"運賃","kana":"うんちん","meaning":"freight rates, shipping expenses, fare"},
  {"kanji":"云々","kana":"うんぬん","meaning":"and so on, and so forth, comment"},{"kanji":"運搬","kana":"うんぱん","meaning":"transport, carriage"},{"kanji":"運命","kana":"うんめい","meaning":"fate"},
  {"kanji":"運輸","kana":"うんゆ","meaning":"transportation"},{"kanji":"運用","kana":"うんよう","meaning":"making use of, application, investment, practical use"},{"kanji":"会","kana":"え","meaning":"understanding"},
  {"kanji":"重","kana":"え","meaning":"-fold, -ply"},{"kanji":"","kana":"えい","meaning":"ray (fish)"},{"kanji":"映写","kana":"えいしゃ","meaning":"projection"},
  {"kanji":"英字","kana":"えいじ","meaning":"English letter (character)"},{"kanji":"衛生","kana":"えいせい","meaning":"health, hygiene, sanitation, medical"},{"kanji":"映像","kana":"えいぞう","meaning":"reflection, image"}];
  console.log(wordlist.length);
  // fetch('./resource/n1.json')
  // .then((res) => res.json())
  // .then((data) => {
  //   console.log('data:', data);
  // });
  function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
  }
  function getOtherRandom(index, total){
    var result =  Math.floor(Math.random() * total) - 1;
    if(result<0||result == index) return getOtherRandom(index, total);
    else return result;
  }
  // init volcabulary database
  Word.count().exec((err, count) =>{
    if (count > 0) {
      return;
    }
    shuffle(wordlist);

    var words = [];
    for(var i=0;i<wordlist.length;i++){
      var w = wordlist[i];
      var options = [];
      options.push(w.meaning);
      var oi = getOtherRandom(i, wordlist.length);
      options.push(wordlist[oi].meaning);
      options.push(wordlist[(oi+i+100)%wordlist.length].meaning);
      options.push(wordlist[(oi+515)%wordlist.length].meaning);
      options.push(wordlist[(oi+1024)%wordlist.length].meaning);

      shuffle(options);

      var word = new Word({
        kana: w.kana,
        kanji: w.kanji,
        meaning: w.meaning,
        options: options,
        id: i
      });
      words.push(word);
    }

    Word.create(words, (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });

  User.count().exec((err, count) =>{
    if (count > 0) {
      return;
    }
    const user = new User({ name: 'N1 Tester', wordid: 0 });

    User.create([user], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
