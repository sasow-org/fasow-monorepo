import { ChangeEvent, useEffect } from "react";

import { Box, TextField, Typography } from "@mui/material";
import { useExperiment } from "src/hooks/useFasow";

export default function ExperimentSelector() {
  const [experiments, setExperiment] = useExperiment();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExperiment(event.target.value);
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="overline">Experiment</Typography>
      <TextField
        id="outlined-select-currency-native"
        select
        label="Experiment to Simulate"
        // value={selectedExperiment}
        // value={experimentConfig.experimentType}
        onChange={handleChange}
        SelectProps={{
          native: true,
        }}
        variant="filled"
        fullWidth
      >
        {experiments.map((experiment) => {
          return (
            <option key={experiment} value={experiment}>
              {experiment}
            </option>
          );
        })}
        {/* {ExperimentOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))} */}
      </TextField>
    </Box>
  );
}
