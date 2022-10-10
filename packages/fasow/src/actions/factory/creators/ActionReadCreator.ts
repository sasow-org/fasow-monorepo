import Action from "../../Action";
import MetaActionConfig from "../../MetaActionConfig";
import ActionRead from "../../custom-actions/ActionRead";
import ActionCreator from "../ActionCreator";

export default class ActionReadCreator extends ActionCreator {
  createAction(actionData: MetaActionConfig): Action {
    return new ActionRead({
      name: actionData.name,
      idMetaActionConfig: actionData.id,
      probability: actionData.probability,
    });
  }
}
