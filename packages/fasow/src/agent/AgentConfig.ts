import Action from "../actions/Action";
import Agent, {AgentState} from "./Agent";

export interface AgentConfig {
    readonly id : number;
    state? : AgentState;
    isSeed : boolean;
    actions : Action[];
    followers : Agent[];
    followings : Agent[];
    readonly indexMetaAgentConfig : number;
}