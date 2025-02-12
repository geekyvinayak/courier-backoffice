import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useNavigate } from "react-router-dom";
import { getRequest, postRequest } from "../../../consts/apiCalls";
import { useEffect } from "react";
import { useState } from "react";

const ExtraFeesScheduleGrid = () => {
  const columns = [
    {
      field: "active",
      headerName: "Default",
      sortable: false,
      filterable: false,
      cellClassName:'!flex !justify-center !items-center',
      renderCell: (params) =>
        params.value ? (
          <StarIcon style={{ color: "#1976d2" }} />
        ) : (
          <StarOutlineIcon
            onClick={() => handleActive(params.row.id)}
            style={{ color: "#1976d2" }}
          />
        ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
  ];

  const navigate = useNavigate();

  const [priceListSchedule, setPriceListSchedule] = useState([]);

  const handleActive = async (id) => {
    try {
      const response = await postRequest(`/extraFeeSchedule/makeDefault/${id}`);
      fetchPriceListSchedule();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPriceListSchedule = async () => {
    try {
      const response = await getRequest("/extraFeeSchedule");
      setPriceListSchedule(response);
    } catch (error) {
      console.error("Error fetching pricing list schedule:", error);
    }
  };

  useEffect(() => {
    fetchPriceListSchedule();
  }, []);

  return (
    <Box className="w-[90%] mt-5">
      <DataGrid
        rows={priceListSchedule}
        columns={columns}
        onCellClick={(params) => {
          if (params.field === "name") {
            navigate(`./edit/${params.row.id}`);
          }
        }}
        className="cursor-pointer !h-[70vh]"
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
          },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default ExtraFeesScheduleGrid;
