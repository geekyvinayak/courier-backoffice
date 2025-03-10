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
  const [openDialog, setOpenDialog] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      id: "",
      extraFeeConfigs: [],
      active: false,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: async (values) => {
      try {
        // if (id) {
        //   const response = await postRequest(
        //     `/extraFeeSchedule/extraFee/${id}`,
        //     values,
        //   );
        // } else {
          const response = await postRequest("/extraFeeSchedule", values);
        // }
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

  const handleExtraConfig = async (configJson) => {
    const existingConfigs = formik.values.extraFeeConfigs || [];

    const updatedConfigs = existingConfigs.some(
      (config) => config.id === configJson.id,
    )
      ? existingConfigs.map((config) =>
          config.id === configJson.id ? configJson : config,
        )
      : [...existingConfigs, configJson];
    formik.setFieldValue("extraFeeConfigs", updatedConfigs);
    // setOpenDialog(false);
    let body = {
      name: formik.values.name,
      id,
      extraFeeConfigs: updatedConfigs,
      active: formik.values.active,
      file: "null",
    };
    const response = await postRequest(
      `/extraFeeSchedule/extraFee/${id}`,
      body,
      {
        "Content-Type": "multipart/form-data",
      },
    );
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
      label: id?"Edit Extra Fee Schedules":"New Extra Fee Schedules",
      href: "",
    },
  ];

  const [configId,setConfigId] = useState();

  return (
    <div className="wraper-container">
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
      <div className="max-w-[600px] p-4 border border-gray mt-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h3" gutterBottom>
            {id?"Edit":"New"} Extra Fee Schedules
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
        </form>
      </div>
      <div>
        {id && (
          <ExtraConfigGrid
            ConfigData={extraConfig}
            setOpenDialog={setOpenDialog}
            setConfigId={setConfigId}
          />
        )}
      </div>
      {id && openDialog && (
        <ExtraFeesConfig
          open={openDialog}
          handleClose={() => {setOpenDialog(false);fetchExtraFeesSchedule()}}
          id={id}
          configId={configId}
        />
      )}
    </div>
  );
};

export default CreateExtraFeesSchedule;

const ExtraConfigGrid = ({ ConfigData, setOpenDialog, setConfigId }) => {
  const columns = [
    {
      field: "extraFeeName",
      headerName: "Name",
      flex: 1,
      minWidth: 150, 
      cellClassName:"!text-[#3e4396]",
    },
    {
      field: "type",
      headerName: "Type",
     minWidth: 150, 
      flex: 1,
    },
    {
      field: "rate",
      headerName: "Rate",
      minWidth: 150, 
      flex: 1,
    },
    {
      field: "per",
      headerName: "Per",
      minWidth: 150, 
      flex: 1,
    },
    {
      field: "max",
      headerName: "Max",
    minWidth: 150, 
      flex: 1,
    },
    {
      field: "included",
      headerName: "Included",
    minWidth: 150, 
      flex: 1,
    },
    {
      field: "defaultQuantity",
      headerName: "Default Quantity",
    minWidth: 150, 
      flex: 1,
    },
    {
      field: "hideDefaultPriceQuantity",
      headerName: "Hide Quantity and Unit Price",
    minWidth: 350, 
      flex: 1,
    },
    {
      field: "driverCommissionable",
      headerName: "Driver Commissionable",
  minWidth: 250, 
      flex: 1,
    },
    {
      field: "salesCommissionable",
      headerName: "Sales Commissionable",
  minWidth: 150, 
      flex: 1,
    },
    {
      field: "visibilityForInternalUser",
      headerName: "Visibility For InternalUser",
     minWidth: 350, 
      flex: 1,
    },
    {
      field: "visibilitySelfServe",
      headerName: "Visibility for SelfServe",
    minWidth: 150, 
      flex: 1,
    },
    {
      field: "visibilityDriver",
      headerName: "Visibility for Driver",
     minWidth: 150, 
      flex: 1,
    },
    {
      field: "fuelSurcharge",
      headerName: "fuelSurcharge",
     minWidth: 150, 
      flex: 1,
    },
    {
      field: "priority",
      headerName: "Priority",
      minWidth: 150, 
      flex: 1,
    },
  ];

  return (
    <Box className="mx-auto w-[90%] mt-5">
      {/* Header Section */}
      <Box className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Configuration Data</h2>
        <button
          onClick={() => {setOpenDialog(true);setConfigId(null)}}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add New Config
        </button>
      </Box>

      {/* DataGrid */}
      <DataGrid
        rows={ConfigData}
        columns={columns}
        onCellClick={(params) => {setOpenDialog(true);setConfigId(params.id)}}
        className="cursor-pointer"
        scroll={{ x: true }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        rowHeight={45}
         columnHeaderHeight={45}
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
          "& .MuiDataGrid-columnHeaders": {
            fontWeight: "bold", // Bold text
            fontSize: "14px", // Increase font size
          },
          "& .MuiDataGrid-virtualScrollerContent":{
            fontWeight: "500", // Bold text
            fontSize: "12px",
          },
          '& .MuiDataGrid-columnHeaders': { minWidth: '100%' },
          '& .MuiDataGrid-root': { overflowX: 'auto' },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
};
