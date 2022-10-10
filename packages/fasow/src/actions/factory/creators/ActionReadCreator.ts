import ActionCreator from "../ActionCreator";
import {ActionRead} from "../../custom-actions/ActionRead";
import Action from "../../Action";
import {MetaActionConfig} from "../../MetaActionConfig";

export default class ActionReadCreator extends ActionCreator {
    createAction(actionData: MetaActionConfig): Action {
        return new ActionRead(actionData);
    }
}