// eslint-disable-next-line import/no-cycle
import DataHandler from "../datahandler/IDataHandler";

/*
Es la capa n ́ucleo y la capa m ́as alta de la
arquitectura reflexiva de FASOW. Esta capa permite el control
del tiempo y es la que permite que los agentes ejecuten sus
acciones de manera correcta, esta capa no posee una API para
modificar los par ́ametros internos de la capa, pero si posee
m ́etodos para servir de informaci ́on a las capas inferiores como
por ejemplo para obtener el tick actual de la simulaci ́on.
 */
class IEssentialAPI {
  private tick: number;
  private maxTick: number;

  private repetition: number;
  private maxRepetition: number;

  constructor() {
    this.maxTick = -1;
    this.tick = -1;

    this.repetition = -1;
    this.maxRepetition = -1;
  }

  setTick(tick: number): number {
    this.tick = tick;
    return this.tick;
  }

  getTick(): number {
    return this.tick;
  }

  nextTick(): number {
    this.tick += 1;
    DataHandler.update();
    return this.tick;
  }

  canNextTick(): boolean {
    return this.tick < this.maxTick;
  }

  setMaxTick(maxTick: number): void {
    this.maxTick = maxTick;
  }

  getMaxTick(): number {
    return this.maxTick;
  }

  setRepetition(repetition: number) {
    this.repetition = repetition;
  }

  getRepetition(): number {
    return this.repetition;
  }

  nextRepetition(): number {
    this.repetition += 1;
    return this.repetition;
  }

  canNextRepetition(): boolean {
    return this.repetition < this.maxRepetition;
  }

  setMaxRepetition(maxRepetition: number): void {
    this.maxRepetition = maxRepetition;
  }

  getMaxRepetition(): number {
    return this.maxRepetition;
  }
}

const EssentialAPI: IEssentialAPI = new IEssentialAPI();

export default EssentialAPI;
