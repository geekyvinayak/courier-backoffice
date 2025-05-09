import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
import { getRequest, postRequest } from "../../../consts/apiCalls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToast from "../../../components/toast/useToast";

const VehiclesTypeGrid = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rows, setRow] = useState([]);
  const { showSuccess, showError, showWarning } = useToast();

  const fetchData = async () => {
    const response = await getRequest("/vehicleType")
      .then((response)=>{setRow(response);setLoading(false)})
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
    console.log("responseresponse", response);
    
  };

  const changeDefault = async (id, name) => {
    const response = await postRequest(`/vehicleType/makeDefault/${id}`);
    showSuccess(name + " has set as default");
    fetchData();
  };

  const columns = [
    {
      field: "default",
      headerName: "Default",
      sortable: false,
      filterable: false,
      cellClassName:'!flex !justify-center !items-center',
      renderCell: (params) =>
        params.value ? (
          <StarIcon style={{ color: "#1976d2" }} />
        ) : (
          <StarOutlineIcon
            style={{ color: "#1976d2" }}
            onClick={() => {
              changeDefault(params.id, params.row.name);
            }}
          />
        ),
    },
    {
      field: "displayId",
      headerName: "Id",
      flex: 1,
      cellClassName: "cursor-pointer !text-[#3e4396]",
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
      cellClassName: "!p-2",
      renderCell: (params) => <img src={params.value} />,
    },
  ];

  const handleCellClick = (params) => {
    if (params.field === "displayId") {
      console.log("Clicked ID:", params.value);
      navigate(`/pricelist/vehiclestype/edit/${params.id}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box className="w-[90%] mt-5">
      <DataGrid
        rows={rows}
        columns={columns}
        onCellClick={handleCellClick}
        // slots={{ toolbar: GridToolbar }}
        loading={loading}
        slotProps={{
          loadingOverlay: {
            variant: 'circular-progress',
            noRowsVariant: 'circular-progress',
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        rowHeight={45}
        columnHeaderHeight={45}
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
            fontSize: "14px", // Increase font size
          },
          "& .MuiDataGrid-virtualScrollerContent":{
            fontWeight: "500", // Bold text
            fontSize: "12px",
          }
        }}
        disableRowSelectionOnClick
         className="!h-[70vh]"
      />
    </Box>
  );
};

export default VehiclesTypeGrid;
