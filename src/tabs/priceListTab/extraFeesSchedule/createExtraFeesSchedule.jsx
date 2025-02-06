import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { getRequest, postRequest } from "../../../consts/apiCalls";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import SubTabNavigator from "../../../components/subTabNavigator";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ExtraFeesConfig from "./ExtraFeesConfig";

const CreateExtraFeesSchedule = () => {
  // Formik setup
  const navigate = useNavigate();
  const { id } = useParams();
  const [extraConfig, setExtraConfig] = useState([]);
  const [openDialog, setOpenDialog] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: "",
      id: "",
      extraFeeConfigs:[],
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
      setExtraConfig(response.extraFeeConfigs);
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
      <div>{id && <ExtraConfigGrid console={extraConfig} setOpenDialog={setOpenDialog} />}</div>
      {id &&<ExtraFeesConfig open={openDialog} handleClose={()=>setOpenDialog(false)} submitForm={()=>console.log('hello')} id={id} />}
    </div>
  );
};

export default CreateExtraFeesSchedule;

const ExtraConfigGrid = ({ ConfigData,setOpenDialog }) => {
  const columns = [
    {
      field: "extraFeeName",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "rate",
      headerName: "Rate",
      flex: 1,
    },
    {
      field: "per",
      headerName: "Per",
      flex: 1,
    },
    {
      field: "max",
      headerName: "Max",
      flex: 1,
    },
    {
      field: "included",
      headerName: "Included",
      flex: 1,
    },
    {
      field: "defaultQuantity",
      headerName: "Default Quantity",
      flex: 1,
    },
    {
      field: "hideDefaultPriceQuantity",
      headerName: "Hide Quantity and Unit Price",
      flex: 1,
    },
    {
      field: "driverCommissionable",
      headerName: "Driver Commissionable",
      flex: 1,
    },
    {
      field: "salesCommissionable",
      headerName: "Sales Commissionable",
      flex: 1,
    },
    {
      field: "visibilityForInternalUser",
      headerName: "Visibility For InternalUser",
      flex: 1,
    },
    {
      field: "visibilitySelfServe",
      headerName: "Visibility for SelfServe",
      flex: 1,
    },
    {
      field: "visibilityDriver",
      headerName: "Visibility for Driver",
      flex: 1,
    },
    {
      field: "fuelSurcharge",
      headerName: "fuelSurcharge",
      flex: 1,
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
    },
  ];

  return (
    <Box className="w-[80%] m-auto mt-8">
      {/* Header Section */}
      <Box className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Configuration Data</h2>
        <button onClick={()=>setOpenDialog(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Add New
        </button>
      </Box>

      {/* DataGrid */}
      <DataGrid
        rows={ConfigData}
        columns={columns}
        onCellClick={(params) => {}}
        className="cursor-pointer"
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        sx={{
          "& .MuiDataGrid-cell , & .MuiDataGrid-columnHeader ": {
            border: "1px solid #e0e0e0", // Border between rows
          },
          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: "#f5f5f5", // Light color for odd rows
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "#ffffff", // White color for even rows
          },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
};
