import ExampleExperiment from "./experiments/ExampleExperiment";
import FASOW from "./fasow/FASOW";
import IDataHandler from "./fasow/datahandler/IDataHandler";
import ITowerHandler from "./fasow/reflection/tower/ITowerHandler";

const fasow: FASOW = new FASOW();
export const DataHandler: IDataHandler = fasow.getDataHandler();
export const TowerHandler: ITowerHandler = fasow.getTowerHandler();
TowerHandler.registerNewExperiment(ExampleExperiment);
TowerHandler.selectExperiment(ExampleExperiment);
TowerHandler.run();
