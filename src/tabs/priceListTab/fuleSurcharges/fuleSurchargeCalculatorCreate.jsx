import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getRequest, postRequest, putRequest } from "../../../consts/apiCalls";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
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
import axios from "axios";

const FuelSurchargesCalculatorCreate = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "Formula",
      formula: "",
      sheetContent: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      formula: Yup.string().when("type", {
        is: "Formula",
        then: () => Yup.string().required("Formula is required"),
        otherwise: () => Yup.string(),
      }),
      sheetContent: Yup.string().when("type", {
        is: "Sheet",
        then: () => Yup.string().required("Sheet content is required when no file is uploaded"),
        otherwise: () => Yup.string(),
      }),
    }),

    onSubmit: async (values) => {
      try {
        const dto = JSON.stringify({
          name: values.name,
          type: values.type,
          formula: values.formula,
        });

        if (id) {
          const response = await putRequest(
            `/surcharge-calculators/${id}`,
            {
              dto: dto,
              sheetContent: values.sheetContent,
            },
            { "Content-Type": "multipart/form-data" }
          );
          showSuccess("Surcharge Calculator Updated");
          navigate("/pricelist/surcharge-calculator");
        } else {
          const response = await postRequest(
            "/surcharge-calculators",
            {
              dto: dto,
              sheetContent: values.sheetContent,
            },
            { "Content-Type": "multipart/form-data" }
          );
          showSuccess("Surcharge Calculator Added");
          navigate("/pricelist/surcharge-calculator");
        }
      } catch (error) {
        console.log(error);
        showError(error.message);
      }
    },
  });

  const { id } = useParams();

  const getCalculatorsData = async () => {
    try {
      const response = await getRequest(`/surcharge-calculators/${id}`);
      setIsLoading(true);
      formik.setValues(response);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleDownloadTemplate = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: id
          ? `${process.env.REACT_APP_BACKEND_URL}/surcharge-calculators/${id}/download-sheet`
          : `${process.env.REACT_APP_BACKEND_URL}/surcharge-calculators/download-template`,
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "*/*",
        },
      });

      const contentDisposition = response.headers["content-disposition"];
      let filename = "";

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(
          /filename\*?=(?:UTF-8'')?["']?([^;"'\n]*)["']?/
        );
        if (filenameMatch && filenameMatch[1]) {
          filename = decodeURIComponent(filenameMatch[1]);
        }
      }

      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showSuccess("File downloaded successfully!");
    } catch (error) {
      showError("Error downloading file ");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getCalculatorsData();
    }
  }, [id]);

  const pageBreadcrums = [
    {
      id: 1,
      label: "Surcharges Calculator",
      href: "/pricelist/surcharge-calculator",
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
          { lable: "Fuel Surcharges Schedules", url: "/pricelist/fuel-surcharges-schedule" },
          { lable: "Fuel Surcharges Table", url: "/pricelist/fuel-surcharges-table" },
          { lable: "Fuel Prices", url: "/pricelist/fuel-prices" },
          { lable: "Fuel Surcharges Calculator", url: "/pricelist/surcharge-calculator", isFilled:true },
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
                <FormControlLabel value="Formula" control={<Radio />} label="Formula" />
                <FormControlLabel value="Sheet" control={<Radio />} label="Sheet" />
              </RadioGroup>
            </FormControl>
          </div>

          {/* Conditional rendering based on selected type */}
          {formik.values.type === "Formula" ? (
            <div>
              <label htmlFor="formula" className="block text-sm text-gray-700 mb-1 font-semibold">
                Formula
              </label>
              <TextField
                id="formula"
                name="formula"
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={4}
                value={formik.values.formula}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.formula && Boolean(formik.errors.formula)}
                helperText={formik.touched.formula && formik.errors.formula}
                FormHelperTextProps={{ sx: { marginLeft: 0 } }}
              />
            </div>
          ) : (
            <div>
              <div className="mt-4">
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <label>FILE</label>
                  <input
                    type="file"
                    name="sheetContent"
                    onChange={(event) =>
                      formik.setFieldValue("sheetContent", event.currentTarget.files[0])
                    }
                  />
                </FormControl>
                {/* <FileUploadComponent onFileSelect={handleFileSelect} /> */}
              </div>
              <div className="justify-center">
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleDownloadTemplate}
                  disabled={isLoading}
                  sx={{
                    backgroundColor: "transparent !important", // Custom color for this specific button
                    color: "black !important",
                    border: "1px solid black !important",
                  }}
                  className="mb-2 max-w-fit gap-2 !bg-white "
                >
                  <FileDownloadOutlinedIcon /> {id ? "Download File" : "Download Template"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FuelSurchargesCalculatorCreate;
