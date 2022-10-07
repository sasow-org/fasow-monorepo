import {MetaActionConfig} from "./MetaActionConfig";
import Action from "./Action";
import {ActionRead} from "./custom-actions/ActionRead";
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
    private static instance : ActionAPI;
    // Todo: apply a factory
    private actionsFactories : ActionCreator[];

    // todo: busca una forma de registrar las clases que puedes instanciar
    private actionConfigs : MetaActionConfig[]
    private actionList : Action[];

    constructor() {
        this.actionConfigs = []
        this.actionList = [];
        this.actionsFactories = [];
    }

    static getInstance() : ActionAPI {
        if(this.instance === undefined){
            this.instance = new ActionAPI();
        }
        return this.instance;
    }

    addAction(actionConfig: MetaActionConfig, type: Action) : void {
        this.actionConfigs.push(actionConfig);
        this.actionList.push(type)
    }

    createActionList() : Action[] {
        const actionList : Action[] = [];
        this.actionConfigs = []
        return actionList;
    }

}