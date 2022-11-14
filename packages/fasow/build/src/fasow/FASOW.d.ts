import IDataHandler from "./datahandler/IDataHandler";
import ITowerHandler from "./reflection/tower/ITowerHandler";
export default class FASOW {
    private dataHandler;
    private towerHandler;
    constructor();
    loadActions(): void;
    loadAgents(): void;
    loadEnvironments(): void;
    loadExperiments(): void;
    getDataHandler(): IDataHandler;
    getTowerHandler(): ITowerHandler;
}
