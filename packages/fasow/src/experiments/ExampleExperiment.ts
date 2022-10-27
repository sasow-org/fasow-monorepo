import Experiment from "../fasow/abm/Experiment";
import { AgentState } from "../fasow/abm/interfaces/Agent/AgentState";
import ActionRead from "../fasow/abm/wom/custom-actions/ActionRead";
import ActionShare from "../fasow/abm/wom/custom-actions/ActionShare";
import EnvironmentTwitter from "../fasow/scenarios/twitter/EnvironmentTwitter";
import TwitterAgent from "../fasow/scenarios/twitter/TwitterAgent";
import { TowerHandler } from "../main";

export default class ExampleExperiment extends Experiment {
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
      percentage: 5,
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
      percentage: 95,
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
  }

  // eslint-disable-next-line class-methods-use-this
  createExperiment(): Experiment {
    return new ExampleExperiment();
  }
}
