(function() {
  "use strict";

  window.onload = () => {
    class Card {
      constructor(word_type, spanish_singular, spanish_plural, english) {
        this.spanish_singular = spanish_singular;
        this.spanish_plural = spanish_plural;
        this.english = english;
        this.word_type = word_type;
      }
      getPhrase(lang = "en") {
        return lang === "en" ? this.english : this.spanish_singular;
      }
      getWordType() {
        return this.word_type;
      }
      getSpanishPlural() {
        return this.spanish_plural;
      }
    }
    class Lesson {
      constructor() {
        this.cards;
        this.cardChoice = 0;
        this.lessonLanguage = "sp";
        this.nextBtn = null; //keep a reference to the next button event listener
        this.isRevealed = false;
        this.answerText;
        this.answer;
      }
      init(cardsData) {
        this.createCardList(cardsData);
        this.setLessonLanguage();
        this.printCard();
        this.setNewCardButton();
      }
      createCardList(cardsData) {
        if (!cardsData) {
          return;
        }
        let tempCards = [];
        tempCards = cardsData.map(obj => {
          return new Card(
            obj.word_type,
            obj.spanish_singular,
            obj.spanish_plural,
            obj.english
          );
        });
        this.cards = tempCards.sort(function() {
          return 0.5 - Math.random();
        }); //randomize the array
        // this.cards = this.cards.slice(0, 5); //temporarily reduce list for testing
      }
      shuffleCardsList() {}
      getCard() {
        let c = this.cards[this.cardChoice];
        this.cardChoice++;
        return c;
      }
      printCard() {
        this.answerText = document.querySelector("#answer");

        let card = this.getCard();
        let testText = document.querySelector("#phrase");
        let plural = document.querySelector("#revealplural");
        let wordtype = document.querySelector("#wordtype");
        let testTitleText = document.querySelector("#test-lang-title");
        let ansTitleText = document.querySelector("#answer-lang-title");

        let isSingular = true;
        let next = document.querySelector("#next");

        //reset text areas
        this.answerText.innerText = "";
        this.answer = "";
        testText.innerText = "";
        next.innerText = "Reveal Answer";

        let phrase = "",
          testTitle = "",
          ansTitle = "";

        if (this.lessonLanguage === "en") {
          testTitle = "English";
          ansTitle = "Spanish";
          phrase = card.getPhrase("en");
          this.answer = card.getPhrase("sp");
          plural.classList.add("hidden");
        } else if (this.lessonLanguage === "sp") {
          testTitle = "Spanish";
          ansTitle = "English";
          phrase = card.getPhrase("sp");
          this.answer = card.getPhrase("en");
          plural.classList.remove("hidden");
        }
        wordtype.innerText = card.getWordType();

        testTitleText.innerText = testTitle;
        ansTitleText.innerText = ansTitle;
        testText.innerText = phrase;

        plural.addEventListener("click", () => {
          let s = isSingular ? card.getSpanishPlural() : card.getPhrase("sp");
          testText.innerText = s;
          isSingular = !isSingular;
        });
      }
      setNewCardButton() {
        next.addEventListener(
          "click",
          (this.nextBtn = e => {
            if (this.cards.length === this.cardChoice) {
              next.innerText = "Done!";
              next.classList.add("disabled");
            }
            //if revealed=true, go next, if not, then reveal, set this.reveal = true
            if (this.revealed === true) {
              this.revealed = false;
              this.printCard();
              next.innerText = "Reveal Answer";
            } else {
              this.revealed = true;
              this.answerText.innerText = this.answer;
              next.innerText = "Next Clue";
            }
          })
        );
      }
      setLessonLanguage() {
        let radios = document.querySelectorAll('input[name="langopt"]');
        for (let i = 0; i < radios.length; i++) {
          radios[i].addEventListener("click", e => {
            this.lessonLanguage = e.target.value;
            this.cardChoice = 0; //reset to beginning
            this.printCard();
          });
        }
      }
    }

    fetch("data/json/vocab.json")
      .then(response => {
        return response.json();
      })
      .then(myVocab => {
        // console.log(JSON.stringify(myVocab));
        let newLesson = new Lesson();
        newLesson.init(myVocab);
      })
      .catch(error => console.error(error));
  }; //end window.onload;
})();
