import Agent from "../../agent/Agent";
import MetaAgentConfig from "../../agent/MetaAgentConfig";

export default class FacebookAgent extends Agent {
  step(): void {
    this.receiveMessage();
  }

  // eslint-disable-next-line class-methods-use-this
  createAgent(id: number, agentData: MetaAgentConfig): Agent {
    // @ts-ignore
    return new FacebookAgent(id, agentData);
  }
}
