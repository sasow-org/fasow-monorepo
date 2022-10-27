import { TowerHandler } from "../../main";
import type SimulationConfig from "../config/config/SimulationConfig";
import RowData from "../datahandler/data/RowData";
import { IDataDetailed, IDataEssential } from "../datahandler/interfaces";
import Environment from "./Environment";

export default class Simulation
  implements SimulationConfig, IDataEssential, IDataDetailed
{
  id;
  environment: Environment | any;
  constructor() {
    this.id = -1;
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
    rdSimulation.addRow(this.id, "repetition");
    rdSimulation.addRows(this.environment.DataEssential());
    return rdSimulation;
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
