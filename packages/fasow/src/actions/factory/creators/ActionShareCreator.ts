import Action from "../../Action";
import MetaActionConfig from "../../MetaActionConfig";
import ActionShare from "../../custom-actions/ActionShare";
import ActionCreator from "../ActionCreator";

export default class ActionShareCreator extends ActionCreator {
  createAction(actionData: MetaActionConfig): Action {
    return new ActionShare({
      idMetaActionConfig: actionData.id,
      name: actionData.name,
      probability: actionData.probability,
    });
  }
}
