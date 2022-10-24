import Agent, { AgentState } from "../../agent/Agent";
import MetaAgentConfig from "../../agent/MetaAgentConfig";

export default class TwitterAgent extends Agent {
  doActions(): void {
    this.share();
  }

  share(): void {
    if (this.state === AgentState.READY_TO_SHARE) {
      this.followers.forEach((agent: Agent): void => {
        agent.receiveMessage();
      });
      this.state = AgentState.SHARED;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  createAgent(id: number, agentData: MetaAgentConfig): Agent {
    return new TwitterAgent().setConfig(id, agentData);
  }
}
