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
import { Typography } from "@mui/material";

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
          {
            lable: "Extra Fee Schedules",
            url: "/pricelist/extrafeesschedule",
            isFilled: true,
          },
          { lable: "Extra Fee", url: "/pricelist/extrafees" },
        ]}
      />
      <Breadcrumb items={pageBreadcrums} />
      <div className="max-w-[600px] p-4 border border-gray shadow-md ml-4 mt-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h3" gutterBottom>
            New Extra Fee Schedules
          </Typography>
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
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
