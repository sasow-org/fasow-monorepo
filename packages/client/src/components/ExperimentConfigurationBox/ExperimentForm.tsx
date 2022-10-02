import { Box, TextField, Typography } from "@mui/material";

function Spacing() {
  return <Box sx={{ height: 12 }} />;
}

export default function ExperimentForm() {
  return (
    <Box>
      <Typography variant="overline">Experiment info</Typography>
      <Spacing />
      <TextField
        fullWidth
        type="text"
        required
        label="Experiment Name"
        // value={experimentConfig.experimentName}
        // onChange={handleExperimentNameChange}
      />
      <Spacing />
      <TextField
        fullWidth
        required
        type="number"
        label="Repetitions"
        // value={experimentConfig.repetitions}
        // onChange={handleRepetitionsChange}
      />
      <Spacing />
      <TextField
        fullWidth
        required
        type="number"
        label="Network Size"
        // value={experimentConfig.networkSize}
        // onChange={handleNetworkSizeChange}
      />
      <Spacing />
      <TextField
        fullWidth
        required
        type="number"
        label="Periods"
        // value={experimentConfig.periods}
        // onChange={handlePeriodsChange}
      />
      <Spacing />
      <TextField
        fullWidth
        label="Description"
        type="text"
        multiline
        maxRows={4}
        // value={experimentConfig.description}
        // onChange={handleDescriptionChange}
      />
    </Box>
  );
}
