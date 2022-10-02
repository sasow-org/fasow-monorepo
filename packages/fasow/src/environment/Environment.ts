import Agent, { AgentConfig } from "../agent/Agent";
import RowData from "../data/RowData";
import { IDataDetailed, IDataEssential, IObservable } from "../interfaces";

interface EnvironmentConfig {
  readonly id: number;
  networkSize: number;
  seedSize: number;
  periods: number;
  agentConfigs: AgentConfig[];
  currentPeriod?: number;
  initialized?: boolean;
  agents?: Agent[];
  seeds?: Agent[];
}

export default abstract class Environment
  implements EnvironmentConfig, IObservable, IDataEssential, IDataDetailed
{
  readonly id;
  networkSize;
  seedSize;
  periods;
  agentConfigs;
  currentPeriod = 0;
  initialized = false;
  agents = [];
  seeds = [];

  constructor(config: EnvironmentConfig) {
    this.id = config.id;
    this.networkSize = config.networkSize;
    this.seedSize = config.seedSize;
    this.periods = config.periods;
    this.agentConfigs = config.agentConfigs;
  }

  public abstract step(): void;
  public abstract run(): void;
  public abstract getCountStates(): RowData;

  /**
   * Initializes the current environment.
   */
  initialize(): void {
    this.agentConfigs.forEach((agentConfig) => {
      this.createAgents(agentConfig);
    });

    this.addFollowers();
    this.addFollowings();

    if (!this.isDone()) {
      console.error("Error in initialize environment with id: ", this.id);
    }

    this.initialized = true;
  }

  /**
   * Populates the list of agents of the environment according to the agent config
   * @param agentConfig the config that the agents will be based on
   */
  createAgents(agentConfig: AgentConfig): void {
    // for (let i = 0; i < agentConfig.quantity; i++) {
    //   const agentReference = FactoryDynamicClass.getInstance().getAgent(agentConfig.agentType);
    //   const auxAgent = new agentReference(i, agentConfig);
    //   this.users.push(auxAgent);
    //   if (auxAgent.isSeed) {
    //     this.seeds.push(auxAgent);
    //   }
    //   ++this.usersQuantity;
    // }
    // console.log('End create agents.');
  }

  /**
   * Adds followers to the agents of the environment.
   */
  addFollowers(): void {
    this.agents.map((agent: Agent) => {
      const total: number = agent.getQuantityFollowersByNetwork(
        this.networkSize
      );
      while (agent.followers.length !== total) {
        const max: number = this.agents.length;
        const randomIndex: number = Number.parseInt(
          `${Math.random() * (max - 1 + 1)}${0}`,
          10
        );
        agent.addFollower(this.agents[randomIndex]);
      }
    });
  }

  /**
   * Adds followings to the agents of the environment.
   */
  addFollowings(): void {
    this.agents.map((agent: Agent) => {
      const total: number = agent.getQuantityFollowingsByNetwork(
        this.networkSize
      );
      while (agent.following.length !== total) {
        const max: number = this.agents.length;
        const randomIndex: number = Number.parseInt(
          `${Math.random() * (max - 1 + 1)}${0}`,
          10
        );
        agent.addFollowing(this.agents[randomIndex]);
      }
    });
  }

  /**
   * Returns true agents, seeds, followers and followings are all set up.
   */
  isDone() {
    if (this.agents.length !== this.networkSize) {
      return false;
    }

    if (this.seeds.length !== this.seedSize) {
      return false;
    }

    // eslint-disable-next-line consistent-return
    this.agents.map((agent: Agent) => {
      if (
        agent.followers.length !==
          agent.getQuantityFollowersByNetwork(this.networkSize) &&
        agent.following.length !==
          agent.getQuantityFollowingsByNetwork(this.networkSize)
      ) {
        return false;
      }
    });
    return true;
  }

  DataEssential(): RowData {
    const rdEnvironment: RowData = new RowData();
    rdEnvironment.addRow(this.currentPeriod, "simulation_period");
    rdEnvironment.addRows(this.getCountStates());
    return rdEnvironment;
  }

  DataDetailed(): RowData {
    const rdEnvironment: RowData = new RowData();
    rdEnvironment.addRow(this.currentPeriod, "simulation_period");
    return rdEnvironment;
  }

  notifyData(): void {
    // DataHandler.getInstance().update();
  }
}
