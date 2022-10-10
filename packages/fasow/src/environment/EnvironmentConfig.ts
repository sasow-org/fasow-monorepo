import Agent from "../agent/Agent";

export interface EnvironmentConfig {
  readonly id: number;
  networkSize: number; // maybe this is metadata?
  seedSize: number; // maybe this is metadata?
  periods: number; // maybe this is metadata?
  // agentConfigs: AgentConfig[]; // maybe this is metadata?
  currentPeriod?: number;
  initialized?: boolean;
  agents?: Agent[];
  seeds?: Agent[];
}
