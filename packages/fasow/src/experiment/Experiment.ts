// eslint-disable-next-line import/no-cycle
import RowData from "../data/RowData";
// eslint-disable-next-line import/no-cycle
import DataHandler from "../datahandler/IDataHandler";
import EssentialAPI from "../essential/IEssentialAPI";
// eslint-disable-next-line import/no-cycle
import Simulation from "../simulation/Simulation";
// eslint-disable-next-line import/no-cycle
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
    this.simulation = new Simulation();
    DataHandler.experiment = this;
    EssentialAPI.setMaxRepetition(config.maxRepetitions);
    // EssentialAPI.setRepetition(-1);
  }

  run() {
    this.initialize();
    while (EssentialAPI.canNextRepetition()) {
      console.log(
        "On Experiment.run(), currentRepetition is: ",
        this.currentRepetition
      );
      if (!this.simulation.environment.isDone()) {
        break;
      }
      this.simulation.run();
      this.initialize();
    }
  }

  private initialize() {
    this.currentRepetition = EssentialAPI.nextRepetition();
    this.simulation.initialize(this.currentRepetition);
    // this.simulation.initialize(this.currentRepetition); // todo : maybe this should be deleted
  }

  DataEssential(): RowData {
    const rd: RowData = new RowData();
    // rd.addRow(this.name, "experiment_name");
    // rd.addRow(this.description, "experiment_description");
    rd.addRow(this.maxRepetitions, "max_repetitions");
    rd.addRows(this.simulation.DataEssential());
    rd.addRows(this.simulation.environment.DataEssential());
    return rd;
  }
}
