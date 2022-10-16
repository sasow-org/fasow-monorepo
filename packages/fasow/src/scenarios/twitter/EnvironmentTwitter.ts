import RowData from "../../data/RowData";
import Environment from "../../environment/Environment";
import MetaExperimentConfig from "../../experiment/MetaExperimentConfig";

export default class EnvironmentTwitter extends Environment {
  run(): void {}

  step(): void {}

  // eslint-disable-next-line class-methods-use-this
  createEnvironment(environmentConfig: MetaExperimentConfig): Environment {
    return new EnvironmentTwitter(environmentConfig);
  }

  getCountStates(): RowData {
    return undefined;
  }
}
