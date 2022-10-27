import Action from "../../fasow/abm/Action";
import Experiment from "../../fasow/abm/Experiment";
import { AgentState } from "../../fasow/abm/interfaces/Agent/AgentState";
import ActionRead from "../../fasow/abm/wom/custom-actions/ActionRead";
import ActionShare from "../../fasow/abm/wom/custom-actions/ActionShare";
import MetaActionConfig from "../../fasow/config/metaconfig/MetaActionConfig";
import MetaAgentConfig from "../../fasow/config/metaconfig/MetaAgentConfig";
import EnvironmentTwitter from "../../fasow/scenarios/twitter/EnvironmentTwitter";
import TwitterAgent from "../../fasow/scenarios/twitter/TwitterAgent";
import { TowerHandler } from "../../main";

export default class ExperimentAgentCombination extends Experiment {
  Strategy(): void {
    console.log("Original Strategy");
  }

  // eslint-disable-next-line class-methods-use-this
  createExperiment(): Experiment {
    return new ExperimentAgentCombination();
  }
}
