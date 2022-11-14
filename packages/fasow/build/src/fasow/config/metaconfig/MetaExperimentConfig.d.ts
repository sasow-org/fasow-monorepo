import type Experiment from "../../abm/Experiment";
import MetaScenarioConfig from "./MetaScenarioConfig";
export default interface MetaExperimentConfig {
    readonly id: number;
    name: string;
    description: string;
    type: typeof Experiment;
    maxRepetitions: number;
    scenarioConfig: MetaScenarioConfig;
    essentialData: boolean;
    detailedData: boolean;
}
