import Action from "../../abm/Action";
import Agent from "../../abm/Agent";
import Environment from "../../abm/Environment";
import Experiment from "../../abm/Experiment";
import MetaActionConfig from "../../config/metaconfig/MetaActionConfig";
import MetaAgentConfig from "../../config/metaconfig/MetaAgentConfig";
import MetaEnvironmentConfig from "../../config/metaconfig/MetaEnvironmentConfig";
import MetaExperimentConfig from "../../config/metaconfig/MetaExperimentConfig";
export default class ITowerHandler {
    private ActionAPI;
    private AgentAPI;
    private EnvironmentAPI;
    private ExperimentAPI;
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
    generateEnvironment(config: MetaEnvironmentConfig): Environment;
    getScenarioConfig(): MetaEnvironmentConfig;
    registerNewEnvironment(newEnvironmentType: typeof Environment): void;
    setNetworkToScenario(environment: typeof Environment): void;
    addAgentToScenario(agentConfig: MetaAgentConfig): void;
    setNetworkSizeToScenario(size: number): void;
    setPeriodsToScenario(max: number): void;
    setScenarioConfig(scenarioConfig: MetaEnvironmentConfig): void;
    resetScenarioConfig(): MetaEnvironmentConfig;
    setExperimentName(name: string): void;
    setExperimentMaxRepetitions(maxRepetitions: number): void;
    setExperimentDescription(description: string): void;
    registerNewExperiment(experiment: typeof Experiment): void;
    selectExperiment(select: typeof Experiment): void;
    getExperimentConfig(): MetaExperimentConfig;
    createSelectedExperiment(): Experiment;
    selectExperimentByName(experiment: string): void;
    getActionAPIState(): any;
    getAgentAPIState(): any;
    getEnvironmentAPIState(): any;
    getExperimentAPIState(): any;
    getSelectedExperiment(): typeof Experiment;
}