import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { deleteRequest, getRequest } from "../../../consts/apiCalls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToast from "../../../components/toast/useToast";
import { IconButton } from "@mui/material";
import { DeleteDialog } from "../../../components/deleteDialog";

const FuleSurchargesTableGrid = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rows, setRow] = useState([]);
  const { showError } = useToast();

  const fetchData = async () => {
    setLoading(true);
    const response = await getRequest("/fuel-surcharge-tables")
      .then((response) => {
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
      cellClassName: "text-center cursor-pointer !text-[#3e4396]",
    },
    {
      field: "action",
      headerName: "",
      sortable: false,
      cellClassName: "flex !justify-center",
      renderCell: (params) => (
        <IconButton>
          <DeleteDialog handleDelete={() => handleDelete(params.id)} />
        </IconButton>
      ),
    },
  ];

  const handleCellClick = (params) => {
    navigate(`/pricelist/fuel-surcharges-table/edit/${params}`);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await deleteRequest(`/fuel-surcharge-tables/${id}`);
      fetchData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      showError("Something went wrong");
      setLoading(false);
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
        onCellClick={(params) => {
          if (params.field === "name") {
            handleCellClick(params.row.id);
          }
        }}
        loading={loading}
        slotProps={{
          loadingOverlay: {
            variant: "circular-progress",
            noRowsVariant: "circular-progress",
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
          "& .MuiDataGrid-virtualScrollerContent": {
            fontWeight: "500", // Bold text
            fontSize: "12px",
          },
        }}
        disableRowSelectionOnClick
        className="!h-[70vh]"
      />
    </Box>
  );
};

export default FuleSurchargesTableGrid;
