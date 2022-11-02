import Environment from "../../abm/Environment";
import MetaScenarioConfig from "../../config/metaconfig/MetaScenarioConfig";

export default class EnvironmentTwitter extends Environment {
  public run(): void {
    while (this.canNextTick()) {
      console.log("On Step: ", this.getTick(), " of (", this.getMaxTick(), ")");
      this.step();
      this.nextTick();
    }
  }

  step(): void {
    this.agents.forEach((agent) => {
      agent.step();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  createEnvironment(scenarioConfig: MetaScenarioConfig): Environment {
    return new EnvironmentTwitter().setConfig(scenarioConfig);
  }
}
