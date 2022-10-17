import MetaExperimentConfig from "../experiment/MetaExperimentConfig";
import Environment from "./Environment";

export default interface IEnvironmentCreator {
  createEnvironment(environmentConfig: MetaExperimentConfig): Environment;
}
