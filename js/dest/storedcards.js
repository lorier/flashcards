export default class StoredCards {
    constructor(){
    }
    saveCard(key, card){
        localStorage.setItem(key, JSON.stringify( card ));
    }
    getSavedCards(){
        return this.getLocalStorage();
    }
    clearCards(){
        localStorage.clear();
    }
    getLocalStorage() {
        let values = [],
            keys = Object.keys(localStorage),
            i = keys.length;
        while ( i-- ) {
            let str = localStorage.getItem(keys[i]);
            str = JSON.parse(str);
            values.push( str );
        }
        return values;
    }
}