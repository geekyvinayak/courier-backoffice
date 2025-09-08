import React, { useState, useEffect } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getRequest, postRequest } from "../../../../../consts/apiCalls";
import ParcelTypeScheduleForm from "./ParcelTypeScheduleForm";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const ParcelTypeSchedulesContent = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const response = await getRequest("/parcel-type-schedules");
      setSchedules(response || []);
    } catch (error) {
      console.error("Error fetching parcel type schedules:", error);
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
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

  const handleBackToList = () => {
    setShowForm(false);
    setEditingId(null);
    setIsEditMode(false);
    fetchSchedules();
  };

  const handleFormSuccess = () => {
    handleBackToList();
  };

  if (showForm) {
    return (
      <ParcelTypeScheduleForm
        editingId={editingId}
        isEditMode={isEditMode}
        onBack={handleBackToList}
        onSuccess={handleFormSuccess}
      />
    );
  }


    const handleActive = async (id) => {
      try {
        const response = await postRequest(`/parcel-type-schedules/makeDefault/${id}`);
        fetchSchedules();
      } catch (error) {
        console.log(error);
      }
    };

  const columns = [
    {
      field: "default",
      headerName: "Default",
      width: 100,
      cellClassName: "!flex !justify-center !items-center",
      renderHeader: () => <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>Default</Box>,
      renderCell: (params) =>
        params.value ? (
          <StarIcon style={{ color: "#1976d2" }} />
        ) : (
          <StarOutlineIcon
            onClick={() => handleActive(params.row.id)}
            style={{ color: "#1976d2", justifySelf: "center", alignSelf: "center" }}
          />
        ),
      sortable: false,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderHeader: () => <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>Name</Box>,
      renderCell: (params) => params.value || "-",
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
          rows={schedules}
          columns={columns}
          loading={loading}
          onCellClick={(params) => {console.log("params.field",params.field); if (params.field !== "default") {handleEdit(params.id)}}}
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

export default ParcelTypeSchedulesContent;
