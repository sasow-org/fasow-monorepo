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

  public initialize(): void {
    this.agentConfigs.forEach((agentConfig) => {
      this.createAgents(agentConfig);
    });

    this.addFollowers();
    this.addFollowings();

    if (!this.isDone()) {
      console.log("Error in initialize environment with id: ", this._id);
      console.log("ERROR ERROR ERROR ERROR ERROR ERROR");
      console.log("ERROR ERROR ERROR ERROR ERROR ERROR");
      console.log("ERROR ERROR ERROR ERROR ERROR ERROR");
      console.log("ERROR ERROR ERROR ERROR ERROR ERROR");
    }

    this._initialized = true;
  }

  public createAgents(agentConfig: AgentConfig): void {
    // for (let i = 0; i < agentConfig.quantityAgent; i++) {
    //   const agentReference = FactoryDynamicClass.getInstance().getAgent(agentConfig.agentType);
    //   // eslint-disable-next-line new-cap,@typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   // eslint-disable-next-line new-cap
    //   const auxAgent = new agentReference(i, agentConfig);
    //   this.users.push(auxAgent);
    //   if (auxAgent.isSeed) {
    //     this.seeds.push(auxAgent);
    //   }
    //   ++this.usersQuantity;
    // }
    // console.log('End create agents.');
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
