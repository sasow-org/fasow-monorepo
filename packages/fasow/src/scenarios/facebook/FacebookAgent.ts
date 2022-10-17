import Agent from "../../agent/Agent";
import MetaAgentConfig from "../../agent/MetaAgentConfig";

export default class FacebookAgent extends Agent {
  doActions(): void {
    this.receiveMessage();
  }

  createAgent(id: number, agentData: MetaAgentConfig): Agent {
    return new FacebookAgent(id, agentData);
  }
}
