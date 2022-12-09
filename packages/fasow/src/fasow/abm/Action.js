"use strict";
exports.__esModule = true;
/**
 * The Action abstract class allow to users to build specialized actions.
 * For that the developer should overwrite the @methods "execute" and
 * "createAction". Normally an action should have a probability to be executed
 * or a probability to change something in the Agent, like the state of this.
 */
var Action = /** @class */ (function () {
    function Action() {
        this.name = "";
        this.probability = -1;
        this.idMetaActionConfig = -1;
    }
    // todo : maybe this can move to other class to handle maths like NumberHandler ... to handle and get random type numbers
    // eslint-disable-next-line class-methods-use-this
    Action.prototype.getRandom = function () {
        return Math.random() * 99 + 1;
    };
    /**
     * Sets the configuration of an action setting his probability, name and saving his MetaActionConfig reference
     * @param actionConfig : MetaActionConfig : The configuration of the action to be set
     */
    Action.prototype.setConfig = function (actionConfig) {
        this.name = actionConfig.name;
        this.probability = actionConfig.probability;
        this.idMetaActionConfig = actionConfig.id;
        return this;
    };
    return Action;
}());
exports["default"] = Action;
