import Agent, { AgentState } from "../../agent/Agent";
import Action from "../Action";
import MetaActionConfig from "../MetaActionConfig";

export default class ActionShare extends Action {
  execute(agent: Agent): void {
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
