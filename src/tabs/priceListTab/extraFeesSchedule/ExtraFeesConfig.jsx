import { Dialog, DialogTitle, DialogContent } from "@mui/material";
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
import { getRequest } from "../../../consts/apiCalls";

const ExtraFeesConfig = ({ open, handleClose, submitForm, id }) => {

  const [extraFees,setExtraFees] = useState([]);

  const formik = useFormik({
    initialValues: {
      id: "",
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
      extraFeeScheduleId: 0,
      extraFeeId: 0,
      file:'',
    },
    validationSchema: Yup.object({
      rate: Yup.number().min(0, "Rate must be positive").required("Required"),
      per: Yup.number().required("Required"),
      max: Yup.number().nullable(),
      driverCommissionable: Yup.number().required("Required"),
      salesCommissionable: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Form Data:", values);
      // submitForm(values);
    },
  });

  const fetchExtraFees = async () => {
    try {
      const response = await getRequest(`/extraFeeSchedule/extraFeeAvailable/${id}`);
      setExtraFees(response);
    } catch (error) {
      console.error("Error fetching pricing list:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchExtraFees();
    }
  }, [id]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Entry</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          {/* Extra Fee Type */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel>EXTRA FEE TYPE</FormLabel>
            <Select
              name="extraFeeName"
              value={formik.values.extraFeeName}
              onChange={formik.handleChange}
            >
              {extraFees.map((fees)=>{
                return <MenuItem value={fees.name}>{fees.name}</MenuItem>
              })}
              
            </Select>
          </FormControl>

          {/* Configuration Section */}
          <Paper variant="outlined" sx={{ padding: 2, mb: 2 }}>
            <Typography variant="subtitle1">Configuration</Typography>
            {/* Type */}
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <FormLabel>TYPE</FormLabel>
              <RadioGroup
                row
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="rated"
                  control={<Radio />}
                  label="Rated"
                />
                <FormControlLabel
                  value="sliding"
                  control={<Radio />}
                  label="Sliding"
                />
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
                    onChange={(event) =>
                      formik.setFieldValue("file", event.currentTarget.files[0])
                    }
                  />
                </FormControl>

                {/* Separate Sheet Checkbox */}
                <FormControlLabel
                  control={
                    <Checkbox
                      name="separateSheet"
                      checked={formik.values.separateSheetPerVehicleType}
                      onChange={formik.handleChange}
                    />
                  }
                  label="SEPARATE SHEET PER VEHICLE TYPE"
                  sx={{ mb: 2 }}
                />
                <br />

                {/* Download Template Button */}
                <Button variant="outlined" sx={{ mb: 2 }}>
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
                name="roundingMethod"
                value={formik.values.calculationMethod}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="roundup"
                  control={<Radio />}
                  label="ROUND UP"
                />
                <FormControlLabel
                  value="norounding"
                  control={<Radio />}
                  label="NO ROUNDING"
                />
                <FormControlLabel
                  value="rounddown"
                  control={<Radio />}
                  label="ROUND DOWN"
                />
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
            <Typography variant="subtitle1">Commissions</Typography>
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
            <Typography variant="subtitle1">Visibility</Typography>
            <TextField
              fullWidth
              label="RANK"
              name="priority"
              size="small"
              value={formik.values.priority}
              onChange={formik.handleChange}
            />
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
