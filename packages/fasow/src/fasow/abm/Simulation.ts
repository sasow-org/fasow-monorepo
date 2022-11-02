import { TowerHandler } from "../../main";
import type SimulationConfig from "../config/config/SimulationConfig";
import Environment from "./Environment";

export default class Simulation implements SimulationConfig {
  id;
  environment: Environment | any;
  constructor() {
    this.id = -1;
  }

  run(): void {
    this.environment.run();
  }

  initialize(id: number) {
    this.id = id;
    this.environment = TowerHandler.generateEnvironment(
      TowerHandler.getScenarioConfig()
    );
    this.environment.initialize();
  }

  isDone(): boolean {
    return this.environment.isDone();
  }
}
