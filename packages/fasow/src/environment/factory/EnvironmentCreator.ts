import MetaExperimentConfig from "../../experiment/MetaExperimentConfig";
import Environment from "../Environment";

export default abstract class EnvironmentCreator {
  abstract createEnvironment(
    environmentConfig: MetaExperimentConfig
  ): Environment;
}
