import { Box, Typography } from "@mui/material";

import DataHandlerOptionsCard from "./DataHandlerOptionsCard";
import ExperimentForm from "./ExperimentForm";
import NetworkSelector from "./NetworkSelector";

export default function ExperimentConfigurationBox() {
  return (
    <Box>
      <Typography variant="subtitle2" paddingBottom={2} color="GrayText">
        Set the configuration for the current experiment.
      </Typography>
      <DataHandlerOptionsCard />
      <Box sx={{ height: 16 }} />
      <NetworkSelector />
      <ExperimentForm />
    </Box>
  );
}
