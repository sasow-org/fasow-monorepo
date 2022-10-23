import MetaScenarioConfig from "../scenarios/MetaScenarioConfig";
import type Environment from "./Environment";

export default interface IEnvironmentCreator {
  createEnvironment(environmentConfig: MetaScenarioConfig): Environment;
}
