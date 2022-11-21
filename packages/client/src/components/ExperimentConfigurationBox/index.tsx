import { Box, Typography } from "@mui/material";

import ExperimentForm from "./ExperimentForm";
import ExperimentSelector from "./ExperimentSelector";
import NetworkSelector from "./NetworkSelector";

export default function ExperimentConfigurationBox() {
  return (
    <Box>
      <Typography variant="subtitle2" paddingBottom={2} color="GrayText">
        Set the configuration for the current experiment.
      </Typography>
      <Box sx={{ height: 16 }} />
      <ExperimentSelector />
      <NetworkSelector />
      <ExperimentForm />
    </Box>
  );
}
