import React, { useState, useEffect } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getRequest } from "../../../../../consts/apiCalls";
import useToast from "../../../../../components/toast/useToast";
import CertificationsForm from "./CertificationsForm";

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { showSuccess, showError } = useToast();

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const response = await getRequest("/api/certifications");
      setCertifications(response || []);
    } catch (error) {
      console.error("Error fetching certification :", error);
      setCertifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const handleNewcertification = () => {
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
    fetchCertifications();
  };

  const handleFormSuccess = () => {
    handleBackToList();
  };

  if (showForm) {
    return (
      <CertificationsForm
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
      width: 150,
      cellClassName: "!text-[#3e4396]",
      renderCell: (params) => params.value || "-",
      sortable: false,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => params.value || "-",
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
          onClick={handleNewcertification}
          sx={{ backgroundColor: "#1569CB", textTransform: "none" }}
        >
          New Certification
        </Button>
      </Box>
      <Box className="w-[90%]">
        <DataGrid
          rows={certifications}
          columns={columns}
          loading={loading}
          onCellClick={(params, event) => {handleEdit(params.id);}}
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

export default Certifications;
