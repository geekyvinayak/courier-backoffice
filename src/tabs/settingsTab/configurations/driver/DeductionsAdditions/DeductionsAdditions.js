import React, { useEffect, useState } from "react";
import { getRequest } from "../../../../../consts/apiCalls";
import DeductionsAdditionsForm from "./DeductionsAdditionsForm";
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
import { DataGrid } from "@mui/x-data-grid";
const DeductionsAdditions = () => {
  const [DeductionsAdditions, setDeductionsAdditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchDeductionsAdditions = async () => {
    try {
      setLoading(true);
      const response = await getRequest("/deduction-additions");
      console.log("responseresponse dd", response);
      setDeductionsAdditions(response || []);
    } catch (error) {
      console.error("Error fetching hold reasons:", error);
      setDeductionsAdditions([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDeductionsAdditions();
  }, []);

  const handleNewDeductionsAdditions = () => {
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
    fetchDeductionsAdditions();
  };

  const handleFormSuccess = () => {
    // Called when form is successfully submitted
    handleBackToList();
  };

  // If showing form, render the form component
  if (showForm) {
    return (
      <DeductionsAdditionsForm
        editingId={editingId}
        isEditMode={isEditMode}
        onBack={handleBackToList}
        onSuccess={handleFormSuccess}
      />
    );
  }

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "!text-[#3e4396]",
      renderCell: (params) => params.value || "-",
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => {
        const { type, unit, amount } = params.row;

        if (amount == null) return "-";

        const sign = type === "ADDITION" ? "+" : type === "DEDUCTION" ? "-" : "";
        const formattedAmount =
          unit === "PERCENTAGE" ? `${amount}%` : unit === "DOLLAR" ? `$${amount}` : amount;

        return `${sign}${formattedAmount}`;
      },
    },
  ];

  return (
    <Box className="w-[90%] ">
      <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNewDeductionsAdditions}
          sx={{
            backgroundColor: "#1569CB",
            textTransform: "none",
          }}
        >
          New Deductions/Additions
        </Button>
      </Box>
      <DataGrid
        rows={DeductionsAdditions}
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

export default DeductionsAdditions;
