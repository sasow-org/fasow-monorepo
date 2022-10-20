import RowData from "../data/RowData";
import MetaExperimentConfig from "../experiment/MetaExperimentConfig";
import { IDataDetailed, IDataEssential } from "../interfaces";
import ScenarioAPI from "../scenarios/IScenarioAPI";
import { SimulationConfig } from "./SimulationConfig";

export default class Simulation
  implements SimulationConfig, IDataEssential, IDataDetailed
{
  id;
  environment;
  config: MetaExperimentConfig;

  constructor(id: number, config: MetaExperimentConfig) {
    this.id = id;
    this.config = config;
    this.environment = ScenarioAPI.generateEnvironment(config);
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
    this.environment = ScenarioAPI.generateEnvironment(this.config);
    this.environment.initialize();
  }
}
