import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { getRequest,putRequest } from "../../../../../consts/apiCalls";


const StatusColorContent = () => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editedColors, setEditedColors] = useState({});
  const [saving, setSaving] = useState(false);

  // Fetch data
  const fetchStatuses = async () => {
    setLoading(true);
    try {
      const response = await getRequest("/order-status-colors");
      setStatuses(response || []);
      setEditedColors({});
    } catch (err) {
      console.error("Failed to fetch statuses", err);
    } finally {
      setLoading(false);
    }
  };

  // On color change (just update local state)
  const handleColorSelect = (id, newColor) => {
    setEditedColors((prev) => ({
      ...prev,
      [id]: newColor,
    }));
  };

  // Save button action
  const handleSave = async () => {
    setSaving(true);
    const updates = Object.entries(editedColors); // [ [id, color], ... ]

    try {
      for (const [id, color] of updates) {
        const item = statuses.find((s) => s.id === id);
        if (!item) continue;

        await putRequest(`/order-status-colors/${id}`, {
          status: item.status,
          color,
        });
      }

      await fetchStatuses(); // Refresh table with latest data
    } catch (err) {
      console.error("Failed to save changes", err);
    } finally {
      setSaving(false);
    }
  };

  // Reset button action
  const handleReset = () => {
    fetchStatuses(); // Re-fetch to discard local edits
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  return (
    <Box p={2}>
      <Typography variant="h6" mb={2}>
        Order Status Colors
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>Id</TableCell>
                  <TableCell>Color</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {statuses.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                      <TextField
                        type="color"
                        size="small"
                        value={editedColors[item.id] || item.color}
                        onChange={(e) => handleColorSelect(item.id, e.target.value)}
                        sx={{
                          width: 60,
                          padding: 0,
                          minWidth: 60,
                          border: "1px solid #ccc",
                          borderRadius: 1,
                          cursor: "pointer",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Save/Reset Buttons */}
          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <Button
              variant="contained"
              sx={{ textTransform: "none", backgroundColor: "#1569CB" }}
              onClick={handleSave}
              disabled={Object.keys(editedColors).length === 0 || saving}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={handleReset}
              disabled={Object.keys(editedColors).length === 0 || saving}
            >
              Reset
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default StatusColorContent;
