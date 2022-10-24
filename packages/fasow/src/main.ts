import GenericExperiment from "./experiment/GenericExperiment";
import MessageRepetitionStrategy from "./experiment/strategies/message-repetition-strategy";
import ScenarioAPI from "./scenarios/IScenarioAPI";
import loadScenarios from "./scenarios/ScenarioLoader";
import EnvironmentTwitter from "./scenarios/twitter/EnvironmentTwitter";
import TowerHandler from "./tower/TowerHandler";

/*
class Factory {
  list: Map<string, IAgentCreator> = new Map<string, IAgentCreator>();

  // eslint-disable-next-line class-methods-use-this
  create(agent: Agent, configAgent: MetaAgentConfig): Agent {
    console.log(this.list)
    // @ts-ignore
    return this.list.get(agent.name).createAgent(-1, configAgent);
  }

  registerClass(agent: Agent) {
    // @ts-ignore
    this.list.set(agent.name, agent);
  }
}

const factory = new Factory();
// @ts-ignore
factory.registerClass(TwitterAgent);
// @ts-ignore
// const agent: TwitterAgent = factory.create(TwitterAgent, config.metaAgentConfigs[0]);
const agent : TwitterAgent = new TwitterAgent();
console.log("Now Notify Method")
console.log("POST CALLING NOTIFY ",agent.notify(TwitterAgent, config.metaAgentConfigs[0]))


const x = (...names: any) => {
  console.log(names);
  const data = names;
  console.log(data.keyName);
};

type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

function ayuda<T>(object: T, key: KeysMatching<T, string>) {
  console.log("Object: ", object);
  console.log("KeysMatching: ", key);
}

ayuda({ keyA: "hello", keyB: 123 }, "keyA"); // OK


 */
// const agent1 = new TwitterAgent().setConfig(1, config.metaAgentConfigs[0]);
// const result = agent1.getData({ id: true, state: true, followings: true });
// console.log(result);

/*

const doExperimentExample = () => {
  const config: MetaExperimentConfig = {
    id: -1,
    name: "test experiment",
    description: "test description",
    maxRepetitions: 1,
    type: GenericExperiment,
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
  const exp: GenericExperiment = new GenericExperiment(config);
  exp.run();
};
doExperimentExample();

 */

loadScenarios();
const strategyRef = new MessageRepetitionStrategy();
TowerHandler.addNewExperiment(strategyRef);
TowerHandler.setExperiment(strategyRef);
TowerHandler.run();
