import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { postRequest, getRequest, putRequest } from "../../../../../consts/apiCalls";
import Breadcrumb from "../../../../../components/Breadcrumb";
import useToast from "../../../../../components/toast/useToast";

const TaxScheduleForm = ({ editingId, isEditMode, onBack, onSuccess }) => {
  const { showSuccess, showError } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      displayId: "",
      codes: "",
      noOverride: false,
      taxDetailsList: [],
    },
    validationSchema: Yup.object({
      displayId: Yup.string().required("ID is required"),
      codes: Yup.string(),
      noOverride: Yup.boolean(),
      taxDetailsList: Yup.array().of(
        Yup.object({
          displayId: Yup.string().required("Tax ID is required"),
          name: Yup.string().required("Name is required"),
          invoiceDisplayOrder: Yup.number().required("Invoice Display Order is required"),
          taxRate: Yup.number().required("Tax Rate is required"),
          taxNumber: Yup.string(),
        })
      ),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          ...values,
          id: isEditMode ? editingId : 0,
        };

        if (isEditMode && editingId) {
          await putRequest(`/tax-schedule/${editingId}`, payload);
          showSuccess("Tax Schedule updated successfully");
        } else {
          await postRequest("/tax-schedule", payload);
          showSuccess("Tax Schedule created successfully");
        }
        onSuccess();
      } catch (error) {
        showError("Something went wrong while saving the Tax Schedule");
        console.error("Save error:", error);
      }
    },
  });

  const fetchTaxScheduleById = async () => {
    setIsLoading(true);
    try {
      const response = await getRequest(`/tax-schedule/${editingId}`);
      formik.setValues({
        displayId: response.displayId || "",
        codes: response.codes || "",
        noOverride: response.noOverride || false,
        taxDetailsList: response.taxDetailsList || [],
      });
    } catch (error) {
      showError("Failed to load Tax Schedule");
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isEditMode && editingId) {
      fetchTaxScheduleById();
    }
  }, [editingId, isEditMode]);

  const handleAddTax = () => {
    const newTax = {
      id: 0,
      displayId: "",
      name: "",
      invoiceDisplayOrder: 0,
      taxRate: 0,
      taxNumber: "",
    };
    formik.setFieldValue("taxDetailsList", [...formik.values.taxDetailsList, newTax]);
  };

  const handleRemoveTax = (index) => {
    const updatedList = formik.values.taxDetailsList.filter((_, i) => i !== index);
    formik.setFieldValue("taxDetailsList", updatedList);
  };

  const handleTaxDetailChange = (index, field, value) => {
    const updatedList = [...formik.values.taxDetailsList];
    updatedList[index][field] = value;
    formik.setFieldValue("taxDetailsList", updatedList);
  };

  const getTaxDetailError = (index, field) => {
    return (
      formik.touched.taxDetailsList?.[index]?.[field] &&
      formik.errors.taxDetailsList?.[index]?.[field]
    );
  };

  return (
    <Box className="w-[90%]">
      <Breadcrumb
        items={[
          { label: "Tax Schedule", onClick: onBack },
          {
            label: isEditMode ? `Tax Schedule '${editingId}'` : "New Tax Schedule",
          },
        ]}
      />

      <Box
        sx={{
          marginTop: "8px",
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: 1,
          padding: 3,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={3}>
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              Tax Schedule
            </Typography>
            <Box display="flex" gap={1}>
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
          </Box>

          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Box marginY={3}>
                <Typography variant="body1" sx={{ marginBottom: 1, fontWeight: 500 }}>
                  ID
                </Typography>
                <TextField
                  name="displayId"
                  size="small"
                  value={formik.values.displayId}
                  onChange={formik.handleChange}
                  fullWidth
                  onBlur={formik.handleBlur}
                  error={formik.touched.displayId && Boolean(formik.errors.displayId)}
                  helperText={formik.touched.displayId && formik.errors.displayId}
                  FormHelperTextProps={{ sx: { marginLeft: 0 } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                />
              </Box>

              <Box marginY={3}>
                <Typography variant="body1" sx={{ marginBottom: 1, fontWeight: 500 }}>
                  CODES
                </Typography>
                <TextField
                  name="codes"
                  size="small"
                  value={formik.values.codes}
                  onChange={formik.handleChange}
                  fullWidth
                  onBlur={formik.handleBlur}
                  error={formik.touched.codes && Boolean(formik.errors.codes)}
                  helperText={formik.touched.codes && formik.errors.codes}
                  FormHelperTextProps={{ sx: { marginLeft: 0 } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                    },
                  }}
                />
              </Box>

              <Box marginY={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="noOverride"
                      checked={formik.values.noOverride}
                      onChange={formik.handleChange}
                    />
                  }
                  label="No Override"
                />
              </Box>

              <Box marginY={3}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddTax}
                  sx={{ textTransform: "none", marginBottom: 2 }}
                >
                  Add Tax
                </Button>

                {formik.values.taxDetailsList.length > 0 && (
                  <TableContainer component={Paper} sx={{ border: "1px solid #e0e0e0" }}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Id <span style={{ color: "red" }}>*</span>
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Name <span style={{ color: "red" }}>*</span>
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Invoice Display Order</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Tax Rate (%)</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Tax Number</TableCell>
                          <TableCell sx={{ fontWeight: "bold", width: 80 }}></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {formik.values.taxDetailsList.map((tax, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <TextField
                                size="small"
                                value={tax.displayId}
                                onChange={(e) =>
                                  handleTaxDetailChange(index, "displayId", e.target.value)
                                }
                                onBlur={() =>
                                  formik.setFieldTouched(`taxDetailsList[${index}].displayId`)
                                }
                                error={Boolean(getTaxDetailError(index, "displayId"))}
                                helperText={getTaxDetailError(index, "displayId")}
                                required
                                fullWidth
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                size="small"
                                value={tax.name}
                                onChange={(e) =>
                                  handleTaxDetailChange(index, "name", e.target.value)
                                }
                                onBlur={() =>
                                  formik.setFieldTouched(`taxDetailsList[${index}].name`)
                                }
                                error={Boolean(getTaxDetailError(index, "name"))}
                                helperText={getTaxDetailError(index, "name")}
                                required
                                fullWidth
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                size="small"
                                type="number"
                                value={tax.invoiceDisplayOrder}
                                onChange={(e) =>
                                  handleTaxDetailChange(
                                    index,
                                    "invoiceDisplayOrder",
                                    parseInt(e.target.value) || 0
                                  )
                                }
                                fullWidth
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                size="small"
                                type="number"
                                value={tax.taxRate}
                                onChange={(e) =>
                                  handleTaxDetailChange(
                                    index,
                                    "taxRate",
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                fullWidth
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                size="small"
                                value={tax.taxNumber}
                                onChange={(e) =>
                                  handleTaxDetailChange(index, "taxNumber", e.target.value)
                                }
                                fullWidth
                              />
                            </TableCell>
                            <TableCell>
                              <IconButton
                                color="error"
                                onClick={() => handleRemoveTax(index)}
                                size="small"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            </>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default TaxScheduleForm;