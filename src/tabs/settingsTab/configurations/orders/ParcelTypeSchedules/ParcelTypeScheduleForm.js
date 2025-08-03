// ParcelTypeScheduleForm.js
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
  CircularProgress,
} from "@mui/material";
import { Delete as DeleteIcon, Search as SearchIcon, Add as AddIcon } from "@mui/icons-material";
import { postRequest, getRequest, putRequest } from "../../../../../consts/apiCalls";
import Breadcrumb from "../../../../../components/Breadcrumb";
import useToast from "../../../../../components/toast/useToast";

const ParcelTypeScheduleForm = ({ editingId, isEditMode, onBack, onSuccess }) => {
  const { showSuccess, showError } = useToast();
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
      if (selectedParcelTypes.length == 0) {
        showError("Alteast 1 Type is required");
        return;
      }
      try {
        const submitData = {
          name: values.name,
          selectedParcelTypes,
          default: false,
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

  const fetchParcelTypes = async () => {
    try {
      const response = await getRequest("/parcelType");
      setAllParcelTypes(response || []);
    } catch (error) {
      console.error("Error fetching parcel types:", error);
      setAllParcelTypes([]);
    }
  };

  const fetchScheduleById = async () => {
    try {
      const response = await getRequest(`/parcel-type-schedules/${editingId}`);
      formik.setValues({ name: response.name || "" });
      setSelectedParcelTypes(response.selectedParcelTypes || []);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  useEffect(() => {
    const selectedIds = selectedParcelTypes.map((item) => item.id);
    const available = allParcelTypes.filter((item) => !selectedIds.includes(item.id));
    setAvailableParcelTypes(available);
  }, [allParcelTypes, selectedParcelTypes]);

  const filteredAvailable = availableParcelTypes.filter(
    (item) =>
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
    setCheckedAvailable((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleAddSelected = () => {
    const itemsToAdd = availableParcelTypes.filter((item) => checkedAvailable.includes(item.id));
    setSelectedParcelTypes((prev) => [...prev, ...itemsToAdd]);
    setCheckedAvailable([]);
    setSearchTerm("");
  };

  const handleRemoveSelected = (id) => {
    setSelectedParcelTypes((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box marginBottom={1}>
        <Breadcrumb
          items={[
            { label: "Parcel Type Schedules", onClick: onBack },
            {
              label: isEditMode ? formik.values.name : "New Schedule",
            },
          ]}
        />
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          padding: 3,
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
          marginBottom: 5,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Parcel Type Schedule
            </Typography>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                textTransform: "none",
                borderRadius: 1,
                paddingX: 3,
                paddingY: 1,
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Save
            </Button>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" height="80px">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Box mb={3}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                    },
                  }}
                />
              </Box>

              {/* Selected Table */}
              {selectedParcelTypes.length > 0 && (
                <Box mb={3}>
                  <TableContainer component={Paper} sx={{ boxShadow: 1, border: "1px solid #ddd" }}>
                    <Table
                      size="small"
                      sx={{
                        "& th": { backgroundColor: "#f0f4f8", fontWeight: 600 },
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Id</TableCell>
                          <TableCell>Customizable</TableCell>
                          <TableCell>Rank</TableCell>
                          <TableCell>Name (EN)</TableCell>
                          <TableCell>Name (FR)</TableCell>
                          <TableCell>Dimensions</TableCell>
                          <TableCell>Weight Type</TableCell>
                          <TableCell>Dimensional Factor</TableCell>
                          <TableCell>Weight</TableCell>
                          <TableCell>Total Unit Factor</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedParcelTypes.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <Typography
                                sx={{
                                  color: "#1976d2",
                                  textDecoration: "underline",
                                  cursor: "pointer",
                                  fontWeight: 500,
                                }}
                              >
                                {item.displayId}
                              </Typography>
                            </TableCell>
                            <TableCell>{item.customizable ? "Yes" : "No"}</TableCell>
                            <TableCell>-</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>-</TableCell>
                            <TableCell>
                              {item.length && item.width && item.height
                                ? `${item.length} x ${item.width} x ${item.height} ${item.unitOfLength || "in"}`
                                : "-"}
                            </TableCell>
                            <TableCell>
                              {item.dimensionalWeight ? "Dimensional" : "Actual"}
                            </TableCell>
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
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {/* Available Table */}
              {filteredAvailable.length > 0 && (
                <Box mb={3}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Available
                  </Typography>

                  <Box display="flex" gap={2} mb={2} alignItems="center">
                    <TextField
                      size="small"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      sx={{
                        width: 200,
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "white",
                          borderRadius: 1,
                        },
                      }}
                      InputProps={{
                        startAdornment: <SearchIcon sx={{ color: "#888", mr: 1 }} />,
                      }}
                    />
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<AddIcon />}
                      onClick={handleAddSelected}
                      disabled={checkedAvailable.length === 0}
                      sx={{ textTransform: "none", fontWeight: 500 }}
                    >
                      Add
                    </Button>
                  </Box>

                  <TableContainer component={Paper} sx={{ boxShadow: 1, border: "1px solid #ddd" }}>
                    <Table
                      size="small"
                      sx={{
                        "& th": { backgroundColor: "#f0f4f8", fontWeight: 600 },
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell>Id</TableCell>
                          <TableCell>Customizable</TableCell>
                          <TableCell>Name (EN)</TableCell>
                          <TableCell>Name (FR)</TableCell>
                          <TableCell>Dimensions</TableCell>
                          <TableCell>Weight Type</TableCell>
                          <TableCell>Dimensional Factor</TableCell>
                          <TableCell>Weight</TableCell>
                          <TableCell>Total Unit Factor</TableCell>
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
                                sx={{
                                  color: "#1976d2",
                                  textDecoration: "underline",
                                  cursor: "pointer",
                                  fontWeight: 500,
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
                                ? `${item.length}×${item.width}×${item.height} ${item.unitOfLength || "in"}`
                                : "-"}
                            </TableCell>
                            <TableCell>
                              {item.dimensionalWeight ? "Dimensional" : "Actual"}
                            </TableCell>
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
            </>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default ParcelTypeScheduleForm;
