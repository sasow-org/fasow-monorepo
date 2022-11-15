import ExperimentAgentCombination from "./experiments/ExperimentAgentCombinatio/ExperimentAgentCombination";
import MessageRepetition from "./experiments/ExperimentEffectMessageRepetition/MessageRepetition";
import FASOW from "./fasow/FASOW";
import IDataHandler from "./fasow/datahandler/IDataHandler";
import ITowerHandler from "./fasow/reflection/tower/ITowerHandler";
import ITimeKeeper from "./fasow/timekepper/ITimeKeeper";

const fasow: FASOW = new FASOW();
export const DataHandler: IDataHandler = fasow.getDataHandler();
export const TowerHandler: ITowerHandler = fasow.getTowerHandler();
export const TimeKeeper: ITimeKeeper = fasow.getTimeKeeper();
// fasow.runExperiment(ExampleExperiment);
fasow.registerNewExperiment(MessageRepetition);
fasow.registerNewExperiment(ExperimentAgentCombination);
fasow.runExperimentByName("ExperimentAgentCombination");
// console.log(fasow.getState());
