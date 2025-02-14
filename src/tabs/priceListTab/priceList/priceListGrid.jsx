import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import {
  deleteRequest,
  getRequest,
  postRequest,
} from "../../../consts/apiCalls";
import { useNavigate } from "react-router-dom";
import { DeleteDialog } from "../../../components/deleteDialog";
import useToast from "../../../components/toast/useToast";

const PriceListGrid = () => {
  const { showSuccess, showError } = useToast();
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
            style={{ color: "#1976d2",justifySelf:"center",alignSelf:"center" }}
          />
        ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      cellClassName:"!text-[#3e4396]",
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
      cellClassName:'flex !justify-center',
      renderCell: (params) => (
        <IconButton>
          <DeleteDialog handleDelete={() => handleDelete(params.id)} />
        </IconButton>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      const response = await deleteRequest(`/api/pricingList/${id}`);
      console.log("resp ll", response);
      showSuccess("Price list deleted");
      fetchPriceList();
    } catch (error) {
      showError("Something went wrong!");
      console.log(error);
    }
  };

  const handleActive = async (id) => {
    try {
      const response = await postRequest(
        `/api/pricingList/makeDefault/${id}`,
        id,
      );
      fetchPriceList();
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const [priceList, setPriceList] = useState([]);
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
  }, []);

  return (
    <Box className="w-[90%] mt-5">
      <DataGrid
        rows={priceList}
        columns={columns}
        onCellClick={(params) => {
          if (params.field === "actions") {
          } else if (params.field === "name") {
            navigate(`./edit/${params.row.id}`);
          }
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 7,
            },
          },
        }}
        rowHeight={35}
        columnHeaderHeight={40}
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
        className="cursor-pointer !h-[70vh]"
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default PriceListGrid;
