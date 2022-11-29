import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Result } from "src/hooks/useFasow";

const columns: GridColDef[] = [
  {
    field: "repetition",
    headerName: "Repetition",
    width: 150,
  },
  {
    field: "tick",
    headerName: "Tick",
    width: 150,
  },
  {
    field: "NOT_READ",
    headerName: "Not read",
    width: 150,
  },
  {
    field: "READ",
    headerName: "Read",
    width: 150,
  },
  {
    field: "READY_TO_SHARE",
    headerName: "Ready to share",
    width: 150,
  },
  {
    field: "SHARED",
    headerName: "Shared",
    width: 150,
  },
  {
    field: "percentage-type",
    headerName: "Value",
    width: 300,
  },
];

export default function DataHandlerOutputBox({
  results,
}: {
  results: Result[];
}) {
  return (
    <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
      <Typography variant="subtitle2" paddingBottom={2} color="GrayText">
        This is the output of the current experiment.
      </Typography>
      <DataGrid
        rows={results}
        columns={columns}
        // pageSize={5}
        // rowsPerPageOptions={[5]}
        // checkboxSelection
        getRowId={(row) => Math.random().toString()}
        disableSelectionOnClick
      />
    </Box>
  );
}
