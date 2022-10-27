import MetaScenarioConfig from "../../../config/metaconfig/MetaScenarioConfig";
import type Environment from "../../Environment";

export default interface IEnvironmentCreator {
  createEnvironment(environmentConfig: MetaScenarioConfig): Environment;
}
