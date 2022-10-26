// eslint-disable-next-line import/no-cycle
import RowData from "../data/RowData";
import DataHandler from "../datahandler/IDataHandler";
// eslint-disable-next-line import/no-cycle
import EssentialAPI from "../essential/IEssentialAPI";
// eslint-disable-next-line import/no-cycle
import Simulation from "../simulation/Simulation";
// eslint-disable-next-line import/no-cycle
import ExperimentAPI from "./ExperimentAPI";
// eslint-disable-next-line import/no-cycle
import ExperimentConfig from "./ExperimentConfig";
import IExperimentCreator from "./IExperimentCreator";
import IExperimentStrategy from "./IExperimentStrategy";
import MetaExperimentConfig from "./MetaExperimentConfig";

export default abstract class Experiment
  implements ExperimentConfig, IExperimentCreator, IExperimentStrategy
{
  name: string;
  description: string;
  simulation: Simulation | any;

  constructor() {
    this.name = "";
    this.description = "";
    // this.simulation = new Simulation();
    /*
    this.name = config.name;
    this.description = config.description;
    this.currentRepetition = -1;
    this.maxRepetitions = config.maxRepetitions;
    this.simulation = new Simulation();
    DataHandler.experiment = this;
    EssentialAPI.setMaxRepetition(config.maxRepetitions);

     */
    // EssentialAPI.setRepetition(-1);
  }

  run() {
    console.log(
      "On Experiment.run(), currentRepetition is: ",
      EssentialAPI.getRepetition()
    );
    this.initialize();
    console.log(
      "On Experiment.run(), currentRepetition is: ",
      EssentialAPI.getRepetition(),
      " , ",
      EssentialAPI.getMaxRepetition()
    );
    while (EssentialAPI.canNextRepetition()) {
      if (!this.simulation.environment.isDone()) {
        break;
      }

      this.simulation.run();
      this.initialize();
      console.log(
        "On Experiment.run(), currentRepetition is: ",
        EssentialAPI.getRepetition()
      );
    }
  }

  initialize() {
    this.loadConfig();
    this.simulation.initialize(EssentialAPI.nextRepetition());
    console.log("On Experiment Initialice: ", EssentialAPI.getRepetition());
  }

  DataEssential(): RowData {
    const rd: RowData = new RowData();
    // rd.addRow(this.name, "experiment_name");
    // rd.addRow(this.description, "experiment_description");
    rd.addRow(EssentialAPI.getMaxRepetition(), "max_repetitions");
    rd.addRows(this.simulation.DataEssential());
    rd.addRows(this.simulation.environment.DataEssential());
    return rd;
  }

  abstract createExperiment(): Experiment;

  setConfig(config: MetaExperimentConfig): void {
    this.name = config.name;
    this.description = config.description;
    this.simulation = new Simulation();
    DataHandler.experiment = this;
    EssentialAPI.setMaxRepetition(config.maxRepetitions);
  }

  loadConfig(): void {
    const config: MetaExperimentConfig = ExperimentAPI.getExperimentConfig();
    this.setConfig(config);
  }

  abstract Strategy(): void;

  executeStrategy(): void {
    console.log();
    this.Strategy();
  }
}
