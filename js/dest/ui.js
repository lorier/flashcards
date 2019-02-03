import Lesson from "./lesson.js";

export default class UI {
    constructor(data){
        this.data = data;
        // console.log(this.data);
        this.nextBtn;
        this.testText;
        this.lessonOne = this.data['Unit One'];
        this.lesson = new Lesson(this.lessonOne);
        console.log(this.lessonOne);
        this.revealed = false;
        
        this.getDomElements();
        this.attachHandlers();
        this.initializeUI();
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
        this.nextBtn.addEventListener('click', (e) => { 
            this.revealNext(e);
        });
        this.backBtn.addEventListener('click', (e) => {
            this.previousCard();
        })
        this.lessonSelector.addEventListener('change', (e)=>{
            this.selectLesson(e);
        })
        for (let i = 0; i < this.radios.length; i++) {  
          this.radios[i].addEventListener("click", e => {
            const cls = ['active', 'remove'];
            this.radios.forEach(obj =>{ obj.parentElement.classList.remove(...cls)})
            e.target.parentElement.classList.add(...cls);
            this.lesson.setLanguageSelected(e.target.value);
            e.target.classList.add(e.target.value);
            this.updateUI();
          }, true);
        }
    }
    selectLesson(e){
        console.log(e.target.value);
        let selected = this.data[e.target.value];
        console.log(selected);
        this.lesson = new Lesson(selected);
        this.initializeUI();

    }
    revealNext(e){
        if(this.isRevealed){
            this.answerText.innerText = "";
            this.lesson.getNextCard();
            this.wordType.innerText = this.lesson.getCurrentCard().getWordType();
            this.testText.innerText = this.lesson.getCurrentCard().getPhrase(this.lesson.getLanguageSelected());
            this.nextBtn.innerText = "Reveal"
            console.log(e.target.classList);
            e.target.classList.add('reveal');
            e.target.classList.remove('next');
            this.isRevealed = false;

        }else{
            this.answerText.innerText = this.lesson.getCurrentCard().getPhrase(this.lesson.answerLanguage);
            this.isRevealed = true;
            e.target.classList.remove('reveal');
            e.target.classList.add('next');
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
        this.testTitleText.classList.add(this.lesson.getLanguageSelected());
        this.ansTitleText.classList.add(this.lesson.answerLanguage);
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
        
        this.testTitleText.className = '';
        this.testTitleText.classList.add(this.lesson.getLanguageSelected());
        this.testTitleText.innerText = this.lesson.getLanguageSelected();
        
        this.ansTitleText.innerText = this.lesson.answerLanguage;
        this.ansTitleText.className = '';
        this.ansTitleText.classList.add(this.lesson.answerLanguage);
        this.testText.innerText = this.lesson.getCurrentCard().getPhrase(this.lesson.getLanguageSelected());
        this.answerText.innerText = "";
        this.isRevealed = false;
        this.nextBtn.innerText = "Reveal";
    }
}