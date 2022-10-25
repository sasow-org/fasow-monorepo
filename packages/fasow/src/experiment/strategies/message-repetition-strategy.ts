import ActionRead from "../../actions/custom-actions/ActionRead";
import ActionShare from "../../actions/custom-actions/ActionShare";
import { AgentState } from "../../agent/AgentState";
import EnvironmentTwitter from "../../scenarios/twitter/EnvironmentTwitter";
import TwitterAgent from "../../scenarios/twitter/TwitterAgent";
import TowerHandler from "../../tower/TowerHandler";
import IExperimentStrategy from "../IExperimentStrategy";

export default class MessageRepetitionStrategy extends IExperimentStrategy {
  Strategy(): void {
    /*
    const config: MetaExperimentConfig = {
      id: -1,
      name: "test experiment",
      description: "test description",
      maxRepetitions: 1,
      type: "GenericExperiment",
      scenarioConfig: {
        environmentType: EnvironmentTwitter,
        networkSize: 1000,
        seedSize: 50,
        periods: 20,
        metaAgentsConfigs: [
          {
            id: 0,
            name: "hub",
            followingsPercentage: 0,
            followersPercentage: 5,
            type: TwitterAgent,
            quantity: 50,
            isSeed: true,
            state: AgentState.READY_TO_SHARE,
            actionsConfigs: [
              {
                id: 0,
                name: "ActionRead",
                type: ActionRead,
                probability: 0.05,
              },
              {
                id: 1,
                name: "ActionShare",
                type: ActionShare,
                probability: 0.05,
              },
            ],
          },
          {
            id: 1,
            name: "avr",
            followingsPercentage: 0,
            followersPercentage: 3,
            type: TwitterAgent,
            quantity: 950,
            isSeed: false,
            state: AgentState.NOT_READ,
            actionsConfigs: [
              {
                id: 0,
                name: "ActionRead",
                type: ActionRead,
                probability: 0.03,
              },
              {
                id: 1,
                name: "ActionShare",
                type: ActionShare,
                probability: 0.05,
              },
            ],
          },
        ],
      },
      detailedData: true,
      essentialData: true,
    };





    TowerHandler.addAgentToScenario({
      id: 0,
      name:
    })


    TowerHandler.setScenarioConfig({
      environmentType: EnvironmentTwitter,
      periods: 25,
      networkSize: 1000,
      metaAgentsConfigs: [
        {
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
              probability: 0.5,
            },
            {
              id: 1,
              name: "share",
              type: ActionShare,
              probability: 0.5,
            },
          ],
        },
        {
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
              probability: 0.5,
            },
            {
              id: 1,
              name: "share",
              type: ActionShare,
              probability: 0.5,
            },
          ],
        },
      ],
    });



    const expConfig: MetaExperimentConfig = {
      id: 0,
      name: "Experimento Message Repetition",
      type: GenericExperiment,
      maxRepetitions: 1,
      description: "Nothing",
      essentialData: true,
      detailedData: true,
      scenarioConfig: TowerHandler.getScenarioConfig(),
    };

     */
    console.log("ScenarioConfig BEFORE: ", TowerHandler.getScenarioConfig());
    TowerHandler.setNetworkToScenario(EnvironmentTwitter);
    TowerHandler.setNetworkSizeToScenario(1000);
    TowerHandler.setPeriodsToScenario(20);
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
    console.log("ScenarioConfig After: ", TowerHandler.getScenarioConfig());
  }
}
