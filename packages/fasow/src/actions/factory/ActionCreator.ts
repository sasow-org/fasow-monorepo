import Action from "../Action";
import MetaActionConfig from "../MetaActionConfig";

export default abstract class ActionCreator{
    public abstract createAction(actionData: MetaActionConfig) : Action;
}