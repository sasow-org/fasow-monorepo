import {MetaActionConfig} from "./MetaActionConfig";
import Action from "./Action";

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
    // Todo: apply a factory
    private actionConfigs : MetaActionConfig[]
    private types : any[] ;

    constructor() {
        this.actionConfigs = []
        this.types = []
    }

    addAction(actionConfig: MetaActionConfig) : void {
        this.actionConfigs.push(actionConfig);
    }

    removeAction(id : number ) : void {
        this.actionConfigs = this.actionConfigs.filter( config => config.id !== id );
    }

    createActionList() : Action[] {
        const actionList : Action[] = [];
        this.actionConfigs.map(config => {
            this.types[config.type]

            return config;
        })
        this.actionConfigs = []
        return actionList;
    }

}