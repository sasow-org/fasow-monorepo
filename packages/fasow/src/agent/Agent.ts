export enum AgentState {
  NOT_READ,
  READ,
  READY_TO_SHARE,
  SHARED,
}

export interface AgentConfig {
  readonly id: number;
  name: string;
  state?: AgentState;
  isSeed: boolean;
  followers?: Agent[];
  following?: Agent[];
  actions: any;
  followersPercentage: number;
  followingPercentage: number;
  type: string;
}

const DEFAULT_STATE = AgentState.NOT_READ;

export default abstract class Agent implements AgentConfig {
  readonly id: number;
  name: string;
  state: AgentState = DEFAULT_STATE;
  isSeed: boolean;
  followers: Agent[] = [];
  following: Agent[] = [];
  actions: any;
  followersPercentage: number;
  followingPercentage: number;
  type: string;

  constructor(agentConfig: AgentConfig) {
    this.id = agentConfig.id;
    this.name = agentConfig.name;
    this.isSeed = agentConfig.isSeed;
    this.followersPercentage = agentConfig.followersPercentage;
    this.followingPercentage = agentConfig.followingPercentage;
    this.type = agentConfig.type;

    if (agentConfig.state) {
      this.state = agentConfig.state;
    }
  }

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

    const agentIndex = this.following.findIndex(({ id }) => id === agent.id);
    if (agentIndex === -1) {
      return;
    }

    // add follower
    this.following.push(agent);
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

    const agentIndex = this.following.findIndex(({ id }) => id === agentId);
    if (agentIndex === -1) return;

    // remove follower
    this.following.splice(agentIndex, 1);
  }

  receiveMessage(): void {
    if (this.state === AgentState.NOT_READ) {
      // const action : Action = this._actions.find((actionFind) => actionFind.name === 'read');
      // action.Execute(this);
      // if (this._state === Agent.READ) {
      //   const action2 : Action = this._actions.find((actionFind) => actionFind.name === 'share');
      //   action2.Execute(this);
      // }
    }
  }
}

// /**
//  * Used for updating a specific property of the class instance.
//  * @param propertyName can be name, initialState, followersPercentage, etc.
//  * @param value the new value of the property.
//  */
// updateConfigProperty<AgentConfigPropertyName extends keyof AgentConfig>(
//   propertyName: AgentConfigPropertyName,
//   value: AgentConfig[AgentConfigPropertyName]
// ) {
//   this[propertyName] = value;
// }
