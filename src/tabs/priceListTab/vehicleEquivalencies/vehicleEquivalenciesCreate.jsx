import React, { useState, useEffect } from 'react';
import { Formik, Field, Form  } from 'formik';
import { Checkbox, FormControl, InputLabel, MenuItem, Select, FormControlLabel, Button, Typography, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import axios from 'axios';
import { getRequest, postRequest } from '../../../consts/apiCalls';
import SubTabNavigator from '../../../components/subTabNavigator';
import { useNavigate } from 'react-router-dom';
import useToast from '../../../components/toast/useToast';

const VehicleEquivalenciesForm = () => {
   const nav = useNavigate();
   const { showSuccess, showError } = useToast();
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVehicleEquivalencies, setSelectedVehicleEquivalencies] = useState([]);
  const [selectedVehicledDisplayId, setSelectedDisplayId] = useState(null);
  const [equivalencies, setEquivalencies] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch all available vehicles initially
    const fetchVehicles = async () => {
      try {
        const response = await getRequest("/vehicleType"); // API call to fetch vehicles
        setVehicles(response);
      } catch (error) {
        console.error("Error fetching vehicles", error);
      }
    };
    fetchVehicles();
  }, []);
  // Function to handle vehicle selection and fetch equivalencies
  const handleVehicleSelect = async (displayId,setFieldValue) => {
    // Find the selected vehicle by displayId
    const selectedVehicle = vehicles.find(vehicle => vehicle.displayId === displayId);

    // Set the vehicle id for the backend API call
    setSelectedVehicle(selectedVehicle.id);
    setSelectedDisplayId(selectedVehicle.displayId)
    setEquivalencies([]); // Clear previous equivalencies

    try {
      // Fetch equivalencies using the vehicle id (not displayId)
      const response = await getRequest(`/vehicleEquivalency/availableVehicleId/${selectedVehicle.id}`);
      const response2 = await getRequest(`/vehicleEquivalency/${selectedVehicle.displayId}`);
      setEquivalencies(response);
      setSelectedVehicleEquivalencies(response2?.equivalencyIds?.split(","))
      // Set the equivalency of the selected vehicle as checked by default
      setFieldValue('equivalencies', [selectedVehicle.displayId.toString()]);
    } catch (error) {
      console.error("Error fetching equivalencies", error);
    }
  };

  // Form submission handler
  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await postRequest('/vehicleEquivalency', {
        vehicleId: values.vehicleId,
        equivalencyIds: values.equivalencies.join(','),
      });
      nav("/pricelist/vehicleequivalencies");
      showSuccess("vehicleEquivalency Added");
    } catch (error) {
      console.error("Error submitting form", error);
      showError("something went wrong please try again")
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='pb-4'>
    <SubTabNavigator
    data={[
      {
        lable: "Vehicle Types",
        url: "/pricelist/vehiclestype",
        
      },
      {
        lable: "Vehicle Equivalencies",
        url: "/pricelist/vehicleequivalencies",
        isFilled: true,
      },
    ]}
  />
  <div className="max-w-[600px] p-4 border border-gray shadow-md ml-4 mt-4 mb-4">
    <Formik
      initialValues={{
        vehicleId: '',
        equivalencies: [],
      }}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form>
          <Box
                marginBottom={2}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography variant="h3" gutterBottom>
                  Vehicle Information
                </Typography>
                {/* Submit Button */}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    // Red border (you can change the color)
                    backgroundColor: "#1569CB",
                  }}
                >
                  Save
                </Button>
              </Box>
          {/* Vehicle Selection Dropdown */}
          <FormControl fullWidth margin="normal">
          <Typography variant="subtitle1" gutterBottom>
          Vehicle Types
          </Typography>
            <Select
              name="vehicleId"
              value={values.vehicleId}
              onChange={e => {
                handleChange(e);
                handleVehicleSelect(e.target.value,setFieldValue);
              }}
              fullWidth
            >
              {vehicles.map((vehicle) => (
                <MenuItem key={vehicle.id} value={vehicle.displayId}>
                  {vehicle.name} - {vehicle.displayId}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Equivalencies Checkbox */}
          {equivalencies.length > 0 && (
            <div>
              <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Vehicle Type</TableCell>
            <TableCell>Equivalencies</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
              {equivalencies.map((equivalency) => (
                <TableRow key={equivalency}>
                  <TableCell style={{ padding: '8px' }}>
                <FormControlLabel
                  key={equivalency}
                  control={
                    
                    <Checkbox
                      name="equivalencies"
                      value={equivalency}
                      checked={values.equivalencies.includes(equivalency) || selectedVehicleEquivalencies.includes(equivalency) }
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        const updatedEquivalencies = checked
                          ? [...values.equivalencies, value]
                          : values.equivalencies.filter((v) => v !== value);
                        setFieldValue('equivalencies', updatedEquivalencies);
                        // Also remove from selectedVehicleEquivalencies if unchecked
                        if (!checked) {
                          setSelectedVehicleEquivalencies((prev) => prev.filter((v) => v !== value));
                        }
                      }}
                      disabled={equivalency === selectedVehicledDisplayId?.toString()}
                    />
                   }
                /></TableCell>
                 <TableCell style={{ padding: '8px' }}>{equivalency}</TableCell>
                </TableRow>
              ))}
              </TableBody>
              </Table>
              </TableContainer>
            </div>
          )}

        </Form>
      )}
    </Formik>
    </div>
    </div>
  );
};

export default VehicleEquivalenciesForm;
