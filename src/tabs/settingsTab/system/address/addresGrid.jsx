import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "type", headerName: "Type", flex: 1,minWidth: 100 },
  { field: "accountId", headerName: "Account ID", flex: 1 ,minWidth: 100},
  { field: "accountantUserId", headerName: "Account Name", flex: 1 ,minWidth: 150},
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
  }
];

const AddressGrid = ({ showArchive }) => {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock fetch function for demonstration
  // Replace with your actual API call
  const fetchContacts = async () => {
    try {
      // In a real app, this would be your API call
      // const response = await getRequest(`/contacts?page=0&size=10&sort=id`);
      
      // Demo data for illustration
      const demoData = [
        {
          "id": 52,
          "type": "Contact",
          "accountId": 11,
          "accountantUserId": 12,
          "companyName": "abc",
          "contactName": "xyz",
          "phoneNo": null,
          "email": "test@test.com",
          "contactLanguage": "ENGLISH",
          "postalCode": "M5S 1A1",
          "addressLine1": "University of Toronto, 27 King's College Cir, Toronto, ON M5S 1A1, Canada",
          "city": "Toronto",
          "state": "Ontario",
          "latitude": 43.66095,
          "longitude": -79.39605,
          "suiteApartment": "fdc",
          "loadUnloadMinutes": 1,
          "defaultContact": true,
          "note": "ewzdfbv"
        },
        {
          "id": 53,
          "type": "Contact",
          "accountId": 11,
          "accountantUserId": 12,
          "companyName": "des",
          "contactName": "fdgb",
          "phoneNo": null,
          "email": "sdfvb@f.com",
          "contactLanguage": "ENGLISH",
          "postalCode": "K1N 6N5",
          "addressLine1": "University of Ottawa, 75 Laurier Ave E, Ottawa, ON K1N 6N5, Canada",
          "city": "Ottawa",
          "state": "Ontario",
          "latitude": 45.42414,
          "longitude": -75.68599,
          "suiteApartment": "22",
          "loadUnloadMinutes": 22,
          "defaultContact": true,
          "note": "wdsf"
        }
      ];
      
      setContacts(demoData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [showArchive]);

  return (
    <div className="w-[90%] mt-5">
      <div>
        <DataGrid
          rows={contacts}
          className="cursor-pointer !h-[70vh]"
          columns={columns}
          onCellClick={(params) => {
            if (params.field !== "action") {
              navigate(`./edit/${params.row.id}`);
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