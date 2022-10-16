import Agent from "../agent/Agent";
import AgentAPI from "../agent/AgentAPI";
import RowData from "../data/RowData";
import MetaExperimentConfig from "../experiment/MetaExperimentConfig";
import { EnvironmentConfig } from "./EnvironmentConfig";
// eslint-disable-next-line import/no-cycle
import IEnvironmentCreator from "./IEnvironmentCreator";

export default abstract class Environment
  implements EnvironmentConfig, IEnvironmentCreator
{
  readonly id: number;
  initialized: boolean;
  currentPeriod: number;
  periods: number;
  seedSize: number;
  networkSize: number;
  seeds: Agent[];
  agents: Agent[];
  constructor(config: EnvironmentConfig) {
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
    this.createAgents();
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
  createAgents(): void {
    this.agents = AgentAPI.getInstance().generateAgentList();
  }

  /**
   * Adds followers to the agents of the environment.
   */
  addFollowers(): void {
    this.agents.map((agent: Agent) => {
      // this.agentConfigs[agent.indexMetaAgentConfig];
      // todo : maybe to do this you need to call the AgentAPI
      const total: number = Math.round(
        (AgentAPI.getInstance().getMetaConfigById(agent.indexMetaAgentConfig)
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
        (AgentAPI.getInstance().getMetaConfigById(agent.indexMetaAgentConfig)
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
      return false;
    }

    if (this.seeds.length !== this.seedSize) {
      return false;
    }

    // eslint-disable-next-line consistent-return
    this.agents.forEach((agent: Agent) => {
      if (
        agent.followers.length !==
          Math.round(
            (AgentAPI.getInstance().getMetaConfigById(
              agent.indexMetaAgentConfig
            ).followersPercentage *
              this.networkSize) /
              100
          ) &&
        agent.followings.length !==
          Math.round(
            (AgentAPI.getInstance().getMetaConfigById(
              agent.indexMetaAgentConfig
            ).followingsPercentage *
              this.networkSize) /
              100
          )
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

  abstract createEnvironment(
    environmentConfig: MetaExperimentConfig
  ): Environment;
}
