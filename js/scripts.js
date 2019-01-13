;(function(){

'use strict';

window.onload = () => {
    
    class Card {
        constructor(word_type, spanish_singular, spanish_plural, english) {
            this.spanish_singular = spanish_singular;
            this.spanish_plural = spanish_plural;
            this.english = english;
            this.word_type = word_type;
        }
        getWordType(){
            return this.word_type;
        }
        getEnglish() {
            return this.english;
        }
        getSpanishSingular() {
            return this.spanish_singular;
        }
        getSpanishPlural() {
            return this.spanish_plural;
        }
    }
    class Lesson {
        constructor(){
            this.cards
            this.cardChoice = 0;
        }
        init(cardsData){ 
            if (!cardsData) { console.log('no cards!'); return }
            let tempCards = []
            tempCards = cardsData.map( obj => {
                return new Card(obj.word_type, obj.spanish_singular, obj.spanish_plural, obj.english)
            }) 
            this.cards = tempCards.sort(function() { return 0.5 - Math.random() }); //randomize the array
            console.log(this.cards);
            this.printCard();
            this.setNewCardButton();
        }
        getCard() {
            let c = this.cards[this.cardChoice];
            this.cardChoice++;
            return c;
        }
        printCard(){
            let card = this.getCard();

            let reveal = document.getElementById("reveal");
            let phrase = document.getElementById("phrase");
            let plural = document.getElementById("revealplural");
            let answer = document.getElementById("answer");
            let wordtype = document.getElementById("wordtype");
            let isSingular = true;
            let revEnglish;

            //reset text areas 
            phrase.innerText = '';
            answer.innerText = '';
            
            phrase.innerText = card.getSpanishSingular();
            wordtype.innerText = card.getWordType();
            reveal.classList.remove("disabled");

            reveal.addEventListener('click', revEnglish =(e) => {
                answer.innerText = card.getEnglish();
                e.target.classList.add("disabled");
                reveal.removeEventListener('click', revEnglish );
            })
            plural.addEventListener('click', () => {
                let s = isSingular ? card.getSpanishPlural() : card.getSpanishSingular();
                phrase.innerText = s;
                isSingular = !isSingular;
            })
        }
        setNewCardButton(){
            let newCard = document.getElementById("newcard");

            newCard.addEventListener('click', (e)=>{
                this.printCard();
            })
        }
    }

    fetch('data/json/vocab.json')
        .then( (response) => {
            return response.json()
        })
        .then( (myVocab) =>{
            // console.log(JSON.stringify(myVocab));
            let newLesson = new Lesson();
            newLesson.init(myVocab);
        })
        .catch(error => console.error(error));
    
} //end window.onload;
})();