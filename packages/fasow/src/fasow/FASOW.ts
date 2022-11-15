import ExampleExperiment from "../experiments/ExampleExperiment";
import Experiment from "./abm/Experiment";
import ActionRead from "./abm/wom/custom-actions/ActionRead";
import ActionShare from "./abm/wom/custom-actions/ActionShare";
import IDataHandler from "./datahandler/IDataHandler";
import ITowerHandler from "./reflection/tower/ITowerHandler";
import FacebookAgent from "./scenarios/facebook/FacebookAgent";
import EnvironmentTwitter from "./scenarios/twitter/EnvironmentTwitter";
import TwitterAgent from "./scenarios/twitter/TwitterAgent";
import ITimeKeeper from "./timekepper/ITimeKeeper";

export default class FASOW {
  private dataHandler: IDataHandler = new IDataHandler();
  private towerHandler: ITowerHandler = new ITowerHandler();
  private timeKeeper: ITimeKeeper = new ITimeKeeper();

  constructor() {
    this.loadActions();
    this.loadAgents();
    this.loadEnvironments();
    this.loadExperiments();
  }

  loadActions(): void {
    console.log("Loading Actions...");
    this.towerHandler.registerNewAction(ActionRead);
    this.towerHandler.registerNewAction(ActionShare);
  }

  loadAgents(): void {
    console.log("Loading Agents...");
    this.towerHandler.registerNewAgent(TwitterAgent);
    this.towerHandler.registerNewAgent(FacebookAgent);
  }

  loadEnvironments(): void {
    console.log("Loading Environments...");
    this.towerHandler.registerNewEnvironment(EnvironmentTwitter);
    // TowerHandler.registerNewEnvironment(EnvironmentFacebook);
  }

  loadExperiments(): void {
    console.log("Loading Experiments...");
    this.towerHandler.registerNewExperiment(ExampleExperiment);
  }

  getDataHandler(): IDataHandler {
    return this.dataHandler;
  }

  getTowerHandler(): ITowerHandler {
    return this.towerHandler;
  }

  getTimeKeeper(): ITimeKeeper {
    return this.timeKeeper;
  }

  getState(): any {
    return this.dataHandler.getState();
  }

  runExperiment(experiment: typeof Experiment) {
    this.towerHandler.selectExperiment(experiment);
    console.log("Selected Experiment: ", experiment.name);
    this.privateRunExperiment();
  }

  runExperimentByName(experiment: string) {
    this.towerHandler.selectExperimentByName(experiment);
    console.log("Selected Experiment: ", experiment);
    this.privateRunExperiment();
  }

  selectExperiment(experiment: typeof Experiment) {
    this.towerHandler.selectExperiment(experiment);
  }

  selectExperimentByName(experiment: string) {
    this.towerHandler.selectExperimentByName(experiment);
  }

  runSelectedExperiment() {
    this.privateRunExperiment();
  }

  private privateRunExperiment() {
    // todo : method to search in experiments array and set the strategy
    // todo : move this method to other class like FASOW ?
    // todo : maybe we need to move too the method select experiment or maybe allow to call that method from other class like fasow also
    // todo handle with a trycatch if the experiments is undefined
    const exp = this.towerHandler.createSelectedExperiment();
    this.dataHandler.experiment = exp;
    // exp.executeStrategy();
    exp.run();
    this.dataHandler.writeCSVFile();
  }

  registerNewExperiment(experiment: typeof Experiment) {
    this.towerHandler.registerNewExperiment(experiment);
  }

  writeFASOWState() {
    this.dataHandler.writeFASOWState();
  }

  loadJSON(): void {
    console.log("LoadJSON.");
  }
}
