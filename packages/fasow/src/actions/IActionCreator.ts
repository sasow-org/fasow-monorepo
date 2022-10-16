// eslint-disable-next-line import/no-cycle
import Action from "./Action";
import MetaActionConfig from "./MetaActionConfig";

export default interface IActionCreator {
  createAction(actionData: MetaActionConfig): Action;
}
