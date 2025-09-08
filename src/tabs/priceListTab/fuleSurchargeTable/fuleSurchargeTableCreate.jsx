import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getRequest, postRequest, putRequest } from "../../../consts/apiCalls";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SubTabNavigator from "../../../components/subTabNavigator";
import {
  MenuItem,
  Typography,
} from "@mui/material";
import useToast from "../../../components/toast/useToast";
import { FuleSurchargeDetail } from "./fuleSurchargeDetail";

const FuleSurchargeTableCreate = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [fules, setFules] = useState([]);
  const [calculator, setCalculator] = useState([]);


  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      defaultMode: "FIXED_PERCENTAGE",
      defaultSurcharge: "",
      fuelCalculatorId: "",
      fuelPriceId: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      defaultMode: Yup.string().required("Mode is required"),
      fuelCalculatorId: Yup.string().when('defaultMode', {
        is: (value) => value === 'CALCULATED_PRICE_PER_DISTANCE' || value === 'CALCULATED_PERCENTAGE',
        then: (schema) => schema.required("Calculator ID is required"),
        otherwise: (schema) => schema.notRequired()
      }),
      fuelPriceId: Yup.string().when('defaultMode', {
        is: (value) => value === 'CALCULATED_PRICE_PER_DISTANCE' || value === 'CALCULATED_PERCENTAGE',
        then: (schema) => schema.required("Price ID is required"),
        otherwise: (schema) => schema.notRequired()
      }),
      defaultSurcharge: Yup.number().when('defaultMode', {
        is: (value) => value === 'FIXED_PERCENTAGE' || value === 'FIXED_PRICE_PER_DISTANCE',
        then: (schema) => schema.required("Charges is required"),
        otherwise: (schema) => schema.notRequired()
      }),
    }),

    onSubmit: async (values) => {
      try {
        let formValues = {};
        if (values.defaultMode === 'CALCULATED_PRICE_PER_DISTANCE' || values.defaultMode === 'CALCULATED_PERCENTAGE') {
          formValues = {
            name: values.name,
            defaultMode: values.defaultMode,
            fuelCalculatorId: values.fuelCalculatorId,
            fuelPriceId: values.fuelPriceId
          };
        } else {
          formValues = {
            name: values.name,
            defaultMode: values.defaultMode,
            defaultSurcharge: values.defaultSurcharge
          }
        }
        if (id) {
          await putRequest(
            `/fuel-surcharge-tables/${id}`,
            formValues
          );
          showSuccess("Surcharge Table Updated");
          navigate("/pricelist/fuel-surcharges-table");
        } else {
          await postRequest(
            "/fuel-surcharge-tables",
            formValues
          );
          showSuccess("Surcharge Table Added");
          navigate("/pricelist/fuel-surcharges-table");
        }
      } catch (error) {
        console.log(error);
        showError(error.message);
      }
    },
  });

  const { id } = useParams();

  const getTableData = async () => {
    try {
      const response = await getRequest(`/fuel-surcharge-tables/${id}`);
      setIsLoading(true)
      formik.setValues(response);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
  };

  useEffect(() => {
    if (id) {
      getTableData();
    }
  }, [id]);

  useEffect(() => {
    if (formik.values.defaultMode == 'CALCULATED_PERCENTAGE' || formik.values.defaultMode == 'CALCULATED_PRICE_PER_DISTANCE') {
      getFulePrices();
      getCalculator();
    }
  }, []);

  const pageBreadcrums = [
    {
      id: 1,
      label: "Fuel Surcharges Table",
      href: "/pricelist/fuel-surcharges-table",
    },
    {
      id: 2,
      label: id ? "Edit Fuel Surcharges Table" : "New Fuel Surcharges Table",
      href: "",
    },
  ];

  const getFulePrices = async () => {
    try {
      const response = await getRequest(`/fuel-prices`);
      setFules(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getCalculator = async () => {
    try {
      const response = await getRequest(`/surcharge-calculators`);
      setCalculator(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wraper-container">
      <SubTabNavigator
        data={[
          { lable: "Fuel Surcharges Schedules", url: "/pricelist/fuel-surcharges-schedule" },
          { lable: "Fuel Surcharges Table", url: "/pricelist/fuel-surcharges-table", isFilled: true },
          { lable: "Fuel Prices", url: "/pricelist/fuel-prices" },
          { lable: "Fuel Surcharges Calculator", url: "/pricelist/surcharge-calculator" },
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
          {id && <div>
            <label
              className="block text-sm text-gray-700 mb-1 font-semibold"
            >
              Mode
            </label>
            {formik.values.defaultMode}
          </div>}
          {!id && <div>
            <label
              htmlFor="mode"
              className="block text-sm text-gray-700 mb-1 font-semibold"
            >
              Mode
            </label>
            <TextField
              id="mode"
              name="defaultMode"
              variant="outlined"
              size="small"
              fullWidth
              select
              value={formik.values.defaultMode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.defaultMode && Boolean(formik.errors.defaultMode)}
              helperText={formik.touched.defaultMode && formik.errors.defaultMode}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
            >
              <MenuItem value="FIXED_PERCENTAGE">Fixed Percentage</MenuItem>
              <MenuItem value="FIXED_PRICE_PER_DISTANCE">Fixed Price per Distance</MenuItem>
              <MenuItem value="CALCULATED_PERCENTAGE">Calculated Percentage</MenuItem>
              <MenuItem value="CALCULATED_PRICE_PER_DISTANCE">Calculated Price per Distance</MenuItem>
            </TextField>
          </div>}
          {(formik.values.defaultMode == 'FIXED_PERCENTAGE' || formik.values.defaultMode == 'FIXED_PRICE_PER_DISTANCE') &&
            <div>
              <label
                htmlFor="charges"
                className="block text-sm text-gray-700 mb-1 font-semibold"
              >
                Charges {formik.values.mode == 'FixedPricePerDistance' ? '($)' : '(%)'}
              </label>
              <TextField
                id="charges"
                name="defaultSurcharge"
                variant="outlined"
                size="small"
                fullWidth
                type="number"
                value={formik.values.defaultSurcharge}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.defaultSurcharge && Boolean(formik.errors.defaultSurcharge)}
                helperText={formik.touched.defaultSurcharge && formik.errors.defaultSurcharge}
                FormHelperTextProps={{ sx: { marginLeft: 0 } }}
              />
            </div>}
          {
            (formik.values.defaultMode == 'CALCULATED_PERCENTAGE' || formik.values.defaultMode == 'CALCULATED_PRICE_PER_DISTANCE') &&
            <div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm text-gray-700 mb-1 font-semibold"
                >
                  Price
                </label>
                <TextField
                  id="price"
                  name="fuelPriceId"
                  variant="outlined"
                  size="small"
                  fullWidth
                  select
                  value={formik.values.fuelPriceId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.fuelPriceId && Boolean(formik.errors.fuelPriceId)}
                  helperText={formik.touched.fuelPriceId && formik.errors.fuelPriceId}
                  FormHelperTextProps={{ sx: { marginLeft: 0 } }}
                >
                  {fules.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div>
                <label
                  htmlFor="calculator"
                  className="block text-sm text-gray-700 mb-1 font-semibold"
                >
                  Calculator
                </label>
                <TextField
                  id="calculator"
                  name="fuelCalculatorId"
                  variant="outlined"
                  size="small"
                  fullWidth
                  select
                  value={formik.values.fuelCalculatorId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.fuelCalculatorId && Boolean(formik.errors.fuelCalculatorId)}
                  helperText={formik.touched.fuelCalculatorId && formik.errors.fuelCalculatorId}
                  FormHelperTextProps={{ sx: { marginLeft: 0 } }}
                >
                  {calculator.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
          }
          {id && <FuleSurchargeDetail formik={formik} id={id} />}
        </form>
      </div>
    </div>
  );
};

export default FuleSurchargeTableCreate;

