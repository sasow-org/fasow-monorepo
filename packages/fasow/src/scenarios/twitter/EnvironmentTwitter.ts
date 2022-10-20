import { AgentState } from "../../agent/Agent";
import RowData from "../../data/RowData";
import Environment from "../../environment/Environment";
import EssentialAPI from "../../essential/IEssentialAPI";
import MetaExperimentConfig from "../../experiment/MetaExperimentConfig";

export default class EnvironmentTwitter extends Environment {
  run(): void {
    while (EssentialAPI.getTick() < this.periods) {
      this.step();
    }
  }

  step(): void {
    this.getCountStates();
    if (EssentialAPI.getTick() === 0) {
      this.seeds.forEach((seed) => {
        seed.doActions();
      });
    } else {
      this.agents.forEach((agent) => {
        agent.doActions();
      });
    }
    this.updateTick();
  }

  // eslint-disable-next-line class-methods-use-this
  createEnvironment(environmentConfig: MetaExperimentConfig): Environment {
    return new EnvironmentTwitter().setConfig(environmentConfig);
  }

  // eslint-disable-next-line class-methods-use-this
  getCountStates(): RowData {
    const states = [0, 0, 0, 0];
    this.agents.forEach((agent) => {
      switch (agent.state) {
        case AgentState.NOT_READ:
          states[0] += 1;
          break;
        case AgentState.READ:
          states[1] += 1;
          break;
        case AgentState.READY_TO_SHARE:
          states[2] += 1;
          break;
        case AgentState.SHARED:
          states[3] += 1;
          break;
        default:
          throw new Error("In getCountStates() readed an not registered state");
      }
    });
    console.log("Environment.period: ", this.currentPeriod, " \n states: ", {
      NOREAD: states[0],
      READ: states[1],
      PREARE: states[2],
      SHARED: states[3],
    });
    return new RowData();
  }
}
