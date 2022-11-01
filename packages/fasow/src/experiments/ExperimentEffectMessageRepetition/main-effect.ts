import FASOW from "../../fasow/FASOW";
import CanSaturatedActionRead from "./CanSaturatedActionRead";
import CanSaturatedActionShare from "./CanSaturatedActionShare";
import EffectAgent from "./EffectAgent";
import EnvironmentEffectTwitter from "./EnvironmentEffectTwitter";
import MessageRepetition from "./MessageRepetition";

const fasow: FASOW = new FASOW();
export const TowerHandler = fasow.getTowerHandler();
export const DataHandler = fasow.getDataHandler();
TowerHandler.registerNewAction(CanSaturatedActionShare);
TowerHandler.registerNewAction(CanSaturatedActionRead);
TowerHandler.registerNewAgent(EffectAgent);
TowerHandler.registerNewEnvironment(EnvironmentEffectTwitter);
TowerHandler.registerNewExperiment(MessageRepetition);
TowerHandler.selectExperiment(MessageRepetition);
TowerHandler.run();
