"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentState = void 0;
/**
 * Enum of the most simply states of an Agent in a WOM communication process and is equal to the followings states
 * NOT_READ = 0,
 * READ = 1,
 * READY_TO_SHARE = 2,
 * SHARED = 3
 */
var AgentState;
(function (AgentState) {
    AgentState[AgentState["NOT_READ"] = 0] = "NOT_READ";
    AgentState[AgentState["READ"] = 1] = "READ";
    AgentState[AgentState["READY_TO_SHARE"] = 2] = "READY_TO_SHARE";
    AgentState[AgentState["SHARED"] = 3] = "SHARED";
})(AgentState = exports.AgentState || (exports.AgentState = {}));
