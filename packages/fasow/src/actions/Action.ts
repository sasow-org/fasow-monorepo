// eslint-disable-next-line import/no-cycle
import Agent from "../agent/Agent";
import ActionConfig from "./ActionConfig";
// eslint-disable-next-line import/no-cycle
import IActionCreator from "./IActionCreator";
import MetaActionConfig from "./MetaActionConfig";

export default abstract class Action implements ActionConfig, IActionCreator {
  name: string;
  probability: number;
  idMetaActionConfig: number;

  constructor(actionConfig: ActionConfig) {
    this.name = actionConfig.name;
    this.probability = actionConfig.probability;
    this.idMetaActionConfig = actionConfig.idMetaActionConfig;
  }

  abstract execute(agent: Agent): void;

  // todo : maybe this can move to other class to handle maths like NumberHandler ... to handle and get random type numbers
  // eslint-disable-next-line class-methods-use-this
  public getRandom(): number {
    return Math.random() * 100 + 1;
  }

  abstract createAction(actionData: MetaActionConfig): Action;
}
