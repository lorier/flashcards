import Lesson from './lesson.js';
import UI from './ui.js';
import DataService from './dataservice.js';

class App{
    constructor(){
        this.lesson;
        this.ui;
    }
    loadUI(){
        let myData = new DataService();
        myData.getData() //returns a promise
         .then( data => {
            this.ui = new UI(data);
        })
        .catch(error => console.error(error));
    }
}
window.onload = () => {
    let app = new App();
    app.loadUI();
}