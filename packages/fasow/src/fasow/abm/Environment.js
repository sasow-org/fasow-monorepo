"use strict";
exports.__esModule = true;
// eslint-disable-next-line import/no-cycle
var main_1 = require("../../main");
/**
 * Environment is the place where the simulation is executed,
 * to do this, the user need to overdrive the step and run methods
 * to specify the behavior of all the simulation.
 *
 * @method step: allow to the users to specify the behaviour of the agents during the simulation
 * @method run: handle the step by step of the simulation, calling the step method each tick of the clock and notifying the DataHandler to capture  and save a state of the simulation
 */
var Environment = /** @class */ (function () {
    function Environment() {
        this.id = -1;
        this.networkSize = -1;
        this.seedSize = -1;
        this.initialized = false;
        this.agents = [];
        this.seeds = [];
    }
    /**
     * Allow to the user to load the Scenario config to the environment to after initializes
     * the simulation
     *
     * @param config : MetaEnvironmentConfig : establishes the quantity of agents to create,
     * sets his configurations, calculate the seedSize and registers the agentConfigs
     * in the TowerHandler at AgentAPI level.
     *
     */
    Environment.prototype.setConfig = function (config) {
        this.id = -1;
        this.networkSize = config.networkSize;
        var value = 0;
        config.metaAgentsConfigs.forEach(function (agent) {
            if (agent.isSeed) {
                value += agent.percentage;
            }
        });
        this.seedSize = Math.round((value * this.networkSize) / 100);
        this.initialized = false;
        console.log("Setting MaxTick to --> ", config.maxTick);
        main_1.TimeKeeper.setMaxTick(config.maxTick);
        console.log("MaxTick is : ", main_1.TimeKeeper.getMaxTick());
        this.agents = [];
        this.seeds = [];
        main_1.TowerHandler.registerMetaAgentsConfigs(config.metaAgentsConfigs);
        return this;
    };
    /**
     * Starts the simulation to being executed period per period
     * This method allow to users to introduce the behaviour of the scenario
     */
    Environment.prototype.run = function () {
        while (main_1.TimeKeeper.canNextTick()) {
            this.step();
            console.log("On Step: ", main_1.TimeKeeper.nextTick(), " of (", main_1.TimeKeeper.getMaxTick(), "): \n", main_1.DataHandler.getLastOutputRow());
        }
    };
    /**
     * Initializes the current environment, creating the agents, adding the followers and checking if all it's ok to run the simulation
     */
    Environment.prototype.initialize = function () {
        console.log("On Environment Initialize");
        console.log("Agents to Create: ", this.networkSize);
        console.log("Seeds: ", this.seedSize);
        console.log("Actual Total agents quantity: ", this.agents.length);
        console.log("Actual Total seeds quantity: ", this.seeds.length);
        this.createAgents();
        console.log("Create agents passed");
        this.addFollowers();
        console.log("add followers passed");
        this.addFollowings();
        // console.log("add followings passed");
        console.log("Ending Initialization...");
        console.log("Checking...");
        console.log("Agents to Create: ", this.networkSize);
        console.log("Seeds: ", this.seedSize);
        console.log("Actual Total agents quantity: ", this.agents.length);
        console.log("Actual Total seeds quantity: ", this.seeds.length);
        if (!this.isDone()) {
            throw new Error("Error in initialize environment with id: ".concat(this.id));
        }
        this.initialized = true;
        main_1.TimeKeeper.setTick(0);
        console.log("All done on environment!");
    };
    /**
     * Populates the list of agents of the environment according to the agent config
     * @param agentConfig the config that the agents will be based on
     */
    Environment.prototype.createAgents = function () {
        var _this = this;
        this.agents = main_1.TowerHandler.generateAgentList();
        this.agents.forEach(function (agent) {
            if (agent.isSeed) {
                _this.seeds.push(agent);
            }
        });
    };
    /**
     * Creates and sets the relationships between the agents,
     * adding randomly agents to the follower list for each agent
     * of the environment until complete his followers' quantity
     * given by the AgentConfig.
     */
    Environment.prototype.addFollowers = function () {
        var _this = this;
        this.agents.map(function (agent) {
            var toRound = (main_1.TowerHandler.getMetaAgentConfigById(agent.indexMetaAgentConfig)
                .followersPercentage *
                _this.networkSize) /
                100;
            var total = Math.round(toRound);
            while (agent.followers.length !== total) {
                var max = _this.agents.length;
                var randomIndex = Number.parseInt("".concat(Math.random() * (max - 1 + 1)).concat(0), 10);
                agent.addFollower(_this.agents[randomIndex]);
            }
            return agent;
        });
    };
    /**
     * After the followers relationships are established, the next thing to do is load the "followings"
     * list of each agent, then, If agent A follows' agent B, then A is a follower of B, at this way
     * the "followings" relationships are established.
     */
    Environment.prototype.addFollowings = function () {
        this.agents.forEach(function (iAgent) {
            iAgent.followers.forEach(function (kAgent) {
                kAgent.followings.push(iAgent);
            });
        });
        /*
        This is a mind reminder
        If A is a follower of B, then
          B has A on his follower list
    
          and
    
          A has B on his followings list
    
          and then for each k follower of B, add B in the followings list of K
         */
    };
    /**
     * Check if the simulation are ready to be executed and returns true if the agents,
     * seeds, followers and followings are all set up or if exist some problem.
     */
    Environment.prototype.isDone = function () {
        var _this = this;
        if (this.agents.length !== this.networkSize) {
            throw new Error("Agents is not equal to networkSize");
        }
        if (this.seeds.length !== this.seedSize) {
            var errorMsg = "Seeds is not equal to seedSize: " +
                "\n" +
                "seedSize: ".concat(this.seedSize, "\n") +
                "seeds.length: ".concat(this.seeds.length);
            throw new Error(errorMsg);
        }
        this.agents.forEach(function (agent) {
            var toRoundAgentFollowersQuantity = (main_1.TowerHandler.getMetaAgentConfigById(agent.indexMetaAgentConfig)
                .followersPercentage *
                _this.networkSize) /
                100;
            var roundedAgentFollowersQuantity = Math.round(toRoundAgentFollowersQuantity);
            if (agent.followers.length !== roundedAgentFollowersQuantity) {
                throw new Error("On Agent.id: ".concat(agent.id, " followers are not equal to the real number of followers"));
            }
        });
        return true;
    };
    /**
     * For each agent, his state are reset to the initial state of his MetaAgentConfig
     */
    Environment.prototype.resetAgentStates = function () {
        this.agents.forEach(function (agent) { return agent.resetState(); });
    };
    /**
     * For each seed, his state are reset to the initial state of his MetaAgentConfig
     */
    Environment.prototype.resetSeedStates = function () {
        this.seeds.forEach(function (seed) { return seed.resetState(); });
    };
    return Environment;
}());
exports["default"] = Environment;
