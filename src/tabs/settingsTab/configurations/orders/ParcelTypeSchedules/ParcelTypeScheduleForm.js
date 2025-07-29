import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
} from "@mui/material";
import { 
  Delete as DeleteIcon,
  Search as SearchIcon 
} from "@mui/icons-material";
import { postRequest, getRequest, putRequest } from "../../../../../consts/apiCalls";

const ParcelTypeScheduleForm = ({ editingId, isEditMode, onBack, onSuccess }) => {
  const [allParcelTypes, setAllParcelTypes] = useState([]);
  const [selectedParcelTypes, setSelectedParcelTypes] = useState([]);
  const [availableParcelTypes, setAvailableParcelTypes] = useState([]);
  const [checkedAvailable, setCheckedAvailable] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("NAME is required"),
    }),
    onSubmit: async (values) => {
      try {
        const submitData = {
          name: values.name,
          selectedParcelTypes: selectedParcelTypes,
          default: false // You can add UI for this if needed
        };

        if (isEditMode && editingId) {
          await putRequest(`/parcel-type-schedules/${editingId}`, submitData);
        } else {
          await postRequest("/parcel-type-schedules", submitData);
        }
        onSuccess();
      } catch (error) {
        console.error("Error saving parcel type schedule:", error);
      }
    },
  });

  // Fetch all parcel types
  const fetchParcelTypes = async () => {
    try {
      const response = await getRequest("/parcelType");
      setAllParcelTypes(response || []);
    } catch (error) {
      console.error("Error fetching parcel types:", error);
      setAllParcelTypes([]);
    }
  };

  // Fetch existing schedule data for edit mode
  const fetchScheduleById = async () => {
    try {
      const response = await getRequest(`/parcel-type-schedules/${editingId}`);
      formik.setValues({
        name: response.name || "",
      });
      setSelectedParcelTypes(response.selectedParcelTypes || []);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  // Update available parcel types based on selected ones
  useEffect(() => {
    const selectedIds = selectedParcelTypes.map(item => item.id);
    const available = allParcelTypes.filter(item => !selectedIds.includes(item.id));
    setAvailableParcelTypes(available);
  }, [allParcelTypes, selectedParcelTypes]);

  // Filter available items based on search
  const filteredAvailable = availableParcelTypes.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.displayId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await fetchParcelTypes();
      if (isEditMode && editingId) {
        await fetchScheduleById();
      }
      setLoading(false);
    };
    initializeData();
  }, [editingId, isEditMode]);

  const handleAvailableCheck = (id) => {
    setCheckedAvailable(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const handleAddSelected = () => {
    const itemsToAdd = availableParcelTypes.filter(item => 
      checkedAvailable.includes(item.id)
    );
    setSelectedParcelTypes(prev => [...prev, ...itemsToAdd]);
    setCheckedAvailable([]);
    setSearchTerm("")
  };

  const handleRemoveSelected = (id) => {
    setSelectedParcelTypes(prev => prev.filter(item => item.id !== id));
  };

  if (loading) {
    return (
      <Box sx={{ width: "100%", padding: 2, textAlign: "center" }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs sx={{ marginBottom: 2 }}>
        <Link
          underline="hover"
          color="primary"
          onClick={onBack}
          sx={{ cursor: "pointer" }}
        >
          Parcel Type Schedules
        </Link>
        <Typography color="text.primary">
          {isEditMode ? editingId : "New Schedule"}
        </Typography>
      </Breadcrumbs>

      {/* Form Container */}
      <Box
        sx={{
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: 1,
          padding: 3,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={3}
          >
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Parcel Type Schedule
            </Typography>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#1569CB",
                textTransform: "none",
              }}
            >
              Save
            </Button>
          </Box>

          {/* Name Field */}
          <Box marginY={3}>
            <Typography variant="body1" sx={{ marginBottom: 1, fontWeight: 500 }}>
              NAME
            </Typography>
            <TextField
              name="name"
              size="small"
              value={formik.values.name}
              onChange={formik.handleChange}
              fullWidth
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                },
              }}
            />
          </Box>

          {/* Selected Parcel Types Section */}
          {selectedParcelTypes.length > 0 && (
            <Box marginY={3}>
              <TableContainer component={Paper} sx={{ boxShadow: 1, marginBottom: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                      <TableCell sx={{ fontWeight: "bold", width: "60px" }}>Id</TableCell>
                      <TableCell sx={{ fontWeight: "bold", width: "120px" }}>Customizable</TableCell>
                      <TableCell sx={{ fontWeight: "bold", width: "80px" }}>Rank</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Name (EN)</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Name (FR)</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Dimensions</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Weight Type</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Dimensional Factor</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Weight</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Total Unit Factor</TableCell>
                      <TableCell sx={{ fontWeight: "bold", width: "60px" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedParcelTypes.map((item) => { console.log("item",item) 
                    return(
                      <TableRow key={item.id}>
                        <TableCell>{item.displayId}</TableCell>
                        <TableCell>{item.customizable ? "Yes" : "No"}</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>
                          {item.length && item.width && item.height 
                            ? `${item.length} x ${item.width} x ${item.height} ${item.unitOfLength || 'in'}`
                            : '-'
                          }
                        </TableCell>
                        <TableCell>{item.dimensionalWeight ?  "Dimensional":"Actual"}</TableCell>
                        <TableCell>{item.dimensionalFactor || "0.000"}</TableCell>
                        <TableCell>{item.weight ? `${item.weight} lbs` : "0 lbs"}</TableCell>
                        <TableCell>{item.totalUnitFactor || "0.000"}</TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveSelected(item.id)}
                            sx={{ color: "#1569CB" }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )})}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* Available Parcel Types Section */}
          {filteredAvailable.length > 0 && (
            <Box marginY={3}>
              <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 500 }}>
                Available
              </Typography>
              
              {/* Search Box */}
              <Box sx={{ display: "flex", gap: 2, marginBottom: 2, alignItems: "center" }}>
                <TextField
                  size="small"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ width: 200 }}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ color: "#666", marginRight: 1 }} />,
                  }}
                />
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleAddSelected}
                  disabled={checkedAvailable.length === 0}
                  sx={{ textTransform: "none" }}
                >
                  Add
                </Button>
              </Box>

              <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                      <TableCell sx={{ width: "50px" }}></TableCell>
                      <TableCell sx={{ fontWeight: "bold", width: "60px" }}>Id</TableCell>
                      <TableCell sx={{ fontWeight: "bold", width: "120px" }}>Customizable</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Name (EN)</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Name (FR)</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Dimensions</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Weight Type</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Dimensional Factor</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Weight</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Total Unit Factor</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredAvailable.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Checkbox
                            checked={checkedAvailable.includes(item.id)}
                            onChange={() => handleAvailableCheck(item.id)}
                            size="small"
                          />
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
                            {item.displayId}
                          </Typography>
                        </TableCell>
                        <TableCell>{item.customizable ? "Yes" : "No"}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>
                          {item.length && item.width && item.height 
                            ? `${item.length}×${item.width}×${item.height} ${item.unitOfLength || 'in'}`
                            : '-'
                          }
                        </TableCell>
                        <TableCell>{item.dimensionalWeight ? "Dimensional" : "Actual"}</TableCell>
                        <TableCell>{item.dimensionalFactor || "0.000"}</TableCell>
                        <TableCell>{item.weight ? `${item.weight} lbs` : "0 lbs"}</TableCell>
                        <TableCell>{item.totalUnitFactor || "0.000"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default ParcelTypeScheduleForm;