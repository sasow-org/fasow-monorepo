
export default class ScenarioAPI {
    private static instance : ScenarioAPI;

    static getInstance() : ScenarioAPI {
        if(this.instance === undefined) {
            this.instance = new ScenarioAPI();
        }
        return this.instance;
    }
}