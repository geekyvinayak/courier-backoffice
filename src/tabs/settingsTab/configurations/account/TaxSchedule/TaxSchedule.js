import React, { useState, useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TaxScheduleForm from "./TaxScheduleForm";
import { deleteRequest, getRequest } from "../../../../../consts/apiCalls";
import { DeleteDialog } from "../../../../../components/deleteDialog";
import useToast from "../../../../../components/toast/useToast";

const TaxSchedule = () => {
  const [taxSchedules, setTaxSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { showSuccess, showError } = useToast();

  const fetchTaxSchedules = async () => {
    try {
      setLoading(true);
      const response = await getRequest("/tax-schedule");
      setTaxSchedules(response || []);
    } catch (error) {
      console.error("Error fetching tax schedules:", error);
      setTaxSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaxSchedules();
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
      await deleteRequest(`/tax-schedule/${id}`);
      showSuccess("Tax Schedule deleted");
      fetchTaxSchedules();
    } catch (error) {
      showError("Something went wrong!");
      console.log(error);
    }
  };

  const handleBackToList = () => {
    setShowForm(false);
    setEditingId(null);
    setIsEditMode(false);
    fetchTaxSchedules();
  };

  const handleFormSuccess = () => {
    handleBackToList();
  };

  if (showForm) {
    return (
      <TaxScheduleForm
        editingId={editingId}
        isEditMode={isEditMode}
        onBack={handleBackToList}
        onSuccess={handleFormSuccess}
      />
    );
  }

  const columns = [
    {
      field: "displayId",
      headerName: "ID",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => params.value || "-",
    },
    {
      field: "codes",
      headerName: "Code",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => params.value || "-",
    },
    {
      field: "actions",
      headerName: "",
      width: 100,
      sortable: false,
      cellClassName: "flex !justify-center",
      renderCell: (params) => (
        <IconButton>
          <DeleteDialog key={params.row.id} handleDelete={() => handleDelete(params.row.id)} />
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
          New Schedule
        </Button>
      </Box>
      <Box className="w-[90%]">
        <DataGrid
          rows={taxSchedules}
          columns={columns}
          loading={loading}
          onCellClick={(params, event) => {
            if (params.field !== "actions") {
              handleEdit(params.row.id);
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
                pageSize: 7,
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
          className="cursor-pointer !h-[60vh]"
        />
      </Box>
    </Box>
  );
};

export default TaxSchedule;