import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid } from "@mui/x-data-grid";
import { getRequest } from "../../../consts/apiCalls";

const ServiceLevelVehicles = ({id}) => {
  const [showArchived, setShowArchived] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [vehicleTypes, setVehicleTypes] = useState([]);


  // Sample Data
//   const vehicleTypes = [
//     {
//       id: 1,
//       name: "1 - BIKE",
//       rank: "",
//       serviceLevels: [
//         {
//           id: 1,
//           serviceLevel: "HR - Hourly",
//           rank: "",
//           isReattempt: false,
//           selfServe: false,
//           backOffice: true,
//           selfServeApi: false,
//           tenantApi: true,
//           templates: false,
//         },
//       ],
//     },
//     {
//       id: 2,
//       name: "2 - TRUCK",
//       rank: "",
//       serviceLevels: [
//         {
//           id: 2,
//           serviceLevel: "TR - Transport",
//           rank: "",
//           isReattempt: true,
//           selfServe: true,
//           backOffice: false,
//           selfServeApi: true,
//           tenantApi: false,
//           templates: false,
//         },
//       ],
//     },
//   ];

  const handleAccordionChange = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const getVehicles = async () => {
    try {
      const response = await getRequest(`/api/service-level-schedule/${id}/vehicle-first-service-level/availableVehicle`);
      setVehicleTypes(response);
    } catch (error) {
      console.log(error);
    }
  };

  const serviceLevelColumns = [
    {
      field: "serviceLevel",
      headerName: "Service Level",
      flex: 1.5,
      renderCell: (params) => (
        <Typography
          color="#3e4396"
          sx={{ cursor: "pointer", textDecoration: "underline" }}
        >
          {params.value}
        </Typography>
      ),
    },
    { field: "rank", headerName: "Rank", flex: 0.5 },
    {
      field: "isReattempt",
      headerName: "Is Reattempt",
      flex: 0.7,
      renderCell: (params) => (
        <Checkbox checked={params.value} disabled size="small" />
      ),
    },
    {
      field: "selfServe",
      headerName: "Self-Serve",
      flex: 0.7,
      renderCell: (params) => (
        <Checkbox checked={params.value} disabled size="small" />
      ),
    },
    {
      field: "backOffice",
      headerName: "BackOffice",
      flex: 0.7,
      renderCell: (params) => (
        <Checkbox checked={params.value} disabled size="small" />
      ),
    },
    {
      field: "selfServeApi",
      headerName: "Self-Serve API",
      flex: 0.9,
      renderCell: (params) => (
        <Checkbox checked={params.value} disabled size="small" />
      ),
    },
    {
      field: "tenantApi",
      headerName: "Tenant API",
      flex: 0.8,
      renderCell: (params) => (
        <Checkbox checked={params.value} disabled size="small" />
      ),
    },
    {
      field: "templates",
      headerName: "Templates",
      flex: 0.7,
      renderCell: (params) => (
        <Checkbox checked={params.value} disabled size="small" />
      ),
    },
  ];

  return (
    <Box className="w-[90%] mx-auto mt-5">
      {/* Header Section */}
      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h6" fontWeight="bold">
          Vehicle Type - Service Level
        </Typography>
        <Box className="space-x-2">
          <Button variant="outlined">Add Vehicle Type</Button>
          <Button variant="outlined">Add Service Level</Button>
        </Box>
      </Box>

      {/* Show Archived Checkbox */}
      <FormControlLabel
        control={
          <Checkbox
            checked={showArchived}
            onChange={(e) => setShowArchived(e.target.checked)}
          />
        }
        label="Show Archived"
      />

      {/* Collapsible Vehicle Type List */}
      {vehicleTypes.map((vehicle) => (
        <Accordion
          key={vehicle.id}
          expanded={expanded === vehicle.id}
          onChange={() => handleAccordionChange(vehicle.id)}
          sx={{ mt: 1, border: "1px solid #e0e0e0", boxShadow: "none" }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box className="flex w-full">
              <Box className="w-1/2">
                <Typography color="#3e4396" sx={{ cursor: "pointer" }}>
                  {vehicle.name}
                </Typography>
              </Box>
              <Box className="w-1/2">
                <Typography>{vehicle.rank}</Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <DataGrid
              rows={vehicle.serviceLevels}
              columns={serviceLevelColumns}
              autoHeight
              hideFooter
              disableSelectionOnClick
              disableColumnMenu
              rowHeight={40}
              sx={{
                "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
                  border: "1px solid #e0e0e0",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#fafafa",
                  fontWeight: "bold",
                  fontSize: "14px",
                },
                "& .MuiDataGrid-virtualScrollerContent": {
                  fontSize: "13px",
                },
              }}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ServiceLevelVehicles;
