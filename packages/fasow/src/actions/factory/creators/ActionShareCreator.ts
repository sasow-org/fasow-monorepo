import ActionCreator from "../ActionCreator";
import Action from "../../Action";
import {ActionShare} from "../../custom-actions/ActionShare";
import ActionConfig from "../../ActionConfig";

export default class ActionShareCreator extends ActionCreator {

    createAction(actionData: ActionConfig): Action {
        return new ActionShare(actionData);
    }

}
