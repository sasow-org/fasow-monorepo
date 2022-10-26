import type Environment from "../environment/Environment";

export default interface SimulationConfig {
  readonly id: number;
  environment: Environment | any;
}
