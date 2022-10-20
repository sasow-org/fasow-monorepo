import Agent, { AgentState } from "../../agent/Agent";
import AgentAPI from "../../agent/IAgentAPI";
import ScenarioAPI from "../../scenarios/IScenarioAPI";
import EnvironmentTwitter from "../../scenarios/twitter/EnvironmentTwitter";
import TwitterAgent from "../../scenarios/twitter/TwitterAgent";
import Experiment from "../Experiment";
import GenericExperiment from "../GenericExperiment";
import IExperimentStrategy from "../IExperimentStrategy";
import MetaExperimentConfig from "../MetaExperimentConfig";

export default class MessageRepetitionStrategy implements IExperimentStrategy {
  doStrategy(): Experiment {
    const config: MetaExperimentConfig = {
      id: -1,
      environmentType: "EnvironmentTwitter",
      name: "test experiment",
      description: "test description",
      detailedData: true,
      essentialData: true,
      maxRepetitions: 30,
      networkSize: 1000,
      seedSize: 50,
      type: "GenericExperiment",
      periods: 20,
      metaAgentConfigs: [
        {
          id: 0,
          name: "hub",
          followingsPercentage: 0,
          followersPercentage: 5,
          type: "TwitterAgent",
          quantity: 50,
          isSeed: true,
          state: AgentState.READY_TO_SHARE,
          actionsConfigs: [
            {
              id: 0,
              name: "ActionRead",
              type: "ActionRead",
              probability: 0.05,
            },
            {
              id: 1,
              name: "ActionShare",
              type: "ActionShare",
              probability: 0.05,
            },
          ],
        },
        {
          id: 1,
          name: "avr",
          followingsPercentage: 0,
          followersPercentage: 3,
          type: "TwitterAgent",
          quantity: 950,
          isSeed: false,
          state: AgentState.NOT_READ,
          actionsConfigs: [
            {
              id: 0,
              name: "ActionRead",
              type: "ActionRead",
              probability: 0.03,
            },
            {
              id: 1,
              name: "ActionShare",
              type: "ActionShare",
              probability: 0.05,
            },
          ],
        },
      ],
    };

    ScenarioAPI.registerNewEnvironment(
      new EnvironmentTwitter(config),
      "EnvironmentTwitter"
    );
    AgentAPI.registerNewAgent(new TwitterAgent(), "TwitterAgent");
    AgentAPI.registerMetaConfigs(config.metaAgentConfigs);
    const aux: GenericExperiment = new GenericExperiment(config);

    return aux;
  }
}
