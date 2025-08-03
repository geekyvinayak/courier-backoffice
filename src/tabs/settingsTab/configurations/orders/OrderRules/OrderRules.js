import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
} from "@mui/material";
import { getRequest } from "../../../../../consts/apiCalls";
import OrderRuleForm from "./OrderRuleForm";
import { DataGrid } from "@mui/x-data-grid";

const OrderRules = () => {
  const [orderRules, setOrderRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchOrderRules = async () => {
    try {
      setLoading(true);
      const response = await getRequest("/order-rules");
      console.log("Order rules response:", response);
      setOrderRules(response.content || []);
    } catch (error) {
      console.error("Error fetching order rules:", error);
      setOrderRules([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderRules();
  }, []);

  const handleNewOrderRule = () => {
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
    fetchOrderRules();
  };

  const handleFormSuccess = () => {
    // Called when form is successfully submitted
    handleBackToList();
  };

  // If showing form, render the form component
  if (showForm) {
    return (
      <OrderRuleForm
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
      field: "description",
      headerName: "Description",
      flex: 1,
      renderCell: (params) => params.value || "-",
    },
    {
      field: "type",
      headerName: "Type",
      flex: 0.8,
      renderCell: (params) => {
        // Convert backend format to display format
        const typeValue = params.value;
        if (typeValue === "VALUE_BASED") return "Value Based";
        if (typeValue === "SCRIPT") return "Script";
        return typeValue || "-";
      },
    },
    {
      field: "scriptName",
      headerName: "Script Name",
      flex: 1,
      renderCell: (params) => params.value || "-",
    },
  ];

  return (
    <Box className="w-[90%]">
      <Box
        sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 2 }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleNewOrderRule}
          sx={{
            backgroundColor: "#1569CB",
            textTransform: "none",
          }}
        >
          New Order Rule
        </Button>
      </Box>
      <DataGrid
        rows={orderRules}
        columns={columns}
        loading={loading}
        slotProps={{
          loadingOverlay: {
            variant: "circular-progress",
            noRowsVariant: "circular-progress",
          },
        }}
        onCellClick={(params) => {
          console.log("Order rule clicked:", params);
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

export default OrderRules;