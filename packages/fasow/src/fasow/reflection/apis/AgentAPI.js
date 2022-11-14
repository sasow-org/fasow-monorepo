"use strict";
exports.__esModule = true;
// eslint-disable-next-line import/no-cycle
var main_1 = require("../../../main");
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
        this.agentsFactories = new Map();
        this.agentConfigs = [];
    }
    AgentAPI.prototype.registerNewAgent = function (type) {
        // @ts-ignore
        // eslint-disable-next-line new-cap
        this.agentsFactories.set(type, new type());
    };
    AgentAPI.prototype.registerNewMetaAgentConfig = function (agentConfig) {
        this.agentConfigs.push(agentConfig);
    };
    AgentAPI.prototype.registerMetaConfigs = function (agentConfigs) {
        this.agentConfigs = agentConfigs;
    };
    AgentAPI.prototype.getAgent = function (type) {
        return this.agentsFactories.get(type);
    };
    AgentAPI.prototype.generateAgentList = function () {
        var auxList = this.generateAgentsByConfigs(this.agentConfigs);
        /*
        this.agentConfigs.forEach((config) => {
          for (let i = 0; i < config.percentage; i += 1) {
            const agent = this.getAgent(config.type)?.createAgent(
              auxList.length,
              config
            );
            if (agent) {
              auxList.push(agent);
            } else {
              throw new Error(`Agent Type ${config.type} not exist in AgentAPI`);
            }
          }
        });
        
         */
        return auxList;
    };
    AgentAPI.prototype.generateAgentsByConfigs = function (metaConfigs) {
        var _this = this;
        var auxList = [];
        metaConfigs.forEach(function (config) {
            var _a;
            var quantity = Math.round((main_1.TowerHandler.getScenarioConfig().networkSize * config.percentage) / 100);
            console.log("Config Name: ", config.name, " Starting to creating (", quantity, ") agents with this config: \n", config);
            for (var i = 0; i < quantity; i += 1) {
                var agent = (_a = _this.getAgent(config.type)) === null || _a === void 0 ? void 0 : _a.createAgent(auxList.length, config);
                if (agent) {
                    auxList.push(agent);
                }
                else {
                    throw new Error("Agent Type ".concat(config.type, " not exist in AgentAPI"));
                }
            }
        });
        return auxList;
    };
    AgentAPI.prototype.getMetaAgentConfigById = function (id) {
        return this.agentConfigs.filter(function (config) { return config.id === id; })[0];
    };
    return AgentAPI;
}());
exports["default"] = AgentAPI;
