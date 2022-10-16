import RowData from "../../data/RowData";
import Environment from "../../environment/Environment";
import MetaExperimentConfig from "../../experiment/MetaExperimentConfig";

export default class EnvironmentFacebook extends Environment {
  getCountStates(): RowData {
    return undefined;
  }

  run(): void {}

  step(): void {}

  createEnvironment(environmentConfig: MetaExperimentConfig): Environment {
    return new EnvironmentFacebook(environmentConfig);
  }
}
