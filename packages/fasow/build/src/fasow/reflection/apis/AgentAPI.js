"use strict";
exports.__esModule = true;
var main_1 = require("../../../main");
var StructureHandler_1 = require("../StructureHandler");
/*
Esta capa permite crear, agrupar y combinar tipos diferentes de agentes,
también permite relacionar a los agentes con sus respectivas configuraciones
y respectivos set de posibles acciones además de establecer el orden de
ejecución de estas durante la simulación. Al igual que en las capas inferiores
al ampliar la funcionalidad de FASOW buscando querer agregar nuevas características
al modelo y si la situación lo requiere. Podemos crear nuevos agentes especializados
que pueden ser utilizados en los niveles inferiores de la arquitectura esto a través
de la API de metaprogramacion de \co{TowerHandler} que permite la comunicación.
 */
var AgentAPI = /** @class */ (function () {
    function AgentAPI() {
        // this.agentsFactories = new Map<typeof Agent, IAgentCreator>();
        this.agentConfigs = [];
        this.agentsFactories = new Map();
    }
    AgentAPI.prototype.registerNewAgent = function (type) {
        if (!this.agentsFactories.has(type.name)) {
            this.agentsFactories.set(type.name, type);
        }
        else {
            throw Error("The referenced type '".concat(type, "' has already been added"));
        }
    };
    AgentAPI.prototype.registerNewMetaAgentConfig = function (agentConfig) {
        this.agentConfigs.push(agentConfig);
    };
    AgentAPI.prototype.registerMetaConfigs = function (agentConfigs) {
        this.agentConfigs = agentConfigs;
    };
    AgentAPI.prototype.getAgent = function (type) {
        if (this.agentsFactories.has(type.name)) {
            // @ts-ignore
            return this.agentsFactories.get(type.name);
        }
        throw Error("The referenced type '".concat(type, "' not exist in AgentAPI"));
    };
    AgentAPI.prototype.generateAgentList = function () {
        var auxList = this.generateAgentsByConfigs(this.agentConfigs);
        return auxList;
    };
    AgentAPI.prototype.generateAgentsByConfigs = function (metaConfigs) {
        var _this = this;
        var auxList = [];
        metaConfigs.forEach(function (config) {
            var quantity = Math.round((main_1.TowerHandler.getScenarioConfig().networkSize * config.percentage) / 100);
            console.log("Config Name: ", config.name, " Starting to creating (", quantity, ") agents with this config: \n", config);
            var createAgent = Reflect.construct(_this.getAgent(config.type), []).createAgent;
            for (var i = 0; i < quantity; i += 1) {
                auxList.push(createAgent(auxList.length, config));
            }
        });
        return auxList;
    };
    AgentAPI.prototype.getMetaAgentConfigById = function (id) {
        return this.agentConfigs.filter(function (config) { return config.id === id; })[0];
    };
    AgentAPI.prototype.getState = function () {
        var excludedProps = ["followings", "followers", "actions"];
        var outputState = [];
        this.agentsFactories.forEach(function (key) {
            var expectedObject = Reflect.construct(key, []);
            // console.log("Name: ", key.name);
            outputState.push({
                type: key.name,
                properties: (0, StructureHandler_1.getTypesOfObject)(expectedObject, excludedProps)
            });
        });
        return outputState;
    };
    return AgentAPI;
}());
exports["default"] = AgentAPI;
