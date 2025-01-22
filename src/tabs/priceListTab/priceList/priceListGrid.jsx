import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import { getRequest } from "../../../consts/apiCalls";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    field: "active",
    headerName: "Default",
    sortable: false,
    filterable: false,
    renderCell: (params) =>
      params.value ? (
        <StarIcon style={{ color: "#1976d2" }} />
      ) : (
        <StarOutlineIcon style={{ color: "#1976d2" }} />
      ),
  },
  {
    field: "name",
    headerName: "Name",
    flex: 2,
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
  },
  {
    field: "actions",
    headerName: "",
    sortable: false,
    renderCell: () => (
      <IconButton>
        <DeleteIcon style={{ color: "#1976d2" }} />
      </IconButton>
    ),
  },
];

const PriceListGrid = () => {

  const navigate = useNavigate();

  const [priceList, setPriceList] = useState([])

  const fetchPriceList = async () => {
    try {
      const response = await getRequest("/api/pricingList");
      setPriceList(response);
    } catch (error) {
      console.error("Error fetching pricing list:", error);
    }
  };

  useEffect(() => {
    fetchPriceList();
  },[]);

  return (
    <Box className="w-[80%]  mx-auto mt-8">
      <DataGrid
        rows={priceList}
        columns={columns}
        onRowClick={(params)=>navigate(`./edit/${params.row.id}`)}
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
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default PriceListGrid;
