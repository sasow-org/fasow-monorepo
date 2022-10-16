import type Action from "./Action";
import MetaActionConfig from "./MetaActionConfig";

export default interface IActionCreator {
  createAction(actionData: MetaActionConfig): Action;
}
