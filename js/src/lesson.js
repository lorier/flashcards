import Card from "./card.js";

export default class Lesson {
    constructor(data) {
        this.cards;
        this.currentCard = 0;
        this.answerLanguage = "English"
        this.languageSelected = "Spanish";
        this.isRevealed = false;
        this.createDeck(data);
    }
    getLanguageSelected(){
        return this.languageSelected;
    }
    setLanguageSelected(lang){
        //flip the values
        let temp = this.languageSelected;
        this.languageSelected = lang;
        this.answerLanguage = temp;
    }
    getAnswerLanguage(){
        return this.answerLanguage;
    }
    createDeck(cardsData) {
        if (!cardsData) {
            return;
        }
        let tempCards = [];
        tempCards = cardsData.map(obj => {
            return new Card(
            obj.word_type,
            obj.spanish_singular, //removed spanish plural temporarily
            obj.english
            );
        });
        this.cards = this.shuffleCards(tempCards);
        // this.cards = this.cards.slice(0, 5); //temporarily reduce list for testing
        console.log(this.cards);
    }
    shuffleCards(cardsArray) {
        return cardsArray.sort(function() {
            return 0.5 - Math.random();
        })
    }
    getNextCard() {
        if (this.cards.length === this.currentCard){ return } 
        this.currentCard++;
        return this.cards[this.currentCard];
    }
    getPreviousCard(){
        if(this.currentCard === 0){ return }
        this.currentCard--;
        return this.cards[this.currentCard];
    }  
    getCurrentCard(){
        return this.cards[this.currentCard];
    }
}
