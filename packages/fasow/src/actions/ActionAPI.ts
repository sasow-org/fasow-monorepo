import Action from "./Action";
import MetaActionConfig from "./MetaActionConfig";
import ActionCreator from "./factory/ActionCreator";

/*
Esta capa permite crear nuevas acciones que pueden ser ejecutadas por los agentes.
Debido al alto nivel de acoplamiento que existe entre los agentes y las acciones, ya que
un agente ejecuta acciones. Utilizamos el patrón de inversión de control para que las
acciones reciban al agente como parámetro y así permitir a esta capa que las
acciones controlen el comportamiento de los agentes. Al querer agregar nuevas
características a FASOW, los cambios llegaran hasta máximo esta capa o nivel de la torre,
de igual forma que en las capas anteriores, esta capa utiliza la API de \co{TowerHandler}
que permite una comunicación con las demás capas inferiores
 */

export default class ActionAPI {
  private static instance: ActionAPI;

  // todo: busca una forma de registrar las clases que puedes instanciar
  private actionFactories: Map<string, ActionCreator>;
  private actionConfigs: MetaActionConfig[];

  constructor() {
    this.actionFactories = new Map<string, ActionCreator>();
    this.actionConfigs = [];
  }

  static getInstance(): ActionAPI {
    if (this.instance === undefined) {
      this.instance = new ActionAPI();
    }
    return this.instance;
  }

  registerActionFactory(newFactory: ActionCreator, type: string) {
    this.actionFactories.set(type, newFactory);
  }

  registerMetaActionConfig(actionConfig: MetaActionConfig) {
    this.actionConfigs.push(actionConfig);
  }

  generateActionList(): Action[] {
    const auxList: Action[] = [];
    this.actionConfigs.forEach((actionConfig) => {
      const action = this.actionFactories
        .get(actionConfig.type)
        ?.createAction(actionConfig);
      if (action) {
        auxList.push(action);
      } else {
        throw new Error(
          `Action Type, ${actionConfig.type} not exist in ActionAPI`
        );
      }
    });
    return auxList;
  }

  generateActions(metaConfigs: MetaActionConfig[]): Action[] {
    const auxList: Action[] = [];
    metaConfigs.forEach((config) => {
      const action = this.actionFactories
        .get(config.type)
        ?.createAction(config);
      if (action) {
        auxList.push(action);
      } else {
        throw new Error(`Action Type, ${config.type} not exist in ActionAPI`);
      }
    });
    return auxList;
  }

  getMetaConfigs(): MetaActionConfig[] {
    const list: MetaActionConfig[] = this.actionConfigs;
    this.actionConfigs = [];
    return list;
  }
}
