import MetaAgentConfig from "../agent/MetaAgentConfig";
import type Environment from "../environment/Environment";

export default interface MetaScenarioConfig {
  networkSize: number;
  periods: number;
  environmentType: typeof Environment;
  metaAgentsConfigs: MetaAgentConfig[];
}
