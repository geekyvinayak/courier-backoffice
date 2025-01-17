import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const columns = [
  {
    field: "default",
    headerName: "Default",
    sortable: false,
    filterable:false,
    renderCell: (params) => (
      params.value ? (
        <StarIcon style={{ color: "#1976d2" }} />
      ) : (
        <StarOutlineIcon style={{ color: "#1976d2" }} />
      )
    ),
  },
  {
    field: "name",
    headerName: "Name",
  },
];

const rows = [
  { id: 1, name: "PTC - DEFAULT RATE"},
  { id: 2, name: "DISTANCE - 5000/2978"},
  { id: 3, name: "FLAT 8 - 2925"},
  { id: 4, name: "FLAT 8-50 - 2637/0998"},
  { id: 5, name: "PTC - GLOBE"},
  { id: 6, name: "PTC - Z4S/Z3 - 1903/2532"},
  { id: 7, name: "PTC - Z4W/Z3 - 2204"},
  { id: 8, name: "PTC - Z6S/Z5 - 9251"},
];

const ExtraFeesScheduleGrid = () => {
  return (
    <Box className='w-[80%] m-auto mt-8'>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default ExtraFeesScheduleGrid;
