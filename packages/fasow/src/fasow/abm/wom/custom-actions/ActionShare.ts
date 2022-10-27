import MetaActionConfig from "../../../config/metaconfig/MetaActionConfig";
import Action from "../../Action";
import Agent from "../../Agent";
import { AgentState } from "../../interfaces/Agent/AgentState";

export default class ActionShare extends Action {
  /*
  Maybe this action can named CalculateCanShare
   */
  execute(agent: Agent): void {
    /*
    Para calcular si se puede compartir basicamente pasa lo siguiente:
      1.- Asegurarse de que se haya leido un mensaje, de tal forma que el estado del agente sea leido.
      2.- Obtener un numero random
      3.- Calcular la probabilidad
      4.- Cambiar estado a listo para compartir
     */
    if (agent.state === AgentState.READ) {
      const aux: Agent = agent;
      const p1: number = this.getRandom();
      if (p1 / 100 > 1 - this.probability) {
        aux.state = AgentState.READY_TO_SHARE;
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  createAction(actionData: MetaActionConfig): Action {
    return new ActionShare().setConfig(actionData);
  }
}
