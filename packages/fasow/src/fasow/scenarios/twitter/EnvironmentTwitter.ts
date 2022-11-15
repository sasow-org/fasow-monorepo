import { DataHandler, TimeKeeper } from "../../../main";
import Environment from "../../abm/Environment";
import MetaEnvironmentConfig from "../../config/metaconfig/MetaEnvironmentConfig";

export default class EnvironmentTwitter extends Environment {
  public run(): void {
    while (TimeKeeper.canNextTick()) {
      this.step();
      console.log(
        "On Step: ",
        TimeKeeper.nextTick(),
        " of (",
        TimeKeeper.getMaxTick(),
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

  createEnvironment(scenarioConfig: MetaEnvironmentConfig): Environment {
    return new EnvironmentTwitter().setConfig(scenarioConfig);
  }
}
