"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StructureHandler_1 = require("../StructureHandler");
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
var ActionAPI = /** @class */ (function () {
    function ActionAPI() {
        // this.actionFactories = new Map<typeof Action, IActionCreator>();
        this.actionConfigs = [];
        this.actionFactories = new Map();
    }
    ActionAPI.prototype.registerNewAction = function (newActionType) {
        // const someAction : Action = Reflect.construct(newActionType,[]);
        // this.actionFactories.set(newActionType, someAction);
        // this.actionFactories.push(newActionType)
        if (!this.actionFactories.has(newActionType.name)) {
            this.actionFactories.set(newActionType.name, newActionType);
        }
        else {
            throw Error("The referenced type '".concat(newActionType, "' has really been added"));
        }
    };
    ActionAPI.prototype.registerMetaActionConfig = function (actionConfig) {
        this.actionConfigs.push(actionConfig);
    };
    ActionAPI.prototype.getAction = function (type) {
        // const actionTypeToCreate = this.actionFactories.filter(actionType => type === actionType)[0];
        // const { CreateAction } = Reflect.construct(actionTypeToCreate,[])
        if (this.actionFactories.has(type.name)) {
            // @ts-ignore
            return this.actionFactories.get(type.name);
        }
        throw Error("The referenced type '".concat(type, "' not exist in ActionAPI"));
    };
    ActionAPI.prototype.generateActionList = function () {
        var _this = this;
        var auxList = [];
        this.actionConfigs.forEach(function (actionConfig) {
            var factoryRef = Reflect.construct(_this.getAction(actionConfig.type), []);
            var createAction = factoryRef.createAction;
            auxList.push(createAction(actionConfig));
        });
        return auxList;
    };
    ActionAPI.prototype.generateActions = function (metaConfigs) {
        var _this = this;
        var auxList = [];
        metaConfigs.forEach(function (actionConfig) {
            var factoryRef = Reflect.construct(_this.getAction(actionConfig.type), []);
            var createAction = factoryRef.createAction;
            auxList.push(createAction(actionConfig));
        });
        return auxList;
    };
    ActionAPI.prototype.getMetaConfigs = function () {
        var list = this.actionConfigs;
        this.actionConfigs = [];
        return list;
    };
    ActionAPI.prototype.getState = function () {
        // const excludedProps = ['followings','followers', 'actions'];
        var outputState = [];
        this.actionFactories.forEach(function (key) {
            var expectedObject = Reflect.construct(key, []);
            console.log("Name: ", key);
            outputState.push({
                type: key,
                properties: (0, StructureHandler_1.getTypesOfObject)(expectedObject, []),
            });
        });
        return outputState;
    };
    return ActionAPI;
}());
exports.default = ActionAPI;
