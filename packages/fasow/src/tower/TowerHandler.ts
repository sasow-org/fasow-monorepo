import Action from "../actions/Action";
import ActionAPI from "../actions/IActionAPI";
import MetaActionConfig from "../actions/MetaActionConfig";
import Agent from "../agent/Agent";
import AgentAPI from "../agent/IAgentAPI";
import MetaAgentConfig from "../agent/MetaAgentConfig";
import Environment from "../environment/Environment";
import EssentialAPI from "../essential/IEssentialAPI";
import ExperimentAPI from "../experiment/ExperimentAPI";
import IExperimentStrategy from "../experiment/IExperimentStrategy";
import ScenarioAPI from "../scenarios/IScenarioAPI";
import MetaScenarioConfig from "../scenarios/MetaScenarioConfig";

class ITowerHandler {
  // todo : add all the others methods per API or introspection layer

  /* Essential API */

  // eslint-disable-next-line class-methods-use-this
  getTick(): number {
    return EssentialAPI.getTick();
  }

  /* Essential API */

  /* Action API */

  // eslint-disable-next-line class-methods-use-this
  registerNewAction(newActionType: typeof Action) {
    ActionAPI.registerNewAction(newActionType);
  }

  // eslint-disable-next-line class-methods-use-this
  generateActions(actionsConfigs: MetaActionConfig[]) {
    return ActionAPI.generateActions(actionsConfigs);
  }

  /* Action API */

  /* Agent API */

  // eslint-disable-next-line class-methods-use-this
  registerMetaConfigs(metaAgentsConfigs: MetaAgentConfig[]) {
    AgentAPI.registerMetaConfigs(metaAgentsConfigs);
  }

  // eslint-disable-next-line class-methods-use-this
  generateAgentList(): Agent[] {
    return AgentAPI.generateAgentList();
  }

  // eslint-disable-next-line class-methods-use-this
  getMetaAgentConfigById(indexMetaAgentConfig: number): MetaAgentConfig {
    return AgentAPI.getMetaAgentConfigById(indexMetaAgentConfig);
  }

  // eslint-disable-next-line class-methods-use-this
  registerNewAgent(newAgentType: typeof Agent) {
    AgentAPI.registerNewAgent(newAgentType);
  }

  /* Agent API */

  /* Scenario API */

  // eslint-disable-next-line class-methods-use-this
  generateEnvironment(config: MetaScenarioConfig) {
    return ScenarioAPI.generateEnvironment(config);
  }

  // eslint-disable-next-line class-methods-use-this
  getScenarioConfig(): MetaScenarioConfig {
    return ScenarioAPI.getScenarioConfig();
  }

  // eslint-disable-next-line class-methods-use-this
  registerNewEnvironment(newEnvironmentType: typeof Environment) {
    ScenarioAPI.registerNewEnvironment(newEnvironmentType);
  }

  setNetworkToScenario(environment: typeof Environment) {
    ScenarioAPI.setNetworkToScenario(environment);
  }

  addAgentToScenario(agentConfig: MetaAgentConfig) {
    ScenarioAPI.addAgentToScenario(agentConfig);
  }

  setNetworkSizeToScenario(size: number) {
    ScenarioAPI.setNetworkSizeToScenario(size);
  }

  setPeriodsToScenario(max: number) {
    ScenarioAPI.setPeriodsToScenario(max);
  }

  setScenarioConfig(scenarioConfig: MetaScenarioConfig) {
    ScenarioAPI.setScenarioConfig(scenarioConfig);
  }

  /* Scenario API */

  /* Experiment API */

  // eslint-disable-next-line class-methods-use-this
  addNewExperiment(newExperiment: IExperimentStrategy) {
    ExperimentAPI.addNewExperiment(newExperiment);
  }

  setExperiment(strategyRef: IExperimentStrategy) {
    ExperimentAPI.setExperiment(strategyRef);
  }

  run() {
    ExperimentAPI.run();
  }

  setExperimentName(name: string) {
    ExperimentAPI.setExperimentName(name);
  }

  setExperimentMaxRepetitions(maxRepetitions: number) {
    ExperimentAPI.setExperimentMaxRepetitions(maxRepetitions);
  }

  setExperimentDescription(description: string) {
    ExperimentAPI.setExperimentDescription(description);
  }

  setEssentialData(state: boolean) {
    ExperimentAPI.setEssentialData(state);
  }

  setDetailedData(state: boolean) {
    ExperimentAPI.setDetailedData(state);
  }

  /* Experiment API */
  registerMetaAgentsConfigs(metaAgentsConfigs: MetaAgentConfig[]) {
    AgentAPI.registerMetaConfigs(metaAgentsConfigs);
  }
}

const TowerHandler: ITowerHandler = new ITowerHandler();

export default TowerHandler;
