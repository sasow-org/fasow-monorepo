import RowData from "../../data/RowData";
import Environment from "../../environment/Environment";
import MetaExperimentConfig from "../../experiment/MetaExperimentConfig";

export default class EnvironmentTwitter extends Environment {
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

  // eslint-disable-next-line class-methods-use-this
  createEnvironment(environmentConfig: MetaExperimentConfig): Environment {
    return new EnvironmentTwitter(environmentConfig);
  }

  // eslint-disable-next-line class-methods-use-this
  getCountStates(): RowData {
    return new RowData();
  }
}
