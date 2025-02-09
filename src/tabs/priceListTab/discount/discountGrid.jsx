import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteRequest, getRequest } from "../../../consts/apiCalls";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DiscountGrid = () => {
  const columns = [
    { field: "id", headerName: "Id", flex: 1 },
    { field: "name", headerName: "Name", flex: 1.5 },
    { field: "amount", headerName: "Amount", flex: 1.5 },
    { field: "discountType", headerName: "Type", flex: 1 },
    {
      field: "action",
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params.id)}>
          <DeleteIcon style={{ color: "#1976d2" }} />
        </IconButton>
      ),
    },
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

  const handleDelete = async (id) => {
    try {
      const response = await deleteRequest(`/discounts/${id}`);
      fetchDiscounts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  return (
    <div className="mx-auto w-[90%] mt-5">
      <div>
        <DataGrid
          rows={discountList}
          className="cursor-pointer !h-[70vh]"
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
              fontSize: "16px", // Increase font size
            },
            "& .MuiDataGrid-virtualScrollerContent":{
              fontWeight: "500", // Bold text
              fontSize: "14px",
            }
          }}
        />
      </div>
    </div>
  );
};

export default DiscountGrid;
