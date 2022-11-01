import Agent from "../../abm/Agent";
import { AgentState } from "../../abm/interfaces/Agent/AgentState";
import MetaAgentConfig from "../../config/metaconfig/MetaAgentConfig";

export default class TwitterAgent extends Agent {
  step(): void {
    if (this.state === AgentState.READY_TO_SHARE) {
      this.share();
      this.state = AgentState.SHARED;
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
