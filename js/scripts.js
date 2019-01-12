;(function(){

'use strict';

window.onload = () => {
    var cards = [];
    
    class Card {
        constructor(spanish_singular, spanish_plural, english) {
            this.spanish_singular = spanish_singular;
            this.spanish_plural = spanish_plural;
            this.english = english;
        }
        revealEnglish() {
            console.log(this.english)
        }
    }
    
    function setUpCards(cardsData) {
        //create card objects
        if (!cardsData) { console.log('no cards!'); return }
        
        cards = cardsData.map( obj => {
            return new Card(obj.spanish_singular, obj.spanish_plural, obj.english)
        }) 
        // console.log(cards)
    }
    
    //TODO - cache results so we don't fetch on every load
    fetch('data/json/vocab.json')
        .then( (response) => {
            return response.json()
        })
        .then( (myVocab) =>{
            // console.log(JSON.stringify(myVocab));
            setUpCards(myVocab);
        })
        .catch(error => console.error(error));
    console.log(cards);
    // cards[0].revealEnglish();
    }
})();