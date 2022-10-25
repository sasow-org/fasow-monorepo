// eslint-disable-next-line import/no-cycle
import { AgentState } from "../../agent/AgentState";
import RowData from "../../data/RowData";
// eslint-disable-next-line import/no-cycle
import Environment from "../../environment/Environment";
import EssentialAPI from "../../essential/IEssentialAPI";
import MetaScenarioConfig from "../MetaScenarioConfig";

export default class EnvironmentTwitter extends Environment {
  run(): void {
    console.log("ENVIRONMENT PERIOD ON RUN: ", this.currentPeriod);
    console.log("Period in API: ", EssentialAPI.getTick());
    while (EssentialAPI.canNextTick()) {
      this.step();
    }
  }

  step(): void {
    this.getCountStates();
    if (EssentialAPI.getTick() === 0) {
      this.seeds.forEach((seed) => {
        seed.step();
      });
    } else {
      this.agents.forEach((agent) => {
        agent.step();
      });
    }
    this.nextTick();
  }

  // eslint-disable-next-line class-methods-use-this
  createEnvironment(scenarioConfig: MetaScenarioConfig): Environment {
    return new EnvironmentTwitter().setConfig(scenarioConfig);
  }

  // eslint-disable-next-line class-methods-use-this
  getCountStates(): RowData {
    /*
    Este metodo puede volver a la clase abstracta environment, si encontramos una forma de gestionar los estados,
    registrarlos y en base a eso se ejecuta el metodo de abajo.
     */
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
    const rdStates: RowData = new RowData();
    rdStates.addRow(states[0], "NOT_READ");
    rdStates.addRow(states[1], "READ");
    rdStates.addRow(states[2], "READY_TO_SHARE");
    rdStates.addRow(states[3], "SHARED");
    return rdStates;
  }
}
