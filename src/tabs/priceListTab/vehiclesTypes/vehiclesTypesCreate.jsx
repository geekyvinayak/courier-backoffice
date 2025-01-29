import React, { useEffect, useState } from "react";
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
import { getRequest, postRequest, putRequest } from "../../../consts/apiCalls";
import Breadcrumb from "../../../components/Breadcrumb";
import SubTabNavigator from "../../../components/subTabNavigator";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../../../components/toast/useToast";

const validationSchema = Yup.object({
  displayId: Yup.number()
    .typeError("Display ID must be a number")
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : Number(value),
    )
    .required("Display ID is required"),

  name: Yup.string()
    .max(100, "Name must be at most 100 characters")
    .required("Name is required"),

  optimizationProfile: Yup.string().required(
    "Optimization Profile is required",
  ),

  capacityOverage: Yup.string().required(
    "Dispatch Option on Vehicle Capacity Overage is required",
  ),

  maxNumOfPieces: Yup.number()
    .typeError("Maximum Number of Pieces must be a number")
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : Number(value),
    )
    .notRequired(),

  maxVolume: Yup.number()
    .typeError("Maximum Volume must be a number")
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : Number(value),
    )
    .notRequired(),

  maxWeight: Yup.number()
    .typeError("Maximum Weight must be a number")
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : Number(value),
    )
    .notRequired(),

  baseFuelMilage: Yup.number()
    .typeError("Base Fuel Mileage must be a number")
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : Number(value),
    )
    .notRequired(),

  color: Yup.string()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .notRequired(),

  image: Yup.string()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .notRequired(),

  default: Yup.boolean().notRequired(),
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
  const { id } = useParams();
  const [initialFormValues, setInitialFormValues] = useState(initialValues);
  const { showSuccess, showError, showWarning } = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchVehicleType = async () => {
      if (id) {
        try {
          const response = await getRequest(`/vehicleType/${id}`);
          setInitialFormValues(response);
        } catch (error) {
          console.error("Error fetching vehicle type:", error);
        }
      }
    };

    fetchVehicleType();
  }, [id]);

  const onSubmit = async (values) => {
    const transformedValues = Object.fromEntries(
      Object.entries({
        ...values,
        displayId: Number(values.displayId),
        maxNumOfPieces: values.maxNumOfPieces
          ? Number(values.maxNumOfPieces)
          : null,
        maxVolume: values.maxVolume ? parseFloat(values.maxVolume) : null,
        maxWeight: values.maxWeight ? parseFloat(values.maxWeight) : null,
        baseFuelMilage: values.baseFuelMilage
          ? parseFloat(values.baseFuelMilage)
          : null,
        image: values.image !== "" ? values.image : null,
      }).filter(([_, value]) => value !== null && value !== undefined),
    );

    try {
      if (id) {
        await putRequest(`/vehicleType/${id}`, transformedValues).then(() => {
          showSuccess(`vehicleType edited success`);
        });
      } else {
        await postRequest("/vehicleType", transformedValues).then(() => {
          showSuccess(`vehicleType add success`);
        });
      }
      navigate("/pricelist/vehiclestype");
    } catch (error) {
      showError(`something went wrong`);
      console.error("Error saving vehicle type:", error);
    }
  };

  return (
    <div className="pb-4">
      <SubTabNavigator
        data={[
          {
            lable: "Vehicle Types",
            url: "/pricelist/vehiclestype",
            isFilled: true,
          },
          {
            lable: "Vehicle Equivalencies",
            url: "/pricelist/vehicleequivalencies",
          },
        ]}
      />
      <Breadcrumb
        items={[
          { label: "Vehicles", href: "/pricelist/vehiclestype" },
          {
            label: id ? `Edit ${id}` : "New Vehicle Type",
            href: "", // Conditional href
          },
        ]}
      />
      <div className="max-w-[600px] p-4 border border-gray shadow-md ml-4 mt-4 mb-4">
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          className="border-2 border-black"
          enableReinitialize={true}
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

              {fieldDefinitions.map((field) => (
                <Box marginBottom={2} key={field.id}>
                  {field.type === "text" && (
                    <div>
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
                      <div>
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
                      <div>
                        <Typography variant="body1" gutterBottom>
                          {field.label}
                        </Typography>
                        <Field
                          name={field.id}
                          as={"input"}
                          fullWidth
                          type="color"
                          size="small"
                          onChange={(e) =>
                            setFieldValue("color", e.target.value)
                          }
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
    </div>
  );
};

export default VehiclesTypesCreate;
