import { AgentConfig } from "../agent/Agent";
import Environment from "../environment/Environment";

interface SimulationConfig {
  readonly id: number;
  networkSize: number;
  agentConfig: AgentConfig[];
  periods: number;
  type: string;
  environment: Environment;
  seedSize: number;
}

export default abstract class Simulation implements SimulationConfig {
  id;
  networkSize;
  agentConfig;
  periods;
  type;
  environment;
  seedSize;

  constructor(config: SimulationConfig) {
    this.id = config.id;
    this.networkSize = config.networkSize;
    this.agentConfig = config.agentConfig;
    this.periods = config.periods;
    this.type = config.type;
    this.environment = config.environment;
    this.seedSize = config.seedSize;
  }

  abstract run(): void;

  initialize() {
    this.environment.initialize();
  }
}
