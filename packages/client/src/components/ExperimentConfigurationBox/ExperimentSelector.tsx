import { ChangeEvent, useEffect, useState } from "react";

import { Box, TextField, Typography } from "@mui/material";

import { useFASOWContext } from "../../context/FASOWContextProvider";

export default function ExperimentSelector() {
  // const { experimentConfig, dispatch } = useExperimentConfigContext();

  const [selectedExperiment, setSelectedExperiment] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // En base al experimento seleccionado, entonces se podra por medio de
    // fasow.selectExperimentByName("experimentName"), seleccionar dentro de fasow el experimento que se tiene que ejecutar
    // luego para ejecutar fasow.runSelectedExperiment() y asi se ejecutara el experimento paso a paso
    // Recuerda la interfaz grafica, permite seleccionar el experiment, luego ejecutar
    // el resultado de la ejecucion se muestra en el DataHandlerOutput y ademas los logs de la consola.
    console.log(event.target.value);
    setSelectedExperiment(event.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fasowData, fasowDispatch } = useFASOWContext();
  const populateExp = (experiments: any[]) => {
    const aux: { value: string; label: string }[] = [];
    aux.push({ value: "new experiment", label: "new experiment" });
    experiments.forEach((exp) => {
      aux.push({
        value: exp.type,
        label: exp.type,
      });
    });
    return aux;
  };
  const ExperimentOptions: { value: string; label: string }[] = populateExp(
    fasowData.experiments
  );
  useEffect(() => {
    setSelectedExperiment(ExperimentOptions[3].value);
  }, [ExperimentOptions]);
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="overline">Experiment</Typography>
      <TextField
        id="outlined-select-currency-native"
        select
        label="Experiment to Simulate"
        value={selectedExperiment}
        // value={experimentConfig.experimentType}
        onChange={handleChange}
        SelectProps={{
          native: true,
        }}
        variant="filled"
        fullWidth
      >
        {ExperimentOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
    </Box>
  );
}
