/* eslint-disable import/prefer-default-export */
import { useCallback, useState } from "react";

import { fasowInstance } from "@fasow/backend";
import MetaExperimentConfig from "@fasow/backend/src/fasow/config/metaconfig/MetaExperimentConfig";

export type Result = {
  NOT_READ: number;
  READ: number;
  READY_TO_SHARE: number;
  SHARED: number;
  "percentage-type": string;
  repetition: number;
  tick: number;
};

export const useExperiments = () => {
  const [experimentConfig, setExperimentConfig] =
    useState<MetaExperimentConfig>();
  const { state } = fasowInstance.getState();

  const { experiments } = state;

  const formattedExperiments = experiments.map(({ type }) => type);

  const setExperiment = (
    experimentName: typeof formattedExperiments[number]
  ) => {
    fasowInstance.selectExperimentByName(experimentName);
    fasowInstance.initializeSelectedExperiment();

    const config = fasowInstance.getExperimentConfig();
    setExperimentConfig({ ...config });
  };

  return {
    experiments: formattedExperiments,
    setExperiment,
    experimentConfig,
  } as const;
};

export const useRunExperiment = () => {
  const [results, setResults] = useState<Result[]>([]);

  const runExperiment = useCallback(() => {
    fasowInstance.runSelectedExperiment();
    setTimeout(() => {
      const output = fasowInstance.getDataHandler().clearOutput();
      setResults(output);
    }, 3000);
  }, []);

  return {
    runExperiment,
    results,
  };
};
