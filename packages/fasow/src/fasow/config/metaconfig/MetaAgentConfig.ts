import type Agent from "../../abm/Agent";
import { AgentState } from "../../abm/interfaces/Agent/AgentState";
import MetaActionConfig from "./MetaActionConfig";

export default interface MetaAgentConfig {
  // Metadata
  readonly id: number;
  name: string;
  percentage: number;
  followersPercentage: number;
  followingsPercentage: number;
  actionsConfigs: MetaActionConfig[];
  type: typeof Agent;
  // Normal data to create a agentConfig ?
  state?: AgentState;
  isSeed: boolean;
}
