"use strict";
exports.__esModule = true;
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
        this.actionFactories = new Map();
        this.actionConfigs = [];
    }
    ActionAPI.prototype.registerNewAction = function (newActionType) {
        // @ts-ignore
        // eslint-disable-next-line new-cap
        this.actionFactories.set(newActionType, new newActionType());
    };
    ActionAPI.prototype.registerMetaActionConfig = function (actionConfig) {
        this.actionConfigs.push(actionConfig);
    };
    ActionAPI.prototype.getAction = function (type) {
        var action = this.actionFactories.get(type);
        if (action) {
            return action;
        }
        throw Error("Action Type, ".concat(type.name, " not exist in ActionAPI"));
    };
    ActionAPI.prototype.generateActionList = function () {
        var _this = this;
        var auxList = [];
        this.actionConfigs.forEach(function (actionConfig) {
            auxList.push(
            // @ts-ignore
            _this.getAction(actionConfig.type).createAction(actionConfig));
        });
        return auxList;
    };
    ActionAPI.prototype.generateActions = function (metaConfigs) {
        var _this = this;
        var auxList = [];
        metaConfigs.forEach(function (actionConfig) {
            auxList.push(
            // @ts-ignore
            _this.getAction(actionConfig.type).createAction(actionConfig));
        });
        return auxList;
    };
    ActionAPI.prototype.getMetaConfigs = function () {
        var list = this.actionConfigs;
        this.actionConfigs = [];
        return list;
    };
    return ActionAPI;
}());
exports["default"] = ActionAPI;
