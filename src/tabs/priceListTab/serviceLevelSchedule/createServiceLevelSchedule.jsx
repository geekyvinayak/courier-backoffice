import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getRequest, postRequest } from "../../../consts/apiCalls";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import SubTabNavigator from "../../../components/subTabNavigator";
import { Select, Typography, MenuItem } from "@mui/material";
import useToast from "../../../components/toast/useToast";

const CreateServiceLevelSchedule = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      selectionSequence: "ServiceLevelFirstThenVehicle",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await postRequest("/api/service-level-schedule", values);
        if (id) {
          showSuccess("Service Level Schedule Updated");
        }
        showSuccess("Service Level Schedule Added");
        navigate("/pricelist/servicelevelschedule");
      } catch (error) {
        console.log(error);
        showError(error.message);
      }
    },
  });

  const { id } = useParams();

  const getServiceLevel = async () => {
    try {
      const response = await getRequest(
        `/api/service-level-schedule/${id}/vehicle-first-service-level/availableVehicle`
      );
      console.log(response);
      formik.setValues(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getServiceLevel();
    }
  }, [id]);

  const pageBreadcrums = [
    {
      id: 1,
      label: "Service Level Schedule",
      href: "/pricelist/servicelevelschedule",
    },
    {
      id: 2,
      label: id ? "Edit Service Level Schedule" : "New Service Level Schedule",
      href: "",
    },
  ];

  return (
    <div className="wraper-container">
      <SubTabNavigator
        data={[
          {
            lable: "Service Level Schedules",
            url: "/pricelist/servicelevelschedule",
            isFilled: true,
          },
          { lable: "Service Levels", url: "/pricelist/servicelevels" },
        ]}
      />
      <Breadcrumb items={pageBreadcrums} />
      <div className="max-w-[600px] p-4 border border-gray shadow-md mt-4 mb-4">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h3" gutterBottom>
            {id ? "Edit" : "New"} Service Level Schedule
          </Typography>
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            className="bg-blue-500"
            type="submit"
            color="primary"
            sx={{
              // Red border (you can change the color)
              backgroundColor: "#1569CB",
            }}
          >
            Save
          </Button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-700 mb-1 font-semibold">
              Name
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
          <div>
            <label
              htmlFor="selectionSequence"
              className="block text-sm text-gray-700 mb-1 font-semibold"
            >
              Selection Sequence
            </label>
            <Select
              id="selectionSequence"
              name="type"
              value={formik.values.selectionSequence}
              onChange={(event) => formik.setFieldValue("discountType", event.target.value)}
              fullWidth
              size="small"
              disabled={id ? true : false}
            >
              <MenuItem value="VehicleFirstThenServiceLevel">
                Vehicle First Then, Service Level
              </MenuItem>
              <MenuItem value="ServiceLevelFirstThenVehicle">
                Service Level First Then, Vehicle
              </MenuItem>
            </Select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServiceLevelSchedule;
