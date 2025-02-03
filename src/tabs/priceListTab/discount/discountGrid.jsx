import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../../../consts/apiCalls";

const DiscountGrid = () => {
  const columns = [
    { field: "id", headerName: "Id", flex: 1 },
    { field: "name", headerName: "Name", flex: 1.5 },
    { field: "amount", headerName: "Amount", flex: 1.5 },
    { field: "discountType", headerName: "Type", flex: 1 },
  ];
  const navigate = useNavigate();

  const [discountList, setDiscount] = useState([]);

  const fetchDiscounts = async () => {
    try {
      const response = await getRequest("/discounts");
      setDiscount(response);
    } catch (error) {
      console.error("Error fetching Extra fees:", error);
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  return (
    <div className="mx-auto w-[80%] mt-2">
      <div>
        <DataGrid
          rows={discountList}
          className="cursor-pointer"
          columns={columns}
          onCellClick={(params) => {
            if (params.field != "action") {
              navigate(`./edit/${params.row.id}`);
            }
          }}
          disableColumnMenu
          disableSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
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
          }}
        />
      </div>
    </div>
  );
};

export default DiscountGrid;
