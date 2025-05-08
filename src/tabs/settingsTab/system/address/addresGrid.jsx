import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteRequest, getRequest } from "../../../../consts/apiCalls";
import { IconButton } from "@mui/material";
import { DeleteDialog } from "../../../../components/deleteDialog";
import useToast from "../../../../components/toast/useToast";




const AddressGrid = () => {
  const navigate = useNavigate();
  const { showSuccess, showError, showWarning } = useToast();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const columns = [
    { field: "type", headerName: "Type", flex: 1,minWidth: 100 },
    { field: "accountId", headerName: "Account ID", flex: 1 ,minWidth: 100,renderCell: (params) => {
      return params.value === 0 ? null : params.value;
    }},
    { field: "accountantUserId", headerName: "Account Name", flex: 1 ,minWidth: 150,renderCell: (params) => {
      return params.value === 0 ? null : params.value;
    }},
    { field: "companyName", headerName: "Company Name", flex: 1.5,minWidth: 150 },
    { field: "contactName", headerName: "Contact Name", flex: 1.5 ,minWidth: 150},
    { field: "email", headerName: "Contact Email", flex: 1.5 ,minWidth: 150},
    { field: "phoneNo", headerName: "Contact Phone", flex: 1 ,minWidth: 150},
    { field: "suiteApartment", headerName: "Suite/Apt", flex: 1 ,minWidth: 100},
    { field: "postalCode", headerName: "ZIP/Postal Code", flex: 1 ,minWidth: 150},
    { field: "city", headerName: "City", flex: 1 ,minWidth: 100},
    { field: "state", headerName: "State/Province", flex: 1 ,minWidth: 150},
    { 
      field: "defaultContact", 
      headerName: "Default", 
      flex: 1,
      renderCell: (params) => {
        return params.value ? "Yes" : "No";
      },
      minWidth: 100
    },
    { field: "latitude", headerName: "Latitude", flex: 1,minWidth: 100 },
    { field: "longitude", headerName: "Longitude", flex: 1 ,minWidth: 100},
    { 
      field: "contactLanguage", 
      headerName: "Contact Language", 
      flex: 1.5,
      renderCell: (params) => {
        return params.value ? params.value.charAt(0).toUpperCase() + params.value.slice(1).toLowerCase() : "";
      },
      minWidth: 150
    },
    {
      field: "addressLine1",
      headerName: "Address",
      flex: 2,
      minWidth: 350
    },
    {
      field: "loadUnloadMinutes",
      headerName: "Load/Unload Minutes",
      flex: 1,
      minWidth: 200
    },
    {
      field: "action",
      headerName: "",
      sortable: false,
      filterable: false,
      cellClassName:'flex !justify-center cursor-pointer',
      renderCell: (params) => (
        <IconButton>
          <DeleteDialog handleDelete={() => deleteAddress(params.id)} />
        </IconButton>
      ),
    },
  ];

  const deleteAddress = async (id) => {
    try {
      await deleteRequest(`/address/${id}`);
      showSuccess("Address deleted");
      fetchContacts();
    } catch (error) {
      showError("Something went wrong!");
      console.log("error", error);
    }
  };


  // Mock fetch function for demonstration
  // Replace with your actual API call
  const fetchContacts = async () => {
    setLoading(true)
    try {
      const response = await getRequest(`/address?page=${page}`);
      setContacts(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching contacts:", error);
    }
  };


  useEffect(() => {
    fetchContacts();
  }, [page]);

  return (
    <div className="w-[90%] mt-5">
      <div>
        <DataGrid
          rows={contacts}
          className="cursor-pointer !h-[70vh]"
          columns={columns}
          onCellClick={(params) => {
            if (params.field !== "action") {
              navigate(`./edit/New${params.row.type}/${params.row.id}`);
            }
          }}
          scroll={{ x: true }}
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

export default AddressGrid;