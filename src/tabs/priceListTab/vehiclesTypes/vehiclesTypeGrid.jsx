import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const columns = [
  {
    field: "IsDefault",
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
    field: "id",
    headerName: "id",
    flex:1

  },
  {
    field: "DisplayNamePrimary",
    headerName: "Name",
    flex:2
  },
  {
    field: "IconUrl",
    headerName: "Icon",
    sortable: false,
    renderCell: (params) =>(
      <img src={params.value}/>
    )
  },
];

const rows =  [
  {
      "id": "1",
      "IsDefault": false,
      "DisplayNameSecondary": "BK",
      "DisplayNamePrimary": "BIKE",
      "IconUrl": "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/bike.png",
      "EditUrl": "/BackOffice/VehicleTypes/Edit/1",
      "DetailsUrl": "/BackOffice/VehicleTypes/Type/1",
      "SetDefaultUrl": "/BackOffice/VehicleTypes/SetDefault/1"
  },
  {
      "id": "2",
      "IsDefault": true,
      "DisplayNameSecondary": "C",
      "DisplayNamePrimary": "Car",
      "IconUrl": "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/car.png",
      "EditUrl": "/BackOffice/VehicleTypes/Edit/2",
      "DetailsUrl": "/BackOffice/VehicleTypes/Type/2",
      "SetDefaultUrl": "/BackOffice/VehicleTypes/SetDefault/2"
  },
  {
      "id": "3",
      "IsDefault": false,
      "DisplayNameSecondary": "HB",
      "DisplayNamePrimary": "HatchBack",
      "IconUrl": "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/suv.png",
      "EditUrl": "/BackOffice/VehicleTypes/Edit/3",
      "DetailsUrl": "/BackOffice/VehicleTypes/Type/3",
      "SetDefaultUrl": "/BackOffice/VehicleTypes/SetDefault/3"
  },
  {
      "id": "4",
      "IsDefault": false,
      "DisplayNameSecondary": "MV",
      "DisplayNamePrimary": "Minivan/SUV/SmallTruck",
      "IconUrl": "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/minivan.png",
      "EditUrl": "/BackOffice/VehicleTypes/Edit/4",
      "DetailsUrl": "/BackOffice/VehicleTypes/Type/4",
      "SetDefaultUrl": "/BackOffice/VehicleTypes/SetDefault/4"
  },
  {
      "id": "5",
      "IsDefault": false,
      "DisplayNameSecondary": "CV",
      "DisplayNamePrimary": "CargoVan",
      "IconUrl": "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/cargovan.png",
      "EditUrl": "/BackOffice/VehicleTypes/Edit/5",
      "DetailsUrl": "/BackOffice/VehicleTypes/Type/5",
      "SetDefaultUrl": "/BackOffice/VehicleTypes/SetDefault/5"
  },
  {
      "id": "6",
      "IsDefault": false,
      "DisplayNameSecondary": "5T",
      "DisplayNamePrimary": "5-TON",
      "IconUrl": "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/lowdock.png",
      "EditUrl": "/BackOffice/VehicleTypes/Edit/6",
      "DetailsUrl": "/BackOffice/VehicleTypes/Type/6",
      "SetDefaultUrl": "/BackOffice/VehicleTypes/SetDefault/6"
  }
];

const VehiclesTypeGrid = () => {
  return (
    <Box className="w-[80%] mx-auto mt-8">
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

export default VehiclesTypeGrid;
