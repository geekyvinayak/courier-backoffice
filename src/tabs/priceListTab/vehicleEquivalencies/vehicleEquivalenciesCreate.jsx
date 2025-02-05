import React, { useState, useEffect } from 'react';
import { Formik, Field, Form  } from 'formik';
import { Checkbox, FormControl, InputLabel, MenuItem, Select, FormControlLabel, Button } from '@mui/material';
import axios from 'axios';
import { getRequest, postRequest } from '../../../consts/apiCalls';

const VehicleEquivalenciesForm = () => {
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
  console.log("selected vehicle",selectedVehicledDisplayId)
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
      console.log("rs",response2)
      setSelectedVehicleEquivalencies(response2?.equivalencyIds?.split(","))
      // Set the equivalency of the selected vehicle as checked by default
      setFieldValue('equivalencies', [selectedVehicle.displayId.toString()]);
    } catch (error) {
      console.error("Error fetching equivalencies", error);
    }
  };

  // Form submission handler
  const handleSubmit = async (values) => {
    console.log({
      vehicleId: values.vehicleId,
      equivalenciesIds: values.equivalencies.join(','),
    });
    setIsSubmitting(true);
    try {
      await postRequest('/vehicleEquivalency', {
        vehicleId: values.vehicleId,
        equivalencyIds: values.equivalencies.join(','),
      });
      alert('Data submitted successfully');
    } catch (error) {
      console.error("Error submitting form", error);
      alert('Error submitting form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        vehicleId: '',
        equivalencies: [],
      }}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form>
          {/* Vehicle Selection Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Vehicle</InputLabel>
            <Select
              name="vehicleId"
              value={values.vehicleId}
              onChange={e => {
                handleChange(e);
                handleVehicleSelect(e.target.value,setFieldValue);
              }}
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
              {equivalencies.map((equivalency) => (
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
                  label={`${equivalency}`}
                />
              ))}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            fullWidth
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default VehicleEquivalenciesForm;
