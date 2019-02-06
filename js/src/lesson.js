import Card from "./card.js";

export default class Lesson {
    constructor(data) {
        this.cards;
        this.currentCard = 0;
        this.answerLanguage = "English"
        this.ClueLanguage = "Spanish";
        this.isRevealed = false;
        this.createDeck(data);
    }
    getClueLanguage(){
        return this.ClueLanguage;
    }
    getAnswerLanguage(){
        return this.answerLanguage;
    }
    setClueLanguage(lang){
        //flip the values
        let temp = this.ClueLanguage;
        this.ClueLanguage = lang;
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
            obj.spanish, 
            obj.english
            );
        });
        this.cards = this.shuffleCards(tempCards);
        // this.cards = this.cards.slice(0, 5); //temporarily reduce list for testing
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
    getCurrentCardNumber(){
        return this.currentCard;
    }
}
