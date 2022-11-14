"use strict";
exports.__esModule = true;
var main_1 = require("../../main");
var AgentState_1 = require("./interfaces/Agent/AgentState");
/**
 * Normally to start any WOM marketing campaign many users need to start with
 * the (NOT_READ = 0) state, for that the DEFAULT_STATE correspond
 * to (NOT_READ=0) as state
 */
var DEFAULT_STATE = AgentState_1.AgentState.NOT_READ;
/**
 * The Agent abstract class allows to users to create different types of agents
 * like as users of somewhere social network site environment.
 * The developer should specify the behavior what the agent must follow in each
 * step, overwriting the @method step, the same with communication between
 * agents overwriting the  @method update
 */
var Agent = /** @class */ (function () {
    function Agent() {
        this.id = -1;
        this.state = DEFAULT_STATE;
        this.isSeed = false;
        this.followers = [];
        this.followings = [];
        this.indexMetaAgentConfig = -1;
        this.actions = [];
    }
    Agent.prototype.addFollower = function (agent) {
        // We need to make sure the agent id is not the same id of the current agent
        if (this.id === agent.id)
            return;
        var agentIndex = this.followers.findIndex(function (config) { return config.id === agent.id; });
        if (agentIndex === -1) {
            // add follower
            this.followers.push(agent);
        }
    };
    /**
     * Adds an agent to the followings list to this agent
     * @param agent : Agent : The agent that will be added to the list
     */
    Agent.prototype.addFollowing = function (agent) {
        // We need to make sure the agent id is not the same id of the current agent
        if (this.id === agent.id)
            return;
        var agentIndex = this.followings.findIndex(function (_a) {
            var id = _a.id;
            return id === agent.id;
        });
        if (agentIndex === -1) {
            // add following
            this.followings.push(agent);
        }
    };
    Agent.prototype.removeFollower = function (agentId) {
        // We need to make sure the agent id is not the same id of the current agent
        if (this.id === agentId)
            return;
        var agentIndex = this.followers.findIndex(function (_a) {
            var id = _a.id;
            return id === agentId;
        });
        if (agentIndex === -1)
            return;
        // remove follower
        this.followers.splice(agentIndex, 1);
    };
    /**
     * Remove and agent of the follower list by his id
     * @param agentId : number : the id of the agent that will be removed
     */
    Agent.prototype.removeFollowing = function (agentId) {
        // We need to make sure the agent id is not the same id of the current agent
        if (this.id === agentId)
            return;
        var agentIndex = this.followings.findIndex(function (_a) {
            var id = _a.id;
            return id === agentId;
        });
        if (agentIndex === -1)
            return;
        // remove follower
        this.followings.splice(agentIndex, 1);
    };
    /**
     * Calls and executes all the actions of the agent, the normal behavior what need to be stablishied
     * is between the use of ReadAction and then the ShareAction, this was be needed and specified adding thats actions
     * in the correct order, read and the share.
     */
    Agent.prototype.receiveMessage = function () {
        var _this = this;
        /*
          Receive Message lo unico que esta haciendo es ejecutar la lista de acc iones
        */
        this.actions.forEach(function (action) {
            action.execute(_this);
        });
    };
    /**
     * Sets the state of the agent in his initial state given by his MetaAgentConfig registered in the Tower Handler at the AgentAPI lvl
     */
    Agent.prototype.resetState = function () {
        this.state = main_1.TowerHandler.getMetaAgentConfigById(this.indexMetaAgentConfig).state;
    };
    /**
     * Sets the id and the config to the agent
     * @param id : number : the id to identify the agent
     * @param agentData : MetaAgentConfig : the configuration about his followers, followings, actions, initial state and if is a seed
     */
    Agent.prototype.setConfig = function (id, config) {
        this.id = id;
        this.isSeed = config.isSeed;
        this.followers = [];
        this.followings = [];
        this.actions = main_1.TowerHandler.generateActions(config.actionsConfigs);
        this.indexMetaAgentConfig = config.id;
        this.state = config.state;
        return this;
    };
    Agent.prototype.share = function () {
        var _this = this;
        this.followers.forEach(function (follower) { return follower.update(_this); });
    };
    return Agent;
}());
exports["default"] = Agent;
