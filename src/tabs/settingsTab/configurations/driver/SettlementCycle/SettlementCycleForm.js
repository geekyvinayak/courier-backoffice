import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Box, Typography } from "@mui/material";
import { postRequest, getRequest, putRequest, deleteRequest } from "../../../../../consts/apiCalls";
import { DeleteDialog } from "../../../../../components/deleteDialog";
import Breadcrumb from "../../../../../components/Breadcrumb";
import useToast from "../../../../../components/toast/useToast";
import { CircularProgress } from "@mui/material";
const SettlementCycleForm = ({ editingId, isEditMode, onBack, onSuccess }) => {
  const { showSuccess, showError } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      descriptionEn: "",
    },
    validationSchema: Yup.object({
      descriptionEn: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (isEditMode && editingId) {
          await putRequest(`/settlement-cycles/${editingId}`, values);
          showSuccess("Settlement Cycles updated successfully");
        } else {
          await postRequest("/settlement-cycles", values);
          showSuccess("Settlement Cycles created successfully");
        }
        onSuccess();
      } catch (error) {
        showError("Something went wrong while saving the Settlement Cycles");
        console.error("Save error:", error);
      }
    },
  });

  const fetchSettlementCyclesById = async () => {
    setIsLoading(true);
    try {
      const response = await getRequest(`/settlement-cycles/${editingId}`);
      formik.setValues({
        descriptionEn: response.descriptionEn || "",
      });
    } catch (error) {
      showError("Failed to load Settlement Cycles");
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isEditMode && editingId) {
      fetchSettlementCyclesById();
    }
  }, [editingId, isEditMode]);

  return (
    <Box className="w-[90%] ">
      <Breadcrumb
        items={[
          { label: "Settlement Cycle", onClick: onBack },
          {
            label: isEditMode ? `Settlement Cycle '${editingId}'` : "New Settlement Cycle",
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
              Settlement Cycle
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
                name="descriptionEn"
                size="small"
                value={formik.values.descriptionEn}
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
          )}
        </form>
      </Box>
    </Box>
  );
};

export default SettlementCycleForm;
