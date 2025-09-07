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
  const [rankErrors, setRankErrors] = useState({});
  console.log("selectedParcelTypesselectedParcelTypes",)
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

      // Validate ranks
      const rankValidation = validateRanks();
      if (!rankValidation.isValid) {
        showError(rankValidation.message);
        return;
      }
        console.log("selectedParcelTypes",selectedParcelTypes)
      try {
        const submitData = {
          name: values.name,
          id:editingId,
          selectedParcelTypes: selectedParcelTypes.map((item, index) => ({
            ...item,
            parcelTypeId: item.id,
            rank: item.rank || 1,
            id:undefined
          })),
          default: false,
        };
        console.log("submitData",submitData);
        // return;
        if (isEditMode && editingId) {
          await putRequest(`/parcel-type-schedules/${editingId}`, submitData);
        } else {
          await postRequest("/parcel-type-schedules", submitData);
        }
        onSuccess();
      } catch (error) {
        console.erro("Error saving parcel type schedule:", error);
      }
    },
  });

  const validateRanks = () => {
    const ranks = selectedParcelTypes
      .map((item) => item.rank)
      .filter((rank) => rank !== undefined && rank !== null);
    const uniqueRanks = new Set(ranks);

    if (ranks.length !== uniqueRanks.size) {
      return { isValid: false, message: "Each parcel type must have a unique rank" };
    }

    const invalidRanks = ranks.filter((rank) => rank < 1 || rank > selectedParcelTypes.length);
    if (invalidRanks.length > 0) {
      return {
        isValid: false,
        message: `Ranks must be between 1 and ${selectedParcelTypes.length}`,
      };
    }

    return { isValid: true };
  };

  const handleRankChange = (itemId, newRank) => {
    const rankValue = parseInt(newRank) || null;
    console.log("brfire after reank changed",selectedParcelTypes,itemId)
    // Update the selected parcel types
   const updatedParcelTypes = selectedParcelTypes.map((item) => {
    return item.id === itemId ? { ...item, rank: rankValue } : item;
});

    console.log("updatedParcelTypes",updatedParcelTypes)

    setSelectedParcelTypes(updatedParcelTypes);

    // Validate all ranks for duplicates after the update
    const newRankErrors = {};

    updatedParcelTypes.forEach((item) => {
      if (item.rank) {
        const duplicateCount = updatedParcelTypes.filter(
          (otherItem) => otherItem.rank === item.rank
        ).length;

        if (duplicateCount > 1) {
          newRankErrors[item.id] = "Rank already exists";
        }
      }
    });

    setRankErrors(newRankErrors);
  };

  const fetchParcelTypes = async () => {
    try {
      const response = await getRequest("/parcelType");
      console.log("responseresponse",response)
      setAllParcelTypes(response || []);
    } catch (error) {
      console.error("Error fetching parcel types:", error);
      setAllParcelTypes([]);
    }
  };

  const fetchScheduleById = async () => {
  try {
    const response = await getRequest(`/parcel-type-schedules/${editingId}`);
    
    // Set formik name
    formik.setValues({ name: response.name || "" });

    // Normalize parcel types
    const selectedWithRanks = (response.selectedParcelTypes || []).map(
      ({ parcelTypeId, ...rest }) => ({
        ...rest,
        id: rest.id ?? parcelTypeId,   // use existing id, else parcelTypeId
        rank: rest.rank || null,       // ensure rank always exists
      })
    );

    setSelectedParcelTypes(selectedWithRanks);
  } catch (error) {
    console.error("Error fetching schedule:", error);
  }
};


  useEffect(() => {
    const selectedIds = selectedParcelTypes.map((item) => item.id);
    const available = allParcelTypes.filter((item) => !selectedIds.includes(item.id));
    console.log('selectedParcelTypes',selectedParcelTypes,"====","selectedIds-->",selectedIds,"//available-->",available)
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

    // Add items with default rank (next available number)
    const maxRank = Math.max(...selectedParcelTypes.map((item) => item.rank || 0), 0);
    const itemsWithRanks = itemsToAdd.map((item, index) => ({
      ...item,
      rank: maxRank + index + 1,
    }));

    setSelectedParcelTypes((prev) => [...prev, ...itemsWithRanks]);
    setCheckedAvailable([]);
    setSearchTerm("");
  };

  const handleRemoveSelected = (id) => {
    setSelectedParcelTypes((prev) => prev.filter((item) => item.id !== id));
    // Clear any rank errors for the removed item
    setRankErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
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
                          {/* <TableCell>Name (FR)</TableCell> */}
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
                            <TableCell>
                              <TextField
                                type="number"
                                size="small"
                                value={item.rank || ""}
                                onChange={(e) => handleRankChange(item.id, e.target.value)}
                                inputProps={{
                                  min: 1,
                                  max: selectedParcelTypes.length,
                                  style: { textAlign: "center" },
                                }}
                                error={Boolean(rankErrors[item.id])}
                                helperText={rankErrors[item.id]}
                                sx={{
                                  width: "80px",
                                  "& .MuiOutlinedInput-root": {
                                    backgroundColor: "white",
                                  },
                                  "& .MuiFormHelperText-root": {
                                    fontSize: "0.75rem",
                                    whiteSpace: "nowrap",
                                  },
                                }}
                              />
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            {/* <TableCell>-</TableCell> */}
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
