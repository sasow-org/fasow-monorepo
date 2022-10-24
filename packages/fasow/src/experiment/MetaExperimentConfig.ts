import MetaScenarioConfig from "../scenarios/MetaScenarioConfig";
import type Experiment from "./Experiment";

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
