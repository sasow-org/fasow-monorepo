import Action from "../../abm/Action";
import Agent from "../../abm/Agent";
import Environment from "../../abm/Environment";
import Experiment from "../../abm/Experiment";
import MetaActionConfig from "../../config/metaconfig/MetaActionConfig";
import MetaAgentConfig from "../../config/metaconfig/MetaAgentConfig";
import MetaExperimentConfig from "../../config/metaconfig/MetaExperimentConfig";
import MetaScenarioConfig from "../../config/metaconfig/MetaScenarioConfig";
import EssentialAPI from "../../timekepper/EssentialAPI";
import ActionAPI from "../apis/ActionAPI";
import AgentAPI from "../apis/AgentAPI";
import ExperimentAPI from "../apis/ExperimentAPI";
import ScenarioAPI from "../apis/ScenarioAPI";

export default class ITowerHandler {
  private EssentialAPI: EssentialAPI = new EssentialAPI();
  private ActionAPI: ActionAPI = new ActionAPI();
  private AgentAPI: AgentAPI = new AgentAPI();
  private ScenarioAPI: ScenarioAPI = new ScenarioAPI();
  private ExperimentAPI: ExperimentAPI = new ExperimentAPI();
  // todo : add all the others methods per API or introspection layer

  /* Essential API */

  getTick(): number {
    return this.EssentialAPI.getTick();
  }

  setTick(tick: number): number {
    return this.EssentialAPI.setTick(tick);
  }

  setMaxTick(periods: number) {
    this.EssentialAPI.setMaxTick(periods);
  }

  nextTick(): number {
    return this.EssentialAPI.nextTick();
  }

  canNextTick(): boolean {
    return this.EssentialAPI.canNextTick();
  }

  getMaxTick(): number {
    return this.EssentialAPI.getMaxTick();
  }

  getRepetition(): number {
    return this.EssentialAPI.getRepetition();
  }

  getMaxRepetition(): number {
    return this.EssentialAPI.getMaxRepetition();
  }

  canNextRepetition(): boolean {
    return this.EssentialAPI.canNextRepetition();
  }

  nextRepetition(): number {
    return this.EssentialAPI.nextRepetition();
  }

  setMaxRepetition(maxRepetitions: number) {
    console.log(
      "Setting up MaxRepetitions from (",
      this.getMaxRepetition(),
      ") to (",
      maxRepetitions,
      "). "
    );
    this.EssentialAPI.setMaxRepetition(maxRepetitions);
  }

  setRepetition(repetition: number) {
    this.EssentialAPI.setRepetition(repetition);
  }

  /* Essential API */

  /* Action API */

  // eslint-disable-next-line class-methods-use-this
  registerNewAction(newActionType: typeof Action) {
    this.ActionAPI.registerNewAction(newActionType);
  }

  // eslint-disable-next-line class-methods-use-this
  generateActions(actionsConfigs: MetaActionConfig[]) {
    return this.ActionAPI.generateActions(actionsConfigs);
  }

  registerMetaActionConfig(actionConfig: MetaActionConfig) {
    this.ActionAPI.registerMetaActionConfig(actionConfig);
  }

  generateActionList(): Action[] {
    return this.ActionAPI.generateActionList();
  }

  getMetaConfigs(): MetaActionConfig[] {
    return this.ActionAPI.getMetaConfigs();
  }

  /* Action API */

  /* Agent API */

  // eslint-disable-next-line class-methods-use-this
  registerMetaConfigs(metaAgentsConfigs: MetaAgentConfig[]) {
    this.AgentAPI.registerMetaConfigs(metaAgentsConfigs);
  }

  registerNewMetaAgentConfig(agentConfig: MetaAgentConfig) {
    this.AgentAPI.registerNewMetaAgentConfig(agentConfig);
  }

  generateAgentsByConfigs(metaConfigs: MetaAgentConfig[]): Agent[] {
    return this.AgentAPI.generateAgentsByConfigs(metaConfigs);
  }

  // eslint-disable-next-line class-methods-use-this
  generateAgentList(): Agent[] {
    return this.AgentAPI.generateAgentList();
  }

