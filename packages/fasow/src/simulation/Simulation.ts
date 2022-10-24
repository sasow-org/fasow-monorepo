import RowData from "../data/RowData";
import MetaExperimentConfig from "../experiment/MetaExperimentConfig";
import { IDataDetailed, IDataEssential } from "../interfaces";
// eslint-disable-next-line import/no-cycle
import TowerHandler from "../tower/TowerHandler";
import type SimulationConfig from "./SimulationConfig";

export default class Simulation
  implements SimulationConfig, IDataEssential, IDataDetailed
{
  id;
  environment;
  config;
  constructor(config: MetaExperimentConfig) {
    this.id = -1;
    this.config = config;
    this.environment = TowerHandler.generateEnvironment(config.scenarioConfig);
  }

  run(): void {
    this.environment.run();
  }

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
    this.environment = TowerHandler.generateEnvironment(
      this.config.scenarioConfig
    );
    this.environment.initialize();
  }
}
