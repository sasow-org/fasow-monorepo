import type Action from "../actions/Action";
import ActionAPI from "../actions/IActionAPI";
import RowData from "../data/RowData";
import type AgentConfig from "./AgentConfig";
import type IAgentCreator from "./IAgentCreator";
import MetaAgentConfig from "./MetaAgentConfig";

export enum AgentState {
  NOT_READ,
  READ,
  READY_TO_SHARE,
  SHARED,
}

const DEFAULT_STATE = AgentState.NOT_READ;

export default abstract class Agent implements AgentConfig, IAgentCreator {
  id: number;
  state?: AgentState | undefined;
  isSeed: boolean;
  actions: Action[];
  followers: Agent[];
  followings: Agent[];
  indexMetaAgentConfig: number;

  constructor(id: number, agentConfig: MetaAgentConfig) {
    this.id = id;
    this.isSeed = agentConfig.isSeed;
    this.followers = [];
    this.followings = [];
    this.actions = ActionAPI.generateActions(agentConfig.actionsConfigs);
    this.indexMetaAgentConfig = agentConfig.id;
    if (agentConfig.state) {
      this.state = agentConfig.state;
    } else {
      this.state = DEFAULT_STATE;
    }
  }

  abstract doActions(): void;

  addFollower(agent: Agent) {
    // We need to make sure the agent id is not the same id of the current agent
    if (this.id === agent.id) return;

    const agentIndex = this.followers.findIndex(({ id }) => id === agent.id);
    if (agentIndex === -1) {
      return;
    }

    // add follower
    this.followers.push(agent);
  }

  addFollowing(agent: Agent) {
    // We need to make sure the agent id is not the same id of the current agent
    if (this.id === agent.id) return;

    const agentIndex = this.followings.findIndex(({ id }) => id === agent.id);
    if (agentIndex === -1) {
      return;
    }

    // add follower
    this.followings.push(agent);
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

  receiveMessage(): void {
    // todo : check this code --> maybe this can be abstract
    if (this.state === AgentState.NOT_READ) {
      // const action : Action = this._actions.find((actionFind) => actionFind.name === 'read');
      // action.Execute(this);
      // if (this._state === Agent.READ) {
      //   const action2 : Action = this._actions.find((actionFind) => actionFind.name === 'share');
      //   action2.Execute(this);
      // }
    }
  }

  DataDetailed(): RowData {
    const rd: RowData = new RowData();
    rd.addRow(this.id, "agent_id");
    rd.addRow(this.state, "agent_state");
    rd.addRow(this.isSeed, "agent_is_seed");
    return rd;
  }

  abstract createAgent(id: number, agentData: MetaAgentConfig): Agent;
}
