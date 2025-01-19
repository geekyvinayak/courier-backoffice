import React from "react";
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, IconButton, Grid2 } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AccessAlarm, AccountBox, Alarm, AttachMoney } from "@mui/icons-material";
import Breadcrumb from "../../../components/Breadcrumb";
import SubTabNavigator from "../../../components/subTabNavigator";

const VehiclesTypesCreate = () => {
  const validationSchema = Yup.object({
    id: Yup.string().required("ID is required"),
    nameEn: Yup.string().required("Name (English) is required"),
    optimizationProfile: Yup.string().required("Optimization profile is required"),
    maximumNumberofPieces: Yup.string().required("Maximum number of pieces is required"),
    maximumVolumeFT: Yup.string().required("Maximum volume (ft³) is required"),
    maximumWeight: Yup.string().required("Maximum weight is required"),
    dispatchOptionOnVehicleCapacityOverage: Yup.string().required("Dispatch option on vehicle capacity overage is required"),
    baseFuelMileage: Yup.string().required("Base fuel mileage is required"),
    color: Yup.string().required("Color is required"),
    icon: Yup.string().required("Icon is required"),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      nameEn: "",
      optimizationProfile: "",
      maximumNumberofPieces: "",
      maximumVolumeFT: "",
      maximumWeight: "",
      dispatchOptionOnVehicleCapacityOverage: "",
      baseFuelMileage: "",
      color: "",
      icon: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  const options = {
    optimizationProfile: [
      { value: "default", label: "Default" },
      { value: "custom", label: "Custom" },
    ],
    dispatchOptionOnVehicleCapacityOverage: [
      { value: "allow", label: "Allow Overload" },
      { value: "allowwithwarning", label: "Allow with warning" },
      { value: "prevent", label: "Prevent" },
    ],
    icons: [
      { value: "bike.png", src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/bike.png" },
      { value: "car.png", src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/car.png" },
      { value: "cargovan.png", src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/cargovan.png" },
      { value: "cubevan.png", src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/cubevan.png" },
      { value: "flatbed.png", src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/flatbed.png" },
      { value: "flatbedTrailer.png", src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/flatbedTrailer.png" },
      { value: "lowdock.png", src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/lowdock.png" },
      { value: "minivan.png", src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/minivan.png" },
      { value: "moffett.png", src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/moffett.png" },
      { value: "pickupRack.png", src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/pickupRack.png" },
      { value: "pickupTrailer.png", src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/pickupTrailer.png" },
      { value: "scooter.png", src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/scooter.png" },
      { value: "semi.png", src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/semi.png" },
      { value: "suv.png", src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/suv.png" },
      { value: "walker.png", src: "https://dispatchstorageprod.blob.core.windows.net/vehicle-icon/personaltouchcourier/walker.png" },
    ]
  };

  const fields = [
    { id: "id", label: "ID", type: "text" },
    { id: "nameEn", label: "Name (EN)", type: "text" },
    { id: "optimizationProfile", label: "Optimization Profile", type: "select", options: options.optimizationProfile },
    { id: "maximumNumberofPieces", label: "Maximum Number of Pieces", type: "text" },
    { id: "maximumVolumeFT", label: "Maximum Volume (ft³)", type: "text" },
    { id: "maximumWeight", label: "Maximum Weight", type: "text" },
    { id: "dispatchOptionOnVehicleCapacityOverage", label: "Dispatch Option on Vehicle Capacity Overage", type: "select", options: options.dispatchOptionOnVehicleCapacityOverage },
    { id: "baseFuelMileage", label: "Base Fuel Mileage", type: "text" },
    { id: "color", label: "Color", type: "color" },
    { id: "icon", label: "Icon", type: "select", options: options.icons },
  ];

  const pageBreadcrums = [
    {
      id: 1,
      label: 'Vehicles',
      href: '/pricelist/vehiclestype',
    },
    {
      id: 2,
      label: 'New Vehicle Type',
      href: '/products',
    },
  ];

  return (
    <div className="ml-5">
      <SubTabNavigator data={[{lable:"Vehicle Types",url:'/pricelist/vehiclestype'},{lable:"Vehicle Equivalencies",url:'/pricelist/vehicleequivalencies'}]} />
      <Breadcrumb items={pageBreadcrums}/>
    <div className="bg-white-100 p-6 rounded-md max-w-3xl shadow-md ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-bold">Vehicle Information</h1>
        <Button variant="contained" onClick={formik.handleSubmit} className="bg-blue-500"
        sx={{
          backgroundColor: '#1569CB',
          }
        }
        >
          Save
        </Button>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>

            {field.type === "text" && (
              <TextField
                id={field.id}
                name={field.id}
                variant="outlined"
                fullWidth
                size="small"
                value={formik.values[field.id]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[field.id] && Boolean(formik.errors[field.id])}
                helperText={formik.touched[field.id] && formik.errors[field.id]}
              />
            )}

            {field.type === "select" && field.id !== "icon" && (
              <FormControl variant="outlined" fullWidth size="small">
                <InputLabel id={`${field.id}-label`}>{field.label}</InputLabel>
                <Select
                  labelId={`${field.id}-label`}
                  id={field.id}
                  name={field.id}
                  value={formik.values[field.id]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched[field.id] && Boolean(formik.errors[field.id])}
                >
                  {field.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched[field.id] && formik.errors[field.id] && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors[field.id]}</p>
                )}
              </FormControl>
            )}

            {field.id === "icon" && (
              <Grid2 container spacing={1}>
                {field.options.map((option) => (
                  <Grid2 item key={option.value} > 
                    <div
                    className={`cursor-pointer border-2 ${formik.values.icon ==option.value ? 'border-[#1569cb]' : 'border-white'}`}
                      onClick={() => formik.setFieldValue("icon", option.value)}
                      color={formik.values.icon === option.value ? "primary" : "default"}
                      size="large"
                    >
                      {/* {option.icon} */}
                      <img src={option.src} />
                    </div>
                  </Grid2>
                ))}
              </Grid2>
            )}

            {field.type === "color" && (
              <input
                id={field.id}
                name={field.id}
                type="color"
                value={formik.values[field.id]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className=" h-10 border border-gray-300 rounded-md"
              />
            )}
          </div>
        ))}
      </form>
    </div>
    </div>);
};

export default VehiclesTypesCreate;


