import MetaActionConfig from "./MetaActionConfig";
import Action from "./Action";
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

    // todo: busca una forma de registrar las clases que puedes instanciar
    private actionMaps : Map<string, ActionCreator>;
    private actionConfigs : Map<string, MetaActionConfig>;

    constructor() {
        this.actionMaps = new Map<string, ActionCreator>()
        this.actionConfigs = new Map<string, MetaActionConfig>()
    }

    static getInstance() : ActionAPI {
        if(this.instance === undefined){
            this.instance = new ActionAPI();
        }
        return this.instance;
    }

    registerActionFactory(newFactory : ActionCreator, type : string ){
        this.actionMaps.set(type, newFactory);
    }

    registerMetaActionConfig(actionConfig: MetaActionConfig){
        this.actionConfigs.set(actionConfig.type, actionConfig);
    }


    // todo: to solve the eslint disable, thor an object error.
    generateActionList() : Action[] {
        const auxList : Action[] = [];
        this.actionConfigs.forEach((actionConfig, type) => {
            const action = this.actionMaps.get(type)?.createAction(actionConfig);
            if(action) {
                auxList.push(action);
            }else{
                throw new Error (`Action Type, ${ type } not exist in ActionAPI`);
            }
        })
        return auxList;
    }

    generateActions(metaConfigs: MetaActionConfig[]) : Action[] {
        const auxList : Action[] = [];
        metaConfigs.forEach(config => {
            const action = this.actionMaps.get(config.type)?.createAction(config);
            if(action){
                auxList.push(action);
            }else{
                // eslint-disable-next-line @typescript-eslint/no-throw-literal
                throw new Error (`Action Type, ${ config.type } not exist in ActionAPI`);
            }
        })
        return auxList;
    }



}