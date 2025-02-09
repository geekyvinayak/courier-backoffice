import { useFormik } from "formik";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  Box,
  Button,
  Typography,
  Link,
  TextareaAutosize,
  MenuItem,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@mui/material";
import { getRequest, postRequest } from "../../../consts/apiCalls";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import PricingFileOperations from "./pricingFileOperations";

const initialValues = {
  name: "",
  fuelSurcharge: false,
  includeWarehouseTravellingDistance: false,
  warehouseLatitude: 0,
  warehouseLongitude: 0,
  excludeDistanceOnReturnOrders: false,
  excludeDistanceOnContinuationOrders: false,
  distanceFormula: "WarehouseToPickup + PickupToDelivery + DeliveryToWarehouse",
  type: "",
  zoneLayout: "",
  useSymmetricalPricing: false,
  pricingMethod: "",
  failOverPriceListName: 0,
  active: false,
  vehicleTypeSurchargeDtoList: [],
};

const TravelOptions = ({ values, setFieldValue }) => {
  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 2,
        border: "1px solid #cfe2f3",
        borderRadius: "4px",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "#eaf4fc",
          padding: 1,
          borderRadius: "4px",
          marginBottom: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Travelling Distance Options
        </Typography>
      </Box>

      <Box display="flex" gap={2} marginBottom={2}>
        <Box flex="1">
          <Typography variant="body1" gutterBottom>
            LATITUDE
          </Typography>
          <TextField
            fullWidth
            type="number"
            size="small"
            variant="outlined"
            name="warehouseLatitude"
            value={values.warehouseLatitude}
            onChange={(e) => setFieldValue("warehouseLatitude", e.target.value)}
          />
        </Box>

        <Box flex="1">
          <Typography variant="body1" gutterBottom>
            LONGITUDE
          </Typography>
          <TextField
            fullWidth
            type="number"
            size="small"
            variant="outlined"
            name="warehouseLongitude"
            value={values.warehouseLongitude}
            onChange={(e) =>
              setFieldValue("warehouseLongitude", e.target.value)
            }
          />
        </Box>
      </Box>

      {/* Checkboxes */}
      <Box marginBottom={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={values.excludeDistanceOnReturnOrders}
              onChange={(e) =>
                setFieldValue("excludeDistanceOnReturnOrders", e.target.checked)
              }
            />
          }
          label="EXCLUDE DISTANCE ON RETURN ORDERS"
        />
      </Box>
      <Box marginBottom={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={values.excludeDistanceOnContinuationOrders}
              onChange={(e) =>
                setFieldValue(
                  "excludeDistanceOnContinuationOrders",
                  e.target.checked,
                )
              }
            />
          }
          label="EXCLUDE DISTANCE ON CONTINUATION ORDERS"
        />
      </Box>

      {/* Distance Formula */}
      <Box marginBottom={2}>
        <Typography variant="body1" gutterBottom>
          DISTANCE FORMULA
        </Typography>
        <TextareaAutosize
          name="distanceFormula"
          minRows={3}
          value={values.distanceFormula}
          onChange={(e) => setFieldValue("distanceFormula", e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            borderColor: "#c0c0c0",
            borderRadius: "4px",
            borderWidth: "0.5px",
          }}
        />
      </Box>

      {/* Reset Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          type="button"
          color="primary"
          onClick={() =>
            setFieldValue("distanceFormula", initialValues.distanceFormula)
          }
        >
          Reset to Default
        </Button>
        <Link href="#" underline="hover">
          Help?
        </Link>
      </Box>
    </Box>
  );
};

const NewPrice = () => {
  const { id } = useParams();
  const [failoverPriceLists, setFailoverPriceLists] = useState([]);
  const [vehicleType, setVehicleType] = useState([]);
  const nav = useNavigate();
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const response = await postRequest("/api/pricingList", values);
        console.log(response);
        nav("/pricelist");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const fetchPriceById = async () => {
    try {
      const response = await getRequest(`/api/pricingList/${id}`);
      formik.setValues(response);
    } catch (error) {
      console.error("Error fetching pricing list:", error);
    }
  };

  const fetchFailoverPriceLists = async () => {
    try {
      const response = await getRequest("/api/pricingList"); // Get all price lists
      const filteredLists = response?.filter((item) => item.id != id); // Exclude current id
      setFailoverPriceLists(filteredLists);
    } catch (error) {
      console.error("Error fetching failover price lists:", error);
    }
  };

  const fetchVehicleTyes = async () => {
    try {
      const response = await getRequest("/vehicleType");
      setVehicleType(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPriceById();
      fetchFailoverPriceLists();
      fetchVehicleTyes();
    }
  }, [id]);

  const pageBreadcrums = [
    {
      id: 1,
      label: "Pricing",
      href: "/pricelist",
    },
    {
      id: 2,
      label: "New Price List",
      href: "",
    },
  ];

  return (
    <div className="pb-4">
      <div className="mt-2">
        <Breadcrumb items={pageBreadcrums} />
      </div>
      <div className="flex gap-10">
        <div className="max-w-[600px] p-4 border border-gray shadow-md ml-4 mt-4 mb-4">
          <form onSubmit={formik.handleSubmit}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={2}
            >
              <Typography variant="h3" gutterBottom>
                New Price List
              </Typography>
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

            {/* Text Field */}
            <div style={{ marginBottom: "10px" }}>
              <Typography variant="body1" gutterBottom>
                Name
              </Typography>
              <TextField
                name="name"
                fullWidth
                size="small"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>

            {id && (
              <div style={{ marginBottom: "10px" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.fuelSurcharge}
                      onChange={(e) =>
                        formik.setFieldValue("fuelSurcharge", e.target.checked)
                      }
                    />
                  }
                  label="FUEL SURCHARGE"
                />
              </div>
            )}

            {/* Conditional Checkbox */}
            {formik.values.type !== "Combined" && (
              <div style={{ marginBottom: "10px" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.includeWarehouseTravellingDistance}
                      onChange={(e) =>
                        formik.setFieldValue(
                          "includeWarehouseTravellingDistance",
                          e.target.checked,
                        )
                      }
                    />
                  }
                  label="INCLUDE WAREHOUSE TRAVELLING DISTANCE"
                />
                {formik.values.includeWarehouseTravellingDistance && (
                  <TravelOptions
                    values={formik.values}
                    setFieldValue={formik.setFieldValue}
                  />
                )}
              </div>
            )}

            {/* Radio Buttons */}
            <div style={{ marginBottom: "10px" }}>
              <Typography variant="body1" gutterBottom>
                TYPE
              </Typography>
              {!id ? (
                <FormControl>
                  <RadioGroup
                    value={formik.values.type}
                    onChange={(e) => {
                      formik.setFieldValue("type", e.target.value);
                      if (e.target.value === "Combined") {
                        formik.setFieldValue(
                          "includeWarehouseTravellingDistance",
                          false,
                        );
                      }
                    }}
                    row
                  >
                    <FormControlLabel
                      value="ByZone"
                      control={<Radio />}
                      label="By Zone"
                    />
                    <FormControlLabel
                      value="ByDistance"
                      control={<Radio />}
                      label="By Distance"
                    />
                    <FormControlLabel
                      value="Combined"
                      control={<Radio />}
                      label="Combined"
                    />
                  </RadioGroup>
                </FormControl>
              ) : (
                <Typography variant="body1" gutterBottom>
                  {formik.values.type}
                </Typography>
              )}
            </div>
            {id && (
              <div style={{ marginBottom: "10px" }}>
                <Typography variant="body1" gutterBottom>
                  PRICING METHOD
                </Typography>
                <FormControl>
                  <RadioGroup
                    value={formik.values.pricingMethod}
                    onChange={(e) => {
                      formik.setFieldValue("pricingMethod", e.target.value);
                    }}
                    row
                  >
                    <FormControlLabel
                      value="VehicleTypeSurcharge"
                      control={<Radio />}
                      label="Vehicle Type Surcharge"
                    />
                    <FormControlLabel
                      value="SeparatePriceSheetByVehicle"
                      control={<Radio />}
                      label="Separate Price Sheet By Vehicle"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            )}

            {id && (
              <div style={{ marginBottom: "10px" }}>
                <FormControl fullWidth>
                  <Typography variant="body1" gutterBottom>
                    VEHICLE TYPES
                  </Typography>
                  <Table>
                    <TableHead>
                      <TableCell>Vehicle Type</TableCell>
                      <TableCell>Minimum Charges</TableCell>
                      <TableCell>Surcharge</TableCell>
                    </TableHead>
                    <TableBody>
                      {vehicleType?.map((vehicle, index) => {
                        const handleInputChange = (
                          e,
                          chargeName,
                          vehicleId,
                        ) => {
                          const value = Number(e.target.value);
                          let flag = false;
                          // Update the specific vehicle surcharge data in the formik values
                          let updatedSurchargeData =
                            formik.values.vehicleTypeSurchargeDtoList.map(
                              (item) => {
                                if (vehicleId == item.vehicleTypeId) {
                                  item[chargeName] = value; // update the specific field
                                  flag = true;
                                }
                                return item;
                              },
                            );
                          if (!flag) {
                            updatedSurchargeData.push({
                              vehicleTypeId: vehicleId,
                              [chargeName]: value,
                            });
                          }
                          console.log(
                            formik.values.vehicleTypeSurchargeDtoList,
                          );
                          formik.setFieldValue(
                            "vehicleTypeSurchargeDtoList",
                            updatedSurchargeData,
                          );
                        };

                        return (
                          <TableRow key={vehicle.id}>
                            <TableCell>
                              <TextField
                                name={`vehicleTypeId_${vehicle.id}`}
                                size="small"
                                variant="outlined"
                                value={vehicle.id}
                                disabled
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                name={`minimumSurcharge_${vehicle.id}`}
                                size="small"
                                variant="outlined"
                                value={
                                  formik.values.vehicleTypeSurchargeDtoList?.find(
                                    (charge) =>
                                      charge.vehicleTypeId === vehicle.id,
                                  )?.minimumSurcharge ?? 0
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    "minimumSurcharge",
                                    vehicle.id,
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                name={`surcharge_${vehicle.id}`}
                                size="small"
                                variant="outlined"
                                value={
                                  formik.values.vehicleTypeSurchargeDtoList?.find(
                                    (charge) =>
                                      charge.vehicleTypeId === vehicle.id,
                                  )?.surcharge ?? 0
                                }
                                onChange={(e) =>
                                  handleInputChange(e, "surcharge", vehicle.id)
                                }
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </FormControl>
              </div>
            )}

            {id && (
              <div style={{ marginBottom: "10px" }}>
                <FormControl fullWidth>
                  <Typography variant="body1" gutterBottom>
                    FAILOVER PRICE LIST
                  </Typography>
                  <TextField
                    select
                    name="failOverPriceListName"
                    value={formik.values.failOverPriceListName}
                    onChange={(e) => {
                      formik.setFieldValue(
                        "failOverPriceListName",
                        e.target.value,
                      );
                      console.log(formik.values);
                    }}
                    variant="outlined"
                    fullWidth
                  >
                    <MenuItem value="0">None</MenuItem>
                    {failoverPriceLists.map((list) => (
                      <MenuItem key={list.id} value={list.id}>
                        {list.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </div>
            )}
          </form>
        </div>
        <div className="">
          {id && <PricingFileOperations id={id} fetchData={fetchPriceById} />}
        </div>
      </div>
    </div>
  );
};

export default NewPrice;
