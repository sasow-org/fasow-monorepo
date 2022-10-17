import Agent from "../../agent/Agent";
import MetaAgentConfig from "../../agent/MetaAgentConfig";

export default class TwitterAgent extends Agent {
  doActions(): void {
    this.receiveMessage();
  }

  // eslint-disable-next-line class-methods-use-this
  createAgent(id: number, agentData: MetaAgentConfig): Agent {
    return new TwitterAgent(id, agentData);
  }
}
