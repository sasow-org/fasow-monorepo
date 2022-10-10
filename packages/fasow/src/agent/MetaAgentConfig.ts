import MetaActionConfig from "../actions/MetaActionConfig";
import {AgentState} from "./Agent";

export default interface  MetaAgentConfig {
    // Metadata
    readonly id: number;
    name : string;
    quantity : number;
    followersPercentage : number;
    followingsPercentage : number;
    actionsConfigs : MetaActionConfig[],
    type: string
    // Normal data to create a agentConfig ?
    state? : AgentState;
    isSeed : boolean;
}