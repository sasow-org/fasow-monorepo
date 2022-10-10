import Environment from "../environment/Environment";

export interface SimulationConfig {
  readonly id: number;
  environment: Environment;
}
