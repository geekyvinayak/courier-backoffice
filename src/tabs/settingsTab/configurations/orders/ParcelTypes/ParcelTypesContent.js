import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
} from "@mui/material";
import { getRequest } from "../../../../../consts/apiCalls";
import { DataGrid } from "@mui/x-data-grid";
import CreateUpdateParcelType from "./CreateUpdateParcelType";

const ParcelTypesContent = () => {
  const [parcelTypes, setParcelTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchParcelTypes = async () => {
    try {
      setLoading(true);
      const response = await getRequest("/parcelType");
      console.log("responseresponse", response);
      setParcelTypes(response || []);
    } catch (error) {
      console.error("Error fetching hold reasons:", error);
      setParcelTypes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParcelTypes();
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
    fetchParcelTypes();
  };

  const handleFormSuccess = () => {
    // Called when form is successfully submitted
    handleBackToList();
  };

  // If showing form, render the form component
  if (showForm) {
    return (
      <CreateUpdateParcelType
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
      headerName: "Id",
      flex: 1,
      cellClassName: "!text-[#3e4396] underline cursor-pointer",
      renderCell: (params) => params.value || "-",
    },
    {
      field: "name",
      headerName: "Name (EN)",
      flex: 1,
      renderCell: (params) => params.value || "-",
    },
    {
      field: "dimensions",
      headerName: "Dimensions",
      flex: 1,
      renderCell: ({ row }) => {
        const { length, width, height, unitOfLength } = row;
        if (
          typeof length === "number" &&
          typeof width === "number" &&
          typeof height === "number" &&
          unitOfLength
        ) {
          return `${length}×${width}×${height} ${unitOfLength}`;
        }
        return "-";
      },
    },
    {
      field: "WeightType",
      headerName: "Weight Type",
      flex: 1,
      renderCell: ({ row }) => {
        const { dimensionalWeight } = row;
        if (typeof dimensionalWeight === "boolean") {
          return `${dimensionalWeight ? "Dimensional" : "Actual"}`;
        }
        return "-";
      },
    },
    {
      field: "dimensionalFactor",
      headerName: "Dimensional Factor",
      flex: 1,
      renderCell: (params) => params.value ?? "-",
    },
    {
      field: "weight",
      headerName: "Weight",
      flex: 1,
      renderCell: (params) =>
        params.value !== undefined ? `${params.value} lbs` : "-",
    },
    {
      field: "totalUnitFactor",
      headerName: "Total Unit Factor",
      flex: 1,
      renderCell: (params) => params.value ?? "-",
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
          New Parcel Types
        </Button>
      </Box>
      <DataGrid
        rows={parcelTypes}
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

export default ParcelTypesContent;
