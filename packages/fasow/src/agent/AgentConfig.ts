import Action from "../actions/Action";
import Agent from "./Agent";
import { AgentState } from "./AgentState";

export default interface AgentConfig {
  readonly id: number;
  state?: AgentState;
  isSeed: boolean;
  actions: Action[];
  followers: Agent[];
  followings: Agent[];
  readonly indexMetaAgentConfig: number;
}
