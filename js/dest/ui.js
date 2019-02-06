import Lesson from "./lesson.js";

export default class UI {
    constructor(data){
        this.data = data;
        this.nextBtn;
        this.testText;
        this.lessonOne = this.data['Unit One'];
        this.lesson = new Lesson(this.lessonOne);
        this.revealed = false;
        this.nextBtnCallback;
        this.nextBtnState = 'on';
        this.boundCallback = e => this.changeCardContent(e);
        
        this.getDomElements();
        this.attachHandlers();
        this.resetUI();
        this.setUpCardLanguage();
        this.populateLessonsSelector();
    }
    getDomElements(){
        this.nextBtn = document.querySelector("#next");
        this.testText = document.querySelector("#phrase");
        this.backBtn = document.querySelector("#back");
        this.wordType = document.querySelector("#wordtype");
        this.testTitleText = document.querySelector("#test-lang-title");
        this.ansTitleText = document.querySelector("#answer-lang-title");
        this.answerText = document.querySelector("#answer");
        this.radios = document.querySelectorAll('input[name="langopt"]');
        this.lessonSelector = document.querySelector('#lessons');
        this.cardNumber = document.querySelector('#card-number');
        this.totalCards = document.querySelector('#total-cards');
        this.storeCard = document.querySelector('#save-to-local');
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
            localStorage.setItem(key, JSON.stringify( this.lesson.getCurrentCard() ));
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