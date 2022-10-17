import MetaExperimentConfig from "../../experiment/MetaExperimentConfig";
import Simulation from "../../simulation/Simulation";
import IScenarioAPI from "../IScenarioAPI";
import ScenarioStrategy from "../ScenarioStrategy";

export default class FacebookStrategy implements ScenarioStrategy {
  doStrategy(config: MetaExperimentConfig): Simulation {
    const simulation: Simulation = new Simulation({
      id: -1,
      environment: IScenarioAPI.generateEnvironment(config),
    });
    return simulation;
  }
}
