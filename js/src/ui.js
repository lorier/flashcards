import Lesson from "./lesson.js";
import StoredCards from "./storedcards.js";

export default class UI {
    constructor(data){
        this.data = data;
        this.lessonOne = this.data['Unit One'];
        this.lesson = new Lesson(this.lessonOne);
        this.storage = new StoredCards();
        this.revealed = false;
        this.nextBtnState = 'on';
        this.boundCallback = e => this.changeCardContent(e);
        
        this.getDomElements();
        this.attachHandlers();
        this.resetUI();
        this.updateStorageUI()
        this.setUpCardLanguage();
        this.populateLessonsSelector();
    }
    getDomElements(){
        //card and associated text fields
        this.wordType = document.querySelector("#wordtype");
        this.testTitleText = document.querySelector("#test-lang-title");
        this.ansTitleText = document.querySelector("#answer-lang-title");
        this.answerText = document.querySelector("#answer");
        this.nextBtn = document.querySelector("#next");
        this.cardNumber = document.querySelector('#card-number');
        this.totalCards = document.querySelector('#total-cards');
        
        //UI components (buttons, select)
        this.testText = document.querySelector("#phrase");
        this.backBtn = document.querySelector("#back");
        this.radios = document.querySelectorAll('input[name="langopt"]');
        this.lessonSelector = document.querySelector('#lessons');
        
        //card storage UI
        this.cardsStored = document.querySelector('#cards-stored');
        this.storeCard = document.querySelector('#save-to-local');
        this.retest = document.querySelector('#retest');
        this.clearStorage = document.querySelector('#clear-storage');
        this.viewStorage = document.querySelector('#view-storage');
    }
    populateLessonsSelector(){
        Object.entries(this.data).forEach(([key]) => {
            var option = document.createElement("option");
            option.value = key;
            option.text = key;
            this.lessonSelector.appendChild(option);    
        })
    }
    attachHandlers(){
        this.nextBtn.addEventListener('click', this.boundCallback );
       
        this.backBtn.addEventListener('click', (e) => {
            this.previousCard();
            this.setBackButton();
        })
        this.lessonSelector.addEventListener('change', (e)=>{
            this.selectLesson(e);
            this.resetUI();
            this.resetRadioButtons();
            this.setUpCardLanguage();
        })
        this.storeCard.addEventListener('click', (e) =>{
            let key = 'card' + this.lesson.getCurrentCardNumber()
            this.storage.saveCard( key, this.lesson.getCurrentCard() );
            this.updateStorageUI();
        })
        this.retest.addEventListener('click', (e) => {
            if(this.storage.getSavedCards().length === 0){ return; }
            let stg = this.storage.getSavedCards();
            console.log(stg);
            this.lesson = new Lesson(stg);
            this.retest.classList.add("disabled");
            this.resetUI();
            this.setUpCardLanguage();  
        })
        this.clearStorage.addEventListener('click', (e) => {
            this.storage.clearCards();
            this.updateStorageUI();
            console.log(window.localStorage);
        })
        this.viewStorage.addEventListener('click', (e) => {
            console.log(this.storage.getSavedCards());
        })

        //set up radio buttons with event listeners and text based on language settings in the lesson class
        for (let i = 0; i < this.radios.length; i++) {  
          this.radios[i].addEventListener("click", e => {
            this.radios.forEach(obj =>{ obj.parentElement.classList.remove('active')})
            e.target.parentElement.classList.add('active');
            this.lesson.setClueLanguage(e.target.value);
            e.target.classList.add(e.target.value);
            this.setUpCardLanguage();
          }, true);
        }
    }
   
