"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

;

(function () {
  'use strict';

  window.onload = function () {
    var Card =
    /*#__PURE__*/
    function () {
      function Card(word_type, spanish_singular, spanish_plural, english) {
        _classCallCheck(this, Card);

        this.spanish_singular = spanish_singular;
        this.spanish_plural = spanish_plural;
        this.english = english;
        this.word_type = word_type;
      }

      _createClass(Card, [{
        key: "getPhrase",
        value: function getPhrase() {
          var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';
          return lang === 'en' ? this.english : this.spanish_singular;
        }
      }, {
        key: "getWordType",
        value: function getWordType() {
          return this.word_type;
        }
      }, {
        key: "getSpanishPlural",
        value: function getSpanishPlural() {
          return this.spanish_plural;
        }
      }]);

      return Card;
    }();

    var Lesson =
    /*#__PURE__*/
    function () {
      function Lesson() {
        _classCallCheck(this, Lesson);

        this.cards;
        this.cardChoice = 0;
        this.lessonLanguage = 'sp';
        this.nextBtn = null; //keep a reference to the next button event listener

        this.isRevealed = false;
        this.answerText;
        this.answer;
      }

      _createClass(Lesson, [{
        key: "init",
        value: function init(cardsData) {
          this.createCardList(cardsData);
          this.setLessonLanguage();
          this.printCard();
          this.setNewCardButton();
        }
      }, {
        key: "createCardList",
        value: function createCardList(cardsData) {
          if (!cardsData) {
            return;
          }

          var tempCards = [];
          tempCards = cardsData.map(function (obj) {
            return new Card(obj.word_type, obj.spanish_singular, obj.spanish_plural, obj.english);
          });
          this.cards = tempCards.sort(function () {
            return 0.5 - Math.random();
          }); //randomize the array
          // this.cards = this.cards.slice(0, 5); //temporarily reduce list for testing
        }
      }, {
        key: "shuffleCardsList",
        value: function shuffleCardsList() {}
      }, {
        key: "getCard",
        value: function getCard() {
          var c = this.cards[this.cardChoice];
          this.cardChoice++;
          return c;
        }
      }, {
        key: "printCard",
        value: function printCard() {
          this.answerText = document.querySelector("#answer");
          var card = this.getCard();
          var testText = document.querySelector("#phrase");
          var plural = document.querySelector("#revealplural");
          var wordtype = document.querySelector("#wordtype");
          var testTitleText = document.querySelector("#test-lang-title");
          var ansTitleText = document.querySelector("#answer-lang-title");
          var isSingular = true;
          var next = document.querySelector("#next"); //reset text areas 

          this.answerText.innerText = '';
          this.answer = '';
          testText.innerText = '';
          next.innerText = 'Reveal Answer';
          var phrase = '',
              testTitle = '',
              ansTitle = '';

          if (this.lessonLanguage === 'en') {
            testTitle = 'English';
            ansTitle = 'Spanish';
            phrase = card.getPhrase('en');
            this.answer = card.getPhrase('sp');
            plural.classList.add('hidden');
          } else if (this.lessonLanguage === 'sp') {
            testTitle = 'Spanish';
            ansTitle = 'English';
            phrase = card.getPhrase('sp');
            this.answer = card.getPhrase('en');
            plural.classList.remove('hidden');
          }

          wordtype.innerText = card.getWordType();
          testTitleText.innerText = testTitle;
          ansTitleText.innerText = ansTitle;
          testText.innerText = phrase;
          plural.addEventListener('click', function () {
            var s = isSingular ? card.getSpanishPlural() : card.getPhrase('sp');
            testText.innerText = s;
            isSingular = !isSingular;
          });
        }
      }, {
        key: "setNewCardButton",
        value: function setNewCardButton() {
          var _this = this;

          next.addEventListener('click', this.nextBtn = function (e) {
            if (_this.cards.length === _this.cardChoice) {
              next.innerText = 'Done!';
              next.classList.add('disabled');
            } //if revealed=true, go next, if not, then reveal, set this.reveal = true


            if (_this.revealed === true) {
              _this.revealed = false;

              _this.printCard();

              next.innerText = 'Reveal Answer';
            } else {
              _this.revealed = true;
              _this.answerText.innerText = _this.answer;
              next.innerText = 'Next Clue';
            }
          });
        }
      }, {
        key: "setLessonLanguage",
        value: function setLessonLanguage() {
          var _this2 = this;

          var radios = document.querySelectorAll('input[name="langopt"]');

          for (var i = 0; i < radios.length; i++) {
            radios[i].addEventListener('click', function (e) {
              _this2.lessonLanguage = e.target.value;
              _this2.cardChoice = 0; //reset to beginning

              _this2.printCard();
            });
          }
        }
      }]);

      return Lesson;
    }();

    fetch('data/json/vocab.json').then(function (response) {
      return response.json();
    }).then(function (myVocab) {
      // console.log(JSON.stringify(myVocab));
      var newLesson = new Lesson();
      newLesson.init(myVocab);
    }).catch(function (error) {
      return console.error(error);
    });
  }; //end window.onload;

})();