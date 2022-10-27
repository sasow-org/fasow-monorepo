import MetaAgentConfig from "../../../config/metaconfig/MetaAgentConfig";
import Agent from "../../Agent";

export default interface IAgentCreator {
  createAgent(id: number, agentData: MetaAgentConfig): Agent;
}
