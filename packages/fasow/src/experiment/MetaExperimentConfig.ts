import {MetaAgentConfig} from "../agent/MetaAgentConfig";

export default interface MetaExperimentConfig {
    // Experiment Metadata
    readonly id : number;
    name : string;
    description : string;
    type: string;
    maxRepetitions : number;
    // Scenario Metadata
    networkSize : number;
    seedSize : number;
    periods : number;
    simulationType : string;
    environmentType : string;
    // Agents Metadata
    metaAgentConfig: MetaAgentConfig[];
    // DataHandler Metadata
    essentialData : boolean;
    detailedData : boolean;
}