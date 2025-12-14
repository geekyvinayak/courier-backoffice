import React, { useState, useEffect } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import BillingCycleForm from "./BillingCycleForm";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { deleteRequest, getRequest, postRequest } from "../../../../../consts/apiCalls";
import { DeleteDialog } from "../../../../../components/deleteDialog";
import useToast from "../../../../../components/toast/useToast";

const BillingCycle = () => {
  const [billingCycles, setBillingCycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { showSuccess, showError } = useToast();

  const fetchBillingCycles = async () => {
    try {
      setLoading(true);
      const response = await getRequest("/billingCycle");
      setBillingCycles(response || []);
    } catch (error) {
      console.error("Error fetching billing cycles:", error);
      setBillingCycles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBillingCycles();
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
      await deleteRequest(`/billingCycle/${id}`);
      showSuccess("Billing Cycle deleted");
      fetchBillingCycles();
    } catch (error) {
      showError("Something went wrong!");
      console.log(error);
    }
  };

  const handleBackToList = () => {
    setShowForm(false);
    setEditingId(null);
    setIsEditMode(false);
    fetchBillingCycles();
  };

  const handleFormSuccess = () => {
    handleBackToList();
  };

  const handleMakeDefault = async (id) => {
    try {
      await postRequest(`/billingCycle/makeDefault/${id}`);
      fetchBillingCycles();
    } catch (error) {
      showError("Error setting default billing cycle");
      console.log(error);
    }
  };

  if (showForm) {
    return (
      <BillingCycleForm
        editingId={editingId}
        isEditMode={isEditMode}
        onBack={handleBackToList}
        onSuccess={handleFormSuccess}
      />
    );
  }

  const columns = [
    {
      field: "defaultCycle",
      headerName: "Default",
      width: 100,
      cellClassName: "!flex !justify-center !items-center",
      renderCell: (params) =>
        params.value ? (
          <StarIcon style={{ color: "#1976d2" }} />
        ) : (
          <StarOutlineIcon
            onClick={() => handleMakeDefault(params.row.id)}
            style={{
              color: "#1976d2",
              justifySelf: "center",
              alignSelf: "center",
              cursor: "pointer",
            }}
          />
        ),
      sortable: false,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      renderCell: (params) => params.value || "-",
    },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      cellClassName: "flex !justify-center",
      renderCell: (params) => (
        <IconButton>
          <DeleteDialog key={params.id} handleDelete={() => handleDelete(params.id)} />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNewSchedule}
          sx={{ backgroundColor: "#1569CB", textTransform: "none" }}
        >
          New Billing Cycle
        </Button>
      </Box>
      <Box className="w-[90%]">
        <DataGrid
          rows={billingCycles}
          columns={columns}
          loading={loading}
          onCellClick={(params, event) => {
            if (params.field !== "defaultCycle" && params.field !== "actions") {
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
              border: "1px solid #e0e0e0",
            },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "#f5f5f5",
            },
            "& .MuiDataGrid-row:nth-of-type(even)": {
              backgroundColor: "#ffffff",
            },
            "& .MuiDataGrid-columnHeaders": {
              fontWeight: "bold",
              fontSize: "14px",
            },
            "& .MuiDataGrid-virtualScrollerContent": {
              fontWeight: "500",
              fontSize: "12px",
            },
          }}
          className="cursor-pointer !h-[48vh]"
        />
      </Box>
    </Box>
  );
};

export default BillingCycle;