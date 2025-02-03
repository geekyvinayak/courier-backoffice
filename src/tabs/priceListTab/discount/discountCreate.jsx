import React from "react";
import { useFormik } from "formik";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
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

const DiscountCreate = () => {
  const formik = useFormik({
    initialValues: {
      type: "Discount",
      name: "",
      description: "",
      unit: "Percentage",
      amount: 0,
      roundingDefault: "No Rounding",
      roundingLogic: "Closest",
      applyToInvoice: false,
      applyToPriceList: false,
      applyToExtraFee: false,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box
      maxWidth="600px"
      p={5}
    >
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" justifyContent='space-between' alignItems={'center'}>
          <Box>
            <Typography variant="h5">
              New Discount/Surcharge
            </Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" type="submit">
            Save
          </Button>
          <Button variant="outlined" type="button">
            Cancel
          </Button>
        </Box>
        </Box>
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
          >
            <MenuItem value="Discount">Discount</MenuItem>
            <MenuItem value="Surcharge">Surcharge</MenuItem>
          </Select>
        </FormControl>

        <Box>
          <TextField
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            fullWidth
            margin="normal"
          />
        </Box>

        <Box display="flex" gap={2}>
          <TextField
            label="Description"
            name="description"
            value={formik.values.descriptionE}
            onChange={formik.handleChange}
            fullWidth
            margin="normal"
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
              value="Dollar"
              control={<Radio />}
              label="Dollar ($)"
            />
            <FormControlLabel
              value="Percentage"
              control={<Radio />}
              label="Percentage (%)"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          label="Amount (%)"
          name="amount"
          type="number"
          value={formik.values.amount}
          onChange={formik.handleChange}
          fullWidth
          margin="normal"
        />

        {formik.values.unit === "Percentage" && (
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
                  value="$0.25"
                  control={<Radio />}
                  label="$0.25"
                />
                <FormControlLabel
                  value="$0.50"
                  control={<Radio />}
                  label="$0.50"
                />
                <FormControlLabel
                  value="$1.00"
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

        <Box display="flex" gap={2}>
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
