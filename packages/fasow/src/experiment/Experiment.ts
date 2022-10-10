// eslint-disable-next-line import/no-cycle
import { DataHandler} from "../DataHandler";
import MatrixData from "../data/MatrixData";
import RowData from "../data/RowData";
import { IDataEssential, IObservable } from "../interfaces";
import ExperimentConfig from "./ExperimentConfig";
import Simulation from "../simulation/Simulation";
import {SimulationConfig} from "../simulation/SimulationConfig";


export default abstract class Experiment
    implements ExperimentConfig, IObservable, IDataEssential {

  name: string;
  description: string;
  currentRepetition: number;
  simulation: Simulation;
  maxRepetitions: number;

  protected constructor(config: ExperimentConfig) {
    this.name = config.name;
    this.description = config.description;
    this.currentRepetition = -1;
    this.maxRepetitions = config.maxRepetitions;
    // this.currentRepetition = config.currentRepetition;
    // this.maxRepetitions = config.maxRepetitions;
    // this.type = config.type;
    // this.dataHandlerConfig = config.dataHandlerConfig;
    this.simulation = config.simulation;
    // this.agentConfigs = []
    /*
    todo: the conditionals here should be moved because the datahandler
     configuration must be set in another way, perhaps with the ExperimentAPI
     */
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
    this.simulation.initialize(id);// todo : maybe this should be deleted
    // DataHandler.getInstance().simulation = this.simulation;
    // DataHandler.getInstance().environment = this.simulation.environment;
  }

  // todo : this not to be necesary becouse the ScenarioAPI and ExperimentAPI configure this
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
    // do nothin ? todo: --> XD
  }
}
