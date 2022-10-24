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

  constructor() {
    this.tick = -1;
  }

  setTick(tick: number): void {
    this.tick = tick;
  }

  getTick(): number {
    return this.tick;
  }

  nextTick(): number {
    this.tick += 1;
    return this.tick;
  }
}

const EssentialAPI: IEssentialAPI = new IEssentialAPI();

export default EssentialAPI;
