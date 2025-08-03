import React, { useState, useEffect } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import DocumentsForm from "./DocumentsForm";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { deleteRequest, getRequest } from "../../../../../consts/apiCalls";
import { DeleteDialog } from "../../../../../components/deleteDialog";
import useToast from "../../../../../components/toast/useToast";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { showSuccess, showError } = useToast();

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await getRequest("/documents");
      setDocuments(response || []);
    } catch (error) {
      console.error("Error fetching documents :", error);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleNewdocuments = () => {
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
    fetchDocuments();
  };

  const handleFormSuccess = () => {
    handleBackToList();
  };

  if (showForm) {
    return (
      <DocumentsForm
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
      width: 100,
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
      <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNewdocuments}
          sx={{ backgroundColor: "#1569CB", textTransform: "none" }}
        >
          New Document
        </Button>
      </Box>
      <Box className="w-[90%]">
        <DataGrid
          rows={documents}
          columns={columns}
          loading={loading}
          onCellClick={(params, event) => {
            handleEdit(params.id);
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

export default Documents;
