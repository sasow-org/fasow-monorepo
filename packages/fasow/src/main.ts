import ExperimentAgentCombination from "./experiments/ExperimentAgentCombinatio/ExperimentAgentCombination";
import MessageRepetition from "./experiments/ExperimentEffectMessageRepetition/MessageRepetition";
import FASOW from "./fasow/FASOW";
import IDataHandler from "./fasow/datahandler/IDataHandler";
import ITowerHandler from "./fasow/reflection/tower/ITowerHandler";
import ITimeKeeper from "./fasow/timekepper/ITimeKeeper";

// FASOW es el sistema que se debe exportar el cual tiene al backend
const fasow: FASOW = new FASOW();
/*
    Los siguientes tres exports corresponden a
    DataHandler : Permite generar el output y el estado del backend.
    TowerHandler : La torre de reflexion que permite controlar la arquitectura
    TimeKepper : Modulo que maneja el tiempo (ticks y repeticiones)

    Estos 3 exports son utilizados por el backend para funcionar
    y no debieran ser usados por el frontend.

 */
export const DataHandler: IDataHandler = fasow.getDataHandler();
export const TowerHandler: ITowerHandler = fasow.getTowerHandler();
export const TimeKeeper: ITimeKeeper = fasow.getTimeKeeper();

fasow.registerNewExperiment(MessageRepetition);
fasow.registerNewExperiment(ExperimentAgentCombination);
// fasow.runExperimentByName("ExperimentAgentCombination");
// console.log(fasow.getState());
// fasow.runExperiment(MessageRepetition);

export default fasow;
