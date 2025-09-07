import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getRequest, putRequest } from "../../../../../consts/apiCalls";
import useToast from "../../../../../components/toast/useToast";

const StatusColorContent = () => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editedColors, setEditedColors] = useState({});
  const [saving, setSaving] = useState(false);
  const { showSuccess, showError } = useToast();

  // Fetch data
  const fetchStatuses = async () => {
    setLoading(true);
    try {
      const response = await getRequest("/order-status-colors");
      setStatuses(response || []);
      setEditedColors({});
    } catch (err) {
      console.error("Failed to fetch statuses", err);
      showError("Failed to fetch status colors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  // Handle color change
  const handleColorChange = (id, newColor) => {
    setEditedColors((prev) => ({
      ...prev,
      [id]: newColor,
    }));
  };

  // Save changes
  const handleSave = async () => {
    setSaving(true);
    try {
      // Build array of all updated items
      const updatedItems = Object.entries(editedColors)
        .map(([id, color]) => {
          const item = statuses.find((s) => s.id == id || s.id === parseInt(id));

          if (!item) {
            console.error(`Status item not found for id: ${id}`);
            return null;
          }

          return {
            id: parseInt(id),
            status: item.status,
            color: color,
          };
        })
        .filter(Boolean);

      if (updatedItems.length === 0) {
        showError("No valid items to update");
        return;
      }

      await putRequest("/order-status-colors", updatedItems);
      showSuccess("Status colors updated successfully");
      await fetchStatuses();
    } catch (err) {
      console.error("Failed to save changes", err);
      showError("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  // Reset changes
  const handleReset = () => {
    setEditedColors({});
  };

  const hasChanges = Object.keys(editedColors).length > 0;

  const columns = [
    {
      field: "status",
      headerName: "Id",
      flex: 1,
      renderHeader: () => <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>Id</Box>,
      renderCell: (params) => params.value || "-",
    },
    {
      field: "color",
      headerName: "Color",
     flex: 1,
      renderHeader: () => <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>Color</Box>,
      renderCell: (params) => {
        const currentColor = editedColors[params.row.id] || params.value;
        return (
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <input
              type="color"
              value={currentColor || "#000000"}
              onChange={(e) => handleColorChange(params.row.id, e.target.value)}
              style={{
                width: "40px",
                height: "30px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
                backgroundColor: "transparent",
              }}
            />
          </Box>
        );
      },
      sortable: false,
    },
  ];

  return (
    <Box  sx={{
          backgroundColor: "white",
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          padding: 3,
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
          marginBottom: 5,
          width:"80%"
        }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Order Status Colors
        </Typography>
        <Box display={"flex"} gap={2}>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!hasChanges || saving}
            sx={{
              backgroundColor: "#1569CB",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
           <Button
            variant="contained"
            onClick={handleReset}
            disabled={!hasChanges || saving}
            sx={{ textTransform: "none" }}
          >
            Reset
          </Button>
        </Box>
      </Box>
      {/* Action Buttons */}

      {/* Data Grid */}
      <Box >
        <DataGrid
          rows={statuses}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.id}
          disableSelectionOnClick
          disableColumnMenu
          slotProps={{
            loadingOverlay: {
              variant: "circular-progress",
              noRowsVariant: "circular-progress",
            },
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 100,
              },
            },
          }}
          pageSizeOptions={[100]}
          rowHeight={45}
          columnHeaderHeight={45}
          sx={{
            "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
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
          className="!h-[48vh]"
        />
      </Box>
    </Box>
  );
};

export default StatusColorContent;
