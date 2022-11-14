import type Environment from "../../abm/Environment";
import MetaAgentConfig from "../../config/metaconfig/MetaAgentConfig";
import MetaScenarioConfig from "../../config/metaconfig/MetaScenarioConfig";
export default class ScenarioAPI {
    private environmentFactories;
    private scenarioConfig;
    constructor();
    registerNewEnvironment(newEnvironmentType: typeof Environment): void;
    private getEnvironment;
    generateEnvironment(config: MetaScenarioConfig): Environment;
    setNetworkToScenario(environment: typeof Environment): void;
    addAgentToScenario(agentConfig: MetaAgentConfig): void;
    setNetworkSizeToScenario(size: number): void;
    setPeriodsToScenario(max: number): void;
    setScenarioConfig(scenarioConfig: MetaScenarioConfig): void;
    getScenarioConfig(): MetaScenarioConfig;
    resetScenarioConfig(): MetaScenarioConfig;
}
