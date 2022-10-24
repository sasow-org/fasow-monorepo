import ActionAPI from "../actions/IActionAPI";
import ActionRead from "../actions/custom-actions/ActionRead";
import ActionShare from "../actions/custom-actions/ActionShare";
import AgentAPI from "../agent/IAgentAPI";
import ScenarioAPI from "../scenarios/IScenarioAPI";
import EnvironmentTwitter from "../scenarios/twitter/EnvironmentTwitter";
import TwitterAgent from "../scenarios/twitter/TwitterAgent";

function loadActions(): void {
  console.log("Loading Actions...");
  ActionAPI.registerNewAction(ActionRead);
  ActionAPI.registerNewAction(ActionShare);
}

function loadAgents(): void {
  console.log("Loading Agents...");
  AgentAPI.registerNewAgent(TwitterAgent);
  // TowerHandler.registerNewAgent(FacebookAgent);
}

function loadEnvironments(): void {
  console.log("Loading Environments...");
  ScenarioAPI.registerNewEnvironment(EnvironmentTwitter);
  // TowerHandler.registerNewEnvironment(EnvironmentFacebook);
}

/*
Da lo mismo si se llama a towerhandler o a alguna API en especificio
Pero, para cargar los scenarios se debe ejecutar esta funcion en el archivo main.ts
si no, no puedes llamar a ninguna instancia de las APIS o el towerhandler, ya que estos directamente no exisitirian
 */
export default function loadScenarios(): void {
  loadActions();
  loadAgents();
  loadEnvironments();
}
