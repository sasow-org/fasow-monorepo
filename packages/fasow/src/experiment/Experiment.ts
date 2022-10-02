import { DataHandler, DataHandlerConfig } from "../DataHandler";
import MatrixData from "../data/MatrixData";
import RowData from "../data/RowData";
import { IDataEssential, IObservable } from "../interfaces";
import Simulation, { SimulationConfig } from "../simulation/Simulation";

interface ExperimentConfig {
  name: string;
  description: string;
  currentRepetition: number;
  maxRepetitions: number;
  type: string;

  // TODO: set correct data handler and simulation type
  dataHandlerConfig: DataHandlerConfig;
  simulation: Simulation;

  agentQuantities: {
    [agentId: number]: number;
  };
}

export default abstract class Experiment
  implements ExperimentConfig, IObservable, IDataEssential
{
  name;
  description;
  currentRepetition;
  maxRepetitions;
  type;
  dataHandlerConfig;
  simulation;
  agentQuantities = {};

  constructor(config: ExperimentConfig) {
    this.name = config.name;
    this.description = config.description;
    this.currentRepetition = config.currentRepetition;
    this.maxRepetitions = config.maxRepetitions;
    this.type = config.type;
    this.dataHandlerConfig = config.dataHandlerConfig;
    this.simulation = config.simulation;

    if (config.dataHandlerConfig.hasDetailedData) {
      DataHandler.getInstance().detailedData = new MatrixData();
    }

    if (config.dataHandlerConfig.hasEssentialData) {
      DataHandler.getInstance().essentialData = new MatrixData();
    }

    // assign Experiment instance to DataHandler reference
    DataHandler.getInstance().experiment = this;
  }

  run() {
    while (this.currentRepetition < this.maxRepetitions) {
      this.initialize(this.currentRepetition);
      if (!this.simulation.environment.isDone()) {
        break;
      }
      this.simulation.run();
      this.currentRepetition += 1;
    }
  }

  initialize(id: number) {
    this.simulation.initialize();
    // DataHandler.getInstance().simulation = this.simulation;
    // DataHandler.getInstance().environment = this.simulation.environment;
  }

  public configure(doConfig: Function): SimulationConfig {
    return doConfig();
  }

  DataEssential(): RowData {
    const rd: RowData = new RowData();
    rd.addRow(this.name, "experiment_name");
    rd.addRow(this.description, "experiment_description");
    rd.addRow(this.maxRepetitions, "experiment_max_repetitions");
    rd.addRow(this.currentRepetition, "experiment_repetition_number");
    return rd;
  }

  notifyData(): void {
    // do nothin ?
  }
}
