import { Dialog, DialogTitle, DialogContent, Tooltip, IconButton, Box } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import { useEffect } from "react";
import { getRequest, postRequest } from "../../../consts/apiCalls";
import axios from "axios";
import useToast from "../../../components/toast/useToast";
import { InfoRounded } from "@mui/icons-material";

const ExtraFeesConfig = ({ open, handleClose, id, configId }) => {
  const [extraFees, setExtraFees] = useState([]);

  const formik = useFormik({
    initialValues: {
      extraFeeName: "",
      type: "rated",
      separateSheetPerVehicleType: false,
      rate: 0,
      per: 0,
      max: 0,
      included: 0,
      defaultQuantity: 0,
      hideDefaultPriceQuantity: false,
      calculationMethod: "roundup",
      fuelSurcharge: false,
      driverCommissionable: 0,
      salesCommissionable: 0,
      visibilityForInternalUser: "",
      visibilitySelfServe: "",
      visibilityDriver: "",
      priority: 0,
      extraFeeScheduleId: id,
      extraFeeId: 0,
      slidingFeeDetailsList: [],
      file: "",
    },
    validationSchema: Yup.object({
      rate: Yup.number().min(0, "Rate must be positive").required("Required"),
      per: Yup.number().required("Required"),
      max: Yup.number().nullable(),
      driverCommissionable: Yup.number().required("Required"),
      salesCommissionable: Yup.number().required("Required"),
    }),
    onSubmit: async (values) => {
      const file = values.file ? values.file : "null";
      delete values.file;
      try {
        const response = await postRequest(
          `/extraFeeSchedule/extraFee/${id}`,
          { extraFeeConfigDto: JSON.stringify(values), file },
          {
            "Content-Type": "multipart/form-data",
          }
        );
        showSuccess("Config Added");
        handleClose();
      } catch (error) {
        showError("Something went wrong");
      }
      // submitForm(values);
    },
  });

  const { showSuccess, showError, showWarning } = useToast();

  const fetchExtraFees = async () => {
    try {
      const response = await getRequest(`/extraFeeSchedule/extraFeeAvailable/${id}`);
      setExtraFees(response);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  const handdleTemplteDownload = async () => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/extraFeeSchedule/template?isSeparateVehicle=${formik.values.separateSheetPerVehicleType}`,
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust based on your auth method
          Accept: "*/*",
        },
      });

      // Get filename from content-disposition header if available
      const contentDisposition = response.headers["content-disposition"];
      let filename = ""; // No default filename

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(
          /filename\*?=(?:UTF-8'')?["']?([^;"'\n]*)["']?/
        );
        if (filenameMatch && filenameMatch[1]) {
          filename = decodeURIComponent(filenameMatch[1]); // Decode in case of URL encoding
        }
      }

      // Create download link
      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showSuccess("File downloaded successfully!");
    } catch (error) {
      showError("Error downloading file ");
      console.log(error);
    }
  };

  const fetchExtraFeeConfigById = async () => {
    try {
      const response = await getRequest(`/extraFeeSchedule/getExtraFeeConfigById/${configId}`);
      formik.setValues(response);
    } catch (error) {
      showError("Some Thing Went Wrong.");
      console.log(error);
    }
  };

  useEffect(() => {
    if (id && !configId) {
      fetchExtraFees();
    }
    if (configId) {
      fetchExtraFeeConfigById();
    }
  }, [id, configId]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{configId ? "Edit Extra Config" : "Add Extra Config"}</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          {/* Extra Fee Type */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Typography variant="body1" gutterBottom>
              EXTRA FEE TYPE
            </Typography>
            <Select
              name="extraFeeName"
              disabled={configId}
              value={formik.values.extraFeeName}
              onChange={formik.handleChange}
            >
              {!configId &&
                extraFees.map((fees) => {
                  return <MenuItem value={fees.name}>{fees.name}</MenuItem>;
                })}
              {configId && (
                <MenuItem value={formik.values.extraFeeName}>{formik.values.extraFeeName}</MenuItem>
              )}
            </Select>
          </FormControl>

          {/* Configuration Section */}
          <Paper variant="outlined" sx={{ padding: 2, mb: 2 }}>
            <Typography variant="h5">Configuration</Typography>
            {/* Type */}
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <Typography variant="body1" gutterBottom className="!mt-4">
                TYPE
              </Typography>

              <RadioGroup row name="type" value={formik.values.type} onChange={formik.handleChange}>
                <FormControlLabel value="rated" control={<Radio />} label="Rated" />
                <FormControlLabel value="sliding" control={<Radio />} label="Sliding" />
              </RadioGroup>
            </FormControl>

            {formik.values.type === "sliding" && (
              <>
                {/* File Upload */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <FormLabel>FILE</FormLabel>
                  <input
                    type="file"
                    name="file"
                    onChange={(event) => formik.setFieldValue("file", event.currentTarget.files[0])}
                  />
                </FormControl>

                {/* Separate Sheet Checkbox */}
                <FormControlLabel
                  control={
                    <Checkbox
                      name="separateSheetPerVehicleType"
                      checked={formik.values.separateSheetPerVehicleType}
                      onChange={formik.handleChange}
                    />
                  }
                  label="SEPARATE SHEET PER VEHICLE TYPE"
                  sx={{ mb: 2 }}
                />
                <br />

                {/* Download Template Button */}
                <Button onClick={handdleTemplteDownload} variant="outlined" sx={{ mb: 2 }}>
                  Download Template
                </Button>
              </>
            )}

            {/* Rate, Per, Max */}
            {formik.values.type !== "sliding" && (
              <TextField
                fullWidth
                size="small"
                label="RATE ($)"
                name="rate"
                type="number"
                value={formik.values.rate}
                onChange={formik.handleChange}
                error={formik.touched.rate && Boolean(formik.errors.rate)}
                helperText={formik.touched.rate && formik.errors.rate}
                sx={{ mb: 2 }}
              />
            )}
            <TextField
              fullWidth
              label="PER"
              size="small"
              name="per"
              type="number"
              value={formik.values.per}
              onChange={formik.handleChange}
              error={formik.touched.per && Boolean(formik.errors.per)}
              helperText={formik.touched.per && formik.errors.per}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="MAX ($)"
              size="small"
              name="max"
              type="number"
              value={formik.values.max}
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
            />

            {/* Included & Default Quantity */}
            <TextField
              fullWidth
              label="INCLUDED"
              size="small"
              name="included"
              value={formik.values.included}
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              size="small"
              label="DEFAULT QUANTITY"
              name="defaultQuantity"
              value={formik.values.defaultQuantity}
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
            />

            {/* Hide Quantity & Unit Price */}
            <FormControlLabel
              control={
                <Checkbox
                  name="hideDefaultPriceQuantity"
                  checked={formik.values.hideDefaultPriceQuantity}
                  onChange={formik.handleChange}
                />
              }
              label="HIDE QUANTITY AND UNIT PRICE"
              sx={{ mb: 2 }}
            />

            {/* Rounding Method */}
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <FormLabel>TOTAL PRICE CALCULATION METHOD</FormLabel>
              <RadioGroup
                row
                name="calculationMethod"
                value={formik.values.calculationMethod}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="roundup"
                  control={<Radio />}
                  label="ROUND UP"
                  className="!mr-2"
                />
                <Tooltip
                  title={
                    <Box sx={{ maxWidth: 250, p: 1 }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Round Up
                      </Typography>
                      <Typography variant="body2">
                        Round up the quantity to the next 'Per unit' value.
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Eg: [Quantity: 0.05] x [Per: 1.00] x [Unit Price: 1000] = [Total Price:
                        1000] (Quantity was rounded up to 1.00).
                      </Typography>
                    </Box>
                  }
                  arrow
                >
                  <IconButton>
                    <InfoRounded className="text-[#3e4396]" />
                  </IconButton>
                </Tooltip>
                <FormControlLabel value="norounding" control={<Radio />} label="NO ROUNDING" />
                <Tooltip
                  title={
                    <Box sx={{ maxWidth: 250, p: 1 }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        No Rounding
                      </Typography>
                      <Typography variant="body2">
                        Quantity will be calculated as entered with no rounding.
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Eg: [Quantity: 0.05] x [Per: 1.00] x [Unit Price: 1000] = [Total Price: 50]
                        (Quantity was kept to 0.05).
                      </Typography>
                    </Box>
                  }
                  arrow
                >
                  <IconButton>
                    <InfoRounded className="text-[#3e4396]" />
                  </IconButton>
                </Tooltip>
                <FormControlLabel value="rounddown" control={<Radio />} label="ROUND DOWN" />
                <Tooltip
                  title={
                    <Box sx={{ maxWidth: 250, p: 1 }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Round Down
                      </Typography>
                      <Typography variant="body2">
                        Round down the quantity to the previous 'Per unit' value.
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Eg: [Quantity: 0.05] × [Per: 1.00] × [Unit Price: 1000] = [Total Price: 0]
                        (Quantity was rounded down to 0.00).
                      </Typography>
                    </Box>
                  }
                  arrow
                >
                  <IconButton>
                    <InfoRounded className="text-[#3e4396]" />
                  </IconButton>
                </Tooltip>
              </RadioGroup>
            </FormControl>

            {/* Fuel Surcharge */}
            <FormControlLabel
              control={
                <Checkbox
                  name="fuelSurcharge"
                  checked={formik.values.fuelSurcharge}
                  onChange={formik.handleChange}
                />
              }
              label="FUEL SURCHARGE"
              sx={{ mb: 2 }}
            />
          </Paper>

          {/* Commissions Section */}
          <Paper variant="outlined" sx={{ padding: 2, mb: 2 }}>
            <Typography variant="body1" gutterBottom className="!mb-4">
              Commissions
            </Typography>

            <TextField
              fullWidth
              size="small"
              label="DRIVER COMMISSIONABLE (%)"
              name="driverCommissionable"
              type="number"
              value={formik.values.driverCommissionable}
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="SALES COMMISSIONABLE (%)"
              name="salesCommissionable"
              size="small"
              type="number"
              value={formik.values.salesCommissionable}
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
            />
          </Paper>

          {/* Visibility Section */}
          <Paper variant="outlined" sx={{ padding: 2, mb: 2 }}>
            <Typography variant="body1" gutterBottom className="!mb-4">
              Visibility
            </Typography>

            <TextField
              fullWidth
              label="RANK"
              name="priority"
              size="small"
              value={formik.values.priority}
              onChange={formik.handleChange}
            />
            {/* Find the selected fee object */}
            {extraFees.find((fee) => fee.name === formik.values.extraFeeName)?.systemExtra && (
              <FormControl fullWidth sx={{ mb: 2 }}>
                <Select
                  label="VISIBILITY FOR INTERNAL USERS"
                  name="additionalOption"
                  value={formik.values.visibilityForInternalUser}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="RestrictedUsersOnly">Restricted Users Only</MenuItem>
                  <MenuItem value="Optional">Optional</MenuItem>
                  <MenuItem value="Required">Required</MenuItem>
                </Select>
                <Select
                  label="visibilitySelfServe"
                  name="visibilitySelfServe"
                  value={formik.values.visibilitySelfServe}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="Hidden">Hidden</MenuItem>
                  <MenuItem value="Optional">Optional</MenuItem>
                  <MenuItem value="Required">Required</MenuItem>
                </Select>
                <Select
                  label="visibilityDriver"
                  name="visibilityDriver"
                  value={formik.values.visibilityDriver}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="Hidden">Hidden</MenuItem>
                  <MenuItem value="Optional">Optional</MenuItem>
                  <MenuItem value="Required">Required</MenuItem>
                </Select>
              </FormControl>
            )}
          </Paper>

          {/* Submit Button */}
          <Button type="submit" onClick={formik.handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </form>
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={submitForm} color="primary">
          Submit
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default ExtraFeesConfig;
