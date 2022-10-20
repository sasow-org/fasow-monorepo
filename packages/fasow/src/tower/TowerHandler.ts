import Action from "../actions/Action";
import ActionAPI from "../actions/IActionAPI";
import Agent from "../agent/Agent";
import AgentAPI from "../agent/IAgentAPI";
import Environment from "../environment/Environment";
import ExperimentAPI from "../experiment/ExperimentAPI";
import IExperimentStrategy from "../experiment/IExperimentStrategy";
import ScenarioAPI from "../scenarios/IScenarioAPI";

class ITowerHandler {
  // todo : add all the others methods per API or introspection layer

  registerNewAction(newActionType: typeof Action) {
    ActionAPI.registerNewAction(newActionType);
  }

  registerNewAgent(newAgentType: typeof Agent) {
    AgentAPI.registerNewAgent(newAgentType);
  }

  registerNewEnvironment(newEnvironmentType: typeof Environment) {
    ScenarioAPI.registerNewEnvironment(newEnvironmentType);
  }

  addNewExperiment(newExperiment: IExperimentStrategy) {
    ExperimentAPI.addNewExperiment(newExperiment);
  }
}

const TowerHandler: ITowerHandler = new ITowerHandler();

export default TowerHandler;
