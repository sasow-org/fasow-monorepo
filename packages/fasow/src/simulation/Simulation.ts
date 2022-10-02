import { AgentConfig } from "../agent/Agent";
import RowData from "../data/RowData";
import Environment from "../environment/Environment";
import { IDataDetailed, IDataEssential } from "../interfaces";

export interface SimulationConfig {
  readonly id: number;
  networkSize: number;
  agentConfig: AgentConfig[];
  periods: number;
  type: string;
  environment: Environment;
  seedSize: number;
}

export default abstract class Simulation
  implements SimulationConfig, IDataEssential, IDataDetailed
{
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

  DataDetailed(): RowData {
    const rd: RowData = new RowData();
    rd.addRow(this.id, "simulation_id");
    return rd;
  }

  DataEssential(): RowData {
    const rdSimulation: RowData = new RowData();
    rdSimulation.addRow(this.id, "simulation_id");
    rdSimulation.addRow(this.networkSize, "network_size");
    rdSimulation.addRow(this.seedSize, "seed_size");
    rdSimulation.addRow(this.periods, "periods");
    return rdSimulation;
  }

  initialize() {
    this.environment.initialize();
  }
}
