import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, MenuItem, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getRequest, postRequest, putRequest } from "../../../consts/apiCalls";
import Breadcrumb from "../../../components/Breadcrumb";
import SubTabNavigator from "../../../components/subTabNavigator";
import useToast from "../../../components/toast/useToast";

const FuelSurchargeScheduleCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showSuccess, showError } = useToast();
  const [tables, setTables] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch dropdown data
  const getTables = async () => {
    try {
      const response = await getRequest("/fuel-surcharge-tables");
      setTables(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      name: "",
      defaultFuelSurchargeTableId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      defaultFuelSurchargeTableId: Yup.string().required("Surcharge Table is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (id) {
          await putRequest(`/fuelSurchargeSchedule/${id}`, values);
          showSuccess("Fuel Surcharge Schedule Updated");
        } else {
          await postRequest("/fuelSurchargeSchedule", values);
          showSuccess("Fuel Surcharge Schedule Created");
        }
        navigate("/pricelist/fuel-surcharges-schedule");
      } catch (error) {
        showError(error.message);
      }
    },
  });

  // Fetch data for edit mode
  const fetchSchedule = async () => {
    try {
      setIsLoading(true);
      const response = await getRequest(`/fuelSurchargeSchedule/${id}`);
      formik.setValues({
        name: response.name || "",
        defaultFuelSurchargeTableId: response.defaultFuelSurchargeTableId || "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(formik.errors);

  useEffect(() => {
    getTables();
    if (id) {
      fetchSchedule();
    }
  }, [id]);

  // Breadcrumbs
  const pageBreadcrumbs = [
    { id: 1, label: "Fuel Surcharge Schedules", href: "/pricelist/fuel-surcharges-schedule" },
    { id: 2, label: id ? "Edit Fuel Surcharge Schedule" : "New Fuel Surcharge Schedule", href: "" },
  ];

  return (
    <div className="wraper-container">
      <SubTabNavigator
        data={[
          { lable: "Fuel Surcharges Schedules", url: "/pricelist/fuel-surcharges-schedule", isFilled: true },
          { lable: "Fuel Surcharges Table", url: "/pricelist/fuel-surcharges-table" },
          { lable: "Fuel Prices", url: "/pricelist/fuel-prices" },
          { lable: "Fuel Surcharges Calculator", url: "/pricelist/surcharge-calculator" },
        ]}
      />
      <Breadcrumb items={pageBreadcrumbs} />

      <div className="max-w-[600px] p-4 border border-gray shadow-md mt-4 mb-4">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h5" gutterBottom>
            {id ? "Edit Rule" : "New Rule"}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={formik.handleSubmit}
            disabled={isLoading}
            sx={{ backgroundColor: "#1569CB" }}
          >
            Save
          </Button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm text-gray-700 mb-1 font-semibold"
            >
              NAME
            </label>
            <TextField
              id="name"
              name="name"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
            />
          </div>

          {/* Default Fuel Surcharge Table Dropdown */}
          <div>
            <label
              htmlFor="defaultFuelSurchargeTableId"
              className="block text-sm text-gray-700 mb-1 font-semibold"
            >
              DEFAULT FUEL SURCHARGE TABLE
            </label>
            <TextField
              id="defaultFuelSurchargeTableId"
              name="defaultFuelSurchargeTableId"
              variant="outlined"
              size="small"
              select
              fullWidth
              value={formik.values.defaultFuelSurchargeTableId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.defaultFuelSurchargeTableId &&
                Boolean(formik.errors.defaultFuelSurchargeTableId)
              }
              helperText={
                formik.touched.defaultFuelSurchargeTableId &&
                formik.errors.defaultFuelSurchargeTableId
              }
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
            >
              {tables.map((table) => (
                <MenuItem key={table.id} value={table.id}>
                  {table.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FuelSurchargeScheduleCreate;
