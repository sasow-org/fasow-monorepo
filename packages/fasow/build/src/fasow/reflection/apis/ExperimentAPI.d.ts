import Experiment from "../../abm/Experiment";
import MetaExperimentConfig from "../../config/metaconfig/MetaExperimentConfig";
export default class IExperimentAPI {
    private experimentList;
    private selectedExperiment;
    private experimentConfig;
    constructor();
    registerNewExperiment(exp: typeof Experiment): void;
    setExperimentName(name: string): void;
    setExperimentDescription(description: string): void;
    setExperimentMaxRepetitions(maxRepetitions: number): void;
    setDetailedData(state: boolean): void;
    setEssentialData(state: boolean): void;
    run(): void;
    getExperimentConfig(): MetaExperimentConfig;
    createExperiment(type: typeof Experiment): Experiment;
    createSelectedExperiment(): Experiment;
    selectExperiment(selected: typeof Experiment): void;
}
