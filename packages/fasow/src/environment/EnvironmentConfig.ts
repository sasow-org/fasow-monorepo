import Agent from "../agent/Agent";

export interface EnvironmentConfig {
  id: number;
  networkSize: number;
  seedSize: number;
  periods: number;
  currentPeriod?: number;
  initialized?: boolean;
  agents?: Agent[];
  seeds?: Agent[];
}
