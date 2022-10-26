import ActionRead from "../actions/custom-actions/ActionRead";
import ActionShare from "../actions/custom-actions/ActionShare";
import { AgentState } from "../agent/AgentState";
import { TowerHandler } from "../main";
import EnvironmentTwitter from "../scenarios/twitter/EnvironmentTwitter";
import TwitterAgent from "../scenarios/twitter/TwitterAgent";
import Experiment from "./Experiment";

export default class GenericExperiment extends Experiment {
  // eslint-disable-next-line class-methods-use-this
  Strategy(): void {
    TowerHandler.setNetworkToScenario(EnvironmentTwitter);
    TowerHandler.setNetworkSizeToScenario(1000);
    TowerHandler.setPeriodsToScenario(5);
    TowerHandler.addAgentToScenario({
      id: 0,
      name: "seed",
      isSeed: true,
      state: AgentState.READY_TO_SHARE,
      type: TwitterAgent,
      quantity: 50,
      followersPercentage: 3,
      followingsPercentage: 0,
      actionsConfigs: [
        {
          id: 0,
          name: "read1",
          type: ActionRead,
          probability: 0.05,
        },
        {
          id: 1,
          name: "share",
          type: ActionShare,
          probability: 0.05,
        },
      ],
    });
    TowerHandler.addAgentToScenario({
      id: 1,
      name: "non-seeds",
      isSeed: false,
      state: AgentState.NOT_READ,
      type: TwitterAgent,
      quantity: 950,
      followingsPercentage: 3,
      followersPercentage: 3,
      actionsConfigs: [
        {
          id: 0,
          name: "read1",
          type: ActionRead,
          probability: 0.03,
        },
        {
          id: 1,
          name: "share",
          type: ActionShare,
          probability: 0.05,
        },
      ],
    });
    TowerHandler.setExperimentName("Experiment Message Repetition");
    TowerHandler.setExperimentMaxRepetitions(1);
    TowerHandler.setExperimentDescription("Nothing");
    TowerHandler.setEssentialData(true);
    TowerHandler.setDetailedData(true);
  }

  // eslint-disable-next-line class-methods-use-this
  createExperiment(): Experiment {
    return new GenericExperiment();
  }
}
