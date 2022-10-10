import MetaExperimentConfig from "../../experiment/MetaExperimentConfig";
import Simulation from "../Simulation";

export default abstract class SimulationCreator {
  abstract createSimulation(simulationConfig: MetaExperimentConfig): Simulation;
}
