import MetaScenarioConfig from "../../../config/metaconfig/MetaScenarioConfig";
import type Environment from "../../Environment";

/**
 * Factory Method pattern, allow to users to configure and personalize the creation of the Environment
 */
export default interface IEnvironmentCreator {
  /**
   * Factory Method, allow to users to configure and personalize the creation of the environment
   * @param environmentConfig : MetaScenarioConfig : The configuration of the scenario
   */
  createEnvironment(environmentConfig: MetaScenarioConfig): Environment;
}
