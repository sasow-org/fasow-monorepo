import Action from "../Action";
import ActionConfig from "../ActionConfig";

export default abstract class ActionCreator{
    public abstract factoryMethod(actionData: ActionConfig) : Action;

    someOperation() : void {
        console.log("Do some operation");
    }
}