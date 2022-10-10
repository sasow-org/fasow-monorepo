import MetaAgentConfig from "../MetaAgentConfig";
import Agent from "../Agent";

export default abstract class AgentCreator {
    public abstract createAgent(agentData: MetaAgentConfig) : Agent;
}