import Experiment from "./abm/Experiment";
import IDataHandler from "./datahandler/IDataHandler";
import ITowerHandler from "./reflection/tower/ITowerHandler";
import ITimeKeeper from "./timekepper/ITimeKeeper";
export default class FASOW {
    private dataHandler;
    private towerHandler;
    private timeKeeper;
    constructor();
    loadActions(): void;
    loadAgents(): void;
    loadEnvironments(): void;
    loadExperiments(): void;
    getDataHandler(): IDataHandler;
    getTowerHandler(): ITowerHandler;
    getTimeKeeper(): ITimeKeeper;
    getState(): any;
    runExperiment(experiment: typeof Experiment): void;
    runExperimentByName(experiment: string): void;
    selectExperiment(experiment: typeof Experiment): void;
    selectExperimentByName(experiment: string): void;
    runSelectedExperiment(): void;
    private privateRunExperiment;
    registerNewExperiment(experiment: typeof Experiment): void;
    writeFASOWState(): void;
}
