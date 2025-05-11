import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { getRequest } from "../../../consts/apiCalls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToast from "../../../components/toast/useToast";

const FuleSurchargesCalculatorGrid = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rows, setRow] = useState([]);
  const { showError } = useToast();

  const fetchData = async () => {
    const response = await getRequest("/surcharge-calculators")
      .then((response)=>{
        setRow(response);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        showError("Something went wrong");
        setLoading(false);
      });
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      cellClassName: "text-center",
    },
    {
      field: "type",
      headerName: "Type",
      flex: 2,
      cellClassName: "text-center",
    },
  ];

  const handleCellClick = (params) => {
      navigate(`/pricelist/vehiclestype/edit/${params.id}`);
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

export default FuleSurchargesCalculatorGrid;
