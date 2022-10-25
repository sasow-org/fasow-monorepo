import Agent from "../Agent";

export default interface Subject {
  addFollower(agent: Agent): void;
  removeFollower(agentId: number): void;
  share(): void;
}
