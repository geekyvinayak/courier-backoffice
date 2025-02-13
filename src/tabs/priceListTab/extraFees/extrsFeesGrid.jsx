import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../../../consts/apiCalls";

const columns = [
  { field: "id", headerName: "Id", cellClassName:"!text-[#3e4396]", flex: 1 },
  { field: "name", headerName: "Name (EN)", flex: 1.5 },
  { field: "unitsOfMeasure", headerName: "Unit of Measure (EN)", flex: 1.5 },
  { field: "reference", headerName: "Reference #", flex: 1 },
];

const ExtraFeesGrid = () => {
  const navigate = useNavigate();

  const [extraFeesList, setExtraFeesList] = useState([]);

  const fetchExtraFees = async () => {
    try {
      const response = await getRequest("/extraFee");
      setExtraFeesList(response);
    } catch (error) {
      console.error("Error fetching Extra fees:", error);
    }
  };

  useEffect(() => {
    fetchExtraFees();
  }, []);

  return (
    <div className="w-[90%] mt-5">
      <div>
        <DataGrid
          rows={extraFeesList}
          className="cursor-pointer !h-[70vh]"
          columns={columns}
          onCellClick={(params) => {
            if (params.field != "action") {
              navigate(`./edit/${params.row.id}`);
            }
          }}
          rowHeight={45}
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

export default ExtraFeesGrid;
