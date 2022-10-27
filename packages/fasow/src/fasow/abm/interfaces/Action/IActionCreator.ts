import MetaActionConfig from "../../../config/metaconfig/MetaActionConfig";
import type Action from "../../Action";

export default interface IActionCreator {
  createAction(actionData: MetaActionConfig): Action;
}
