// eslint-disable-next-line import/no-cycle
import Agent from "../agent/Agent";
import ActionConfig from "./ActionConfig";

export default abstract class Action implements ActionConfig{
  name: string;
  probability: number;
  indexMetaActionConfig: number;

  protected constructor(actionConfig: ActionConfig) {
    this.name = actionConfig.name;
    this.probability = actionConfig.probability;
    this.indexMetaActionConfig = actionConfig.indexMetaActionConfig;
  }

  abstract execute(agent: Agent): void;

  public getRandom(): number {
    return Math.random() * 100 + 1;
  }


}
