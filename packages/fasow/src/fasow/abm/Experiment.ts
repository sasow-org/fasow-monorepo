import { TowerHandler } from "../../main";
import ExperimentConfig from "../config/config/ExperimentConfig";
import MetaExperimentConfig from "../config/metaconfig/MetaExperimentConfig";
import Simulation from "./Simulation";
import IExperimentCreator from "./interfaces/Experiment/IExperimentCreator";
import IExperimentStrategy from "./interfaces/Experiment/IExperimentStrategy";

/**
 * The Experiment abstract class allow to the user to Implement and Configure an Experiment overriding the Strategy Method
 */
export default abstract class Experiment
  implements ExperimentConfig, IExperimentCreator, IExperimentStrategy
{
  name: string;
  description: string;
  simulation: Simulation | any;

  constructor() {
    this.name = "";
    this.description = "";
    TowerHandler.setRepetition(-1);
  }

  /**
   * Run the Experiment,initializing the model and starting the simulation
   * */
  run() {
    this.initialize();
    console.log(
      "Ended Initialization --> On Experiment.run(), currentRepetition  is: ",
      this.getRepetition(),
      " of (",
      this.getMaxRepetition(),
      ")"
    );
    while (this.canNextRepetition()) {
      if (!this.simulation.isDone()) {
        break;
      }
      console.log("Starting Simulation...");
      this.simulation.run();
      this.initialize();
    }
  }

  /**
   * Initialize the Model, setting up the configs to TowerHandler
   */
  initialize() {
    this.loadConfig();
    this.simulation.initialize(this.nextRepetition());
  }

  abstract createExperiment(): Experiment;

  /**
   * Setting up the ExperimentConfig, creating the simulation
   * @param config : MetaExperimentConfig :
   */
  setConfig(config: MetaExperimentConfig): void {
    this.name = config.name;
    this.description = config.description;
    this.simulation = new Simulation();
    this.setMaxRepetition(config.maxRepetitions);
  }

  /**
   * Load the configuration, delivered by the TowerHandler
   */
  loadConfig(): void {
    const config: MetaExperimentConfig = TowerHandler.getExperimentConfig();
    this.setConfig(config);
  }

  /**
   * The Strategy allow to the user to setting up configuration of Experiment doing calls to the TowerHandler
   * @constructor
   */
  abstract Strategy(): void;

  /**
   * Call to Strategy to be executed
   */
  executeStrategy(): void {
    console.log("Executing Strategy");
    this.Strategy();
  }

  /**
   * Return the Repetition of the Experiment
   */
  getRepetition(): number {
    return TowerHandler.getRepetition();
  }

  /**
   * Return the max Repetitions to do the Experiment
   */
  getMaxRepetition(): number {
    return TowerHandler.getMaxRepetition();
  }

  /**
   * Return true if is posible to do another repetition
   */
  canNextRepetition(): boolean {
    return TowerHandler.canNextRepetition();
  }

  /**
   * Update the repetition number to +1
   */
  nextRepetition(): number {
    return TowerHandler.nextRepetition();
  }

  /**
   * Allow to set the max repetitions
   * @param maxRepetitions : number : The quantity of repetitions to execute the Experiment
   */
  setMaxRepetition(maxRepetitions: number) {
    TowerHandler.setMaxRepetition(maxRepetitions);
  }
}
