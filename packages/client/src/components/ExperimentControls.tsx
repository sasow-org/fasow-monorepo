import { PlayArrow } from "@mui/icons-material";
import { Box, Button, Fab, Grid, Typography } from "@mui/material";

export default function ExperimentControls() {
  return (
    <Box>
      <Typography variant="subtitle2" paddingBottom={2} color="GrayText">
        This panel controls the current experiment. You can save this
        experiment, load a saved one or create a brand new experiment.
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Button variant="outlined" sx={{ width: "100%" }}>
            Load experiment
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" sx={{ width: "100%" }}>
            Save experiment
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" sx={{ width: "100%" }}>
            New Experiment
          </Button>
        </Grid>
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        size="large"
        variant="extended"
        sx={{ position: "absolute", bottom: 32, right: 32 }}
      >
        <PlayArrow />
        Start experiment
      </Fab>
    </Box>
  );
}
