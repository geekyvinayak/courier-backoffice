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

const DocumentsForm = ({
  editingId,
  isEditMode,
  onBack,
  onSuccess,
}) => {
  const { showSuccess, showError } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      displayId: "",
      name: "",
    },
    validationSchema: Yup.object({
      displayId: Yup.string().required("Display Id is required"),
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (isEditMode && editingId) {
          await putRequest(`/documents/${editingId}`, values);
          showSuccess("Documents updated successfully");
        } else {
          await postRequest("/documents", values);
          showSuccess("Document created successfully");
        }
        onSuccess();
      } catch (error) {
        showError(error.response.data.message??"Something went wrong while saving the Document");
        console.error("Save error:", error);
      }
    },
  });

  const fetchDocumentById = async () => {
    setIsLoading(true);
    try {
      const response = await getRequest(`/documents/${editingId}`);
      formik.setValues({
          displayId: response.displayId || "",
        name: response.name || "",
      });
    } catch (error) {
      showError("Failed to load Document");
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRequest(`/documents/${editingId}`);
      showSuccess("Document deleted successfully");
      onSuccess();
    } catch (error) {
      showError("Failed to delete Document");
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    if (isEditMode && editingId) {
      fetchDocumentById();
    }
  }, [editingId, isEditMode]);

  return (
    <Box className="w-[90%] ">
      <Breadcrumb
        items={[
          { label: "Documents", onClick: onBack },
          {
            label: isEditMode
              ? `Document '${editingId}'`
              : "New Document",
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
            Document
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
            <>
              <Box marginY={3}>
                <Typography
                  variant="body1"
                  sx={{ marginBottom: 1, fontWeight: 500 }}
                >
                  ID
                </Typography>
                <TextField
                  name="displayId"
                  size="small"
                  disabled={isEditMode}
                  value={formik.values.displayId}
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
                <Typography
                  variant="body1"
                  sx={{ marginBottom: 1, fontWeight: 500 }}
                >
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
            </>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default DocumentsForm;
