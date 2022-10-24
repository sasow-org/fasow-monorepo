import type Action from "../actions/Action";
import RowData from "../data/RowData";
// eslint-disable-next-line import/no-cycle
import TowerHandler from "../tower/TowerHandler";
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

  constructor() {
    this.id = -1;
    this.state = DEFAULT_STATE;
    this.isSeed = false;
    this.followers = [];
    this.followings = [];
    this.indexMetaAgentConfig = -1;
    this.actions = [];
  }

  abstract doActions(): void;

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

  receiveMessage(): void {
    this.actions.forEach((action) => {
      action.execute(this);
    });
  }

  DataDetailed(): RowData {
    const rd: RowData = new RowData();
    rd.addRow(this.id, "agent_id");
    rd.addRow(this.state, "agent_state");
    rd.addRow(this.isSeed, "agent_is_seed");
    return rd;
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
}
/*
    notify(data: typeof Agent, config: MetaAgentConfig): Agent {
      console.log("agent: ", data.name);
      console.log("config: ", config);
      // eslint-disable-next-line new-cap
      // @ts-ignore
      // eslint-disable-next-line new-cap
      const aux: data = new data();
      aux.setConfig(1, config);
      console.log("Object create: ");
      return aux;
    }


    getData<S extends QuerySelection<Agent>>(
      selection: S
    ): QueryResult<Agent, S> {
      console.log("Hola soy el agent, mis datos son: ", this);
      // @ts-ignore
      console.log("On get Data:  ", selection);
      const output = {};
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const x in selection) {
        // @ts-ignore
        console.log(x, ":", this[x]);
        // @ts-ignore
        output[x] = this[x];
      }
      return output as QueryResult<Agent, S>;
    }

    query: any = undefined;
    setQuery<S extends QuerySelection<Agent>>(selection: S): void {
      this.query = selection;
    }
    */

/*
interface AgentI {
  readonly id?: number;
  state?: AgentState;
  isSeed?: boolean;
  actions?: Action[];
  followers?: Agent[];
  followings?: Agent[];
  readonly indexMetaAgentConfig?: number;
} */
