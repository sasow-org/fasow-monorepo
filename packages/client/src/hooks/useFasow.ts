import { fasowInstance } from "@fasow/backend";

type Property = {
  type: string;
  properties: Property[];
};

export const useExperiment = () => {
  const { state } = fasowInstance.getState();

  const experiments: Property[] = state.experiments;

  const formattedExperiments = experiments.map(({ type }) => {
    return type;
  });

  const setExperiment = (
    experimentName: typeof formattedExperiments[number]
  ) => {
    console.log(
      fasowInstance.getTowerHandler().getSelectedExperiment().toString()
    );
    fasowInstance.selectExperimentByName(experimentName);
  };

  return [formattedExperiments, setExperiment] as const;
};
