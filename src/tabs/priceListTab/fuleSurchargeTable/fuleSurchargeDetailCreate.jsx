import { useEffect, useState } from 'react';
import { Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, MenuItem, TextField, Typography } from '@mui/material';
import { getRequest, postRequest, putRequest } from '../../../consts/apiCalls';
import { useFormik } from 'formik';
import useToast from '../../../components/toast/useToast';

export const FuleSurchargeDetailCreate = ({ open, handleDialogClose, detailId, setDetailId, tableId }) => {
  const { showSuccess, showError } = useToast();
  const [fules, setFules] = useState([]);
  const [calculator, setCalculator] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);

  const formik = useFormik({
    initialValues: {
      startDate: "",
      vehicleOverrides: []
    },
    onSubmit: async (values) => {
      try {
        if (!detailId) {
          await postRequest(`/fuel-surcharge-tables/${tableId}/vehicle-overrides`, values);
          showSuccess("Surcharge Detail Created");
        } else {
          await putRequest(`/fuel-surcharge-tables/${tableId}/details/${detailId}`, values);
        }
        showSuccess("Surcharge Detail Updated");
        setDetailId(false);
        handleDialogClose();
      } catch (error) {
        showError('Something went wrong');
        console.log(error);
      }
    }
  });

  // 🔹 Fetch detail data
  const getDetails = async () => {
    try {
      const response = await getRequest(`/fuel-surcharge-tables/${tableId}/details/${detailId}`);
      const formattedDate = response.startDate
        ? new Date(response.startDate).toISOString().split("T")[0]
        : "";

      formik.setValues({
        ...response,
        startDate: formattedDate
      });
    } catch (error) {
      showError('Something went wrong');
      console.log(error);
    }
  };

  // 🔹 Fetch fuel prices
  const getFulePrices = async () => {
    try {
      const response = await getRequest(`/fuel-prices`);
      setFules(response);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 Fetch calculators
  const getCalculator = async () => {
    try {
      const response = await getRequest(`/surcharge-calculators`);
      setCalculator(response);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 Fetch vehicle types
  const getVehicleTypes = async () => {
    try {
      const response = await getRequest(`/vehicleType`);
      setVehicleTypes(response);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 Merge vehicle types with overrides
  const mergeVehicleOverrides = (overrides, types) => {
    return types.map((type) => {
      const existing = overrides?.find((o) => o.vehicleTypeId === type.id);
      return {
        vehicleTypeId: type.id,
        isOverride: existing?.isOverride || false,
        overrideMode: existing?.overrideMode || "",
        overrideValue: existing?.overrideValue || "",
        overrideFuelPriceId: existing?.overrideFuelPriceId || "",
        overrideFuelCalculatorId: existing?.overrideFuelCalculatorId || ""
      };
    });
  };

  useEffect(() => {
    if (open) {
      getFulePrices();
      getCalculator();
      getVehicleTypes();

      if (detailId) {
        getDetails();
      } else {
        // Reset when creating new
        formik.resetForm();
      }
    }
  }, [detailId, open]);

  // 🔹 Sync vehicleTypes with formik.vehicleOverrides
  useEffect(() => {
    if (vehicleTypes.length > 0) {
      formik.setFieldValue(
        "vehicleOverrides",
        mergeVehicleOverrides(formik.values.vehicleOverrides, vehicleTypes),
        false
      );
    }
  }, [vehicleTypes]);

  // 🔹 Reset values to null if isOverride is false
  useEffect(() => {
    const updatedOverrides = formik.values.vehicleOverrides?.map((item) => {
      if (!item.isOverride) {
        return {
          ...item,
          overrideMode: "",
          overrideValue: "",
          overrideFuelPriceId: "",
          overrideFuelCalculatorId: ""
        };
      }
      return item;
    });

    if (JSON.stringify(updatedOverrides) !== JSON.stringify(formik.values.vehicleOverrides)) {
      formik.setFieldValue("vehicleOverrides", updatedOverrides, false);
    }
  }, [formik.values.vehicleOverrides]);

  return (
    <Dialog open={open} onClose={handleDialogClose} maxWidth="md" fullWidth>
      <DialogTitle>{detailId ? "Edit" : "New"} Surcharge</DialogTitle>
      <DialogContent>
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h3" gutterBottom>
            {detailId ? "Edit" : "New"} Surcharge
          </Typography>
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            className="bg-blue-500"
            type="submit"
            color="primary"
            sx={{ backgroundColor: "#1569CB" }}
          >
            Save
          </Button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Start Date */}
          <div>
            <label htmlFor="startdate" className="block text-sm text-gray-700 mb-1">
              Start Date
            </label>
            <TextField
              id="startdate"
              name="startDate"
              variant="outlined"
              size="small"
              type="date"
              fullWidth
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.startDate && Boolean(formik.errors.startDate)}
              helperText={formik.touched.startDate && formik.errors.startDate}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
            />
          </div>

          {/* Table */}
          <div>
            <Typography className="block text-sm text-gray-700 mb-1 font-semibold">
              Vehicle Fuel Surcharges
            </Typography>
            <table className="min-w-full border border-gray-300 rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 border text-left">Vehicle type</th>
                  <th className="px-3 py-2 border text-center">Override</th>
                  <th className="px-3 py-2 border text-left">Mode</th>
                  <th className="px-3 py-2 border text-left">Settings</th>
                </tr>
              </thead>
              <tbody>
                {formik.values.vehicleOverrides?.map((item, index) => (
                  <tr key={index}>
                    {/* Vehicle Type */}
                    <td className="px-3 py-2 border">
                      <TextField
                        value={item.vehicleTypeId}
                        variant="outlined"
                        size="small"
                        sx={{ width: 120 }}
                        disabled
                      />
                    </td>

                    {/* Override Checkbox */}
                    <td className="px-3 py-2 border">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={item.isOverride}
                            onChange={(e) =>
                              formik.setFieldValue(`vehicleOverrides[${index}].isOverride`, e.target.checked)
                            }
                          />
                        }
                        label=""
                      />
                    </td>

                    {/* Mode */}
                    <td className="px-3 py-2 border">
                      <TextField
                        name={`vehicleOverrides[${index}].overrideMode`}
                        select
                        fullWidth
                        size="small"
                        sx={{ minWidth: 250 }}
                        value={item.overrideMode || ""}
                        onChange={formik.handleChange}
                        disabled={!item.isOverride}
                      >
                        <MenuItem value="FIXED_PERCENTAGE">Fixed Percentage</MenuItem>
                        <MenuItem value="FIXED_PRICE_PER_DISTANCE">Fixed Price per Distance</MenuItem>
                        <MenuItem value="CALCULATED_PERCENTAGE">Calculated Percentage</MenuItem>
                        <MenuItem value="CALCULATED_PRICE_PER_DISTANCE">Calculated Price per Distance</MenuItem>
                      </TextField>
                    </td>

                    {/* Settings */}
                    <td className="px-3 py-2 border">
                      {/* Fixed Modes */}
                      {(item.overrideMode === "FIXED_PERCENTAGE" ||
                        item.overrideMode === "FIXED_PRICE_PER_DISTANCE" ||
                        item.overrideMode === "") && (
                          <div className="flex items-center gap-1">
                            <TextField
                              name={`vehicleOverrides[${index}].overrideValue`}
                              value={item.overrideValue || ""}
                              onChange={formik.handleChange}
                              size="small"
                              type="number"
                              sx={{ width: 80 }}
                              disabled={!item.isOverride}
                            />
                            <span>{item.overrideMode === "FIXED_PERCENTAGE" ? "%" : "$"}</span>
                          </div>
                        )}

                      {/* Calculated Modes */}
                      {(item.overrideMode === "CALCULATED_PERCENTAGE" ||
                        item.overrideMode === "CALCULATED_PRICE_PER_DISTANCE") && (
                          <div className="space-y-2">
                            {/* Price */}
                            <TextField
                              name={`vehicleOverrides[${index}].overrideFuelPriceId`}
                              select
                              fullWidth
                              size="small"
                              value={item.overrideFuelPriceId || ""}
                              onChange={formik.handleChange}
                              disabled={!item.isOverride}
                            >
                              {fules.map((fuelItem) => (
                                <MenuItem key={fuelItem.id} value={fuelItem.id}>
                                  {fuelItem.name}
                                </MenuItem>
                              ))}
                            </TextField>

                            {/* Calculator */}
                            <TextField
                              name={`vehicleOverrides[${index}].overrideFuelCalculatorId`}
                              select
                              fullWidth
                              size="small"
                              value={item.overrideFuelCalculatorId || ""}
                              onChange={formik.handleChange}
                              disabled={!item.isOverride}
                            >
                              {calculator.map((calcItem) => (
                                <MenuItem key={calcItem.id} value={calcItem.id}>
                                  {calcItem.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </div>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
