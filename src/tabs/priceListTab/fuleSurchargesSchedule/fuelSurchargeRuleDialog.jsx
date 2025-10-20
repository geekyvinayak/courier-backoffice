import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { getRequest, postRequest, putRequest } from "../../../consts/apiCalls";
import useToast from "../../../components/toast/useToast";

export default function FuelSurchargeRuleDialog({
  open,
  handleClose,
  ruleId,
  scheduleId,
  refreshData,
}) {
  const { showSuccess, showError } = useToast();
  const [fuelTables, setFuelTables] = useState([]);
  const [orderRules, setOrderRules] = useState([]);

  const formik = useFormik({
    initialValues: {
      priority: "",
      orderRuleId: "",
      fuelSurchargeTableId: "",
    },
    validationSchema: Yup.object({
      priority: Yup.number().required("Priority is required"),
      orderRuleId: Yup.string().required("Order Rule is required"),
      fuelSurchargeTableId: Yup.string().required(
        "Fuel Surcharge Table is required"
      ),
    }),
    onSubmit: async (values) => {
      try {
        if (ruleId) {
          await putRequest(`/fuelSurchargeSchedule/rules/${ruleId}`, values);
          showSuccess("Rule updated successfully");
        } else {
          await postRequest(
            `/fuelSurchargeSchedule/${scheduleId}/rules`,
            values
          );
          showSuccess("Rule added successfully");
        }
        handleClose();
        refreshData(); // refresh parent data
      } catch (error) {
        console.error(error);
        showError("Something went wrong");
      }
    },
  });

  const getRuleDetails = async () => {
    try {
      const response = await getRequest(`/fuelSurchargeSchedule/rules/${ruleId}`);
      formik.setValues(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getFuelTables = async () => {
    try {
      const response = await getRequest(`/fuel-surcharge-tables`);
      setFuelTables(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getOrderRules = async () => {
    try {
      const response = await getRequest(`/order-rules/active`);
      setOrderRules(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (open) {
      getFuelTables();
      getOrderRules();
      if (ruleId) {
        getRuleDetails();
      } else {
        formik.resetForm({
          values: {
            priority: "",
            orderRuleId: "",
            fuelSurchargeTableId: "",
          },
        });
      }
    }
  }, [open, ruleId]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{ruleId ? "Edit Rule" : "Add Rule"}</DialogTitle>
      <DialogContent>
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h6">
            {ruleId ? "Edit Rule" : "New Rule"}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={formik.handleSubmit}
            sx={{ backgroundColor: "#1569CB" }}
          >
            Save
          </Button>
        </div>

        <form className="space-y-4">
          {/* Priority */}
          <div>
            <label
              htmlFor="priority"
              className="block text-sm text-gray-700 mb-1"
            >
              Priority
            </label>
            <TextField
              id="priority"
              name="priority"
              variant="outlined"
              size="small"
              fullWidth
              type="number"
              value={formik.values.priority}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.priority && Boolean(formik.errors.priority)}
              helperText={formik.touched.priority && formik.errors.priority}
            />
          </div>

          {/* Order Rule */}
          <div>
            <label
              htmlFor="orderRuleId"
              className="block text-sm text-gray-700 mb-1"
            >
              Order Rule
            </label>
            <TextField
              id="orderRuleId"
              name="orderRuleId"
              variant="outlined"
              size="small"
              select
              fullWidth
              value={formik.values.orderRuleId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.orderRuleId && Boolean(formik.errors.orderRuleId)}
              helperText={formik.touched.orderRuleId && formik.errors.orderRuleId}
            >
              {orderRules.map((rule) => (
                <MenuItem key={rule.id} value={rule.id}>
                  {rule.name}
                </MenuItem>
              ))}
            </TextField>
          </div>

          {/* Fuel Surcharge Table */}
          <div>
            <label
              htmlFor="fuelSurchargeTableId"
              className="block text-sm text-gray-700 mb-1"
            >
              Fuel Surcharge Table
            </label>
            <TextField
              id="fuelSurchargeTableId"
              name="fuelSurchargeTableId"
              variant="outlined"
              size="small"
              select
              fullWidth
              value={formik.values.fuelSurchargeTableId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.fuelSurchargeTableId &&
                Boolean(formik.errors.fuelSurchargeTableId)
              }
              helperText={
                formik.touched.fuelSurchargeTableId &&
                formik.errors.fuelSurchargeTableId
              }
            >
              {fuelTables.map((table) => (
                <MenuItem key={table.id} value={table.id}>
                  {table.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
