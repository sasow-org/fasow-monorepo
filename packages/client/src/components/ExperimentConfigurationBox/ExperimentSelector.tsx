import {ChangeEvent, useState} from "react";

import { Box, TextField, Typography } from "@mui/material";

interface IProps {
  experiments: any[];
  setExperiment: (name: string) => void;
}

export default function ExperimentSelector({
  experiments,
  setExperiment,
}: IProps) {
    const [selectedExperiment, setSelectedExperiment] = useState("ExampleExperiment");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSelectedExperiment(event.target.value);
      setExperiment(selectedExperiment);
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="overline">Experiment</Typography>
      <TextField
        id="outlined-select-currency-native"
        select
        label="Experiment to Simulate"
        onChange={handleChange}
        SelectProps={{
          native: true,
        }}
        variant="filled"
        fullWidth
      >
        {experiments.map((experiment) => (
          <option key={experiment} value={experiment}>
            {experiment}
          </option>
        ))}
      </TextField>
    </Box>
  );
}
