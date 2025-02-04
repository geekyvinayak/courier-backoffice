import React from "react";
import { useFormik } from "formik";
import {
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormLabel,
  Box,
  Typography,
} from "@mui/material";
import { postRequest } from "../../../consts/apiCalls";

const DiscountCreate = () => {
  const formik = useFormik({
    initialValues: {
      discountType: "Discount",
      name: "",
      description: "",
      unit: "percentage",
      amount: 0.0,
      roundingDefault: "No Rounding",
      roundingLogic: "Closest",
      applyToInvoice: false,
      applyToPriceList: false,
      applyToExtraFee: false,
    },
    onSubmit: async (values) => {
      try {
        const response = await postRequest("/discounts", values);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Box maxWidth="600px" p={5}>
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">New Discount/Surcharge</Typography>
          <Box display="flex" gap={2}>
            <Button variant="contained" type="submit">
              Save
            </Button>
            <Button variant="outlined" type="button">
              Cancel
            </Button>
          </Box>
        </Box>

        <FormControl fullWidth margin="normal">
          <Typography variant="subtitle1" gutterBottom>
            Type
          </Typography>
          <Select
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            fullWidth
          >
            <MenuItem value="Discount">Discount</MenuItem>
            <MenuItem value="Surcharge">Surcharge</MenuItem>
          </Select>
        </FormControl>

        <Box marginY={2}>
          <Typography variant="subtitle1" gutterBottom>
            Name
          </Typography>
          <TextField
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            fullWidth
          />
        </Box>

        <Box marginY={2}>
          <Typography variant="subtitle1" gutterBottom>
            Description
          </Typography>
          <TextField
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            fullWidth
          />
        </Box>

        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Unit</FormLabel>
          <RadioGroup
            row
            name="unit"
            value={formik.values.unit}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value="dollar"
              control={<Radio />}
              label="Dollar ($)"
            />
            <FormControlLabel
              value="percentage"
              control={<Radio />}
              label="Percentage (%)"
            />
          </RadioGroup>
        </FormControl>

        <Box marginY={2}>
          <Typography variant="subtitle1" gutterBottom>
            Amount ({formik.values.unit === "percentage" ? "%" : "$"})
          </Typography>
          <TextField
            name="amount"
            type="number"
            value={formik.values.amount}
            onChange={formik.handleChange}
            fullWidth
          />
        </Box>

        {formik.values.unit === "percentage" && (
          <>
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Rounding Default</FormLabel>
              <RadioGroup
                row
                name="roundingDefault"
                value={formik.values.roundingDefault}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="No Rounding"
                  control={<Radio />}
                  label="No Rounding"
                />
                <FormControlLabel
                  value="quater"
                  control={<Radio />}
                  label="$0.25"
                />
                <FormControlLabel
                  value="half"
                  control={<Radio />}
                  label="$0.50"
                />
                <FormControlLabel
                  value="whole"
                  control={<Radio />}
                  label="$1.00"
                />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Rounding Logic</FormLabel>
              <RadioGroup
                row
                name="roundingLogic"
                value={formik.values.roundingLogic}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="Closest"
                  control={<Radio />}
                  label="Closest"
                />
                <FormControlLabel
                  value="Round Up"
                  control={<Radio />}
                  label="Round Up"
                />
                <FormControlLabel
                  value="Round Down"
                  control={<Radio />}
                  label="Round Down"
                />
              </RadioGroup>
            </FormControl>
          </>
        )}

        <Box display="flex" gap={2} marginY={2}>
          <FormControlLabel
            control={
              <Checkbox
                name="applyToInvoice"
                checked={formik.values.applyToInvoice}
                onChange={formik.handleChange}
              />
            }
            label="Apply to invoice"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="applyToPriceList"
                checked={formik.values.applyToPriceList}
                onChange={formik.handleChange}
              />
            }
            label="Apply to price list"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="applyToExtraFee"
                checked={formik.values.applyToExtraFee}
                onChange={formik.handleChange}
              />
            }
            label="Apply to extra fee"
          />
        </Box>
      </form>
    </Box>
  );
};

export default DiscountCreate;
