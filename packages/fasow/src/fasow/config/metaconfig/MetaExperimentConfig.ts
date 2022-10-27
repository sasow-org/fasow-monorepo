import type Experiment from "../../abm/Experiment";
import MetaScenarioConfig from "./MetaScenarioConfig";

export default interface MetaExperimentConfig {
  // Experiment Metadata
  readonly id: number;
  name: string;
  description: string;
  type: typeof Experiment;
  maxRepetitions: number;
  // Scenario Metadata
  scenarioConfig: MetaScenarioConfig;
  // DataHandler Metadata
  essentialData: boolean;
  detailedData: boolean;
}
