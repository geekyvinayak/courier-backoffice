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
import {
  Typography,
} from "@mui/material";
import useToast from "../../../components/toast/useToast";

const CreateServiceLevel = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  // Formik setup
  const formik = useFormik({
    initialValues: {
      serviceLevelDisplayId: "",
      name: "",
      description: "",
      color: "",
      archived: false,
    },
    validationSchema: Yup.object({
      serviceLevelDisplayId: Yup.string().required("Id is required"),
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await postRequest("/api/service-level", values);
        if(id) {
        showSuccess("Service Level Updated");
        }
        showSuccess("Service Level Added");
        navigate("/pricelist/servicelevels");
      } catch (error) {
        console.log(error);
        showError(error.message);
      }
    },
  });

  const { id } = useParams();

  const getServiceLevel = async () => {
    try {
      const response = await getRequest(`/api/service-level/${id}`);
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
      label: "Service Levels",
      href: "/pricelist/servicelevels",
    },
    {
      id: 2,
      label: id ? "Edit Service Levels" : "New Service Levels",
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
          },
          { lable: "Service Levels", url: "/pricelist/servicelevels",isFilled:true },
        ]}
      />
      <Breadcrumb items={pageBreadcrums} />
      <div className="max-w-[600px] p-4 border border-gray shadow-md mt-4 mb-4">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h3" gutterBottom>
            {id ? "Edit" : "New"} Service Level
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
            <label
              htmlFor="serviceLevelDisplayId"
              className="block text-sm text-gray-700 mb-1 font-semibold"
            >
              ID
            </label>
            <TextField
              id="serviceLevelDisplayId"
              name="serviceLevelDisplayId"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.serviceLevelDisplayId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.serviceLevelDisplayId && Boolean(formik.errors.serviceLevelDisplayId)
              }
              helperText={formik.touched.serviceLevelDisplayId && formik.errors.serviceLevelDisplayId}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm text-gray-700 mb-1 font-semibold"
            >
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
              htmlFor="description"
              className="block text-sm text-gray-700 mb-1 font-semibold"
            >
              Description
            </label>
            <TextField
              id="description"
              name="description"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
            />
          </div>
          <div>
            <label
              htmlFor="color"
              className="block text-sm text-gray-700 mb-1 font-semibold"
            >
              Color
            </label>
            <TextField
              id="color"
              name="color"
              variant="outlined"
              size="small"
              type="color"
              fullWidth
              value={formik.values.color}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.color && Boolean(formik.errors.color)}
              helperText={formik.touched.color && formik.errors.color}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
              style={{
                width: "20%",
                height: "40px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServiceLevel;
