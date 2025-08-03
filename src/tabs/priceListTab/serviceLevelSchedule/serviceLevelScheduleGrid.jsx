import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest, postRequest } from "../../../consts/apiCalls";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const ServiceLevelScheduleGrid = () => {
  const columns = [
    {
      field: "active",
      headerName: "Default",
      sortable: false,
      filterable: false,
      cellClassName: "!flex !justify-center !items-center",
      renderCell: (params) =>
        params.value ? (
          <StarIcon style={{ color: "#1976d2" }} />
        ) : (
          <StarOutlineIcon
            onClick={() => handleActive(params.row.id)}
            style={{
              color: "#1976d2",
              justifySelf: "center",
              alignSelf: "center",
            }}
          />
        ),
    },
    { field: "name", headerName: "Name", flex: 1.5 },
    { field: "Selection Sequence", headerName: "Selection Sequence", flex: 1.5 },
  ];

  const navigate = useNavigate();

  const [serviceLevelScheduleList, setServiceLevelScheduleList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServiceLevelSchedule = async () => {
    try {
      const response = await getRequest("/api/service-level-schedule");
      setServiceLevelScheduleList(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching Extra fees:", error);
    }
  };

  const handleActive = async (id) => {
    try {
      const response = await postRequest(`/api/service-level-schedule/makeDefault/${id}`, id);
      fetchServiceLevelSchedule();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServiceLevelSchedule();
  }, []);

  return (
    <div className="w-[90%] mt-5">
      <div>
        <DataGrid
          rows={serviceLevelScheduleList}
          className="cursor-pointer !h-[70vh]"
          columns={columns}
          onCellClick={(params) => {
            if (params.field == "name") {
              navigate(`./edit/${params.row.id}`);
            }
          }}
          loading={loading}
          slotProps={{
            loadingOverlay: {
              variant: "circular-progress",
              noRowsVariant: "circular-progress",
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
            "& .MuiDataGrid-virtualScrollerContent": {
              fontWeight: "500", // Bold text
              fontSize: "12px",
            },
          }}
        />
      </div>
    </div>
  );
};

export default ServiceLevelScheduleGrid;
