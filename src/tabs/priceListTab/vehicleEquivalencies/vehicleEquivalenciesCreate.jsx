import React from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
  Grid2,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AccessAlarm,
  AccountBox,
  Alarm,
  AttachMoney,
} from "@mui/icons-material";
import Breadcrumb from "../../../components/Breadcrumb";
import SubTabNavigator from "../../../components/subTabNavigator";

const VehicleEquivalenciesCreate = () => {
  const validationSchema = Yup.object({
    id: Yup.string().required("ID is required"),
    nameEn: Yup.string().required("Name (English) is required"),
    optimizationProfile: Yup.string().required(
      "Optimization profile is required",
    ),
    maximumNumberofPieces: Yup.string().required(
      "Maximum number of pieces is required",
    ),
    maximumVolumeFT: Yup.string().required("Maximum volume (ft³) is required"),
    maximumWeight: Yup.string().required("Maximum weight is required"),
    dispatchOptionOnVehicleCapacityOverage: Yup.string().required(
      "Dispatch option on vehicle capacity overage is required",
    ),
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

  const fields = [
    { id: "id", label: "ID", type: "text" },
    { id: "nameEn", label: "Name (EN)", type: "text" },
    {
      id: "optimizationProfile",
      label: "Optimization Profile",
      type: "select",
      options: options.optimizationProfile,
    },
    {
      id: "maximumNumberofPieces",
      label: "Maximum Number of Pieces",
      type: "text",
    },
    { id: "maximumVolumeFT", label: "Maximum Volume (ft³)", type: "text" },
    { id: "maximumWeight", label: "Maximum Weight", type: "text" },
    {
      id: "dispatchOptionOnVehicleCapacityOverage",
      label: "Dispatch Option on Vehicle Capacity Overage",
      type: "select",
      options: options.dispatchOptionOnVehicleCapacityOverage,
    },
    { id: "baseFuelMileage", label: "Base Fuel Mileage", type: "text" },
    { id: "color", label: "Color", type: "color" },
    { id: "icon", label: "Icon", type: "select", options: options.icons },
  ];

  const pageBreadcrums = [
    {
      id: 1,
      label: "Vehicles",
      href: "/pricelist/vehiclestype",
    },
    {
      id: 2,
      label: "New Vehicle Equivalance",
      href: "/products",
    },
  ];

  return (
    <div className="ml-5">
      <Breadcrumb items={pageBreadcrums} />
      will complete with live data
    </div>
  );
};

export default VehicleEquivalenciesCreate;
