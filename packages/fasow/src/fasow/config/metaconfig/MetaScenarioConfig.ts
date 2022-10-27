import type Environment from "../../abm/Environment";
import MetaAgentConfig from "./MetaAgentConfig";

export default interface MetaScenarioConfig {
  networkSize: number;
  periods: number;
  environmentType: typeof Environment;
  metaAgentsConfigs: MetaAgentConfig[];
}
