import Agent from "../agent/Agent";

export default abstract class Action {
  name: string;
  probability: number;

  constructor(name: string, probability: number) {
    this.name = name;
    this.probability = probability;
  }

  abstract execute(agent: Agent): void;

  // TODO: Add "getRandom"
}
