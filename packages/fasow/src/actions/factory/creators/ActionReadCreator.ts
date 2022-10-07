import ActionCreator from "../ActionCreator";
import {ActionRead} from "../../custom-actions/ActionRead";
import Action from "../../Action";
import ActionConfig from "../../ActionConfig";

export default class ActionReadCreator extends ActionCreator {

    factoryMethod(actionData: ActionConfig): Action {
        return new ActionRead(actionData);
    }

}