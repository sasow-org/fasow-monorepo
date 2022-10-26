// eslint-disable-next-line import/no-cycle
import Agent from "../agent/Agent";
import RowData from "../data/RowData";
import { TowerHandler } from "../main";
import MetaScenarioConfig from "../scenarios/MetaScenarioConfig";
import type EnvironmentConfig from "./EnvironmentConfig";
import type IEnvironmentCreator from "./IEnvironmentCreator";

export default abstract class Environment
  implements EnvironmentConfig, IEnvironmentCreator
{
  id: number;
  initialized: boolean;
  // currentPeriod: number;
  seedSize: number;
  networkSize: number;
  seeds: Agent[];
  agents: Agent[];

  constructor() {
    this.id = -1;
    this.networkSize = -1;
    this.seedSize = -1;
    // this.periods = -1;
    this.initialized = false;
    // this.currentPeriod = -1;
    this.agents = [];
    this.seeds = [];
  }

  setConfig(config: MetaScenarioConfig): Environment {
    this.id = -1;
    this.networkSize = config.networkSize;
    let value = 0;
    config.metaAgentsConfigs.forEach((agent) => {
      if (agent.isSeed) {
        value += agent.quantity;
      }
    });
    this.seedSize = value;
    this.initialized = false;
    // this.currentPeriod = -1;
    console.log("Setting MaxTick to --> ", config.periods);
    this.setMaxTick(config.periods);
    console.log("MaxTick is : ", this.getMaxTick());
    this.agents = [];
    this.seeds = [];
    TowerHandler.registerMetaAgentsConfigs(config.metaAgentsConfigs);
    // console.log("on Environment, config: ", config);
    return this;
  }

  public abstract step(): void;
  public abstract run(): void;
  public abstract getCountStates(): RowData;

  /**
   * Initializes the current environment.
   */
  initialize(): void {
    console.log("On Environment Initialize");
    console.log("Agents to Create: ", this.networkSize);
    console.log("Seeds: ", this.seedSize);
    console.log("Real agents quantity: ", this.agents.length);
    console.log("Real seeds quantity: ", this.seeds.length);
    this.createAgents();
    console.log("Create agents passed");
    this.addFollowers();
    console.log("add followers passed");
    this.addFollowings();
    // console.log("add followings passed");

    console.log(
      "On Environment Initialize, after created agents and added followers and followings"
    );
    console.log("Agents to Create: ", this.networkSize);
    console.log("Seeds: ", this.seedSize);
    console.log("Real agents quantity: ", this.agents.length);
    console.log("Real seeds quantity: ", this.seeds.length);
    if (!this.isDone()) {
      console.error("Error in initialize environment with id: ", this.id);
    }
    this.initialized = true;
    this.setTick(0);
    console.log("All done on environment, Ending initialization....");
  }

  /**
   * Populates the list of agents of the environment according to the agent config
   * @param agentConfig the config that the agents will be based on
   */
  createAgents(): void {
    this.agents = TowerHandler.generateAgentList();
    this.agents.forEach((agent) => {
      if (agent.isSeed) {
        this.seeds.push(agent);
      }
    });
    // DataHandler.agentModel.props = this.agents;
  }

  /**
   * Adds followers to the agents of the environment.
   */
  addFollowers(): void {
    this.agents.map((agent: Agent) => {
      const total: number = Math.round(
        (TowerHandler.getMetaAgentConfigById(agent.indexMetaAgentConfig)
          .followersPercentage *
          this.networkSize) /
          100
      );
      while (agent.followers.length !== total) {
        const max: number = this.agents.length;
        const randomIndex: number = Number.parseInt(
          `${Math.random() * (max - 1 + 1)}${0}`,
          10
        );
        agent.addFollower(this.agents[randomIndex]);
      }
      return agent;
    });
  }

  /**
   * Adds followings to the agents of the environment.
   */
  addFollowings(): void {
    this.agents.map((agent: Agent) => {
      const total: number = Math.round(
        (TowerHandler.getMetaAgentConfigById(agent.indexMetaAgentConfig)
          .followingsPercentage *
          this.networkSize) /
          100
      );

      while (agent.followings.length !== total) {
        const max: number = this.agents.length;
        const randomIndex: number = Number.parseInt(
          `${Math.random() * (max - 1 + 1)}${0}`,
          10
        );
        agent.addFollowing(this.agents[randomIndex]);
      }
      return agent;
    });
  }

  /**
   * Returns true agents, seeds, followers and followings are all set up.
   */
  isDone() {
    if (this.agents.length !== this.networkSize) {
      throw new Error("Agents is not equal to networkSize");
    }

    if (this.seeds.length !== this.seedSize) {
      throw new Error("Seeds is not equal to seedSize");
    }

    this.agents.forEach((agent: Agent) => {
      if (
        agent.followers.length !==
          Math.round(
            (TowerHandler.getMetaAgentConfigById(agent.indexMetaAgentConfig)
              .followersPercentage *
              this.networkSize) /
              100
          ) &&
        agent.followings.length !==
          Math.round(
            (TowerHandler.getMetaAgentConfigById(agent.indexMetaAgentConfig)
              .followingsPercentage *
              this.networkSize) /
              100
          )
      ) {
        throw new Error(
          `On Agent.id: ${agent.id} followers or followings are not equal to the real number of followers`
        );
      }
    });
    return true;
  }

  DataEssential(): RowData {
    const rdEnvironment: RowData = new RowData();
    rdEnvironment.addRow(this.getTick(), "tick");
    rdEnvironment.addRow(this.getMaxTick(), "max_tick");
    rdEnvironment.addRows(this.getCountStates());
    return rdEnvironment;
  }

  DataDetailed(): RowData {
    const rdEnvironment: RowData = new RowData();
    rdEnvironment.addRow(this.getTick(), "simulation_period");
    return rdEnvironment;
  }

  abstract createEnvironment(
    environmentConfig: MetaScenarioConfig
  ): Environment;

  // eslint-disable-next-line class-methods-use-this
  setTick(tick: number) {
    TowerHandler.setTick(tick);
  }

  // eslint-disable-next-line class-methods-use-this
  nextTick() {
    TowerHandler.nextTick();
  }

  // eslint-disable-next-line class-methods-use-this
  getTick(): number {
    return TowerHandler.getTick();
  }

  // eslint-disable-next-line class-methods-use-this
  canNextTick(): boolean {
    return TowerHandler.canNextTick();
  }

  // eslint-disable-next-line class-methods-use-this
  getMaxTick(): number {
    return TowerHandler.getMaxTick();
  }

  // eslint-disable-next-line class-methods-use-this
  setMaxTick(maxTick: number) {
    TowerHandler.setMaxTick(maxTick);
  }
}
