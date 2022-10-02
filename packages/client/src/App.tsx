import { Grid } from "@mui/material";

import ExperimentConfigurationBox from "./components/ExperimentConfigurationBox";
import ExperimentControls from "./components/ExperimentControls";
import HomeBox from "./components/HomeBox";
import NavBar from "./components/NavBar";
import "./index.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="app-content">
        <Grid container spacing={1} sx={{ height: "100%" }}>
          <Grid item xs={4} sx={{ height: "60%" }}>
            <HomeBox title="Experiment configuration">
              <ExperimentConfigurationBox />
            </HomeBox>
          </Grid>
          <Grid item xs={4} sx={{ height: "60%" }}>
            <HomeBox title="Agent configuration">
              <span>Box!</span>
            </HomeBox>
          </Grid>
          <Grid item xs={4} sx={{ height: "60%" }}>
            <HomeBox title="Console">
              <span>Box!</span>
            </HomeBox>
          </Grid>
          <Grid item xs={8} sx={{ height: "40%" }}>
            <HomeBox title="Output">
              <span>Box!</span>
            </HomeBox>
          </Grid>
          <Grid item xs={4} sx={{ height: "40%" }}>
            <HomeBox title="Experiment controls">
              <ExperimentControls />
            </HomeBox>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
