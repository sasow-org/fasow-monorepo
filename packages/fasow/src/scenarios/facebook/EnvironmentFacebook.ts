import RowData from "../../data/RowData";
import Environment from "../../environment/Environment";
import MetaExperimentConfig from "../../experiment/MetaExperimentConfig";

export default class EnvironmentFacebook extends Environment {
  // eslint-disable-next-line class-methods-use-this
  getCountStates(): RowData {
    return new RowData();
  }

  run(): void {
    while (this.currentPeriod < this.periods) {
      this.step();
    }
  }

  step(): void {
    this.seeds.forEach((agent) => {
      agent.doActions();
    });
  }

  createEnvironment(environmentConfig: MetaExperimentConfig): Environment {
    return new EnvironmentFacebook(environmentConfig);
  }
}
