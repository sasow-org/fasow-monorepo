import Action from "../../abm/Action";
import Agent from "../../abm/Agent";
import Environment from "../../abm/Environment";
import Experiment from "../../abm/Experiment";
import MetaActionConfig from "../../config/metaconfig/MetaActionConfig";
import MetaAgentConfig from "../../config/metaconfig/MetaAgentConfig";
import MetaExperimentConfig from "../../config/metaconfig/MetaExperimentConfig";
import MetaScenarioConfig from "../../config/metaconfig/MetaScenarioConfig";
export default class ITowerHandler {
    private EssentialAPI;
    private ActionAPI;
    private AgentAPI;
    private ScenarioAPI;
    private ExperimentAPI;
    getTick(): number;
    setTick(tick: number): number;
    setMaxTick(periods: number): void;
    nextTick(): number;
    canNextTick(): boolean;
    getMaxTick(): number;
    getRepetition(): number;
    getMaxRepetition(): number;
    canNextRepetition(): boolean;
    nextRepetition(): number;
    setMaxRepetition(maxRepetitions: number): void;
    setRepetition(repetition: number): void;
    registerNewAction(newActionType: typeof Action): void;
    generateActions(actionsConfigs: MetaActionConfig[]): Action[];
    registerMetaActionConfig(actionConfig: MetaActionConfig): void;
    generateActionList(): Action[];
    getMetaConfigs(): MetaActionConfig[];
    registerMetaConfigs(metaAgentsConfigs: MetaAgentConfig[]): void;
    registerNewMetaAgentConfig(agentConfig: MetaAgentConfig): void;
    generateAgentsByConfigs(metaConfigs: MetaAgentConfig[]): Agent[];
    generateAgentList(): Agent[];
    getMetaAgentConfigById(indexMetaAgentConfig: number): MetaAgentConfig;
    registerNewAgent(newAgentType: typeof Agent): void;
    registerMetaAgentsConfigs(metaAgentsConfigs: MetaAgentConfig[]): void;
    generateEnvironment(config: MetaScenarioConfig): Environment;
    getScenarioConfig(): MetaScenarioConfig;
    registerNewEnvironment(newEnvironmentType: typeof Environment): void;
    setNetworkToScenario(environment: typeof Environment): void;
    addAgentToScenario(agentConfig: MetaAgentConfig): void;
    setNetworkSizeToScenario(size: number): void;
    setPeriodsToScenario(max: number): void;
    setScenarioConfig(scenarioConfig: MetaScenarioConfig): void;
    resetScenarioConfig(): MetaScenarioConfig;
    run(): void;
    setExperimentName(name: string): void;
    setExperimentMaxRepetitions(maxRepetitions: number): void;
    setExperimentDescription(description: string): void;
    setEssentialData(state: boolean): void;
    setDetailedData(state: boolean): void;
    registerNewExperiment(experiment: typeof Experiment): void;
    selectExperiment(select: typeof Experiment): void;
    getExperimentConfig(): MetaExperimentConfig;
    createExperiment(type: typeof Experiment): Experiment;
}