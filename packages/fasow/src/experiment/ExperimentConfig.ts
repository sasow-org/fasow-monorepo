import Simulation from "../simulation/Simulation";

export default interface ExperimentConfig {
  name: string;
  description: string;
  currentRepetition: number;
  maxRepetitions: number;
  simulation: Simulation;
}
