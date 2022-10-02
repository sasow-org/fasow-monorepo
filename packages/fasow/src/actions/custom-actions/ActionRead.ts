import Agent, { AgentState } from "../../agent/Agent";
import Action from "../Action";

export class ActionRead extends Action {
  execute(agent: Agent): void {
    const p1: number = this.getRandom();
    if (p1 / 100 > 1 - this.probability) {
      agent.state = AgentState.READ;
    }
  }
}
