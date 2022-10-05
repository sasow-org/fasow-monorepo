import {MetaAgentConfig} from "./MetaAgentConfig";
import {MetaActionConfig} from "../actions/MetaActionConfig";
import {AgentConfig} from "./Agent";

/*
Esta capa permite crear, agrupar y combinar tipos diferentes de agentes,
también permite relacionar a los agentes con sus respectivas configuraciones
y respectivos set de posibles acciones además de establecer el orden de
ejecución de estas durante la simulación. Al igual que en las capas inferiores
al ampliar la funcionalidad de FASOW buscando querer agregar nuevas características
al modelo y si la situación lo requiere. Podemos crear nuevos agentes especializados
que pueden ser utilizados en los niveles inferiores de la arquitectura esto a través
de la API de metaprogramacion de \co{TowerHandler} que permite la comunicación.
 */
export default class AgentAPI {
    private agentConfigs : MetaAgentConfig[];

    constructor() {
        this.agentConfigs = [];
    }

    // Create
    generateEmptyConfig() : MetaAgentConfig {

    }

    // todo: a method to set the type of agent to create with an specific config
    // todo: a method to order the actions config? maybe that has to been in ActionAPI

    // relaciona una configuracion de agente con sus respectivas configuraciones
    assignActionToConfig(id : number, actions : MetaActionConfig[]) : void {
        if(this.agentConfigs[id]){
            this.agentConfigs[id].actionsConfigs = actions;
        }
    }

    generateAgentConfigs() : AgentConfig[] {
        // todo : per Meta agent config transform into a agentConfig
    }

    generateAgentConfig(id: number) : AgentConfig {
        // for the id of the metaAgentConfig, return the respective AgentConfig
    }

    addAgentConfig(metaAgentConfig: MetaAgentConfig) : void {
        this.agentConfigs.push(metaAgentConfig);
    }

    removeAgentConfig(id : number) : void {
        this.agentConfigs = this.agentConfigs.filter(config => config.id !== id);
    }

    // todo: doActions() maybe this doesn't have to be here


}