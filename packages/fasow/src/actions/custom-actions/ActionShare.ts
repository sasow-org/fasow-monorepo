import Agent, { AgentState } from "../../agent/Agent";
import Action from "../Action";

export default class ActionShare extends Action {
  execute(agent: Agent): void {
    const p1: number = this.getRandom();
    if (p1 / 100 > 1 - this.probability) {
      agent.state = AgentState.READY_TO_SHARE;
    }
  }
}
