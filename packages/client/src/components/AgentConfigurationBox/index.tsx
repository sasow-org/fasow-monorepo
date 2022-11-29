import { useState } from "react";

import { Add } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Switch, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import NewAgentModal from "../NewAgentModal";

export default function AgentConfigurationBox() {
  const [rows] = useState([]);

  const [newAgentModalVisible, setNewAgentModalVisible] = useState(false);

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
      renderCell: () => <Switch checked />,
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

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          marginBottom: 2,
        }}
      >
        <Typography variant="subtitle2" paddingBottom={2} color="GrayText">
          Set the agents for the current experiment.
        </Typography>
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
