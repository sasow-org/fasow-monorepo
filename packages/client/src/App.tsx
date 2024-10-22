import { PlayArrow } from "@mui/icons-material";
import { Fab, Grid, ThemeProvider, createTheme } from "@mui/material";

import {useState} from "react";
import AgentConfigurationBox from "./components/AgentConfigurationBox";
import DataHandlerOutputBox from "./components/DataHandlerOutputBox";
import ExperimentConfigurationBox from "./components/ExperimentConfigurationBox";
import HomeBox from "./components/HomeBox";
import NavBar from "./components/NavBar";
import {useExperiments, useRunExperiment} from "./hooks/useFasow";
import "./index.css";

// @ts-ignore
import img1 from "./resources/tutorial_imgs/1.png";
// @ts-ignore
import img2 from "./resources/tutorial_imgs/2.png";
// @ts-ignore
import img3 from "./resources/tutorial_imgs/3.png";
// @ts-ignore
import img4 from "./resources/tutorial_imgs/4.png";
// @ts-ignore
import img5 from "./resources/tutorial_imgs/5.png";
// @ts-ignore
import img6 from "./resources/tutorial_imgs/6.png";
// @ts-ignore
import img7 from "./resources/tutorial_imgs/7.png";

import HowItWorks from "./components/HowItWorksModal/HowItWorks";

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

function App() {
  const { experimentConfig, experiments, setExperiment } = useExperiments();
  const { results, runExperiment } = useRunExperiment();

  const [open, setOpen] = useState(false);

  const tutorialStepImagesSource = [
      {img: img1, description: "Flexible Agent Simulator for Open WOM: FASOW Console, is the console for the FASOW framework that allow us to select " +
          "the different Agent-Based models that are loaded on FASOW. "},
      {img: img2, description: "To use the FASOW Console, you must to select" +
          "some of the available experiments"},
      {img: img3, description: "Like Example Experiment, Message Repetition,  ExperimentAgentCombination and ExperimentAgentCombinationBestSeed."},
      {img: img4, description: "When some model is selected then their data configuration is loaded and the model is initialized."},
      {img: img5, description: "On the right side we can see the MetaAgent Configurations with their actions."},
      {img: img6, description: "And in the right down edge we can found the RUN Experiment button, and if we run it"},
      {img: img7, description: "We can visualize the output of the simulation on the DataHandler section."}
    ]

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavBar />
        <div className="app-content">
          <Grid container spacing={1} sx={{ height: "100%" }}>
            <Grid item xs={6} sx={{ height: "50%" }}>
              <HomeBox title="Experiment configuration">
                <ExperimentConfigurationBox experiments={experiments} setExperiment={setExperiment} experimentConfig={experimentConfig}/>
              </HomeBox>
            </Grid>
            <Grid item xs={6} sx={{ height: "50%" }}>
              <HomeBox title="Agent configuration">
                <AgentConfigurationBox experimentConfig={experimentConfig}/>
              </HomeBox>
            </Grid>
            <Grid item xs={12} sx={{ height: "50%" }}>
              <HomeBox title="Data handler output">
                <DataHandlerOutputBox results={results} />
              </HomeBox>
            </Grid>
          </Grid>
        </div>
      </div>
      <Fab
        color="primary"
        variant="extended"
        aria-label="run"
        onClick={() => runExperiment()}
        sx={{ position: "absolute", bottom: 108, right: 72 }}
      >
        <PlayArrow sx={{ mr: 1 }} />
        Run experiment
      </Fab>
      <Fab
        size="small" color="error" aria-label="how-it-works"
        variant="extended"
        onClick={() => setOpen(true)}
        sx={{ position: "absolute", bottom: 60, right: 72 }}
      >
        How does FASOW work?
      </Fab>

      <HowItWorks
        tutorialStepImagesSource={tutorialStepImagesSource}
        open={open}
        setOpen={setOpen}
      />
    </ThemeProvider>
  );
}

export default App;
