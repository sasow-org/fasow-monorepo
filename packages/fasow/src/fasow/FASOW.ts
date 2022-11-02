import ExampleExperiment from "../experiments/ExampleExperiment";
import ActionRead from "./abm/wom/custom-actions/ActionRead";
import ActionShare from "./abm/wom/custom-actions/ActionShare";
import IDataHandler from "./datahandler/IDataHandler";
import ITowerHandler from "./reflection/tower/ITowerHandler";
import EnvironmentTwitter from "./scenarios/twitter/EnvironmentTwitter";
import TwitterAgent from "./scenarios/twitter/TwitterAgent";

export default class FASOW {
  private dataHandler: IDataHandler = new IDataHandler();
  private towerHandler: ITowerHandler = new ITowerHandler();

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
    // TowerHandler.registerNewAgent(FacebookAgent);
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
}
