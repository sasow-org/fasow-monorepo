import MetaExperimentConfig from "../experiment/MetaExperimentConfig";

export default interface ScenarioStrategy {
  doStrategy(config: MetaExperimentConfig): void;
}
