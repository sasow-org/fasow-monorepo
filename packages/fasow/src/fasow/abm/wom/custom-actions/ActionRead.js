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
var ActionRead = /** @class */ (function (_super) {
    __extends(ActionRead, _super);
    function ActionRead() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActionRead.prototype.execute = function (agent) {
        var aux = agent;
        if (aux.state === AgentState_1.AgentState.NOT_READ) {
            var p1 = this.getRandom();
            if (p1 > 100 - this.probability) {
                aux.state = AgentState_1.AgentState.READ;
            }
        }
    };
    ActionRead.prototype.createAction = function (actionData) {
        return new ActionRead().setConfig(actionData);
    };
    return ActionRead;
}(Action_1["default"]));
exports["default"] = ActionRead;
