import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { deleteRequest, getRequest } from "../../../../consts/apiCalls";
import {
  IconButton,
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputAdornment,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { DeleteDialog } from "../../../../components/deleteDialog";
import useToast from "../../../../components/toast/useToast";
import { InfoIcon } from "lucide-react";

const AddressGrid = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [searchType, setSearchType] = useState("Address");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const debounceTimer = useRef(null);

  const columns = [
    { field: "type", headerName: "Type", flex: 1, minWidth: 100 },
    {
      field: "accountId",
      headerName: "Account ID",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return params.value === 0 ? null : params.value;
      },
    },
    {
      field: "accountantUserId",
      headerName: "Account Name",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        return params.value === 0 ? null : params.value;
      },
    },
    { field: "companyName", headerName: "Company Name", flex: 1.5, minWidth: 150 },
    { field: "contactName", headerName: "Contact Name", flex: 1.5, minWidth: 150 },
    { field: "email", headerName: "Contact Email", flex: 1.5, minWidth: 150 },
    { field: "phoneNo", headerName: "Contact Phone", flex: 1, minWidth: 150 },
    { field: "suiteApartment", headerName: "Suite/Apt", flex: 1, minWidth: 100 },
    { field: "postalCode", headerName: "ZIP/Postal Code", flex: 1, minWidth: 150 },
    { field: "city", headerName: "City", flex: 1, minWidth: 100 },
    { field: "state", headerName: "State/Province", flex: 1, minWidth: 150 },
    {
      field: "defaultContact",
      headerName: "Default",
      flex: 1,
      renderCell: (params) => {
        return params.value ? "Yes" : "No";
      },
      minWidth: 100,
    },
    { field: "latitude", headerName: "Latitude", flex: 1, minWidth: 100 },
    { field: "longitude", headerName: "Longitude", flex: 1, minWidth: 100 },
    {
      field: "contactLanguage",
      headerName: "Contact Language",
      flex: 1.5,
      renderCell: (params) => {
        return params.value
          ? params.value.charAt(0).toUpperCase() + params.value.slice(1).toLowerCase()
          : "";
      },
      minWidth: 150,
    },
    {
      field: "addressLine1",
      headerName: "Address",
      flex: 2,
      minWidth: 350,
    },
    {
      field: "loadUnloadMinutes",
      headerName: "Load/Unload Minutes",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "action",
      headerName: "",
      sortable: false,
      filterable: false,
      cellClassName: "flex !justify-center cursor-pointer",
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
      if (isSearchMode && searchString.length >= 3) {
        performSearch(searchString, searchType);
      } else {
        fetchContacts();
      }
    } catch (error) {
      showError("Something went wrong!");
      console.log("error", error);
    }
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await getRequest(`/address?page=${page}`);
      setContacts(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching contacts:", error);
    }
  };

  const performSearch = async (searchText, type) => {
    if (searchText.length < 3) {
      setIsSearchMode(false);
      fetchContacts();
      return;
    }

    setLoading(true);
    setIsSearchMode(true);
    try {
      const response = await getRequest(
        `/address/search?searchType=${type}&searchString=${encodeURIComponent(searchText)}`
      );
      setContacts(response);
      setLoading(false);
    } catch (error) {
      showError("Error performing search");
      console.error("Search error:", error);
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback((searchText, type) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      performSearch(searchText, type);
    }, 500);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchString(value);

    if (value.trim() === "") {
      setIsSearchMode(false);
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      fetchContacts();
    } else {
      debouncedSearch(value, searchType);
    }
  };

  const handleSearchTypeChange = (e) => {
    const newType = e.target.value;
    setSearchType(newType);

    if (searchString.length >= 3) {
      debouncedSearch(searchString, newType);
    }
  };

  const handleClearSearch = () => {
    setSearchString("");
    setIsSearchMode(false);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    fetchContacts();
  };

  const handleSearchIconClick = () => {
    if (searchString) {
      // If there's text, clear it
      handleClearSearch();
    } else if (searchString.length >= 3) {
      // If no text but we want to trigger search manually
      performSearch(searchString, searchType);
    }
  };

  useEffect(() => {
    if (!isSearchMode) {
      fetchContacts();
    }
  }, [page, isSearchMode]);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className="w-[90%] mt-5">
      {/* Search Section */}
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <FormControl component="fieldset">
          <RadioGroup row value={searchType} onChange={handleSearchTypeChange}>
            <FormControlLabel value="Address" control={<Radio />} label="Address" />
            <FormControlLabel value="Contact" control={<Radio />} label="Contact" />
            {/* <FormControlLabel 
              value="Position" 
              control={<Radio />} 
              label="Position" 
            /> */}
          </RadioGroup>
        </FormControl>
        <Box sx={{position:"relative"}}>
          <TextField
            placeholder="Search by"
            value={searchString}
            onChange={handleSearchChange}
            size="small"
            sx={{ minWidth: 300, borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
          />
          <Tooltip
            title={
              <Box sx={{ maxWidth: 250, p: 1, }}>
                {searchType == "Address" ? (
                  <>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Available search fields
                    </Typography>
                    <Typography variant="body2">
                      Address Line 1 <br />
                      Address Line 2 <br />
                      City <br />
                      Postal Code <br />
                      State Province <br />
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Available search fields
                    </Typography>
                    <Typography variant="body2">
                      Account Name
                      <br />
                      User Name
                      <br />
                      User Email
                      <br />
                      User Phone
                      <br />
                      Company
                      <br />
                      Contact Name
                      <br />
                      Contact Phone
                      <br />
                      Contact Email
                      <br />
                    </Typography>
                  </>
                )}
              </Box>
            }
          >
            <IconButton size="small" sx={{position:"absolute",top:"15%",right:"12%"}}>
              <InfoIcon fontSize="small" height={14} width={14} className="text-[#3e4396]" />
            </IconButton>
          </Tooltip>
          <IconButton
            color="primary"
            sx={{
              backgroundColor: "#1976d2",
              borderRadius: 0,
              color: "white",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
            onClick={handleSearchIconClick}
          >
            {searchString ? <ClearIcon /> : <SearchIcon />}
          </IconButton>
        </Box>
      </Box>

      {/* Data Grid */}
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
              border: "1px solid #e0e0e0",
            },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "#f5f5f5",
            },
            "& .MuiDataGrid-row:nth-of-type(even)": {
              backgroundColor: "#ffffff",
            },
            "& .MuiDataGrid-columnHeaders": {
              fontWeight: "bold",
              fontSize: "14px",
            },
            "& .MuiDataGrid-virtualScrollerContent": {
              fontWeight: "500",
              fontSize: "12px",
            },
          }}
        />
      </div>
    </div>
  );
};

export default AddressGrid;
