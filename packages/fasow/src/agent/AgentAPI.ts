import Agent from "./Agent";
import MetaAgentConfig from "./MetaAgentConfig";
import AgentCreator from "./factory/AgentCreator";

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
  private static instance: AgentAPI;
  private agentsFactories: Map<string, AgentCreator>;
  private agentConfigs: MetaAgentConfig[];

  constructor() {
    this.agentsFactories = new Map<string, AgentCreator>();
    this.agentConfigs = [];
  }

  static getInstance(): AgentAPI {
    if (this.instance === undefined) {
      this.instance = new AgentAPI();
    }
    return this.instance;
  }

  registerAgentFactory(newFactory: AgentCreator, type: string) {
    this.agentsFactories.set(type, newFactory);
  }

  registerMetaAgentConfig(agentConfig: MetaAgentConfig) {
    this.agentConfigs.push(agentConfig);
  }

  generateAgentList(): Agent[] {
    const auxList: Agent[] = [];
    this.agentConfigs.forEach((config) => {
      for (let i = 0; i < config.quantity; i += 1) {
        const agent = this.agentsFactories
          .get(config.type)
          ?.createAgent(config);
        if (agent) {
          auxList.push(agent);
        } else {
          throw new Error(`Agent Type ${config.type} not exist in AgentAPI`);
        }
      }
    });
    return auxList;
  }

  generateAgentsByConfigs(metaConfigs: MetaAgentConfig[]): Agent[] {
    const auxList: Agent[] = [];
    metaConfigs.forEach((config) => {
      for (let i = 0; i < config.quantity; i += 1) {
        const agent = this.agentsFactories
          .get(config.type)
          ?.createAgent(config);
        if (agent) {
          auxList.push(agent);
        } else {
          throw new Error(`Agent Type ${config.type} not exist in AgentAPI`);
        }
      }
    });
    return auxList;
  }

  getMetaConfigById(id: number) {
    return this.agentConfigs.filter((config) => config.id === id)[0];
  }

  // todo: a method to set the type of agent to create with an specific config
  // todo: a method to order the actions config? maybe that has to been in ActionAPI
  // todo: los agentes deben tener el indice que haga referencia a su metaconfiguracion ?
  // todo: doActions() maybe this doesn't have to be here
}