    updateStorageUI(){
        let l = this.storage.getSavedCards().length;
        if( l === 0 ){  
            this.cardsStored.innerText = 0;
            this.retest.classList.add("disabled");
        }else{
            this.cardsStored.innerText = l;
            this.retest.classList.remove("disabled");
        }
    }
    selectLesson(e){
        let selected = this.data[e.target.value];
        this.lesson = new Lesson(selected);
    }
    changeCardContent(e){
        let isRevealed,
            text;    
        if( this.isRevealed && this.lesson.currentCard < this.lesson.cards.length ){
            // Get next card
            this.answerText.innerText = "";
            this.lesson.getNextCard();
            this.wordType.innerText = this.lesson.getCurrentCard().getWordType();
            this.testText.innerText = this.lesson.getCurrentCard().getPhrase(this.lesson.getClueLanguage());
            isRevealed = false;
            text = "Reveal"
            this.setBackButton();
            this.cardNumber.innerText = this.lesson.getCurrentCardNumber() + 1;
        }else{
            //are we at the end of the deck? if so, then wrap up
            if( this.lesson.currentCard >= this.lesson.cards.length-1 ){
                isRevealed = true;
                text = "Done!"
                this.answerText.innerText = this.lesson.getCurrentCard().getPhrase(this.lesson.getAnswerLanguage());
                this.nextBtn.removeEventListener('click', this.boundCallback );
                this.nextBtnState = 'off';
                this.setNextButton(isRevealed, text);
                return;
            }
            //if not at the end, reveal the answer
            this.answerText.innerText = this.lesson.getCurrentCard().getPhrase(this.lesson.getAnswerLanguage());
            isRevealed = true;
            text = "Next";
        }
        this.setNextButton(isRevealed, text);
    }
    previousCard(){
        this.lesson.getPreviousCard();
        this.wordType.innerText = this.lesson.getCurrentCard().getWordType();
        this.testText.innerText = this.lesson.getCurrentCard().getPhrase(this.lesson.getClueLanguage());
        this.answerText.innerText = this.lesson.getCurrentCard().getPhrase(this.lesson.getAnswerLanguage());
        this.setNextButton(true, "Next");
    }
    resetUI(){
        if(this.nextBtnState = 'off'){
            this.nextBtn.addEventListener('click', this.boundCallback );
        }
        this.answerText.innerText = "";
        this.cardsStored.innerText = this.storage.getSavedCards().length;
        this.totalCards.innerText = this.lesson.cards.length;
        this.cardNumber.innerText = this.lesson.getCurrentCardNumber() + 1;
        //manage language selector
        this.setNextButton(false, "Reveal");
    }
    resetRadioButtons(){
        for (var i = 0; i < this.radios.length; i++){
            this.radios[i].parentElement.classList.remove('active');
            let x = this.radios[i].value
            if (x === this.lesson.getClueLanguage() ) {
                this.radios[i].checked;
                this.radios[i].parentElement.classList.add('active');
            }
        }
    }
    setUpCardLanguage(){

        //clear answer text, if there is any
        this.answerText.innerText = "";
 
        //update title bars
        this.testTitleText.innerText = this.lesson.getClueLanguage();
        this.ansTitleText.innerText = this.lesson.getAnswerLanguage();
        
        //get the first clue phrase
        this.testText.innerText = this.lesson.getCurrentCard().getPhrase(this.lesson.getClueLanguage());//////
    }
    setBackButton(){
        if(this.lesson.currentCard === 0 ){
            this.backBtn.classList.add('disabled');
        }else{
            this.backBtn.classList.remove('disabled');
        }
        if(this.nextBtnState == 'off'){
            this.nextBtn.addEventListener('click', this.boundCallback );
            this.nextBtnState == 'on'
        }
    }
    setNextButton(isRevealed, buttonText = "Reveal", ){
        this.isRevealed = isRevealed;
        this.nextBtn.innerText = buttonText;
        if(isRevealed) {           
            this.nextBtn.classList.remove('reveal');
            this.nextBtn.classList.add('next');
        }else{
            this.nextBtn.classList.remove('next');
            this.nextBtn.classList.add('reveal');
        }
    }
}