import { Box, Typography } from "@mui/material";

import ExperimentForm from "./ExperimentForm";
import ExperimentSelector from "./ExperimentSelector";
import {useExperiments} from "../../hooks/useFasow";

export default function ExperimentConfigurationBox() {
    const { experimentConfig, experiments, setExperiment } = useExperiments();
  return (
    <Box>
      <Typography variant="subtitle2" paddingBottom={2} color="GrayText">
        Set the configuration for the current experiment.
      </Typography>
      <Box sx={{ height: 16 }} />
      <ExperimentSelector
        setExperiment={setExperiment}
        experiments={experiments}
      />
      <ExperimentForm experimentConfig={experimentConfig} />
    </Box>
  );
}
