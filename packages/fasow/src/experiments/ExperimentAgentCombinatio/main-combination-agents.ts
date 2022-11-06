import FASOW from "../../fasow/FASOW";
import { AgentState } from "../../fasow/abm/interfaces/Agent/AgentState";
import ActionRead from "../../fasow/abm/wom/custom-actions/ActionRead";
import ActionShare from "../../fasow/abm/wom/custom-actions/ActionShare";
import MetaActionConfig from "../../fasow/config/metaconfig/MetaActionConfig";
import MetaAgentConfig from "../../fasow/config/metaconfig/MetaAgentConfig";
import IDataHandler from "../../fasow/datahandler/IDataHandler";
import ITowerHandler from "../../fasow/reflection/tower/ITowerHandler";
import EnvironmentTwitter from "../../fasow/scenarios/twitter/EnvironmentTwitter";
import TwitterAgent from "../../fasow/scenarios/twitter/TwitterAgent";
import ExperimentAgentCombination from "./ExperimentAgentCombination";

const fasow: FASOW = new FASOW();
export const DataHandler: IDataHandler = fasow.getDataHandler();
export const TowerHandler: ITowerHandler = fasow.getTowerHandler();
TowerHandler.registerNewExperiment(ExperimentAgentCombination);

const getMetaConfig = (
  name: string,
  percentage: number,
  seed: boolean,
  state: number
): MetaAgentConfig => {
  const configRead: MetaActionConfig = {
    id: 0,
    name: "default-read",
    type: ActionRead,
    probability: 0.5,
  };
  switch (name) {
    case "hub":
      return {
        id: 0,
        name: "hub",
        type: TwitterAgent,
        percentage,
        isSeed: seed,
        state,
        followersPercentage: 1.14225,
        followingsPercentage: 0,
        actionsConfigs: [
          configRead,
          {
            id: 1,
            name: "action-share-hub",
            type: ActionShare,
            probability: 19.3,
          },
        ],
      };
    case "leader":
      return {
        id: 1,
        name: "leader",
        type: TwitterAgent,
        percentage,
        isSeed: seed,
        state,
        followingsPercentage: 0,
        followersPercentage: 1.08,
        actionsConfigs: [
          configRead,
          {
            id: 1,
            name: "action-share-leader",
            type: ActionShare,
            probability: 25.09,
          },
        ],
      };
    default:
      return {
        id: 2,
        type: TwitterAgent,
        percentage,
        isSeed: seed,
        state,
        name: "average",
        followersPercentage: 0.057,
        followingsPercentage: 0,
        actionsConfigs: [
          configRead,
          {
            id: 1,
            name: "action-share-avr",
            type: ActionShare,
            probability: 19.3,
          },
        ],
      };
  }
};

for (let i: number = 10; i < 100; i += 10) {
  const percentageHubOfSeed: number = i;
  const percentageLeaderOfSeed: number = 100 - i;
  console.log("Calculating Percentages of seeds Combinations");
  console.log("Hub: ", percentageHubOfSeed, "Leader: ", percentageLeaderOfSeed);
  const seedPercentage: number = 5;
  const finalPercentageHub: number =
    (percentageHubOfSeed * seedPercentage) / 100;
  const finalPercentageLeader: number =
    (percentageLeaderOfSeed * seedPercentage) / 100;
  const percentageAvr: number = 95;
  console.log("Finals Agents Percentages: ");
  console.log(
    "Hub: ",
    finalPercentageHub,
    " Leader: ",
    finalPercentageLeader,
    " Average: ",
    percentageAvr
  );
  ExperimentAgentCombination.prototype.Strategy = () => {
    const avrConfig: MetaAgentConfig = getMetaConfig(
      "average",
      percentageAvr,
      false,
      AgentState.NOT_READ
    );
    const hubConfig: MetaAgentConfig = getMetaConfig(
      "hub",
      finalPercentageHub,
      true,
      AgentState.READY_TO_SHARE
    );
    const leaderConfig: MetaAgentConfig = getMetaConfig(
      "leader",
      finalPercentageLeader,
      true,
      AgentState.READY_TO_SHARE
    );
    TowerHandler.setExperimentName(`seed-combination-${i}`);
    TowerHandler.setMaxRepetition(10);
    TowerHandler.setScenarioConfig({
      networkSize: 10000,
      maxTick: 20,
      environmentType: EnvironmentTwitter,
      metaAgentsConfigs: [avrConfig, hubConfig, leaderConfig],
    });
    /*
    const configRead: MetaActionConfig = {
      id: 0,
      name: "default-read",
      type: ActionRead,
      probability: 0.5,
    };

    const configHub: MetaAgentConfig = {
      id: 0,
      name: "hub",
      type: TwitterAgent,
      percentage: 95,
      isSeed: false,
      state: AgentState.NOT_READ,
      followersPercentage: 1.14225,
      followingsPercentage: 0,
      actionsConfigs: [
        configRead,
        {
          id: 1,
          name: "action-share-hub",
          type: ActionShare,
          probability: 19.3,
        },
      ],
    };
    const configLeader: MetaAgentConfig = {
      id: 1,
      name: "leader",
      type: TwitterAgent,
      percentage: 95,
      isSeed: false,
      state: AgentState.NOT_READ,
      followingsPercentage: 0,
      followersPercentage: 1.08,
      actionsConfigs: [
        configRead,
        {
          id: 1,
          name: "action-share-leader",
          type: ActionShare,
          probability: 25.09,
        },
      ],
    };
    const configAvr: MetaAgentConfig = {
      id: 2,
      type: TwitterAgent,
      percentage: 95,
      isSeed: false,
      state: AgentState.NOT_READ,
      name: "average",
      followersPercentage: 0.057,
      followingsPercentage: 0,
      actionsConfigs: [
        configRead,
        {
          id: 1,
          name: "action-share-avr",
          type: ActionShare,
          probability: 19.3,
        },
      ],
    };
    const configHubSeed: MetaAgentConfig = {
      id: 0,
      name: "hub-seed",
      type: TwitterAgent,
      percentage: 5,
      isSeed: true,
      state: AgentState.READY_TO_SHARE,
      followersPercentage: 1.14225,
      followingsPercentage: 0,
      actionsConfigs: [
        configRead,
        {
          id: 1,
          name: "action-share-hub",
          type: ActionShare,
          probability: 19.3,
        },
      ],
    };
    const configLeaderSeed: MetaAgentConfig = {
      id: 1,
      name: "leader-seed",
      type: TwitterAgent,
      percentage: 5,
      isSeed: true,
      state: AgentState.READY_TO_SHARE,
      followingsPercentage: 0,
      followersPercentage: 1.08,
      actionsConfigs: [
        configRead,
        {
          id: 1,
          name: "action-share-leader",
          type: ActionShare,
          probability: 25.09,
        },
      ],
    };
    const configAvrSeed: MetaAgentConfig = {
      id: 2,
      name: "average-seed",
      type: TwitterAgent,
      percentage: 5,
      isSeed: true,
      state: AgentState.READY_TO_SHARE,
      followersPercentage: 0.057,
      followingsPercentage: 0,
      actionsConfigs: [
        configRead,
        {
          id: 1,
          name: "action-share-avr",
          type: ActionShare,
          probability: 19.3,
        },
      ],
    };
     */
  };
  TowerHandler.selectExperiment(ExperimentAgentCombination);
  TowerHandler.run();
}

/*
TowerHandler.selectExperiment(ExampleExperiment);
TowerHandler.run();

 */
