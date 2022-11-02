import { TowerHandler } from "../../main";
import type AgentConfig from "../config/config/AgentConfig";
import MetaAgentConfig from "../config/metaconfig/MetaAgentConfig";
import type Action from "./Action";
import { AgentState } from "./interfaces/Agent/AgentState";
import type IAgentCreator from "./interfaces/Agent/IAgentCreator";
import Observer from "./interfaces/Agent/Observer/Observer";
import Subject from "./interfaces/Agent/Observer/Subject";

const DEFAULT_STATE = AgentState.NOT_READ;

export default abstract class Agent
  implements AgentConfig, IAgentCreator, Observer, Subject
{
  id: number;
  state?: AgentState | undefined;
  isSeed: boolean;
  actions: Action[];
  followers: Agent[];
  followings: Agent[];
  indexMetaAgentConfig: number;

  constructor() {
    this.id = -1;
    this.state = DEFAULT_STATE;
    this.isSeed = false;
    this.followers = [];
    this.followings = [];
    this.indexMetaAgentConfig = -1;
    this.actions = [];
  }

  abstract step(): void;

  addFollower(agent: Agent) {
    // We need to make sure the agent id is not the same id of the current agent
    if (this.id === agent.id) return;
    const agentIndex = this.followers.findIndex(
      (config) => config.id === agent.id
    );
    if (agentIndex === -1) {
      // add follower
      this.followers.push(agent);
    }
  }

  addFollowing(agent: Agent) {
    // We need to make sure the agent id is not the same id of the current agent
    if (this.id === agent.id) return;
    const agentIndex = this.followings.findIndex(({ id }) => id === agent.id);
    if (agentIndex === -1) {
      // add following
      this.followings.push(agent);
    }
  }

  removeFollower(agentId: number) {
    // We need to make sure the agent id is not the same id of the current agent
    if (this.id === agentId) return;

    const agentIndex = this.followers.findIndex(({ id }) => id === agentId);
    if (agentIndex === -1) return;

    // remove follower
    this.followers.splice(agentIndex, 1);
  }

  removeFollowing(agentId: number) {
    // We need to make sure the agent id is not the same id of the current agent
    if (this.id === agentId) return;

    const agentIndex = this.followings.findIndex(({ id }) => id === agentId);
    if (agentIndex === -1) return;

    // remove follower
    this.followings.splice(agentIndex, 1);
  }

  /*
  Receive Message lo unico que esta haciendo es ejecutar la lista de acc iones
   */
  receiveMessage(): void {
    this.actions.forEach((action) => {
      action.execute(this);
    });
  }

  resetState(): void {
    this.state = TowerHandler.getMetaAgentConfigById(
      this.indexMetaAgentConfig
    ).state;
  }

  abstract createAgent(id: number, agentData: MetaAgentConfig): Agent;

  setConfig(id: number, config: MetaAgentConfig): Agent {
    this.id = id;
    this.isSeed = config.isSeed;
    this.followers = [];
    this.followings = [];
    this.actions = TowerHandler.generateActions(config.actionsConfigs);
    this.indexMetaAgentConfig = config.id;
    this.state = config.state;
    return this;
  }

  /*
  todo: add documentation
   */
  share(): void {
    this.followers.forEach((follower) => follower.update(this));
  }

  /*
  todo: add documentation
   update is like a receive message
   */
  abstract update(message: any): any;
}
