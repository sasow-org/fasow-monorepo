import Agent from "../agent/Agent";
import RowData from "../data/RowData";
import { IDataDetailed, IDataEssential, IObservable } from "../interfaces";
import {EnvironmentConfig} from "./EnvironmentConfig";
import {AgentConfig} from "../agent/AgentConfig";

export default abstract class Environment
  implements EnvironmentConfig, IObservable, IDataEssential, IDataDetailed
{
  readonly id: number;
  initialized: boolean;
  currentPeriod: number;
  periods: number;
  seedSize: number;
  networkSize: number;
  seeds: Agent[];
  agents: Agent[];
  protected constructor(config: EnvironmentConfig) {
    this.id = config.id;
    this.networkSize = config.networkSize;
    this.seedSize = config.seedSize;
    this.periods = config.periods;
    this.initialized = false;
    this.currentPeriod = -1;
    this.agents = [];
    this.seeds = [];
  }

  public abstract step(): void;
  public abstract run(): void;
  public abstract getCountStates(): RowData;

  /**
   * Initializes the current environment.
   */
  initialize(): void {
    // todo : use AgentAPI to create agents.
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
    // todo : use AgentAPI to create agents.
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
      // this.agentConfigs[agent.indexMetaAgentConfig];
      // todo : maybe to do this you need to call the AgentAPI
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
      while (agent.followings.length !== total) {
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
        agent.followings.length !==
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
