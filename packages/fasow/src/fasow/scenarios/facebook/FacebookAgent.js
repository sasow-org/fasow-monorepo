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
var Agent_1 = require("../../abm/Agent");
var FacebookAgent = /** @class */ (function (_super) {
    __extends(FacebookAgent, _super);
    function FacebookAgent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FacebookAgent.prototype.update = function (message) {
        throw new Error("Method not implemented.");
    };
    FacebookAgent.prototype.step = function () {
        this.receiveMessage();
    };
    // eslint-disable-next-line class-methods-use-this
    FacebookAgent.prototype.createAgent = function (id, agentData) {
        // @ts-ignore
        return new FacebookAgent(id, agentData);
    };
    return FacebookAgent;
}(Agent_1.default));
exports.default = FacebookAgent;
