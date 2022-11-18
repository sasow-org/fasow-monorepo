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
var ActionRead_1 = require("../../fasow/abm/wom/custom-actions/ActionRead");
var EffectAgent_1 = require("./EffectAgent");
var CanSaturatedActionRead = /** @class */ (function (_super) {
    __extends(CanSaturatedActionRead, _super);
    function CanSaturatedActionRead() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CanSaturatedActionRead.prototype.execute = function (agent) {
        if (agent instanceof EffectAgent_1.default) { // Si es de este tipo de agente
            var agentRef = agent;
            if (agentRef.state === AgentState_1.AgentState.NOT_READ) { // Y si su estado es no leido
                var p1 = this.getRandom(); // Calcula la probabilidad de leer
                if (p1 > 100 - this.probability) { // Si se cumplen las condiciones
                    agentRef.state = AgentState_1.AgentState.READ; // Marca como leido
                    agentRef.times_read_counter += 1; // Aumenta en 1 las veces leido (esto equivale al saturation lvl)
                    // console.log("agentRef.id: ", agentRef.id, " times_Read: ", agentRef.times_read_counter)
                    if (agentRef.times_read_counter > EffectAgent_1.default.saturationThreshold) { // Si has leido mas de 5 veces
                        agentRef.isSaturated = true; // Marca como saturado.
                    }
                }
            }
        }
    };
    CanSaturatedActionRead.prototype.createAction = function (actionData) {
        return new CanSaturatedActionRead().setConfig(actionData);
    };
    return CanSaturatedActionRead;
}(ActionRead_1.default));
exports.default = CanSaturatedActionRead;
