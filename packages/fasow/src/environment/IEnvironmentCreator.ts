import MetaExperimentConfig from "../experiment/MetaExperimentConfig";
import type Environment from "./Environment";

export default interface IEnvironmentCreator {
  createEnvironment(environmentConfig: MetaExperimentConfig): Environment;
}
