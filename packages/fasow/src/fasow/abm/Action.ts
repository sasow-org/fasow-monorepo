import ActionConfig from "../config/config/ActionConfig";
import MetaActionConfig from "../config/metaconfig/MetaActionConfig";
import type Agent from "./Agent";
import type IActionCreator from "./interfaces/Action/IActionCreator";

export default abstract class Action implements ActionConfig, IActionCreator {
  name: string;
  probability: number;
  idMetaActionConfig: number;

  constructor() {
    this.name = "";
    this.probability = -1;
    this.idMetaActionConfig = -1;
  }

  abstract execute(agent: Agent): void;

  // todo : maybe this can move to other class to handle maths like NumberHandler ... to handle and get random type numbers
  // eslint-disable-next-line class-methods-use-this
  public getRandom(): number {
    return Math.random() * 100 + 1;
  }

  setConfig(actionConfig: MetaActionConfig): Action {
    this.name = actionConfig.name;
    this.probability = actionConfig.probability;
    this.idMetaActionConfig = actionConfig.id;
    return this;
  }

  abstract createAction(actionData: MetaActionConfig): Action;
}
