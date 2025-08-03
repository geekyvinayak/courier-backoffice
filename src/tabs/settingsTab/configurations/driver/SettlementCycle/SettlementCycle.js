import React, { useState, useEffect } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import SettlementCycleForm from "./SettlementCycleForm";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { deleteRequest, getRequest } from "../../../../../consts/apiCalls";
import { DeleteDialog } from "../../../../../components/deleteDialog";
import useToast from "../../../../../components/toast/useToast";

const SettlementCycle = () => {
  const [settlementCycle, setSettlementCycle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { showSuccess, showError } = useToast();
  const fetchSettlementCycle = async () => {
    try {
      setLoading(true);
      const response = await getRequest("/settlement-cycles");
      setSettlementCycle(response || []);
    } catch (error) {
      console.error("Error fetching parcel type schedules:", error);
      setSettlementCycle([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettlementCycle();
  }, []);

  const handleNewSchedule = () => {
    setEditingId(null);
    setIsEditMode(false);
    setShowForm(true);
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteRequest(`/settlement-cycles/${id}`);
      showSuccess("Settlement Cycle deleted");
      fetchSettlementCycle();
    } catch (error) {
      showError("Something went wrong!");
      console.log(error);
    }
  };

  const handleBackToList = () => {
    setShowForm(false);
    setEditingId(null);
    setIsEditMode(false);
    fetchSettlementCycle();
  };

  const handleFormSuccess = () => {
    handleBackToList();
  };

  if (showForm) {
    return (
      <SettlementCycleForm
        editingId={editingId}
        isEditMode={isEditMode}
        onBack={handleBackToList}
        onSuccess={handleFormSuccess}
      />
    );
  }

  const columns = [
    {
      field: "isDefault",
      headerName: "Default",
      width: 100,
      cellClassName: "!flex !justify-center !items-center",
      renderHeader: () => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          Default
        </Box>
      ),
      renderCell: (params) =>
        params.value ? (
          <StarIcon style={{ color: "#1976d2" }} />
        ) : (
          <StarOutlineIcon
            onClick={() => console.log("handle active at line 87 ")}
            style={{
              color: "#1976d2",
              justifySelf: "center",
              alignSelf: "center",
            }}
          />
        ),
      sortable: false,
    },
    {
      field: "descriptionEn",
      headerName: "Description",
      flex: 1,
      renderHeader: () => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          Description
        </Box>
      ),
      renderCell: (params) => params.value || "-",
    },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      cellClassName: "flex !justify-center",
      renderCell: (params) => (
        <IconButton>
          <DeleteDialog
            key={params.id}
            handleDelete={() => handleDelete(params.id)}
          />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 2 }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleNewSchedule}
          sx={{ backgroundColor: "#1569CB", textTransform: "none" }}
        >
          New Schedule
        </Button>
      </Box>
      <Box className="w-[90%]">
        <DataGrid
          rows={settlementCycle}
          columns={columns}
          loading={loading}
          onCellClick={(params, event) => {
            if (params.field !== "actions") {
              handleEdit(params.id);
            }
          }}
          getRowId={(row) => row.id}
          slotProps={{
            loadingOverlay: {
              variant: "circular-progress",
              noRowsVariant: "circular-progress",
            },
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
        />
      </Box>
    </Box>
  );
};

export default SettlementCycle;
