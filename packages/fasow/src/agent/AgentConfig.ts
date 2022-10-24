import Action from "../actions/Action";
import Agent, { AgentState } from "./Agent";

export default interface AgentConfig {
  readonly id: number;
  state?: AgentState;
  isSeed: boolean;
  actions: Action[];
  followers: Agent[];
  followings: Agent[];
  readonly indexMetaAgentConfig: number;
}
