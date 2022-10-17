import DataHandler from "../IDataHandler";
import RowData from "../data/RowData";
import Simulation from "../simulation/Simulation";
import ExperimentConfig from "./ExperimentConfig";

export default abstract class Experiment implements ExperimentConfig {
  name: string;
  description: string;
  currentRepetition: number;
  simulation: Simulation;
  maxRepetitions: number;

  constructor(config: ExperimentConfig) {
    this.name = config.name;
    this.description = config.description;
    this.currentRepetition = -1;
    this.maxRepetitions = config.maxRepetitions;
    this.simulation = config.simulation;
    // this.currentRepetition = config.currentRepetition;
    // this.maxRepetitions = config.maxRepetitions;
    // this.type = config.type;
    // this.dataHandlerConfig = config.dataHandlerConfig;
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

  private initialize(id: number) {
    DataHandler.experiment = this;
    this.simulation.initialize(id); // todo : maybe this should be deleted
    DataHandler.simulation = this.simulation;
    // DataHandler.getInstance().simulation = this.simulation;
    // DataHandler.getInstance().environment = this.simulation.environment;
  }

  DataEssential(): RowData {
    const rd: RowData = new RowData();
    rd.addRow(this.name, "experiment_name");
    rd.addRow(this.description, "experiment_description");
    rd.addRow(this.maxRepetitions, "experiment_max_repetitions");
    rd.addRow(this.currentRepetition, "experiment_repetition_number");
    return rd;
  }
}
