"use strict";
exports.__esModule = true;
exports.ExperimentCount = exports.CountExperimentsKeys = exports.EnvironmentCount = exports.CountEnvironmentKeys = exports.AccumulateEnvironmentValue = exports.AccumEnvironmentObjectKeys = exports.AccumulateAgentValue = exports.AccumAgentKeysArray = exports.AgentStateIntegerCount = exports.CountAgentStatesObjectKeysArray = exports.AgentCountBoolean = exports.CountAgentBooleanObjectKeysArray = void 0;
require("reflect-metadata");
/*
todo: Encontrarle un mejor proposito a esto

export const CountAgentObjectKeysArray: CountItem[] = [];

export function AgentCount(name: string) {
  return function (target: any, propertyKey: string) {
    CountAgentObjectKeysArray.push({
      target,
      propertyKey,
      column_name: name,
    });
  };
}
 */
exports.CountAgentBooleanObjectKeysArray = []; // todo: this is for count agent
/**
 * For each tick of the clock, it counts all the agents that have the decorated property,
 * to later display it in the output on the column with name @name. Users could count
 * false or true values according to the value of countFalse.
 *
 * @param name : string : The column name of the property being registered
 * @param countFalse : boolean : specify if the count was being to true or false values.
 *    If countFalse = true, agents with a false value will be counted
 *    If countFalse = false, agents with a true value will be counted
 */
function AgentCountBoolean(name, countFalse) {
    return function (target, propertyKey) {
        exports.CountAgentBooleanObjectKeysArray.push({
            target: target,
            propertyKey: propertyKey,
            column_name: name,
            countFalse: countFalse
        });
    };
}
exports.AgentCountBoolean = AgentCountBoolean;
exports.CountAgentStatesObjectKeysArray = []; // todo : this is for state integer
/**
 * For each period, it counts all the agents whose agent.state is equal to the
 * value entered and then displays a column with the name @name in the output.
 *
 * @param name : string : The column name of the property being registered
 * @param value : number : The value that is registered as possible agent status and that will be used
 * to count the agents that have this value as status.
 */
function AgentStateIntegerCount(name, value) {
    return function (target, propertyKey) {
        exports.CountAgentStatesObjectKeysArray.push({
            target: target,
            propertyKey: propertyKey,
            column_name: name,
            value: value
        });
    };
}
exports.AgentStateIntegerCount = AgentStateIntegerCount;
exports.AccumAgentKeysArray = []; // todo: this is for acum on agent
/**
 * For each period, add the values of each agent that have this property, to then display a column named @name in the output.
 * @param name : string : The column name of the property being registered.
 */
function AccumulateAgentValue(name) {
    return function (target, propertyKey) {
        exports.AccumAgentKeysArray.push({ target: target, propertyKey: propertyKey, column_name: name });
    };
}
exports.AccumulateAgentValue = AccumulateAgentValue;
exports.AccumEnvironmentObjectKeys = [];
/**
 * For each period, it adds the old values with the current value of the property for the corresponding period, to then display a column named @name in the output.
 * @param name : string : The column name of the property being registered.
 */
function AccumulateEnvironmentValue(name) {
    return function (target, propertyKey) {
        exports.AccumEnvironmentObjectKeys.push({ target: target, propertyKey: propertyKey, column_name: name });
    };
}
exports.AccumulateEnvironmentValue = AccumulateEnvironmentValue;
// todo : this is for count in environment
exports.CountEnvironmentKeys = [];
/**
 * For each period it records the marked parameter, and then it is recorded in the output in a column named @name
 * @param name : string : The column name of the property being registered.
 */
function EnvironmentCount(name) {
    return function (target, propertyKey) {
        console.log("Name: ", name);
        console.log("propertyKey: ", propertyKey);
        console.log("target: ", target);
        exports.CountEnvironmentKeys.push({
            target: target,
            propertyKey: propertyKey,
            column_name: name
        });
    };
}
exports.EnvironmentCount = EnvironmentCount;
exports.CountExperimentsKeys = [];
/**
 * For each repetition it records the marked parameter, and then it is recorded in the output in a column named @name
 * @param name : string : The column name of the property being registered.
 */
function ExperimentCount(name) {
    return function (target, propertyKey) {
        exports.CountExperimentsKeys.push({
            target: target,
            propertyKey: propertyKey,
            column_name: name
        });
    };
}
exports.ExperimentCount = ExperimentCount;
