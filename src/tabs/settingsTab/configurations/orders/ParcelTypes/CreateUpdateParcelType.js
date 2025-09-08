import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  MenuItem,
  CircularProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postRequest, getRequest, putRequest, deleteRequest } from "../../../../../consts/apiCalls";
import { DeleteDialog } from "../../../../../components/deleteDialog";
import Breadcrumb from "../../../../../components/Breadcrumb";
import useToast from "../../../../../components/toast/useToast";
import { InfoRounded } from "@mui/icons-material";

const CreateUpdateParcelType = ({ editingId, isEditMode, onBack, onSuccess }) => {
  const { showSuccess, showError } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      displayId: "",
      name: "",
      nameFr: "",
      systemOfMeasurement: "Imperial",
      customizable: false,
      unitOfLength: "Inches",
      length: 0,
      width: 0,
      height: 0,
      dimensionalWeight: false,
      dimensionalFactor: 0,
      weight: 0,
      totalUnitFactor: 0,
    },
    validationSchema: Yup.object({
      displayId: Yup.string().required("ID is required"),
      name: Yup.string().required("Name (EN) is required"),
      systemOfMeasurement: Yup.string().required("System of Measurement is required"),
      unitOfLength: Yup.string().required("Unit of Length is required"),
    }),
    onSubmit: async (values) => {
      try {
        const dto = { ...values };
        delete dto.nameFr; // Not part of DTO if not handled

        if (isEditMode && editingId) {
          await putRequest(`/parcelType/${editingId}`, dto);
          showSuccess("Parcel Type updated successfully");
        } else {
          await postRequest("/parcelType", dto);
          showSuccess("Parcel Type created successfully");
        }

        onSuccess();
      } catch (error) {
        showError("Something went wrong while saving the Parcel Type");
        console.error("Save error:", error);
      }
    },
  });

  const fetchParcelTypeById = async () => {
    setIsLoading(true);
    try {
      const response = await getRequest(`/parcelType/${editingId}`);
      formik.setValues({
        ...response,
        nameFr: response.nameFr || "",
      });
    } catch (error) {
      showError("Failed to load Parcel Type");
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRequest(`/parcelType/${editingId}`);
      showSuccess("Parcel Type deleted successfully");
      onSuccess();
    } catch (error) {
      showError("Failed to delete Parcel Type");
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    if (formik.values.dimensionalWeight) {
      formik.setFieldValue("weight", 0);
    } else {
      formik.setFieldValue("dimensionalFactor", 0);
    }
  }, [formik.values.dimensionalWeight]);

  useEffect(() => {
    if (isEditMode && editingId) {
      fetchParcelTypeById();
    }
  }, [editingId, isEditMode]);

  return (
    <Box className="w-[90%]">
      <Breadcrumb
        items={[
          { label: "Parcel Types", onClick: onBack },
          {
            label: isEditMode ? ` ${formik.values.displayId}` : "New Parcel Type",
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
              Parcel Type
            </Typography>
            <Box display="flex" gap={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ backgroundColor: "#1569CB", textTransform: "none" }}
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
                        "&:hover": { backgroundColor: "#9a0007" },
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
            <Box display="flex" justifyContent="center" height="80px">
              <CircularProgress />
            </Box>
          ) : (
            <Box display="flex" gap={4} flexWrap="wrap">
              {/* Information */}
              <Box flex={1} minWidth="250px">
                <Typography fontWeight={500} marginBottom={1}>
                  Information
                </Typography>
                <Box flex="1">
                  <Typography variant="body1" gutterBottom>
                    ID
                  </Typography>
                  <TextField
                    name="displayId"
                    size="small"
                    fullWidth
                    value={formik.values.displayId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.displayId && Boolean(formik.errors.displayId)}
                    helperText={formik.touched.displayId && formik.errors.displayId}
                    sx={{ marginBottom: 2 }}
                  />
                </Box>
                <Box flex="1">
                  <Typography variant="body1" gutterBottom>
                    Name (EN)
                  </Typography>
                  <TextField
                    name="name"
                    size="small"
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    sx={{ marginBottom: 2 }}
                  />
                </Box>
                <Box flex="1">
                  <Typography variant="body1" gutterBottom>
                    Name (FR)
                  </Typography>
                  <TextField
                    name="nameFr"
                    size="small"
                    fullWidth
                    value={formik.values.nameFr}
                    onChange={formik.handleChange}
                    sx={{ marginBottom: 2 }}
                  />
                </Box>
                <Box flex="1">
                  <Typography variant="body1" gutterBottom>
                    System of Measurement
                  </Typography>
                  <TextField
                    name="systemOfMeasurement"
                    size="small"
                    select
                    fullWidth
                    value={formik.values.systemOfMeasurement}
                    onChange={formik.handleChange}
                    sx={{ marginBottom: 2 }}
                  >
                    <MenuItem value="Imperial">Imperial</MenuItem>
                    <MenuItem value="Metric">Metric</MenuItem>
                  </TextField>
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="customizable"
                      checked={formik.values.customizable}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Customizable"
                />
                <Tooltip title="Allows the dimension to be customized on an order parcel.">
                  <IconButton>
                    <InfoRounded fontSize="small" className="text-[#3e4396]" />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Dimensions */}
              <Box flex={1} minWidth="250px">
                <Typography fontWeight={500} marginBottom={1}>
                  Dimensions
                </Typography>
                <Box flex="1">
                  <Typography variant="body1" gutterBottom>
                    Unit of Length
                  </Typography>
                  <TextField
                    name="unitOfLength"
                    size="small"
                    select
                    fullWidth
                    value={formik.values.unitOfLength}
                    onChange={formik.handleChange}
                    sx={{ marginBottom: 2 }}
                  >
                    <MenuItem value="inches">Inches</MenuItem>
                    <MenuItem value="feet">Feet</MenuItem>
                  </TextField>
                </Box>
                <Box display={"flex"} textAlign={"center"} gap={5}>
                  <Box>
                    <Typography variant="body1" gutterBottom>
                      Length
                    </Typography>
                    <TextField
                      name="length"
                      type="number"
                      size="small"
                      fullWidth
                      value={formik.values.length}
                      onChange={formik.handleChange}
                      sx={{ marginBottom: 2 }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body1" gutterBottom>
                      Width
                    </Typography>
                    <TextField
                      name="width"
                      type="number"
                      size="small"
                      fullWidth
                      value={formik.values.width}
                      onChange={formik.handleChange}
                      sx={{ marginBottom: 2 }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body1" gutterBottom>
                      Height
                    </Typography>
                    <TextField
                      name="height"
                      type="number"
                      size="small"
                      fullWidth
                      value={formik.values.height}
                      onChange={formik.handleChange}
                      sx={{ marginBottom: 2 }}
                    />
                  </Box>
                </Box>
              </Box>

              {/* Weight */}
              <Box flex={1} minWidth="250px">
                <Typography fontWeight={500} marginBottom={1}>
                  Weight
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="dimensionalWeight"
                      checked={formik.values.dimensionalWeight}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Is Dimensional Weight"
                />
                <Tooltip title="Dimensional weight is used as the minimum weight and is calculated from the dimension and the dimensional factor.">
                  <IconButton>
                    <InfoRounded fontSize="small" className="text-[#3e4396]" />
                  </IconButton>
                </Tooltip>
                <Box flex="1">
                  <Typography variant="body1" gutterBottom>
                    Dimensional Factor{" "}
                    <Tooltip title="The dimensional factor is used to calculate the dimensional weight (used as minimum weight) of a package from the cubic size divided by the dimensional factor.">
                      <IconButton>
                        <InfoRounded fontSize="small" className="text-[#3e4396]" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <TextField
                    name="dimensionalFactor"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.dimensionalFactor}
                    onChange={formik.handleChange}
                    disabled={!formik.values.dimensionalWeight}
                    sx={{ marginBottom: 2 }}
                  />
                </Box>
                <Box flex="1">
                  <Typography variant="body1" gutterBottom>
                    Weight (lbs){" "}
                  </Typography>
                  <TextField
                    name="weight"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.weight}
                    onChange={formik.handleChange}
                    disabled={formik.values.dimensionalWeight}
                    sx={{ marginBottom: 2 }}
                  />
                </Box>
                <Box flex="1">
                  <Typography variant="body1" gutterBottom>
                    Total Unit Factor{" "}
                    <Tooltip title="The unit factor is the intelligent quantity of a parcel type used to calculate the Number of Pieces extra fee and if order will fit within a vehicle capacity.">
                      <IconButton>
                        <InfoRounded fontSize="small" className="text-[#3e4396]" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <TextField
                    name="totalUnitFactor"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.totalUnitFactor}
                    onChange={formik.handleChange}
                    sx={{ marginBottom: 2 }}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default CreateUpdateParcelType;