  // eslint-disable-next-line class-methods-use-this
  getMetaAgentConfigById(indexMetaAgentConfig: number): MetaAgentConfig {
    return this.AgentAPI.getMetaAgentConfigById(indexMetaAgentConfig);
  }

  // eslint-disable-next-line class-methods-use-this
  registerNewAgent(newAgentType: typeof Agent) {
    this.AgentAPI.registerNewAgent(newAgentType);
  }

  // eslint-disable-next-line class-methods-use-this
  registerMetaAgentsConfigs(metaAgentsConfigs: MetaAgentConfig[]) {
    this.AgentAPI.registerMetaConfigs(metaAgentsConfigs);
  }

  /* Agent API */

  /* Scenario API */

  // eslint-disable-next-line class-methods-use-this
  generateEnvironment(config: MetaScenarioConfig) {
    return this.ScenarioAPI.generateEnvironment(config);
  }

  // eslint-disable-next-line class-methods-use-this
  getScenarioConfig(): MetaScenarioConfig {
    return this.ScenarioAPI.getScenarioConfig();
  }

  // eslint-disable-next-line class-methods-use-this
  registerNewEnvironment(newEnvironmentType: typeof Environment) {
    this.ScenarioAPI.registerNewEnvironment(newEnvironmentType);
  }

  // eslint-disable-next-line class-methods-use-this
  setNetworkToScenario(environment: typeof Environment) {
    this.ScenarioAPI.setNetworkToScenario(environment);
  }

  // eslint-disable-next-line class-methods-use-this
  addAgentToScenario(agentConfig: MetaAgentConfig) {
    this.ScenarioAPI.addAgentToScenario(agentConfig);
  }

  // eslint-disable-next-line class-methods-use-this
  setNetworkSizeToScenario(size: number) {
    this.ScenarioAPI.setNetworkSizeToScenario(size);
  }

  // eslint-disable-next-line class-methods-use-this
  setPeriodsToScenario(max: number) {
    this.ScenarioAPI.setPeriodsToScenario(max);
  }

  // eslint-disable-next-line class-methods-use-this
  setScenarioConfig(scenarioConfig: MetaScenarioConfig) {
    this.ScenarioAPI.setScenarioConfig(scenarioConfig);
  }

  resetScenarioConfig(): MetaScenarioConfig {
    return this.ScenarioAPI.resetScenarioConfig();
  }

  /* Scenario API */

  /* Experiment API */

  // eslint-disable-next-line class-methods-use-this
  run() {
    this.ExperimentAPI.run();
  }

  // eslint-disable-next-line class-methods-use-this
  setExperimentName(name: string) {
    this.ExperimentAPI.setExperimentName(name);
  }

  // eslint-disable-next-line class-methods-use-this
  setExperimentMaxRepetitions(maxRepetitions: number) {
    this.ExperimentAPI.setExperimentMaxRepetitions(maxRepetitions);
  }

  // eslint-disable-next-line class-methods-use-this
  setExperimentDescription(description: string) {
    this.ExperimentAPI.setExperimentDescription(description);
  }

  // eslint-disable-next-line class-methods-use-this
  setEssentialData(state: boolean) {
    this.ExperimentAPI.setEssentialData(state);
  }

  // eslint-disable-next-line class-methods-use-this
  setDetailedData(state: boolean) {
    this.ExperimentAPI.setDetailedData(state);
  }

  registerNewExperiment(experiment: typeof Experiment) {
    this.ExperimentAPI.registerNewExperiment(experiment);
  }

  selectExperiment(select: typeof Experiment) {
    this.ExperimentAPI.selectExperiment(select);
  }

  getExperimentConfig(): MetaExperimentConfig {
    return this.ExperimentAPI.getExperimentConfig();
  }

  createExperiment(type: typeof Experiment): Experiment {
    return this.ExperimentAPI.createExperiment(type);
  }

  /* Experiment API */
}

// const TowerHandler: ITowerHandler = new ITowerHandler();

// export default TowerHandler;
