import "reflect-metadata";

interface CountItem {
  column_name: string;
  propertyKey: string;
  target: any;
}
interface CountStateItem {
  target: any;
  propertyKey: string;
  column_name: string;
  value: number;
}
interface CountBooleanItem {
  column_name: string;
  propertyKey: string;
  target: any;
  countFalse: boolean;
}

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

export const CountAgentBooleanObjectKeysArray: CountBooleanItem[] = []; // todo: this is for count agent
/*
  Por cada periodo cuenta a todos los agentes que posean esta propiedad para luego ser desplegada en el output output una columna con nombre @name
  Si @countFalse = true, se contaran a los agentes que tengan un valor falso
  Si @countFalse = false, se contaran a los agentes que tengan un valor verdadero
 */
export function AgentCountBoolean(name: string, countFalse: boolean) {
  return function (target: any, propertyKey: string) {
    CountAgentBooleanObjectKeysArray.push({
      target,
      propertyKey,
      column_name: name,
      countFalse,
    });
  };
}

export const CountAgentStatesObjectKeysArray: CountStateItem[] = []; // todo : this is for state integer
/*
  Por cada periodo cuenta a todos los agentes que su agent.state sea igual a @value ingresado para luego desplegar en el output una columna con nombre @name
 */
export function AgentStateIntegerCount(name: string, value: number) {
  return function (target: any, propertyKey: string) {
    console.log("Target: ", target);
    CountAgentStatesObjectKeysArray.push({
      target,
      propertyKey,
      column_name: name,
      value,
    });
  };
}

export const AccumAgentKeysArray: CountItem[] = []; // todo: this is for acum on agent
/*
  Por cada periodo, suma los valores de cada agente que posean esta property, para luego desplegar en el output una columna con nombre @name
 */
export function AccumulateAgentValue(name: string) {
  return function (target: any, propertyKey: string) {
    AccumAgentKeysArray.push({ target, propertyKey, column_name: name });
  };
}

export const AccumEnvironmentObjectKeys: CountItem[] = [];
/*
  Por cada periodo suma los valores antiguos con el valor actual de la propiedad para el periodo correspondiente, para luego desplegar en el output una columna con nombre @name
 */
export function AccumulateEnvironmentValue(name: string) {
  return function (target: any, propertyKey: string) {
    AccumEnvironmentObjectKeys.push({ target, propertyKey, column_name: name });
  };
}

// todo : this is for count in environment
export const CountEnvironmentKeys: CountItem[] = [];
/*
Por cada periodo registra el parametro marcado y luego se registra en el output en una columna con nombre @name
 */
export function EnvironmentCount(name: string) {
  return function (target: any, propertyKey: string) {
    CountEnvironmentKeys.push({
      target,
      propertyKey,
      column_name: name,
    });
  };
}
