export default class EssentialAPI {
  private tickStep: number;

  constructor() {
    this.tickStep = -1;
  }

  setTickStep(tickStep: number): void {
    this.tickStep = tickStep;
  }
}
