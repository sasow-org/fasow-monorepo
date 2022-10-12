import { useState } from "react";

import { Add } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Switch } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import NewAgentModal from "../NewAgentModal";

// import { useExperimentConfigContext } from "../../context/ExperimentConfigProvider";
// import ModalEditAgentConfig from "../Modals/ModalEditAgentConfig";

export default function AgentConfigurationBox() {
  // const { experimentConfig } = useExperimentConfigContext();
  // const [rows, setRows] = useState(experimentConfig.agentsConfigs);

  const [rows] = useState([]);
  const [newAgentModalVisible, setNewAgentModalVisible] = useState(false);

  // handle the seed agent mode with from switch
  // const handleSeedAgent = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   index
  // ) => {
  //   // console.log("agentsConfig[index].isSeed: ", agentsConfig[index].isSeed);
  //   // console.log("event.target.checked: ", event.target.checked)
  //   // console.log("Pre change --> ", experimentConfig.seedSize)
  //   // agentsConfig[index].isSeed = event.target.checked;
  //   // let newSeedSize = 0;
  //   // agentsConfig.forEach((ac) => {
  //   //    if(ac.isSeed){
  //   //        newSeedSize+=ac.percentageAgent*experimentConfig.networkSize/100;
  //   //    }
  //   // })
  //   // experimentConfig.seedSize = newSeedSize;
  //   // console.log("Post change --> ", experimentConfig.seedSize)
  // };

  // const handleChangePercentage = (event, index) => {
  //   // console.log("on handleChange percentage, event.target.value = ",event.target.value)
  //   // agentsConfig[index].percentageAgent = Number(event.target.value);
  // };

  const columns: GridColDef[] = [
    {
      field: "configName",
      headerName: "Config Name",
      minWidth: 130,
    },
    {
      field: "percentageAgent",
      headerName: "Percentage Agent (%)",
      width: 160,
      editable: true,
    },
    {
      field: "isSeed",
      headerName: "isSeed",
      width: 70,
      renderCell: () => (
        <Switch
          // checked={experimentConfig.agentsConfigs[cellParam.row.id].isSeed}
          checked
          // onChange={(e) => handleSeedAgent(e, cellParam.row.id)}
        />
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      renderCell: (cellParam) => {
        // console.log("On Edit, CellParam: ",cellParam);
        // let agentConfig = agentsConfig[cellParam.row.id];
        const index = cellParam.row.id;
        // return <ModalEditAgentConfig {...index} />;
        return <div id={index} />;
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 80,
      renderCell: () => (
        <Button>
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  // function getRows(arrayToGet) {
  //   function getRow(row, id) {
  //     return {
  //       id,
  //       configName: row.configName,
  //       percentageAgent: row.percentageAgent,
  //       isSeed: row.isSeed,
  //       edit: true,
  //       delete: true,
  //     };
  //   }
  //   const array = [];
  //   let id = 0;
  //   arrayToGet.forEach((agentConfig) => {
  //     array.push(getRow(agentConfig, id));
  //     id += 1;
  //   });
  //   return array;
  // }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          marginBottom: 2,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5]}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
      <Button variant="contained" onClick={() => setNewAgentModalVisible(true)}>
        <Add />
        Add configuration
      </Button>
      <NewAgentModal
        visible={newAgentModalVisible}
        hide={() => setNewAgentModalVisible(false)}
      />
    </>
  );
}
