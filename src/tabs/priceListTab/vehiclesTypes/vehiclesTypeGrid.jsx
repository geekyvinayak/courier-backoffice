import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
import { getRequest } from "../../../consts/apiCalls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VehiclesTypeGrid = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rows, setRow] = useState([]);

  const fetchData = async () => {
    const response = await getRequest("/vehicleType")
      .then(setLoading(false))
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
    setRow(response);
  };
  const changeDefault = async (id) => {
    const response = await getRequest(`/vehicleType/makeDefualt/${id}`);
    fetchData();
  };

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
          <StarOutlineIcon
            style={{ color: "#1976d2" }}
            onClick={() => {
              changeDefault(params.id);
            }}
          />
        ),
    },
    {
      field: "displayId",
      headerName: "Id",
      flex: 1,
      cellClassName: "cursor-pointer",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      cellClassName: "text-center",
    },
    {
      field: "image",
      headerName: "Icon",
      sortable: false,
      renderCell: (params) => <img src={params.value} />,
    },
  ];

  const handleCellClick = (params) => {
    if (params.field === "id") {
      console.log("Clicked ID:", params.value);
      navigate(`/pricelist/vehiclestype/edit/${params.value}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box className="w-[80%] mx-auto mt-8">
      <DataGrid
        rows={rows}
        columns={columns}
        onCellClick={handleCellClick}
        loading={loading}
        slotProps={{
          loadingOverlay: {
            variant: "linear-progress",
            noRowsVariant: "linear-progress",
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
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
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default VehiclesTypeGrid;
