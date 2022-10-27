import ExampleExperiment from "@fasow/src/experiments/ExampleExperiment";
import Experiment from "@fasow/src/fasow/abm/Experiment";
import { Grid, ThemeProvider, createTheme } from "@mui/material";

import AgentConfigurationBox from "./components/AgentConfigurationBox";
import Console from "./components/Console";
import DataHandlerOutputBox from "./components/DataHandlerOutputBox";
import ExperimentConfigurationBox from "./components/ExperimentConfigurationBox";
import ExperimentControls from "./components/ExperimentControls";
import HomeBox from "./components/HomeBox";
import NavBar from "./components/NavBar";
import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      light: "#6ec6ff",
      main: "#2196f3",
      dark: "#6ec6ff",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffc947",
      main: "#ff9800",
      dark: "#c66900",
      contrastText: "#000",
    },
  },
});

const handleClick = () => {
  {
  }
  const experiment: ExampleExperiment = new ExampleExperiment();
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavBar />
        <div className="app-content">
          <Grid container spacing={1} sx={{ height: "100%" }}>
            <Grid item xs={4} sx={{ height: "60%" }}>
              <HomeBox title="Experiment configuration">
                <ExperimentConfigurationBox />
              </HomeBox>
            </Grid>
            <Grid item xs={5} sx={{ height: "60%" }}>
              <HomeBox title="Agent configuration">
                <AgentConfigurationBox />
              </HomeBox>
            </Grid>
            <Grid item xs={3} sx={{ height: "60%" }}>
              <HomeBox title="Logs">
                <Console />
              </HomeBox>
            </Grid>
            <Grid item xs={9} sx={{ height: "40%" }}>
              <HomeBox title="Data handler output">
                <DataHandlerOutputBox />
              </HomeBox>
            </Grid>
            <Grid item xs={3} sx={{ height: "40%" }}>
              <HomeBox title="Experiment controls">
                <ExperimentControls />
              </HomeBox>
            </Grid>
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
