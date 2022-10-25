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

  // eslint-disable-next-line class-methods-use-this
  registerMetaAgentsConfigs(metaAgentsConfigs: MetaAgentConfig[]) {
    AgentAPI.registerMetaConfigs(metaAgentsConfigs);
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

  // eslint-disable-next-line class-methods-use-this
  setNetworkToScenario(environment: typeof Environment) {
    ScenarioAPI.setNetworkToScenario(environment);
  }

  // eslint-disable-next-line class-methods-use-this
  addAgentToScenario(agentConfig: MetaAgentConfig) {
    ScenarioAPI.addAgentToScenario(agentConfig);
  }

  // eslint-disable-next-line class-methods-use-this
  setNetworkSizeToScenario(size: number) {
    ScenarioAPI.setNetworkSizeToScenario(size);
  }

  // eslint-disable-next-line class-methods-use-this
  setPeriodsToScenario(max: number) {
    ScenarioAPI.setPeriodsToScenario(max);
  }

  // eslint-disable-next-line class-methods-use-this
  setScenarioConfig(scenarioConfig: MetaScenarioConfig) {
    ScenarioAPI.setScenarioConfig(scenarioConfig);
  }

  /* Scenario API */

  /* Experiment API */

  // eslint-disable-next-line class-methods-use-this
  addNewExperiment(newExperiment: IExperimentStrategy) {
    ExperimentAPI.addNewExperiment(newExperiment);
  }

  // eslint-disable-next-line class-methods-use-this
  setExperiment(strategyRef: IExperimentStrategy) {
    ExperimentAPI.setExperiment(strategyRef);
  }

  // eslint-disable-next-line class-methods-use-this
  run() {
    ExperimentAPI.run();
  }

  // eslint-disable-next-line class-methods-use-this
  setExperimentName(name: string) {
    ExperimentAPI.setExperimentName(name);
  }

  // eslint-disable-next-line class-methods-use-this
  setExperimentMaxRepetitions(maxRepetitions: number) {
    ExperimentAPI.setExperimentMaxRepetitions(maxRepetitions);
  }

  // eslint-disable-next-line class-methods-use-this
  setExperimentDescription(description: string) {
    ExperimentAPI.setExperimentDescription(description);
  }

  // eslint-disable-next-line class-methods-use-this
  setEssentialData(state: boolean) {
    ExperimentAPI.setEssentialData(state);
  }

  // eslint-disable-next-line class-methods-use-this
  setDetailedData(state: boolean) {
    ExperimentAPI.setDetailedData(state);
  }

  /* Experiment API */
}

const TowerHandler: ITowerHandler = new ITowerHandler();

export default TowerHandler;
