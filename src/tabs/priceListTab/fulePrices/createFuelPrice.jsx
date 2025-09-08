import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../../../components/toast/useToast";
import { getRequest, postRequest } from "../../../consts/apiCalls";
import { useFormik } from "formik";
import * as Yup from "yup";
import SubTabNavigator from "../../../components/subTabNavigator";
import Breadcrumb from "../../../components/Breadcrumb";
import { Button, TextField, Typography } from "@mui/material";
import FuelEntries from "./fuelEntries";

export default function CreateFuelPrice() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const getFuelPrices = async () => {
    try {
      setIsLoading(true);
      const response = await getRequest(`/fuel-prices/${id}`);
      formik.setValues(response);
    } catch (error) {
      console.log(error);
      showError("Something wnt wrong.");
    }
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      id: "",
      entries: [],
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await postRequest("/fuel-prices", values);
        navigate("/pricelist/fuel-prices");
      } catch (error) {
        console.log(error);
        showError("Something went wrong.")
      }
    },
  });

  useEffect(() => {
    if (id) {
      getFuelPrices();
    }
  }, [id]);
  const pageBreadcrums = [
    {
      id: 1,
      label: "Fuel Prices",
      href: "/pricelist/fuel-prices",
    },
    {
      id: 2,
      label: id ? "Edit Fuel Price" : "New Fuel Price",
      href: "",
    },
  ];
  return (
    <div className="wraper-container">
      <SubTabNavigator
        data={[
          { lable: "Fuel Surcharges Schedules", url: "/pricelist/fuel-surcharges-schedule" },
          { lable: "Fuel Surcharges Table", url: "/pricelist/fuel-surcharges-table" },
          { lable: "Fuel Prices", url: "/pricelist/fuel-prices", isFilled: true},
          { lable: "Fuel Surcharges Calculator", url: "/pricelist/surcharge-calculator" },
        ]}
        filled={true}
      />
      <Breadcrumb items={pageBreadcrums} />
      <div className="max-w-[600px] p-4 border border-gray mt-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h3" gutterBottom>
            {id ? "Edit" : "New"} Fuel Price
          </Typography>
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
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
            />
          </div>
          <div className="mt-3">
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h3" gutterBottom>
                Prices
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={()=>setShowDialog(true)}
              >
                Add Price
              </Button>
            </div>
            <FuelEntries getFuelPrices={getFuelPrices} entries={formik.values.entries} loading={isLoading} showDialog={showDialog} setShowDialog={setShowDialog}/>
          </div>
        </form>
      </div>
    </div>
  );
}
