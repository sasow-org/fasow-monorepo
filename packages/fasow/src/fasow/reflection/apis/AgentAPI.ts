// eslint-disable-next-line import/no-cycle
import Agent from "../../abm/Agent";
// eslint-disable-next-line import/no-cycle
import IAgentCreator from "../../abm/interfaces/Agent/IAgentCreator";
import MetaAgentConfig from "../../config/metaconfig/MetaAgentConfig";

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
  private agentsFactories: Map<typeof Agent, IAgentCreator>;
  private agentConfigs: MetaAgentConfig[];

  constructor() {
    this.agentsFactories = new Map<typeof Agent, IAgentCreator>();
    this.agentConfigs = [];
  }

  registerNewAgent(type: typeof Agent) {
    // @ts-ignore
    // eslint-disable-next-line new-cap
    this.agentsFactories.set(type, new type());
  }

  registerNewMetaAgentConfig(agentConfig: MetaAgentConfig) {
    this.agentConfigs.push(agentConfig);
  }

  registerMetaConfigs(agentConfigs: MetaAgentConfig[]) {
    this.agentConfigs = agentConfigs;
  }

  private getAgent(type: typeof Agent) {
    return this.agentsFactories.get(type);
  }

  generateAgentList(): Agent[] {
    const auxList: Agent[] = [];
    this.agentConfigs.forEach((config) => {
      for (let i = 0; i < config.quantity; i += 1) {
        const agent = this.getAgent(config.type)?.createAgent(
          auxList.length,
          config
        );
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
        const agent = this.getAgent(config.type)?.createAgent(
          auxList.length,
          config
        );
        if (agent) {
          auxList.push(agent);
        } else {
          throw new Error(`Agent Type ${config.type} not exist in AgentAPI`);
        }
      }
    });
    return auxList;
  }

  getMetaAgentConfigById(id: number) {
    return this.agentConfigs.filter((config) => config.id === id)[0];
  }

  // todo: a method to set the type of agent to create with an specific config
  // todo: a method to order the actions config? maybe that has to been in ActionAPI
}
