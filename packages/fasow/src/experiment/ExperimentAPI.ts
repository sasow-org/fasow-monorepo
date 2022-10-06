
export default class ExperimentAPI {
    private static instance: ExperimentAPI;

    static getInstance() : ExperimentAPI {
        if (this.instance === undefined) {
            this.instance = new ExperimentAPI()
        }
        return this.instance;
    }
}