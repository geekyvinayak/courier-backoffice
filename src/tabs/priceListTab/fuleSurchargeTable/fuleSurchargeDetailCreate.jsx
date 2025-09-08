import { Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, MenuItem, TextField, Typography } from '@mui/material'
import { getRequest, putRequest } from '../../../consts/apiCalls'
import { useFormik } from 'formik';
import useToast from '../../../components/toast/useToast';
import { useEffect, useState } from 'react';

export const FuleSurchargeDetailCreate = ({ open, handleDialogClose, detailId, setDetailId, tableId }) => {

    const { showSuccess, showError } = useToast();

    const [fules, setFules] = useState([]);
    const [calculator, setCalculator] = useState([]);

    const formik = useFormik({
        initialValues: {
            startDate: "",
            vehicleOverrides: []
        },
        onSubmit: async (values) => {
            try {
                const response = putRequest(`/fuel-surcharge-tables/${tableId}/details/${detailId}`, values);
                showSuccess("Surcharge Detail Updated");
                setDetailId(false);
                handleDialogClose();
            } catch (error) {
                showError('Something went wrong');
                console.log(error);
            }
        }
    });

    const getDetails = async () => {
        try {
            const response = await getRequest(`/fuel-surcharge-tables/${tableId}/details/${detailId}`);
            // formik.setValues(response);
            const formattedDate = response.startDate
                ? new Date(response.startDate).toISOString().split("T")[0]
                : "";

            formik.setValues({
                ...response,
                startDate: formattedDate
            });
            console.log(formik.values)
        } catch (error) {
            showError('Something went wrong');
            console.log(error);
        }

    }

    const getFulePrices = async () => {
        try {
            const response = await getRequest(`/fuel-prices`);
            setFules(response);
        } catch (error) {
            console.log(error);
        }
    };

    const getCalculator = async () => {
        try {
            const response = await getRequest(`/surcharge-calculators`);
            setCalculator(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (detailId) {
            getDetails();
            getFulePrices();
            getCalculator();
        }
    }, [detailId]);

    console.log(formik.values);

    return (
        <Dialog open={open} onClose={handleDialogClose} maxWidth="md" fullWidth>
            <DialogTitle>
                {detailId ? "Edit" : "New"} Surcharge
            </DialogTitle>
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
                            htmlFor="startdate"
                            className="block text-sm text-gray-700 mb-1"
                        >
                            Start Date
                        </label>
                        <TextField
                            id="startdate"
                            name="startDate"
                            variant="outlined"
                            size="small"
                            type='date'
                            fullWidth
                            value={formik.values.startDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                            helperText={formik.touched.startDate && formik.errors.startDate}
                            FormHelperTextProps={{ sx: { marginLeft: 0 } }}
                        />
                    </div>
                    <div>
                        <Typography className='block text-sm text-gray-700 mb-1 font-semibold'>
                            Vehicle Fuel Surcharges
                        </Typography>
                        <table className="min-w-full border border-gray-300 rounded-md">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-3 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">
                                        Vehicle type
                                    </th>
                                    <th className="px-3 py-2 border border-gray-300 text-center text-sm font-medium text-gray-700">
                                        Override
                                    </th>
                                    <th className="px-3 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">
                                        Mode
                                    </th>
                                    <th className="px-3 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">
                                        Settings
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {formik.values.vehicleOverrides?.map((item, index) => (
                                    <tr key={index}>
                                        {/* Vehicle Type - Small */}
                                        <td className="px-3 py-2 border border-gray-300">
                                            <label
                                                htmlFor={`vehicleType-${index}`}
                                                className="block text-sm text-gray-700 mb-1 font-semibold"
                                            >
                                                Vehicle type
                                            </label>
                                            <TextField
                                                id={`vehicleType-${index}`}
                                                value={item.vehicleTypeId}
                                                variant="outlined"
                                                size="small"
                                                sx={{ width: 120 }} // small width
                                                disabled
                                            />
                                        </td>

                                        {/* Override */}
                                        <td className="px-3 py-2 border border-gray-300">
                                            <label
                                                htmlFor={`override-${index}`}
                                                className="block text-sm text-gray-700 mb-1 font-semibold"
                                            >
                                                Override
                                            </label>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        id={`override-${index}`}
                                                        checked={item.isOverride}
                                                        onChange={(e) =>
                                                            formik.setFieldValue(
                                                                `vehicleOverrides[${index}].isOverride`,
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                }
                                                label=""
                                            />
                                        </td>

                                        {/* Mode - Bigger */}
                                        <td className="px-3 py-2 border border-gray-300">
                                            <label
                                                htmlFor={`mode-${index}`}
                                                className="block text-sm text-gray-700 mb-1 font-semibold"
                                            >
                                                Mode
                                            </label>
                                            <TextField
                                                id={`mode-${index}`}
                                                name={`vehicleOverrides[${index}].overrideMode`}
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                select
                                                sx={{ minWidth: 250 }} // bigger width
                                                value={item.overrideMode}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                disabled={!item.isOverride}
                                            >
                                                <MenuItem value="FIXED_PERCENTAGE">Fixed Percentage</MenuItem>
                                                <MenuItem value="FIXED_PRICE_PER_DISTANCE">
                                                    Fixed Price per Distance
                                                </MenuItem>
                                                <MenuItem value="CALCULATED_PERCENTAGE">
                                                    Calculated Percentage
                                                </MenuItem>
                                                <MenuItem value="CALCULATED_PRICE_PER_DISTANCE">
                                                    Calculated Price per Distance
                                                </MenuItem>
                                            </TextField>
                                        </td>

                                        {/* Settings */}
                                        <td className="px-3 py-2 border border-gray-300">
                                            {/* Show override value input for FIXED modes */}
                                            {(item.overrideMode === "FIXED_PERCENTAGE" || item.overrideMode === "FIXED_PRICE_PER_DISTANCE" || item.overrideMode==null) && (
                                                <div className="flex items-center gap-1">
                                                    <TextField
                                                        id={`settings-${index}`}
                                                        name={`vehicleOverrides[${index}].overrideValue`}
                                                        value={item.overrideValue}
                                                        onChange={formik.handleChange}
                                                        variant="outlined"
                                                        size="small"
                                                        type="number"
                                                        sx={{ width: 80 }}
                                                        disabled={!item.isOverride}
                                                    />
                                                    <span className="text-gray-700">
                                                        {item.overrideMode === "FIXED_PERCENTAGE" ? "%" : "$"}
                                                    </span>
                                                </div>
                                            )}
                                            { (item.overrideMode === "CALCULATED_PERCENTAGE" || item.overrideMode === "CALCULATED_PRICE_PER_DISTANCE") && (
                                                /* Show dropdowns for CALCULATED modes */
                                                <div className="space-y-2">
                                                    <div>
                                                        <label
                                                            htmlFor={`price-${index}`}
                                                            className="block text-sm text-gray-700 mb-1 font-semibold"
                                                        >
                                                            Price
                                                        </label>
                                                        <TextField
                                                            id={`price-${index}`}
                                                            name={`vehicleOverrides[${index}].fuelPriceId`}
                                                            variant="outlined"
                                                            size="small"
                                                            fullWidth
                                                            select
                                                            value={item.fuelPriceId || ''}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            disabled={!item.isOverride}
                                                            FormHelperTextProps={{ sx: { marginLeft: 0 } }}
                                                        >
                                                            {fules?.map((fuelItem) => (
                                                                <MenuItem key={fuelItem.id} value={fuelItem.id}>
                                                                    {fuelItem.name}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor={`calculator-${index}`}
                                                            className="block text-sm text-gray-700 mb-1 font-semibold"
                                                        >
                                                            Calculator
                                                        </label>
                                                        <TextField
                                                            id={`calculator-${index}`}
                                                            name={`vehicleOverrides[${index}].fuelCalculatorId`}
                                                            variant="outlined"
                                                            size="small"
                                                            fullWidth
                                                            select
                                                            value={item.fuelCalculatorId || ''}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            disabled={!item.isOverride}
                                                            FormHelperTextProps={{ sx: { marginLeft: 0 } }}
                                                        >
                                                            {calculator?.map((calcItem) => (
                                                                <MenuItem key={calcItem.id} value={calcItem.id}>
                                                                    {calcItem.name}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                )
                                )}
                            </tbody>
                        </table>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
