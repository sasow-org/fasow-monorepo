import RowData from "../../data/RowData";
import Environment from "../../environment/Environment";
import MetaScenarioConfig from "../MetaScenarioConfig";

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
      agent.step();
    });
  }

  createEnvironment(environmentConfig: MetaScenarioConfig): Environment {
    return new EnvironmentFacebook().setConfig(environmentConfig);
  }
}
