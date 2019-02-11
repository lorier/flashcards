 export default class Card {
      constructor(id, word_type, spanish, english) {
        this.id = id;
        this.spanish = spanish;
        this.english = english;
        this.word_type = word_type;
      }
      getPhrase(lang) {
        return lang === "English" ? this.english : this.spanish;
      }
      getWordType() {
        return this.word_type;
      }
}