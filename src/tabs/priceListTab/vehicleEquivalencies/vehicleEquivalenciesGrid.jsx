import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import StarIcon from "@mui/icons-material/Star";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Widgets } from "@mui/icons-material";
import { useEffect } from "react";
import { deleteRequest, getRequest } from "../../../consts/apiCalls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tableCellClasses } from "@mui/material";


const VehicleEquivalenciesGrid = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [rows, setRow] = useState([]);
    
  

      const deleteEquivalance = async (id) => {
        console.log("came with ",id);
        const response = await deleteRequest(`/vehicleEquivalency/${id}`);
        fetchData();
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
    renderCell: (params) =>
        <DeleteForeverOutlinedIcon
          style={{ color: "#1976d2" ,fontSize:25 ,textAlign:"center",margin:"0 auto"}}
          onClick={() => {
            deleteEquivalance(params.id);
          }}
        />
  },
];
    const fetchData = async () => {
      const response = await getRequest("/vehicleEquivalency")
        .then(setLoading(false))
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
        console.log("fl",response)
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
