import Environment from "../../abm/Environment";
import MetaEnvironmentConfig from "../../config/metaconfig/MetaEnvironmentConfig";
export default class EnvironmentTwitter extends Environment {
    run(): void;
    step(): void;
    createEnvironment(scenarioConfig: MetaEnvironmentConfig): Environment;
}
