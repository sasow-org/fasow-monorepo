import MetaActionConfig from "../actions/MetaActionConfig";
import type Agent from "./Agent";
import { AgentState } from "./AgentState";

export default interface MetaAgentConfig {
  // Metadata
  readonly id: number;
  name: string;
  quantity: number;
  followersPercentage: number;
  followingsPercentage: number;
  actionsConfigs: MetaActionConfig[];
  type: typeof Agent;
  // Normal data to create a agentConfig ?
  state?: AgentState;
  isSeed: boolean;
}
