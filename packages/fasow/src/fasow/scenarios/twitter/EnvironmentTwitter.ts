import { DataHandler } from "../../../main";
import Environment from "../../abm/Environment";
import MetaScenarioConfig from "../../config/metaconfig/MetaScenarioConfig";

export default class EnvironmentTwitter extends Environment {
  public run(): void {
    while (this.canNextTick()) {
      this.step();
      console.log(
        "On Step: ",
        this.nextTick(),
        " of (",
        this.getMaxTick(),
        "): \n",
        DataHandler.getLastOutputRow()
      );

      // console.log("On Step: ", this.getTick(), " of (", this.getMaxTick(), ")");
      //
      console.log();
    }
  }

  step(): void {
    this.agents.forEach((agent) => {
      agent.step();
    });
  }

  createEnvironment(scenarioConfig: MetaScenarioConfig): Environment {
    return new EnvironmentTwitter().setConfig(scenarioConfig);
  }
}
