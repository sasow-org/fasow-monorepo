// eslint-disable-next-line import/no-cycle
import { TowerHandler } from "../../main";
// eslint-disable-next-line import/no-cycle
import ExperimentConfig from "../config/config/ExperimentConfig";
import MetaExperimentConfig from "../config/metaconfig/MetaExperimentConfig";
import RowData from "../datahandler/data/RowData";
import Simulation from "./Simulation";
import IExperimentCreator from "./interfaces/Experiment/IExperimentCreator";
import IExperimentStrategy from "./interfaces/Experiment/IExperimentStrategy";

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
    DataHandler.experiments = this;
    EssentialAPI.setMaxRepetition(config.maxRepetitions);

     */
    // EssentialAPI.setRepetition(-1);
  }

  run() {
    console.log(
      "At Start --> On Experiment.run(), currentRepetition is: ",
      this.getRepetition()
    );
    this.initialize();
    console.log(
      "On Experiment.run(), currentRepetition is: ",
      this.getRepetition(),
      " of(",
      this.getMaxRepetition(),
      ")"
    );
    while (this.canNextRepetition()) {
      if (!this.simulation.isDone()) {
        break;
      }
      console.log("Before Simulation.run()");
      this.simulation.run();
      this.initialize();
      console.log(
        "On Experiment.run(), currentRepetition is: ",
        this.getRepetition(),
        "Off (",
        this.getMaxRepetition(),
        ")"
      );
    }
  }

  initialize() {
    this.loadConfig();
    this.simulation.initialize(this.nextRepetition());
  }

  DataEssential(): RowData {
    const rd: RowData = new RowData();
    // rd.addRow(this.name, "experiment_name");
    // rd.addRow(this.description, "experiment_description");
    rd.addRow(this.getMaxRepetition(), "max_repetitions");
    rd.addRows(this.simulation.DataEssential());
    return rd;
  }

  abstract createExperiment(): Experiment;

  setConfig(config: MetaExperimentConfig): void {
    this.name = config.name;
    this.description = config.description;
    this.simulation = new Simulation();
    this.setMaxRepetition(config.maxRepetitions);
  }

  loadConfig(): void {
    const config: MetaExperimentConfig = TowerHandler.getExperimentConfig();
    this.setConfig(config);
  }

  abstract Strategy(): void;

  executeStrategy(): void {
    console.log();
    this.Strategy();
  }

  // eslint-disable-next-line class-methods-use-this
  getRepetition(): number {
    return TowerHandler.getRepetition();
  }

  // eslint-disable-next-line class-methods-use-this
  getMaxRepetition(): number {
    return TowerHandler.getMaxRepetition();
  }

  // eslint-disable-next-line class-methods-use-this
  canNextRepetition(): boolean {
    return TowerHandler.canNextRepetition();
  }

  // eslint-disable-next-line class-methods-use-this
  nextRepetition(): number {
    return TowerHandler.nextRepetition();
  }

  // eslint-disable-next-line class-methods-use-this
  setMaxRepetition(maxRepetitions: number) {
    TowerHandler.setMaxRepetition(maxRepetitions);
  }
}
