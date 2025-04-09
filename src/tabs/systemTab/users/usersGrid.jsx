import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../../../consts/apiCalls";

const columns = [
  { field: "name", headerName: "Name", flex: 1.5,renderCell: (params) => {
    return `${params.row.firstName || ""} ${params.row.lastName || ""}`.trim();
  },},
  { field: "email", headerName: "Email", flex: 1.5 },
  { field: "phone", headerName: "Phone", flex: 1.5 },
  { field: "contactLanguage", headerName: "Contact Language", flex: 1.5 },
  { field: "role", headerName: "Role", flex: 1.5 },
  { field: "subscribeToTechnicalNotification", headerName: "Subscribed to Technical Emails", flex: 1.5 },
];

const UserGrid = ({showAchive}) => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchExtraFees = async () => {
    try {
      const response = await getRequest(`/users?showDeleted=${showAchive}`);
      setUsers(response);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error fetching Extra fees:", error);
    }
  };

  useEffect(() => {
    fetchExtraFees();
  }, [showAchive]);

  return (
    <div className="w-[90%] mt-5">
      <div>
        <DataGrid
          rows={users}
          className="cursor-pointer !h-[70vh]"
          columns={columns}
          onCellClick={(params) => {
            if (params.field != "action") {
              navigate(`./edit/${params.row.id}`);
            }
          }}
          loading={loading}
        slotProps={{
          loadingOverlay: {
            variant: 'circular-progress',
            noRowsVariant: 'circular-progress',
          },
        }}
          rowHeight={45}
           columnHeaderHeight={45}
          disableColumnMenu
          disableSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 7,
              },
            },
          }}
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
            "& .MuiDataGrid-virtualScrollerContent":{
              fontWeight: "500", // Bold text
              fontSize: "12px",
            }
          }}
        />
      </div>
    </div>
  );
};

export default UserGrid;