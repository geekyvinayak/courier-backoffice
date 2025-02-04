import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
import { deleteRequest, getRequest } from "../../../consts/apiCalls";
import { useState } from "react";
import { DeleteDialog } from "../../../components/deleteDialog";
import useToast from "../../../components/toast/useToast";

const VehicleEquivalenciesGrid = () => {
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(true);
  const [rows, setRow] = useState([]);

  const deleteEquivalance = async (id) => {
    try {
      await deleteRequest(`/vehicleEquivalency/${id}`);
      showSuccess("Price list deleted");
      fetchData();
    } catch (error) {
      showError("Something went wrong!");
      console.log("error", error);
    }
  };

  const columns = [
    {
      field: "vehicleId",
      headerName: "Id",
      width: 150,
      sortable: false,
      text: "center",
    },
    {
      field: "equivalencyIds",
      headerName: "Equivalent Vehicles",
      width: 150,
      sortable: false,
      flex: 1,
      text: "center",
    },
    {
      field: "action",
      headerName: "",
      sortable: false,
      filterable: false,
      cellClassName: "cursor-pointer !text-center",
      renderCell: (params) => (
        <IconButton>
          <DeleteDialog handleDelete={() => deleteEquivalance(params.id)} />
        </IconButton>
      ),
    },
  ];
  const fetchData = async () => {
    const response = await getRequest("/vehicleEquivalency")
      .then(setLoading(false))
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
    console.log("fl", response);
    setRow(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box className="w-[90%]  mx-auto mt-8">
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
        disableRowSelectionOnClick
        getRowId={(row) => row.vehicleId}
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
