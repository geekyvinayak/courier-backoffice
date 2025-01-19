import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const columns = [
  {
    field: "default",
    headerName: "Default",
    sortable: false,
    filterable: false,
    renderCell: (params) =>
      params.value ? (
        <StarIcon style={{ color: "#1976d2" }} />
      ) : (
        <StarOutlineIcon style={{ color: "#1976d2" }} />
      ),
  },
  {
    field: "name",
    headerName: "Name",
    flex:2
  },
  {
    field: "type",
    headerName: "Type",
    flex:1
  },
  {
    field: "actions",
    headerName: "",
    sortable: false,
    renderCell: () => (
      <IconButton>
        <DeleteIcon style={{ color: "#1976d2" }} />
      </IconButton>
    ),
  },
];

const rows = [
  { id: 1, name: "PTC - DEFAULT RATE", type: "By zone", default: true },
  { id: 2, name: "DISTANCE - 5000/2978", type: "By distance", default: false },
  { id: 3, name: "FLAT 8 - 2925", type: "By zone", default: true },
  { id: 4, name: "FLAT 8-50 - 2637/0998", type: "By zone", default: false },
  { id: 5, name: "PTC - GLOBE", type: "By zone", default: true },
  { id: 6, name: "PTC - Z4S/Z3 - 1903/2532", type: "By zone", default: true },
  { id: 7, name: "PTC - Z4W/Z3 - 2204", type: "By zone", default: false },
  { id: 8, name: "PTC - Z6S/Z5 - 9251", type: "By zone", default: true },
  { id: 1, name: "PTC - DEFAULT RATE", type: "By zone", default: true },
  { id: 2, name: "DISTANCE - 5000/2978", type: "By distance", default: false },
  { id: 3, name: "FLAT 8 - 2925", type: "By zone", default: true },
  { id: 4, name: "FLAT 8-50 - 2637/0998", type: "By zone", default: false },
  { id: 5, name: "PTC - GLOBE", type: "By zone", default: true },
  { id: 6, name: "PTC - Z4S/Z3 - 1903/2532", type: "By zone", default: true },
  { id: 7, name: "PTC - Z4W/Z3 - 2204", type: "By zone", default: false },
  { id: 8, name: "PTC - Z6S/Z5 - 9251", type: "By zone", default: true },

];

const PriceListGrid = () => {
  return (
    <Box className="w-[80%]  mx-auto mt-8">
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
        sx={{
          '& .MuiDataGrid-cell , & .MuiDataGrid-columnHeader ': {
            border: '1px solid #e0e0e0', // Border between rows
          },
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: '#f5f5f5', // Light color for odd rows
          },
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: '#ffffff', // White color for even rows
          },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default PriceListGrid;
