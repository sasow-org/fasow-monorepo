import Experiment from "../../fasow/abm/Experiment";
import { AgentState } from "../../fasow/abm/interfaces/Agent/AgentState";
import MetaActionConfig from "../../fasow/config/metaconfig/MetaActionConfig";
import MetaAgentConfig from "../../fasow/config/metaconfig/MetaAgentConfig";
import { TowerHandler } from "../../main";
import CanSaturatedActionRead from "./CanSaturatedActionRead";
import CanSaturatedActionShare from "./CanSaturatedActionShare";
import EffectAgent from "./EffectAgent";
import EnvironmentEffectTwitter from "./EnvironmentEffectTwitter";

export default class MessageRepetition extends Experiment {
  // eslint-disable-next-line class-methods-use-this
  Strategy(): void {
    const actionReadConfig: MetaActionConfig = {
      id: 0,
      name: "read",
      type: CanSaturatedActionRead,
      probability: 6.3,
    };
    const actionShareConfig: MetaActionConfig = {
      id: 1,
      name: "share",
      type: CanSaturatedActionShare,
      probability: 5,
    };
    const avrAgentConfig: MetaAgentConfig = {
      id: 0,
      followersPercentage: 0.01306,
      actionsConfigs: [actionReadConfig, actionShareConfig],
      name: "possible saturated agent",
      type: EffectAgent,
      percentage: 95,
      state: AgentState.NOT_READ,
      followingsPercentage: 0,
      isSeed: false,
    };
    const avrAgentConfigSeed: MetaAgentConfig = {
      id: 1,
      followersPercentage: 0.01306,
      actionsConfigs: [actionReadConfig, actionShareConfig],
      name: "possible saturated agent",
      type: EffectAgent,
      percentage: 5,
      isSeed: true,
      state: AgentState.READY_TO_SHARE,
      followingsPercentage: 0,
    };

    TowerHandler.setExperimentName("Effect of Message Repetition");
    TowerHandler.setMaxRepetition(1);
    TowerHandler.setExperimentDescription(
      "This experiment is for analyze the effect of message repetition in twitter agents on wom marketing campaings"
    );
    TowerHandler.setScenarioConfig({
      networkSize: 100000,
      environmentType: EnvironmentEffectTwitter,
      maxTick: 40,
      metaAgentsConfigs: [avrAgentConfig, avrAgentConfigSeed],
    });
  }

  createExperiment(): Experiment {
    return new MessageRepetition();
  }
}
