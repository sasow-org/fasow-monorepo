import Action from "../../abm/Action";
import IActionCreator from "../../abm/interfaces/Action/IActionCreator";
import MetaActionConfig from "../../config/metaconfig/MetaActionConfig";

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
  private actionFactories: Map<typeof Action, IActionCreator>;
  private actionConfigs: MetaActionConfig[];

  constructor() {
    this.actionFactories = new Map<typeof Action, IActionCreator>();
    this.actionConfigs = [];
  }

  registerNewAction(newActionType: typeof Action) {
    // @ts-ignore
    // eslint-disable-next-line new-cap
    this.actionFactories.set(newActionType, new newActionType());
  }

  registerMetaActionConfig(actionConfig: MetaActionConfig) {
    this.actionConfigs.push(actionConfig);
  }

  private getAction(type: typeof Action): IActionCreator {
    const action = this.actionFactories.get(type);
    if (action) {
      return action;
    }
    throw Error(`Action Type, ${type.name} not exist in ActionAPI`);
  }

  generateActionList(): Action[] {
    const auxList: Action[] = [];
    this.actionConfigs.forEach((actionConfig) => {
      auxList.push(
        // @ts-ignore
        this.getAction(actionConfig.type).createAction(actionConfig)
      );
    });
    return auxList;
  }

  generateActions(metaConfigs: MetaActionConfig[]): Action[] {
    const auxList: Action[] = [];
    metaConfigs.forEach((actionConfig) => {
      auxList.push(
        // @ts-ignore
        this.getAction(actionConfig.type).createAction(actionConfig)
      );
    });
    return auxList;
  }

  getMetaConfigs(): MetaActionConfig[] {
    const list: MetaActionConfig[] = this.actionConfigs;
    this.actionConfigs = [];
    return list;
  }
}
