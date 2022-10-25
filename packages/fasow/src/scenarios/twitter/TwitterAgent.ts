import Agent from "../../agent/Agent";
import { AgentState } from "../../agent/AgentState";
import MetaAgentConfig from "../../agent/MetaAgentConfig";

export default class TwitterAgent extends Agent {
  step(): void {
    if (this.state === AgentState.READY_TO_SHARE) {
      this.share();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  createAgent(id: number, agentData: MetaAgentConfig): Agent {
    return new TwitterAgent().setConfig(id, agentData);
  }

  update(message: any): any {
    // Que se actualizara
    this.actions.forEach((action) => action.execute(this));
    return message;
  }
}
