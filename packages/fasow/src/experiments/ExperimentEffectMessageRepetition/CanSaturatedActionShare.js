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
Object.defineProperty(exports, "__esModule", { value: true });
var AgentState_1 = require("../../fasow/abm/interfaces/Agent/AgentState");
var ActionShare_1 = require("../../fasow/abm/wom/custom-actions/ActionShare");
var EffectAgent_1 = require("./EffectAgent");
/*
La accion de compartir se ejecutara siempre y cuando se haya leido, el agente no este saturado
y se satisfasga la probabilidad de compartir.
 */
var CanSaturatedActionShare = /** @class */ (function (_super) {
    __extends(CanSaturatedActionShare, _super);
    function CanSaturatedActionShare() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CanSaturatedActionShare.prototype.execute = function (agent) {
        if (agent instanceof EffectAgent_1.default) { // Si es de este tipo de agente
            var agentRef = agent;
            if (agentRef.state === AgentState_1.AgentState.READ && !agentRef.isSaturated) { // Mientras haya leido y no este saturado, entonces puede compartir
                var p1 = this.getRandom();
                if (p1 > 100 - this.probability) {
                    agentRef.state = AgentState_1.AgentState.READY_TO_SHARE;
                }
                else {
                    agentRef.state = AgentState_1.AgentState.NOT_READ;
                }
            }
        }
    };
    CanSaturatedActionShare.prototype.createAction = function (actionData) {
        return new CanSaturatedActionShare().setConfig(actionData);
    };
    return CanSaturatedActionShare;
}(ActionShare_1.default));
exports.default = CanSaturatedActionShare;
