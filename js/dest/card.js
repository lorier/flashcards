 export default class Card {
      constructor(word_type, spanish_singular, english) {
        this.spanish_singular = spanish_singular;
        this.english = english;
        this.word_type = word_type;
      }
      getPhrase(lang) {
        return lang === "English" ? this.english : this.spanish_singular;
      }
      getWordType() {
        return this.word_type;
      }
      // getSpanishPlural() {
      //   return this.spanish_plural;
      // }
}