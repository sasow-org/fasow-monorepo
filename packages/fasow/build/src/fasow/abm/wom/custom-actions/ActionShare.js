"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Action_1 = require("../../Action");
var AgentState_1 = require("../../interfaces/Agent/AgentState");
var ActionShare = /** @class */ (function (_super) {
    __extends(ActionShare, _super);
    function ActionShare() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
    Maybe this action can named CalculateCanShare
     */
    ActionShare.prototype.execute = function (agent) {
        var aux = agent;
        if (aux.state === AgentState_1.AgentState.READ) {
            var p1 = this.getRandom();
            if (p1 > 100 - this.probability) {
                aux.state = AgentState_1.AgentState.READY_TO_SHARE;
            }
        }
    };
    ActionShare.prototype.createAction = function (actionData) {
        return new ActionShare().setConfig(actionData);
    };
    return ActionShare;
}(Action_1["default"]));
exports["default"] = ActionShare;
