import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getRequest, postRequest, putRequest } from "../../../consts/apiCalls";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import SubTabNavigator from "../../../components/subTabNavigator";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import useToast from "../../../components/toast/useToast";

const FuleSurchargesCalculatorCreate = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "Formula",
      formula: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      formula: Yup.string().required("Formula is required"),
    }),

    onSubmit: async (values) => {
      try {
        if (id) {
          const response = await putRequest(`/users/${id}`, values);
          showSuccess("User Updated");
          navigate("/settings/system/users");
        } else {
          const response = await postRequest("/users", values);
          showSuccess("User Added");
          navigate("/settings/system/users");
        }
      } catch (error) {
        console.log(error);
        showError(error.message);
      }
    },
  });

  const { id } = useParams();

  const getUser = async () => {
    try {
      const response = await getRequest(`/users/${id}`);
      formik.setValues(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  const pageBreadcrums = [
    {
      id: 1,
      label: "Surcharges Calculator",
      href: "/pricelist/system/users",
    },
    {
      id: 2,
      label: id ? "Edit Surcharges Calculator" : "New Surcharges Calculator",
      href: "",
    },
  ];

  return (
    <div className="wraper-container">
      <SubTabNavigator
        data={[
          {
            lable: "Fule Surcharges Schedules",
            url: "/pricelist/extrafeesschedule",
          },
          { lable: "Fule Surcharges Table", url: "/pricelist/extrafees" },
          { lable: "Fule Prices", url: "/pricelist/extrafees" },
          {
            lable: "Fule Surcharges Calculator",
            url: "/pricelist/surcharge-calculator",
            isFilled: true,
          },
        ]}
      />
      <Breadcrumb items={pageBreadcrums} />
      <div className="max-w-[600px] p-4 border border-gray shadow-md mt-4 mb-4">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h3" gutterBottom>
            {id ? "Edit" : "New"} Surcharge Calculator
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
              htmlFor="firstName"
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
              error={formik.touched.firstName && Boolean(formik.errors.name)}
              helperText={formik.touched.firstName && formik.errors.name}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Typography variant="body1" gutterBottom>
              PRICING METHOD
            </Typography>
            <FormControl>
              <RadioGroup
                value={formik.values.type}
                onChange={(e) => {
                  formik.setFieldValue("type", e.target.value);
                }}
                row
              >
                <FormControlLabel
                  value="Formula"
                  control={<Radio />}
                  label="Formula"
                />
                <FormControlLabel
                  value="Sheet"
                  control={<Radio />}
                  label="Sheet"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FuleSurchargesCalculatorCreate;
