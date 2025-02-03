import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { getRequest, postRequest } from "../../../consts/apiCalls";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import SubTabNavigator from "../../../components/subTabNavigator";

const CreateExtraFeesSchedule = () => {
  // Formik setup
  const navigate = useNavigate();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      name: "",
      id: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await postRequest("/extraFeeSchedule", {
          extraFeeConfigs: [],
          active: false,
          ...values,
        });
        console.log(response);
        navigate("/pricelist/extrafeesschedule");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const fetchExtraFeesSchedule = async () => {
    try {
      const response = await getRequest(`/extraFeeSchedule/${id}`);
      formik.setValues(response);
    } catch (error) {
      console.error("Error fetching pricing list:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchExtraFeesSchedule();
    }
  }, [id]);

  const pageBreadcrums = [
    {
      id: 1,
      label: "Extra Fee Schedule",
      href: "/pricelist/extrafeesschedule",
    },
    {
      id: 2,
      label: "New Extra Fee Schedules",
      href: "",
    },
  ];

  return (
    <div>
      <SubTabNavigator
        data={[
          { lable: "Extra Fee Schedules", url: "/pricelist/extrafeesschedule" },
          { lable: "Extra Fee", url: "/pricelist/extrafees" },
        ]}
      />
      <Breadcrumb items={pageBreadcrums} />
      <div className="bg-gray-100 p-6 rounded-md max-w-xl mx-auto shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-bold">New Extra Fee Schedules</h1>
          <Button variant="contained" onClick={formik.handleSubmit}>
            Save
          </Button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              NAME
            </label>
            <TextField
              id="name"
              name="name"
              variant="outlined"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExtraFeesSchedule;
