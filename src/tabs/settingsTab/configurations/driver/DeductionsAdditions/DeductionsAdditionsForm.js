import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
} from "@mui/material";
import { postRequest, getRequest, putRequest, deleteRequest } from "../../../../../consts/apiCalls";
import { DeleteDialog } from "../../../../../components/deleteDialog";
import Breadcrumb from "../../../../../components/Breadcrumb";
import useToast from "../../../../../components/toast/useToast";
import { CircularProgress } from "@mui/material";

const DeductionsAdditionsForm = ({ editingId, isEditMode, onBack, onSuccess }) => {
  const { showSuccess, showError } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      unit: "",
      amount: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      type: Yup.string().required("Type is required"),
      unit: Yup.string().required("Unit is required"),
      amount: Yup.number().required("Amount is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (isEditMode && editingId) {
          await putRequest(`/deduction-additions/${editingId}`, values);
          showSuccess("Deduction Additions updated successfully");
        } else {
          await postRequest("/deduction-additions", values);
          showSuccess("Deduction Additions created successfully");
        }
        onSuccess();
      } catch (error) {
        showError("Something went wrong while saving the Deduction Additions");
        console.error("Save error:", error);
      }
    },
  });

  const fetchDeductionAdditionsById = async () => {
    setIsLoading(true);
    try {
      const response = await getRequest(`/deduction-additions/${editingId}`);
      formik.setValues({
        name: response.name || "",
        type: response.type || "",
        unit: response.unit || "",
        amount: response.amount || 0,
      });
    } catch (error) {
      showError("Failed to load Deduction Additions");
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRequest(`/deduction-additions/${editingId}`);
      showSuccess("Deduction Additions deleted successfully");
      onSuccess();
    } catch (error) {
      showError("Failed to delete Deduction Additions");
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    if (isEditMode && editingId) {
      fetchDeductionAdditionsById();
    }
  }, [editingId, isEditMode]);

  return (
    <Box className="w-[90%] ">
      <Breadcrumb
        items={[
          { label: "Deduction/Addition", onClick: onBack },
          {
            label: isEditMode ? `Deduction/Addition '${editingId}'` : "New Deduction/Addition",
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
              Deduction/Addition
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
              {isEditMode && (
                <DeleteDialog
                  handleDelete={handleDelete}
                  trigger={
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#d32f2f !important",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#9a0007",
                        },
                      }}
                    >
                      Delete
                    </Button>
                  }
                />
              )}
            </Box>
          </Box>

          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="80px">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Box marginY={3}>
                <Typography variant="body1" sx={{ marginBottom: 1, fontWeight: 500 }}>
                  Name
                </Typography>
                <TextField
                  name="name"
                  size="small"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  fullWidth
                  onBlur={formik.handleBlur}
                  error={formik.touched.text && Boolean(formik.errors.text)}
                  helperText={formik.touched.text && formik.errors.text}
                  FormHelperTextProps={{ sx: { marginLeft: 0 } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                    },
                  }}
                />
              </Box>
              <Box marginY={3}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Type</FormLabel>
                  <RadioGroup
                    row
                    name="type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel value="ADDITION" control={<Radio />} label="Addition" />
                    <FormControlLabel value="DEDUCTION" control={<Radio />} label="Deduction" />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box marginY={3}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Unit</FormLabel>
                  <RadioGroup
                    row
                    name="unit"
                    value={formik.values.unit}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel value="PERCENTAGE" control={<Radio />} label="%" />
                    <FormControlLabel value="DOLLAR" control={<Radio />} label="$" />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box marginY={3}>
                <Typography variant="body1" gutterBottom>
                  Amount
                </Typography>
                <TextField
                  name="amount"
                  type="number"
                  size="small"
                  fullWidth
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  sx={{ marginBottom: 2 }}
                />
              </Box>
            </>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default DeductionsAdditionsForm;
