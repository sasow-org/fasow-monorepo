import { fasowInstance } from "@fasow/backend/build";
import {
  CloudDownload,
  CloudUpload,
  PlayArrow,
  Replay,
} from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";

export default function ExperimentControls() {
  return (
    <Box>
      <Typography variant="subtitle2" paddingBottom={2} color="GrayText">
        This panel controls the current experiment. You can save this
        experiment, load a saved one or create a brand new experiment.
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={() => {
              console.log(fasowInstance.getState());
            }}
          >
            <PlayArrow sx={{ marginRight: 1 }} />
            Start experiment
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box height="16px" />
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" sx={{ width: "100%" }}>
            <CloudUpload sx={{ marginRight: 1 }} />
            Load experiment
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" sx={{ width: "100%" }}>
            <CloudDownload sx={{ marginRight: 1 }} />
            Save experiment
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" sx={{ width: "100%" }}>
            <Replay sx={{ marginRight: 1 }} />
            New Experiment
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
