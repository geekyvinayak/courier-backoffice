import React from "react";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  Box,
  MenuItem,
  Select,
  Button,
  Typography,
  Link,
  TextareaAutosize,
} from "@mui/material";

const initialValues = {
  name: "",
  checkbox: false,
  latitude: "",
  longitude: "",
  excludeReturnOrders: false,
  excludeContinuationOrders: false,
  distanceFormula: "WarehouseToPickup + PickupToDelivery + DeliveryToWarehouse",
  radioOption: "",
  dropdown: "",
};

const TravelOptions = ({ values, setFieldValue }) => {
  const handleResetDistanceFormula = () => {
    setFieldValue("distanceFormula", initialValues.distanceFormula); // Reset only distanceFormula value
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 2,
        border: "1px solid #cfe2f3",
        borderRadius: "4px",
        backgroundColor: "#ffffff", // Default background for the component
      }}
    >
      {/* Header with blue background */}
      <Box
        sx={{
          backgroundColor: "#eaf4fc",
          padding: 1,
          borderRadius: "4px",
          marginBottom: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Travelling Distance Options
        </Typography>
      </Box>

      <Box display="flex" gap={2} marginBottom={2}>
        {/* Latitude */}
        <Box flex="1">
          <Typography variant="body1" gutterBottom>
            LATITUDE
          </Typography>
          <Field
            name="latitude"
            as={TextField}
            fullWidth
            size="small"
            variant="outlined"
          />
        </Box>

        {/* Longitude */}
        <Box flex="1">
          <Typography variant="body1" gutterBottom>
            LONGITUDE
          </Typography>
          <Field
            name="longitude"
            as={TextField}
            fullWidth
            size="small"
            variant="outlined"
          />
        </Box>
      </Box>

      {/* Checkboxes */}
      <Box marginBottom={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={values.excludeReturnOrders}
              onChange={(e) =>
                setFieldValue("excludeReturnOrders", e.target.checked)
              }
            />
          }
          label="EXCLUDE DISTANCE ON RETURN ORDERS"
        />
      </Box>
      <Box marginBottom={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={values.excludeContinuationOrders}
              onChange={(e) =>
                setFieldValue("excludeContinuationOrders", e.target.checked)
              }
            />
          }
          label="EXCLUDE DISTANCE ON CONTINUATION ORDERS"
        />
      </Box>

      {/* Distance Formula */}
      <Box marginBottom={2}>
        <Typography variant="body1" gutterBottom>
          DISTANCE FORMULA
        </Typography>
        <TextareaAutosize
          name="distanceFormula"
          minRows={3}
          value={values.distanceFormula}
          variant="outlined"
          onChange={(e) => setFieldValue("distanceFormula", e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            borderColor: "#c0c0c0",
            borderRadius: "4px",
            borderWidth: "0.5px",
          }}
        />
      </Box>

      {/* Buttons */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          type="button"
          color="primary"
          onClick={handleResetDistanceFormula}
        >
          Reset to Default
        </Button>
        <Link href="#" underline="hover">
          Help?
        </Link>
      </Box>
    </Box>
  );
};

const NewPrice = () => {
  const onSubmit = (values) => {
    console.log("Form Data", values);
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div className="m-auto mt-7 max-w-[600px]">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={2}
            >
              <Typography variant="h4" gutterBottom>
                New Price List
              </Typography>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>

            {/* Text Field */}
            <div style={{ marginBottom: "20px" }}>
              <Typography variant="body1" gutterBottom>
                Name
              </Typography>
              <Field
                name="name"
                as={TextField}
                fullWidth
                size="small"
                variant="outlined"
              />
            </div>

            {/* Checkbox with conditional TextArea */}
            <div style={{ marginBottom: "20px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.checkbox}
                    onChange={(e) =>
                      setFieldValue("checkbox", e.target.checked)
                    }
                  />
                }
                label="INCLUDE WAREHOUSE TRAVELLING DISTANCE"
              />
              {values.checkbox && (
                <TravelOptions values={values} setFieldValue={setFieldValue} />
              )}
            </div>

            {/* Radio Buttons */}
            <div style={{ marginBottom: "20px" }}>
              <Typography variant="body1" gutterBottom>
                TYPE
              </Typography>
              <FormControl>
                <RadioGroup
                  value={values.radioOption}
                  onChange={(e) => setFieldValue("radioOption", e.target.value)}
                  row
                >
                  <FormControlLabel
                    value="option1"
                    control={<Radio />}
                    label="Option 1"
                  />
                  <FormControlLabel
                    value="option2"
                    control={<Radio />}
                    label="Option 2"
                  />
                  <FormControlLabel
                    value="option3"
                    control={<Radio />}
                    label="Option 3"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            {/* Dropdown */}
            <div style={{ marginBottom: "20px" }}>
              <Typography variant="body1" gutterBottom>
                ZONE LAYOUT
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={values.dropdown}
                  size="small"
                  onChange={(e) => setFieldValue("dropdown", e.target.value)}
                >
                  <MenuItem value="value1">Value 1</MenuItem>
                  <MenuItem value="value2">Value 2</MenuItem>
                  <MenuItem value="value3">Value 3</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewPrice;
