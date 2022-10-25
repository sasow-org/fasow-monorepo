import Agent from "../Agent";

export default interface Observer {
  update(message: any): any;
}
