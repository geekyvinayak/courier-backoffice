import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { getRequest, deleteRequest } from "../../../consts/apiCalls";
import FuelSurchargeRuleDialog from "./fuelSurchargeRuleDialog";
import { DeleteDialog } from "../../../components/deleteDialog";
import useToast from "../../../components/toast/useToast";

export default function FuelSurchargeScheduleRules({ id }) {
  const [showDialog, setShowDialog] = useState(false);
  const [ruleId, setRuleId] = useState(null);
  const [rows, setRows] = useState([]);
  const { showError, showSuccess } = useToast();

  const fetchRules = async () => {
    try {
      const response = await getRequest(`/fuelSurchargeSchedule/${id}/rules`);
      setRows(response || []);
    } catch (error) {
      console.error("Failed to fetch rules:", error);
      showError("Failed to fetch rules");
    }
  };

  const handleDelete = async (ruleId) => {
    try {
      await deleteRequest(`/fuelSurchargeSchedule/rules/${ruleId}`);
      showSuccess("Rule deleted successfully");
      fetchRules();
    } catch (error) {
      console.error("Failed to delete rule:", error);
      showError("Failed to delete rule");
    }
  };

  useEffect(() => {
    if (id) fetchRules();
  }, [id]);

  const columns = [
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
      cellClassName: "text-center cursor-pointer !text-[#3e4396]",
    },
    {
      field: "orderRuleId",
      headerName: "Order Rule",
      flex: 2,
    },
    {
      field: "fuelSurchargeTableId",
      headerName: "Fuel Surcharge Table",
      flex: 2,
    },
    {
      field: "action",
      headerName: "",
      sortable: false,
      flex: 0.5,
      cellClassName: "flex !justify-center",
      renderCell: (params) => (
        <IconButton>
          <DeleteDialog handleDelete={() => handleDelete(params.row.id)} />
        </IconButton>
      ),
    },
  ];

  return (
    <div className="border-solid border border-gray p-5 mb-4 mt-4">
      <div className="flex justify-between items-center mb-4 px-1">
        <Typography className="block text-sm text-gray-700 mb-1 font-semibold">
          Fuel Surcharges
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setRuleId(null);
            setShowDialog(true);
          }}
        >
          Add Surcharges
        </Button>
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          getRowId={(row) => row.id || row.fuelSurchargeTableId}
          onCellClick={(params) => {
            if (params.field === "priority") {
              setRuleId(params.row.id);
              setShowDialog(true);
            }
          }}
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-cell , & .MuiDataGrid-columnHeader ": {
              border: "1px solid #e0e0e0",
            },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "#f5f5f5",
            },
            "& .MuiDataGrid-row:nth-of-type(even)": {
              backgroundColor: "#ffffff",
            },
            "& .MuiDataGrid-columnHeaders": {
              fontWeight: "bold",
              fontSize: "14px",
            },
            "& .MuiDataGrid-virtualScrollerContent": {
              fontWeight: "500",
              fontSize: "12px",
            },
          }}
        />
      </div>

      <FuelSurchargeRuleDialog
        open={showDialog}
        handleClose={() => setShowDialog(false)}
        ruleId={ruleId}
        scheduleId={id}
        refreshData={fetchRules}
      />
    </div>
  );
}
