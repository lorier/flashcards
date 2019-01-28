import Lesson from "./lesson.js";

export default class UI {
    constructor(data){
        this.data = data;
        this.nextBtn;
        this.testText;
        this.lessonOne = data[0].vocabulary;
        this.lesson = new Lesson(this.lessonOne);

        this.revealed = false;
        
        this.getDomElements();
        this.attachHandlers();
        this.initializeUI();
        this.populateLessons();
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
    }
    populateLessons(){
        this.data.forEach(obj => {
            var option = document.createElement("option");
            option.value = obj.id;
            option.text = obj.name;
            this.lessonSelector.appendChild(option);
        })
    }
    attachHandlers(){
        this.nextBtn.addEventListener('click', (e) => { 
            this.revealNext();
        });
        this.backBtn.addEventListener('click', (e) => {
            this.previousCard();
        })
        this.lessonSelector.addEventListener('change', (e)=>{
            this.selectLesson(e);
        })
        for (let i = 0; i < this.radios.length; i++) {
          this.radios[i].addEventListener("click", e => {
            this.lesson.setLanguageSelected(e.target.value);
            this.updateUI();
          });
        }
    }
    selectLesson(e){
        let selected = this.data.filter(obj => {
            return obj.id == e.target.value;
            })
        console.log(selected);
        this.lesson = new Lesson(selected[0].vocabulary);
        this.initializeUI();

    }
    revealNext(){
        if(this.isRevealed){
            this.answerText.innerText = "";
            this.lesson.getNextCard();
            this.wordType.innerText = this.lesson.getCurrentCard().getWordType();
            this.testText.innerText = this.lesson.getCurrentCard().getPhrase(this.lesson.getLanguageSelected());
            this.nextBtn.innerText = "Reveal"
            this.isRevealed = false;

        }else{
            this.answerText.innerText = this.lesson.getCurrentCard().getPhrase(this.lesson.answerLanguage);
            this.isRevealed = true;
            this.nextBtn.innerText = "Next"
        }
    }
    previousCard(){
        this.lesson.getPreviousCard();
        this.wordType.innerText = this.lesson.getCurrentCard().getWordType();
        this.testText.innerText = this.lesson.getCurrentCard().getPhrase(this.lesson.getLanguageSelected());
        this.answerText.innerText = this.lesson.getCurrentCard().getPhrase(this.lesson.answerLanguage);
        this.isRevealed = true;
        this.nextBtn.innerText = "Next"
    }
    initializeUI(){
        this.answerText.innerText = "";
        this.answer = "";
        this.wordType.innerText = this.lesson.getCurrentCard().getWordType();
        this.testTitleText.innerText = this.lesson.getLanguageSelected();
        this.ansTitleText.innerText = this.lesson.answerLanguage;
        this.testText.innerText = this.lesson.getCurrentCard().getPhrase(this.lesson.getLanguageSelected());
        this.nextBtn.innerText = "Reveal";
        // console.log(this.lesson);
        //manage language selector
        for (var i = 0; i < this.radios.length; i++)
            if (this.radios[i].value === this.lesson.getLanguageSelected() ) {
                this.radios[i].checked;
            }
    }
    updateUI(){
        this.wordType.innerText = this.lesson.getCurrentCard().getWordType();
        this.testTitleText.innerText = this.lesson.getLanguageSelected();
        this.ansTitleText.innerText = this.lesson.answerLanguage;
        this.testText.innerText = this.lesson.getCurrentCard().getPhrase(this.lesson.getLanguageSelected());
        this.answerText.innerText = "";
        this.isRevealed = false;
        this.nextBtn.innerText = "Reveal";
    }
}