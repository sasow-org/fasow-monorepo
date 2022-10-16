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

  registerNewAction(newAction: Action) {
    ActionAPI.registerNewAction(newAction, "example");
  }

  registerNewAgent(newAgent: Agent) {
    AgentAPI.registerNewAgent(newAgent, "example");
  }

  registerNewEnvironment(newEnvironment: Environment) {
    ScenarioAPI.registerEnvironmentFactory(newEnvironment, "example");
  }

  addNewExperiment(newExperiment: IExperimentStrategy) {
    ExperimentAPI.addNewExperiment(newExperiment);
  }
}

const TowerHandler: ITowerHandler = new ITowerHandler();

export default TowerHandler;
