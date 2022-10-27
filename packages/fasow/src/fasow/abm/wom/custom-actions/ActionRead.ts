import MetaActionConfig from "../../../config/metaconfig/MetaActionConfig";
import Action from "../../Action";
import Agent from "../../Agent";
import { AgentState } from "../../interfaces/Agent/AgentState";

export default class ActionRead extends Action {
  execute(agent: Agent): void {
    if (agent.state === AgentState.NOT_READ) {
      const aux: Agent = agent;
      const p1: number = this.getRandom();
      if (p1 / 100 > 1 - this.probability) {
        aux.state = AgentState.READ;
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  createAction(actionData: MetaActionConfig): Action {
    return new ActionRead().setConfig(actionData);
  }
}
