import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Box, Typography, CircularProgress } from "@mui/material";
import { postRequest, getRequest, putRequest } from "../../../../../consts/apiCalls";
import Breadcrumb from "../../../../../components/Breadcrumb";
import useToast from "../../../../../components/toast/useToast";

const BillingCycleForm = ({ editingId, isEditMode, onBack, onSuccess }) => {
  const { showSuccess, showError } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (isEditMode && editingId) {
          await putRequest(`/billingCycle/${editingId}`, values);
          showSuccess("Billing Cycle updated successfully");
        } else {
          await postRequest("/billingCycle", values);
          showSuccess("Billing Cycle created successfully");
        }
        onSuccess();
      } catch (error) {
        showError("Something went wrong while saving the Billing Cycle");
        console.error("Save error:", error);
      }
    },
  });

  const fetchBillingCycleById = async () => {
    setIsLoading(true);
    try {
      const response = await getRequest(`/billingCycle/${editingId}`);
      formik.setValues({
        description: response.description || "",
      });
    } catch (error) {
      showError("Failed to load Billing Cycle");
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isEditMode && editingId) {
      fetchBillingCycleById();
    }
  }, [editingId, isEditMode]);

  return (
    <Box className="w-[90%]">
      <Breadcrumb
        items={[
          { label: "Billing Cycle", onClick: onBack },
          {
            label: isEditMode ? `Billing Cycle '${editingId}'` : "New Billing Cycle",
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
              Billing Cycle
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
            <Box display="flex" justifyContent="center" alignItems="center" height="80px">
              <CircularProgress />
            </Box>
          ) : (
            <Box marginY={3}>
              <Typography variant="body1" sx={{ marginBottom: 1, fontWeight: 500 }}>
                Description
              </Typography>
              <TextField
                name="description"
                size="small"
                value={formik.values.description}
                onChange={formik.handleChange}
                fullWidth
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                FormHelperTextProps={{ sx: { marginLeft: 0 } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
                  },
                }}
              />
            </Box>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default BillingCycleForm;