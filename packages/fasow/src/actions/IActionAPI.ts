import Action from "./Action";
import IActionCreator from "./IActionCreator";
import MetaActionConfig from "./MetaActionConfig";

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

class IActionAPI {
  private actionFactories: Map<string, IActionCreator>;
  private actionConfigs: MetaActionConfig[];

  constructor() {
    this.actionFactories = new Map<string, IActionCreator>();
    this.actionConfigs = [];
  }

  registerNewAction(newActionType: typeof Action) {
    // eslint-disable-next-line new-cap
    // @ts-ignore
    // eslint-disable-next-line new-cap
    this.actionFactories.set(newActionType.name, new newActionType());
  }

  registerMetaActionConfig(actionConfig: MetaActionConfig) {
    this.actionConfigs.push(actionConfig);
  }

  generateActionList(): Action[] {
    const auxList: Action[] = [];
    this.actionConfigs.forEach((actionConfig) => {
      const action = this.actionFactories
        .get(actionConfig.type.name)
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
        .get(config.type.name)
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

const ActionAPI: IActionAPI = new IActionAPI();
export default ActionAPI;
