// eslint-disable-next-line import/no-cycle
import { TowerHandler } from "../../main";
import type EnvironmentConfig from "../config/config/EnvironmentConfig";
import MetaScenarioConfig from "../config/metaconfig/MetaScenarioConfig";
import Agent from "./Agent";
import type IEnvironmentCreator from "./interfaces/Environment/IEnvironmentCreator";

/**
 * Environment is the place where the simulation is executed,
 * to do this, the user need to overdrive the step and run methods
 * to specify the behavior of all the simulation.
 *
 * @method step: allow to the users to specify the behaviour of the agents during the simulation
 * @method run: handle the step by step of the simulation, calling the step method each tick of the clock and notifying the DataHandler to capture  and save a state of the simulation
 */
export default abstract class Environment
  implements EnvironmentConfig, IEnvironmentCreator
{
  id: number;
  initialized: boolean;
  seedSize: number;
  networkSize: number;
  seeds: Agent[];
  agents: Agent[];

  constructor() {
    this.id = -1;
    this.networkSize = -1;
    this.seedSize = -1;
    this.initialized = false;
    this.agents = [];
    this.seeds = [];
  }

  /**
   * Allow to the user to load the Scenario config to the environment to after initializes
   * the simulation
   *
   * @param config : MetaScenarioConfig : establishes the quantity of agents to create,
   * sets his configurations, calculate the seedSize and registers the agentConfigs
   * in the TowerHandler at AgentAPI level.
   *
   */
  setConfig(config: MetaScenarioConfig): Environment {
    this.id = -1;
    this.networkSize = config.networkSize;
    let value = 0;
    config.metaAgentsConfigs.forEach((agent) => {
      if (agent.isSeed) {
        value += agent.percentage;
      }
    });
    this.seedSize = Math.round((value * this.networkSize) / 100);
    this.initialized = false;
    console.log("Setting MaxTick to --> ", config.maxTick);
    this.setMaxTick(config.maxTick);
    console.log("MaxTick is : ", this.getMaxTick());
    this.agents = [];
    this.seeds = [];
    TowerHandler.registerMetaAgentsConfigs(config.metaAgentsConfigs);
    return this;
  }

  /**
   * Allow to users to handle what happen in each period of the running simulation
   */
  public abstract step(): void;

  /**
   * Starts the simulation to being executed period per period
   * This method allow to users to introduce the behaviour of the scenario
   */
  public abstract run(): void;

  /**
   * Initializes the current environment, creating the agents, adding the followers and checking if all it's ok to run the simulation
   */
  initialize(): void {
    console.log("On Environment Initialize");
    console.log("Agents to Create: ", this.networkSize);
    console.log("Seeds: ", this.seedSize);
    console.log("Actual Total agents quantity: ", this.agents.length);
    console.log("Actual Total seeds quantity: ", this.seeds.length);
    this.createAgents();
    console.log("Create agents passed");
    this.addFollowers();
    console.log("add followers passed");
    this.addFollowings();
    // console.log("add followings passed");

    console.log("Ending Initialization...");
    console.log("Checking...");
    console.log("Agents to Create: ", this.networkSize);
    console.log("Seeds: ", this.seedSize);
    console.log("Actual Total agents quantity: ", this.agents.length);
    console.log("Actual Total seeds quantity: ", this.seeds.length);
    if (!this.isDone()) {
      throw new Error(`Error in initialize environment with id: ${this.id}`);
    }
    this.initialized = true;
    this.setTick(0);
    console.log("All done on environment!");
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
  }

  /**
   * Creates and sets the relationships between the agents,
   * adding randomly agents to the follower list for each agent
   * of the environment until complete his followers' quantity
   * given by the AgentConfig.
   */
  addFollowers(): void {
    this.agents.map((agent: Agent) => {
      const toRound =
        (TowerHandler.getMetaAgentConfigById(agent.indexMetaAgentConfig)
          .followersPercentage *
          this.networkSize) /
        100;
      const total: number = Math.round(toRound);
      // console.log("Total de Seguidores: ", total);
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
   * After the followers relationships are established, the next thing to do is load the "followings" list of each agent, then, If agent A follows' agent B, then A is a follower of B, at this way the "followings" relationships are established.
   */
  addFollowings(): void {
    // todo: fix, Add Followings no funciona asi, seguir a alguien, te convierte en un seguidor de ese alguien
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
   * Check if the simulation are ready to be executed and returns true if the agents, seeds, followers and followings are all set up or if exist some problem.
   */
  isDone() {
    if (this.agents.length !== this.networkSize) {
      throw new Error("Agents is not equal to networkSize");
    }

    if (this.seeds.length !== this.seedSize) {
      const errorMsg: string =
        `Seeds is not equal to seedSize: ` +
        `\n` +
        `seedSize: ${this.seedSize}\n` +
        `seeds.length: ${this.seeds.length}`;
      throw new Error(errorMsg);
    }

    this.agents.forEach((agent: Agent) => {
      const toRoundAgentFollowersQuantity: number =
        (TowerHandler.getMetaAgentConfigById(agent.indexMetaAgentConfig)
          .followersPercentage *
          this.networkSize) /
        100;
      const roundedAgentFollowersQuantity: number = Math.round(
        toRoundAgentFollowersQuantity
      );
      if (
        agent.followers.length !== roundedAgentFollowersQuantity &&
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

  /**
   * For each agent, his state are reset to the initial state of his MetaAgentConfig
   */
  resetAgentStates(): void {
    this.agents.forEach((agent) => agent.resetState());
  }

  /**
   * For each seed, his state are reset to the initial state of his MetaAgentConfig
   */
  resetSeedStates(): void {
    this.seeds.forEach((seed) => seed.resetState());
  }

  /**
   * Factory Method, allow to users to configure and personalize the creation of the environment
   * @param environmentConfig : MetaScenarioConfig : The configuration of the scenario
   */
  abstract createEnvironment(
    environmentConfig: MetaScenarioConfig
  ): Environment;

  /**
   * set the tick of the clock of the simulation
   * @param tick : number : unit of time of the simulation
   */
  setTick(tick: number) {
    TowerHandler.setTick(tick);
  }

  /**
   * Force a tick update, updating is value +1 and calling the DataHandler to register the data of the simulation
   */
  nextTick(): number {
    return TowerHandler.nextTick();
  }

  /**
   * returns the current tick of the clock of the simulation
   */
  getTick(): number {
    return TowerHandler.getTick();
  }

  /**
   * returns true as long as the clock Tick is less than maxTick
   */
  canNextTick(): boolean {
    return TowerHandler.canNextTick();
  }

  /**
   * return the duration of the simulation
   */
  getMaxTick(): number {
    return TowerHandler.getMaxTick();
  }

  /**
   * set the duration of the simulation
   * @param maxTick : number : the simulation will be executed while the tick be less than the maxTick
   */
  setMaxTick(maxTick: number) {
    TowerHandler.setMaxTick(maxTick);
  }
}
