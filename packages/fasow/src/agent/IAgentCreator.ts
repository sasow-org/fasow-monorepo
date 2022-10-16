import Agent from "./Agent";
import MetaAgentConfig from "./MetaAgentConfig";

export default interface IAgentCreator {
  createAgent(id: number, agentData: MetaAgentConfig): Agent;
}
