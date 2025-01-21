import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Widgets } from "@mui/icons-material";

const columns = [
  {
    field: "VehicleId",
    headerName: "id",
    width: 150,
    sortable: false,
    text: "center",
  },
  {
    field: "EquivalentVehicles",
    headerName: "Equivalent Vehicles",
    width: 150,
    sortable: false,
    flex: 1,
    text: "center",
  },
  {
    field: "actions",
    headerName: "",
    sortable: false,
    width: 150,
    text: "center",
    renderCell: () => (
      <IconButton>
        <DeleteIcon style={{ color: "#1976d2" }} />
      </IconButton>
    ),
  },
];

const rows = [
  {
    VehicleId: "1",
    EquivalentVehicles: "1",
    EditUrl: "/BackOffice/VehicleTypes/EditEquivalency/1",
    DeleteUrl: "/BackOffice/VehicleTypes/DeleteEquivalency/1",
  },
  {
    VehicleId: "2",
    EquivalentVehicles: "2",
    EditUrl: "/BackOffice/VehicleTypes/EditEquivalency/2",
    DeleteUrl: "/BackOffice/VehicleTypes/DeleteEquivalency/2",
  },
  {
    VehicleId: "3",
    EquivalentVehicles: "2, 3",
    EditUrl: "/BackOffice/VehicleTypes/EditEquivalency/3",
    DeleteUrl: "/BackOffice/VehicleTypes/DeleteEquivalency/3",
  },
  {
    VehicleId: "4",
    EquivalentVehicles: "2, 3, 4",
    EditUrl: "/BackOffice/VehicleTypes/EditEquivalency/4",
    DeleteUrl: "/BackOffice/VehicleTypes/DeleteEquivalency/4",
  },
  {
    VehicleId: "5",
    EquivalentVehicles: "2, 3, 4, 5",
    EditUrl: "/BackOffice/VehicleTypes/EditEquivalency/5",
    DeleteUrl: "/BackOffice/VehicleTypes/DeleteEquivalency/5",
  },
  {
    VehicleId: "6",
    EquivalentVehicles: "4, 5, 6",
    EditUrl: "/BackOffice/VehicleTypes/EditEquivalency/6",
    DeleteUrl: "/BackOffice/VehicleTypes/DeleteEquivalency/6",
  },
];

const VehicleEquivalenciesGrid = () => {
  return (
    <Box className="w-[90%]  mx-auto mt-8">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
        disableRowSelectionOnClick
        getRowId={(row) => row.VehicleId}
        sx={{
          "& .MuiDataGrid-cell , & .MuiDataGrid-columnHeader ": {
            border: "1px solid #e0e0e0", // Border between rows
          },
          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: "#f5f5f5", // Light color for odd rows
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "#ffffff", // White color for even rows
          },
        }}
      />
    </Box>
  );
};

export default VehicleEquivalenciesGrid;
