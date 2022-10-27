// eslint-disable-next-line import/no-cycle
// eslint-disable-next-line import/no-cycle
import Environment from "../../abm/Environment";
import { AgentState } from "../../abm/interfaces/Agent/AgentState";
import MetaScenarioConfig from "../../config/metaconfig/MetaScenarioConfig";
import RowData from "../../datahandler/data/RowData";

export default class EnvironmentTwitter extends Environment {
  run(): void {
    // console.log("ENVIRONMENT PERIOD ON RUN: ", this.currentPeriod);
    // console.log("Period in API: ", TowerHandler.getTick());
    console.log(
      "ENVIRONMENT PERIOD ON RUN: ",
      this.getTick(),
      "of (",
      this.getMaxTick(),
      ")"
    );
    while (this.canNextTick()) {
      console.log(
        "ENVIRONMENT PERIOD ON RUN: ",
        this.getTick(),
        this.getMaxTick()
      );
      this.step();
    }
  }

  step(): void {
    console.log("On Step: ", this.getTick(), " of(", this.getMaxTick(), ")");
    this.getCountStates();
    if (this.getTick() === 0) {
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
    console.log("Environment.period: ", this.getTick(), " \n states: ", {
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
