// eslint-disable-next-line import/no-cycle
import RowData from "../data/RowData";
import DataHandler from "../datahandler/IDataHandler";
import Simulation from "../simulation/Simulation";
import ExperimentConfig from "./ExperimentConfig";
import MetaExperimentConfig from "./MetaExperimentConfig";

export default abstract class Experiment implements ExperimentConfig {
  name: string;
  description: string;
  currentRepetition: number;
  simulation: Simulation;
  maxRepetitions: number;

  constructor(config: MetaExperimentConfig) {
    this.name = config.name;
    this.description = config.description;
    this.currentRepetition = -1;
    this.maxRepetitions = config.maxRepetitions;
    this.simulation = new Simulation(-1, config);
    // this.currentRepetition = config.currentRepetition;
    // this.maxRepetitions = config.maxRepetitions;
    // this.type = config.type;
    // this.dataHandlerConfig = config.dataHandlerConfig;
  }

  run() {
    while (this.currentRepetition < this.maxRepetitions) {
      this.initialize();
      console.log(
        "On Experiment.run(), currentRepetition is: ",
        this.currentRepetition
      );
      if (!this.simulation.environment.isDone()) {
        break;
      }
      this.simulation.run();
      this.currentRepetition += 1;
    }
  }

  private initialize() {
    this.currentRepetition += 1;
    DataHandler.experiment = this;
    this.simulation.initialize(this.currentRepetition); // todo : maybe this should be deleted
    DataHandler.simulation = this.simulation;
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
