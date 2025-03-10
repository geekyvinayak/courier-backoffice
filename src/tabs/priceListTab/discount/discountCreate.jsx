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
import { useParams, useNavigate } from "react-router-dom";
import { getRequest, putRequest } from "../../../consts/apiCalls";
import { useEffect } from "react";
import Breadcrumb from "../../../components/Breadcrumb";

const DiscountCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
        if (id) {
          const response = await putRequest(`/discounts/${id}`, values);
        } else {
          const response = await postRequest("/discounts", values);
        }
        navigate("/pricelist/discounts-surcharges");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const fetchDiscountById = async () => {
    try {
      const response = await getRequest(`/discounts/${id}`);
      formik.setValues(response);
    } catch (error) {
      console.error("Error fetching Discount:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDiscountById();
    }
  }, [id]);

    const pageBreadcrums = [
    {
      id: 1,
      label: "Discount/Surcharge",
      href: "/pricelist/discounts-surcharges",
    },
    {
      id: 2,
      label: `${id ? 'Edit ' : 'New '} Discount/Surcharge`,
      href: "",
    },
  ];

  return (
    <div className="wraper-container">
      <Breadcrumb items={pageBreadcrums} />
      <div className="max-w-[600px] p-4 border border-gray shadow-md mt-4 mb-4">
        <form onSubmit={formik.handleSubmit}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h3" gutterBottom>
              {id?"Edit":"New"} Discount/Surcharge
            </Typography>
            <Box display="flex" gap={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  // Red border (you can change the color)
                  backgroundColor: "#1569CB",
                }}
              >
                Save
              </Button>
            </Box>
          </Box>

        <FormControl fullWidth margin="normal">
          <Typography variant="body1" gutterBottom>
            Type
          </Typography>
          <Select
            name="type"
            value={formik.values.discountType}
            onChange={(event) => formik.setFieldValue("discountType", event.target.value)}
            fullWidth
            size="small"
            disabled={id ? true : false}
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
            size="small"
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
            size="small"
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
          <Typography variant="body1" gutterBottom>
            Amount ({formik.values.unit === "percentage" ? "%" : "$"})
          </Typography>
          <TextField
            name="amount"
            size="small"
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
                    control={
                      <Radio
                        disabled={
                          formik.values.roundingDefault === "No Rounding"
                        }
                      />
                    }
                    label="Closest"
                  />
                  <FormControlLabel
                    value="Round Up"
                    control={
                      <Radio
                        disabled={
                          formik.values.roundingDefault === "No Rounding"
                        }
                      />
                    }
                    label="Round Up"
                  />
                  <FormControlLabel
                    value="Round Down"
                    control={
                      <Radio
                        disabled={
                          formik.values.roundingDefault === "No Rounding"
                        }
                      />
                    }
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
      </div>
    </div>
  );
};

export default DiscountCreate;
