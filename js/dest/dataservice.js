export default class Dataservice {
    constructor() {
    }
    async getData() {
        let response = await fetch("data/json/vocabulary.json");
        let json = await response.json();
        return json;
    }
}