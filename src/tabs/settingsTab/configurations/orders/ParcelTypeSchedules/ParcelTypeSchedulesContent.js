import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { 
  Star as StarIcon, 
  StarBorder as StarBorderIcon,
  FilterList as FilterListIcon 
} from "@mui/icons-material";
import { getRequest } from '../../../../../consts/apiCalls';
import ParcelTypeScheduleForm from './ParcelTypeScheduleForm';

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
    // Refresh the list after form operations
    fetchSchedules();
  };

  const handleFormSuccess = () => {
    // Called when form is successfully submitted
    handleBackToList();
  };

  // If showing form, render the form component
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

  // Otherwise, render the list view
  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      {/* Header with New Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNewSchedule}
          sx={{
            backgroundColor: "#1569CB",
            textTransform: "none",
          }}
        >
          New Schedule
        </Button>
      </Box>

      {/* Data Grid */}
      <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold", width: "80px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  Default
                  <IconButton size="small" sx={{ color: "#666" }}>
                    <FilterListIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  Name
                  <IconButton size="small" sx={{ color: "#666" }}>
                    <FilterListIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={2} sx={{ textAlign: "center", padding: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Loading...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : schedules.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} sx={{ textAlign: "center", padding: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No parcel type schedules found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              schedules.map((schedule) => (
                <TableRow
                  key={schedule.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f9f9f9",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => handleEdit(schedule.id)}
                >
                  <TableCell sx={{ width: "80px", textAlign: "center" }}>
                    {schedule.default ? (
                      <StarIcon 
                        sx={{ 
                          color: "#1569CB", 
                          fontSize: "20px" 
                        }} 
                      />
                    ) : (
                      <StarBorderIcon 
                        sx={{ 
                          color: "#ccc", 
                          fontSize: "20px" 
                        }} 
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: "#1569CB", 
                        textDecoration: "underline",
                        cursor: "pointer"
                      }}
                    >
                      {schedule.name}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer with item count */}
      {!loading && schedules.length > 0 && (
        <Box sx={{ 
          display: "flex", 
          justifyContent: "flex-end", 
          marginTop: 1,
          paddingRight: 1 
        }}>
          <Typography variant="body2" color="text.secondary">
            1 - {schedules.length} of {schedules.length} items
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ParcelTypeSchedulesContent;