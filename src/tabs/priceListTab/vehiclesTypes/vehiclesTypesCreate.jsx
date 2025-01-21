import React from "react";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Box,
  Grid,
  Grid2,
} from "@mui/material";
import * as Yup from "yup";
import { postRequest } from "../../../consts/apiCalls";
const validationSchema = Yup.object({
  displayId: Yup.string().required("ID is required"),
  name: Yup.string()
    .max(100, "Name must be at most 100 characters")
    .min(0, "Name must be at least 0 characters") // Optional, as the minimum length of 0 is implied
    .required("Name is required"),
  optimizationProfile: Yup.string().required(
    "Optimization Profile is required",
  ),
  maxNumOfPieces: Yup.number()
    .integer("Maximum Number of Pieces must be an integer")
    .required("Maximum Number of Pieces is required"),
  maxVolume: Yup.number()
    .typeError("Maximum Volume must be a number")
    .required("Maximum Volume (ft³) is required"),
  maxWeight: Yup.number()
    .typeError("Maximum Weight must be a number")
    .required("Maximum Weight is required"),
  capacityOverage: Yup.string().required(
    "Dispatch Option on Vehicle Capacity Overage is required",
  ),
  baseFuelMilage: Yup.number()
    .typeError("Base Fuel Mileage must be a number")
    .required("Base Fuel Mileage is required"),
  color: Yup.string().required("Color is required"),
  image: Yup.string().required("Icon is required"),
  default: Yup.boolean().notRequired(), // Assuming 'default' is optional based on the DTO
});

const initialValues = {
  displayId: "",
  name: "",
  optimizationProfile: "",
  maxNumOfPieces: "",
  maxVolume: "",
  maxWeight: "",
  capacityOverage: "",
  baseFuelMilage: "",
  color: "#000000",
  image: "",
};

const options = {
  optimizationProfile: [
    { value: "default", label: "Default" },
    { value: "custom", label: "Custom" },
  ],
  dispatchOptionOnVehicleCapacityOverage: [
    { value: "allow", label: "Allow Overload" },
    { value: "allowwithwarning", label: "Allow with Warning" },
    { value: "prevent", label: "Prevent" },
  ],
  icons: [
    {
      value: "bike.png",
      src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/bike.png",
    },
    {
      value: "car.png",
      src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/car.png",
    },
    {
      value: "cargovan.png",
      src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/cargovan.png",
    },
    {
      value: "cubevan.png",
      src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/cubevan.png",
    },
    {
      value: "flatbed.png",
      src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/flatbed.png",
    },
    {
      value: "flatbedTrailer.png",
      src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/flatbedTrailer.png",
    },
    {
      value: "lowdock.png",
      src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/lowdock.png",
    },
    {
      value: "minivan.png",
      src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/minivan.png",
    },
    {
      value: "moffett.png",
      src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/moffett.png",
    },
    {
      value: "pickupRack.png",
      src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/pickupRack.png",
    },
    {
      value: "pickupTrailer.png",
      src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/pickupTrailer.png",
    },
    {
      value: "scooter.png",
      src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/scooter.png",
    },
    {
      value: "semi.png",
      src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/semi.png",
    },
    {
      value: "suv.png",
      src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/suv.png",
    },
    {
      value: "walker.png",

      src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/walker.png",
    },
  ],
};

const fieldDefinitions = [
  { id: "displayId", label: "ID", type: "text" },
  { id: "name", label: "Name", type: "text" },
  {
    id: "optimizationProfile",
    label: "Optimization Profile",
    type: "select",
    options: options.optimizationProfile,
  },
  { id: "maxNumOfPieces", label: "Maximum Number of Pieces", type: "text" },
  { id: "maxVolume", label: "Maximum Volume (ft³)", type: "text" },
  { id: "maxWeight", label: "Maximum Weight", type: "text" },
  { id: "baseFuelMilage", label: "Base Fuel Mileage", type: "text" },
  {
    id: "capacityOverage",
    label: "Dispatch Option on Vehicle Capacity Overage",
    type: "select",
    options: options.dispatchOptionOnVehicleCapacityOverage,
  },
  { id: "color", label: "Color", type: "color" },
  { id: "image", label: "Icon", type: "icon" },
];

const VehiclesTypesCreate = () => {
  const onSubmit = async (values) => {
    console.log("Form Data", values);
    const response = await postRequest("/vehicleType", values);
    console.log("added response", response);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", marginTop: "20px" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <Box
              marginBottom={2}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="h3" gutterBottom>
                Vehicle Information
              </Typography>
              {/* Submit Button */}

              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Box>

            {fieldDefinitions.map((field) => (
              <Box marginBottom={2} key={field.id}>
                {field.type === "text" && (
                  <div style={{ marginBottom: "20px" }}>
                    <Typography variant="body1" gutterBottom>
                      {field.label}
                    </Typography>
                    <Field
                      name={field.id}
                      as={TextField}
                      fullWidth
                      size="small"
                      error={touched[field.id] && Boolean(errors[field.id])}
                      helperText={touched[field.id] && errors[field.id]}
                    />
                  </div>
                )}

                {field.type === "select" && (
                  <FormControl fullWidth size="small">
                    <div style={{ marginBottom: "20px" }}>
                      <Typography variant="body1" gutterBottom>
                        {field.label}
                      </Typography>
                      <Field name={field.id} as={Select} fullWidth>
                        {field.options.map((opt) => (
                          <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </MenuItem>
                        ))}
                      </Field>
                      {touched[field.id] && errors[field.id] && (
                        <Typography color="error" variant="caption">
                          {errors[field.id]}
                        </Typography>
                      )}
                    </div>
                  </FormControl>
                )}
                {field.type === "color" && (
                  <FormControl>
                    <div style={{ marginBottom: "20px" }}>
                      <Typography variant="body1" gutterBottom>
                        {field.label}
                      </Typography>
                      <Field
                        name={field.id}
                        as={"input"}
                        fullWidth
                        type="color"
                        size="small"
                        onChange={(e) => setFieldValue("color", e.target.value)}
                        value={values.color}
                        label={field.label}
                        error={touched[field.id] && Boolean(errors[field.id])}
                        style={{
                          width: "100%",
                          height: "40px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                    {touched[field.id] && errors[field.id] && (
                      <Typography color="error" variant="caption">
                        {errors[field.id]}
                      </Typography>
                    )}
                  </FormControl>
                )}
              </Box>
            ))}
            {/* Icon Selector */}
            <FormControl>
              <Box marginBottom={2}>
                <Typography variant="body1">Icon</Typography>
                <Grid2 container spacing={2}>
                  {options.icons.map((icon) => (
                    <Grid2 item key={icon.value}>
                      <div
                        className={`cursor-pointer border-2 ${values.image == icon.src ? "border-[#1569cb]" : "border-white"}`}
                        onClick={() => setFieldValue("image", icon.src)}
                      >
                        <img src={icon.src} alt={icon.value} />
                      </div>
                    </Grid2>
                  ))}
                </Grid2>
                {touched.image && errors.image && (
                  <Typography color="error" variant="caption">
                    {errors.image}
                  </Typography>
                )}
              </Box>
            </FormControl>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VehiclesTypesCreate;
