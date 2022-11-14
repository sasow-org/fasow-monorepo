import Environment from "../../abm/Environment";
import MetaScenarioConfig from "../../config/metaconfig/MetaScenarioConfig";
export default class EnvironmentTwitter extends Environment {
    run(): void;
    step(): void;
    createEnvironment(scenarioConfig: MetaScenarioConfig): Environment;
}
