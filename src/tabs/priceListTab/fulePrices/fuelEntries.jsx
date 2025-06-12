import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { postRequest, putRequest } from "../../../consts/apiCalls";
import useToast from "../../../components/toast/useToast";

export default function FuelEntries({
  entries,
  getFuelPrices,
  loading,
  showDialog,
  setShowDialog,
}) {
  const [entryId, setEntryId] = useState(null);
  const columns = [
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 2,
      cellClassName: "text-center cursor-pointer !text-[#3e4396]",
    },
    {
      field: "baseFuelPrice",
      headerName: "Base Fuel Price",
      sortable: false,
      cellClassName: "text-center",
    },
    {
      field: "referenceFuelPrice",
      headerName: "Reference Fuel Price",
      flex: 2,
      cellClassName: "text-center",
    },
  ];
  return (
    <div>
      <DataGrid
        rows={entries}
        columns={columns}
        onCellClick={(params) => {
          if (params.field === "startDate") {
            setShowDialog(true);
            setEntryId(params.row);
            // handleCellClick(params.row.id);
          }
        }}
        loading={loading}
        slotProps={{
          loadingOverlay: {
            variant: "circular-progress",
            noRowsVariant: "circular-progress",
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
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
          "& .MuiDataGrid-virtualScrollerContent": {
            fontWeight: "500", // Bold text
            fontSize: "12px",
          },
        }}
        disableRowSelectionOnClick
        className="!h-[70vh]"
      />
      <AddFueluelEntries
        open={showDialog}
        handleClose={() => setShowDialog(false)}
        entryId={entryId}
        getFuelPrices={getFuelPrices}
      />
    </div>
  );
}

export function AddFueluelEntries({ open, handleClose, entryId, getFuelPrices }) {
  const [isLoading, setIsLoading] = useState(false);
  const {id:priceId} = useParams();
  const { showSuccess, showError } = useToast();
  
  const handleDate = (value) => {
    if (!value) return '';
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const convertToInputDateFormat = (dateString) => {
    if (!dateString) return '';
    
    // If date is in DD-MM-YYYY format, convert to YYYY-MM-DD
    if (dateString.includes('-') && dateString.split('-')[0].length === 2) {
      const [day, month, year] = dateString.split('-');
      return `${year}-${month}-${day}`;
    }
    
    // If already in YYYY-MM-DD format or other formats, handle accordingly
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  };

  const formik = useFormik({
    initialValues: {
      startDate: "",
      id: "",
      baseFuelPrice: 0,
      referenceFuelPrice: 0,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      startDate: Yup.string().required("Start date is required"),
      baseFuelPrice: Yup.number()
        .required("Base fuel price is required")
        .positive("Base fuel price must be a positive number")
        .min(0.01, "Base fuel price must be at least $0.01")
        .typeError("Base fuel price must be a valid number"),

      referenceFuelPrice: Yup.number()
        .required("Reference fuel price is required")
        .positive("Reference fuel price must be a positive number")
        .min(0.01, "Reference fuel price must be at least $0.01")
        .typeError("Reference fuel price must be a valid number"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        
        // Create a copy of values to avoid mutating the original
        const submitValues = {
          ...values,
          startDate: handleDate(values.startDate)
        };
        
        if (entryId && entryId.id) {
          const response = await putRequest(
            `/fuel-prices/${priceId}/entries/${entryId.id}`,
            submitValues,
          );
        } else {
          const response = await postRequest(
            `/fuel-prices/${priceId}/entries`,
            submitValues,
          );
        }
        showSuccess(entryId ? "Fuel Price updated successfully" : "Fuel Price added successfully");
        handleDialogClose(); // Close the dialog
      } catch (error) {
        console.log(error);
        showError("Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (entryId && typeof entryId === 'object') {
      // Set all values at once using setValues with complete object
      formik.setValues({
        startDate: convertToInputDateFormat(entryId.startDate) || "",
        id: entryId.id || "",
        baseFuelPrice: entryId.baseFuelPrice || 0,
        referenceFuelPrice: entryId.referenceFuelPrice || 0,
      });
      
    } else if (!entryId) {
      // Reset form when creating new entry
      formik.resetForm();
    }
  }, [entryId]);

  // Handle dialog close
  const handleDialogClose = () => {
    formik.resetForm();
    getFuelPrices();
    handleClose();
  };
  
  return (
    <Dialog open={open} onClose={handleDialogClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {entryId ? "Edit Fuel Entry" : "Add Fuel Entry"}
      </DialogTitle>
      <DialogContent>
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h3" gutterBottom>
            {entryId ? "Edit" : "New"} Fuel Price
          </Typography>
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            disabled={isLoading || !formik.isValid}
            color="primary"
            sx={{
              backgroundColor: "#1569CB",
              "&:hover": {
                backgroundColor: "#1356B0",
              },
            }}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
        
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm text-gray-700 mb-1 font-semibold"
            >
              START DATE *
            </label>
            <TextField
              id="startDate"
              name="startDate"
              type="date"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.startDate && Boolean(formik.errors.startDate)
              }
              helperText={formik.touched.startDate && formik.errors.startDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-3 font-semibold">
              PRICES
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="baseFuelPrice"
                  className="block text-sm text-gray-600 mb-1"
                >
                  Base Fuel Price ($) *
                </label>
                <TextField
                  id="baseFuelPrice"
                  name="baseFuelPrice"
                  type="number"
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="10.00"
                  value={formik.values.baseFuelPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.baseFuelPrice &&
                    Boolean(formik.errors.baseFuelPrice)
                  }
                  helperText={
                    formik.touched.baseFuelPrice && formik.errors.baseFuelPrice
                  }
                  inputProps={{
                    step: "0.01",
                    min: "0",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="referenceFuelPrice"
                  className="block text-sm text-gray-600 mb-1"
                >
                  Reference Fuel Price ($) *
                </label>
                <TextField
                  id="referenceFuelPrice"
                  name="referenceFuelPrice"
                  type="number"
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="10.00"
                  value={formik.values.referenceFuelPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.referenceFuelPrice &&
                    Boolean(formik.errors.referenceFuelPrice)
                  }
                  helperText={
                    formik.touched.referenceFuelPrice &&
                    formik.errors.referenceFuelPrice
                  }
                  inputProps={{
                    step: "0.01",
                    min: "0",
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}