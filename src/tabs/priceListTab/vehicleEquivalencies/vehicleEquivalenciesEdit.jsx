import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { getRequest, postRequest } from "../../../consts/apiCalls";
import SubTabNavigator from "../../../components/subTabNavigator";
import useToast from "../../../components/toast/useToast";

const VehicleEquivalenciesEditForm = () => {
  const nav = useNavigate();
  const { showSuccess, showError } = useToast();
  const { id } = useParams();
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVehicleEquivalencies, setSelectedVehicleEquivalencies] =
    useState([]);
  const [equivalencies, setEquivalencies] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehiclesResponse = await getRequest("/vehicleType");
        setVehicles(vehiclesResponse);

        const vehicleResponse = await getRequest(`/vehicleEquivalency/${id}`);
        setSelectedVehicle(vehicleResponse.vehicleId);
        setSelectedVehicleEquivalencies(
          vehicleResponse?.equivalencyIds?.split(",") || [],
        );

        const selectedVehicleID = vehiclesResponse.find(
          (vehicle) => vehicle.displayId == vehicleResponse.vehicleId,
        );

        const equivalenciesResponse = await getRequest(
          `/vehicleEquivalency/availableVehicleId/${selectedVehicleID.id}`,
        );
        setEquivalencies(equivalenciesResponse);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await postRequest("/vehicleEquivalency", {
        vehicleId: values.vehicleId,
        equivalencyIds: values.equivalencies.join(","),
      });
      showSuccess("vehicleEquivalency Updated");
      nav("/pricelist/vehicleequivalencies");
    } catch (error) {
      console.error("Error submitting form", error);
      showError("something went wrong please try again");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="pb-4">
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
          enableReinitialize
          initialValues={{
            vehicleId: selectedVehicle || "",
            equivalencies: selectedVehicleEquivalencies,
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
                  onChange={handleChange}
                  disabled
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
                          checked={values?.equivalencies?.includes(
                            equivalency.toString(),
                          )}
                          onChange={(e) => {
                            const { value, checked } = e.target;
                            const updatedEquivalencies = checked
                              ? [...values.equivalencies, value]
                              : values.equivalencies.filter((v) => v !== value);
                            setFieldValue(
                              "equivalencies",
                              updatedEquivalencies,
                            );
                          }}
                        />
                      }
                      label={`${equivalency}`}
                      disabled={equivalency == selectedVehicle?.toString()}
                    />
                  ))}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default VehicleEquivalenciesEditForm;
