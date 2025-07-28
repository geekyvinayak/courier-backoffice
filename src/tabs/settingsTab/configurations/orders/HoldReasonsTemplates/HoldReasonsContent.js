import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import {
  Edit as EditIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { getRequest } from "../../../../../consts/apiCalls";
import CreateUpdateHoldReasonTemplate from "./CreateUpdateHoldReasonTemplate";
import { DataGrid } from "@mui/x-data-grid";

const HoldReasonsContent = () => {
  const [holdReasons, setHoldReasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchHoldReasons = async () => {
    try {
      setLoading(true);
      const response = await getRequest("/holdReasonTemplates");
      console.log("responseresponse", response);
      setHoldReasons(response || []);
    } catch (error) {
      console.error("Error fetching hold reasons:", error);
      setHoldReasons([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoldReasons();
  }, []);

  const handleNewTemplate = () => {
    setEditingId(null);
    setIsEditMode(false);
    setShowForm(true);
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleBackToList = () => {
    setShowForm(false);
    setEditingId(null);
    setIsEditMode(false);
    // Refresh the list after form operations
    fetchHoldReasons();
  };

  const handleFormSuccess = () => {
    // Called when form is successfully submitted
    handleBackToList();
  };

  // If showing form, render the form component
  if (showForm) {
    return (
      <CreateUpdateHoldReasonTemplate
        editingId={editingId}
        isEditMode={isEditMode}
        onBack={handleBackToList}
        onSuccess={handleFormSuccess}
      />
    );
  }

  const columns = [
    {
      field: "id",
      headerName: "Id",
      flex: 1,
      cellClassName: "!text-[#3e4396]",
      renderCell: (params) => params.value || "-",
    },
    {
      field: "text",
      headerName: "Text (EN)",
      flex: 1,
      renderCell: (params) => params.value || "-",
    },
    {
      field: "Text (FR)",
      headerName: "Text (FR)",
      flex: 1,
      renderCell: (params) => params.value || "-",
    },
  ];

  return (
    <Box className="w-[90%] ">
      <Box
        sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 2 }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleNewTemplate}
          sx={{
            backgroundColor: "#1569CB",
            textTransform: "none",
          }}
        >
          New Hold Reason Template
        </Button>
      </Box>
      <DataGrid
        rows={holdReasons}
        columns={columns}
        loading={loading}
        slotProps={{
          loadingOverlay: {
            variant: "circular-progress",
            noRowsVariant: "circular-progress",
          },
        }}
        onCellClick={(params) => {
          console.log("params", params);
          handleEdit(params.id);
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
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
        className="cursor-pointer !h-[48vh]"
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default HoldReasonsContent;