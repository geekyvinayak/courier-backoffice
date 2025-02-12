import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
import { deleteRequest, getRequest } from "../../../consts/apiCalls";
import { useState } from "react";
import { DeleteDialog } from "../../../components/deleteDialog";
import useToast from "../../../components/toast/useToast";
import { useNavigate } from "react-router-dom";

const VehicleEquivalenciesGrid = () => {
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(true);
  const [rows, setRow] = useState([]);
  const navigate = useNavigate();
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
      cellClassName: "cursor-pointer",
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
      cellClassName:'flex !justify-center cursor-pointer',
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

  const handleCellClick = (params) => {
    if (params.field === "vehicleId") {
      console.log("Clicked ID:", params.id);
      navigate(`/pricelist/vehicleequivalency/edit/${params.id}`);
    }
  };

  return (
    <Box className="w-[90%] mt-5">
      <DataGrid
        rows={rows}
        onCellClick={handleCellClick}
        columns={columns}
        loading={loading}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 7,
            },
          },
        }}
        disableRowSelectionOnClick
        getRowId={(row) => row.vehicleId}
         className="!h-[70vh]"
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
          "& .MuiDataGrid-columnHeaders": {
            fontWeight: "bold", // Bold text
            fontSize: "16px", // Increase font size
          },
          "& .MuiDataGrid-virtualScrollerContent":{
            fontWeight: "500", // Bold text
            fontSize: "14px",
          },
        }}
      />
    </Box>
  );
};

export default VehicleEquivalenciesGrid;
