export default abstract class IExperimentStrategy {
  abstract Strategy(): void;

  executeStrategy(): void {
    this.Strategy();
  }
}
