import Agent, { AgentState } from "../../agent/Agent";
import Action from "../Action";
import MetaActionConfig from "../MetaActionConfig";

export default class ActionRead extends Action {
  execute(agent: Agent): void {
    const aux: Agent = agent;
    const p1: number = this.getRandom();
    if (p1 / 100 > 1 - this.probability) {
      aux.state = AgentState.READ;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  createAction(actionData: MetaActionConfig): Action {
    return new ActionRead(actionData);
  }
}
