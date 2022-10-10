import RowData from "../data/RowData";
import { IDataDetailed, IDataEssential } from "../interfaces";
import { SimulationConfig } from "./SimulationConfig";

export default abstract class Simulation
  implements SimulationConfig, IDataEssential, IDataDetailed
{
  id;
  environment;

  constructor(config: SimulationConfig) {
    this.id = config.id;
    this.environment = config.environment;
  }

  abstract run(): void;

  DataDetailed(): RowData {
    const rd: RowData = new RowData();
    rd.addRow(this.id, "simulation_id");
    return rd;
  }

  DataEssential(): RowData {
    /*

    rdSimulation.addRow(this.id, "simulation_id");
    rdSimulation.addRow(this.networkSize, "network_size");
    rdSimulation.addRow(this.seedSize, "seed_size");
    rdSimulation.addRow(this.periods, "periods");

     */
    const rdSimulation: RowData = new RowData();
    rdSimulation.addRow(this.id, "simulation_id");
    return rdSimulation;
  }

  initialize(id: number) {
    this.id = id;
    this.environment.initialize();
  }
}
