import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Box, Typography } from "@mui/material";
import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest,
} from "../../../../../consts/apiCalls";
import { DeleteDialog } from "../../../../../components/deleteDialog";
import Breadcrumb from "../../../../../components/Breadcrumb";
import useToast from "../../../../../components/toast/useToast";
import { CircularProgress } from "@mui/material";
const CreateUpdateHoldReasonTemplate = ({
  editingId,
  isEditMode,
  onBack,
  onSuccess,
}) => {
  const { showSuccess, showError } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: Yup.object({
      text: Yup.string().required("TEXT (EN) is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (isEditMode && editingId) {
          await putRequest(`/holdReasonTemplates/${editingId}`, values);
          showSuccess("Hold Reason Template updated successfully");
        } else {
          await postRequest("/holdReasonTemplates", values);
          showSuccess("Hold Reason Template created successfully");
        }
        onSuccess();
      } catch (error) {
        showError("Something went wrong while saving the Hold Reason Template");
        console.error("Save error:", error);
      }
    },
  });

  const fetchHoldReasonById = async () => {
    setIsLoading(true);
    try {
      const response = await getRequest(`/holdReasonTemplates/${editingId}`);
      formik.setValues({
        text: response.text || "",
      });
    } catch (error) {
      showError("Failed to load Hold Reason Template");
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRequest(`/holdReasonTemplates/${editingId}`);
      showSuccess("Hold Reason Template deleted successfully");
      onSuccess();
    } catch (error) {
      showError("Failed to delete Hold Reason Template");
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    if (isEditMode && editingId) {
      fetchHoldReasonById();
    }
  }, [editingId, isEditMode]);

  return (
    <Box className="w-[90%] ">
      <Breadcrumb
        items={[
          { label: "Hold Reasons", onClick: onBack },
          {
            label: isEditMode
              ? `Hold Reason Template '${editingId}'`
              : "New Hold Reason Template",
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={3}
          >
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              Hold Reason Template
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
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="80px"
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box marginY={3}>
              <Typography
                variant="body1"
                sx={{ marginBottom: 1, fontWeight: 500 }}
              >
                TEXT (EN)
              </Typography>
              <TextField
                name="text"
                size="small"
                value={formik.values.text}
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

export default CreateUpdateHoldReasonTemplate;
